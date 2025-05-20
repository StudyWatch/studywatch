// src/components/SeriesCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import PopUpToast from './PopUpToast';

export default function SeriesCard({ series }) {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCardClick = () => {
    navigate(`/episodes/${series.id}`);
  };

  const handleFavoriteAction = (action) => {
    if (action === 'added') {
      setToastMessage('⭐ נוספה למועדפים!');
    } else {
      setToastMessage('🗑️ הוסרה מהמועדפים!');
    }
    setShowToast(true);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer w-64"
    >
      {/* כפתור מועדפים */}
      <div className="absolute top-2 left-2 z-10" onClick={(e) => e.stopPropagation()}>
        <FavoriteButton seriesId={series.id} onAction={handleFavoriteAction} />
      </div>

      {/* תמונת הסדרה */}
      {series.image ? (
        <img
          src={series.image}
          alt={`תמונה של ${series.name}`}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      ) : (
        <div className="bg-gray-200 w-full h-32 mb-3 flex items-center justify-center rounded-lg">
          <span className="text-gray-500">אין תמונה</span>
        </div>
      )}

      {/* שם הסדרה */}
      <div className="text-lg font-bold text-gray-800 text-center group-hover:text-blue-600 transition-colors">
        {series.name}
      </div>

      {/* טוסט החזרה */}
      <PopUpToast message={toastMessage} show={showToast} />
    </div>
  );
}
