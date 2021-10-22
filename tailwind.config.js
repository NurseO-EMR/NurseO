const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  theme: {
    gridTemplateAreas: {
      "main": [
        "topNav topNav",
        "sideBar armBand",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
        "sideBar main",
      ]
    },
    textColor: {
      'primary': '#f43f5e',
      'secondary': '#000000',
      'white': "#ffffff"
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,

    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
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
        "twoSections": "1fr 7fr"
      },
    }
  },
  variants: {
    gridTemplateAreas: ['responsive'],
    fontSize: ['hover', 'focus'],
    extend: {
      borderColor: ['focus-visible'],
      backgroundColor: ["odd", "even"]
    }
  }
}