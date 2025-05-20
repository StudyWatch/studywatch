// src/components/FavoritesModal.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { FavoritesContext } from '../context/FavoritesContext';

export default function FavoritesModal({ isOpen, onClose }) {
  const { favorites, removeFavorite, wordFavorites, removeWordFavorite } = useContext(FavoritesContext);
  const [seriesList, setSeriesList] = useState([]);
  const [seriesAsc, setSeriesAsc] = useState(true);
  const [wordAsc, setWordAsc] = useState(true);
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

  const findSeriesDetails = (id) => seriesList.find(series => series.id === id);

  // סדר מועדפים לפי שם
  const sortedFavorites = [...favorites].sort((a, b) => {
    const nameA = findSeriesDetails(a)?.name || '';
    const nameB = findSeriesDetails(b)?.name || '';
    return seriesAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  // סדר מילים לפי הטור 'word'
  const sortedWordFavorites = [...wordFavorites].sort((a, b) =>
    wordAsc ? a.word.localeCompare(b.word) : b.word.localeCompare(a.word)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-center">המועדפים שלי</h2>

      {/* מיון סדרות */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">📺 סדרות מועדפות</h3>
        {favorites.length > 0 && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => setSeriesAsc(!seriesAsc)}
          >
            מיון: {seriesAsc ? 'א-ת' : 'ת-א'}
          </button>
        )}
      </div>
      {sortedFavorites.length === 0 ? (
        <p className="text-center text-gray-500 mb-6">אין סדרות שמורות.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {sortedFavorites.map(id => {
            const series = findSeriesDetails(id);
            if (!series) return null;
            return (
              <div
                key={id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100"
                onClick={() => { onClose(); navigate(`/episodes/${series.id}`); }}
              >
                <img
                  src={series.image}
                  alt={series.name}
                  className="w-full h-28 object-cover rounded-lg mb-3"
                />
                <h4 className="text-lg font-bold text-gray-800">{series.name}</h4>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFavorite(id); }}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm"
                >
                  ❌ הסר
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* מיון מילים */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">📚 מילים שמורות</h3>
        {wordFavorites.length > 0 && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => setWordAsc(!wordAsc)}
          >
            מיון: {wordAsc ? 'א-ת' : 'ת-א'}
          </button>
        )}
      </div>
      {sortedWordFavorites.length === 0 ? (
        <p className="text-center text-gray-500">אין מילים שמורות.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedWordFavorites.map((word) => (
            <div key={word.key} className="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold text-blue-700">{word.word}</h4>
                <button
                  onClick={() => removeWordFavorite(word.key)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ❌
                </button>
              </div>
              <p className="text-gray-600 font-medium mb-1">{word.translate}</p>
              <p className="text-gray-500 italic text-left" dir="ltr">{word.sentence}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
