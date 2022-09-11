import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import { GetServerSideProps } from "next";
import httpService from "../services/http.service";
import { Hero, HeroAll } from "../interfaces/type";
import _ from "lodash";
import HeroAllContainer from "../components/HeroAll/HeroAllContainer";

type Props = {
  heroAll: HeroAll;
};

const HeroAllPage: NextPageWithLayout<Props> = (props) => {
  const { heroAll } = props;
  return <HeroAllContainer data={heroAll} />;
};

HeroAllPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await httpService.getHeroes();
//   const heroAll: HeroAll = {
//     str: [],
//     agi: [],
//     int: [],
//   };
//   _.forIn(res.data, (value: Hero) => {
//     const { primary_attr } = value;
//     if (primary_attr === "str") {
//       heroAll.str.push(value);
//     } else if (primary_attr === "agi") {
//       heroAll.agi.push(value);
//     } else {
//       heroAll.int.push(value);
//     }
//   });
//   return {
//     props: { heroAll },
//   };
// };

export default HeroAllPage;
