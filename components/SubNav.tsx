import Link from "next/link";
import { useRouter } from "next/router";
import _ from "lodash";
import Dropdown from "rc-dropdown";
import React, { useMemo } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { HeaderNav } from "../share/navData";

const SubNav = ({ navs }: { navs: HeaderNav[] }) => {
  const { pathname } = useRouter();
  const getFixLinkPath = (path: string) => {
    const idx = path.indexOf("?");
    if (idx !== -1) {
      return path.substring(0, idx);
    }
    return path;
  };

  const pathCurr = useMemo((): {
    main: HeaderNav | null;
    child: HeaderNav | null;
  } => {
    const linkFix = getFixLinkPath(pathname);
    let finalNav: HeaderNav | null = null;
    let childNav: HeaderNav | null = null;
    const get = (arr: HeaderNav[]) => {
      for (let i = 0; i < arr.length; i++) {
        const { hint, childs } = arr[i];
        if (!childs) {
          if (hint === linkFix) {
            finalNav = arr[i];
            break;
          }
        } else {
          let checked = false;
          _.forEach(childs, (navChild) => {
            const { hint } = navChild;
            if (hint === linkFix) {
              finalNav = arr[i];
              childNav = navChild;
              checked = true;
              return false;
            }
          });
          if (checked) break;
        }
      }
    };
    get(navs);
    return {
      main: finalNav,
      child: childNav,
    };
  }, [pathname, navs]);

  return (
    <div className="border-solid border-b border-borderTender-dark relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-10"></div>
      <nav className="container  text-sm relative lg:flex hidden">
        {navs.map((nav, idx) => {
          const { name, childs, link, fatherLink = "" } = nav;
          const checkActiveMain = childs
            ? pathname.includes(fatherLink)
            : pathname === link;
          return (
            <Dropdown
              key={idx}
              trigger={["hover"]}
              overlay={
                childs && !checkActiveMain ? (
                  <ul className="bg-navBg-light dark:bg-navBg-dark p-2 rounded-md w-[230px] border border-solid border-borderTender-dark">
                    {childs?.map((child, idx) => {
                      const { name, childs, link } = child;
                      if (childs) {
                        return (
                          <Dropdown
                            key={idx}
                            placement="topLeft"
                            trigger={["hover"]}
                            overlay={
                              <ul className="absolute left-full bg-navBg-dark border border-solid border-borderTender-dark p-2 rounded-md w-[230px]">
                                {childs?.map((child, idx) => {
                                  const { name, sub, link } = child;
                                  return (
                                    <li key={idx}>
                                      <Link href={link}>
                                        <a className="py-2 px-3 rounded-md flex flex-col hover:bg-layer-light dark:hover:bg-layer-dark cursor-pointer">
                                          {name}
                                          <span className="text-xs text-textSecondPrimary-dark">
                                            {sub}
                                          </span>
                                        </a>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            }
                            animation="slide-up"
                          >
                            <button className="w-full">
                              <Link href={link}>
                                <a className="py-2 px-3 rounded-md flex items-center justify-between hover:bg-layer-light dark:hover:bg-layer-dark cursor-pointer">
                                  {name}
                                </a>
                              </Link>
                            </button>
                          </Dropdown>
                        );
                      }
                      return (
                        <li key={idx}>
                          <Link href={link}>
                            <a
                              className={`${
                                pathname === getFixLinkPath(link)
                                  ? "dark:bg-layer-dark bg-layer-light"
                                  : ""
                              } py-2 px-3 rounded-md flex items-center justify-between hover:bg-layer-light dark:hover:bg-layer-dark cursor-pointer`}
                            >
                              {name}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : undefined
              }
              animation="slide-up"
            >
              <div
                className={`${
                  childs && checkActiveMain
                    ? "border-l border-r border-solid border-borderTender-dark"
                    : ""
                } flex items-center relative p-2 `}
              >
                <button className="relative">
                  <Link href={link}>
                    <a
                      className={`${
                        checkActiveMain && !childs
                          ? "dark:bg-button-dark-dark bg-button-light dark:text-textMain-dark text-textMain-light"
                          : ""
                      } flex items-center px-3 py-2 rounded-md dark:hover:bg-button-dark hover:bg-button-light hover:text-textPrimary-light dark:hover:text-textMain-dark dark:text-textSecondPrimary-dark text-textSecondPrimary-light`}
                    >
                      {name}{" "}
                      {childs ? (
                        checkActiveMain ? (
                          <AiOutlineRight className="ml-3 text-xs" />
                        ) : (
                          <AiOutlineDown className="ml-3 text-xs" />
                        )
                      ) : (
                        <></>
                      )}
                    </a>
                  </Link>
                </button>
                {childs && checkActiveMain && (
                  <>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black dark:opacity-25 opacity-10 "></div>
                    <ul className="flex items-center relative">
                      {childs?.map((child, idx) => {
                        const { name, childs, link } = child;
                        if (childs) {
                          return (
                            <Dropdown
                              key={idx}
                              placement="topLeft"
                              trigger={["hover"]}
                              overlay={
                                <ul className="absolute left-full bg-navBg-light dark:bg-navBg-dark border border-solid border-borderTender-dark p-2 rounded-md w-[230px]">
                                  {childs?.map((child, idx) => {
                                    const { name, sub, link } = child;
                                    return (
                                      <li key={idx}>
                                        <Link href={link}>
                                          <a className="py-2 px-3 rounded-md flex flex-col hover:bg-button-light dark:hover:bg-button-dark cursor-pointer">
                                            {name}
                                            <span className="text-xs text-textSecondPrimary-dark">
                                              {sub}
                                            </span>
                                          </a>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              }
                              animation="slide-up"
                            >
                              <button className="w-full">
                                <Link href={link}>
                                  <a className="py-2 px-3 rounded-md flex items-center justify-between hover:bg-button-light dark:hover:bg-button-dark cursor-pointer">
                                    {name}
                                  </a>
                                </Link>
                              </button>
                            </Dropdown>
                          );
                        }
                        return (
                          <li key={idx}>
                            <Link href={link}>
                              <a
                                className={`${
                                  pathname === getFixLinkPath(link)
                                    ? "bg-button-light  dark:bg-button-dark dark:text-textMain-dark text-textMain-light"
                                    : ""
                                } py-2 px-3 rounded-md flex items-center justify-between hover:bg-button-light dark:hover:bg-button-dark cursor-pointer`}
                              >
                                {name}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            </Dropdown>
          );
        })}
      </nav>
      <nav className="container lg:hidden flex text-sm relative">
        <Dropdown
          trigger={["click"]}
          overlay={
            <ul className="bg-navBg-light dark:bg-navBg-dark p-2 rounded-md w-full border border-solid border-borderTender-dark">
              {navs?.map((child, idx) => {
                const { name, childs, link } = child;
                // if (childs) {
                //   return (
                //     <Dropdown
                //       key={idx}
                //       placement="topLeft"
                //       animation="slide-up"
                //     >
                //       <button className="w-full">
                //         <Link href={link}>
                //           <a className="py-2 px-3 rounded-md flex items-center justify-between hover:bg-layer-dark cursor-pointer">
                //             {name}
                //           </a>
                //         </Link>
                //       </button>
                //     </Dropdown>
                //   );
                // }
                return (
                  <li key={idx}>
                    <Link href={link}>
                      <a
                        className={`${
                          link === pathCurr.main?.link
                            ? "bg-layer-dark text-textMain-dark"
                            : ""
                        } py-2 px-3 rounded-md flex items-center justify-between hover:bg-layer-dark cursor-pointer`}
                      >
                        {name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          }
          animation="slide-up"
        >
          <div
            className={`flex items-center justify-between cursor-pointer relative p-2 rounded-md dark:bg-layer-dark bg-layer-light w-full my-2`}
          >
            <button className="relative">
              {pathCurr ? pathCurr.main?.name : ""}
            </button>
            <AiOutlineDown />
          </div>
        </Dropdown>
        {pathCurr.main?.childs && (
          <Dropdown
            trigger={["click"]}
            overlay={
              <ul className="bg-navBg-light  dark:bg-navBg-dark p-2 rounded-md w-full border border-solid border-borderTender-dark">
                {pathCurr.main.childs.map((child, idx) => {
                  const { name, childs, link } = child;
                  return (
                    <li key={idx}>
                      <Link href={link}>
                        <a
                          className={`${
                            pathname === getFixLinkPath(link)
                              ? "bg-layer-dark text-textMain-dark"
                              : ""
                          } py-2 px-3 rounded-md flex items-center justify-between hover:bg-layer-dark cursor-pointer`}
                        >
                          {name}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            }
            animation="slide-up"
          >
            <div
              className={`ml-2 flex items-center justify-between cursor-pointer relative p-2 rounded-md dark:bg-layer-dark bg-layer-light w-full my-2`}
            >
              <button className="relative">
                {pathCurr ? pathCurr.child?.name : ""}
              </button>
              <AiOutlineDown />
            </div>
          </Dropdown>
        )}
      </nav>
    </div>
  );
};

export default SubNav;
