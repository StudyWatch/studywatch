// src/components/games/MemoryGame.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WordsContext } from '../../context/WordsContext';
import GamePage from '../../pages/GamePage';

export default function MemoryGame() {
  const { words } = useContext(WordsContext);
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (words.length > 0) {
      const engCards = words.map((w, index) => ({
        id: `eng-${index}`,
        content: w.word,
        pairId: index,
        type: 'word'
      }));

      const hebCards = words.map((w, index) => ({
        id: `heb-${index}`,
        content: w.translate,
        pairId: index,
        type: 'translate'
      }));

      setCards(shuffle([...engCards, ...hebCards]));
    }
  }, [words]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setTimeout(() => {
        navigate('/game-end', { state: { score, fromGame: '/games/memory' } });
      }, 800);
    }
  }, [matchedCards, cards]);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleCardClick = (card) => {
    if (
      selectedCards.length === 2 ||
      selectedCards.find((c) => c.id === card.id) ||
      matchedCards.includes(card.id)
    ) {
      return;
    }
    setSelectedCards([...selectedCards, card]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (first.pairId === second.pairId && first.type !== second.type) {
        setMatchedCards((prev) => [...prev, first.id, second.id]);
        setScore((prev) => prev + 10);
        setSelectedCards([]);
      } else {
        setTimeout(() => setSelectedCards([]), 600);
      }
    }
  }, [selectedCards]);

  return (
    <GamePage title="🧠 משחק זיכרון - Memory Game" backgroundImage="/images/backgrounds/memory-game.jpg">
      <div className="flex flex-col items-center gap-6 mt-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-6xl">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`relative w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                selectedCards.includes(card) || matchedCards.includes(card)
                  ? 'bg-blue-100'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {(selectedCards.includes(card) || matchedCards.includes(card)) && (
                <span className="text-sm sm:text-base font-bold text-blue-800">{card.content}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-lg text-gray-700">
          ניקוד: <span className="font-bold text-blue-700">{score}</span>
        </div>
      </div>
    </GamePage>
  );
}
