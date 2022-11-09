import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { NextPageWithLayout } from "../../_app";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import stratsApiService from "../../../services/stratsApi.service";
import { Season } from "../../../interfaces/players";
import Error from "next/error";
import {
  MapHandle,
  PlayerList,
  SearchHandle,
} from "../../../components/Players";
import { useAppDispatch } from "../../../store/hook";
import {
  setLoading,
  setSeason,
} from "../../../store/Slices/playersLeaderboardSlice";

type Props = {
  season: Season[];
  statusCode: number;
};

const WorldPage: NextPageWithLayout<Props> = (props) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const dispatch = useAppDispatch();
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
    <div className="container m-auto">
      <div className="my-5">
        <SearchHandle />
      </div>
      <div className="flex flex-wrap -ml-2 -mr-2">
        <div className="lg:w-1/2 p-2">
          <div className="mt-2">
            <MapHandle />
          </div>
        </div>
        <div className="lg:w-1/2 p-2">
          <PlayerList />
        </div>
      </div>
    </div>
  );
};

WorldPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { divisionId } = context.query;
  let finalDivisionId = 0;
  try {
    const res = await stratsApiService.getPlayersLeaderboards(finalDivisionId);
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
