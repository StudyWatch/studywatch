// src/pages/GameEndPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WordsContext } from '../context/WordsContext';
import { useContext } from 'react';

export default function GameEndPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { seriesId } = useContext(WordsContext);

  const score = location.state?.score || 0;
  const fromGame = location.state?.fromGame || '/games';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-blue-100 text-center p-8" dir="rtl">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">🎉 כל הכבוד!</h1>
      <p className="text-3xl text-gray-700 mb-10">הניקוד שלך: <span className="font-bold text-blue-800">{score}</span></p>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => navigate(fromGame, { replace: true })}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-md text-xl transition"
        >
          🔄 שחק שוב
        </button>

        <button
          onClick={() => navigate('/games')}
          className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-md text-xl transition"
        >
          🎮 בחר משחק אחר
        </button>

        <button
          onClick={() => navigate('/episodes/' + seriesId)}
          className="bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-md text-xl transition"
        >
          📚 חזור לאוצר מילים
        </button>
      </div>
    </div>
  );
}
