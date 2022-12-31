import React, { useState } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect } from "react";
import { GetServerSideProps } from "next";
import stratsApiService from "../../services/stratsApi.service";
import { Data, Lengue, Live } from "../../interfaces/lengues";
import Error from "next/error";
import { setData, setLengue, setLive } from "../../store/Slices/lenguesSlice";
import { useAppDispatch } from "../../store/hook";
import { LenguesHeader, Overview } from "../../components/Lengues";
import _ from "lodash";

type Props = {
  lengues: Lengue[] | null;
  data: Data[] | null;
  live: Live | null;
  statusCode: number;
};

const LenguesPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { lengues, data, live } = props;
    dispatch(setLengue(lengues));
    dispatch(setData(data));
    dispatch(setLive(live));
  }, [props, dispatch]);

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <section>
      <LenguesHeader />
      <Overview />
    </section>
  );
};

LenguesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const res1 = await stratsApiService.getActiveLengues();
    const res2 = await stratsApiService.getLeaguesOverviewLeagueCard();
    const res3 = await stratsApiService.getLiveMatchesLengues();
    if (res1.status >= 400 || res2.status >= 400 || res3.status >= 400) {
      return {
        props: {
          lengues: null,
          data: null,
          live: null,
          statusCode: _.max([res1.status, res2.status, res3.status]) || 400,
        },
      };
    }
    const { leagues } = res1.data.data;
    const data = res2.data;
    const { live } = res3.data.data;
    return {
      props: {
        lengues: leagues,
        data,
        live,
        statusCode: 200,
      },
    };
  } catch (e) {
    return {
      props: {
        lengues: null,
        data: null,
        live: null,
        statusCode: 503,
      },
    };
  }
};

export default LenguesPage;
