import { GetStaticProps } from "next";
import Error from "next/error";
import React, { ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import { TeamsMain, TeamsSubHeader } from "../../components/Teams";
import { Team } from "../../interfaces/teamsPage";
import openDotaApiService from "../../services/openDotaApi.service";
import { useAppDispatch } from "../../store";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../store/Slices/globalDataSlice";
import { NextPageWithLayout } from "../_app";

type Props = {
  teams: Team[];
  statusCode: number;
};

const TeamsPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubHeaderMain(<TeamsSubHeader />));
    dispatch(setHeaderImg("/card3.jpg"));
  }, [dispatch]);
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <section className="container m-auto">
      <TeamsMain teams={props.teams} />
    </section>
  );
};

TeamsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await openDotaApiService.getTeams(0);
    if (res.status >= 400) {
      return {
        props: {
          teams: null,
          statusCode: res.status,
        },
      };
    }
    const data = res.data;
    return {
      props: {
        teams: data,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        teams: null,
        statusCode: 500,
      },
    };
  }
};

export default TeamsPage;
