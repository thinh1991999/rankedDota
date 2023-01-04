import React, { useEffect } from "react";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Error from "next/error";
import stratsApiService from "../../services/stratsApi.service";
import { Stratz } from "../../interfaces/players";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { useAppDispatch } from "../../store";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../store/Slices/globalDataSlice";

const Chart = dynamic(() => import("../../components/Players/Rank/Chart"), {
  ssr: false,
});
const RankInfor = dynamic(
  () => import("../../components/Players/Rank/RankInfor"),
  { ssr: false }
);
const PlayersSubHeader = dynamic(
  () => import("../../components/Players/SubHeader"),
  { ssr: false }
);

type Props = {
  stratz: Stratz | null;
  statusCode: number;
};

const RanksPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubHeaderMain(<PlayersSubHeader />));
    dispatch(setHeaderImg("/playersBg.jpg"));
  }, [dispatch]);

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <div className="container m-auto">
      <Chart stratz={props.stratz} />
      <div className="mt-5">
        <RankInfor stratz={props.stratz} />
      </div>
    </div>
  );
};
// subHeader={<PlayersSubHeader />} imgSrc="/playersBg.jpg"
RanksPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const res = await stratsApiService.getPlayersRanks();
    if (res.status >= 400) {
      return {
        props: {
          stratz: null,
          statusCode: res.status,
        },
      };
    }
    const stratz = res.data.data.stratz;
    return {
      props: {
        stratz,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        stratz: null,
        statusCode: 500,
      },
    };
  }
};

export default RanksPage;
