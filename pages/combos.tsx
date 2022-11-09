import React, { ReactElement, useEffect } from "react";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import { useAppSelector, useAppDispatch } from "../store/hook";
import HeroAllContainer from "../components/Heroes/Overview/HeroAllContainer";
import { GetStaticProps } from "next";
import stratsApiService from "../services/stratsApi.service";
import { HeroesStatus } from "../interfaces/heroes";
import { ComposContainer } from "../components/Compos";
import { setHeroesStatus } from "../store/Slices/composSlice";

type Props = {
  heroesStatus: HeroesStatus;
};

const ComposPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { heroesStatus } = props;
  const heroes = useAppSelector((state) => state.globalData.heroes);

  useEffect(() => {
    dispatch(setHeroesStatus(heroesStatus));
  }, [heroesStatus, dispatch]);

  return (
    <section className="container m-auto ">
      <div className="my-4">
        <ComposContainer heroesStatus={heroesStatus} />
      </div>
    </section>
  );
};

ComposPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await stratsApiService.getHeroStats();
  const heroesStatus: HeroesStatus = res.data.data.heroStats;
  return {
    props: {
      heroesStatus,
    },
  };
};

export default ComposPage;
