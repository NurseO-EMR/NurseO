const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  theme: {
    gridTemplateAreas: {
      "main": [
        "topNav topNav",
        "sideBar armBand",
        "sideBar main",
        
      ]
    },
    textColor: {
      red: colors.rose,
      green: colors.green,
      'primary': '#B91C1C',
      'secondary': '#000000',
      'white': "#ffffff"
    },
    colors: {
      ...colors,
      primary: "#B91C1C",
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
        "70vw": "70vw"
      }
    }
  },
}