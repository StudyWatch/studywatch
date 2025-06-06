// src/utils/removeSeriesFromCloud.js

/**
 * removeSeriesFromCloud
 * ---------------------
 * פונקציה להסרת סדרה (seriesId) מטבלת “series_favorites” ב־Supabase.
 * כרגע stub שמחזיר Promise.resolve().
 *
 * פרמטרים:
 *   - seriesId: string – מזהה הסדרה
 *   - userId:   string – מזהה המשתמש (UUID)
 *
 * חזרה:
 *   Promise<void> – אם Supabase היה מחובר, היה מסיר את הרשומה.  
 *                   כרגע אין שינוי במסד.
 */

export default async function removeSeriesFromCloud(seriesId, userId) {
  console.warn(
    '[removeSeriesFromCloud] Supabase לא מוגדר. לא בוצעה הסרה עבור סדרה:',
    seriesId,
    'למשתמש:',
    userId
  );
  return Promise.resolve();
}
