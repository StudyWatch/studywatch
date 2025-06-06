// src/utils/statsManager.js

// פונקציה עזר לקבלת התאריך בפורמט YYYY-MM-DD
function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

// פונקציה עזר להפיכת מחרוזת YYYY-MM-DD לאובייקט Date
function parseDate(dateString) {
  return new Date(dateString + "T00:00:00");
}

// פונקציה עזר לבדוק אם תאריך נמצא בטווח (inclusive)
function isDateInRange(dateString, startDate, endDate) {
  const d = parseDate(dateString);
  return d >= parseDate(startDate) && d <= parseDate(endDate);
}

const statsManager = {
  /** 
   * מוציא מה־localStorage את אובייקט הסטטיסטיקות (אם תקין), אחרת מחזיר ברירת מחדל 
   */
  getStats() {
    try {
      const data = JSON.parse(localStorage.getItem("userStats"));
      return this.validateStats(data) ? data : this.defaultStats();
    } catch {
      return this.defaultStats();
    }
  },

  /** בודק אם המבנה תקין (אובייקט ולא מערך) */
  validateStats(data) {
    return data && typeof data === "object" && !Array.isArray(data);
  },

  /**
   * שומר ב־localStorage את הסטטיסטיקות; יורה אירוע מותאם 'statsUpdate' כדי שגם אותו החלון יקבל עדכון
   */
  saveStats(stats) {
    if (this.validateStats(stats)) {
      localStorage.setItem("userStats", JSON.stringify(stats));
      // יורה אירוע מותאם כדי שחלון נוכחי מקומי יקבל עדכון
      window.dispatchEvent(new Event("statsUpdate"));
    }
  },

  /** ברירת מחדל של אובייקט סטטיסטיקות חדש */
  defaultStats() {
    return {
      learnedWords: {},
      gamesPlayed: {},          // { [gameType]: { total, correct, incorrect } }
      gamesPlayedByDate: {},    // { [YYYY-MM-DD]: { total, correct } }
      dailyActivity: { lastDate: null, streak: 0, activeDays: [] },
      points: 0,
      level: "Beginner",
      badges: [],
      episodesWatched: {},
      wordAttempts: {},         // { [wordKey]: { attempts, correct, successRate, lastAttemptDate, lastSuccessDate } }
      missedWords: {},          // { [YYYY-MM-DD]: { [gameType]: [wordKey…] } }
      favoritesCount: 0,
      favoritesToday: 0,
      dailyWords: {}            // { [YYYY-MM-DD]: count }
    };
  },

  /** עדכון רמת המשתמש לפי הנקודות */
  updateLevel(stats) {
    const points = stats.points;
    if (points >= 200) {
      stats.level = "Master";
    } else if (points >= 100) {
      stats.level = "Explorer";
    } else {
      stats.level = "Beginner";
    }
  },

  /** 
   * לוג למילה שלימדו אותה באופן מלא 
   * (מעדכן learnedWords, מוסיף נקודות, מעדכן dailyWords), ולבסוף שומר
   */
  logWordLearned(wordKey, gameType = "general") {
    const stats = this.getStats();
    const today = getTodayDate();

    if (!stats.learnedWords || typeof stats.learnedWords !== "object") {
      stats.learnedWords = {};
    }

    if (!stats.learnedWords[wordKey]) {
      stats.learnedWords[wordKey] = {
        timestamp: Date.now(),
        game: gameType,
        correctInARow: 1
      };
      stats.points += 10;
      if (!stats.dailyWords) stats.dailyWords = {};
      stats.dailyWords[today] = (stats.dailyWords[today] || 0) + 1;
    } else {
      stats.learnedWords[wordKey].correctInARow += 1;
    }

    this.updateLevel(stats);
    this.saveStats(stats);
  },

  /** 
   * לוג ניסיון של המילה (כל ניסיון, נכון/לא נכון),
   * כולל חישוב אחוז הצלחה ושמירת תאריכים
   */
  logWordAttempt(wordKey, isCorrect) {
    const stats = this.getStats();
    if (!stats.wordAttempts || typeof stats.wordAttempts !== "object") {
      stats.wordAttempts = {};
    }
    if (!stats.wordAttempts[wordKey]) {
      stats.wordAttempts[wordKey] = { attempts: 0, correct: 0, successRate: 0 };
    }
    const entry = stats.wordAttempts[wordKey];
    entry.attempts += 1;
    if (isCorrect) {
      entry.correct += 1;
    }
    // חישוב אחוז הצלחה
    const total = entry.attempts;
    const successTotal = entry.correct;
    entry.successRate = total > 0 ? Math.round((successTotal / total) * 100) : 0;

    // 💡 שמירת תאריכים
    entry.lastAttemptDate = getTodayDate();
    if (isCorrect) {
      entry.lastSuccessDate = getTodayDate();
    }

    stats.wordAttempts[wordKey] = entry;
    this.saveStats(stats);
  },

  /**
   * לוקח מפתח מילת מפתח ומחזיר אובייקט:
   * { attempts: Number, correct: Number, successRate: Number, lastAttemptDate: String|null, lastSuccessDate: String|null }
   */
  getWordProgress(wordKey) {
    const stats = this.getStats();
    const info = stats.wordAttempts?.[wordKey] || {
      attempts: 0,
      correct: 0,
      successRate: 0,
      lastAttemptDate: null,
      lastSuccessDate: null
    };
    const attempts = info.attempts || 0;
    const correct = info.correct || 0;
    const successRate = info.successRate || 0;
    const lastAttemptDate = info.lastAttemptDate || null;
    const lastSuccessDate = info.lastSuccessDate || null;
    return { attempts, correct, successRate, lastAttemptDate, lastSuccessDate };
  },

  /**
   * לוג של מילה "פיספסו" (המשתמש ענה עליה לא נכון)
   */
  logMissedWord(wordKey, gameType = "general") {
    const stats = this.getStats();
    const today = getTodayDate();

    if (!stats.missedWords || typeof stats.missedWords !== "object") {
      stats.missedWords = {};
    }
    if (!stats.missedWords[today]) {
      stats.missedWords[today] = {};
    }
    if (!stats.missedWords[today][gameType]) {
      stats.missedWords[today][gameType] = [];
    }
    // הימנע מהוספה כפולה של אותה מילה באותו יום ובאותו משחק
    if (!stats.missedWords[today][gameType].includes(wordKey)) {
      stats.missedWords[today][gameType].push(wordKey);
    }

    this.saveStats(stats);
  },

  /**
   * השגת רשימת כל המילים שהמשתמש פספס ביום מסוים (אובייקט של gameType→[wordKey…])
   */
  getMissedWordsByDate(date = getTodayDate()) {
    const stats = this.getStats();
    return stats.missedWords?.[date] || {};
  },

  /**
   * השגת מילים שפוספסו בטווח תאריכים (inclusive)
   */
  getMissedWordsInRange(startDate, endDate) {
    const stats = this.getStats();
    const result = {};
    if (!stats.missedWords) return result;

    for (const date in stats.missedWords) {
      if (isDateInRange(date, startDate, endDate)) {
        const byGame = stats.missedWords[date];
        for (const gameType in byGame) {
          if (!result[gameType]) result[gameType] = new Set();
          byGame[gameType].forEach((wordKey) => result[gameType].add(wordKey));
        }
      }
    }
    return result;
  },

  /**
   * השגת כל המילים שפוספסו אי־פעם (distinct)
   */
  getAllMissedWords() {
    const stats = this.getStats();
    const result = {};
    if (!stats.missedWords) return result;

    for (const date in stats.missedWords) {
      const byGame = stats.missedWords[date];
      for (const gameType in byGame) {
        if (!result[gameType]) result[gameType] = new Set();
        byGame[gameType].forEach((wordKey) => result[gameType].add(wordKey));
      }
    }
    return result;
  },

  /**
   * לוג תוצאת משחק (נכונה/שגויה), ועדכון gamesPlayed ו־gamesPlayedByDate
   */
  logGameResult(gameType, wasCorrect) {
    const stats = this.getStats();
    const today = getTodayDate();

    // --- gamesPlayed ---
    if (!stats.gamesPlayed || typeof stats.gamesPlayed !== "object") {
      stats.gamesPlayed = {};
    }
    if (!stats.gamesPlayed[gameType]) {
      stats.gamesPlayed[gameType] = { total: 0, correct: 0, incorrect: 0 };
    }
    stats.gamesPlayed[gameType].total += 1;
    if (wasCorrect) {
      stats.gamesPlayed[gameType].correct += 1;
      stats.points += 5;
    } else {
      stats.gamesPlayed[gameType].incorrect += 1;
    }

    // --- gamesPlayedByDate ---
    if (!stats.gamesPlayedByDate || typeof stats.gamesPlayedByDate !== "object") {
      stats.gamesPlayedByDate = {};
    }
    if (!stats.gamesPlayedByDate[today]) {
      stats.gamesPlayedByDate[today] = { total: 0, correct: 0 };
    }
    stats.gamesPlayedByDate[today].total += 1;
    if (wasCorrect) {
      stats.gamesPlayedByDate[today].correct += 1;
    }

    this.updateLevel(stats);
    this.saveStats(stats);
  },

  /**
   * בדיקה האם המשתמש שיחק היום (אם יש רשומה ב־gamesPlayedByDate של היום)
   */
  hasPlayedToday() {
    const stats = this.getStats();
    const today = getTodayDate();
    return stats.gamesPlayedByDate?.[today]?.total > 0;
  },

  /**
   * לוג צפייה בפרק (כדי לעקוב אחרי למידה דרך סדרות)
   */
  logEpisodeViewed(seriesId, season, episode, learnedWordsCount = 0) {
    const stats = this.getStats();
    const key = `${seriesId}_s${season}_e${episode}`;
    if (!stats.episodesWatched) stats.episodesWatched = {};
    stats.episodesWatched[key] = {
      viewed: true,
      lastViewed: new Date().toISOString(),
      wordsLearned: learnedWordsCount
    };
    stats.points += learnedWordsCount * 3;
    this.updateLevel(stats);
    this.saveStats(stats);
  },

  /**
   * עדכון פעילות יומית: עדכון streak ו־activeDays אם עדיין לא רשום היום
   */
  updateDailyActivity() {
    const stats = this.getStats();
    const today = getTodayDate();
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (!stats.dailyActivity || typeof stats.dailyActivity !== "object") {
      stats.dailyActivity = { lastDate: null, streak: 0, activeDays: [] };
    }
    if (stats.dailyActivity.lastDate === today) return;

    stats.dailyActivity.streak =
      stats.dailyActivity.lastDate === yesterday
        ? stats.dailyActivity.streak + 1
        : 1;
    stats.dailyActivity.lastDate = today;
    if (!stats.dailyActivity.activeDays.includes(today)) {
      stats.dailyActivity.activeDays.push(today);
    }

    stats.points += 2; // 2 נקודות על פעילות יומית
    this.updateLevel(stats);
    this.saveStats(stats);
  },

  /**
   * סימון מילה כמועדפת (עדכון favoritesCount & favoritesToday)
   * וגם מבטיח שלמילה יש לפחות ניסיון אחד כדי למנוע NaN
   */
  addFavoriteWord(wordKey) {
    const stats = this.getStats();
    const today = getTodayDate();

    // 1. אם אין רישום ניסיון עבור המילה, מוסיפים ניסיון “כושל” כדי לאתחל הפעמים
    if (!stats.wordAttempts || typeof stats.wordAttempts !== "object") {
      stats.wordAttempts = {};
    }
    if (!stats.wordAttempts[wordKey]) {
      stats.wordAttempts[wordKey] = { attempts: 1, correct: 0, successRate: 0 };
    }

    // 2. נוודא אם צריך לאפס את favoritesToday (אם עבר יום מאז העדכון האחרון)
    this.resetDailyFavoritesIfNeeded();

    stats.favoritesCount = (stats.favoritesCount || 0) + 1;
    stats.favoritesToday = (stats.favoritesToday || 0) + 1;

    this.saveStats(stats);
  },

  /**
   * אם התאריך הנוכחי שונה מ־lastDate בדיילי אקטיביטי, מאפסים favoritesToday
   */
  resetDailyFavoritesIfNeeded() {
    const stats = this.getStats();
    const today = getTodayDate();
    if (!stats.dailyActivity || stats.dailyActivity.lastDate !== today) {
      stats.favoritesToday = 0;
      this.saveStats(stats);
    }
  },

  /** החזרת מספר כולל של מילים מועדפות */
  getFavoritesCount() {
    const stats = this.getStats();
    return stats.favoritesCount || 0;
  }
};

export default statsManager;
