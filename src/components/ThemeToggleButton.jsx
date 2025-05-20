import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      {theme === 'dark' ? 'מצב יום' : 'מצב לילה'}
    </button>
  );
}
