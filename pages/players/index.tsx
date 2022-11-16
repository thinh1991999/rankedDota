import React from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { PlayersSubHeader } from "../../components/Players";

const PlayersPage: NextPageWithLayout = () => {
  return <div>index</div>;
};

PlayersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout subHeader={<PlayersSubHeader />} imgSrc="/playersBg.jpg">
      {page}
    </Layout>
  );
};

export default PlayersPage;
