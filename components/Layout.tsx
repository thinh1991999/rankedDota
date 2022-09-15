import React from "react";
import { useAppSelector } from "../store";
import Footer from "./Footer";
import Header from "./Header";
import { useAppDispatch } from "../store/hook";
import { handleOffBgHeader, handleOnBgHeader } from "../store/Slices/rootSlice";

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
    <section
      className={`bg-background-light dark:bg-background-dark  overflow-y-scroll h-screen w-screen`}
      // onScroll={handleScroll}
    >
      <Header />
      <main className="min-h-[800px]">{children}</main>
      <Footer />
    </section>
  );
}

export default Layout;
