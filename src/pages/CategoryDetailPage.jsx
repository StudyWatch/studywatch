// src/pages/CategoryDetailPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import categories from "../../public/data/categories.js";
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
  const dir = ['he', 'ar'].includes(settings.uiLang) ? 'rtl' : 'ltr';
  // ✅ הפונקציה שמחזיר useFlyToFavorites היא כבר ה-triggerFlyToFavorites
const triggerFlyToFavorites = useFlyToFavorites();


  const category = useMemo(() => categories.find(c => c.id === id), [id]);
  useEffect(() => {
    if (!category) nav('/categories');
  }, [category, nav]);
  if (!category) return null;

  const [fromLang, setFromLang] = useState(localStorage.getItem('fromLang') || 'en');
  const [learningLang, setLearningLang] = useState(localStorage.getItem('learningLang') || settings.uiLang);

  useEffect(() => {
    localStorage.setItem('fromLang', fromLang);
    localStorage.setItem('learningLang', learningLang);
  }, [fromLang, learningLang]);

  const enriched = useMemo(() => {
    return category.words.reduce((acc, key) => {
      const entry = localDictionary[key];
      if (!entry) return acc;
      const dispFrom = entry.translations?.[fromLang] || key;
      const dispTo = entry.translations?.[learningLang] || key;
      const sentObj = sentencesByWord.easy[key] || {};
      const srcSentence = sentObj.sentence?.[fromLang] || '';
      const tgtSentence = sentObj.sentence?.[learningLang] || '';
      acc.push({ key, displayFrom: dispFrom, displayTo: dispTo, srcSentence, tgtSentence, fromLang, learningLang });
      return acc;
    }, []);
  }, [category.words, fromLang, learningLang]);

  const speak = (text, lang) => {
    if (!window.speechSynthesis || !text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    window.speechSynthesis.speak(u);
  };

  if (!enriched.length) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-colors" dir={dir}>
      {/* Header */}
      <div className="sticky top-0 z-30 shadow-md bg-white dark:bg-gray-900 px-4 py-4 flex flex-col gap-4 sm:flex-col">
        {/* כותרת */}
        <h1 className={`text-2xl sm:text-3xl font-bold text-center ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
          {category.emoji} {category.name[settings.uiLang] || category.name.en}
        </h1>

        {/* שורת שפות */}
        <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <div className="hidden sm:flex items-center gap-4 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 shadow-md">
            <select
              value={fromLang}
              onChange={e => setFromLang(e.target.value)}
              className="text-sm px-3 py-1 rounded-md bg-white dark:bg-gray-700 dark:text-white shadow-sm min-w-[100px]"
            >
              {Object.entries(t('languageNames')).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>

            <button
              onClick={() => {
                const tmp = fromLang;
                setFromLang(learningLang);
                setLearningLang(tmp);
              }}
              className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xl flex items-center justify-center transition-transform hover:rotate-180 shadow-md"
              aria-label={t('common.swap_languages')}
              title={t('common.swap_languages')}
            >
              🔄
            </button>

            <select
              value={learningLang}
              onChange={e => setLearningLang(e.target.value)}
              className="text-sm px-3 py-1 rounded-md bg-white dark:bg-gray-700 dark:text-white shadow-sm min-w-[100px]"
            >
              {Object.entries(t('languageNames')).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
          </div>

          <div className="sm:hidden flex flex-col gap-2 px-3">
            <select
              value={fromLang}
              onChange={e => setFromLang(e.target.value)}
              className="text-sm px-3 py-2 rounded-md bg-white dark:bg-gray-700 dark:text-white shadow-sm"
            >
              {Object.entries(t('languageNames')).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>

            <select
              value={learningLang}
              onChange={e => setLearningLang(e.target.value)}
              className="text-sm px-3 py-2 rounded-md bg-white dark:bg-gray-700 dark:text-white shadow-sm"
            >
              {Object.entries(t('languageNames')).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>

            <button
              onClick={() => {
                const tmp = fromLang;
                setFromLang(learningLang);
                setLearningLang(tmp);
              }}
              className="w-full mt-1 py-2 rounded-md bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white font-semibold text-sm shadow-sm"
            >
              🔄 {t('common.swap_languages') || 'החלף שפות'}
            </button>
          </div>
        </div>
      </div>

      {/* Word Grid */}
      <div className="px-5 py-8">
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