import { useTheme } from "next-themes";
import Router, { useRouter } from "next/router";
import { useEffect, useState, useMemo, useRef } from "react";
import { StylesConfig } from "react-select";
import { useAppSelector } from "../store";
import { useAppDispatch } from "../store/hook";
import {
  setHeaderImg,
  setSubHeaderMain,
} from "../store/Slices/globalDataSlice";

export const usePageLoading = () => {
  const dispatch = useAppDispatch();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const routeEventStart = (url: any, { shallow }: { shallow: boolean }) => {
      if (shallow) return;
      setIsPageLoading(true);
    };
    const routeEventEnd = (url: any) => {
      if (url === "/") {
        dispatch(setSubHeaderMain(null));
        dispatch(setHeaderImg(""));
      }
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

export const useCheckChangeRouter = () => {
  const router = useRouter();

  const [currentRouter, setCurrentRouter] = useState<string>("");
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    const routeEventStart = (url: any, { shallow }: { shallow: boolean }) => {
      console.log("url start", url);
    };
    const routeEventEnd = (url: any) => {};

    Router.events.on("routeChangeStart", routeEventStart);
    Router.events.on("routeChangeComplete", routeEventEnd);
    Router.events.on("routeChangeError", routeEventEnd);
    return () => {
      Router.events.off("routeChangeStart", routeEventStart);
      Router.events.off("routeChangeComplete", routeEventEnd);
      Router.events.off("routeChangeError", routeEventEnd);
    };
  }, []);

  useEffect(() => {
    const path = router.basePath;
    // console.log(path);
  }, [router]);

  return { isChange };
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

// get color react-select

export const useGetStylesReactSelect = () => {
  const { theme } = useTheme();
  const [styles, setStyles] = useState<StylesConfig<any>>({
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
  });
  useEffect(() => {
    if (theme === "dark") {
      setStyles({
        option: (provided, state) => ({
          ...provided,
          borderBottom: "1px dotted black",
          color: "white",
          backgroundColor: state.isSelected ? "rgba(255, 255, 255, 0.2)" : "",
          padding: "8px 8px",
          borderRadius: "5px",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }),
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: "black",
          padding: "8px 10px",
          minWidth: "180px",
          border: "1px solid rgba(99, 100, 100, 0.5)",
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          display: "flex",
          border: "1px solid rgba(99, 100, 100, 0.5)",
          borderRadius: "5px",
          color: "white",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "white",
        }),
      });
    } else {
      setStyles({
        option: (provided, state) => ({
          ...provided,
          color: "black",
          backgroundColor: state.isSelected ? "rgba(239, 240, 240, 0.88)" : "",
          padding: "8px 8px",
          borderRadius: "5px",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "rgba(239, 240, 240, 0.88)",
          },
        }),
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: "white",
          padding: "8px 10px",
          minWidth: "180px",
          border: "1px solid rgba(99, 100, 100, 0.5)",
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          display: "flex",
          border: "1px solid rgba(99, 100, 100, 0.5)",
          borderRadius: "5px",
          color: "black",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "black",
        }),
      });
    }
  }, [theme]);
  return { styles };
};

export const useGetStylesTheme = () => {
  const { theme } = useTheme();
  const [styles, setStyles] = useState<{
    grid: string;
    border: string;
    tick: string;
    loading: string;
  }>({
    grid: "white",
    border: "white",
    tick: "white",
    loading: "white",
  });
  useEffect(() => {
    if (theme === "dark") {
      setStyles({
        grid: "white",
        border: "white",
        tick: "white",
        loading: "white",
      });
    } else {
      setStyles({
        grid: "black",
        border: "black",
        tick: "black",
        loading: "black",
      });
    }
  }, [theme]);
  return { styles };
};

export const useModal = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  return {
    show,
    toggle,
  };
};

export const useResizeList = (baseShow: number) => {
  const parent = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(baseShow);
  const [hide, setHide] = useState(0);

  useEffect(() => {
    const resizeEvent = () => {
      if (!parent.current) return;
      const { children, scrollWidth } = parent.current;
      let sizeChild = 0;
      if (children.length > 0) sizeChild = children[0].clientWidth;
      if (scrollWidth < sizeChild * 2) {
        setHide(baseShow);
        setShow(0);
        return;
      }
      const showCal = Math.floor(scrollWidth / sizeChild);
      const count = children.length - showCal;
      if (count > 0) {
        setHide(count + 1);
        setShow(showCal - 1);
      } else {
        setShow(baseShow);
        setHide(0);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, [baseShow]);

  return {
    parent,
    show,
    hide,
  };
};
