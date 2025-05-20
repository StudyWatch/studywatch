import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('he');

  const switchLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
  };

  useEffect(() => {
    const stored = localStorage.getItem('langPref');
    if (stored) {
      const { fromLang, toLang } = JSON.parse(stored);
      setFromLang(fromLang);
      setToLang(toLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('langPref', JSON.stringify({ fromLang, toLang }));
  }, [fromLang, toLang]);

  return (
    <LanguageContext.Provider value={{ fromLang, toLang, setFromLang, setToLang, switchLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}
