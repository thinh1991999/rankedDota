import React from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

const PlayersPage: NextPageWithLayout = () => {
  return <div>index</div>;
};

PlayersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlayersPage;
