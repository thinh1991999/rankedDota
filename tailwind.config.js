// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./redux/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        neutral: "hsl(217 33% 17% / 1)",
        background: "hsla(222 47% 11% / var(--tw-bg-opacity, 1));",
        notactive: "#8d8f94",
        darkactive: "#0a0f1c",
        lightactive: "#eeeeee",
      },
      width: {
        player: "1024px",
      },
      border: ["hover"],
      keyframes: {
        card: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  safelist: [{ pattern: /(bg|text)-./ }],
  plugins: [],
};
