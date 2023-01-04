// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./redux/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        notactive: "#8d8f94",
        darkactive: "#0a0f1c",
        lightactive: "#eeeeee",
        button: {
          dark: "#282727a1",
          light: "rgba(90, 90, 90, 0.3)",
        },
        neutral: {
          dark: "hsl(217 33% 17% / 1)",
          light: "#E3E3E6",
        },

        textPrimary: {
          dark: "hsla(222 66% 82% / var(--tw-text-opacity, 1))",
          light: "#080807",
        },
        textSecondPrimary: {
          dark: "rgba(255, 255, 255, 0.6)",
          light: "rgba(50, 45, 47, 1)",
        },
        textMain: {
          dark: "white",
          light: "black",
        },
        background: {
          dark: "#000000",
          light: "rgba(242, 243, 243, 0.88)",
        },
        bgSelect: {
          dark: "rgba(55, 53, 54, 1)",
          light: "white",
        },
        component: {
          dark: "#0c1322",
          light: "#F5F5F5",
        },
        btn: {
          dark: "rgba(255, 255, 255, 0.08)",
          light: "rgba(208, 208, 208, 0.4)",
        },
        layer: {
          dark: "rgba(255, 255, 255, 0.08)",
          light: "rgba(208, 208, 208, 0.4)",
        },
        layerStrong: {
          dark: "rgba(255, 255, 255, 0.12)",
          light: "rgba(166 ,164, 164,0.3 )",
        },
        layerSecondary: {
          dark: "rgba(255, 255, 255, 0.04)",
          light: "rgba(255, 255, 255, 0.4)",
        },
        borderSecondary: {
          dark: "rgba(99, 100, 100, 1)",
          light: "rgba(0, 0, 0, 0.12)",
        },
        borderTender: {
          dark: "rgba(99, 100, 100, 0.5)",
          light: "rgba(0, 0, 0, 0.12)",
        },
        borderTenderStrong: {
          dark: "rgba(99, 100, 100, 0.2)",
          light: "rgba(0, 0, 0, 0.12)",
        },
        navBg: {
          dark: "rgba(27, 26, 27, 0.8)",
          light: "rgba(255, 255, 255, 0.9)",
        },
      },
      width: {
        player: "1024px",
      },
      boxShadow: {
        btnDark: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        btnLight: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        cardDark: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        cardLight: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
      border: ["hover"],
      keyframes: {
        card: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10px)" },
        },
        navBarMobile: {
          "0%": {},
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        showHeaderMobile: "navBarMobile 0.3s linear forwards",
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
          // "2xl": "1496px",
        },
      },
    },
    theme: {
      screens: {
        sm: "500px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1240px",
        // => @media (min-width: 1240px) { ... }
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  safelist: [{ pattern: /(bg|text|boxShadow)-./ }],
  plugins: [],
};
