import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function FavoritesPage() {
  const { favorites, removeFavorite, wordFavorites, removeWordFavorite } = useContext(FavoritesContext);
  const [seriesList, setSeriesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSeriesList() {
      try {
        const response = await fetch('/data/seriesList.json');
        const data = await response.json();
        setSeriesList(data);
      } catch (error) {
        console.error('Error loading series list:', error);
      }
    }
    fetchSeriesList();
  }, []);

  const findSeriesDetails = (id) => {
    return seriesList.find(series => series.id === id);
  };

  return (
    <BackgroundWrapper pageName="favorites" extension=".png">
      <div className="w-full px-4 py-12 max-w-screen-xl mx-auto" dir="rtl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-10">המועדפים שלי</h1>

        {/* סדרות שמורות */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800 dark:text-blue-300">📺 סדרות מועדפות</h2>
          {favorites.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">אין סדרות במועדפים.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {favorites.map((id) => {
                const series = findSeriesDetails(id);
                if (!series) return null;
                return (
                  <div
                    key={id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center"
                    onClick={() => navigate(`/episodes/${series.id}`)}
                  >
                    <img
                      src={series.image}
                      alt={series.name}
                      className="w-28 h-28 rounded-full object-cover mb-4"
                    />
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">{series.name}</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(id);
                      }}
                      className="mt-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      ❌ הסר מהמועדפים
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* מילים שמורות */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800 dark:text-blue-300">📚 מילים שמורות</h2>
          {wordFavorites.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">אין מילים שמורות.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {wordFavorites.map((word, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300">{word.word}</h4>
                    <button
                      onClick={() => removeWordFavorite(word.key)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ❌
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-semibold">{word.translate}</p>
                  <p className="text-gray-500 dark:text-gray-400 italic mt-1 text-left" dir="ltr">{word.sentence}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
}
