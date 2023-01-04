import { GetServerSideProps } from "next";
import Error from "next/error";
import Head from "next/head";
import React, { ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import { MatchGraph } from "../../interfaces/matches";
import stratsApiService from "../../services/stratsApi.service";
import { NextPageWithLayout } from "../_app";
import { useAppDispatch } from "../../store/hook";
import dynamic from "next/dynamic";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../store/Slices/globalDataSlice";

const GameMode = dynamic(
  () => import("../../components/Matches/Graphs/GameMode"),
  { ssr: false }
);
const Rank = dynamic(() => import("../../components/Matches/Graphs/Rank"), {
  ssr: false,
});
const Region = dynamic(() => import("../../components/Matches/Graphs/Region"), {
  ssr: false,
});
const MatchesSubHeader = dynamic(
  () => import("../../components/Matches/SubHeader"),
  { ssr: false }
);

type Props = {
  data: {
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
  } | null;
  statusCode: number;
  errMess: string | null;
};

const GraphsPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSubHeaderMain(<MatchesSubHeader />));
    dispatch(setHeaderImg("/card2.jpg"));
  }, [dispatch]);
  if (props.statusCode !== 200 || !props.data) {
    return <Error statusCode={props.statusCode} />;
  }
  const { gameMode, region, rank } = props.data;
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
  try {
    let statusCode = 200;
    const res = await stratsApiService.getMatchesGraphsGameMode();
    const res1 = await stratsApiService.getMatchesGraphsRegion();
    const res2 = await stratsApiService.getMatchesGraphsRank();
    if (res.status >= 400) {
      statusCode = res.status;
    } else if (res1.status >= 400) {
      statusCode = res1.status;
    } else if (res2.status >= 400) {
      statusCode = res2.status;
    }
    if (statusCode >= 400) {
      return {
        props: {
          errMess: null,
          data: null,
          statusCode: res.status,
        },
      };
    }
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
        data: {
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
        errMess: null,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        errMess: null,
        data: null,
        statusCode: 500,
      },
    };
  }
};

export default GraphsPage;
