import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { wrapper } from "../store/store";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchDefaultData } from "../store/Slices/globalDataSlice";
import React from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function Test({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.globalData.loading);

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchDefaultData());
    // setPageLoaded(true);
  }, [dispatch]);

  const getLayout = Component.getLayout ?? ((page) => page);
  if (loading) return <p>loading..........</p>;
  // if (!pageLoaded) return <></>;
  return (
    <ThemeProvider attribute="class">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
