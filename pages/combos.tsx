import React, { ReactElement, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import { useAppDispatch } from "../store/hook";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../store/Slices/globalDataSlice";
import Head from "next/head";
const ComposSubHeader = dynamic(
  () => import("../components/Compos/SubHeader"),
  { ssr: false }
);
const ComposContainer = dynamic(
  () => import("../components/Compos/ComposContainer"),
  { ssr: false }
);

const ComposPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSubHeaderMain(<ComposSubHeader />));
    dispatch(setHeaderImg("/card2.jpg"));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Combos</title>
      </Head>
      <section className="container m-auto ">
        <div className="my-4">
          <ComposContainer />
        </div>
      </section>
    </>
  );
};

ComposPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ComposPage;
