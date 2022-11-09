import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../store";
import MyImage from "./MyImage";

function Logo() {
  const { theme } = useTheme();
  const [link, setLink] = useState("/lightLogo.png");
  // const theme = useAppSelector((state) => state.theme.theme);
  // const translateHeader = useAppSelector((state) => state.root.translateHeader);
  useEffect(() => {
    // if (translateHeader) {
    //   setLink("/darkLogo.png");
    // } else {
    //   setLink("/" + theme.theme + "Logo.png");
    // }
    setLink("/" + theme + "Logo.png");
  }, [theme]);

  return (
    <Link href={"/"}>
      <a className="flex items-center">
        <span className="font-bold uppercase">Ranked</span>
        <MyImage src={link} alt="logo" height="30px" width="30px" />
      </a>
    </Link>
  );
}

export default Logo;
