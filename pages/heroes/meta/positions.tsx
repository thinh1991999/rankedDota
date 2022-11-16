import React, { useState, useEffect } from "react";
import { NextPageWithLayout } from "../../_app";
import { GetServerSideProps } from "next";
import {
  HeroesSubHeader,
  PositionsDataInfo,
  PositionsHeader,
  PositionsSearchHandle,
} from "../../../components/Heroes";
import Layout from "../../../components/Layout";
import { ReactElement } from "react";
import stratsApiService from "../../../services/stratsApi.service";
import { MetaPositions } from "../../../interfaces/heroes";
import Error from "next/error";
import { useAppDispatch } from "../../../store";
import {
  setErrMess,
  setHeroesPositions,
  setLoading,
} from "../../../store/Slices/heroesPositionsSlice";

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
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <div className="container m-auto">
      <PositionsSearchHandle />
      <div className="">
        <PositionsDataInfo />
      </div>
    </div>
  );
};

PositionsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout subHeader={<HeroesSubHeader />}>{page}</Layout>;
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
