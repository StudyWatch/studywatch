import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Home, Send, Bot, Menu, Lightbulb } from 'lucide-react';
import ThemeToggleButton from './ThemeToggleButton';

export default function Navbar({ onFavoritesClick, onFeedbackClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* לוגו */}
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-yellow-300 hover:scale-105 transition-transform duration-300">
          <Link to="/" className="flex items-center gap-2">
            📺 <span className="tracking-wide">StudyWatch</span>
          </Link>
        </h1>

        {/* תפריט רגיל - מחשב */}
        <nav className="hidden sm:flex items-center gap-6 text-gray-700 dark:text-white font-semibold text-lg">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-300 transition">🏠 דף הבית</Link>
          <Link to="/favorites" className="hover:text-yellow-500 dark:hover:text-yellow-300 transition">⭐ מועדפים</Link>
          <Link to="/bot" className="hover:text-purple-600 dark:hover:text-purple-300 transition">🤖 בוט המלצות</Link>
          <Link to="/tips" className="hover:text-amber-600 dark:hover:text-amber-300 transition">💡 טיפים</Link>
          <ThemeToggleButton />
        </nav>

        {/* כפתור המבורגר – מובייל */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-blue-700 dark:text-white">
            <Menu />
          </button>
        </div>
      </div>

      {/* תפריט צד נפתח - מובייל */}
      {menuOpen && (
        <div className="bg-white dark:bg-gray-800 shadow-md sm:hidden flex flex-col items-center gap-6 py-6 text-lg">
          <Link onClick={() => setMenuOpen(false)} to="/" className="text-blue-700 dark:text-white hover:underline">🏠 דף הבית</Link>
          <Link onClick={() => setMenuOpen(false)} to="/favorites" className="text-yellow-600 dark:text-yellow-300 hover:underline">⭐ מועדפים</Link>
          <Link onClick={() => setMenuOpen(false)} to="/bot" className="text-purple-600 dark:text-purple-300 hover:underline">🤖 בוט המלצות</Link>
          <Link onClick={() => setMenuOpen(false)} to="/tips" className="text-amber-600 dark:text-amber-300 hover:underline">💡 טיפים</Link>
          <ThemeToggleButton />
        </div>
      )}
    </header>
  );
}
