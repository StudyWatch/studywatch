// src/components/games/ListeningGame.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWordsContext } from "../../context/WordsContext";
import GamePage from "../../pages/GamePage";
import statsManager from "../../utils/statsManager";
import PopUpToast from "../PopUpToast"; // ייבוא PopUpToast קצר

// מיפוי של קונטרקציות נפוצות להרחבה
const CONTRACTION_MAP = {
  "we're": "we are",
  "i'm": "i am",
  "you're": "you are",
  "they're": "they are",
  "it's": "it is",
  "can't": "cannot",
  "cant": "cannot",
  "don't": "do not",
  "dont": "do not",
  "doesn't": "does not",
  "doesnt": "does not",
  "didn't": "did not",
  "didnt": "did not",
  "couldn't": "could not",
  "couldnt": "could not",
  "shouldn't": "should not",
  "shouldnt": "should not",
  "wouldn't": "would not",
  "wouldnt": "would not",
  "isn't": "is not",
  "isnt": "is not",
  "aren't": "are not",
  "arent": "are not",
  "ain't": "is not",
  "aint": "is not",
};

export default function ListeningGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const { words: contextWords } = useWordsContext();

  // 1. קבלת המילים: קודם מ־location.state, אחרת מ־context
  const wordsFromState = location.state?.words;
  const allWords =
    Array.isArray(wordsFromState) && wordsFromState.length > 0
      ? wordsFromState
      : contextWords || [];

  // אם אין מילים – redirect לתפריט המשחקים
  useEffect(() => {
    if (!allWords || allWords.length === 0) {
      navigate("/games");
    }
  }, [allWords, navigate]);

  // 2. קביעת שפות (לסטטיסטיקה)
  const learningLang =
    location.state?.targetLang || allWords[0]?.learningLang || "he";
  const fromLang = location.state?.sourceLang || allWords[0]?.fromLang || "en";

  // 3. בונות מערך של משפטים תקינים (מתוך displaySentence)
  const [eligibleSentences, setEligibleSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const eligible = allWords
      .map((w) => w.displaySentence)
      .filter((sent) => typeof sent === "string" && sent.trim().length > 0)
      .map((sent) => sent.trim());

    if (eligible.length === 0) {
      // אין משפטים תקינים
      navigate("/games");
      return;
    }
    setEligibleSentences(eligible);
    setCurrentIndex(0);
    statsManager.updateDailyActivity(); // עדכון יומי
  }, [allWords, learningLang, navigate]);

  // 4. סטייטים לשימוש במשפט הנוכחי והמשתמש
  const [currentSentence, setCurrentSentence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [missedWordsList, setMissedWordsList] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({}); 
  const [audioAllowed, setAudioAllowed] = useState(true);
  const [usedSentences, setUsedSentences] = useState([]); 
  const [showSentenceFlag, setShowSentenceFlag] = useState(false); 

  // כאשר eligibleSentences או currentIndex משתנים, נעדכן את currentSentence
  useEffect(() => {
    if (
      eligibleSentences.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < eligibleSentences.length
    ) {
      setCurrentSentence(eligibleSentences[currentIndex]);
      setUserInput("");
      setFeedback(null);
      setMissedWordsList([]);
      setStartTime(null);
      setShowSentenceFlag(false);

      // אחרי שסגנינו את המשפט, ניתן גם לנגן אותו מיד
      // עם השהייה קלה כדי לתת זמן לרינדור התצוגה
      setTimeout(() => speak(eligibleSentences[currentIndex]), 300);
    }
  }, [eligibleSentences, currentIndex]);

  // בדיקה אם SpeechSynthesis נתמך
  useEffect(() => {
    if (!window.speechSynthesis) {
      setAudioAllowed(false);
    }
  }, []);

  // פונקציית הרחבת קונטרקציות (לדוגמה: "we're" => "we are")
  const expandContractions = useCallback((str) => {
    let s = str;
    Object.entries(CONTRACTION_MAP).forEach(([contr, full]) => {
      // נבדוק את המילה כמילה שלמה (עם תיחום גבולות)
      const regex = new RegExp(`\\b${contr}\\b`, "gi");
      s = s.replace(regex, full);
    });
    return s;
  }, []);

  // נורמליזציה של מחרוזת לפני השוואה: lowercase, הסרת פיסוק, הרחבת קונטרקציות
  const normalize = useCallback(
    (str) => {
      if (!str) return "";
      let s = str.trim().toLowerCase();

      // הרחבת קונטרקציות
      s = expandContractions(s);

      // הסרת פיסוק (פסיקים, נקודות, סימני שאלה וכו')
      s = s.replace(/[.,!?;:()"']/g, "");

      // רווחים רצופים להסרת ריבוי
      s = s.replace(/\s+/g, " ");
      return s;
    },
    [expandContractions]
  );

  // פונקציית השמע
  const speak = useCallback(
    (text) => {
      if (!audioAllowed) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        learningLang === "en"
          ? "en-US"
          : learningLang === "he"
          ? "he-IL"
          : `${learningLang}-XX`;
      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find((v) => v.lang.startsWith(utterance.lang)) ||
        voices.find((v) => v.lang.includes("en"));
      if (voice) utterance.voice = voice;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [audioAllowed, learningLang]
  );

  // פונקציית Toast קצר
  function showToastMessage(message, type = "info") {
    setToastConfig({ message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  // הפעלה ראשונית של השמע
  function handlePlay() {
    if (!currentSentence) {
      return showToastMessage("אין משפט להשמעה כרגע.", "error");
    }
    speak(currentSentence);
    setStartTime(Date.now());
  }

  // בדיקת התשובה
  function handleCheck() {
    if (!startTime) {
      return showToastMessage(
        "עליך להשמיע קודם את המשפט לפני הבדיקה.",
        "error"
      );
    }
    const normUser = normalize(userInput);
    const normTarget = normalize(currentSentence);
    const responseTime = ((Date.now() - startTime) / 1000).toFixed(1);

    if (normUser === normTarget) {
      // תשובה נכונה
      setFeedback({
        message: `✅ נכון! זמן תגובה: ${responseTime} שניות`,
        type: "success",
      });

      // ✅ לוג ניסיון (כדי לעדכן lastAttemptDate) ו־סטטיסטיקה
      {
        const keyStat = `${normTarget}_${fromLang}_${learningLang}`;
        statsManager.logWordAttempt(keyStat, true);
        statsManager.logGameResult("ListeningGame", true);
      }

      // שמירה ברשימת usedSentences
      setUsedSentences((prev) => [
        ...prev,
        {
          sentence: currentSentence,
          isCorrect: true,
          time: responseTime,
        },
      ]);

      // אם יש משפט נוסף, נתקדם אליו
      if (currentIndex + 1 < eligibleSentences.length) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 1000);
      } else {
        // אם זה המשפט האחרון – מסיימים ומשלבים את המשפט הנכון האחרון בתוצאות
        setTimeout(() => {
          navigate("/game-end", {
            state: {
              score: usedSentences.length + 1, // מכיוון שהוספנו משפט אחד עכשיו
              words: [
                ...usedSentences,
                {
                  sentence: currentSentence,
                  isCorrect: true,
                  time: responseTime,
                },
              ],
              fromGame: "/games/listening",
            },
          });
        }, 1000);
      }

      setMissedWordsList([]);
    } else {
      // תשובה שגויה – נשארים על אותו משפט ומאפשרים תיקון
      setFeedback({
        message: "❌ לא נכון. נסה שוב.",
        type: "error",
      });

      // ננתח איזה מילים פספסו (אחרי נורמליזציה)
      const targetWords = normTarget.split(" ");
      const userWords = normUser.split(" ");
      const missed = [];
      targetWords.forEach((tw, idx) => {
        if (!userWords[idx] || userWords[idx] !== tw) {
          missed.push(tw);
          const key = `${tw}_${fromLang}_${learningLang}`;
          statsManager.logMissedWord(key, "ListeningGame");
          // ✅ גם לוג ניסיון כושל, כדי לעדכן lastAttemptDate
          statsManager.logWordAttempt(key, false);
        }
      });
      setMissedWordsList(missed);

      statsManager.logGameResult("ListeningGame", false);
    }
  }

  // כפתור דילוג (הבא) – עובר למשפט הבא ללא תלות בתשובה
  function handleSkip() {
    if (currentIndex + 1 < eligibleSentences.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // אם זה האחרון, ניגש לסיומת
      navigate("/game-end", {
        state: {
          score: usedSentences.length, // ניקוד לפי המשפטים הנכונים עד כה
          words: usedSentences,
          fromGame: "/games/listening",
        },
      });
    }
  }

  // כפתור “חזור למשחקים”
  function handleBackToMenu() {
    navigate("/games");
  }

  const dir = ["he", "ar"].includes(learningLang) ? "rtl" : "ltr";

  return (
    <GamePage
      title="🔊 משחק הבנת הנשמע"
      backgroundImage="/images/backgrounds/listening-game.png"
    >
      <div className="flex flex-col items-center gap-6 mt-8 w-full px-4 max-w-screen-md mx-auto" dir={dir}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 text-center">
            הבנת הנשמע
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base">
            השמע את המשפט בשפת היעד ({learningLang.toUpperCase()}) והקלד את מה ששמעת.  
            כאשר תענה נכון, נעבור אוטומטית למשפט הבא וננגנוֹ אותו.  
            ניתן גם ללחוץ “הצג משפט” כדי לראות את הטקסט, או “הבא” לדלג.
          </p>

          {/* כפתור השמעה (כולל הפעלה חוזרת) */}
          <button
            onClick={handlePlay}
            className={`flex items-center justify-center gap-2 mb-4 px-5 py-3 w-full sm:w-auto ${
              audioAllowed
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
            aria-label="השמע את המשפט"
          >
            {audioAllowed ? "🔊 השמע מחדש" : "🔇 לא ניתן להשמיע"}
          </button>

          {/* כפתור “הצג משפט” */}
          <button
            onClick={() => setShowSentenceFlag((prev) => !prev)}
            className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm sm:text-base"
            aria-label="הצג/הסתיר את המשפט"
          >
            {showSentenceFlag ? "הסתר משפט" : "הצג משפט"}
          </button>

          {/* הצגת המשפט בטקסט במקרה ש־showSentenceFlag=true */}
          {showSentenceFlag && (
            <div className="mb-4 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-center text-sm sm:text-base">
              {currentSentence}
            </div>
          )}

          {/* textarea להזנת התשובה */}
          <div className="w-full mb-4">
            <textarea
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                ["he", "ar"].includes(learningLang) ? "text-right" : "text-left"
              } bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base`}
              rows={3}
              placeholder={
                learningLang === "he"
                  ? "הקלד כאן את המשפט ששמעת..."
                  : "Type here what you heard..."
              }
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              aria-label="כתיבת המשפט שהמשתמש שמע"
            />
          </div>

          {/* כפתורי פעולה: בדוק / הבא / חזור */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleCheck}
              className="px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:text-base"
              aria-label="בדוק את התשובה"
            >
              📝 בדוק
            </button>

            <button
              onClick={handleSkip}
              className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
              aria-label="דלג למשפט הבא"
            >
              ⏩ הבא
            </button>

            <button
              onClick={handleBackToMenu}
              className="px-5 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition text-sm sm:text-base"
              aria-label="חזור לתפריט המשחקים"
            >
              🏠 חזור למשחקים
            </button>
          </div>

          {/* חיווי נכון/שגוי */}
          {feedback && (
            <div
              className={`mt-4 w-full mb-4 p-3 rounded-lg ${
                feedback.type === "success"
                  ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
              } text-sm sm:text-base`}
              aria-live="polite"
            >
              {feedback.message}
            </div>
          )}

          {/* פירוט מילים שנפספסו */}
          {missedWordsList.length > 0 && (
            <div className="w-full mb-4 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900 text-sm sm:text-base">
              <p className="mb-2 text-gray-700 dark:text-gray-300 text-center">
                פספסת את המילים הבאות:
                {missedWordsList.map((w, i) => (
                  <span key={i} className="ml-1 font-semibold text-red-600 dark:text-red-300">
                    {w}
                  </span>
                ))}
                .
                <br />
                לשמור אותן{" "}
                <button
                  onClick={() => {
                    missedWordsList.forEach((w) => {
                      const key = `${w}_${fromLang}_${learningLang}`;
                      statsManager.addFavoriteWord(key);
                    });
                    showToastMessage("המילים נוספו למועדפים!", "success");
                  }}
                  className="underline text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100 focus:outline-none"
                >
                  למועדפים
                </button>
                ?
              </p>
            </div>
          )}

          {/* toast */}
          {showToast && <PopUpToast message={toastConfig.message} type={toastConfig.type} />}
        </div>
      </div>
    </GamePage>
  );
}
