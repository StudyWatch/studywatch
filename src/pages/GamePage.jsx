import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GamePage({ title, backgroundImage, children }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Content box */}
      <div className="relative z-10 w-full max-w-5xl bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/40">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-8 drop-shadow-sm">
          {title}
        </h1>

        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          {children}
        </div>

        <div className="mt-12">
          <button
            onClick={() => navigate('/games')}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg hover:scale-105"
          >
            🔙 חזרה לתפריט המשחקים
          </button>
        </div>
      </div>
    </div>
  );
}
