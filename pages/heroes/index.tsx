import React from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import {
  Hero,
  HeroPageAll,
  HeroSortType,
  HeroStats,
} from "../../interfaces/type";
import stratsApiService from "../../services/stratsApi.service";
import _ from "lodash";
import axios from "axios";
import HeroAllContainer from "../../components/HeroAll/HeroAllContainer";

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
  _.forEach(heroes, (hero: HeroSortType) => {
    const { stats } = hero;
    if (stats.primaryAttribute === "str") {
      heroAll.str.push(hero);
    } else if (stats.primaryAttribute === "agi") {
      heroAll.agi.push(hero);
    } else {
      heroAll.int.push(hero);
    }
  });
  return {
    props: { heroAll },
  };
};

export default HeroesPage;
