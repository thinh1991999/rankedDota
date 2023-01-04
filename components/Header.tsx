import Link from "next/link";
import React from "react";
import { useAppSelector } from "../store";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";
import {
  AiOutlineClose,
  AiOutlineDown,
  AiOutlineMenu,
  AiOutlineRight,
} from "react-icons/ai";
import HeaderMobile from "./HeaderMobile";
import { useAppDispatch } from "../store/hook";
import { handleShowNavBarMobile } from "../store/Slices/globalDataSlice";
import { headerNavs } from "../share/data";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const showNavBarMobile = useAppSelector(
    (state) => state.globalData.showNavBarMobile
  );
  return (
    <>
      <header
        className={`border-b border-solid border-borderTender-dark text-textMain-light  dark:text-textMain-dark fixed z-50 top-0 left-0 right-[10px] h-[80px] `}
      >
        <div className="h-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg"></div>
          <div className="relative h-full flex justify-between items-center container m-auto">
            <button
              className="text-xl lg:hidden block p-2 hover:bg-layer-dark rounded-md"
              onClick={() => dispatch(handleShowNavBarMobile())}
            >
              {showNavBarMobile ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
            <div className="lg:w-2/12 ">
              <Logo />
            </div>
            <nav className="flex-1 lg:flex hidden items-center font-medium">
              {headerNavs.map((nav, idx) => {
                const { name, childs, link } = nav;
                return (
                  <Dropdown
                    key={idx}
                    trigger={["hover"]}
                    overlay={
                      childs ? (
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
                                    <ul className="absolute left-full bg-navBg-light dark:bg-navBg-dark border border-solid border-borderTender-dark p-2 rounded-md w-[230px]">
                                      {childs?.map((child, idx) => {
                                        const { name, sub, link } = child;
                                        return (
                                          <li key={idx}>
                                            <Link href={link}>
                                              <a className="py-2 px-3 rounded-md flex flex-col hover:bg-button-light dark:hover:bg-button-dark cursor-pointer">
                                                {name}
                                                <span className="text-xs dark:text-textSecondPrimary-dark text-textSecondPrimary-light">
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
                                        <AiOutlineRight className=" text-xs" />
                                      </a>
                                    </Link>
                                  </button>
                                </Dropdown>
                              );
                            }
                            return (
                              <li key={idx}>
                                <Link href={link}>
                                  <a className="py-2 px-3 rounded-md flex items-center justify-between hover:bg-button-light dark:hover:bg-button-dark cursor-pointer">
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
                    <button>
                      <Link href={link}>
                        <a className="flex items-center px-3 py-2 rounded-md dark:hover:bg-button-dark hover:bg-button-light dark:hover:text-textMain-dark hover:text-textMain-light text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
                          {name}{" "}
                          {childs && <AiOutlineDown className="ml-3 text-xs" />}
                        </a>
                      </Link>
                    </button>
                  </Dropdown>
                );
              })}
            </nav>
            <div className="lg:w-3/12 flex justify-end items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <HeaderMobile />
    </>
  );
}
