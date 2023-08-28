/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",  ],
  theme: {
    extend: {
      spacing: {
        '96': '24rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        barlow: ['Barlow'],
      },
      maxWidth: {
        'mmenu': '10rem'
      },
      minWidth: {
        '96': '24rem',
        'mmenu': '2rem'
      }
    },
  },
  plugins: [],
}
