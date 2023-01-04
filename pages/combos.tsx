import React, { ReactElement, useEffect } from "react";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import { useAppDispatch } from "../store/hook";
import dynamic from "next/dynamic";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../store/Slices/globalDataSlice";

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
    <section className="container m-auto ">
      <div className="my-4">
        <ComposContainer />
      </div>
    </section>
  );
};

ComposPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ComposPage;
