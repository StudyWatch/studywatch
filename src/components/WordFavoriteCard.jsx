import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import heLocale from 'date-fns/locale/he';
import statsManager from '../utils/statsManager';

export default function WordFavoriteCard({
  wordObj,
  removeWord,
  fromLang,
  learningLang,
  settings,
  t
}) {
  const { key, displayFrom, displayTo, displaySentence, practicedEpisodes, totalEpisodes, difficulty, lastPracticed } = wordObj;

  // --- State פנימי לכל כרטיסיית מילה ---
  const [isEditingNote, setIsEditingNote] = useState(false);
  const savedNoteKey = `note_${key}`;
  const existingNote = localStorage.getItem(savedNoteKey) || '';
  const [tempNote, setTempNote] = useState(existingNote);

  // --- שליפת סטטיסטיקות עבור המילה הזו ---
  const progInfo = statsManager.getWordProgress(key) || { attempts: 0, correct: 0, successRate: 0 };
  const attemptsCount = progInfo.attempts || 0;
  const successRate = progInfo.successRate || 0;

  // --- חישוב אחוז חשיפה (Exposure) ---
  const practicedCount = practicedEpisodes ?? 0;
  const totalEp = totalEpisodes ?? 10;
  const pctPracticed = totalEp > 0
    ? Math.min(Math.round((practicedCount / totalEp) * 100), 100)
    : 0;

  // --- חישוב "Hybrid" אחוז (Exposure + Success) ---
  const hybridPct = Math.round((pctPracticed + successRate) / 2);

  // --- רקע תגית קושי ---
  const difficultyBg =
    difficulty === 'easy'
      ? 'bg-green-50 text-green-800'
      : difficulty === 'medium'
      ? 'bg-yellow-50 text-yellow-800'
      : 'bg-red-50 text-red-800';

  // --- בדיקת "צריך תרגול" אם עברו > 7 ימים מאז תרגול אחרון ---
  const lastDateObj = lastPracticed ? new Date(lastPracticed) : null;
  const daysSince = lastDateObj
    ? Math.floor((Date.now() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const needsPracticeIcon = daysSince !== null && daysSince > 7;

  // --- סגנון גרדיאנט לסרגל הצלחה ---
  const gradientStyle = {
    background: `linear-gradient(to right, #34D399 ${successRate}%, #EF4444 ${successRate}% 100%)`
  };

  // --- קביעת תווית רמת שליטה (Mastery) ---
  let masteryLabel = t('favorites.beginner') || '🌀 מתחילים';
  let masteryEmoji = '🌀';
  if (hybridPct >= 80) {
    masteryLabel = t('favorites.mastered') || '🏆 שולט/ת';
    masteryEmoji = '🏆';
  } else if (hybridPct >= 50) {
    masteryLabel = t('favorites.intermediate') || '📘 בינוני';
    masteryEmoji = '📘';
  }

  // --- השגת המשפט באיזו שפה: אם אובייקט, מוציאים לפי השפה, אחרת הטקסט עצמו ---
  let sentenceText = '—';
  if (displaySentence) {
    sentenceText = typeof displaySentence === 'object'
      ? (displaySentence[learningLang] || displaySentence.en || '—')
      : displaySentence;
  }
  const dirSentence = ['he', 'ar'].includes(learningLang) ? 'rtl' : 'ltr';

  return (
    <div
      className="
        bg-white dark:bg-gray-800 p-3 rounded-2xl
        border border-gray-200 dark:border-gray-700
        shadow-lg hover:shadow-2xl transition-shadow duration-300
        flex flex-col justify-between
      "
    >
      {/* Top row: Difficulty + Remove button */}
      <div className="flex justify-between items-center mb-2">
        <span className={`text-xs font-medium py-1 px-2 rounded-full ${difficultyBg}`}>
          {t(`difficulty.${difficulty}`) || difficulty}
        </span>
        <button
          onClick={() => removeWord(key)}
          className="
            bg-gray-100 dark:bg-gray-700 p-1 rounded-full
            text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900
            transition-colors duration-200
          "
          style={{ fontSize: '0.70rem' }}
          aria-label={t('favorites.removeWord') || 'הסר מילה'}
        >
          ✕
        </button>
      </div>

      {/* Middle: WordFrom + 🔊, WordTo + 🔊 */}
      <div className="flex justify-between items-start mb-2">
        {/* מקור + שקשור לשמע */}
        <div className="flex flex-col">
          <div className="text-xl font-bold text-gray-900 dark:text-white whitespace-normal break-words">
            {displayFrom || '—'}
          </div>
          <button
            onClick={() => {
              if (!window.speechSynthesis) return;
              const u = new SpeechSynthesisUtterance(displayFrom);
              u.lang = fromLang;
              window.speechSynthesis.speak(u);
            }}
            className="
              bg-indigo-100 dark:bg-indigo-800 p-1 rounded-full
              text-indigo-600 hover:text-indigo-800
              hover:bg-indigo-200 dark:hover:bg-indigo-700
              transition-colors duration-200 mt-1
            "
            style={{ fontSize: '0.70rem' }}
            aria-label={t('favorites.playWord') || 'השמע מילה'}
          >
            🔊
          </button>
        </div>

        {/* תרגום + שקשור לשמע */}
        <div className="flex flex-col items-end">
          <div className="text-base font-semibold text-indigo-700 dark:text-indigo-300 whitespace-normal break-words">
            {displayTo || '—'}
          </div>
          <button
            onClick={() => {
              if (!window.speechSynthesis) return;
              const u = new SpeechSynthesisUtterance(displayTo);
              u.lang = learningLang;
              window.speechSynthesis.speak(u);
            }}
            className="
              bg-indigo-100 dark:bg-indigo-800 p-1 rounded-full
              text-indigo-600 hover:text-indigo-800
              hover:bg-indigo-200 dark:hover:bg-indigo-700
              transition-colors duration-200 mt-1
            "
            style={{ fontSize: '0.70rem' }}
            aria-label={t('favorites.playTranslation') || 'השמע תרגום'}
          >
            🔊
          </button>
        </div>
      </div>

      {/* Example sentence */}
      <p
        className="text-gray-600 dark:text-gray-400 italic text-xs mb-2 leading-tight whitespace-normal break-words"
        dir={dirSentence}
      >
        {sentenceText}
      </p>

      {/* Success bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center text-xxs text-gray-600 dark:text-gray-400 mb-1">
          <span>{t('favorites.attempts') || 'ניסיונות'}: {attemptsCount}</span>
          <span>{t('favorites.successRate') || 'הצלחה'}: {successRate}%</span>
        </div>
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={gradientStyle}
          />
        </div>
      </div>

      {/* Exposure bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center text-xxs text-gray-600 dark:text-gray-400 mb-1">
          <span>
            {t('favorites.practicedEpisodes') || 'תרגולים'}: {pctPracticed}/{totalEp}
          </span>
          <span>{pctPracticed}%</span>
        </div>
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-300"
            style={{ width: `${pctPracticed}%` }}
          />
        </div>
      </div>

      {/* Mastery + Last Practiced */}
      <div className="flex justify-between items-center text-xxs text-gray-500 dark:text-gray-400 mb-2">
        <span>
          {masteryEmoji} {masteryLabel}
        </span>
        <span>
          {t('favorites.lastPracticed') || 'אחרון'}:{' '}
          {lastPracticed
            ? formatDistanceToNow(new Date(lastPracticed), {
                addSuffix: true,
                locale: settings.uiLang === 'he' ? heLocale : undefined
              })
            : t('favorites.neverPracticedLabel') || '—'}
        </span>
      </div>

      {/* Inline Edit Notes */}
      <div className="mb-2">
        {isEditingNote ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              className="
                w-full h-20 rounded-md p-2
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm
              "
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  localStorage.setItem(savedNoteKey, tempNote);
                  setIsEditingNote(false);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
              >
                {t('favorites.save') || 'שמור'}
              </button>
              <button
                onClick={() => setIsEditingNote(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-xs"
              >
                {t('favorites.cancel') || 'ביטול'}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              const existing = localStorage.getItem(savedNoteKey) || '';
              setTempNote(existing);
              setIsEditingNote(true);
            }}
            className="
              w-full flex items-center justify-center gap-1
              bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
              text-gray-800 dark:text-gray-200 text-xs font-semibold
              py-1 rounded-lg shadow-sm
              transition-colors duration-200
            "
          >
            <span>✏️</span>
            <span>{t('favorites.addNotes') || 'הוסף הערה'}</span>
          </button>
        )}
      </div>

      {/* Review Button */}
      <button
        onClick={() => window.location.assign(`/review-word/${key}`)}
        className="
          w-full flex items-center justify-center gap-1
          bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
          text-white text-xs font-semibold py-1 rounded-lg shadow-sm
          transition-colors duration-200
        "
      >
        <span>📖</span>
        <span>{t('favorites.review') || 'תרגל'}</span>
      </button>
    </div>
  );
}
