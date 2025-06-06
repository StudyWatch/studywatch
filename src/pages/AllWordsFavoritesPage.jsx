// src/pages/AllWordsFavoritesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedData } from '../context/SavedDataContext';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';
import useStats from '../hooks/useStats';
import statsManager from '../utils/statsManager';            // <<– הייבוא החסר
import WordFavoriteCard from '../components/WordFavoriteCard';

export default function AllWordsFavoritesPage() {
  const { savedWords, removeWord } = useSavedData();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { t } = useTranslation();
  const isRtl = ['he', 'ar'].includes(settings.uiLang);

  // 1) ברירת מחדל של הפילטרים (difficulty=all, successBelow=100, neverPracticed=false, withNotes=false)
  const [filter, setFilter] = useState({
    difficulty: 'all',
    successBelow: 100,
    neverPracticed: false,
    withNotes: false,
  });

  // 2) סינון savedWords לפי הפילטרים
  const filteredWords = savedWords.filter((w) => {
    // א. פילטר לפי קושי
    if (filter.difficulty !== 'all' && w.difficulty !== filter.difficulty) {
      return false;
    }

    // ב. שליפת סטטיסטיקות מהמנהל (statsManager)
    const prog = statsManager.getWordProgress(w.key) || { attempts: 0, correct: 0, successRate: 0 };
    const atts = prog.attempts || 0;
    const sucRate = prog.successRate || 0;

    // ג. פילטר הצלחה מתחת לערך שנבחר
    if (sucRate > (filter.successBelow || 0)) {
      return false;
    }

    // ד. פילטר “neverPracticed”: רק מילים עם 0 ניסיונות
    if (filter.neverPracticed && atts > 0) {
      return false;
    }

    // ה. פילטר “withNotes”: רק מילים שיש להן הערה ב־localStorage
    const note = localStorage.getItem(`note_${w.key}`) || '';
    const hasNote = note.trim().length > 0;
    if (filter.withNotes && !hasNote) {
      return false;
    }

    return true;
  });

  // 3) קריאה ל־useStats כדי לעדכן סטטיסטיקות בכל פעם שמשתנים נתוני localStorage
  useStats();

  return (
    <BackgroundWrapper pageName="favorites" extension=".png">
      <main
        className={`
          w-full max-w-screen-xl mx-auto px-4 py-12 font-sans
          transition-opacity duration-500
          ${isRtl ? 'text-right' : 'text-left'}
        `}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          {t('favorites.viewAllWords') || 'כל המילים השמורות'}
        </h1>

        {/* (1) FILTER BAR */}
        <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* א. Difficulty Pills */}
          <div className="flex flex-wrap gap-2">
            {['all', 'easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                onClick={() => setFilter((prev) => ({ ...prev, difficulty: level }))}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium
                  ${
                    filter.difficulty === level
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }
                `}
              >
                {t(`filters.${level}`) || level}
              </button>
            ))}
          </div>

          {/* ב. Success ≤ Slider */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              {t('filters.successBelowLabel') || 'הצלחות עד:'} {filter.successBelow}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filter.successBelow}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  successBelow: Number(e.target.value),
                }))
              }
              className="h-2 w-full accent-indigo-500"
            />
          </div>

          {/* ג. Never Practiced */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filter.neverPracticed}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, neverPracticed: e.target.checked }))
              }
              className="h-5 w-5 text-indigo-600 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('filters.neverPracticed') || 'לא נתרגלו כלל'}
            </span>
          </label>

          {/* ד. With Notes */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filter.withNotes}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, withNotes: e.target.checked }))
              }
              className="h-5 w-5 text-indigo-600 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('filters.withNotes') || 'עם הערה'}
            </span>
          </label>
        </div>

        {/* (2) Word Grid */}
        {filteredWords.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            {t('favorites.noWords') || 'אין מילים להצגה'}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWords.map((w) => (
              <WordFavoriteCard
                key={w.key}
                wordObj={w}
                removeWord={removeWord}
                fromLang={w.fromLang}
                learningLang={w.learningLang}
                settings={settings}
                t={t}
              />
            ))}
          </div>
        )}

        {/* (3) כפתור “Play” בחלק התחתון אם יש ≥ 4 מילים שמורות */}
        {savedWords.length >= 4 && (
          <div className="mt-8 animate-fade-in flex justify-center">
            <button
              onClick={() =>
                navigate('/games', {
                  state: {
                    words: savedWords,
                    sourceLang: settings.sourceLang,
                    targetLang: settings.learningLang
                  }
                })
              }
              className="
                flex items-center gap-2
                bg-gradient-to-r from-purple-600 to-indigo-500
                hover:from-purple-700 hover:to-indigo-600
                text-white font-bold py-2 px-5 rounded-full shadow-lg
                transition-colors duration-200 text-sm
              "
            >
              <span className="text-xl">🎮</span>
              <span>
                {(() => {
                  const today = new Date().toISOString().slice(0, 10);
                  const playedToday = (statsManager.getStats().gamesPlayedByDate?.[today]?.total || 0) > 0;
                  return playedToday
                    ? t('games.checkProgress') || 'בדוק ההתקדמות'
                    : t('games.playYourWords') || 'שחק עם המילים שלך';
                })()}
              </span>
            </button>
          </div>
        )}
      </main>
    </BackgroundWrapper>
  );
}
