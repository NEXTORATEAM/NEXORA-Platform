/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- تفعيل الوضع الداكن عبر الكلاسات
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darker: '#0A2540',
          dark: '#1E3A8A',
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