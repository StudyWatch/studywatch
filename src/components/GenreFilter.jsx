import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';

export default function GenreFilter({ genres, selectedGenres = [], onSelect, onClose }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const isRtl = ['he', 'ar'].includes(settings.uiLang);
  const lang = settings.uiLang || 'he';

  const getGenreLabel = (genreKey) => {
    if (genreKey === 'all') return t('genreFilter.all');
    return settings.translations?.genres?.[genreKey]?.[lang] || genreKey;
  };

  return (
    <div
      className={`fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} 
      sm:w-64 w-full h-full bg-white dark:bg-gray-800 shadow-2xl z-50 p-6 overflow-y-auto 
      border-gray-200 dark:border-gray-700 transition-all duration-500`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">🎬 {t('genreFilter.title')}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">❌</button>
      </div>

      <ul className="grid sm:block grid-cols-3 gap-3 sm:gap-2">
        {genres.map((genre) => (
          <li key={genre} className="sm:mb-2">
            <button
              onClick={() => onSelect(genre)}
              className={`w-full text-sm font-medium transition-all 
                flex items-center justify-center px-4 py-2 rounded-full 
                ${selectedGenres.includes(genre)
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-gray-600'}`}
            >
              {getGenreLabel(genre)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
