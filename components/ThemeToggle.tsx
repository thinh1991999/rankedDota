import React, { useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { useAppSelector } from "../store";
import { useAppDispatch } from "../store/hook";
import { changeDark, changeLight } from "../store/Slices/themeSlice";

function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const handleChange = () => {
    isDarkMode
      ? [dispatch(changeLight()), setIsDarkMode(false)]
      : [dispatch(changeDark()), setIsDarkMode(true)];
  };

  useEffect(() => {
    if (theme.theme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [theme]);

  return (
    <DarkModeToggle
      onChange={() => handleChange()}
      checked={isDarkMode}
      size={40}
    />
  );
}

export default ThemeToggle;
