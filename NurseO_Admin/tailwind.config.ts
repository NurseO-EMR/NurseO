import { type Config } from "tailwindcss";
import colors from 'tailwindcss/colors';
import { createThemes } from 'tw-colors';
import colorThemes from "./src/colorThemes.json";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    gridTemplateAreas: {
      "main": [
        "topNav topNav",
        "sideBar armBand",
        "sideBar main",

      ]
    },
    colors: {
      ...colors,
      gray: "#f5f9fc",
      "gray-100": "#f3f4f6",
      "gray-200": "#e5e7eb",
      "gray-300": "#d1d5db",
      white: "#ffffff",
      blue: "#3b81fa",
      red: "#f53c3a",
      darkGray: "#7a7a7a",
      disabled: "#f3f6f8",
      info: "#075985",
      success: "#059669",
      admin: "#334155",
      edit: "#DC2626",
    },
    extend: {
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        logo: ['Monoton', 'cursive']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        "78/100": "78%"

      },
      width: {
        "formWidth": "30rem",
        "70vw": "70vw",
        "60vw": "60vw"
      },
      borderRadius: {
        '4xl': '2rem',
      },
      gridTemplateColumns: {
        "twoSections": "1.2fr 7fr",
        "multiFormWStepsLayout": "2fr 10fr",

      },
      gridTemplateRows: {
        "threeSections": "min-content min-content 1fr",
        "multiFormWStepsLayout": "1fr 5fr",
      },
      zIndex: {
        'background': "-5",
        'hue': "-4"
      },


    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    createThemes(colorThemes)
  ],
} satisfies Config;
