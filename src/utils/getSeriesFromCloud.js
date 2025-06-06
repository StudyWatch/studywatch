// src/utils/getSeriesFromCloud.js

/**
 * getSeriesFromCloud
 * ------------------
 * מושך את כל הסדרות השמורות של משתמש (userId) מה־“ענן” (Supabase).
 * כרגע stub שמחזיר מערך ריק ([]) ללא קריאה אמיתית.
 *
 * פרמטרים:
 *   - userId: string – מזהה המשתמש (UUID)
 *
 * חזרה:
 *   Promise<Array<string>> – מערך של seriesId (מחרוזות).  
 *                           כרגע [].
 */

export default async function getSeriesFromCloud(userId) {
  console.warn(
    '[getSeriesFromCloud] Supabase לא מוגדר. מחזיר מערך ריק למשתמש:',
    userId
  );
  return Promise.resolve([]);
}
