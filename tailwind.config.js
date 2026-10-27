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
          darker: '#021024',
          dark: '#052659',
          primary: '#5483B3',
          light: '#7DA0CA',
          soft: '#C1E8FF',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      }
    },
  },
  plugins: [],
}