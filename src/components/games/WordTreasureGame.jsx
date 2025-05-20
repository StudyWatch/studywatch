// src/components/games/WordTreasureGame.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WordsContext } from '../../context/WordsContext';
import GamePage from '../../pages/GamePage';

export default function WordTreasureGame() {
  const { words } = useContext(WordsContext);
  const navigate = useNavigate();

  const [availableWords, setAvailableWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (words.length > 0) {
      setAvailableWords(shuffle([...words]));
    }
  }, [words]);

  useEffect(() => {
    if (availableWords.length === 0 && currentWord) {
      setTimeout(() => {
        navigate('/game-end', { state: { score, fromGame: '/games/word-treasure' } });
      }, 1200);
    }
  }, [availableWords, currentWord, navigate, score]);

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  const spinWheel = () => {
    if (spinning || availableWords.length === 0) return;

    setSpinning(true);
    setSelectedOption(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const selected = availableWords[randomIndex];

      const wrongOptions = shuffle(words.filter((w) => w.word !== selected.word)).slice(0, 2);
      const allOptions = shuffle([
        { content: selected.translate, correct: true },
        ...wrongOptions.map((w) => ({ content: w.translate, correct: false }))
      ]);

      setCurrentWord(selected);
      setOptions(allOptions);
      setAvailableWords((prev) => prev.filter((_, i) => i !== randomIndex));
      setSpinning(false);
    }, 1200);
  };

  const handleAnswer = (option) => {
    if (selectedOption || spinning) return;
    setSelectedOption(option);

    if (option.correct) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      spinWheel();
    }, 1200);
  };

  return (
    <GamePage title="🎡 גלגל האוצר - Word Treasure" backgroundImage="/images/backgrounds/word-treasure.jpg">
      <div className="flex flex-col items-center gap-8 mt-8">
        <div className={`w-32 h-32 bg-gradient-to-tr from-yellow-300 to-pink-400 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-2xl ${spinning ? 'animate-spin-slow' : ''}`}>
          🎡
        </div>

        {!currentWord && availableWords.length > 0 && (
          <button
            onClick={spinWheel}
            className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-10 rounded-full text-xl transition-all shadow-md"
          >
            🎯 התחל לשחק
          </button>
        )}

        {currentWord && !spinning && (
          <>
            <h2 className="text-2xl font-bold text-blue-800">{currentWord.word}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`py-3 px-6 rounded-full font-bold text-lg transition-all shadow-md ${
                    selectedOption
                      ? option.correct
                        ? 'bg-green-400 text-white'
                        : option.content === selectedOption?.content
                        ? 'bg-red-400 text-white'
                        : 'bg-gray-300 text-gray-700'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                >
                  {option.content}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-10 text-lg text-gray-700">
          ניקוד: <span className="font-bold text-blue-700">{score}</span>
        </div>
      </div>
    </GamePage>
  );
}
