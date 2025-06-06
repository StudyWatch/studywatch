// src/context/WordsContext.jsx
import React, { createContext, useContext, useState } from 'react';

// יצירת הקונטקסט עם ערכים ברירת מחדל
export const WordsContext = createContext({
  words: [],
  setWords: () => {},
});

// קומפוננטת Provider שעוטפת את האפליקציה
export function WordsProvider({ children }) {
  const [words, setWords] = useState([]);

  return (
    <WordsContext.Provider value={{ words, setWords }}>
      {children}
    </WordsContext.Provider>
  );
}

// ✅ פונקציה מותאמת לגישה נוחה לקונטקסט בכל קומפוננטה
export function useWordsContext() {
  return useContext(WordsContext);
}
