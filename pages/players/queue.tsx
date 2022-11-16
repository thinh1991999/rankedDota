import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import stratsApiService from "../../services/stratsApi.service";
import { Matches, Stratz } from "../../interfaces/players";
import Error from "next/error";
import {
  Chart,
  PlayersSubHeader,
  QueueChart,
  RankInfor,
} from "../../components/Players";

type Props = {
  matches: Matches | null;
  statusCode: number;
};

const QueuePage: NextPageWithLayout<Props> = (props) => {
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <div className="container m-auto">
      <QueueChart matches={props.matches} />
    </div>
  );
};

QueuePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout subHeader={<PlayersSubHeader />} imgSrc="/playersBg.jpg">
      {page}
    </Layout>
  );
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
