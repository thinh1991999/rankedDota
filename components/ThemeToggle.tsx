import React from "react";
import { useTheme } from "next-themes";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="bg-button-light shadow-btnLight dark:bg-button-dark dark:shadow-btnDark hover:opacity-80 w-10 h-10 rounded-full flex justify-center items-center"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
    </button>
  );
}

export default ThemeToggle;
