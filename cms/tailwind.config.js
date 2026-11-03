/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#ea580c',
          600: '#c2410c',
          700: '#9a3412',
        }
      }
    },
  },
  plugins: [],
}

