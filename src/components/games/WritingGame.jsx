// src/components/games/WritingGame.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GamePage from "../../pages/GamePage";
import axios from "axios";
import statsManager from "../../utils/statsManager";
import PopUpToast from "../PopUpToast";

export default function WritingGame() {
  const navigate = useNavigate();
  const location = useLocation();

  const wordsFromState = location.state?.words;
  const allWords =
    Array.isArray(wordsFromState) && wordsFromState.length > 0
      ? wordsFromState
      : [];

  useEffect(() => {
    if (!allWords || allWords.length === 0) {
      navigate("/games");
    }
  }, [allWords, navigate]);

  const learningLang =
    location.state?.targetLang || allWords[0]?.learningLang || "he";
  const fromLang = location.state?.sourceLang || allWords[0]?.fromLang || "en";

  const [targetWord, setTargetWord] = useState(null);
  useEffect(() => {
    if (allWords.length > 0) {
      const idx = Math.floor(Math.random() * allWords.length);
      const chosen = allWords[idx];
      const key = chosen.displayTo || chosen.translations?.[learningLang] || chosen.word;
      setTargetWord(key);
      statsManager.updateDailyActivity(); // עדכון יומי
    }
  }, [allWords, learningLang]);

  const [userText, setUserText] = useState("");
  const [matches, setMatches] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [missedWordsList, setMissedWordsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [score, setScore] = useState(0);

  function showToastMessage(message, type = "info") {
    setToastConfig({ message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  function containsTarget(text, word) {
    if (!text || !word) return false;
    const normalizedText = text.trim().toLowerCase();
    const normalizedWord = word.trim().toLowerCase();
    return normalizedText.includes(normalizedWord);
  }

  async function handleCheck() {
    if (!userText.trim()) {
      return showToastMessage("אנא הקלד משפט לבדיקה", "error");
    }
    if (!containsTarget(userText, targetWord)) {
      return showToastMessage(
        `המשפט חייב לכלול את המילה "${targetWord}"`,
        "error"
      );
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.languagetool.org/v2/check",
        new URLSearchParams({
          text: userText,
          language: learningLang === "en" ? "en-US" : "he-IL",
          enabledOnly: "false",
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const foundMatches = response.data.matches || [];
      setMatches(foundMatches);

      const keyFull = `${userText}_${fromLang}_${learningLang}`;

      if (foundMatches.length === 0) {
        setFeedback({ message: "✅ אין שגיאות! המשפט תקין.", type: "success" });
        setMissedWordsList([]);

        statsManager.logWordAttempt(keyFull, true);
        statsManager.logWordLearned(keyFull, "WritingGame");
        setScore((p) => p + 20);

        statsManager.logGameResult("WritingGame", true);
      } else {
        setFeedback({
          message: `❌ נמצאו ${foundMatches.length} שגיאות בדקדוק/איות.`,
          type: "error",
        });
        const missed = [];
        foundMatches.forEach((m) => {
          const problemText = userText.substr(m.offset, m.length).trim();
          missed.push(problemText);
          const key = `${problemText}_${fromLang}_${learningLang}`;
          statsManager.logMissedWord(key, "WritingGame");
          statsManager.logWordAttempt(key, false);
        });
        setMissedWordsList(missed);

        statsManager.logGameResult("WritingGame", false);
      }
    } catch (err) {
      console.error(err);
      setFeedback({
        message: "שגיאה בבדיקת הדקדוק. נסה שוב מאוחר יותר.",
        type: "error",
      });
    }
    setLoading(false);
  }

  function renderErrors() {
    return matches.map((m, idx) => {
      const problemText = userText.substr(m.offset, m.length);
      const suggestions = m.replacements.map((r) => r.value).slice(0, 3);
      return (
        <div
          key={idx}
          className="mb-3 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
        >
          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
            שגיאה {idx + 1}:{" "}
            <span className="italic text-red-600 dark:text-red-300">
              "{problemText}"
            </span>
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            {m.message} ({m.rule.issueType})
          </p>
          {suggestions.length > 0 && (
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              הצעות תיקון: {suggestions.join(", ")}
            </p>
          )}
        </div>
      );
    });
  }

  const dir = ["he", "ar"].includes(learningLang) ? "rtl" : "ltr";

  return (
    <GamePage
      title="✍️ משחק כתיבה ובדיקת דקדוק"
      backgroundImage="/images/backgrounds/writing-game.png"
    >
      <div className="pt-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full max-w-screen-md mx-auto" dir={dir}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 text-center">
            כתיבה ובדיקת דקדוק
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base">
            אנא כתוב משפט אחד בשפת היעד (“{learningLang.toUpperCase()}”) שיעשה שימוש במילה:
          </p>

          {/* תצוגת המילה שעליה נבנה המשפט */}
          {targetWord && (
            <div className="mb-4 text-center">
              <span className="text-xl font-extrabold text-blue-700 dark:text-blue-300">
                {targetWord}
              </span>
            </div>
          )}

          {/* textarea לעריכת המשפט */}
          <textarea
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              dir === "rtl" ? "text-right" : "text-left"
            } bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base`}
            rows={4}
            placeholder={
              dir === "rtl"
                ? `כתוב כאן משפט המכיל את "${targetWord}"...`
                : `Type a sentence here that uses "${targetWord}"...`
            }
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            aria-label="כתיבת המשפט לבדיקת דקדוק"
          />

          {/* כפתור בדיקת הדקדוק */}
          <button
            onClick={handleCheck}
            disabled={loading}
            className={`mt-4 mb-4 px-6 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
            } text-sm sm:text-base`}
            aria-label="בדוק דקדוק"
          >
            {loading ? "בודק..." : "🔍 בדוק דקדוק"}
          </button>

          {/* משוב כללי (נכונה/שגויה) */}
          {feedback && (
            <div
              className={`w-full mb-4 p-3 rounded-lg text-center ${
                feedback.type === "success"
                  ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
              } text-sm sm:text-base`}
              aria-live="polite"
            >
              {feedback.message}
            </div>
          )}

          {/* פירוט שגיאות במידה וקיימות */}
          {matches.length > 0 && (
            <div className="w-full border-t pt-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 text-center">
                פרטי השגיאות ובחירת תיקונים:
              </h2>
              {renderErrors()}
            </div>
          )}

          {/* רשימת מילים שפספסו + כפתור שמירה למועדפים */}
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

          {/* תצוגת ניקוד */}
          <div className="mt-8 text-lg text-gray-700 dark:text-gray-300 text-center">
            ניקוד:{" "}
            <span className="font-bold text-blue-700 dark:text-blue-300">{score}</span>
          </div>
        </div>
      </div>
    </GamePage>
  );
}
