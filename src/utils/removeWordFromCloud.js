// src/utils/removeWordFromCloud.js

/**
 * removeWordFromCloud
 * -------------------
 * פונקציה להסרת מילה (key) מה־“ענן” (Supabase).
 * כרגע stub שמחזיר Promise.resolve().
 *
 * פרמטרים:
 *   - wordKey: string – המפתח הייחודי של המילה (key)
 *   - userId: string  – מזהה המשתמש (UUID)
 *
 * חזרה:
 *   Promise<void> – אם Supabase מחובר, היה מסיר את הרשומה.  
 *                   כרגע מחזיר Promise.resolve().
 */

export default async function removeWordFromCloud(wordKey, userId) {
  console.warn(
    '[removeWordFromCloud] Supabase לא מוגדר. לא בוצעה הסרה עבור key:',
    wordKey,
    'למשתמש:',
    userId
  );
  return Promise.resolve();
}
