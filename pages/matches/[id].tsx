import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Error from "next/error";
import Layout from "../../components/Layout";
import TimeSeek from "../../components/Matches/Detail/TimeSeek";
import stratsApiService from "../../services/stratsApi.service";
import { NextPageWithLayout } from "../_app";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  setErrMess,
  setLoading,
  setMatchDetail,
} from "../../store/Slices/matchDetailSlice";
import { MatchDetail } from "../../interfaces/matches";
import ErrorMess from "../../components/ErrorMess";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../store/Slices/globalDataSlice";

const Matchup = dynamic(
  () => import("../../components/Matches/Detail/Matchup/Matchup"),
  { ssr: false }
);

const Draft = dynamic(() => import("../../components/Matches/Detail/Draft"), {
  ssr: false,
});

const BuildInfo = dynamic(
  () => import("../../components/Matches/Detail/BuildInfo/BuildInfo"),
  { ssr: false }
);

const KillBreakdown = dynamic(
  () => import("../../components/Matches/Detail/KillBreakdown/KillBreakdown"),
  { ssr: false }
);

const Status = dynamic(
  () => import("../../components/Matches/Detail/Status/Status"),
  { ssr: false }
);

const MatchDetailSubHeader = dynamic(
  () => import("../../components/Matches/Detail/SubHeader"),
  { ssr: false }
);

type Props = {
  match: MatchDetail | null;
  statusCode: number;
  errMess: string | null;
};

const MatchPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.matchDetail.loading);
  const errMess = useAppSelector((state) => state.matchDetail.errMess);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (mounted) return;
    dispatch(setLoading(true));
    setMounted(true);
    const { errMess, match, statusCode } = props;
    if (statusCode !== 200) return;
    if (errMess) {
      dispatch(setErrMess(errMess));
      dispatch(setLoading(false));
      return;
    }
    if (match) dispatch(setMatchDetail(match));
    dispatch(setLoading(false));
  }, [props, dispatch, mounted]);

  useEffect(() => {
    if (!props.match) {
      dispatch(setSubHeaderMain(null));
      dispatch(setHeaderImg("/card2.jpg"));
    } else {
      dispatch(setSubHeaderMain(<MatchDetailSubHeader />));
      dispatch(setHeaderImg("/card2.jpg"));
    }
  }, [dispatch, props]);

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  if (!props.match) {
    return (
      <div className="container m-auto">
        <ErrorMess
          errMess={"The match you're looking for could not be found."}
        />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Matches-{props.match.id}</title>
      </Head>
      <section>
        {loading ? (
          <p>loading</p>
        ) : errMess ? (
          <ErrorMess errMess={errMess} />
        ) : (
          <div className="container m-auto">
            {props.match.analysisOutcome ? (
              <>
                <div className="my-4">
                  <Matchup />
                </div>
                <div className="my-4">
                  <Status />
                </div>
                <div className="my-4">
                  <Draft />
                </div>
                <div className="my-4">
                  <BuildInfo />
                </div>
                <div className="my-4">
                  <KillBreakdown />
                </div>
                <TimeSeek />
              </>
            ) : (
              <ErrorMess errMess="This match is taking an unusually long time to parse." />
            )}
          </div>
        )}
      </section>
    </>
  );
};

MatchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  try {
    const id = Number(context.query.id);
    const res = await stratsApiService.getMatchDetail(id);
    if (res.status >= 400) {
      return {
        props: {
          errMess: null,
          match: null,
          statusCode: res.status,
        },
      };
    }
    const { data, errors } = res.data;
    if (errors) {
      return {
        props: {
          match: null,
          errMess: errors[0].message as string,
          statusCode: 400,
        },
      };
    }
    return {
      props: {
        match: data.match,
        errMess: null,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        errMess: null,
        match: null,
        statusCode: 500,
      },
    };
  }
};

export default MatchPage;
