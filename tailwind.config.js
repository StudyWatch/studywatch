// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'Alef', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.625rem', // הוספה של text-xxs
      },
    },
  },
  plugins: [],
}
