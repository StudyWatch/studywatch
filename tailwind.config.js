export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ← הוספה קריטית כאן
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'Alef', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
