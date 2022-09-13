import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "styled-components";
import tw from "twin.macro";
import { headerNavs } from "../share";
import { useAppSelector } from "../store";
import Logo from "./Logo";
import MyImage from "./MyImage";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const theme = useAppSelector((state) => state.theme.theme);
  const translateHeader = useAppSelector((state) => state.root.translateHeader);
  const language = useAppSelector((state) => state.language.language);
  // ${theme.border.selected} border-b-[1px]
  return (
    <header
      className={`${
        translateHeader
          ? `bg-[#b4b4b45e] backdrop-blur-xl text-white`
          : `${theme.background} ${theme.text.main}`
      } fixed z-50 top-0 left-0 right-0 h-[80px] px-[20px]`}
    >
      <div className="h-full flex justify-between items-center container m-auto">
        <div>
          <Logo />
        </div>
        <nav>
          <ul className="list-none flex justify-center items-center">
            {headerNavs.map((nav: any, index: number) => {
              const { name, childs, link } = nav;
              return (
                <li
                  key={index}
                  className="cursor-pointer px-5 py-2 rounded-sm hover:bg-neutral"
                >
                  {link ? (
                    <Link href={"/"}>
                      <a>{name}</a>
                    </Link>
                  ) : (
                    <button>{name}</button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}