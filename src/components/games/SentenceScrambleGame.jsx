// src/components/games/SentenceScrambleGame.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWordsContext } from "../../context/WordsContext";
import GamePage from "../../pages/GamePage";
import statsManager from "../../utils/statsManager";
import PopUpToast from "../PopUpToast";

export default function SentenceScrambleGame() {
  const navigate = useNavigate();
  const { words: contextWords } = useWordsContext();

  const wordsFromState = contextWords || [];
  const words = Array.isArray(wordsFromState) ? wordsFromState : [];

  // 1. קביעת שפות לסטטיסטיקה
  const learningLang = words[0]?.learningLang || "he";
  const fromLang = words[0]?.fromLang || "en";

  // 2. סטייטים למשפט אקראי ומשתנים
  const [originalWords, setOriginalWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [missedWordsList, setMissedWordsList] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({}); 
  const [isCorrectAnimation, setIsCorrectAnimation] = useState(false);
  const successAudioRef = useRef(null);

  // פונקציית ערבול פשוטה
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const initializeSentence = () => {
    const eligible = words.filter(
      (w) =>
        typeof w.displaySentence === "string" &&
        w.displaySentence.trim().length > 0
    );
    if (eligible.length === 0) {
      navigate("/games");
      return;
    }
    const randomObj = eligible[Math.floor(Math.random() * eligible.length)];
    const sentence = randomObj.displaySentence.trim();
    const cleanSentence = sentence.replace(/[.,!?;:]/g, "");
    const wordsArr = cleanSentence.split(/\s+/);

    setOriginalWords(wordsArr);
    setAvailableWords(shuffle(wordsArr));
    setSelectedWords([]);
    setFeedback(null);
    setMissedWordsList([]);
    setIsCorrectAnimation(false);

    statsManager.updateDailyActivity(); // עדכון יומי
  };

  useEffect(() => {
    initializeSentence();
    successAudioRef.current = new Audio("/sounds/success.mp3");
  }, [words]);

  // Toast קצר
  function showToastMessage(message, type = "info") {
    setToastConfig({ message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  function onWordClick(word) {
    if (selectedWords.includes(word)) return;
    setSelectedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((w) => w !== word));
    setFeedback(null);
    setMissedWordsList([]);
  }

  function onSelectedWordClick(idx) {
    const word = selectedWords[idx];
    setSelectedWords((prev) => prev.filter((_, i) => i !== idx));
    setAvailableWords((prev) => [...prev, word]);
    setFeedback(null);
    setMissedWordsList([]);
  }

  useEffect(() => {
    if (
      originalWords.length > 0 &&
      selectedWords.length === originalWords.length
    ) {
      const isCorrect =
        selectedWords.join(" ") === originalWords.join(" ");
      if (isCorrect) {
        setFeedback({
          message: "🎉 כל הכבוד! סדרת נכון!",
          type: "success",
        });
        const keyStat = `${originalWords.join(" ")}_${fromLang}_${learningLang}`;
        statsManager.logWordAttempt(keyStat, true);
        statsManager.logWordLearned(keyStat, "SentenceScramble");
        statsManager.logGameResult("SentenceScramble", true);

        if (successAudioRef.current) {
          successAudioRef.current.currentTime = 0;
          successAudioRef.current.play();
        }
        setIsCorrectAnimation(true);

        setTimeout(() => {
          initializeSentence();
        }, 1500);
      } else {
        setFeedback({
          message: "❌ השילוב לא תקין. נסה שוב או לחץ על 🔄 למטה.",
          type: "error",
        });
        const missed = [];
        originalWords.forEach((w, idx) => {
          if (selectedWords[idx] !== w) {
            missed.push(w);
            const key = `${w}_${fromLang}_${learningLang}`;
            statsManager.logMissedWord(key, "SentenceScramble");
            statsManager.logWordAttempt(key, false);
          }
        });
        setMissedWordsList(missed);
        statsManager.logGameResult("SentenceScramble", false);
      }
    }
  }, [selectedWords, originalWords, fromLang, learningLang]);

  const dir = ["he", "ar"].includes(learningLang) ? "rtl" : "ltr";

  return (
    <GamePage
      title="🔀 משחק סידור משפט"
      backgroundImage="/images/backgrounds/sentence-scramble.png"
    >
      <div
        className={`pt-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full max-w-screen-md mx-auto`}
        dir={dir}
      >
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full p-4 sm:p-6 lg:p-8 transition-transform ${
            isCorrectAnimation ? "animate-bounce" : ""
          }`}
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 text-center">
            סדר את המשפט
          </h1>
          <p className="mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center">
            בשפה: <span className="font-semibold">{learningLang.toUpperCase()}</span>  
            <br className="block sm:hidden" />
            הקש על המילים לפי הסדר הנכון. בהצלחה!
          </p>

          {/* חלק עליון: המשפט שבחר המשתמש */}
          <div
            className={`w-full min-h-[2.5rem] sm:min-h-[3rem] mb-4 border-2 ${
              ["he", "ar"].includes(learningLang) ? "text-right" : "text-left"
            } p-2 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-wrap gap-2 overflow-x-auto`}
            aria-label="המשפט הנבחר עד כה"
          >
            {selectedWords.length > 0 ? (
              selectedWords.map((w, idx) => (
                <button
                  key={`${w}-${idx}`}
                  onClick={() => onSelectedWordClick(idx)}
                  className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform hover:scale-105 text-sm sm:text-base"
                  aria-label={`הסר את המילה "${w}"`}
                >
                  {w}
                </button>
              ))
            ) : (
              <span className="text-gray-400 dark:text-gray-500 italic text-sm sm:text-base">
                כאן יוצגו המילים שבחרת לפי הסדר
              </span>
            )}
          </div>

          {/* כפתור “משחק חדש” */}
          <button
            onClick={() => {
              setFeedback(null);
              setMissedWordsList([]);
              initializeSentence();
            }}
            className="self-start mb-4 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm sm:text-base"
            aria-label="התחל משחק חדש"
          >
            🔄 משחק חדש
          </button>

          {/* חלק תחתון: מילים לערבוב */}
          <div
            className={`w-full mb-4 flex flex-wrap gap-2 justify-center ${
              ["he", "ar"].includes(learningLang) ? "flex-row-reverse" : "flex-row"
            } overflow-x-auto`}
            aria-label="רשימת המילים לערבוב"
          >
            {availableWords.map((w, idx) => (
              <button
                key={`${w}-${idx}`}
                onClick={() => onWordClick(w)}
                className="px-2 py-1 sm:px-3 sm:py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
                aria-label={`בחר את המילה "${w}"`}
              >
                {w}
              </button>
            ))}
          </div>

          {/* חיווי נכון/שגוי */}
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

          {/* פירוט מילים שנפספסו */}
          {missedWordsList.length > 0 && (
            <div className="w-full mb-4 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900 text-sm sm:text-base">
              <p className="text-gray-700 dark:text-gray-300 text-center">
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

          {/* Toast */}
          {showToast && <PopUpToast message={toastConfig.message} type={toastConfig.type} />}
        </div>
      </div>
    </GamePage>
  );
}
