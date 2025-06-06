// src/pages/FavoritesPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedData } from '../context/SavedDataContext';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';
import { formatDistanceToNow } from 'date-fns';
import heLocale from 'date-fns/locale/he';
import useStats from '../hooks/useStats';
import statsManager from '../utils/statsManager';

export default function FavoritesPage() {
  const { savedSeries, removeSeries, savedWords, removeWord } = useSavedData();
  const [seriesList, setSeriesList] = useState([]);
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { t } = useTranslation();
  const isRtl = ['he', 'ar'].includes(settings.uiLang);

  // --- פילטרים למילים ---
  const [filter, setFilter] = useState({
    difficulty: 'all',      // 'all' | 'easy' | 'medium' | 'hard'
    successBelow: 100,      // אחוז ההצלחה (0–100)
    neverPracticed: false,  // רק מילים שלא נתרגלו כלל
    withNotes: false        // רק מילים עם הערה
  });

  // --- טוען פרטי סדרות ---
  useEffect(() => {
    async function fetchSeriesList() {
      try {
        const resp = await fetch('/data/seriesList.json');
        const data = await resp.json();
        setSeriesList(data);
      } catch (err) {
        console.error('Error loading seriesList.json:', err);
      }
    }
    fetchSeriesList();
  }, []);

  const findSeriesDetails = (id) => {
    return seriesList.find((s) => s.id === id) || null;
  };

  // --- Text-to-speech helper ---
  const speak = (text, lang) => {
    if (!text || !window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  };

  const getSeriesName = (series) => {
    return series.name?.[settings.uiLang] || series.name?.en || series.id;
  };

  const SERIES_PREVIEW_COUNT = 3;
  const WORDS_PREVIEW_COUNT = 4;

  // --- מביא את כל הסטטיסטיקות בעזרת ה־hook ---
  const allStats = useStats(); // יגרום לעדכון אוטומטי כש-stats ב-localStorage משתנה

  // --- מיישם את הפילטרים על מערך savedWords ---
  const filteredWords = savedWords.filter((w) => {
    // 1. פילטר לפי קושי
    if (filter.difficulty !== 'all' && w.difficulty !== filter.difficulty) return false;

    // 2. קבלת נתוני הניסיונות מתוך statsManager
    const info = statsManager.getWordProgress(w.key);
    const played = info.attempts || 0;
    const successRate = info.successRate ?? 0;
    const lastDate = info.lastAttemptDate || null;

    // 3. פילטר לפי אחוז הצלחה
    if (filter.successBelow !== null && successRate >= filter.successBelow) return false;

    // 4. פילטר “מעולם לא תורגלו”
    if (filter.neverPracticed && played > 0) return false;

    // 5. פילטר “עם הערות”
    const savedNote = localStorage.getItem(`note_${w.key}`) || '';
    const hasNote = savedNote.trim().length > 0;
    if (filter.withNotes && !hasNote) return false;

    return true;
  });

  // --- מצבי עריכת הערות ---
  const [editingKey, setEditingKey] = useState(null);
  const [tempNotes, setTempNotes] = useState({});

  const handleEditClick = (wordKey) => {
    const existing = localStorage.getItem(`note_${wordKey}`) || '';
    setTempNotes((prev) => ({ ...prev, [wordKey]: existing }));
    setEditingKey(wordKey);
  };

  const handleTempNoteChange = (wordKey, newText) => {
    setTempNotes((prev) => ({ ...prev, [wordKey]: newText }));
  };

  const handleSaveNote = (wordKey) => {
    const newText = tempNotes[wordKey] || '';
    localStorage.setItem(`note_${wordKey}`, newText);
    setEditingKey(null);
  };

  const handleCancelEdit = (wordKey) => {
    setTempNotes((prev) => {
      const copy = { ...prev };
      delete copy[wordKey];
      return copy;
    });
    setEditingKey(null);
  };

  // --- רינדור סטטיסטיקות כלליות (בתחתית) ---
  const renderGeneralStats = () => {
    // ממוצע אחוזי הצלחה
    const successAvg = (() => {
      const arr = Object.values(statsManager.getStats().wordAttempts || {});
      if (arr.length === 0) return '—';
      const totalAttempts = arr.reduce((s, { attempts }) => s + attempts, 0);
      const totalCorrect = arr.reduce((s, { correct }) => s + correct, 0);
      return totalAttempts === 0
        ? '—'
        : `${Math.round((totalCorrect / totalAttempts) * 100)}%`;
    })();

    // ממוצע התקדמות (חשיפה + הצלחה)
    const progressAvg = (() => {
      if (savedWords.length === 0) return '—';
      const percents = savedWords.map((w) => {
        // חשיפה
        const exposed = w.practicedEpisodes ?? 0;
        const total = w.totalEpisodes ?? 10;
        const practicePercent = total > 0 ? Math.min(Math.round((exposed / total) * 100), 100) : 0;

        // הצלחה
        const info = statsManager.getWordProgress(w.key);
        const rate = info.successRate || 0;

        return Math.round((practicePercent + rate) / 2);
      });
      const avg = Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);
      return `${avg}%`;
    })();

    // התאריך האחרון שנתרגל
    const lastPracticedDate = (() => {
      const dates = savedWords
        .map((w) => {
          const info = statsManager.getWordProgress(w.key);
          return info.lastAttemptDate ? new Date(info.lastAttemptDate) : null;
        })
        .filter(Boolean);
      if (dates.length === 0) return '—';
      const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
      const locale = settings.uiLang === 'he' ? heLocale : undefined;
      return formatDistanceToNow(latest, {
        addSuffix: true,
        locale
      });
    })();

    return (
      <section className="mt-12 animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('favorites.general.savedWords') || 'מילים שמורות'}
            </div>
            <div className="text-xl font-bold">{savedWords.length}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('favorites.general.avgSuccess') || 'ממוצע הצלחה'}
            </div>
            <div className="text-xl font-bold">{successAvg}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('favorites.general.avgProgress') || 'אחוז התקדמות ממוצע'}
            </div>
            <div className="text-xl font-bold">{progressAvg}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('favorites.general.lastPracticed') || 'אחרון תרגול'}
            </div>
            <div className="text-xl font-bold">{lastPracticedDate}</div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <BackgroundWrapper pageName="favorites" extension=".png">
      <main
        className={`
          w-full max-w-screen-xl mx-auto px-4 py-12 font-sans transition-opacity duration-500
          ${isRtl ? 'text-right' : 'text-left'}
        `}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* כותרת הדף */}
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6 animate-fade-in">
          {t('favorites.title') || 'המועדפים שלי'}
        </h1>

        {/* 📺 Favorite Series */}
        <section className="mb-10 animate-fade-in">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">📺</span>
            <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300">
              {t('favorites.seriesTitle') || 'סדרות מועדפות'}
            </h2>
          </div>

          {savedSeries.length === 0 ? (
            <div className="flex flex-col items-center py-16">
              <img
                src="/images/empty/favorites-series-light.png"
                alt={t('favorites.noSeries') || 'אין סדרות'}
                className="w-40 h-40 mb-4 dark:hidden"
              />
              <img
                src="/images/empty/favorites-series-dark.png"
                alt={t('favorites.noSeries') || 'אין סדרות'}
                className="w-40 h-40 mb-4 hidden dark:block"
              />
              <p className="text-center text-gray-500 dark:text-gray-300">
                {t('favorites.noSeries') || 'עדיין לא שמרת סדרה?'}
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-center space-x-6 rtl:space-x-reverse mb-6">
                {savedSeries.slice(0, SERIES_PREVIEW_COUNT).map((seriesId) => {
                  const series = findSeriesDetails(seriesId);
                  if (!series) return null;
                  const name = getSeriesName(series);
                  return (
                    <div
                      key={seriesId}
                      className="
                        relative w-24 h-24 rounded-full overflow-hidden
                        bg-gray-100 dark:bg-gray-700
                        shadow-md hover:shadow-lg transition-shadow duration-200
                        cursor-pointer group
                      "
                      onClick={() => navigate(`/episodes/${series.id}`)}
                    >
                      <img
                        src={series.image}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-colors duration-200 flex items-end justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm font-semibold text-white mb-1 px-2 bg-black bg-opacity-50 rounded">
                          {name}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSeries(seriesId);
                        }}
                        className="
                          absolute top-1 right-1
                          bg-white dark:bg-gray-800
                          p-1 rounded-full
                          text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900
                          transition-colors duration-200
                        "
                        style={{ fontSize: '0.65rem' }}
                        aria-label={t('favorites.removeSeries') || 'הסר סדרה'}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
              {savedSeries.length > SERIES_PREVIEW_COUNT && (
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate('/favorites/all-series')}
                    className="
                      px-5 py-2
                      bg-gradient-to-r from-indigo-500 to-purple-600
                      hover:from-indigo-600 hover:to-purple-700
                      text-white font-semibold rounded-full shadow-md
                      transition-colors duration-200 text-sm
                    "
                  >
                    {t('favorites.viewAllSeries') || 'צפה בכל הסדרות'}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* 📘 Saved Words Section */}
        <section className="animate-fade-in">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">📘</span>
            <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300">
              {t('favorites.wordsTitle') || 'מילים שמורות'}
            </h2>
          </div>

          {/* Filters (תמיד נראו) */}
          {savedWords.length > 0 && (
            <div className="mb-6 grid grid-cols-1 xl:grid-cols-4 gap-4">
              {/* 1. קושי – כפתורי רדיו מעוצבים */}
              <div className="flex gap-2 justify-center xl:justify-start">
                {['all', 'easy', 'medium', 'hard'].map((lvl) => {
                  const isActive = filter.difficulty === lvl;
                  const labelKey =
                    lvl === 'all'
                      ? 'filters.allLevels'
                      : `filters.${lvl}`;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setFilter((f) => ({ ...f, difficulty: lvl }))}
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        transition-colors duration-200
                        ${isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}
                      `}
                    >
                      {t(labelKey) || lvl}
                    </button>
                  );
                })}
              </div>

              {/* 2. אחוז הצלחה – סרגל טווח */}
              <div className="flex flex-col items-center xl:items-start">
                <label className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                  {t('filters.successBelowLabel') || 'הצלחה <'} {filter.successBelow}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filter.successBelow}
                  onChange={(e) =>
                    setFilter((f) => ({ ...f, successBelow: Number(e.target.value) }))
                  }
                  className="w-full xl:w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

              {/* 3. מעולם לא תורגלו – תיבת סימון */}
              <label className="inline-flex items-center justify-center text-sm xl:justify-start">
                <input
                  type="checkbox"
                  checked={filter.neverPracticed}
                  onChange={(e) =>
                    setFilter((f) => ({ ...f, neverPracticed: e.target.checked }))
                  }
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {t('filters.neverPracticed') || 'מעולם לא תורגלו'}
                </span>
              </label>

              {/* 4. עם הערות – תיבת סימון */}
              <label className="inline-flex items-center justify-center text-sm xl:justify-start">
                <input
                  type="checkbox"
                  checked={filter.withNotes}
                  onChange={(e) =>
                    setFilter((f) => ({ ...f, withNotes: e.target.checked }))
                  }
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {t('filters.withNotes') || 'עם הערות'}
                </span>
              </label>
            </div>
          )}

          {savedWords.length === 0 ? (
            <div className="flex flex-col items-center py-20">
              <img
                src="/images/empty/favorites-words-light.png"
                alt={t('favorites.noWords') || 'אין מילים שמורות'}
                className="w-40 h-40 mb-4 dark:hidden"
              />
              <img
                src="/images/empty/favorites-words-dark.png"
                alt={t('favorites.noWords') || 'אין מילים שמורות'}
                className="w-40 h-40 mb-4 hidden dark:block"
              />
              <p className="text-center text-gray-500 dark:text-gray-300">
                {t('favorites.noWords') || 'עדיין לא שמרת מילים?'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWords.slice(0, WORDS_PREVIEW_COUNT).map((w) => {
                  const fromLang = w.fromLang;
                  const learningLang = w.learningLang;
                  const wordFrom = w.displayFrom;
                  const wordTo = w.displayTo;
                  const sentence =
                    typeof w.displaySentence === 'object'
                      ? w.displaySentence[learningLang] || w.displaySentence.en
                      : w.displaySentence;
                  const dirSentence = ['he', 'ar'].includes(learningLang) ? 'rtl' : 'ltr';

                  // 1. נתוני סטטיסטיקות מה־statsManager
                  const info = statsManager.getWordProgress(w.key);
                  const played = info.attempts || 0;
                  const successRate = info.successRate || 0;
                  const lastDate = info.lastAttemptDate || null;

                  // עיבוד תאריך לתצוגה (locale העברי או ברירת מחדל)
                  const locale = settings.uiLang === 'he' ? heLocale : undefined;
                  const formattedLast = lastDate
                    ? formatDistanceToNow(new Date(lastDate), { addSuffix: true, locale })
                    : '—';

                  // 2. תנודות חשיפה (Exposure %)
                  const practicedCount = w.practicedEpisodes ?? 0;
                  const totalEpisodes = w.totalEpisodes ?? 10;
                  const exposurePct =
                    totalEpisodes > 0
                      ? Math.min(Math.round((practicedCount / totalEpisodes) * 100), 100)
                      : 0;

                  // 3. Hybrid % = (Exposure + Success) / 2
                  const hybridPercent = Math.round((exposurePct + successRate) / 2);

                  // 4. צבע רקע לסימן קושי
                  const difficultyBg =
                    w.difficulty === 'easy'
                      ? 'bg-green-50 text-green-800'
                      : w.difficulty === 'medium'
                      ? 'bg-yellow-50 text-yellow-800'
                      : 'bg-red-50 text-red-800';

                  // 5. סימן “צריך חיזוק” אם עברו > 7 ימים מאז lastSuccessDate
                  const lastSuccessDate = info.lastSuccessDate
                    ? new Date(info.lastSuccessDate)
                    : null;
                  const daysSince = lastSuccessDate
                    ? Math.floor(
                        (Date.now() - lastSuccessDate.getTime()) / (1000 * 60 * 60 * 24)
                      )
                    : null;
                  const needsPracticeIcon = daysSince !== null && daysSince > 7;

                  // 6. מצב עריכת הערות
                  const isEditingNote = editingKey === w.key;
                  const tempNote =
                    tempNotes[w.key] ??
                    (localStorage.getItem(`note_${w.key}`) || '');

                  // 7. סגנון גראדיאנט לפס ההצלחה
                  const gradientStyle = {
                    background: `linear-gradient(
                      to right,
                      #34D399 ${successRate}%,
                      #EF4444 ${successRate}% 100%
                    )`
                  };

                  // 8. תווית של הרמה (Mastery)
                  const masteryLabel =
                    hybridPercent >= 80
                      ? t('favorites.mastered') || '👑 שולט/ת מצוין'
                      : hybridPercent >= 50
                      ? t('favorites.intermediate') || '📘 בינוני'
                      : t('favorites.beginner') || '🌀 צריך חיזוק';

                  return (
                    <div
                      key={w.key}
                      className="
                        bg-white dark:bg-gray-800 p-4 rounded-xl
                        border border-gray-200 dark:border-gray-700
                        shadow-md hover:shadow-lg transition-shadow duration-300
                        flex flex-col justify-between
                      "
                    >
                      {/* שורה עליונה: רמת קושי + כפתור הסרה */}
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`text-xs font-medium py-1 px-3 rounded-full ${difficultyBg}`}
                        >
                          {t(`difficulty.${w.difficulty}`) || w.difficulty}
                        </span>
                        <button
                          onClick={() => removeWord(w.key)}
                          className="
                            bg-gray-100 dark:bg-gray-700 p-1 rounded-full
                            text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900
                            transition-colors duration-200
                          "
                          style={{ fontSize: '0.75rem' }}
                          aria-label={t('favorites.removeWord') || 'הסר מילה'}
                        >
                          ✕
                        </button>
                      </div>

                      {/* Word + Speaker + Translation + Speaker */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <div className="text-xl font-bold text-gray-900 dark:text-white break-words">
                            {wordFrom}
                          </div>
                          <button
                            onClick={() => {
                              if (!window.speechSynthesis) return;
                              const u = new SpeechSynthesisUtterance(wordFrom);
                              u.lang = fromLang;
                              window.speechSynthesis.speak(u);
                            }}
                            className="
                              bg-indigo-100 dark:bg-indigo-800 p-1 rounded-full
                              text-indigo-600 hover:text-indigo-800
                              hover:bg-indigo-200 dark:hover:bg-indigo-700
                              transition-colors duration-200 mt-1
                            "
                            style={{ fontSize: '0.75rem' }}
                            aria-label={t('favorites.speakWord') || 'השמע מילה'}
                          >
                            🔊
                          </button>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-base font-semibold text-indigo-700 dark:text-indigo-300 break-words">
                            {wordTo}
                          </div>
                          <button
                            onClick={() => {
                              if (!window.speechSynthesis) return;
                              const u = new SpeechSynthesisUtterance(wordTo);
                              u.lang = learningLang;
                              window.speechSynthesis.speak(u);
                            }}
                            className="
                              bg-indigo-100 dark:bg-indigo-800 p-1 rounded-full
                              text-indigo-600 hover:text-indigo-800
                              hover:bg-indigo-200 dark:hover:bg-indigo-700
                              transition-colors duration-200 mt-1
                            "
                            style={{ fontSize: '0.75rem' }}
                            aria-label={t('favorites.speakWord') || 'השמע תרגום'}
                          >
                            🔊
                          </button>
                        </div>
                      </div>

                      {/* משפט לדוגמה */}
                      <p
                        className="text-gray-600 dark:text-gray-400 italic text-sm mb-2 leading-tight break-words"
                        dir={dirSentence}
                      >
                        {sentence}
                      </p>

                      {/* פס ההצלחה */}
                      <div className="mb-2">
                        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>
                            {played}/10 {t('favorites.attempts') || 'ניסיונות'}
                          </span>
                          <span>
                            {successRate}% {t('favorites.successRate') || 'הצלחה'}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={gradientStyle}
                          />
                        </div>
                        <p className="text-xxs text-gray-500 dark:text-gray-400 mt-1">
                          {t('favorites.lastPracticedLabel') || 'אחרון'}: {formattedLast}
                        </p>
                      </div>

                      {/* פס החשיפה (Exposure) */}
                      <div className="mb-2">
                        <div className="flex justify-between items-center text-xxs text-gray-600 dark:text-gray-400 mb-1">
                          <span>
                            {t('favorites.practicedEpisodes') || 'תרגולים'}: {practicedCount}/{totalEpisodes}
                          </span>
                          <span>{exposurePct}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-300"
                            style={{ width: `${exposurePct}%` }}
                          />
                        </div>
                      </div>

                      {/* Mastery level + last practiced */}
                      <div className="flex justify-between items-center text-xxs text-gray-500 dark:text-gray-400 mb-2">
                        <span>{masteryLabel}</span>
                        <span>
                          {t('favorites.lastPracticedLabel') || 'אחרון'}:{' '}
                          {lastDate
                            ? formatDistanceToNow(new Date(lastDate), {
                                addSuffix: true,
                                locale: settings.uiLang === 'he' ? heLocale : undefined
                              })
                            : t('favorites.neverPracticedLabel') || 'לא נתרגלו'}
                        </span>
                      </div>

                      {/* Inline note editor או כפתור “הוסף הערה” */}
                      <div className="mb-2">
                        {isEditingNote ? (
                          <div className="flex flex-col gap-2">
                            <textarea
                              value={tempNote}
                              onChange={(e) => handleTempNoteChange(w.key, e.target.value)}
                              className="
                                w-full h-16 rounded-md p-2
                                border border-gray-300 dark:border-gray-600
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-[0.75rem]
                              "
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleSaveNote(w.key)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                              >
                                {t('common.save') || 'שמור'}
                              </button>
                              <button
                                onClick={() => handleCancelEdit(w.key)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-xs"
                              >
                                {t('common.back') || 'ביטול'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(w.key)}
                            className="
                              w-full flex items-center justify-center gap-1
                              bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
                              text-gray-800 dark:text-gray-200 text-xs font-semibold
                              py-1 rounded-lg shadow-sm
                              transition-colors duration-200
                            "
                          >
                            <span>✏️</span>
                            <span>{t('favorites.addNotes') || 'הוסף הערה'}</span>
                          </button>
                        )}
                      </div>

                      {/* כפתור Review */}
                      <button
                        onClick={() => navigate(`/review-word/${w.key}`)}
                        className="
                          w-full flex items-center justify-center gap-1
                          bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                          text-white text-xs font-semibold py-1 rounded-lg shadow-sm
                          transition-colors duration-200
                        "
                      >
                        <span>📖</span>
                        <span>{t('favorites.review') || 'תרגל'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredWords.length > WORDS_PREVIEW_COUNT && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => navigate('/favorites/all-words')}
                    className="
                      px-5 py-2
                      bg-gradient-to-r from-indigo-500 to-purple-600
                      hover:from-indigo-600 hover:to-purple-700
                      text-white font-semibold rounded-full shadow-md
                      transition-colors duration-200 text-sm
                    "
                  >
                    {t('favorites.viewAllWords') || 'צפה בכל המילים'}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* 🎮 כפתור משחק (אם ≥ 4 מילים שמורות) */}
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
                  const playedToday =
                    (statsManager.getStats().gamesPlayedByDate?.[today]?.total || 0) > 0;
                  return playedToday
                    ? t('games.checkProgress') || 'בדוק ההתקדמות'
                    : t('games.playWithWords') || 'שחק עם המילים שלך';
                })()}
              </span>
            </button>
          </div>
        )}

        {/* 1. סטטיסטיקות כלליות בתחתית הדף */}
        {renderGeneralStats()}
      </main>
    </BackgroundWrapper>
  );
}
