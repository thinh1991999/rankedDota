import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import stratsApiService from "../../services/stratsApi.service";
import { Stratz } from "../../interfaces/players";
import Error from "next/error";
import { Chart, PlayersSubHeader, RankInfor } from "../../components/Players";

type Props = {
  stratz: Stratz | null;
  statusCode: number;
};

const RanksPage: NextPageWithLayout<Props> = (props) => {
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <div className="container m-auto">
      <Chart stratz={props.stratz} />
      <div className="mt-5">
        <RankInfor stratz={props.stratz} />
      </div>
    </div>
  );
};

RanksPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout subHeader={<PlayersSubHeader />} imgSrc="/playersBg.jpg">
      {page}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const res = await stratsApiService.getPlayersRanks();
    if (res.status >= 400) {
      return {
        props: {
          stratz: null,
          statusCode: res.status,
        },
      };
    }
    const stratz = res.data.data.stratz;
    return {
      props: {
        stratz,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        stratz: null,
        statusCode: 500,
      },
    };
  }
};

export default RanksPage;
