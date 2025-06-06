// src/pages/ReviewWordPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSavedData } from '../context/SavedDataContext';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';
import { formatDistanceToNow } from 'date-fns';
import heLocale from 'date-fns/locale/he';
import statsManager from '../utils/statsManager';

export default function ReviewWordPage() {
  const { wordKey } = useParams();
  const navigate = useNavigate();
  const { savedWords, removeWord } = useSavedData();
  const { settings } = useSettings();
  const { t } = useTranslation();
  const isRtl = ['he', 'ar'].includes(settings.uiLang);

  // Find the word object
  const w = savedWords.find((w) => w.key === wordKey);
  useEffect(() => {
    if (!w) {
      navigate('/favorites/all-words', { replace: true });
    }
  }, [w, navigate]);
  if (!w) return null;

  // Display fields
  const fromLang = w.fromLang;
  const learningLang = w.learningLang;
  const wordFrom = w.displayFrom || '—';
  const wordTo = w.displayTo || '—';
  const sentence =
    typeof w.displaySentence === 'object'
      ? w.displaySentence[learningLang] || w.displaySentence.en
      : w.displaySentence || '—';
  const dirSentence = ['he', 'ar'].includes(learningLang) ? 'rtl' : 'ltr';

  // 1) Safe success stats
  const { attempts: attemptsCountRaw, correct: correctCountRaw, successRate: storedRate } =
    statsManager.getWordProgress(w.key) || { attempts: 0, correct: 0, successRate: 0 };
  const attempts = attemptsCountRaw || 0;
  const correct = correctCountRaw || 0;
  // If no attempts, force successRate = 0
  const successRate = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

  // 2) Exposure %
  const practicedCount = w.practicedEpisodes || 0;
  const totalEpisodes = w.totalEpisodes || 10;
  const exposurePercent = totalEpisodes > 0
    ? Math.min(Math.round((practicedCount / totalEpisodes) * 100), 100)
    : 0;

  // 3) Hybrid mastery
  const hybridPercent = Math.round((exposurePercent + successRate) / 2);
  const masteryLevel =
    hybridPercent < 30
      ? t('favorites.beginner')
      : hybridPercent < 70
      ? t('favorites.intermediate')
      : t('favorites.mastered');

  // 4) Last Practiced
  const lastPracticed = w.lastPracticed
    ? formatDistanceToNow(new Date(w.lastPracticed), {
        addSuffix: true,
        locale: settings.uiLang === 'he' ? heLocale : undefined,
      })
    : t('favorites.neverPracticedLabel');

  // 5) Difficulty badge
  const difficultyBg =
    w.difficulty === 'easy'
      ? 'bg-green-100 text-green-800'
      : w.difficulty === 'medium'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';

  // 6) Gradient for success
  const gradientStyle = {
    background: `linear-gradient(to right, #34D399 ${successRate}%, #EF4444 ${successRate}% 100%)`,
  };

  // 7) Speak function
  function speak(text, lang) {
    if (!text || !window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  }

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
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6 animate-fade-in">
          {t('favorites.review')}
        </h1>

        <div className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg animate-fade-slide-in">
          {/* Difficulty + Remove */}
          <div className="flex justify-between items-center mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyBg}`}>
              {t(`difficulty.${w.difficulty}`)}
            </span>
            <button
              onClick={() => {
                removeWord(wordKey);
                navigate('/favorites/all-words');
              }}
              className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
              style={{ fontSize: '0.75rem' }}
              aria-label={t('favorites.removeWord')}
            >
              ❌
            </button>
          </div>

          {/* WordFrom + WordTo + 🔊 */}
          <div className="flex justify-between items-center mb-3">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {wordFrom}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                {wordTo}
              </div>
              <button
                onClick={() => speak(wordTo, learningLang)}
                className="bg-indigo-100 dark:bg-indigo-800 p-1 rounded-full text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors duration-200"
                style={{ fontSize: '0.75rem' }}
                aria-label={t('favorites.speakWord')}
              >
                🔊
              </button>
            </div>
          </div>

          {/* Example sentence */}
          <p
            className="text-gray-600 dark:text-gray-400 italic text-sm mb-4 leading-tight"
            dir={dirSentence}
          >
            {sentence}
          </p>

          {/* Success Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xxs text-gray-600 dark:text-gray-400 mb-1">
              <span>{t('favorites.attempts')}: {attempts}</span>
              <span>{t('favorites.successRate')}: {successRate}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={gradientStyle}
              />
            </div>
          </div>

          {/* Exposure Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xxs text-gray-600 dark:text-gray-400 mb-1">
              <span>
                {t('favorites.practicedEpisodes')}: {practicedCount}/{totalEpisodes}
              </span>
              <span>{exposurePercent}%</span>
            </div>
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-300"
                style={{ width: `${exposurePercent}%` }}
              />
            </div>
          </div>

          {/* Mastery + Last Practiced */}
          <div className="flex justify-between items-center text-xxs text-gray-500 dark:text-gray-400 mb-6">
            <span>{masteryLevel}</span>
            <span>
              {t('favorites.lastPracticed')}: {lastPracticed}
            </span>
          </div>

          {/* Back & Add Notes buttons */}
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => navigate('/favorites/all-words')}
              className="
                px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-700
                hover:from-gray-600 hover:to-gray-800
                text-white font-semibold rounded-full shadow-md
                transition-colors duration-300 text-sm
              "
            >
              ← {t('common.back')}
            </button>
            <button
              onClick={() => navigate('/notes', { state: { wordKey } })}
              className="
                px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600
                hover:from-indigo-600 hover:to-purple-700
                text-white font-semibold rounded-full shadow-md
                transition-colors duration-300 text-sm
              "
            >
              📝 {t('favorites.addNotes')}
            </button>
          </div>
        </div>
      </main>
    </BackgroundWrapper>
  );
}
