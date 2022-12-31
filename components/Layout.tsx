import React, { ReactNode, useRef, useEffect } from "react";
import { useAppSelector } from "../store";
import Footer from "./Footer";
import Header from "./Header";
import { useAppDispatch } from "../store/hook";
import { handleOffBgHeader, handleOnBgHeader } from "../store/Slices/rootSlice";
import Head from "next/head";
import MyImage from "./MyImage";
import SubHeaderMain from "./SubHeaderMain";
import { setIsTransparentHeader } from "../store/Slices/globalDataSlice";
import ScrollToTop from "react-scroll-up";
import { useRouter } from "next/router";

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const mainRef = useRef<HTMLInputElement>(null);
  // const theme = useAppSelector((state) => state.theme.theme);
  const handleScrollTop = () => {
    if (!mainRef.current) return;
    mainRef.current.scrollTop = 0;
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    // dispatch(setIsTransparentHeader(scrollTop));
  };

  useEffect(() => {
    if (router.isReady) {
      if (!mainRef.current) return;
      mainRef.current.scrollTop = 0;
    }
  }, [router]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div
        ref={mainRef}
        id="main"
        className={`flex flex-col bg-background-light dark:bg-background-dark w-screen h-screen  overflow-y-scroll overflow-x-hidden scroll-smooth  text-textMain-light dark:text-textMain-dark`}
        onScroll={handleScroll}
      >
        <Header />
        <main className="flex-1">
          <SubHeaderMain />
          <div className="py-10">{children}</div>
        </main>
        <Footer handleScrollTop={handleScrollTop} />
      </div>
    </>
  );
}

export default Layout;
