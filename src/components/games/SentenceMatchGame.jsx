// src/components/games/SentenceMatchGame.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GamePage from '../../pages/GamePage';
import statsManager from '../../utils/statsManager';

export default function SentenceMatchGame() {
  const navigate = useNavigate();
  const location = useLocation();

  const words = location.state?.words || [];
  const learningLang = location.state?.targetLang || 'he';
  const fromLang = location.state?.sourceLang || 'en';

  const [availableWords, setAvailableWords] = useState([]);
  const [usedWords, setUsedWords] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) {
      navigate('/games');
      return;
    }
    setAvailableWords(shuffle([...words]));
    setUsedWords([]);
    statsManager.updateDailyActivity(); // עדכון יומי
  }, [words, navigate]);

  useEffect(() => {
    // כשנגמרו המילים לטעינה, מסיימים ושומרים סטטיסטיקות
    if (
      availableWords.length === 0 &&
      currentQuestion !== null &&
      usedWords.length > 0
    ) {
      // כל מילה ב־usedWords כבר קיבלה isCorrect ו־נרשם בה logWordAttempt ו־logWordLearned אם צריך
      // כאן רק נסיים את המשחק
      statsManager.logGameResult('SentenceMatch', true);

      setTimeout(() => {
        navigate('/game-end', {
          state: {
            score,
            words: usedWords,
            fromGame: '/games/sentence-match'
          }
        });
      }, 1200);
    }
  }, [
    availableWords,
    currentQuestion,
    usedWords,
    fromLang,
    learningLang,
    score,
    navigate
  ]);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const createSentenceWithBlank = (sentence, word) => {
    if (!sentence || typeof sentence !== 'string') return '—';
    const pattern = new RegExp(`\\b${word}\\b`, 'i');
    return pattern.test(sentence)
      ? sentence.replace(pattern, '______')
      : `______ ${sentence}`;
  };

  const loadNewQuestion = () => {
    if (availableWords.length === 0) return;

    const idx = Math.floor(Math.random() * availableWords.length);
    const selected = availableWords[idx];
    const correctWord = selected.displayTo || selected.word;
    const rawSentence =
      selected.sentence?.[learningLang] ||
      selected.displaySentence ||
      '';
    const sentenceForDisplay = createSentenceWithBlank(rawSentence, correctWord);

    // בונים את רשימת התשובות (displayFrom = התרגום)
    const wrong = shuffle(
      words.filter((w) => w.word !== selected.word)
    )
      .slice(0, 3)
      .map((w) => ({
        word: w.displayFrom || w.word,
        correct: false
      }));

    const all = shuffle([{ word: selected.displayFrom || selected.word, correct: true }, ...wrong]);

    setCurrentQuestion({
      ...selected,
      correctAnswer: selected.displayFrom || selected.word,
      displaySentence: sentenceForDisplay
    });
    setOptions(all);
    setAvailableWords((prev) => prev.filter((_, i) => i !== idx));
    setSelectedOption(null);
  };

  const handleAnswer = (option) => {
    if (selectedOption || !currentQuestion) return;
    setSelectedOption(option);

    const isCorrect = option.correct;
    const keyStat = `${currentQuestion.word}_${fromLang}_${learningLang}`;
    statsManager.logWordAttempt(keyStat, isCorrect);
    if (isCorrect) {
      setScore((p) => p + 10);
      statsManager.logWordLearned(keyStat, 'SentenceMatch');
    }
    // בכל מקרה – לוג תוצאת משחק
    statsManager.logGameResult('SentenceMatch', isCorrect);

    setUsedWords((prev) => [
      ...prev,
      {
        ...currentQuestion,
        isCorrect,
        fromLang,
        learningLang,
        season: currentQuestion.season,
        episode: currentQuestion.episode,
        difficulty: currentQuestion.difficulty
      }
    ]);

    setTimeout(() => loadNewQuestion(), 800);
  };

  useEffect(() => {
    if (availableWords.length > 0 && currentQuestion === null) {
      loadNewQuestion();
    }
  }, [availableWords, currentQuestion]);

  const dir = ['he', 'ar'].includes(learningLang) ? 'rtl' : 'ltr';

  return (
    <GamePage
      title="📝 התאמת מילים למשפטים"
      backgroundImage="/images/backgrounds/sentence-match.png"
    >
      <div className="flex flex-col items-center gap-6 mt-8 w-full px-4 max-w-screen-md mx-auto" dir={dir}>
        {currentQuestion && (
          <>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
              {learningLang === 'he'
                ? 'מהי המילה החסרה במשפט הבא?'
                : 'Which word is missing in the sentence?'}
            </p>

            <div className="bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-xl shadow-lg px-6 py-4 max-w-xl w-full text-center text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-200">
              {currentQuestion.displaySentence || '—'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-md">
              {options.map((option, idx) => {
                const isSelected = selectedOption?.word === option.word;
                const isCorrect = option.correct;
                const base =
                  'py-3 px-6 rounded-xl font-bold text-lg w-full transition-all shadow-md ';
                let style = '';
                if (selectedOption) {
                  if (isSelected) {
                    style = isCorrect
                      ? 'bg-green-500 text-white'
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
                    onClick={() => handleAnswer(option)}
                    className={base + style}
                  >
                    {option.word}
                  </button>
                );
              })}
            </div>
          </>
        )}
        <div className="mt-8 text-lg text-gray-700 dark:text-gray-300">
          {learningLang === 'he' ? 'ניקוד' : 'Score'}:{' '}
          <span className="font-bold text-blue-700 dark:text-blue-300">{score}</span>
        </div>
      </div>
    </GamePage>
  );
}
