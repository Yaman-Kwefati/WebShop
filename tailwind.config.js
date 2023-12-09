/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'body': ['Quicksand'],
    },
    extend: {},
  },
  plugins: [
    require("tailwindcss-inner-border")
  ],
}

