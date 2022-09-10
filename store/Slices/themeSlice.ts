import { createSlice } from "@reduxjs/toolkit";
import { MainThemeState, Theme } from "../../interfaces/store";
import { RootState } from "../store";

const dark: any = {
  theme: "dark",
  background: "bg-background",
  shadow: "black",
  text: {
    main: "text-white",
    selected: "text-white",
    notselected: "text-notactive",
  },
  border: {
    selected: "border-white",
    notselected: "#8d8f94",
  },
  card: {
    text: "text-white",
    texthover: "#111827",
    bghover: "#D1D5DB",
  },
  animation: "white",
  svg: "%231a1c20",
  svghover: "%23ffffff",
  button: {
    background: "bg-white",
    text: "text-gray-900",
    hover: {
      background: "#101010",
      text: "#fff",
    },
    border: "border-white",
  },
  detailsButton: {
    background: "#101010",
    text: "#fff",
    border: "#8d8f94",
    hover: {
      background: "#fff",
      text: "#101010",
      border: "#101010",
    },
  },
  neutral: "bg-neutral",
  bannerGray: "grayscale-[0.6]",
  footer: "bg-darkactive",
};

const light: any = {
  theme: "light",
  background: "bg-white",
  shadow: "black",
  text: {
    main: "text-black",
    selected: "text-background",
    notselected: "text-gray-700",
  },
  border: {
    selected: "border-gray-900",
    notselected: "#9ca3af",
  },
  card: {
    text: "text-gray-900",
    texthover: "#f3f4f6",
    bghover: "#101010",
  },
  animation: "#000000",
  svg: "%23ffffff",
  svghover: "%231a1c20",
  button: {
    background: "bg-background",
    text: "text-white",
    hover: {
      background: "#fff",
      text: "#111827",
    },
    border: "border-gray-900",
  },
  detailsButton: {
    background: "#fff",
    text: "#1a1c20",
    border: "#8d8f94",
    hover: {
      background: "#101010",
      text: "#fff",
      border: "#1a1c20",
    },
  },
  neutral: "bg-neutral",
  bannerGray: "grayscale-[0.3]",
  footer: "bg-lightactive",
};

const initialState: any = {
  theme: dark,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeDark: (state) => {
      state.theme = dark;
    },
    changeLight: (state) => {
      state.theme = light;
    },
  },
});

export const { changeDark, changeLight } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.value;

export default themeSlice.reducer;
