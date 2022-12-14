import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Error from "next/error";
import { ReactElement } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/Layout";
import stratsApiService from "../../../services/stratsApi.service";
import { HeroesMetaTrends } from "../../../interfaces/heroes";
import { useAppDispatch } from "../../../store/hook";
import {
  setErrMess,
  setHeroesTrends,
  setLoading,
} from "../../../store/Slices/heroesTrendsSlice";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../../store/Slices/globalDataSlice";

const HeroesSubHeader = dynamic(
  () => import("../../../components/Heroes/SubHeader"),
  {
    ssr: false,
  }
);

const TrendsSearchHandle = dynamic(
  () => import("../../../components/Heroes/Trends/SearchHandle"),
  {
    ssr: false,
  }
);

const TrendsHeroesData = dynamic(
  () => import("../../../components/Heroes/Trends/HeroesData"),
  {
    ssr: false,
  }
);

type Props = {
  heroesTrends: HeroesMetaTrends;
  statusCode: number;
  error: string | null;
};

const TrendsPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    if (mounted) return;
    if (props.statusCode === 200) {
      dispatch(setLoading(true));
      props.error
        ? dispatch(setErrMess(props.error))
        : dispatch(setHeroesTrends(props.heroesTrends));
      dispatch(setSubHeaderMain(<HeroesSubHeader title="Trends" />));
      dispatch(setHeaderImg("/card1.jpg"));
      dispatch(setLoading(false));
    }
    setMounted(true);
  }, [props, dispatch, mounted]);

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <>
      <Head>
        <title>Heroes-Meta-Trends</title>
      </Head>
      <div className="container m-auto">
        <div className="my-5">
          <TrendsSearchHandle />
        </div>
        <div className="">
          <TrendsHeroesData />
        </div>
      </div>
    </>
  );
};

TrendsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { bracketIds, regionIds, gameModeIds, positionIds } = context.query;
  let finalBracketIds = null;
  let finalRegionIds = null;
  let finalGameModeIds = null;
  let finalPositionIds = null;
  if (bracketIds && typeof bracketIds === "string")
    finalBracketIds = bracketIds;
  if (regionIds && typeof regionIds === "string") finalRegionIds = regionIds;
  if (gameModeIds && typeof gameModeIds === "string")
    finalGameModeIds = gameModeIds;
  if (positionIds) {
    if (typeof positionIds === "object") {
      finalPositionIds = positionIds;
    } else {
      finalPositionIds = [positionIds];
    }
  }
  try {
    const res = await stratsApiService.getHeroesMetaTrends(
      finalBracketIds,
      finalPositionIds,
      finalRegionIds,
      finalGameModeIds
    );
    if (res.status >= 400) {
      return {
        props: {
          heroesTrends: null,
          statusCode: res.status,
          error: null,
        },
      };
    }
    const {
      data: { heroStats },
      errors,
    } = res.data;

    return {
      props: {
        heroesTrends: heroStats,
        error: errors ? errors[0].message : null,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        heroesTrends: null,
        statusCode: 500,
        error: null,
      },
    };
  }
};

export default TrendsPage;
