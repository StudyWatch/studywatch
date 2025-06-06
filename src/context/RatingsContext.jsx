// src/context/RatingsContext.jsx

import React, { createContext, useState, useEffect } from 'react';

export const RatingsContext = createContext({
  ratings: {},            // { [seriesId]: { up: number, down: number } }
  rateSeries: (id, isUp) => {},
});

export function RatingsProvider({ children }) {
  const [ratings, setRatings] = useState({});

  // טען דירוגים מ־localStorage בעת ההרצה הראשונה
  useEffect(() => {
    try {
      const stored = localStorage.getItem('seriesRatings');
      if (stored) {
        setRatings(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading ratings from localStorage', err);
    }
  }, []);

  // שמור כל שינוי ב־ratings ל־localStorage
  useEffect(() => {
    try {
      localStorage.setItem('seriesRatings', JSON.stringify(ratings));
    } catch (err) {
      console.error('Error saving ratings to localStorage', err);
    }
  }, [ratings]);

  const rateSeries = (seriesId, isUp) => {
    setRatings(prev => {
      const existing = prev[seriesId] || { up: 0, down: 0 };
      const updated = {
        up: existing.up + (isUp ? 1 : 0),
        down: existing.down + (isUp ? 0 : 1),
      };
      return { ...prev, [seriesId]: updated };
    });
  };

  return (
    <RatingsContext.Provider value={{ ratings, rateSeries }}>
      {children}
    </RatingsContext.Provider>
  );
}
