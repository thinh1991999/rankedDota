import React from "react";
import { useAppSelector } from "../store";
import MyImage from "./MyImage";
import { useAppDispatch } from "../store/hook";
import { useRouter } from "next/router";
import { handleShowNavBarMobile } from "../store/Slices/globalDataSlice";
import { getFixLinkPath } from "../share/ultils";
import { forEach } from "lodash";
import { headerNavs } from "../share/data";

const HeaderMobile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const showNavBarMobile = useAppSelector(
    (state) => state.globalData.showNavBarMobile
  );

  const handleLink = (link: string) => {
    router.push(link);
    dispatch(handleShowNavBarMobile());
  };

  return (
    <div
      className={`${
        showNavBarMobile ? "translate-y-0" : "-translate-y-[calc(100%_+_80px)]"
      } fixed pt-[80px] top-0 left-0 transition-all duration-[0.4s] bottom-0 right-0 bg-black z-40`}
    >
      <ul className="max-w-[600px] m-auto py-3 px-4">
        {headerNavs.map((nav, idx) => {
          const { name, link, hint, icon, childs } = nav;
          const linkFix = getFixLinkPath(router.pathname);
          let checkLink = false;
          if (getFixLinkPath(hint) === linkFix) checkLink = true;
          if (childs) {
            forEach(childs, (child) => {
              console.log(child);

              const { hint } = child;
              if (getFixLinkPath(hint) === linkFix) {
                checkLink = true;
                return false;
              }
            });
          }
          return (
            <li
              key={idx}
              className={`${
                checkLink ? "bg-layer-dark" : ""
              } px-2 py-4 hover:bg-layer-dark rounded-md cursor-pointer flex items-center`}
              onClick={() => handleLink(link)}
            >
              <div className="w-[25px] h-[25px]">
                <MyImage
                  src={icon ? icon : ""}
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
              <span className="font-light ml-2">{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HeaderMobile;
