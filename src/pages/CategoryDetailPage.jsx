// src/pages/CategoryDetailPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import categories from '../../public/data/newcategory.js';
import localDictionary from '../../public/data/localDictionary_sorted.json';
import sentencesByWord from '../../public/data/sentencesByWord.js';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';
import { motion } from 'framer-motion';
import CategoryWordCard from '../components/CategoryWordCard';
import Spinner from '../components/Spinner';
import useFlyToFavorites from '../hooks/useFlyToFavorites';

export default function CategoryDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { settings } = useSettings();
  const { t } = useTranslation();
  const dir = ['he','ar'].includes(settings.uiLang) ? 'rtl' : 'ltr';
  const triggerFlyToFavorites = useFlyToFavorites();

  // find the category by id
  const category = useMemo(
    () => categories.find(c => c.id === id),
    [id]
  );
  useEffect(() => {
    if (!category) nav('/categories');
  }, [category, nav]);
  if (!category) return null;

  // language selectors
  const [fromLang, setFromLang] = useState(localStorage.getItem('fromLang') || 'en');
  const [learningLang, setLearningLang] = useState(localStorage.getItem('learningLang') || settings.uiLang);
  useEffect(() => {
    localStorage.setItem('fromLang', fromLang);
    localStorage.setItem('learningLang', learningLang);
  }, [fromLang, learningLang]);

  // filter tabs state
  const [selectedFilter, setSelectedFilter] = useState('all');
  const filterOptions = category.filters;

  // words according to selected filter
  const wordsList = useMemo(() => {
    return category.filters.find(f => f.id === selectedFilter)?.words || [];
  }, [category.filters, selectedFilter]);

  // enrich words with translations & example sentences
  const enriched = useMemo(() => {
    return wordsList.map(key => {
      const entry = localDictionary[key] || {};
      const dispFrom = entry.translations?.[fromLang] || key;
      const dispTo   = entry.translations?.[learningLang] || key;
      const sentObj  = sentencesByWord.easy[key] || {};
      return {
        key,
        displayFrom: dispFrom,
        displayTo: dispTo,
        srcSentence: sentObj.sentence?.[fromLang] || '',
        tgtSentence: sentObj.sentence?.[learningLang] || '',
        fromLang,
        learningLang
      };
    });
  }, [wordsList, fromLang, learningLang]);

  const speak = (text, lang) => {
    if (!window.speechSynthesis || !text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    window.speechSynthesis.speak(u);
  };

  if (!enriched.length) return <Spinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-colors"
      dir={dir}
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-md px-4 py-4">
        <h1 className={`text-2xl sm:text-3xl font-bold text-center ${
          settings.darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {category.emoji}{' '}
          {category.name[settings.uiLang] || category.name.en}
        </h1>

        {/* Filter tabs */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {filterOptions.map(f => {
            const isActive = f.id === selectedFilter;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`
                  flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
                  focus:outline-none focus:ring-2 focus:ring-offset-1
                  ${isActive
                    ? 'bg-blue-500 text-white ring-blue-300'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 ring-transparent hover:ring-blue-200'
                  }
                `}
              >
                <span className="text-lg">{f.emoji}</span>
                {f.name[settings.uiLang] || f.name.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Word Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {enriched.map((w, i) => (
            <motion.div
              key={w.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <CategoryWordCard
                wordObj={w}
                speakSrc={speak}
                speakTgt={speak}
                isDarkMode={settings.darkMode}
                dir={dir}
                onAddedToFavorites={triggerFlyToFavorites}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
