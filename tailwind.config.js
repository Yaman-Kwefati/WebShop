/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    'node_modules/preline/dist/*.js',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      'body': ['Quicksand'],
    },
    extend: {
      fontFamily: {
        cocoBiker: ['CocoBikeR']
      }
    },
  },
  plugins: [
    require("tailwindcss-inner-border"),
    require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('flowbite/plugin'),
  ],
}

