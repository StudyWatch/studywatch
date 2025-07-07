import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SeriesCard from '../components/SeriesCard';
import Spinner from '../components/Spinner';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';
import '../styles/tailwind.css';

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
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    }
    fetchData();
  }, []);

  const genres = useMemo(() => [
    'all', ...Array.from(new Set(seriesList.map(s => s.genre))).sort()
  ], [seriesList]);

  const filtered = useMemo(() => (
    seriesList.filter(s => {
      const name = typeof s.name === 'object'
        ? s.name[settings.uiLang] || s.name.en
        : s.name;
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === 'all' || s.genre === selectedGenre)
      );
    })
  ), [seriesList, searchTerm, selectedGenre, settings.uiLang]);

  if (loading) return <Spinner />;

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gray-800 dark:bg-gray-900"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 🔳 רקע רשת לינארית מואצת */}
      <div
        className="
          absolute inset-0 z-0
          bg-gradient-to-br from-primary via-accent1 to-secondary
          bg-grid-lines bg-grid-40 animate-grid-pan-fast
        "
      />

      {/* 🔆 אור מפוזר (פינות) */}
      <motion.div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-purple-500 rounded-full blur-[150px] opacity-50 mix-blend-lighten pointer-events-none"
        animate={{ scale: [1,1.15,1], x: [0,20,-20,0], y: [0,-30,30,0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-20%] w-[700px] h-[700px] bg-indigo-400 rounded-full blur-[150px] opacity-40 mix-blend-lighten pointer-events-none"
        animate={{ scale: [1,1.1,1], x: [0,-30,30,0], y: [0,25,-25,0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
      />

      {/* ✨ בלובים נוספים */}
      <motion.div
        className="absolute top-[30%] left-[70%] w-52 h-52 bg-pink-400 rounded-full blur-3xl opacity-20 mix-blend-lighten"
        animate={{ x: [0,-20,10,0], y: [0,15,-15,0], scale: [1,1.2,1] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-60 h-60 bg-blue-400 rounded-full blur-3xl opacity-25 mix-blend-lighten"
        animate={{ x: [0,15,-15,0], y: [0,-10,10,0], scale: [1,1.3,1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
      />

      {/* תוכן העמוד */}
      <div className="relative z-10 px-4 pb-16 pt-[100px] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text mb-4 tracking-tight animate-pulse">
              {t('browse.title') ?? 'Browse Series'}
            </h1>
            <p className="text-gray-300 text-xl">
              {t('browse.subtitle') ?? 'Select a show to start learning languages'}
            </p>
          </motion.div>

          <div className="flex gap-3 flex-wrap sm:justify-center overflow-x-auto pb-4 px-2">
            {genres.map((genre, i) => (
              <motion.button
                key={genre}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedGenre(genre)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium
                  border border-white/20 backdrop-blur-md transition-all
                  ${selectedGenre === genre
                    ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-lg'
                    : 'bg-white/10 text-gray-200 hover:bg-white/20'}
                `}
              >
                {t(`genres.${genre}`) ?? genre}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="my-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={t('search.placeholder') ?? 'Search series...'}
              className="
                w-full rounded-full bg-white/10 backdrop-blur-sm
                border border-white/20 px-5 py-3 text-sm text-white
                placeholder-white/50 shadow-sm focus:outline-none
                focus:ring-2 focus:ring-primary transition-all
              "
            />
          </motion.div>

          <AnimatePresence>
            {filtered.length > 0 ? (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-2"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {filtered.map(s => (
                  <motion.div
                    key={s.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <SeriesCard
                      series={s}
                      onClick={() => navigate(`/series/${s.id}`)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                className="text-center text-gray-400 mt-12 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {t('search.noResults') ?? 'No matching series found.'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
