// src/components/games/SynonymGame.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GamePage from "../../pages/GamePage";
import statsManager from "../../utils/statsManager";
import PopUpToast from "../PopUpToast";

export default function SynonymGame() {
  const navigate = useNavigate();
  const location = useLocation();
const [synonymsData, setSynonymsData] = useState({});

useEffect(() => {
  fetch("/data/synonyms.json")
    .then((res) => res.json())
    .then((data) => setSynonymsData(data))
    .catch((err) => {
      console.error("Failed to load synonyms:", err);
      navigate("/games");
    });
}, []);

  // 1. קבלת המילים: מ־location.state או מ־context
  const wordsFromState = location.state?.words;
  const words =
    Array.isArray(wordsFromState) && wordsFromState.length > 0
      ? wordsFromState
      : [];

  // אם אין מילים – redirect
  useEffect(() => {
    if (!words || words.length === 0) {
      navigate("/games");
      return;
    }
  }, [words, navigate]);

  // 2. שפות
  const learningLang =
    location.state?.targetLang || words[0]?.learningLang || "he";
  const fromLang = location.state?.sourceLang || words[0]?.fromLang || "en";

  const [hardWordsWithSyns, setHardWordsWithSyns] = useState([]);
  const [randomWord, setRandomWord] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [missedWordsList, setMissedWordsList] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [score, setScore] = useState(0);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    // סינון מילים קשות שיש להן סינונימים בהתאם ל־displayTo
    const hard = words.filter((w) => {
      const key = w.displayTo || w.word;
      return w.difficulty === "hard" && synonymsData[key];
    });

    if (hard.length === 0) {
      navigate("/games");
      return;
    }

    setHardWordsWithSyns(hard);
    statsManager.updateDailyActivity(); // עדכון יומי
  }, [words, learningLang, navigate]);

  useEffect(() => {
    if (hardWordsWithSyns.length > 0) {
      loadNewWord();
    }
  }, [hardWordsWithSyns]);

  function showToastMessage(message, type = "info") {
    setToastConfig({ message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  function loadNewWord() {
    if (hardWordsWithSyns.length === 0) {
      return showToastMessage(
        "אין מספיק מילים רמת קשה עם סינונימים.",
        "error"
      );
    }

    const idx = Math.floor(Math.random() * hardWordsWithSyns.length);
    const chosenObj = hardWordsWithSyns[idx];
    const key = chosenObj.displayTo || chosenObj.word;
    setRandomWord(key);

    const synsList = synonymsData[key] || [];
    const correctSynonym =
      synsList[Math.floor(Math.random() * synsList.length)];

    const allHardKeys = hardWordsWithSyns.map(
      (w) => w.displayTo || w.word
    );
    const distractors = [];
    while (distractors.length < 3) {
      const candidate =
        allHardKeys[Math.floor(Math.random() * allHardKeys.length)];
      if (
        candidate !== key &&
        !synsList.includes(candidate) &&
        !distractors.includes(candidate)
      ) {
        distractors.push(candidate);
      }
    }

    const rawOptions = [
      { content: correctSynonym, correct: true },
      ...distractors.map((w) => ({ content: w, correct: false }))
    ];
    setOptions(shuffle(rawOptions));
    setFeedback(null);
    setMissedWordsList([]);
  }

  function handleAnswer(option) {
    if (feedback) return;
    const isCorrect = option.correct;
    const keyStat = `${randomWord}_${fromLang}_${learningLang}`;
    statsManager.logWordAttempt(keyStat, isCorrect);

    if (isCorrect) {
      setFeedback({ message: "✅ נכון!", type: "success" });
      setScore((p) => p + 10);
      statsManager.logWordLearned(keyStat, "SynonymGame");
      statsManager.logGameResult("SynonymGame", true);
    } else {
      setFeedback({
        message: `❌ לא נכון. מילה נרדפת נכונה היא: "${synonymsData[randomWord].join(
          ", "
        )}"`,
        type: "error"
      });
      setMissedWordsList([randomWord]);
      statsManager.logMissedWord(keyStat, "SynonymGame");
      statsManager.logGameResult("SynonymGame", false);
    }

    setTimeout(() => {
      setFeedback(null);
      loadNewWord();
    }, 1000);
  }

  const dir = ["he", "ar"].includes(learningLang) ? "rtl" : "ltr";

  return (
    <GamePage
      title="🔍 אתגר מילים נרדפות"
      backgroundImage="/images/backgrounds/synonym-game.png"
    >
      <div className="flex flex-col items-center gap-6 mt-8 w-full px-4 max-w-screen-md mx-auto" dir={dir}>
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 text-center">
          מצא מילה נרדפת ל־"{randomWord}"
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-md">
          {options.map((opt, idx) => {
            const base = "py-3 px-6 rounded-xl font-bold text-lg w-full transition-all shadow-md ";
            let style = "";
            if (feedback) {
              if (!opt.correct && opt.content === missedWordsList[0]) {
                style = "bg-red-500 text-white animate-shake";
              } else {
                style = "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
              }
            } else {
              style = "bg-blue-100 hover:bg-blue-200 text-blue-700 dark:text-blue-300";
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className={base + style}
              >
                {opt.content}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div
            className={`w-full max-w-md mt-6 p-3 rounded-lg text-center ${
              feedback.type === "success"
                ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
            } text-sm sm:text-base`}
            aria-live="polite"
          >
            {feedback.message}
          </div>
        )}

        <div className="mt-8 text-lg text-gray-700 dark:text-gray-300">
          ניקוד:{" "}
          <span className="font-bold text-blue-700 dark:text-blue-300">{score}</span>
        </div>

        {showToast && <PopUpToast message={toastConfig.message} type={toastConfig.type} />}
      </div>
    </GamePage>
  );
}
