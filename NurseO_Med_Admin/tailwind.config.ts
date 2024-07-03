import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { createThemes } from 'tw-colors';
import colorThemes from "./src/colorThemes.json";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    createThemes(colorThemes)
  ],
} satisfies Config;
