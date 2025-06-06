// src/pages/NotesPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSavedData } from '../context/SavedDataContext';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';

export default function NotesPage() {
  const { state } = useLocation(); // state.wordKey
  const navigate = useNavigate();
  const { savedWords } = useSavedData();
  const { settings } = useSettings();
  const { t } = useTranslation();

  const isRtl = ['he', 'ar'].includes(settings.uiLang);
  const isDark = settings.darkMode;

  const [noteText, setNoteText] = useState('');
  const [wordObj, setWordObj] = useState(null);

  useEffect(() => {
    if (!state?.wordKey) {
      navigate(-1);
      return;
    }
    const found = savedWords.find((w) => w.key === state.wordKey);
    if (!found) {
      navigate(-1);
      return;
    }
    setWordObj(found);

    const existing = localStorage.getItem(`note_${state.wordKey}`) || '';
    setNoteText(existing);
  }, [state, savedWords, navigate]);

  const saveNote = () => {
    if (!state?.wordKey) return;
    localStorage.setItem(`note_${state.wordKey}`, noteText);
    alert(t('notes.savedAlert') || 'Notes saved!');
  };

  if (!wordObj) {
    return null;
  }

  const fromLang = wordObj.fromLang;
  const learningLang = wordObj.learningLang;
  const wordFrom = wordObj.displayFrom || '—';
  const wordTo = wordObj.displayTo || '—';

  const hasNote = noteText.trim().length > 0;

  return (
    <BackgroundWrapper pageName="favorites" extension=".png">
      <main
        className={`
          w-full max-w-screen-xl mx-auto px-4 py-12 font-sans transition-opacity duration-500
          ${isRtl ? 'text-right' : 'text-left'}
        `}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8 animate-fade-in">
          {t('notes.title', { word: wordFrom }) || `Notes for "${wordFrom}"`}
        </h1>

        <div className="max-w-2xl mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-fade-slide-in">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {hasNote && <span className="text-xl">💭</span>}
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {wordFrom}
              </div>
            </div>
            <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              {wordTo}
            </div>
          </div>

          <label
            htmlFor="noteTextarea"
            className="block mb-2 text-gray-700 dark:text-gray-300 font-medium"
          >
            {t('notes.placeholder') || 'Write your notes here:'}
          </label>
          <textarea
            id="noteTextarea"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className={`w-full h-48 rounded-xl p-4 resize-none shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 scroll-py-2 ${
              isDark
                ? 'bg-white/10 text-white placeholder-gray-300'
                : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-300'
            }`}
            placeholder={t('notes.placeholder') || 'Write your notes here...'}
          />

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-semibold rounded-full shadow-md transition-colors duration-300 text-sm"
            >
              ← {t('common.back') || 'Back'}
            </button>
            <button
              onClick={saveNote}
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-md transition-colors duration-300 text-sm"
            >
              {t('notes.saveBtn') || 'Save Notes'}
            </button>
          </div>
        </div>
      </main>
    </BackgroundWrapper>
  );
}
