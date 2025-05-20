// src/components/games/GameCard.jsx
import React from 'react';

export default function GameCard({ title, description, image, onClick }) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
