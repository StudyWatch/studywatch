import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import categories from "../../public/data/categories.js";
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';

const gradients = [
  'from-pink-500 to-orange-400',
  'from-green-400 to-blue-500',
  'from-purple-500 to-indigo-500',
  'from-yellow-400 to-red-500',
];

export default function CategoriesPage() {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const nav = useNavigate();
  const dir = ['he','ar'].includes(settings.uiLang) ? 'rtl' : 'ltr';
  const isRTL = ['he','ar'].includes(settings.uiLang);

  // --- פילטור לפי רמה ---
  const levels = useMemo(() => ['all','easy','medium','hard'], []);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const filtered = useMemo(() => {
    if (selectedLevel === 'all') return categories;
    return categories.filter(c => c.level === selectedLevel);
  }, [selectedLevel]);

  // --- טעינה ראשונית ---
  const [loaded, setLoaded] = useState(false);
  // בזמן טעינת העמוד, נציג אנימציית כניסה עם דיליים
  const [initialPhase, setInitialPhase] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoaded(true);
      // אחרי שכל הכרטיסיות הופיעו (שווה ל־filtered.length * 100ms + buffer),
      // נעבור לפאזה השנייה שבה אנימציית רענון מהירה
      const buffer = 200;
      const maxDelay = filtered.length * 100;
      setTimeout(() => setInitialPhase(false), maxDelay + buffer);
    }, 200);
    return () => clearTimeout(id);
  }, [filtered.length]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" dir={dir}>
      {/* כותרת רב־שפתית */}
      <h1 className={`text-4xl font-bold mb-6 text-center transition-colors ${
          settings.darkMode ? 'text-white':'text-gray-900'}`}>
        {t('categoriesPage.title')}
      </h1>

      {/* סינון לפי רמה */}
      <div className="flex justify-center mb-6 gap-4">
        <label className="font-medium">{t('categoriesPage.filterByLevel')}:</label>
        <select
          value={selectedLevel}
          onChange={e => setSelectedLevel(e.target.value)}
          className="px-3 py-1 rounded-md bg-white dark:bg-gray-700 dark:text-white shadow-sm"
        >
          {levels.map(lvl => (
            <option key={lvl} value={lvl}>
              {t(`categoriesPage.levels.${lvl}`)}
            </option>
          ))}
        </select>
      </div>

      {/* רינדור הכרטיסיות */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence exitBeforeEnter>
          {loaded
            ? filtered.map((cat, i) => {
                const grad = gradients[i % gradients.length];
                const count = cat.words.length;
                const label = t('categoriesPage.wordsLabel');
                const displayCount = isRTL
                  ? `${label} ${count}`
                  : `${count} ${label}`;

                return (
                  <motion.button
                    key={cat.id}
                    layout
                    onClick={() => nav(`/categories/${cat.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={
                      initialPhase
                        ? { delay: i * 0.1, type: 'spring', stiffness: 120 }
                        : { duration: 0.2, type: 'tween' }
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      bg-gradient-to-br ${grad}
                      rounded-2xl shadow-xl p-6
                      flex flex-col items-center justify-center gap-2
                      focus:outline-none focus:ring-4 focus:ring-blue-300
                    `}
                  >
                    <motion.span
                      className="text-6xl"
                      whileHover={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {cat.emoji}
                    </motion.span>
                    <span className="text-xl font-semibold text-white text-center">
                      {cat.name[settings.uiLang] || cat.name.en}
                    </span>
                    <span className="text-sm text-white/80">
                      {displayCount}
                    </span>
                  </motion.button>
                );
              })
            : Array(6)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
                  />
                ))
          }
        </AnimatePresence>
      </div>
    </div>
  );
}
