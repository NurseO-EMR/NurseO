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
        
      ]
    },
    textColor: {
      red: colors.rose,
      green: colors.green,
      'primary': '#f43f5e',
      'secondary': '#000000',
      'white': "#ffffff"
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,

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
      }
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