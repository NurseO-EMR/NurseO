/* eslint-disable no-undef */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      gray: "#F6F9FC",
      white: "#FFFFFF",
      blue: "#3B82F6",
      red: "#F63B3B",
    },
    extend: {
      gridTemplateColumns: {
        "layout": "2fr 10fr",
      },
      gridTemplateRows: {
        "layout": "1fr 5fr",
      },
    },
  },
  plugins: [],
}
