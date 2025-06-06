// src/utils/wordKey.js
/**
 * פונקציה שיוצרת מפתח ייחודי למילה, בפורמט אחיד:
 *   `${seriesId}_${season}_${episode}_${difficulty}_${word}`
 */
export function makeWordKey({ seriesId, season, episode, difficulty, word }) {
  return `${seriesId}_${season}_${episode}_${difficulty}_${word}`;
}
