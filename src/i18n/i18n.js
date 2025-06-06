// src/i18n/i18n.js
import he from './he.json';
import en from './en.json';
import ar from './ar.json';
import ru from './ru.json';
import es from './es.json';

const languages = { he, en, ar, ru, es };

// פונקציה ריקורסיבית להגיע למפתחות עם נקודה
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function translate(key, lang = 'en') {
  return getNestedValue(languages[lang], key)
      || getNestedValue(languages['en'], key)
      || key;
}
