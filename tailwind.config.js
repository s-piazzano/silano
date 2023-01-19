/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--inter-font)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        forest: "#516559",
        base: {
          100: "#F4F4F2",
          200: "#EEEEE8",
        },
      },
    },
  },
  plugins: [],
};
