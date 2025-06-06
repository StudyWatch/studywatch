// src/context/FavoritesContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import statsManager from '../utils/statsManager';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);       // סדרות מועדפות
  const [wordFavorites, setWordFavorites] = useState([]); // מילים מועדפות
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // טעינה מ־localStorage
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const storedWordFavorites = JSON.parse(localStorage.getItem('wordFavorites')) || [];
      setFavorites(storedFavorites);
      setWordFavorites(storedWordFavorites);
    } catch (err) {
      console.error('Failed to parse favorites from storage:', err);
    }
  }, []);

  // שמירה ל־localStorage
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

  /**
   * שמירת מילה למועדפים:
   * 1) מוסיף ל־wordFavorites את האובייקט wordObj המלא (כולל key אחיד).
   * 2) קורא ל־statsManager.addFavoriteWord עם ה־key הנכון כדי לרשום ניסיון ראשוני (attempts=1, correct=0).
   */
  const addWordFavorite = (wordObj) => {
    // נוודא שיש לנו key אחיד:
    const generatedKey = `${wordObj.seriesId}_${wordObj.season}_${wordObj.episode}_${wordObj.difficulty}_${wordObj.word}`;
    const finalKey = wordObj.key || generatedKey;

    // אם כבר קיים מישהו עם אותו key, לא נוסיף שנית
    if (wordFavorites.some(fav => fav.key === finalKey)) return;

    // נבנה אובייקט מלא עם כל השדות (force של finalKey, fromLang, learningLang)
    const fromLang = wordObj.fromLang || localStorage.getItem('fromLang') || 'en';
    const learningLang = wordObj.learningLang || localStorage.getItem('learningLang') || 'he';

    const fullWord = {
      ...wordObj,
      key: finalKey,
      fromLang,
      learningLang
    };

    setWordFavorites(prev => [...prev, fullWord]);

    // לוג סטטיסטי כדי למנוע NaN (נרשום ניסיון “כושל” עם attempts=1, correct=0)
    statsManager.addFavoriteWord(finalKey);

    triggerToast("המילה נשמרה!");
  };

  const removeWordFavorite = (key) => {
    setWordFavorites(prev => prev.filter(fav => fav.key !== key));
    triggerToast("המילה הוסרה");
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      wordFavorites,
      addWordFavorite,
      removeWordFavorite,
      toastMessage,
      showToast
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}
