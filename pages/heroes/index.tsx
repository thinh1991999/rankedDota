import React from "react";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import _ from "lodash";
import { HeroPageAll, HeroSortType } from "../../interfaces/heroes";
import stratsApiService from "../../services/stratsApi.service";
import HeroAllContainer from "../../components/HeroAll/HeroAllContainer";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";

type Props = {
  heroAll: HeroPageAll;
};

const HeroesPage: NextPageWithLayout<Props> = ({ heroAll }) => {
  return <HeroAllContainer data={heroAll} />;
};

HeroesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await stratsApiService.getHeroesPage();
  const heroes: HeroSortType[] = res.data.data.constants.heroes;
  const heroAll: HeroPageAll = {
    str: [],
    agi: [],
    int: [],
  };
  // _.forEach(heroes, (hero: HeroSortType) => {
  //   const { stats } = hero;
  //   if (stats.primaryAttribute === "str") {
  //     heroAll.str.push(hero);
  //   } else if (stats.primaryAttribute === "agi") {
  //     heroAll.agi.push(hero);
  //   } else {
  //     heroAll.int.push(hero);
  //   }
  // });
  return {
    props: { heroAll },
  };
};

export default HeroesPage;
