import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUpToast from './PopUpToast';
import { useSettings } from '../context/SettingsContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useSavedData } from '../context/SavedDataContext';

const platformIcons = {
  Netflix: '/icons/netflix.png',
  'Amazon Prime Video': '/icons/prime.jpg',
  'Apple TV': '/icons/apple.jpg',
  'Disney+': '/icons/disney.jpg',
  HBO: '/icons/hbo.jpg',
};

export default function SeriesCard({ series }) {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const lang = settings?.uiLang || 'he';

  // שימוש ב־SavedDataContext
  const { savedSeries, saveSeries, removeSeries } = useSavedData();
  const isSaved = savedSeries.includes(series.id);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const cardRef = useRef(null);

  // בעת לחיצה בלי “תיאור”: נווט לפרקים
  const handleNavigate = () => {
    if (!showDescription) {
      navigate(`/episodes/${series.id}`);
    }
  };

  const handleFavoriteAction = (e) => {
    e.stopPropagation();
    if (isSaved) {
      removeSeries(series.id);
      setToastMessage(lang === 'en' ? '🗑️ Removed!' : '🗑️ הוסרה מהמועדפים!');
    } else {
      saveSeries(series.id);
      setToastMessage(lang === 'en' ? '⭐ Added!' : '⭐ נוספה למועדפים!');

      // אנימציית “עף למועדפים”
      const icon = document.querySelector('#favorites-icon');
      if (icon && cardRef.current) {
        const from = cardRef.current.getBoundingClientRect();
        const to = icon.getBoundingClientRect();

        const clone = cardRef.current.cloneNode(true);
        clone.classList.add('fly-clone');
        clone.style.left = `${from.left}px`;
        clone.style.top = `${from.top}px`;
        clone.style.width = `${from.width}px`;
        clone.style.height = `${from.height}px`;
        clone.style.position = 'fixed';
        clone.style.transition = 'transform 1.3s ease-in-out, opacity 1.3s ease-in-out';
        clone.style.zIndex = '1000';
        clone.style.opacity = '1';

        document.body.appendChild(clone);

        requestAnimationFrame(() => {
          const dx = to.left - from.left;
          const dy = to.top - from.top;
          clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.25)`;
          clone.style.opacity = '0';
        });

        setTimeout(() => clone.remove(), 1400);
      }
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  const getTextByLang = (field) => {
    const value = series?.[field];
    if (!value) return '';
    return typeof value === 'object' ? (value[lang] || value['he']) : value;
  };

  return (
    <div
      ref={cardRef}
      className="
        relative w-full max-w-[260px] mx-auto group card bg-white dark:bg-gray-800
        rounded-xl shadow-md hover:shadow-xl hover:scale-[1.015] transition duration-300
        overflow-hidden
      "
      onClick={handleNavigate}
    >
      {/* כפתור מועדפים */}
      <div className="absolute top-2 left-2 z-10" onClick={handleFavoriteAction}>
        <button
          className={`text-xl p-1 rounded-full transition-colors ${
            isSaved
              ? 'text-red-600 hover:text-red-800 bg-white dark:bg-gray-800'
              : 'text-green-600 hover:text-green-800 bg-white dark:bg-gray-800'
          }`}
          aria-label={isSaved ? 'הסר סדרה' : 'הוסף סדרה'}
        >
          {isSaved ? '💔' : '❤️'}
        </button>
      </div>

      {/* תוכן לחיץ */}
      <div className="cursor-pointer flex flex-col items-center text-left p-2">
        {series.image ? (
          <img
            src={series.image}
            alt={`תמונה של ${getTextByLang('name')}`}
            className="w-full rounded-md aspect-video object-cover mb-2"
          />
        ) : (
          <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg mb-2">
            <span className="text-gray-500 dark:text-gray-300">
              {lang === 'en' ? 'No Image' : 'אין תמונה'}
            </span>
          </div>
        )}

        <div className="text-base font-semibold text-gray-800 dark:text-white text-center">
          {getTextByLang('name')}
        </div>
      </div>

      {series.platforms?.length > 0 && (
        <div className="flex gap-2 justify-center px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
          {series.platforms.map((p) => (
            platformIcons[p] && (
              <img
                key={p}
                src={platformIcons[p]}
                alt={p}
                title={p}
                className="w-5 h-5 object-contain rounded shadow-sm hover:scale-110 transition"
              />
            )
          ))}
        </div>
      )}

      {/* כפתור חץ קומפקטי */}
      {getTextByLang('description') && (
        <div className="absolute bottom-2 right-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDescription(!showDescription);
            }}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label={lang === 'en' ? 'Show description' : 'הצג תיאור'}
          >
            {showDescription ? (
              <ChevronUpIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      )}

      {showDescription && (
        <div className="px-3 pb-3 pt-1 animate-fade-slide-in text-sm text-gray-700 dark:text-gray-300">
          {getTextByLang('description')}
        </div>
      )}

      <PopUpToast message={toastMessage} show={showToast} />
    </div>
  );
}
