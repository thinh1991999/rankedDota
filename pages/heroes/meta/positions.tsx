import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Error from "next/error";

import { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/Layout";
import { ReactElement } from "react";
import stratsApiService from "../../../services/stratsApi.service";
import { MetaPositions } from "../../../interfaces/heroes";
import { useAppDispatch } from "../../../store";
import {
  setErrMess,
  setHeroesPositions,
  setLoading,
} from "../../../store/Slices/heroesPositionsSlice";
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

const PositionsSearchHandle = dynamic(
  () => import("../../../components/Heroes/Positions/SearchHandle"),
  {
    ssr: false,
  }
);

const PositionsDataInfo = dynamic(
  () => import("../../../components/Heroes/Positions/DataInfo"),
  {
    ssr: false,
  }
);

type Props = {
  heroesPositions: MetaPositions;
  statusCode: number;
  error: string | null;
};

const PositionsPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    if (mounted) return;
    if (props.statusCode === 200) {
      dispatch(setLoading(true));
      props.error
        ? dispatch(setErrMess(props.error))
        : dispatch(setHeroesPositions(props.heroesPositions));
      dispatch(setLoading(false));
    }
    setMounted(true);
  }, [props, dispatch, mounted]);

  useEffect(() => {
    dispatch(setSubHeaderMain(<HeroesSubHeader title="Positions" />));
    dispatch(setHeaderImg("/card1.jpg"));
  }, [dispatch]);

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <>
      <Head>
        <title>Heroes-Meta-Positions</title>
      </Head>
      <div className="container m-auto">
        <PositionsSearchHandle />
        <div className="">
          <PositionsDataInfo />
        </div>
      </div>
    </>
  );
};

PositionsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { bracketIds, regionIds } = context.query;
  let finalBracketIds = null;
  let finalRegionIds = null;
  if (bracketIds && typeof bracketIds === "string")
    finalBracketIds = bracketIds;
  if (regionIds && typeof regionIds === "string") finalRegionIds = regionIds;
  try {
    const res = await stratsApiService.getHeroMetaPositions(
      finalBracketIds,
      finalRegionIds
    );
    if (res.status >= 400) {
      return {
        props: {
          heroesPositions: null,
          statusCode: res.status,
          error: null,
        },
      };
    }
    const { data, errors } = res.data;
    return {
      props: {
        heroesPositions: data,
        error: errors ? errors[0].message : null,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        heroesPositions: null,
        statusCode: 500,
        error: null,
      },
    };
  }
};

export default PositionsPage;
