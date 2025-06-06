import React, { createContext, useContext, useMemo } from 'react';
import { useSettings } from './SettingsContext';
import he from '../i18n/he.json';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';
import ru from '../i18n/ru.json';
import es from '../i18n/es.json';

const translations = { he, en, ar, ru, es };
const I18nContext = createContext();

// תומך במפתחות מקוננים כמו "settings.language.ui"
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function I18nProvider({ children }) {
  const { settings } = useSettings();
  const lang = settings?.uiLang || 'en';

  const value = useMemo(() => {
    const t = (key) =>
      getNestedValue(translations[lang], key) ||
      getNestedValue(translations['en'], key) ||
      key;

    return { t };
  }, [lang]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export const useTranslation = () => useContext(I18nContext);
