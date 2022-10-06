import { GetServerSideProps } from "next";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { Status, Matchup } from "../../components/Matches";
import { MatchDetail } from "../../interfaces/matches";
import stratsApiService from "../../services/stratsApi.service";
import { NextPageWithLayout } from "../_app";
import { useAppDispatch } from "../../store/hook";
import { setMatchDetail } from "../../store/Slices/matchDetailSlice";

const MatchPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  // const [match, setMatch] = useState<MatchDetail>();
  useEffect(() => {
    stratsApiService
      .getMatchDetail({
        id: 6788849628,
      })
      .then((res) => {
        const { match } = res.data.data;
        dispatch(setMatchDetail(match));
      });
  }, [dispatch]);
  // if (!match) return <></>;
  return (
    <section>
      <div className="container m-auto">
        {/* <div className="my-4">
          <Matchup />
        </div> */}
        <div className="my-4">
          <Status />
        </div>
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