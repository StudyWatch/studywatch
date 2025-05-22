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
    setToastMessage(action === 'added' ? '⭐ נוספה למועדפים!' : '🗑️ הוסרה מהמועדפים!');
    setShowToast(true);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer w-full max-w-[280px] mx-auto p-3 flex flex-col items-center"
    >
      {/* כפתור מועדפים */}
      <div
        className="absolute top-2 left-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <FavoriteButton seriesId={series.id} onAction={handleFavoriteAction} />
      </div>

      {/* תמונת הסדרה */}
      {series.image ? (
        <img
          src={series.image}
          alt={`תמונה של ${series.name}`}
          className="w-full rounded-lg aspect-video object-cover mb-3"
        />
      ) : (
        <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg mb-3">
          <span className="text-gray-500 dark:text-gray-300">אין תמונה</span>
        </div>
      )}

      {/* שם הסדרה */}
      <div className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white text-center">
        {series.name}
      </div>

      {/* טוסט */}
      <PopUpToast message={toastMessage} show={showToast} />
    </div>
  );
}
