// src/utils/saveSeriesToCloud.js

/**
 * saveSeriesToCloud
 * -----------------
 * פונקציה לשמירת מזהה סדרה (seriesId) לטבלת “series_favorites” ב־Supabase.
 * כרגע stub שמחזיר Promise.resolve(null).
 *
 * פרמטרים:
 *   - seriesId: string – מזהה הסדרה (למשל 'breaking_bad')
 *   - userId:   string – מזהה המשתמש (UUID)
 *
 * חזרה:
 *   Promise<Object|null> – היה מחזיר את השורה שהוכנסה (Supabase).  
 *                         כרגע null.
 */

export default async function saveSeriesToCloud(seriesId, userId) {
  console.warn(
    '[saveSeriesToCloud] Supabase לא מוגדר. לא בוצעה שמירה עבור סדרה:',
    seriesId,
    'למשתמש:',
    userId
  );
  return Promise.resolve(null);
}
