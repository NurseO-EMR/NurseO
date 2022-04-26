module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'layout': '2fr 10fr',
      },
      gridTemplateRows: {
        'layout': '1fr 5fr',
      },
    },
  },
  plugins: [],
}
