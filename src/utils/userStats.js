// src/utils/userStats.js

const STORAGE_KEY = 'userStats';

function loadStats() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const today = new Date().toISOString().slice(0, 10);
  let data = raw ? JSON.parse(raw) : {};

  // איפוס סטטיסטיקות אם יום חדש
  if (data.lastUpdated !== today) {
    data = {
      ...data,
      gamesPlayed: 0,
      favoritesToday: 0,
      learnedWords: 0,
      lastUpdated: today,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  return data;
}

function saveStats(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// העלאת מונה של פעולה מסוימת
export function incrementStat(key, amount = 1) {
  const stats = loadStats();
  stats[key] = (stats[key] || 0) + amount;
  stats.lastUpdated = new Date().toISOString().slice(0, 10);
  saveStats(stats);
}

// קבלת ערך נוכחי של מונה
export function getStat(key) {
  const stats = loadStats();
  return stats[key] || 0;
}

// איפוס ידני של כל הסטטיסטיקות
export function resetAllStats() {
  const today = new Date().toISOString().slice(0, 10);
  const empty = {
    gamesPlayed: 0,
    favoritesToday: 0,
    learnedWords: 0,
    lastUpdated: today,
  };
  saveStats(empty);
  return empty;
}

// בדיקת מתי עודכן לאחרונה
export function getLastUpdateDate() {
  const stats = loadStats();
  return stats.lastUpdated;
}
