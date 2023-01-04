import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Error from "next/error";
import { ReactElement } from "react";
import { GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import stratsApiService from "../../../services/stratsApi.service";
import { Leaderboard } from "../../../interfaces/players";
import { NextPageWithLayout } from "../../_app";
import { useAppDispatch } from "../../../store";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../../store/Slices/globalDataSlice";

const CoachesPage = dynamic(
  () => import("../../../components/Players/Coaches/Coaches"),
  { ssr: false }
);
const PlayersSubHeader = dynamic(
  () => import("../../../components/Players/SubHeader"),
  { ssr: false }
);

type Props = {
  leaderboard: Leaderboard | null;
  statusCode: number;
};

const CoachPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubHeaderMain(<PlayersSubHeader />));
    dispatch(setHeaderImg("/playersBg.jpg"));
  }, [dispatch]);

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <>
      <Head>
        <title>Players-Leaderboards-Coaches</title>
      </Head>
      <div className="container m-auto">
        <CoachesPage leaderboard={props.leaderboard} />
      </div>
    </>
  );
};

CoachPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await stratsApiService.getCoachesLeaderboard(0);
    if (res.status >= 400) {
      return {
        props: {
          leaderboard: null,
          statusCode: res.status,
        },
      };
    }
    const leaderboard = res.data.data.leaderboard;
    return {
      props: {
        leaderboard,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        leaderboard: null,
        statusCode: 500,
      },
    };
  }
};

export default CoachPage;
