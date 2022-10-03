import { GetServerSideProps } from "next";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { Matchup } from "../../components/Matches";
import { MatchDetail } from "../../interfaces/matches";
import stratsApiService from "../../services/stratsApi.service";
import { NextPageWithLayout } from "../_app";

const MatchPage: NextPageWithLayout = () => {
  const [match, setMatch] = useState<MatchDetail>();

  useEffect(() => {
    stratsApiService
      .getMatchDetail({
        id: 6788849628,
      })
      .then((res) => {
        const { match } = res.data.data;
        setMatch(match);
      });
  }, []);
  if (!match) return <></>;
  return (
    <section>
      <div className="container m-auto">
        <Matchup match={match} />
      </div>
    </section>
  );
};

MatchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const variables: object = {
//     heroId: Number(context.params?.id),
//   };
//   const res = await stratsApiService.getMatchDetail(variables);
//   console.log(res.data.data);

//   return {
//     props: {
//       a: 123,
//     },
//   };
// };

export default MatchPage;
