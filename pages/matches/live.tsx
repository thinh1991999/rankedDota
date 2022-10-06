import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import stratsApiService from "../../services/stratsApi.service";
import { MatchLive } from "../../interfaces/matches";
import { Matches } from "../../components/Matches";

type Props = {
  matches: MatchLive[];
};

const livePage: NextPageWithLayout<Props> = (props) => {
  const { matches } = props;
  return (
    <>
      <Head>
        <title>{`Matches > Live`} </title>
      </Head>
      <section className="container m-auto">
        <Matches matches={matches} />
      </section>
    </>
  );
};

livePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await stratsApiService.getMatchesLive();
  const {
    live: { matches },
  } = res.data.data;
  return {
    props: {
      matches,
    },
  };
};

export default livePage;
