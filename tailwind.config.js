/* eslint-disable no-undef */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      gray: "#f5f9fc",
      white: "#ffffff",
      blue: "#3b81fa",
      red: "#f53c3a",
      darkGray: "#7a7a7a"
    },
    extend: {
      width: {
        "formWidth": "30rem"
      },
      
      gridTemplateColumns: {
        "multiFormWStepsLayout": "2fr 10fr",
      },
      gridTemplateRows: {
        "multiFormWStepsLayout": "1fr 5fr",
      },
    },
  },
  plugins: [],
}
