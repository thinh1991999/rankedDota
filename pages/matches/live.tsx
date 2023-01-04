import React, { ReactElement, useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Error from "next/error";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import stratsApiService from "../../services/stratsApi.service";
import { MatchLive } from "../../interfaces/matches";
import ErrorMess from "../../components/ErrorMess";
import { useAppDispatch } from "../../store";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../store/Slices/globalDataSlice";

const Matches = dynamic(() => import("../../components/Matches/Live/Matches"), {
  ssr: false,
});

const MatchesSubHeader = dynamic(
  () => import("../../components/Matches/SubHeader"),
  { ssr: false }
);

type Props = {
  matches: MatchLive[] | null;
  statusCode: number;
  errMess: string | null;
};

const LivePage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { matches, errMess } = props;

  useEffect(() => {
    dispatch(setSubHeaderMain(<MatchesSubHeader />));
    dispatch(setHeaderImg("/card2.jpg"));
  }, [dispatch]);

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <>
      <Head>
        <title>Matches-Live</title>
      </Head>
      <section className="container m-auto">
        {errMess ? (
          <ErrorMess errMess={errMess} />
        ) : matches ? (
          <Matches matches={matches} />
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

LivePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const res = await stratsApiService.getMatchesLive();
    if (res.status >= 400) {
      return {
        props: {
          errMess: null,
          matches: null,
          statusCode: res.status,
        },
      };
    }
    const { data, errors } = res.data;
    if (errors) {
      return {
        props: {
          matches: null,
          errMess: errors[0].message as string,
          statusCode: 200,
        },
      };
    }
    const {
      live: { matches },
    } = data;
    return {
      props: {
        matches,
        errMess: null,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        errMess: null,
        matches: null,
        statusCode: 500,
      },
    };
  }
};

export default LivePage;
