// src/components/FavoriteButton.jsx
import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Star } from 'lucide-react'; // כוכב מודרני

export default function FavoriteButton({ seriesId, onAction }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.includes(seriesId);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(seriesId);
      if (onAction) onAction('removed');
    } else {
      addFavorite(seriesId);
      if (onAction) onAction('added');
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="text-yellow-400 hover:text-yellow-500 transition-all"
    >
      <Star
        size={28}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
      />
    </button>
  );
}
