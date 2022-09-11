import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ReactElement } from "react";
import HeroContainer from "../../components/Hero/HeroContainer";
import Layout from "../../components/Layout";
import { HeroStats } from "../../interfaces/type";
import httpService from "../../services/http.service";
import { usePageLoading } from "../../share";
import { NextPageWithLayout } from "../_app";

type Props = {
  heroStats: HeroStats;
};

const HeroesPage: NextPageWithLayout<Props> = (props) => {
  const { heroStats } = props;
  const router = useRouter();
  const { isPageLoading } = usePageLoading();
  useEffect(() => {}, [router.query?.id]);
  return (
    <>
      <Head>
        <title>{router.query?.id}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isPageLoading ? (
        <p className="text-white">loading............</p>
      ) : (
        <HeroContainer data={heroStats} />
      )}
    </>
  );
};

HeroesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// HeroesPage.getInitialProps = async (): Promise<Props> => {
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const json = await res.json();
//   console.log(json);
//   return {
//     heroStats: json,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await httpService.getHeroStats();
//   const allHeroStats: HeroStats[] = res.data;
//   return {
//     paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
//     fallback: "blocking", // can also be true or 'blocking'
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const res = await httpService.getHeroStats();
//   const allHeroStats: HeroStats[] = res.data;
//   console.log(params?.id);
//   return {
//     // Passed to the page component as props
//     props: { post: {} },
//   };
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await httpService.getHeroStats();
//   const allHeroStats: HeroStats[] = res.data;
//   const idx = allHeroStats.findIndex((hero) => {
//     return hero.id.toString() === context.query.id;
//   });
//   if (idx === -1) {
//     return {
//       redirect: {
//         destination: "/error",
//         permanent: false,
//       },
//     };
//   } else {
//     return {
//       props: { heroStats: allHeroStats[idx] },
//     };
//   }
// };

export default HeroesPage;
