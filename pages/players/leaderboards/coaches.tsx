import React, { useEffect } from "react";
import Error from "next/error";
import { ReactElement } from "react";
import { GetStaticProps } from "next";

import Layout from "../../../components/Layout";
import stratsApiService from "../../../services/stratsApi.service";
import { Leaderboard } from "../../../interfaces/players";
import { NextPageWithLayout } from "../../_app";
import { CoachesPage, PlayersSubHeader } from "../../../components/Players";

type Props = {
  leaderboard: Leaderboard | null;
  statusCode: number;
};

const CoachPage: NextPageWithLayout<Props> = (props) => {
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <div className="container m-auto">
      <CoachesPage leaderboard={props.leaderboard} />
    </div>
  );
};

CoachPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout subHeader={<PlayersSubHeader />} imgSrc="/playersBg.jpg">
      {page}
    </Layout>
  );
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
