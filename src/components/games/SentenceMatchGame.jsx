// src/components/games/SentenceMatchGame.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WordsContext } from '../../context/WordsContext';
import GamePage from '../../pages/GamePage';

export default function SentenceMatchGame() {
  const { words } = useContext(WordsContext);
  const navigate = useNavigate();

  const [availableWords, setAvailableWords] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (words.length > 0) {
      setAvailableWords(shuffle([...words]));
    }
  }, [words]);

  useEffect(() => {
    if (availableWords.length === 0 && currentQuestion) {
      setTimeout(() => {
        navigate('/game-end', { state: { score, fromGame: '/games/sentence-match' } });
      }, 1200);
    }
  }, [availableWords, currentQuestion, navigate, score]);

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  const loadNewQuestion = () => {
    if (availableWords.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selected = availableWords[randomIndex];

    const wrongOptions = shuffle(words.filter((w) => w.word !== selected.word)).slice(0, 2);
    const allOptions = shuffle([
      { word: selected.word, correct: true },
      ...wrongOptions.map((w) => ({ word: w.word, correct: false }))
    ]);

    setCurrentQuestion(selected);
    setOptions(allOptions);
    setAvailableWords((prev) => prev.filter((_, i) => i !== randomIndex));
    setSelectedOption(null);
  };

  const handleAnswer = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);

    if (option.correct) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      loadNewQuestion();
    }, 1000);
  };

  useEffect(() => {
    if (availableWords.length > 0 && !currentQuestion) {
      loadNewQuestion();
    }
  }, [availableWords, currentQuestion]);

  return (
    <GamePage title="📝 התאמת מילים למשפטים - Sentence Match" backgroundImage="/images/backgrounds/sentence-match.jpg">
      <div className="flex flex-col items-center gap-8 mt-8">
        {currentQuestion && (
          <>
            <p className="text-xl font-semibold text-gray-700 mb-4">מהי המילה שחסרה במשפט הבא?</p>
            <div className="text-center bg-white rounded-xl shadow-lg p-6 max-w-xl text-lg font-bold text-blue-700">
              {currentQuestion.sentence.replace(currentQuestion.word, '______')}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`py-3 px-6 rounded-full font-bold text-lg transition-all shadow-md ${
                    selectedOption
                      ? option.correct
                        ? 'bg-green-400 text-white'
                        : option.word === selectedOption?.word
                        ? 'bg-red-400 text-white'
                        : 'bg-gray-300 text-gray-700'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                >
                  {option.word}
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
