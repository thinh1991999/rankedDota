import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import { GameMode, Rank, Region } from "../../components/Matches";
import { MatchGraph } from "../../interfaces/matches";
import stratsApiService from "../../services/stratsApi.service";
import { NextPageWithLayout } from "../_app";

type Props = {
  gameMode: {
    ALL_PICK: MatchGraph[];
    CAPTAINS_MODE: MatchGraph[];
    ALL_PICK_RANKED: MatchGraph[];
    TURBO: MatchGraph[];
  };
  region: {
    CHINA: MatchGraph[];
    SEA: MatchGraph[];
    NORTH_AMERICA: MatchGraph[];
    SOUTH_AMERICA: MatchGraph[];
    EUROPE: MatchGraph[];
  };
  rank: {
    HERALD: MatchGraph[];
    GUARDIAN: MatchGraph[];
    CRUSADER: MatchGraph[];
    ARCHON: MatchGraph[];
    LEGEND: MatchGraph[];
    ANCIENT: MatchGraph[];
    DIVINE: MatchGraph[];
    IMMORTAL: MatchGraph[];
  };
};

const GraphsPage: NextPageWithLayout<Props> = (props) => {
  const { gameMode, region, rank } = props;
  return (
    <>
      <Head>
        <title>{`Matches > Graphs`} </title>
      </Head>
      <section className="container m-auto">
        <div className="my-10">
          <GameMode gameMode={gameMode} />
        </div>
        <div className="my-10">
          <Region region={region} />
        </div>
        <div className="my-10">
          <Rank rank={rank} />
        </div>
      </section>
    </>
  );
};

GraphsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await stratsApiService.getMatchesGraphsGameMode();
  const res1 = await stratsApiService.getMatchesGraphsRegion();
  const res2 = await stratsApiService.getMatchesGraphsRank();
  const {
    heroStats: { ALL_PICK, CAPTAINS_MODE, ALL_PICK_RANKED, TURBO },
  } = res.data.data;
  const {
    heroStats: { CHINA, SEA, NORTH_AMERICA, SOUTH_AMERICA, EUROPE },
  } = res1.data.data;
  const {
    heroStats: {
      HERALD,
      GUARDIAN,
      CRUSADER,
      ARCHON,
      LEGEND,
      ANCIENT,
      DIVINE,
      IMMORTAL,
    },
  } = res2.data.data;
  return {
    props: {
      gameMode: {
        ALL_PICK,
        CAPTAINS_MODE,
        ALL_PICK_RANKED,
        TURBO,
      },
      region: { CHINA, SEA, NORTH_AMERICA, SOUTH_AMERICA, EUROPE },
      rank: {
        HERALD,
        GUARDIAN,
        CRUSADER,
        ARCHON,
        LEGEND,
        ANCIENT,
        DIVINE,
        IMMORTAL,
      },
    },
  };
};

export default GraphsPage;
