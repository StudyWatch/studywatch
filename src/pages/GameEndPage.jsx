// src/pages/GameEndPage.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { useSettings } from '../context/SettingsContext';
import { incrementStat } from '../utils/userStats';

export default function GameEndPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateWords = location.state?.words || [];
  const { addWordFavorite, wordFavorites } = useContext(FavoritesContext);
  const { settings } = useSettings();

  const score = location.state?.score || 0;
  const fromLang = location.state?.sourceLang || settings?.fromLang || localStorage.getItem('fromLang') || 'en';
  const learningLang = location.state?.targetLang || settings?.learningLang || localStorage.getItem('learningLang') || 'he';
  const fromGame = location.state?.fromGame || '/games';

  useEffect(() => {
    incrementStat('gamesPlayed');
    incrementStat('learnedWords', stateWords.length);
    const applause = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_c7b9c9d2d4.mp3');
    applause.play().catch(() => {});
  }, [stateWords]);

  const wrongWords = stateWords.filter((w) => w.isCorrect === false);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center" dir="rtl">
      <h1 className="text-4xl font-bold text-green-700 mb-6">סיימת את המשחק! 🎉</h1>
      <p className="text-xl text-gray-800 mb-4">ניקוד: <span className="font-bold text-blue-700">{score}</span></p>

      {wrongWords.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            טעית במילים הבאות – רוצה לחזור אליהן?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
            {wrongWords.map((wordObj, idx) => {
              const key = `wrong_${wordObj.word}`;
              const isFav = wordFavorites.some(fav => fav.key === key);
              const wordFrom = wordObj.translations?.[fromLang] || wordObj.word;
              const wordTo = wordObj.translations?.[learningLang] || wordObj.word;
              const sentence =
                wordObj.sentence?.[learningLang] ||
                wordObj.sentences?.[learningLang] ||
                '—';

              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md border flex flex-col items-center text-center relative transition transform hover:scale-105 hover:shadow-xl"
                >
                  <button
                    onClick={() =>
                      addWordFavorite(key, {
                        word: wordObj.word,
                        key,
                        fromLang,
                        learningLang,
                        translations: wordObj.translations,
                        sentence: wordObj.sentence,
                        sentences: wordObj.sentences,
                        season: wordObj.season,
                        episode: wordObj.episode,
                        difficulty: wordObj.difficulty,
                      })
                    }
                    className="absolute top-4 left-4 text-xl"
                    title={isFav ? 'כבר במועדפים' : 'הוסף למועדפים'}
                  >
                    {isFav ? '💖' : '🤍'}
                  </button>

                  <h4 className="text-2xl font-bold text-blue-700 mb-2">{wordFrom}</h4>
                  <p className="text-lg text-gray-800 mb-1">{wordTo}</p>
                  <p
                    className="text-gray-500 italic mt-1"
                    dir={['he', 'ar'].includes(learningLang) ? 'rtl' : 'ltr'}
                  >
                    {sentence}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-xl text-green-700 mb-10">כל הכבוד! לא טעית באף מילה 🏆</p>
      )}

      <div className="flex gap-6">
        <button
          onClick={() => navigate(fromGame)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow"
        >
          🔁 שחק שוב
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-full text-xl shadow"
        >
          🏠 חזרה לדף הבית
        </button>
      </div>
    </div>
  );
}
