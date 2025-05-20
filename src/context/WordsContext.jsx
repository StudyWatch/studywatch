// src/context/WordsContext.jsx
import React, { createContext, useState } from 'react';

export const WordsContext = createContext();

export function WordsProvider({ children }) {
  const [words, setWords] = useState([]);
  const [seriesId, setSeriesId] = useState('');

  return (
    <WordsContext.Provider value={{ words, setWords, seriesId, setSeriesId }}>
      {children}
    </WordsContext.Provider>
  );
}
