// src/pages/FavoritesWords.jsx
import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

export default function FavoritesWords() {
  const { wordFavorites, removeWordFavorite } = useContext(FavoritesContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-8" dir="rtl">
      <h2 className="text-3xl font-bold text-center mb-8">המילים השמורות שלי</h2>

      {wordFavorites.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">אין מילים שמורות כרגע.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {wordFavorites.map((word, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-2xl font-bold text-blue-700">{word.word}</h4>
                <button
                  onClick={() => removeWordFavorite(word.key)}
                  className="text-red-400 hover:text-red-600 text-lg"
                  title="הסר מהמועדפים"
                >
                  ❌
                </button>
              </div>
              <p className="text-gray-500 font-semibold mb-2">{word.translate}</p>
              <p className="text-gray-600 text-left italic" dir="ltr">{word.sentence}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link to="/" className="text-blue-600 hover:underline text-lg">
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
