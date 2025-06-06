// src/pages/AllSeriesFavoritesPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedData } from '../context/SavedDataContext';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';

export default function AllSeriesFavoritesPage() {
  const { savedSeries, removeSeries } = useSavedData();
  const [seriesList, setSeriesList] = useState([]);
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { t } = useTranslation();
  const isRtl = ['he', 'ar'].includes(settings.uiLang);

  useEffect(() => {
    async function fetchSeriesList() {
      try {
        const resp = await fetch('/data/seriesList.json');
        const data = await resp.json();
        setSeriesList(data);
      } catch (err) {
        console.error('Error loading seriesList.json:', err);
      }
    }
    fetchSeriesList();
  }, []);

  const findSeriesDetails = (id) => {
    return seriesList.find((s) => s.id === id) || null;
  };

  return (
    <BackgroundWrapper pageName="favorites" extension=".png">
      <main
        className={`
          w-full max-w-screen-xl mx-auto px-4 py-12 font-sans
          transition-opacity duration-500
          ${isRtl ? 'text-right' : 'text-left'}
        `}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          {t('favorites.viewAllSeries')}
        </h1>

        {savedSeries.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            {t('favorites.noSeries')}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedSeries.map((seriesId) => {
              const series = findSeriesDetails(seriesId);
              if (!series) return null;
              const name = series.name?.[settings.uiLang] || series.name?.en || series.id;
              return (
                <div
                  key={seriesId}
                  className="
                    relative w-full h-48 rounded-lg overflow-hidden
                    bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700
                    shadow-md hover:shadow-lg transition-shadow duration-300
                  "
                  onClick={() => navigate(`/episodes/${series.id}`)}
                >
                  <img
                    src={series.image}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 py-2 text-center">
                    <span className="text-white font-semibold">{name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSeries(seriesId);
                    }}
                    className="
                      absolute top-1 right-1
                      bg-white dark:bg-gray-800
                      p-1 rounded-full
                      text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900
                      transition-colors duration-200
                    "
                    style={{ fontSize: '0.75rem' }}
                    aria-label={t('favorites.removeSeries')}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </BackgroundWrapper>
  );
}
