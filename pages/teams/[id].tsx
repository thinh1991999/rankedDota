import React, { ReactElement } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";

const TeamPage: NextPageWithLayout = () => {
  return <section className="container m-auto">TeamPage</section>;
};

TeamPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TeamPage;
