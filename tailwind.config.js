/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sequelHead : 'public/font/Sequel Sans Bold Head.ttf'
      }
    },
  },
  plugins: [],
}

