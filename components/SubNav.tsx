import Link from "next/link";
import { useRouter } from "next/router";
import Dropdown from "rc-dropdown";
import React from "react";
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

  return (
    <div className="border-solid border-b  border-borderTender-dark relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-10"></div>
      <nav className="container flex text-sm relative">
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
                                        <a className="py-2 px-3 rounded-md flex flex-col hover:bg-layer-dark cursor-pointer">
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
                                <a className="py-2 px-3 rounded-md flex items-center justify-between hover:bg-layer-dark cursor-pointer">
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
                                    ? "bg-navBg-light dark:bg-navBg-dark dark:text-textMain-dark text-textMain-light"
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
    </div>
  );
};

export default SubNav;
