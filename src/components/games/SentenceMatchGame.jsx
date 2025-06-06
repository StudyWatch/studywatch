// src/components/games/MemoryGame.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GamePage from '../../pages/GamePage';
import statsManager from '../../utils/statsManager';

export default function MemoryGame() {
  const navigate = useNavigate();
  const location = useLocation();

  const words = location.state?.words || [];
  const sourceLang = location.state?.sourceLang || 'en';
  const targetLang = location.state?.targetLang || 'he';

  const [fromCards, setFromCards] = useState([]);
  const [toCards, setToCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [usedResults, setUsedResults] = useState([]);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (!words || words.length === 0) {
      console.warn('⚠️ No words provided to MemoryGame. Redirecting...');
      navigate('/games');
      return;
    }

    // ניקח עד 15 מילים, כדי שלא יהיה עומס על המסך
    const limited = words.slice(0, 15);

    // כל קלף בשפה שלומדים (displayTo), וכל קלף שמאל בשפה המקורית (displayFrom)
    const from = limited.map((w, i) => {
      const content = w.displayTo || w.word;
      return {
        id: `from-${i}`,
        content,
        pairId: i,
        side: 'from', // מייצג את ה־"שפה שלומדים"
        wordObj: w,
      };
    });

    const to = limited.map((w, i) => {
      const content = w.displayFrom || w.word;
      return {
        id: `to-${i}`,
        content,
        pairId: i,
        side: 'to', // מייצג את ה־"שפה מקורית"
        wordObj: w,
      };
    });

    setFromCards(shuffle(from));
    setToCards(shuffle(to));

    statsManager.updateDailyActivity(); // עדכון יומי
  }, [words, navigate, sourceLang, targetLang]);

  const handleCardClick = (card) => {
    if (
      selectedCards.length === 2 ||
      selectedCards.some((c) => c.id === card.id) ||
      matchedCards.includes(card.id)
    ) return;

    setSelectedCards((prev) => [...prev, card]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [a, b] = selectedCards;

      const keyA = `${a.wordObj.word}_${sourceLang}_${targetLang}`;
      const keyB = `${b.wordObj.word}_${sourceLang}_${targetLang}`;

      if (a.pairId === b.pairId && a.side !== b.side) {
        // נכון
        statsManager.logWordAttempt(keyA, true);
        statsManager.logWordAttempt(keyB, true);
        statsManager.logWordLearned(keyA, 'memory');
        statsManager.logGameResult('memory', true);

        setMatchedCards((prev) => [...prev, a.id, b.id]);
        setScore((prev) => prev + 10);
        setUsedResults((prev) => [
          ...prev,
          {
            ...a.wordObj,
            isCorrect: true,
          },
        ]);
        setSelectedCards([]);
      } else {
        // שגוי
        statsManager.logWordAttempt(keyA, false);
        statsManager.logWordAttempt(keyB, false);
        statsManager.logGameResult('memory', false);

        setTimeout(() => setSelectedCards([]), 600);
      }
    }
  }, [selectedCards, sourceLang, targetLang]);

  // אם נגמרו כל הקלפים – מסיימים
  useEffect(() => {
    const total = fromCards.length + toCards.length;
    if (matchedCards.length === total && total > 0) {
      // תום המשחק
      setTimeout(() => {
        navigate('/game-end', {
          state: {
            score,
            words: usedResults,
            fromGame: '/games/memory',
          },
        });
      }, 800);
    }
  }, [matchedCards, fromCards, toCards, usedResults, navigate, score]);

  return (
    <GamePage title="🧠 משחק זיכרון" backgroundImage="/images/backgrounds/memory-game.jpg">
      <div className="flex flex-col items-center mt-8 w-full px-4 max-w-screen-lg mx-auto">
        <div className="grid grid-cols-2 max-w-md w-full mb-4 text-center text-gray-700 dark:text-gray-300 font-bold text-lg">
          <div>{targetLang.toUpperCase()}</div>
          <div>{sourceLang.toUpperCase()}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full mb-4">
          {/* צד לימוד (להצגה על שני עמודות במסך רחב, על עמודה אחת במסך צר) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {fromCards.map((card) => renderCard(card))}
          </div>
          {/* צד מקור */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {toCards.map((card) => renderCard(card))}
          </div>
        </div>

        <div className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          ניקוד: <span className="font-bold text-blue-700 dark:text-blue-300">{score}</span>
        </div>
      </div>
    </GamePage>
  );

  function renderCard(card) {
    const isSelected = selectedCards.some((c) => c.id === card.id);
    const isMatched = matchedCards.includes(card.id);

    const baseClasses =
      'w-full h-20 sm:h-24 flex items-center justify-center text-center text-sm sm:text-base font-bold rounded-lg cursor-pointer shadow-sm transition-all duration-300 select-none ';
    let style = '';
    if (isMatched) {
      style = 'bg-green-200 border-2 border-green-500 text-green-800 dark:bg-green-700';
    } else if (isSelected) {
      style = 'bg-blue-100 border border-blue-400 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    } else {
      style = 'bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200';
    }

    return (
      <div
        key={card.id}
        onClick={() => handleCardClick(card)}
        className={baseClasses + style}
      >
        {(isSelected || isMatched) ? String(card.content) : ''}
      </div>
    );
  }
}
