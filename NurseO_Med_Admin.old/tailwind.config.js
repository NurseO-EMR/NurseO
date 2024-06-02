const { createThemes } = require('tw-colors');
const colorThemes = require("./src/colorThemes.json")

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];

export const plugins = [
  createThemes(colorThemes)
];