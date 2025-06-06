// src/components/games/WordTreasureGame.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GamePage from '../../pages/GamePage';
import statsManager from '../../utils/statsManager';

export default function WordTreasureGame() {
  const navigate = useNavigate();
  const location = useLocation();

  // המילים ופרטי השפות עוברים דרך state
  const words = location.state?.words || [];
  const firstWord = words[0] || {};
  const fromLang = location.state?.sourceLang || firstWord.fromLang || 'en';
  const learningLang = location.state?.targetLang || firstWord.learningLang || 'he';

  const [availableWords, setAvailableWords] = useState([]);
  const [usedWords, setUsedWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  // טוען ומערבל את המילים בתחילת המשחק
  useEffect(() => {
    if (!words || words.length === 0) {
      navigate('/games');
      return;
    }
    setAvailableWords(shuffle([...words]));
  }, [words, navigate]);

  // ברגע שהשאלה נגמרה ואין עוד מילים – מנתב למסך סיום
  useEffect(() => {
    if (
      started &&
      availableWords.length === 0 &&
      currentWord &&
      !usedWords.some((w) => w.key === currentWord.key)
    ) {
      const finalEntry = {
        ...currentWord,
        isCorrect: selectedOption?.correct ?? false,
        fromLang,
        learningLang
      };
      const updatedWords = [...usedWords, finalEntry];
      setTimeout(() => {
        navigate('/game-end', {
          state: {
            score,
            words: updatedWords,
            fromGame: '/games/word-treasure'
          }
        });
      }, 800);
    }
  }, [availableWords, currentWord, selectedOption, started, navigate, fromLang, learningLang, score, usedWords]);

  // פונקציית העזר לערבול מערך
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  // מתחיל את המשחק
  const startGame = () => {
    setStarted(true);
    // ✅ קריאה לעדכון פעילות יומית
    try {
      statsManager.updateDailyActivity();
    } catch (err) {
      console.warn('WordTreasureGame: failed updating daily activity', err);
    }
    loadNextWord();
  };

  // טוען את המילה הבאה
  const loadNextWord = () => {
    if (availableWords.length === 0) return;
    const idx = Math.floor(Math.random() * availableWords.length);
    const selected = availableWords[idx];
    if (!selected) return;

    // בניית השאלה והתשובות
    let questionText, correctAnswer, wrong;

    if (selected.displayTo && selected.displayFrom) {
      questionText = selected.displayTo;
      correctAnswer = selected.displayFrom;
      wrong = shuffle(
        words
          .filter((w) => w.key !== selected.key)
          .map((w) => ({
            content: w.displayFrom,
            correct: false
          }))
      ).slice(0, 3);
    } else {
      questionText = selected.displayFrom || selected.word;
      correctAnswer = selected.displayTo;
      wrong = shuffle(
        words.filter((w) => w.key !== selected.key)
      )
        .slice(0, 3)
        .map((w) => ({
          content: w.displayTo,
          correct: false
        }));
    }

    const all = shuffle([{ content: correctAnswer, correct: true }, ...wrong]);

    setCurrentWord(selected);
    setOptions(all);
    setAvailableWords((prev) => prev.filter((_, i) => i !== idx));
    setSelectedOption(null);

    if (!muted) {
      // משמיע את הטקסט בשפת ה־learningLang
      setTimeout(() => speak(questionText, learningLang), 400);
    }
  };

  // helper להשמעת טקסט
  const speak = (text, lang) => {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((v) => v.lang.startsWith(lang)) ||
      voices.find((v) => v.lang.includes('en'));
    if (voice) utter.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  // טיפול בתשובה
  const handleAnswer = (option) => {
    if (selectedOption || !currentWord) return;
    setSelectedOption(option);

    const isCorrect = option.correct;
    const key = currentWord.key;

    // ✅ לוג ניסיון + עדכון יומי
    try {
      statsManager.logWordAttempt(key, isCorrect);
      if (isCorrect) {
        setScore((p) => p + 10);
        statsManager.logWordLearned(key, 'wordTreasure');
      }
      statsManager.logGameResult('wordTreasure', isCorrect);
    } catch (err) {
      console.warn('WordTreasureGame: סטטיסטיקות נכשלו:', err);
    }

    setUsedWords((prev) => [
      ...prev,
      {
        ...currentWord,
        isCorrect,
        fromLang,
        learningLang
      }
    ]);

    setTimeout(() => loadNextWord(), 800);
  };

  const dir = ['he', 'ar'].includes(learningLang) ? 'rtl' : 'ltr';

  return (
    <GamePage
      title={learningLang === 'he' ? 'שעשועון המילים' : 'Word Treasure'}
      backgroundImage="/images/backgrounds/word-treasure.png"
    >
      <div className="flex flex-col items-center gap-6 mt-10 px-4 w-full" dir={dir}>
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute top-4 left-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-700"
          title={muted ? 'הפעל קול' : 'השתק'}
        >
          {muted ? '🔇' : '🔊'}
        </button>

        {!started && (
          <>
            <p className="text-2xl font-bold text-center text-blue-800 dark:text-blue-300">
              {learningLang === 'he' ? 'ברוכים הבאים לשעשועון המילים' : 'Welcome to Word Treasure'}
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 text-center max-w-md">
              {learningLang === 'he'
                ? `הדמות תגיד מילה בשפת המקור (${fromLang}), ואתם תבחרו את התרגום הנכון לשפת הלימוד (${learningLang}).`
                : `You will hear a word in (${fromLang}). Pick the correct translation in (${learningLang}).`}
            </p>
            <button
              onClick={startGame}
              className="mt-6 bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white font-bold py-3 px-10 rounded-full text-xl shadow-lg transition transform hover:scale-105"
            >
              {learningLang === 'he' ? 'התחל משחק' : 'Start Game'}
            </button>
          </>
        )}

        {started && currentWord && (
          <>
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-2">🧙‍♂️</div>
              <p className="text-xl text-gray-800 dark:text-gray-200">
                {learningLang === 'he' ? 'המילה היא:' : 'The word is:'}
              </p>
              <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">
                {currentWord.displayTo /* מציגים את המילה בשפה שלומדים */}
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 italic max-w-md" dir={dir}>
                {currentWord.displaySentence || currentWord.sentence?.[learningLang] || '—'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-lg w-full">
              {options.map((opt, idx) => {
                const isSelected = selectedOption?.content === opt.content;
                const isCorrect = opt.correct;
                const base = 'py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-md w-full ';
                let style = '';
                if (selectedOption) {
                  if (isSelected) {
                    style = isCorrect
                      ? 'bg-green-500 text-white border-2 border-green-700'
                      : 'bg-red-500 text-white animate-shake';
                  } else {
                    style = 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200';
                  }
                } else {
                  style = 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:text-blue-300';
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className={base + style}
                  >
                    {opt.content}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {started && (
          <div className="mt-8 text-lg text-gray-700 dark:text-gray-300">
            {learningLang === 'he' ? 'ניקוד' : 'Score'}:{' '}
            <span className="font-bold text-blue-700 dark:text-blue-300">{score}</span>
          </div>
        )}
      </div>
    </GamePage>
  );
}
