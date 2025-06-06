// src/utils/getWordsFromCloud.js

/**
 * הפונקציה הזו מושכת את כל המילים השמורות של משתמש מסוים מטבלת "words_favorites" ב־Supabase.
 * מניחה שהתקנתם את @supabase/supabase-js ושאתם מגדירים את משתני הסביבה:
 *   VITE_SUPABASE_URL       – ה־URL של הפרויקט שלכם בסופאבייס
 *   VITE_SUPABASE_ANON_KEY   – ה־ANON KEY (public) של הפרויקט
 *
 * כדי להתקין את supabase-js:
 *   npm install @supabase/supabase-js
 *
 * מבנה הטבלה המומלץ ב־Supabase:
 * 
 * CREATE TABLE public.words_favorites (
 *   user_id    uuid REFERENCES auth.users(id),
 *   key        text PRIMARY KEY,
 *   word       text NOT NULL,
 *   fromLang   text NOT NULL,
 *   learningLang text NOT NULL,
 *   sentence   jsonb,
 *   translations jsonb,
 *   season     int,
 *   episode    int,
 *   difficulty text,
 *   practicedEpisodes int,
 *   totalEpisodes     int,
 *   lastPracticed timestamp with time zone
 * );
 */

import { createClient } from '@supabase/supabase-js';

// קריאה לכתובת ול־key מתוך משתני הסביבה
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// יצירת אינסטנס של Supabase Client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * getWordsFromCloud
 * @param {string} userId – המזהה הייחודי של המשתמש (UUID) כפי שהוא מופיע ב־AuthContext
 *
 * @returns {Promise<Array<Object>>} – מערך של אובייקטי מילים (records) מהטבלה words_favorites
 * @throws – יזרוק שגיאה אם קריאת ה־select נכשלת
 */
export default async function getWordsFromCloud(userId) {
  const tableName = 'words_favorites';

  // מושכים את כל השורות השייכות ל־userId
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching words from Supabase:', error);
    throw error;
  }

  // אם אין נתונים, נחזיר מערך ריק
  return data || [];
}
