/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        animation: {
          'scaleX': 'scaleX 1.5s linear infinite',
        },
        keyframes: {
          scaleX: {
            '0%': { transform: 'scaleX(0)' },
            '100%': { transform: 'scaleX(1)' },
          },
        },
        screens: {
          'sm': '735px',
          'md': '840px',
          'ct': '1024px',
          'lg': '1320px',
          'xl': '1420px',
        },
      },
    },
    plugins: [],
  }