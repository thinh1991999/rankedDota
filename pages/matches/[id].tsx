import { GetServerSideProps } from "next";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import {
  Status,
  Matchup,
  TimeSeek,
  Draft,
  BuildInfo,
  KillBreakdown,
  HeadInfo,
  MatchDetailSubHeader,
} from "../../components/Matches";
import stratsApiService from "../../services/stratsApi.service";
import { NextPageWithLayout } from "../_app";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  setErrMess,
  setLoading,
  setMatchDetail,
} from "../../store/Slices/matchDetailSlice";
import { MatchDetail } from "../../interfaces/matches";
import Error from "next/error";
import { useDispatch } from "react-redux";
import ErrorMess from "../../components/ErrorMess";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../store/Slices/globalDataSlice";

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
    dispatch(setSubHeaderMain(<MatchDetailSubHeader />));
    dispatch(setHeaderImg("/card2.jpg"));
  }, [dispatch]);

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
    <section>
      {loading ? (
        <p>loading</p>
      ) : errMess ? (
        <ErrorMess errMess={errMess} />
      ) : (
        <div className="container m-auto">
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
        </div>
      )}
    </section>
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
