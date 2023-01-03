import { GetServerSideProps } from "next";
import Error from "next/error";
import React, { ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  TeamOverviewMembers,
  TeamOverviewSeries,
  TeamSubHeader,
} from "../../components/Teams";
import { TeamHeader, TeamOverview } from "../../interfaces/teamsPage";
import stratsApiService from "../../services/stratsApi.service";
import { useAppDispatch } from "../../store";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../../store/Slices/globalDataSlice";
import { NextPageWithLayout } from "../_app";
import { getImgStratsDota } from "../../share/ultils";

type Props = {
  data: {
    team: TeamOverview;
    header: TeamHeader;
  } | null;
  statusCode: number;
  errMess: string | null;
};

const TeamPage: NextPageWithLayout<Props> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!props.data) return;
    dispatch(setSubHeaderMain(<TeamSubHeader team={props.data.header} />));
    dispatch(
      setHeaderImg(getImgStratsDota("/teams/" + props.data.header.id + ".png"))
    );
  }, [dispatch, props]);

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }

  if (!props.data) {
    return <Error statusCode={500} />;
  }

  return (
    <section className="container m-auto">
      <TeamOverviewMembers team={props.data.team} />
      <TeamOverviewSeries team={props.data.team} />
    </section>
  );
};

TeamPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  try {
    const id = Number(context.query.id);
    const res1 = await stratsApiService.getTeamHeader(id);
    const res2 = await stratsApiService.getTeamOverview(id);
    if (res1.status != 200) {
      return {
        props: {
          errMess: null,
          data: null,
          statusCode: res1.status,
        },
      };
    }
    if (res2.status != 200) {
      return {
        props: {
          errMess: null,
          data: null,
          statusCode: res2.status,
        },
      };
    }
    const { data: data1, errors: errors1 } = res1.data;
    const { data: data2, errors } = res2.data;
    if (errors1) {
      return {
        props: {
          data: null,
          errMess: errors[0].message as string,
          statusCode: 400,
        },
      };
    }
    if (errors) {
      return {
        props: {
          data: null,
          errMess: errors[0].message as string,
          statusCode: 400,
        },
      };
    }
    return {
      props: {
        data: {
          header: data1.team,
          team: data2,
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

export default TeamPage;
