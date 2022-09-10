import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../store";
import MyImage from "./MyImage";

function Logo() {
  const theme = useAppSelector((state) => state.theme.theme);
  const translateHeader = useAppSelector((state) => state.root.translateHeader);
  const [link, setLink] = useState<string>(" ");

  useEffect(() => {
    if (translateHeader) {
      setLink("/darkLogo.png");
    } else {
      setLink("/" + theme.theme + "Logo.png");
    }
  }, [theme, translateHeader]);

  return (
    <Link href={"/"}>
      <a className="flex items-center">
        <span className="font-bold uppercase">Ranked</span>
        <MyImage src={link} alt="logo" height={30} width={30} />
      </a>
    </Link>
  );
}

export default Logo;
