// src/pages/GamePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GamePage({ title, backgroundImage, children }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* שכבת רקע כהה קלה */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      {/* תוכן */}
      <div className="relative z-10 w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
        
        {/* כותרת המשחק */}
        <h1 className="text-4xl font-bold text-blue-800 mb-6">{title}</h1>

        {/* המשחק עצמו */}
        <div className="flex flex-col items-center">
          {children}
        </div>

        {/* כפתור חזור */}
        <div className="mt-10">
          <button
            onClick={() => navigate('/games')}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg"
          >
            🔙 חזרה לתפריט המשחקים
          </button>
        </div>
      </div>
    </div>
  );
}
