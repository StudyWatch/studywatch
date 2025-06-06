// ✅ BrowseSeriesPage.jsx – גרסה סופית משודרגת ומעוצבת 🔥
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeriesCard from '../components/SeriesCard';
import Spinner from '../components/Spinner';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';

export default function BrowseSeriesPage() {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const navigate = useNavigate();
  const { settings } = useSettings();
  const { t } = useTranslation();
  const isRtl = ['he', 'ar'].includes(settings.uiLang);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/seriesList.json');
        const data = await res.json();
        setSeriesList(data);
      } catch (error) {
        console.error('Error loading series:', error);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    }
    fetchData();
  }, []);

  const genres = ['all', ...Array.from(new Set(seriesList.map((s) => s.genre)))];

  const filtered = seriesList.filter((s) => {
    const name = typeof s.name === 'object' ? s.name[settings.uiLang] || s.name['en'] : s.name;
    return (
      name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === 'all' || s.genre === selectedGenre)
    );
  });

  if (loading) return <Spinner />;

  return (
    <div
      className="min-h-screen px-4 pb-16 pt-[100px] bg-gradient-to-b from-[#0f172a] to-[#1e293b] dark:from-[#0a0f1f] dark:to-[#1f2937] text-white transition-all"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text mb-2 tracking-tight">
            {t('browse.title') || 'Browse Series'}
          </h1>
          <p className="text-gray-300 text-md">
            {t('browse.subtitle') || 'Select a show to start learning languages'}
          </p>
        </div>

        {/* סינון לפי ז'אנר */}
        <div className="flex gap-3 flex-wrap sm:justify-center overflow-x-auto pb-3 px-1 sm:px-0">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium border bg-white/5 border-white/20 hover:bg-white/10 transition-all backdrop-blur-md whitespace-nowrap
                ${selectedGenre === genre
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-200'}
              `}
            >
              {t(`genres.${genre}`) || genre}
            </button>
          ))}
        </div>

        {/* שורת חיפוש */}
        <div className="my-10 max-w-xl mx-auto">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3 text-sm text-white placeholder-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('search.placeholder') || 'Search series...'}
          />
        </div>

        {/* רשת כרטיסים */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-2 animate-fade-slide-in">
            {filtered.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-12 text-lg animate-pulse">
            {t('search.noResults') || 'No matching series found.'}
          </p>
        )}
      </div>
    </div>
  );
}
