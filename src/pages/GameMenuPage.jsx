import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { WordsContext } from "../context/WordsContext";
import GameCard from "../components/games/GameCard";

export default function GameMenuPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { wordFavorites } = useContext(FavoritesContext);
  const { words: contextWords } = useContext(WordsContext);

  const passedWords = location.state?.words;
  const [words, setWords] = useState([]);

  useEffect(() => {
    let selectedWords = [];

    if (Array.isArray(passedWords) && passedWords.length > 0) {
      selectedWords = passedWords;
    } else if (Array.isArray(contextWords) && contextWords.length > 0) {
      selectedWords = contextWords;
    } else {
      selectedWords = wordFavorites;
    }

    const fixedWords = selectedWords.map((w) => {
      const fromLang = w.fromLang || "en";
      const learningLang = w.learningLang || "he";

      const displayFrom = w.displayFrom || w.word || "";
      const displayTo =
        w.displayTo ||
        (w.translations?.[learningLang]
          ? w.translations[learningLang]
          : w.word || "");

      const displaySentence =
        w.displaySentence ||
        (typeof w.sentence === "object"
          ? w.sentence[learningLang] || ""
          : w.sentence || "");

      const key =
        w.key ||
        `${w.seriesId || "unknown"}_${w.season || 1}_${
          w.episode || 1
        }_${w.difficulty || "easy"}_${w.word}`;

      return {
        key,
        word: w.word,
        fromLang,
        learningLang,
        displayFrom,
        displayTo,
        displaySentence,
        translations: w.translations || {},
        sentences: w.sentences || {},
        seriesId: w.seriesId,
        season: w.season,
        episode: w.episode,
        difficulty: w.difficulty,
      };
    });

    setWords(fixedWords);
  }, [passedWords, contextWords, wordFavorites]);

  if (!words || words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white pt-28 px-4 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">🎮 בחר משחק</h1>
        <p className="text-gray-500 text-lg">אין מילים זמינות לשחק איתן.</p>
      </div>
    );
  }

  const sourceLang = words[0]?.fromLang || "en";
  const targetLang = words[0]?.learningLang || "he";

  const games = [
    {
      id: "word-treasure",
      title: "Word Treasure",
      description: "גלגל המזל – למד מילים בצורה כיפית וחזותית",
      image: "/images/backgrounds/word-treasure.png",
      route: "/games/word-treasure",
      bgColor: "from-yellow-200 to-yellow-400",
      iconColor: "text-yellow-600",
    },
    {
      id: "memory-game",
      title: "Memory Game",
      description: "זכרו מילים ותרגומים – אתגרו את המוח",
      image: "/images/backgrounds/memory-game.png",
      route: "/games/memory",
      bgColor: "from-red-200 to-red-400",
      iconColor: "text-red-600",
    },
    {
      id: "sentence-match",
      title: "Sentence Match",
      description: "התאם מילים למשפטים המתאימים להן",
      image: "/images/backgrounds/sentence-match.png",
      route: "/games/sentence-match",
      bgColor: "from-green-200 to-green-400",
      iconColor: "text-green-600",
    },
    {
      id: "sentence-scramble",
      title: "Sentence Scramble",
      description: "סדר את המשפט – גרור מילים למיקום הנכון",
      image: "/images/backgrounds/sentence-scramble.png",
      route: "/games/sentence-scramble",
      bgColor: "from-blue-200 to-blue-400",
      iconColor: "text-blue-600",
    },
    {
      id: "listening-game",
      title: "Listening Game",
      description: "הקלד מה ששמעת – שפר את ההבנה הקולית שלך",
      image: "/images/backgrounds/listening-game.png",
      route: "/games/listening",
      bgColor: "from-indigo-200 to-indigo-400",
      iconColor: "text-indigo-600",
    },
    {
      id: "synonym-game",
      title: "Synonym Challenge",
      description: "מצא את המילה הנרדפת הנכונה",
      image: "/images/backgrounds/synonym-game.png",
      route: "/games/synonyms",
      bgColor: "from-purple-200 to-purple-400",
      iconColor: "text-purple-600",
    },
    {
      id: "writing-game",
      title: "Writing Game",
      description: "כתוב משפטים ובדוק אם הם נכונים דקדוקית",
      image: "/images/backgrounds/writing-game.png",
      route: "/games/writing",
      bgColor: "from-pink-200 to-pink-400",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 pt-28 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-900 mb-8 drop-shadow-lg">
          🎮 Let's Play!
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-white border border-indigo-300 text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 shadow-md transition"
          >
            ← חזור לאוצר המילים
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              bgGradient={game.bgColor}
              iconColor={game.iconColor}
              onClick={() => {
                navigate(game.route, {
                  state: {
                    words,
                    sourceLang,
                    targetLang,
                  },
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
