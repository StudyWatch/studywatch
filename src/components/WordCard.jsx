// src/components/WordCard.jsx
import React, { useMemo, useRef } from 'react';
import { useSavedData } from '../context/SavedDataContext';
import { highlightWord } from '../utils/highlightWord';

export default function WordCard({
  idx,
  seriesId,
  seasons,
  selectedSeasonIndex,
  episodes,
  selectedEpisodeIndex,
  difficulty,
  wordObj,
  speak,
  animateFlyToFavorites,
  triggerFavoriteAnimation,
  handleMarkAsKnown,
  spareWords,
  t,
  isDarkMode,
  dir,
  fromLang,       // שפת המקור
  learningLang    // שפת הלמידה
}) {
  // --- קונטקסט לשמירת מילים ---
  const { savedWords, saveWord, removeWord } = useSavedData();

  // רפרנס לכרטיס לצורך אנימציית “עף למועדפים”
  const cardRef = useRef(null);

  // --- יצירת מפתח ייחודי עבור כל מילה לפי סדרה, עונה, פרק, קושי ומילה ---
  const key = useMemo(() => {
    const season = seasons[selectedSeasonIndex];
    const episode = episodes[selectedEpisodeIndex];
    const word = wordObj.word;
    return `${seriesId}_${season}_${episode}_${difficulty}_${word}`;
  }, [
    seriesId,
    seasons,
    selectedSeasonIndex,
    episodes,
    selectedEpisodeIndex,
    difficulty,
    wordObj.word,
  ]);

  // בדיקה האם המילה כבר שמורה במועדפים
  const isSaved = savedWords.some((w) => w.key === key);

  // הפקת המשפט המקורי בשפת המקור (במידה וקיים אובייקט משפטי)
  const getSourceSentence = () => {
    const s = wordObj.sentence;
    if (!s) return '—';
    if (typeof s === 'object') {
      return s[fromLang] || s.en || '—';
    }
    return s;
  };

  // לחיצה על כפתור הלב – שמירה או הסרה מהמועדפים
  const onFavoriteClick = (e) => {
    e.stopPropagation();
    const season = seasons[selectedSeasonIndex];
    const episode = episodes[selectedEpisodeIndex];

    if (isSaved) {
      // אם כבר שמור, סירוק מועדפים
      removeWord(key);
    } else {
      // שמירת המילה עם כל הפרטים כולל seriesId
      const toSave = {
        ...wordObj,
        key,
        seriesId,              // חשוב: להוסיף גם את ה־seriesId
        season,
        episode,
        difficulty,
        fromLang,
        learningLang
      };
      saveWord(toSave);

      // אנימציית “עף למועדפים”
      if (cardRef.current) {
        animateFlyToFavorites(cardRef.current);
        triggerFavoriteAnimation(idx);
      }
    }
  };

  return (
    <div
      ref={cardRef}
      id={`word-card-${idx}`}
      className={`
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-lg
        shadow-sm dark:shadow-none
        hover:shadow-md dark:hover:shadow-lg
        transform hover:scale-[1.01] transition-all
        p-3 flex flex-col justify-between relative
        min-h-[145px]
        w-[150px] sm:w-[150px] md:w-[180px] lg:w-[200px] xl:w-[260px]
        mx-[4px] my-[2px]
        sm:mx-[6px] sm:my-[3px]
        md:mx-[8px] md:my-[4px]
        lg:mx-[10px] lg:my-[5px]
        xl:mx-[-100px] xl:my-[6px]
      `}
      dir={dir}
    >
      {/* Top row: כותרת המילה + כפתורים (השמעת מילה, שמירת מועדפים) */}
      <div className="flex justify-between items-start mb-1">
        <h3
          className={`
            text-base font-semibold 
            text-gray-900 dark:text-gray-100 
            truncate max-w-[60%]
          `}
        >
          {wordObj.displayTo}
        </h3>
        <div className="flex items-center gap-1">
          {/* כפתור השמעת המילה */}
          <button
            onClick={() => speak(wordObj.displayTo, wordObj.learningLang)}
            className={`
              text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white
              text-sm p-1 rounded-full transition-colors
            `}
            aria-label={t('common.play_word')}
          >
            🔊
          </button>

          {/* כפתור שמירת מועדפים */}
          <button
            onClick={onFavoriteClick}
            className={`
              ${isSaved
                ? 'text-red-600 hover:text-red-800'
                : 'text-green-600 hover:text-green-800'}
              text-xl p-1 rounded-full transition-colors
            `}
            aria-label={isSaved ? t('favorites.removeWord') : t('favorites.saveWord')}
          >
            {isSaved ? '💔' : '❤️'}
          </button>
        </div>
      </div>

      {/* Middle: תרגום + משפט מודגש */}
      <div className="flex-1 mb-3">
        <p
          className={`
            text-xs italic 
            text-gray-700 dark:text-gray-300 
            mb-1 truncate
          `}
        >
          {wordObj.displayFrom}
        </p>
        <p
          className={`
            text-xs 
            text-gray-500 dark:text-gray-400 
            overflow-hidden
          `}
          dir={['he', 'ar'].includes(wordObj.learningLang) ? 'rtl' : 'ltr'}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: highlightWord(wordObj.displaySentence, wordObj.displayTo),
            }}
          />
          <span
            className="ml-1 text-xs cursor-help"
            title={getSourceSentence()}
          >
            ❔
          </span>
        </p>
      </div>

      {/* Bottom: כפתור השמעת המשפט + כפתור “I know” */}
      <div className="flex justify-between items-center">
        {/* השמעת המשפט */}
        <button
          onClick={() =>
            speak(
              typeof wordObj.displaySentence === 'string'
                ? wordObj.displaySentence
                : wordObj.displaySentence[fromLang] || wordObj.displaySentence.en,
              wordObj.learningLang
            )
          }
          title={t('common.play_sentence')}
          className={`
            w-7 h-7 flex items-center justify-center
            rounded-full transition-colors
            ${isDarkMode
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          🎧
        </button>

        {/* כפתור “I know” */}
        <button
          onClick={() => handleMarkAsKnown(idx)}
          title={
            spareWords.length > 0
              ? t('episodes.mark_known')
              : t('episodes.no_spares_message')
          }
          disabled={spareWords.length === 0}
          className={`
            w-7 h-7 flex items-center justify-center
            rounded-full border-2 text-xs transition-colors
            ${spareWords.length > 0
              ? 'border-green-500 text-green-500 hover:bg-green-100 dark:hover:bg-green-600'
              : 'border-gray-400 text-gray-400 cursor-not-allowed'}
          `}
        >
          ✓
        </button>
      </div>
    </div>
  );
}
