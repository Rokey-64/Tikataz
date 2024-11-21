/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm':'735px',
        'md':'840px',
        'lg':'1225px',
        'xl':'1420px',
      },
    },
  },
  plugins: [],
}

