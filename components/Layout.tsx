import React from "react";
import { useAppSelector } from "../store";
import Footer from "./Footer";
import Header from "./Header";
import { useAppDispatch } from "../store/hook";
import { handleOffBgHeader, handleOnBgHeader } from "../store/Slices/rootSlice";
import Head from "next/head";

function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  // const translateHeader = useAppSelector((state) => state.root.translateHeader);
  // const theme = useAppSelector((state) => state.theme.theme);

  // const handleScroll = (e: React.UIEvent<HTMLElement>) => {
  //   const scrollTop = e.currentTarget.scrollTop;
  //   if (scrollTop > 80 && translateHeader) return;
  //   if (scrollTop > 80) {
  //     dispatch(handleOnBgHeader());
  //   } else {
  //     dispatch(handleOffBgHeader());
  //   }
  // };
  // ${theme.background}
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section
        className={`bg-background-light dark:bg-background-dark  overflow-y-scroll h-screen w-screen text-textPrimary-light dark:text-textPrimary-dark`}
        // onScroll={handleScroll}
      >
        <Header />
        <main className="min-h-[800px]">{children}</main>
        <Footer />
      </section>
    </>
  );
}

export default Layout;
