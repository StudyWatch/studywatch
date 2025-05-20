import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BotPage from './pages/BotPage';
import FavoritesPage from './pages/FavoritesPage';
import GameEndPage from './pages/GameEndPage';
import TipsPage from './pages/TipsPage';
import ThemeToggleButton from './components/ThemeToggleButton';
import { LanguageProvider } from './context/LanguageContext';

const EpisodesPage = lazy(() => import('./pages/EpisodesPage'));
const GameMenuPage = lazy(() => import('./pages/GameMenuPage'));
const WordTreasureGame = lazy(() => import('./components/games/WordTreasureGame'));
const MemoryGame = lazy(() => import('./components/games/MemoryGame'));
const SentenceMatchGame = lazy(() => import('./components/games/SentenceMatchGame'));

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 font-sans" dir="rtl">

        {/* סרגל ניווט */}
        <header className="fixed top-0 w-full bg-gradient-to-r from-blue-100 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 shadow-lg z-50">
          <div className="container mx-auto flex items-center justify-between px-6 py-3" dir="rtl">

            {/* לוגו */}
            <h1 className="text-2xl font-bold text-blue-700 dark:text-yellow-300 hover:scale-105 transition-transform duration-300">
              <Link to="/" className="flex items-center gap-2">
                📺 StudyWatch
              </Link>
            </h1>

            {/* תפריט רגיל - מחשב */}
            <nav className="hidden sm:flex flex-wrap gap-4 text-gray-700 dark:text-white font-semibold">
              <Link to="/" className="rounded-full px-4 py-2 transition duration-300 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-blue-800 dark:hover:text-blue-300">🏠 דף הבית</Link>
              <Link to="/favorites" className="rounded-full px-4 py-2 transition duration-300 hover:bg-yellow-200 hover:text-yellow-700 dark:hover:bg-yellow-700 dark:hover:text-yellow-300">⭐ מועדפים</Link>
              <Link to="/bot" className="rounded-full px-4 py-2 transition duration-300 hover:bg-purple-200 hover:text-purple-700 dark:hover:bg-purple-700 dark:hover:text-purple-300">🤖 בוט המלצות</Link>
              <Link to="/tips" className="rounded-full px-4 py-2 transition duration-300 hover:bg-amber-200 hover:text-amber-700 dark:hover:bg-amber-600 dark:hover:text-amber-300">💡 טיפים</Link>
              <ThemeToggleButton />
            </nav>

            {/* אייקון המבורגר - מובייל */}
            <div className="sm:hidden">
              <button onClick={toggleMenu} className="text-3xl text-blue-700 dark:text-white">
                ☰
              </button>
            </div>
          </div>

          {/* תפריט צד נפתח - מובייל */}
          {menuOpen && (
            <div className="bg-white dark:bg-gray-800 shadow-md sm:hidden flex flex-col items-center gap-6 py-6">
              <Link onClick={closeMenu} to="/" className="text-lg text-blue-700 dark:text-white hover:underline">🏠 דף הבית</Link>
              <Link onClick={closeMenu} to="/favorites" className="text-lg text-yellow-600 dark:text-yellow-300 hover:underline">⭐ מועדפים</Link>
              <Link onClick={closeMenu} to="/bot" className="text-lg text-purple-600 dark:text-purple-300 hover:underline">🤖 בוט המלצות</Link>
              <Link onClick={closeMenu} to="/tips" className="text-lg text-amber-600 dark:text-amber-300 hover:underline">💡 טיפים</Link>
              <ThemeToggleButton />
            </div>
          )}
        </header>

        {/* תוכן הדף */}
        <main className="flex-1 w-full px-4 pt-28 pb-8">
          <Suspense fallback={<div className="text-center my-10 text-lg">⏳ טוען...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/bot" element={<BotPage />} />
              <Route path="/tips" element={<TipsPage />} />
              <Route path="/episodes/:seriesId" element={<EpisodesPage />} />
              <Route path="/games" element={<GameMenuPage />} />
              <Route path="/games/word-treasure" element={<WordTreasureGame />} />
              <Route path="/games/memory" element={<MemoryGame />} />
              <Route path="/games/sentence-match" element={<SentenceMatchGame />} />
              <Route path="/game-end" element={<GameEndPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
