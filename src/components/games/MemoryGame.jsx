// ✅ MemoryGame.jsx – גרסה מושלמת עם עיצוב 5 טורים מימין לשפת יעד ו-5 משמאל לשפת מקור
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MemoryCard from '../../components/games/MemoryCard';
import statsManager from '../../utils/statsManager';

export default function MemoryGame() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const words = state?.words || [];
  const sourceLang = state?.sourceLang || 'en';
  const targetLang = state?.targetLang || 'he';

  const [fromCards, setFromCards] = useState([]);
  const [toCards, setToCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!words.length) {
      navigate('/games');
      return;
    }
    const limited = words.slice(0, 15);

    const from = limited.map((w, i) => ({
      id: `from-${i}`,
      pair: i,
      side: 'from',
      text: w.displayFrom || w.word,
      wordKey: w.word,
      wordObj: w
    }));

    const to = limited.map((w, i) => ({
      id: `to-${i}`,
      pair: i,
      side: 'to',
      text: w.displayTo || w.translate?.[targetLang] || w.word,
      wordKey: w.word,
      wordObj: w
    }));

    setFromCards(shuffle(from));
    setToCards(shuffle(to));
    statsManager.updateDailyActivity();
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [words, targetLang, navigate]);

  useEffect(() => {
    if (selected.length !== 2) return;
    const [a, b] = selected;
    setMoves(m => m + 1);
    const wordKey = a.wordKey;

    if (a.pair === b.pair && a.side !== b.side) {
      statsManager.logWordAttempt(wordKey, true);
      statsManager.logWordLearned(wordKey, 'memory');
      statsManager.logGameResult('memory', true);
      setMatched(m => [...m, a.id, b.id]);
      setScore(s => s + 10);
      resetSelection(500);
    } else {
      statsManager.logWordAttempt(wordKey, false);
      statsManager.logGameResult('memory', false);
      statsManager.logMissedWord(wordKey, 'memory');
      resetSelection(1000);
    }
  }, [selected]);

  useEffect(() => {
    if ((fromCards.length + toCards.length) > 0 && matched.length === fromCards.length + toCards.length) {
      clearInterval(timerRef.current);
      setTimeout(() => {
        navigate('/game-end', {
          state: {
            score,
            moves,
            time,
            fromGame: '/games/memory',
            words,
            sourceLang,
            targetLang,
          },
        });
      }, 800);
    }
  }, [matched, fromCards, toCards, navigate, score, moves, time, words, sourceLang, targetLang]);

  const resetSelection = (delay) => setTimeout(() => setSelected([]), delay);

  const handleClick = (card) => {
    if (
      selected.length === 2 ||
      selected.some((c) => c.id === card.id) ||
      matched.includes(card.id)
    ) return;
    setSelected((s) => [...s, card]);
  };

  return (
    <div className="min-h-screen w-full px-4 py-30 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 dark:text-white text-center mb-8">
        🧠 משחק זיכרון
      </h1>

      <div className="flex justify-center gap-10 text-sm md:text-lg font-medium mb-6">
        <div>⏱️ זמן: <span className="font-bold">{formatTime(time)}</span></div>
        <div>מהלכים: <span className="font-bold">{moves}</span></div>
        <div>נקודות: <span className="font-bold text-green-600">{score}</span></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-10 gap-4">
        {/* טור ימין – שפה נלמדת */}
        <div className="col-span-5">
          <div className="text-center font-bold text-indigo-700 dark:text-indigo-300 mb-3">
            שפה נלמדת ({targetLang.toUpperCase()})
          </div>
<div className="grid grid-cols-5 gap-12 translate-x-6">
            {toCards.map((card) => (
              <MemoryCard
                key={card.id}
                content={card.text}
                isFlipped={selected.some(c => c.id === card.id) || matched.includes(card.id)}
                isMatched={matched.includes(card.id)}
                disabled={selected.length === 2}
                onClick={() => handleClick(card)}
              />
            ))}
          </div>
        </div>

        {/* טור שמאל – שפת מקור */}
        <div className="col-span-5">
          <div className="text-center font-bold text-indigo-700 dark:text-indigo-300 mb-3">
            שפת מקור ({sourceLang.toUpperCase()})
          </div>
<div className="grid grid-cols-5 gap-12 -translate-x-6">
            {fromCards.map((card) => (
              <MemoryCard
                key={card.id}
                content={card.text}
                isFlipped={selected.some(c => c.id === card.id) || matched.includes(card.id)}
                isMatched={matched.includes(card.id)}
                disabled={selected.length === 2}
                onClick={() => handleClick(card)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <button
          className="py-3 px-10 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition text-lg"
          onClick={() => window.location.reload()}
        >
          🔁 התחל מחדש
        </button>
      </div>
    </div>
  );
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}