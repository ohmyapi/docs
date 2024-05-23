/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./public/assets/content/**/*.json"
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ['light'],
  }
}

