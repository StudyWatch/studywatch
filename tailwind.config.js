/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  safelist: [
    'focus:ring-blue-500',
    'focus:ring-blue-400',
    'focus:ring-indigo-400',
    'focus:ring-gray-400',
    'focus:ring-offset-2',
    'ring-2',
    'ring-offset-2',
    'text-green-800',
    'text-yellow-800',
    'text-red-800',
    'bg-green-100',
    'bg-yellow-100',
    'bg-red-100',
    // 🎨 רקעים - מצב יום
    'from-teal-400',
    'via-cyan-300',
    'to-pink-300',
    // 🎨 רקעים - מצב כהה
    'dark:from-teal-600/70',
    'dark:via-cyan-700/70',
    'dark:to-pink-700/70',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#7c3aed',
        secondary: '#22d3ee',
        accent1:   '#fde047',
        accent2:   '#fb7185',
        accent3:   '#10b981',
        teal:      '#14b8a6',
        amber:     '#f59e0b',
        violet:    '#8b5cf6',
        rose:      '#f43f5e',
        indigo:    colors.indigo,
        emerald:   colors.emerald,
        sky:       colors.sky,
        pink:      colors.pink,
        blue:      colors.blue,
        gray:      colors.gray,
      },
      backgroundImage: {
        'grid-lines': `
          linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
      keyframes: {
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(25px,-30px) scale(1.2)' },
        },
        fadeSlideIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        gradientRotate: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      animation: {
        'grid-pan-fast': 'gridPan 3s linear infinite',
        blob:            'blob 4s ease-in-out infinite',
        'fade-slide-in': 'fadeSlideIn 0.4s ease-out forwards',
        'gradient-rotate':'gradientRotate 10s linear infinite',
      },

      // ✅ נוספו כדי לאפשר אפקט היפוך תלת-ממדי במשחק הזיכרון
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
      },
      transformOrigin: {
        'center': 'center',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
