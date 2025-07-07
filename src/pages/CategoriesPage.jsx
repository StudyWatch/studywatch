// src/pages/CategoriesPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, PawPrint } from 'lucide-react';
import categories from '../../public/data/newcategory.js';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';
import { ScrollToTop } from '../components/ScrollToTop';

const gradients = [
  'from-pink-500 to-orange-400',
  'from-purple-500 to-pink-400',
  'from-fuchsia-400 to-violet-300',
  'from-rose-400 to-pink-300',
];

// רק קטגוריות תקינות
const validCategories = Array.isArray(categories)
  ? categories.filter(cat =>
      cat?.id &&
      cat.name && typeof cat.name === 'object' &&
      Array.isArray(cat.filters)
    )
  : [];

// תווית רמה
const getLevelLabel = (t, level) => {
  if (level === 'easy')   return t('categoriesPage.levels.easy');
  if (level === 'medium') return t('categoriesPage.levels.medium');
  if (level === 'hard')   return t('categoriesPage.levels.hard');
  return '';
};
// צבעי רקע תווית רמה
const getLevelColor = level => {
  switch (level) {
    case 'easy':   return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hard':   return 'bg-red-100 text-red-800';
    default:       return 'bg-gray-100 text-gray-800';
  }
};

// Variants לאנימציות כרטיס
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: 'spring', stiffness: 120 }
  }),
  hover: {
    scale: 1.04,
    x: -4,
    y: -4,
    boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
    background: 'linear-gradient(135deg, rgba(249,207,232,0.5), rgba(254,205,211,0.5))'
  }
};
// Variants לאנימציות אימוג’י
const emojiVariants = {
  initial: { y: 0, rotate: 0 },
  hover: {
    y: -8,
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.6 }
  }
};

export default function CategoriesPage() {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dir = ['he', 'ar'].includes(settings.uiLang) ? 'rtl' : 'ltr';

  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm]       = useState('');
  const [loaded, setLoaded]               = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // סימול טעינה
  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  // מאזין לגלילה להצגת כפתור ScrollToTop
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // פילטור קטגוריות לפי רמה ומילת חיפוש
  const allCats = useMemo(() => validCategories, []);
  const filtered = useMemo(() => {
    return allCats.filter(cat => {
      if (selectedLevel !== 'all') {
        const f = cat.filters.find(f => f.id === selectedLevel);
        if (!f?.words?.length) return false;
      }
      if (searchTerm) {
        const name = cat.name[settings.uiLang] || cat.name.en;
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    });
  }, [allCats, selectedLevel, searchTerm, settings.uiLang]);

  const levels = ['all', 'easy', 'medium', 'hard'];

  return (
    <div dir={dir} className="relative min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* באנר עליון */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-center rounded-2xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {t('categoriesPage.bannerTitle')}
          </h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t('categoriesPage.bannerSubtitle')}
          </p>
        </div>

        {/* חיפוש + בורר רמות */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder={t('categoriesPage.searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 max-w-md px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow"
          />
          <div className="flex gap-3 flex-wrap">
            {levels.map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedLevel === lvl
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {t(`categoriesPage.levels.${lvl}`)}
              </button>
            ))}
          </div>
        </div>

        {/* גריד כרטיסים */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {loaded
              ? filtered.map((cat, i) => {
                  const grad        = gradients[i % gradients.length];
                  const allFilter   = cat.filters.find(f => f.id === 'all');
                  const count       = allFilter?.words?.length ?? 0;
                  const mainFilt    = cat.filters.find(f => f.id !== 'all' && f.words.length > 0);
                  const levelId     = mainFilt?.id || 'easy';
                  const nameObj     = cat.name || {};
                  const displayName = nameObj[settings.uiLang] || nameObj.en;
                  const descObj     = cat.description || {};
                  const displayDesc = descObj[settings.uiLang] || descObj.en || '';

                  return (
                    <motion.div
                      key={cat.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onClick={() => navigate(`/categories/${cat.id}`)}
                      className={`
                        relative cursor-pointer overflow-hidden
                        rounded-2xl p-6 shadow-lg transition-all duration-300
                        bg-white dark:bg-gray-800
                        hover:bg-gradient-to-br hover:from-pink-100 hover:to-purple-100
                      `}
                    >
                      {/* רקע דקורטיבי מעודן */}
                      <div className={`
                        absolute -top-6 -right-6 w-24 h-24 rounded-full
                        bg-gradient-to-br ${grad} opacity-20
                      `} />

                      {/* paw prints */}
                      {cat.id === 'animals' && (
                        <div className="absolute top-4 left-4 flex space-x-1 text-gray-500">
                          <PawPrint className="w-5 h-5 opacity-80" />
                          <PawPrint className="w-5 h-5 opacity-60" />
                        </div>
                      )}

                      {/* אימוג׳י עם אפקט hover */}
                      <motion.span
                        className="text-6xl mb-3 block drop-shadow-md"
                        variants={emojiVariants}
                        initial="initial"
                        animate="initial"
                        whileHover="hover"
                      >
                        {cat.emoji}
                      </motion.span>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {displayName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {displayDesc}
                      </p>

                      <div className="flex items-center mb-4">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {count} {t('categoriesPage.wordsLabel')}
                        </span>
                        <span className={`
                          ml-auto px-3 py-1 rounded-full text-xs font-medium
                          ${getLevelColor(levelId)}
                        `}>
                          {getLevelLabel(t, levelId)}
                        </span>
                      </div>

                      <motion.div
                        onClick={e => { e.stopPropagation(); navigate(`/categories/${cat.id}`); }}
                        className="inline-flex items-center gap-1 text-purple-600 font-medium transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        {t('categoriesPage.startLearning')}
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  );
                })
              : Array(6).fill().map((_, idx) => (
                  <div key={idx} className="h-60 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
                ))
            }
          </AnimatePresence>
        </div>
      </div>

      {/* כפתור גלילה למעלה */}
      <ScrollToTop show={showScrollTop} />
    </div>
  );
}
