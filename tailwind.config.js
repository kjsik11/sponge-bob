const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        krabbyPatty: ['var(--font-krabbyPatty)'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
