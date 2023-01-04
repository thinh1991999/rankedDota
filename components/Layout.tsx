import React, { ReactNode, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useAppDispatch } from "../store/hook";
import { setIsTransparentHeader } from "../store/Slices/globalDataSlice";

const Header = dynamic(() => import("./Header"), {
  loading: () => <></>,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <></>,
});

const SubHeaderMain = dynamic(() => import("./SubHeaderMain"), {
  loading: () => <></>,
});

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const mainRef = useRef<HTMLDivElement>(null);
  const handleScrollTop = () => {
    if (!mainRef.current) return;
    mainRef.current.scrollTop = 0;
  };

  useEffect(() => {
    if (router.isReady) {
      if (!mainRef.current) return;
      mainRef.current.scrollTop = 0;
    }
  }, [router]);

  useEffect(() => {
    if (!mainRef.current) return;
    const element = mainRef.current;
    let timeScroll: any;
    const handleScroll = (e: Event) => {
      const target = e.currentTarget as HTMLDivElement;
      const scrollTop = target.scrollTop;
      timeScroll = setTimeout(() => {
        dispatch(setIsTransparentHeader(scrollTop));
      }, 100);
    };
    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
      clearTimeout(timeScroll);
    };
  }, [mainRef, dispatch]);

  return (
    <>
      <div
        ref={mainRef}
        id="main"
        className={`flex flex-col bg-background-light dark:bg-background-dark w-screen h-screen  overflow-y-scroll overflow-x-hidden scroll-smooth  text-textMain-light dark:text-textMain-dark`}
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
