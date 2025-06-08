// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import statsManager from '../utils/statsManager';
import sentencesByWord from '../../public/data/sentencesByWord';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [wordFavorites, setWordFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const storedWordFavorites = JSON.parse(localStorage.getItem('wordFavorites')) || [];
      setFavorites(storedFavorites);
      setWordFavorites(storedWordFavorites);
    } catch (err) {
      console.error('❌ Failed to parse favorites from storage:', err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('wordFavorites', JSON.stringify(wordFavorites));
  }, [wordFavorites]);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const addFavorite = (seriesId) => {
    if (!favorites.includes(seriesId)) {
      setFavorites((prev) => [...prev, seriesId]);
      triggerToast('נוסף למועדפים!');
    }
  };

  const removeFavorite = (seriesId) => {
    setFavorites((prev) => prev.filter((id) => id !== seriesId));
    triggerToast('הוסר מהמועדפים');
  };

  const generateKey = (wordObj) => {
    return wordObj.key ||
      `${wordObj.seriesId || 'cat'}_${wordObj.season || 0}_${wordObj.episode || 0}_${wordObj.difficulty || 'none'}_${wordObj.word || wordObj.displayTo || ''}`;
  };

  const addWordFavorite = (wordObj) => {
    const fromLang = wordObj.fromLang || localStorage.getItem('fromLang') || 'en';
    const learningLang = wordObj.learningLang || localStorage.getItem('learningLang') || 'he';
    const difficulty = wordObj.difficulty || 'easy';
    const word = wordObj.word || wordObj.displayTo;
    const key = generateKey(wordObj);

    if (wordFavorites.some((fav) => fav.key === key)) return;

    const sentObj = (sentencesByWord[difficulty] || {})[word] || {};
    const sentenceByLang = sentObj.sentence || {};
    const tgtSentence = sentenceByLang[learningLang] || '';

    const fullWord = {
      key,
      word,
      translate: wordObj.translate || '',
      difficulty,
      seriesId: wordObj.seriesId || 'cat',
      season: wordObj.season || 0,
      episode: wordObj.episode || 0,
      fromLang,
      learningLang,
      displayFrom: wordObj.displayFrom || '',
      displayTo: wordObj.displayTo || '',
      tgtSentence
    };

    setWordFavorites((prev) => [...prev, fullWord]);
    statsManager.addFavoriteWord(key);
    triggerToast('המילה נשמרה!');
  };

  const removeWordFavorite = (key) => {
    setWordFavorites((prev) => prev.filter((fav) => fav.key !== key));
    triggerToast('המילה הוסרה');
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

export function useFavorites() {
  return useContext(FavoritesContext);
}
