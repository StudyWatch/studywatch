// src/utils/saveWordToCloud.js

/**
 * saveWordToCloud
 * ---------------
 * פונקציה לשמירת אובייקט מילה ב־“הענן” דרך Supabase (או כל מסד דומה).
 * כעת, מכיוון שעדיין אין Supabase, מדובר ב־stub שמחזיר Promise.resolve().
 *
 * פרמטרים:
 *   - wordObj: אובייקט המכיל את כל המידע שאתם רגילים לשמור:
 *       {
 *         key: string,            // מפתח ייחודי של המילה (למשל: series1_s01_e05_easy_שלום)
 *         word: string,           // המילה עצמה (שמופיעה ב־learningLang)
 *         fromLang: string,       // השפה שממנה (למשל: 'he')
 *         learningLang: string,   // השפה של המילה (למשל: 'en')
 *         sentence: object|null,  // משפט (או אובייקט JSON) לדוגמה
 *         translations: object,   // תרגומים (למשל: { he: 'שלום', en: 'hello' })
 *         season: number,         // עונה
 *         episode: number,        // פרק
 *         difficulty: string,     // רמת קושי ('easy' | 'medium' | 'hard')
 *         practicedEpisodes: number,
 *         totalEpisodes: number,
 *         lastPracticed: string|null // תאריך בפורמט ISO, או null
 *       }
 *   - userId: string – מזהה המשתמש (UUID)
 *
 * חזרה:
 *   Promise<Object> – אם Supabase מחובר, היה מחזיר את ה־record שהוכנס.  
 *                    כרגע מחזיר פשוט Promise.resolve(null).
 */

export default async function saveWordToCloud(wordObj, userId) {
  // TODO: החליפו את ה־stub הזה בקריאות אמיתיות ל־Supabase כשתהיה חיבור
  console.warn(
    '[saveWordToCloud] Supabase לא מוגדר. לא בוצעה שמירה עבור המילה:',
    wordObj,
    'למשתמש:',
    userId
  );
  // מחזירים Promise.resolve(null) כדי שהקריאה לא תחזיק את האפליקציה
  return Promise.resolve(null);
}
