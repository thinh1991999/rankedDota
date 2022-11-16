import React, { ReactNode } from "react";
import { useAppSelector } from "../store";
import Footer from "./Footer";
import Header from "./Header";
import { useAppDispatch } from "../store/hook";
import { handleOffBgHeader, handleOnBgHeader } from "../store/Slices/rootSlice";
import Head from "next/head";
import MyImage from "./MyImage";

function Layout({
  children,
  subHeader,
  imgSrc,
}: {
  children: ReactNode;
  subHeader?: ReactNode;
  imgSrc?: string;
}) {
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
        id="main"
        className={`bg-background-light dark:bg-background-dark  overflow-y-scroll h-screen w-screen text-textMain-light dark:text-textMain-dark`}
        // onScroll={handleScroll}
      >
        <Header />
        <main className="min-h-[800px]">
          <div className="relative pt-[80px] overflow-hidden">
            {imgSrc && (
              <div className="absolute top-0 left-0 bottom-0 right-0 blur-[100px]">
                <MyImage src={imgSrc} width="100%" height="100%" alt="" />
              </div>
            )}
            <div className="relative">{subHeader ? subHeader : <></>}</div>
          </div>
          <div className="py-10">{children}</div>
        </main>
        <Footer />
      </section>
    </>
  );
}

export default Layout;
