import type { AppProps } from "next/app";
import { NextPage } from "next";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { ClockLoader } from "react-spinners";
import { wrapper } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchDefaultData } from "../store/Slices/globalDataSlice";
import "../styles/globals.css";
import { usePageLoading } from "../share";
import PageLoading from "../components/PageLoading";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.globalData.loading);
  const { isPageLoading } = usePageLoading();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    dispatch(fetchDefaultData());
    setMounted(true);
  }, [dispatch]);

  const getLayout = Component.getLayout ?? ((page) => page);
  // if (loading)
  //   return (
  //     <section className="w-screen h-screen bg-background-dark flex justify-center items-center">
  //       <ClockLoader color="#fff" size={40} />
  //       <span className="ml-1 text-xl font-bold text-white">RankedDota</span>
  //     </section>
  //   );
  if (!mounted) {
    return <></>;
  }
  return (
    <ThemeProvider attribute="class">
      {getLayout(
        isPageLoading ? <PageLoading /> : <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
