import { GetStaticProps } from "next";
import React, { ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import { TeamsMain } from "../../components/Teams";
import { Team } from "../../interfaces/teamsPage";
import openDotaApiService from "../../services/openDotaApi.service";
import { NextPageWithLayout } from "../_app";

type Props = {
  teams: Team[];
};

const TeamsPage: NextPageWithLayout<Props> = (props) => {
  const { teams } = props;
  return (
    <section className="container m-auto">
      <div className="my-8">
        <TeamsMain teams={teams} />
      </div>
    </section>
  );
};

TeamsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await openDotaApiService.getTeams(0);
  const data = res.data;
  return {
    props: {
      teams: data,
    },
  };
};

export default TeamsPage;
