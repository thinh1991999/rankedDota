import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import stratsApiService from "../../services/stratsApi.service";
import { Matches } from "../../interfaces/players";
import Error from "next/error";
import { useAppDispatch } from "../../store";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../store/Slices/globalDataSlice";

const QueueChart = dynamic(
  () => import("../../components/Players/Queue/Chart"),
  { ssr: false }
);

const PlayersSubHeader = dynamic(
  () => import("../../components/Players/SubHeader"),
  { ssr: false }
);

type Props = {
  matches: Matches | null;
  statusCode: number;
};

const QueuePage: NextPageWithLayout<Props> = (props) => {
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
        <title>Players-Queue</title>
      </Head>
      <div className="container m-auto">
        <QueueChart matches={props.matches} />
      </div>
    </>
  );
};

QueuePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const res = await stratsApiService.getPlayersQueue();
    if (res.status >= 400) {
      return {
        props: {
          matches: null,
          statusCode: res.status,
        },
      };
    }
    const {
      page: { matches },
    } = res.data.data.stratz;
    return {
      props: {
        matches,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        matches: null,
        statusCode: 500,
      },
    };
  }
};

export default QueuePage;
