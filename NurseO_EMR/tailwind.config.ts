import { type Config } from "tailwindcss";
import colors from 'tailwindcss/colors';
import { createThemes } from 'tw-colors';
import colorThemes from "./src/colorThemes.json";


module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

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
      admin: "#334155",
      edit: "#DC2626",
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      logo: ['Monoton', 'cursive']
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      gridTemplateColumns: {
        "twoSections": "1.2fr 7fr",
      },
      gridTemplateRows: {
        "threeSections": "min-content min-content 1fr"
      },
      zIndex: {
        'background': "-5",
        'hue': "-4"
      },

      width: {
        "70vw": "70vw",
        "60vw": "60vw"
      }
    }
  },

  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    createThemes(colorThemes)
  ],
} satisfies Config;
