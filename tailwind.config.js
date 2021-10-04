const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  theme: {
    borderWidth: {
      DEFAULT: "1px"
    },
    gridTemplateAreas: {
      "main": [
        "topNav topNav topNav",
        "sideBar main main",
        "sideBar main main"
      ]
    },
    textColor: {
      'primary': '#000000',
      'secondary': '#f31010',
      'danger': '#e3342f',
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
        "maxContent": "max-content"
      }
    }
  },
  variants: {
    gridTemplateAreas: ['responsive'],
    extend: {
      borderColor: ['focus-visible'],
      backgroundColor: ["odd", "even"]
    }
  }
}