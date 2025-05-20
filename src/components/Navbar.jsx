import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Home, Send, Bot, Menu, Lightbulb } from 'lucide-react'; // Lightbulb לאייקון טיפים
import ThemeToggleButton from './ThemeToggleButton';

export default function Navbar({ onFavoritesClick, onFeedbackClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-md p-3 flex items-center justify-between px-6" dir="rtl">
      
      {/* לוגו */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-700 dark:text-yellow-300">
        <span>📺</span>
        <Link to="/" className="hover:text-yellow-400 transition duration-300">
          StudyWatch
        </Link>
      </div>

      {/* כפתור המבורגר – למובייל */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="md:hidden text-gray-700 dark:text-white hover:text-blue-600 focus:outline-none"
      >
        <Menu size={26} />
      </button>

      {/* תפריט ניווט */}
      <div className={`flex-col md:flex-row md:flex items-center gap-4 md:gap-8 ${menuOpen ? 'flex' : 'hidden'} md:visible absolute md:static bg-white dark:bg-gray-800 md:bg-transparent top-full md:top-auto right-0 md:right-auto w-full md:w-auto p-4 md:p-0 shadow md:shadow-none`}>
        
        <Link to="/" className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md transition">
          <Home size={20} />
          דף הבית
        </Link>

        <button onClick={onFavoritesClick} className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md transition">
          <Star size={20} />
          מועדפים
        </button>

        <button onClick={onFeedbackClick} className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md transition">
          <Send size={20} />
          שלח פידבק
        </button>

        <Link to="/bot" className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md transition">
          <Bot size={20} />
          בוט המלצות
        </Link>

        <Link to="/tips" className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md transition">
          <Lightbulb size={20} />
          טיפים
        </Link>

        {/* כפתור מצב תצוגה */}
        <div>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
