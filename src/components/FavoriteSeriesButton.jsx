import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Star } from 'lucide-react';

export default function FavoriteSeriesButton({ seriesId, onAction, cardRef }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.includes(seriesId);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // למנוע ניווט מהכפתור

    if (!isFavorite) {
      if (cardRef?.current) triggerFlyAnimation(cardRef.current); // 🛫
      addFavorite(seriesId);
      if (onAction) onAction('added');
    } else {
      removeFavorite(seriesId);
      if (onAction) onAction('removed');
    }
  };

  const triggerFlyAnimation = (startEl) => {
    const startRect = startEl.getBoundingClientRect();
    const endEl = document.querySelector('#favorites-button');
    if (!endEl) return;
    const endRect = endEl.getBoundingClientRect();

    const clone = startEl.cloneNode(true);
    clone.className = 'fly-clone';
    document.body.appendChild(clone);

    Object.assign(clone.style, {
      position: 'fixed',
      left: `${startRect.left}px`,
      top: `${startRect.top}px`,
      width: `${startRect.width}px`,
      height: `${startRect.height}px`,
      transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
      transform: 'scale(1)',
      opacity: '1',
      zIndex: '1000',
    });

    requestAnimationFrame(() => {
      const dx = endRect.left - startRect.left;
      const dy = endRect.top - startRect.top;
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
      clone.style.opacity = '0';
    });

    setTimeout(() => {
      clone.remove();
    }, 850);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="text-yellow-400 hover:text-yellow-500 transition-all"
      title={isFavorite ? 'הסר מהמועדפים' : 'הוסף למועדפים'}
    >
      <Star
        size={24}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
      />
    </button>
  );
}
