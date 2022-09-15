import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import DarkModeToggle from "react-dark-mode-toggle";
import { useAppSelector } from "../store";
import { useAppDispatch } from "../store/hook";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // const dispatch = useAppDispatch();
  // const theme = useAppSelector((state) => state.theme.theme);
  // const [isDarkMode, setIsDarkMode] = useState(() => false);
  // const handleChange = () => {
  //   isDarkMode
  //     ? [dispatch(changeLight()), setIsDarkMode(false)]
  //     : [dispatch(changeDark()), setIsDarkMode(true)];
  // };

  // useEffect(() => {
  //   if (theme.theme === "dark") {
  //     setIsDarkMode(true);
  //   } else {
  //     setIsDarkMode(false);
  //   }
  // }, [theme]);

  return (
    <section className="text-xl">
      {theme === "dark" ? (
        <button
          className="bg-neutral-light shadow-btnLight dark:bg-neutral-dark dark:shadow-btnDark hover:opacity-80 w-10 h-10 rounded-full flex justify-center items-center"
          onClick={() => setTheme("light")}
        >
          <BsFillSunFill />
        </button>
      ) : (
        <button
          className="bg-neutral-light shadow-btnLight dark:bg-neutral-dark dark:shadow-btnDark hover:opacity-80 w-10 h-10 rounded-full flex justify-center items-center"
          onClick={() => setTheme("dark")}
        >
          <BsFillMoonStarsFill />
        </button>
      )}
    </section>
  );
}

export default ThemeToggle;
