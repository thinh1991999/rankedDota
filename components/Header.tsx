import Image from "next/image";
import Link from "next/link";
import React from "react";
import tw from "twin.macro";
import { headerNavs } from "../share/navData";
import { useAppSelector } from "../store";
import Logo from "./Logo";
import MyImage from "./MyImage";
import ThemeToggle from "./ThemeToggle";
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

export default function Navbar() {
  return (
    <header
      className={`border-b border-solid border-borderTender-dark text-textMain-light  dark:text-textMain-dark fixed z-50 top-0 left-0 right-0 h-[80px] px-[20px]`}
    >
      <div className="h-full flex justify-between items-center container m-auto">
        <div className="w-2/12">
          <Logo />
        </div>
        <nav className="flex-1 flex items-center font-medium">
          {headerNavs.map((nav, idx) => {
            const { name, childs, link } = nav;
            return (
              <Dropdown
                key={idx}
                trigger={["hover"]}
                overlay={
                  childs ? (
                    <ul className="bg-navBg-dark p-2 rounded-md w-[230px] border border-solid border-borderTender-dark">
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
                              <a className="py-2 px-3 rounded-md flex items-center justify-between hover:bg-layer-dark cursor-pointer">
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
                    <a className="flex items-center px-3 py-2 rounded-md hover:bg-layer-dark hover:text-textMain-dark text-textSecondPrimary-dark">
                      {name}{" "}
                      {childs && <AiOutlineDown className="ml-3 text-xs" />}
                    </a>
                  </Link>
                </button>
              </Dropdown>
            );
          })}
        </nav>
        <div className="w-3/12 flex justify-end items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
