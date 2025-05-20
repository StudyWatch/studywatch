// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // שמירת סדרות מועדפות
  const [wordFavorites, setWordFavorites] = useState([]); // שמירת מילים מועדפות
  const [toastMessage, setToastMessage] = useState(""); // הודעת פופאפ
  const [showToast, setShowToast] = useState(false); // האם להציג פופאפ

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const storedWordFavorites = JSON.parse(localStorage.getItem('wordFavorites')) || [];
    setFavorites(storedFavorites);
    setWordFavorites(storedWordFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('wordFavorites', JSON.stringify(wordFavorites));
  }, [wordFavorites]);

  const addFavorite = (seriesId) => {
    if (!favorites.includes(seriesId)) {
      setFavorites(prev => [...prev, seriesId]);
      triggerToast("נוסף למועדפים!");
    }
  };

  const removeFavorite = (seriesId) => {
    setFavorites(prev => prev.filter(id => id !== seriesId));
    triggerToast("הוסר מהמועדפים");
  };

  const addWordFavorite = (key, wordObj) => {
    if (!wordFavorites.some(fav => fav.key === key)) {
      setWordFavorites(prev => [...prev, { key, ...wordObj }]);
      triggerToast("המילה נשמרה!");
    }
  };

  const removeWordFavorite = (key) => {
    setWordFavorites(prev => prev.filter(fav => fav.key !== key));
    triggerToast("המילה הוסרה");
  };

  // פופאפ קטן בצד
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // נעלם אחרי 2 שניות
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        wordFavorites,
        addWordFavorite,
        removeWordFavorite,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
