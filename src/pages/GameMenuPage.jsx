// src/pages/GameMenuPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GameCard from '../components/games/GameCard';

export default function GameMenuPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const words = location.state?.words || [];

  // רשימת משחקים
  const games = [
    {
      title: 'Word Treasure',
      description: 'גלגל המזל - למד מילים בצורה כיפית!',
      image: '/images/backgrounds/word-treasure.jpg',
      route: '/games/word-treasure'
    },
    {
      title: 'Memory Game',
      description: 'זכרו מילים ותרגומים - אתגר את הזיכרון!',
      image: '/images/backgrounds/memory-game.jpg',
      route: '/games/memory'
    },
    {
      title: 'Sentence Match',
      description: 'התאם מילים למשפטים נכונים!',
      image: '/images/backgrounds/sentence-match.jpg',
      route: '/games/sentence-match'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10" dir="rtl">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">🎮 בחר משחק</h1>

      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
            image={game.image}
            onClick={() => navigate(game.route, { state: { words } })}
          />
        ))}
      </div>
    </div>
  );
}
