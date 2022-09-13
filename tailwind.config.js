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
      container: {
        // you can configure the container to be centered
        center: true,

        // or have default horizontal padding
        padding: "1rem",

        // default breakpoints but with 40px removed
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
          "2xl": "1496px",
        },
      },
    },
  },
  safelist: [{ pattern: /(bg|text)-./ }],
  plugins: [],
};
