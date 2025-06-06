// src/context/SavedDataContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import saveWordToCloud from '../utils/saveWordToCloud';
import saveSeriesToCloud from '../utils/saveSeriesToCloud';
import getWordsFromCloud from '../utils/getWordsFromCloud';
import getSeriesFromCloud from '../utils/getSeriesFromCloud';
import removeWordFromCloud from '../utils/removeWordFromCloud';
import removeSeriesFromCloud from '../utils/removeSeriesFromCloud';
import statsManager from '../utils/statsManager'; // <--- ייבוא statsManager
import LimitModal from '../components/LimitModal';

const SavedDataContext = createContext();

export function SavedDataProvider({ children }) {
  const { user } = useAuth();

  // ---------- State פנימי ----------
  const [savedWords, setSavedWords] = useState([]);     // מערך של אובייקטי מילים
  const [savedSeries, setSavedSeries] = useState([]);   // מערך של מזהי סדרות
  const [isWordLimitOpen, setIsWordLimitOpen] = useState(false);
  const [isSeriesLimitOpen, setIsSeriesLimitOpen] = useState(false);

  // ---------- מגבלות למשתמש אנונימי ----------
  const WORD_LIMIT_ANON = 6;
  const SERIES_LIMIT_ANON = 2;

  // --------------------------------------------
  // 1. אתחול ראשוני (משתמש אנונימי): טען מה־localStorage
  // --------------------------------------------
  useEffect(() => {
    if (!user) {
      const localWords = JSON.parse(localStorage.getItem('savedWords') || '[]');
      const localSeries = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      setSavedWords(localWords);
      setSavedSeries(localSeries);
    }
  }, [user]);

  // --------------------------------------------
  // 2. ברגע שהמשתמש מתחבר (user הופך מאנונימי ל־auth), סנכרן מה־localStorage ל־cloud
  // --------------------------------------------
  useEffect(() => {
    if (user) {
      const localWords = JSON.parse(localStorage.getItem('savedWords') || '[]');
      const localSeries = JSON.parse(localStorage.getItem('savedSeries') || '[]');

      // שלח כל המילים מה־localStorage לענן
      localWords.forEach((wordObj) => {
        saveWordToCloud(wordObj, user.id).catch((err) =>
          console.error('Error syncing word to cloud:', err)
        );
      });

      // שלח כל הסדרות מה־localStorage לענן
      localSeries.forEach((seriesId) => {
        saveSeriesToCloud(seriesId, user.id).catch((err) =>
          console.error('Error syncing series to cloud:', err)
        );
      });

      // נקה את ה־localStorage
      localStorage.removeItem('savedWords');
      localStorage.removeItem('savedSeries');

      // לאחר הסנכרון, טען שוב מהענן כדי לוודא ש־state מעודכן
      fetchSavedFromCloud();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // --------------------------------------------
  // 3. פונקציה לטעינת Word + Series מהענן (Supabase/SQL)
  // --------------------------------------------
  const fetchSavedFromCloud = async () => {
    if (!user) return;
    try {
      const words = await getWordsFromCloud(user.id);
      const series = await getSeriesFromCloud(user.id);
      setSavedWords(words);
      setSavedSeries(series);
    } catch (err) {
      console.error('Error fetching saved data from cloud:', err);
    }
  };

  // בכל פעם ש־`user` משתנה ל־אובייקט מחובר, טען מהענן
  useEffect(() => {
    if (user) {
      fetchSavedFromCloud();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // --------------------------------------------
  // 4. שמירת מילה (saveWord)
  // --------------------------------------------
  const saveWord = (wordObj) => {
    if (!user) {
      // ---- משתמש לא מחובר: שמירה ב־localStorage ----
      const current = JSON.parse(localStorage.getItem('savedWords') || '[]');
      if (current.some((w) => w.key === wordObj.key)) return; // אם כבר קיים, סרב
      if (current.length >= WORD_LIMIT_ANON) {
        setIsWordLimitOpen(true);
        return;
      }
      const updated = [...current, wordObj];
      localStorage.setItem('savedWords', JSON.stringify(updated));
      setSavedWords(updated);

      // לוג סטטיסטי כדי למנוע NaN (נרשום ניסיון “כושל”)
      statsManager.addFavoriteWord(wordObj.key);
    } else {
      // ---- משתמש מחובר: שמירה בענן ----
      saveWordToCloud(wordObj, user.id)
        .then(() => {
          // לאחר שמירה בענן, נטען שוב מהענן
          fetchSavedFromCloud();
          // ולוגסטטיסטי
          statsManager.addFavoriteWord(wordObj.key);
        })
        .catch((err) => console.error('Error saving word to cloud:', err));
    }
  };

  // --------------------------------------------
  // 5. הסרת מילה (removeWord)
  // --------------------------------------------
  const removeWord = (wordKey) => {
    if (!user) {
      const current = JSON.parse(localStorage.getItem('savedWords') || '[]');
      const updated = current.filter((w) => w.key !== wordKey);
      localStorage.setItem('savedWords', JSON.stringify(updated));
      setSavedWords(updated);
    } else {
      removeWordFromCloud(wordKey, user.id)
        .then(() => fetchSavedFromCloud())
        .catch((err) => console.error('Error removing word from cloud:', err));
    }
  };

  // --------------------------------------------
  // 6. שמירת סדרה (saveSeries)
  // --------------------------------------------
  const saveSeries = (seriesId) => {
    if (!user) {
      const current = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      if (current.includes(seriesId)) return;
      if (current.length >= SERIES_LIMIT_ANON) {
        setIsSeriesLimitOpen(true);
        return;
      }
      const updated = [...current, seriesId];
      localStorage.setItem('savedSeries', JSON.stringify(updated));
      setSavedSeries(updated);
    } else {
      saveSeriesToCloud(seriesId, user.id)
        .then(() => fetchSavedFromCloud())
        .catch((err) => console.error('Error saving series to cloud:', err));
    }
  };

  // --------------------------------------------
  // 7. הסרת סדרה (removeSeries)
  // --------------------------------------------
  const removeSeries = (seriesId) => {
    if (!user) {
      const current = JSON.parse(localStorage.getItem('savedSeries') || '[]');
      const updated = current.filter((id) => id !== seriesId);
      localStorage.setItem('savedSeries', JSON.stringify(updated));
      setSavedSeries(updated);
    } else {
      removeSeriesFromCloud(seriesId, user.id)
        .then(() => fetchSavedFromCloud())
        .catch((err) => console.error('Error removing series from cloud:', err));
    }
  };

  return (
    <SavedDataContext.Provider
      value={{
        savedWords,
        saveWord,
        removeWord,
        savedSeries,
        saveSeries,
        removeSeries,
      }}
    >
      {children}

      {/* מודל של הגבלת מילים */}
      <LimitModal
        isOpen={isWordLimitOpen}
        onClose={() => setIsWordLimitOpen(false)}
        limitType="words"
      />

      {/* מודל של הגבלת סדרות */}
      <LimitModal
        isOpen={isSeriesLimitOpen}
        onClose={() => setIsSeriesLimitOpen(false)}
        limitType="series"
      />
    </SavedDataContext.Provider>
  );
}

export function useSavedData() {
  return useContext(SavedDataContext);
}
