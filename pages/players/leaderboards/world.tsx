import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Error from "next/error";
import stratsApiService from "../../../services/stratsApi.service";
import { Season } from "../../../interfaces/players";
import { useAppDispatch } from "../../../store/hook";
import Layout from "../../../components/Layout";
import { NextPageWithLayout } from "../../_app";
import {
  setLoading,
  setSeason,
} from "../../../store/Slices/playersLeaderboardSlice";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../../store/Slices/globalDataSlice";

const MapHandle = dynamic(
  () => import("../../../components/Players/World/MapHandle"),
  { ssr: false }
);
const PlayerList = dynamic(
  () => import("../../../components/Players/World/PlayerList"),
  { ssr: false }
);
const SearchHandle = dynamic(
  () => import("../../../components/Players/World/SearchHandle"),
  { ssr: false }
);
const PlayersSubHeader = dynamic(
  () => import("../../../components/Players/SubHeader"),
  { ssr: false }
);

type Props = {
  season: Season;
  statusCode: number;
};

const WorldPage: NextPageWithLayout<Props> = (props) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubHeaderMain(<PlayersSubHeader />));
    dispatch(setHeaderImg("/playersBg.jpg"));
  }, [dispatch]);

  useEffect(() => {
    if (mounted) return;
    dispatch(setLoading(true));
    dispatch(setSeason(props.season));
    dispatch(setLoading(false));
    setMounted(true);
  }, [props, dispatch, mounted]);
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <>
      <Head>
        <title>Players-Leaderboards-World</title>
      </Head>
      <div className="container m-auto">
        <div className="my-5">
          <SearchHandle />
        </div>
        <div className="flex flex-wrap -ml-2 -mr-2">
          <div className="lg:w-1/2 w-full p-2">
            <div className="mt-2">
              <MapHandle />
            </div>
          </div>
          <div className="lg:w-1/2 w-full p-2">
            <PlayerList />
          </div>
        </div>
      </div>
    </>
  );
};

WorldPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { divisionIds } = context.query;
  let finalDivisionId = Number(divisionIds);
  try {
    const res = await stratsApiService.getPlayersLeaderboards({
      divisionIdNb: finalDivisionId,
    });
    if (res.status >= 400) {
      return {
        props: {
          season: null,
          statusCode: res.status,
        },
      };
    }
    const { season } = res.data.data.leaderboard;
    return {
      props: {
        season,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        season: null,
        statusCode: 500,
      },
    };
  }
};

export default WorldPage;
