import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Star } from 'lucide-react';
import { incrementStat } from '../utils/userStats';

export default function FavoriteButton({ seriesId, wordObj = null, onAction, size = 24 }) {
  const {
    favorites,
    wordFavorites,
    addFavorite,
    removeFavorite,
    addWordFavorite,
    removeWordFavorite
  } = useContext(FavoritesContext);

  const isSeries = !wordObj;

  const key = isSeries
    ? seriesId
    : `${seriesId}_${wordObj.season}_${wordObj.episode}_${wordObj.difficulty}_${wordObj.word}`;

  const isFavorite = isSeries
    ? favorites.includes(seriesId)
    : wordFavorites.some((fav) => fav.key === key);

  const triggerFlyAnimation = (e) => {
    const sourceCard = e.currentTarget.closest('.word-card, .card, .rounded-3xl');
    const target = document.querySelector('#favorites-button');
    if (!sourceCard || !target) return;

    const sourceRect = sourceCard.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const clone = sourceCard.cloneNode(true);
    clone.classList.add('fly-clone');
    clone.style.position = 'fixed';
    clone.style.left = `${sourceRect.left}px`;
    clone.style.top = `${sourceRect.top}px`;
    clone.style.width = `${sourceRect.width}px`;
    clone.style.height = `${sourceRect.height}px`;
    clone.style.zIndex = 9999;
    clone.style.pointerEvents = 'none';
    clone.style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';

    document.body.appendChild(clone);

    // הבדל מיקום
    const dx = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
    const dy = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
      clone.style.opacity = '0';
    });

    setTimeout(() => {
      clone.remove();
    }, 850);
  };

  const toggleFavorite = (e) => {
    if (!isFavorite) triggerFlyAnimation(e);

    if (isFavorite) {
      isSeries ? removeFavorite(seriesId) : removeWordFavorite(key);
      if (onAction) onAction('removed');
    } else {
      if (isSeries) {
        addFavorite(seriesId);
      } else {
        const fromLang = wordObj.fromLang || localStorage.getItem('fromLang') || 'en';
        const learningLang = wordObj.learningLang || localStorage.getItem('learningLang') || 'he';

        addWordFavorite(key, {
          key,
          word: wordObj.word,
          fromLang,
          learningLang,
          translations: wordObj.translations || {},
          sentence: wordObj.sentence || {},
          season: wordObj.season,
          episode: wordObj.episode,
          difficulty: wordObj.difficulty
        });

        incrementStat('favoritesToday');
        incrementStat('learnedWords');
      }
      if (onAction) onAction('added');
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="text-yellow-400 hover:text-yellow-500 transition-all"
      title={isFavorite ? 'הסר מהמועדפים' : 'הוסף למועדפים'}
    >
      <Star
        size={size}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
      />
    </button>
  );
}
