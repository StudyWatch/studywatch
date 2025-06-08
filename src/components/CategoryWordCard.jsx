import React, { useRef } from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useSavedData } from '../context/SavedDataContext';
import { useTranslation } from '../context/I18nContext';
import { Heart, HeartCrack } from 'lucide-react';
import sentencesByWord from '../../public/data/sentencesByWord';

export default function CategoryWordCard({
  wordObj,
  speakSrc,
  speakTgt,
  dir,
  onAddedToFavorites
}) {
  const { t } = useTranslation();
  const { wordFavorites, addWordFavorite, removeWordFavorite } = useFavorites();
  const { saveWord, removeWord, limitModalOpen } = useSavedData();
  const cardRef = useRef(null);

  const {
    key,
    displayFrom,
    displayTo,
    fromLang = 'en',
    learningLang = 'he',
    srcSentence: objSrc = '',
    tgtSentence: objTgt = '',
    difficulty = 'easy'
  } = wordObj;

  // האם המילה בפייבוריטים
  const isFav = wordFavorites.some(w => w.key === key);

  // משפטים מגיבוי אם אין ב-wordObj
  const sentObj = (sentencesByWord[difficulty] || {})[key] || {};
  const srcSentence = objSrc || sentObj.sentence?.[fromLang] || '—';
  const tgtSentence = objTgt || sentObj.sentence?.[learningLang] || '—';

  const toggleFav = e => {
    e.stopPropagation();
    if (isFav) {
      // הסרה מפייבוריטים
      removeWordFavorite(key);
      removeWord(key);
    } else {
      // אם הגבלת פייבוריטים פתוחה – אין שינוי
      if (limitModalOpen) return;

      const fullWord = {
        ...wordObj,
        srcSentence,
        tgtSentence
      };
      addWordFavorite(fullWord);
      saveWord(fullWord);

      // אנימציית עף למועדפים
      if (cardRef.current && onAddedToFavorites) {
        onAddedToFavorites(cardRef.current);
      }
    }
  };

  const dirSrc = ['he', 'ar'].includes(fromLang) ? 'rtl' : 'ltr';
  const dirTgt = ['he', 'ar'].includes(learningLang) ? 'rtl' : 'ltr';

  return (
    <div
      ref={cardRef}
      dir={dir}
      className={`
        bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md
        hover:shadow-xl transition-all relative flex flex-col gap-3
        border ${isFav ? 'border-red-500' : 'border-gray-200'} dark:border-gray-700
      `}
    >
      {/* כותרת עם מילה + אודיו + לב */}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{displayFrom}</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{displayTo}</div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => speakTgt(displayTo, learningLang)}
            title={t('common.play_word')}
            className="text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition text-lg"
          >🔊</button>
          <button
            onClick={toggleFav}
            title={isFav ? t('common.remove_favorite') : t('common.add_favorite')}
            className={`p-1 rounded-full transition-colors ${
              isFav ? 'text-red-500 hover:text-red-700' : 'text-gray-300 hover:text-red-500'
            }`}
          >
            {isFav
              ? <HeartCrack size={22} fill="currentColor" />
              : <Heart size={22} />}
          </button>
        </div>
      </div>

      {/* משפט מקור */}
      <div className="flex justify-between items-start" dir={dirSrc}>
        <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 whitespace-pre-wrap">
          {srcSentence}
        </p>
        <button
          onClick={() => speakSrc(srcSentence, fromLang)}
          title={t('common.play_sentence')}
          className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 ml-2"
        >🎧</button>
      </div>

      {/* משפט תרגום */}
      <div className="flex justify-between items-start font-semibold" dir={dirTgt}>
        <p className="text-sm text-gray-900 dark:text-gray-100 flex-1 whitespace-pre-wrap">
          {tgtSentence}
        </p>
        <button
          onClick={() => speakTgt(tgtSentence, learningLang)}
          title={t('common.play_sentence')}
          className="text-green-500 hover:text-green-700 dark:hover:text-green-300 ml-2"
        >🎧</button>
      </div>
    </div>
  );
}
