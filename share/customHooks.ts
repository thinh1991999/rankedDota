import Router from "next/router";
import react, { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../store";

export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const routeEventStart = (url: any, { shallow }: { shallow: boolean }) => {
      if (shallow) return;
      setIsPageLoading(true);
    };
    const routeEventEnd = () => {
      setIsPageLoading(false);
    };

    Router.events.on("routeChangeStart", routeEventStart);
    Router.events.on("routeChangeComplete", routeEventEnd);
    Router.events.on("routeChangeError", routeEventEnd);
    return () => {
      Router.events.off("routeChangeStart", routeEventStart);
      Router.events.off("routeChangeComplete", routeEventEnd);
      Router.events.off("routeChangeError", routeEventEnd);
    };
  }, []);

  return { isPageLoading };
};

// MatchDetail
export const useGetTimeCurrentMatchDetail = () => {
  const timeSeek = useAppSelector((state) => state.matchDetail.timeSeek);
  const timesLabel = useAppSelector((state) => state.matchDetail.timesLabel);

  const currentTime = useMemo(() => {
    return timesLabel[timeSeek] * 60;
  }, [timeSeek, timesLabel]);
  return currentTime;
};
