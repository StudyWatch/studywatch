// src/components/EpisodeItem.jsx
import React from 'react';
import FavoriteButton from './FavoriteButton';

export default function EpisodeItem({ season, episodeNumber, details, onToggleFavorite, isFavorite }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-center">{episodeNumber}</td>
      <td className="border px-4 py-2">{details.easy.length}</td>
      <td className="border px-4 py-2">{details.medium.length}</td>
      <td className="border px-4 py-2">{details.hard.length}</td>
      <td className="border px-4 py-2 text-center">
        <a href={details.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          צפה
        </a>
      </td>
      <td className="border px-4 py-2 text-center">
        <button
          onClick={onToggleFavorite}
          className={`px-2 py-1 rounded ${
            isFavorite ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </td>
    </tr>
  );
}
