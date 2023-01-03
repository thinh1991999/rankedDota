import React, { ReactElement, useEffect } from "react";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import { useAppDispatch } from "../store/hook";
import { ComposContainer, ComposSubHeader } from "../components/Compos";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../store/Slices/globalDataSlice";

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
