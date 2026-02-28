/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          light: '#ff66c4',
          DEFAULT: '#ff0080', // Magenta accent as requested
          dark: '#cc0066',
        }
      }
    },
  },
  plugins: [],
}
