// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useSavedData } from "../context/SavedDataContext";
import { useSettings } from "../context/SettingsContext";

// Animation
import { motion } from "framer-motion";

// UI Components
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { Textarea } from "../components/ui/textarea";

// Icons
import {
  X,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
  BookOpen,
  Gamepad2,
  Filter,
  Volume2,
  Edit3,
} from "lucide-react";

// Date helpers
import { formatDistanceToNow } from "date-fns";
import heLocale from "date-fns/locale/he";

// Stats
import useStats from "../hooks/useStats";
import statsManager from "../utils/statsManager";

// Utility
import { cn } from "../lib/utils";

// Translations
import en from "../i18n/en.json";
import he from "../i18n/he.json";
import es from "../i18n/es.json";
import ar from "../i18n/ar.json";
import ru from "../i18n/ru.json";

const locales = { en, he, es, ar, ru };

export default function FavoritesPage() {
  const { savedSeries, removeSeries, savedWords, removeWord } = useSavedData();
  const [seriesList, setSeriesList] = useState([]);
  const navigate = useNavigate();
  const { settings } = useSettings();
  const lang = settings.uiLang;
  const t = locales[lang] || locales.en;
  const isRtl = ["he", "ar"].includes(lang);

  // toggles & game options
  const [showAllSeries, setShowAllSeries] = useState(false);
  const [showAllWords, setShowAllWords] = useState(false);
  const [selectedCount, setSelectedCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const gameOptions = [5, 10, 15];

  // load series metadata
  useEffect(() => {
    fetch("/data/seriesList.json")
      .then((r) => r.json())
      .then(setSeriesList)
      .catch(console.error);
  }, []);

  const findSeries = (id) =>
    seriesList.find((s) => s.id === id) || { id, name: {}, coverImage: "" };

  // notes editor
  const [editingKey, setEditingKey] = useState(null);
  const [tempNotes, setTempNotes] = useState({});

  const startEdit = (key) => {
    setTempNotes((n) => ({
      ...n,
      [key]: localStorage.getItem(`note_${key}`) || "",
    }));
    setEditingKey(key);
  };
  const saveNote = (key) => {
    localStorage.setItem(`note_${key}`, tempNotes[key] || "");
    setEditingKey(null);
  };
  const cancelEdit = () => setEditingKey(null);

  // re-render on stats change
  useStats();

  // prepare words data
  const wordsData = savedWords.map((w) => {
    const info = statsManager.getWordProgress(w.key);
    const exp = w.practicedEpisodes || 0;
    const tot = w.totalEpisodes || 10;
    return {
      id: w.key,
      sourceWord: w.displayFrom,
      translation: w.displayTo,
      difficulty: w.difficulty,
      attempts: info.attempts || 0,
      correct: info.correct || 0,
      successRate: info.successRate || 0,
      exposed: exp,
      total: tot,
      exposureRate: tot ? Math.min(100, Math.round((exp / tot) * 100)) : 0,
      lastPracticed: info.lastAttemptDate
        ? formatDistanceToNow(new Date(info.lastAttemptDate), {
            addSuffix: true,
            locale: lang === "he" ? heLocale : undefined,
          })
        : t.favorites.general.neverPracticedLabel,
      notes: localStorage.getItem(`note_${w.key}`) || "",
      exampleSentence:
        typeof w.displaySentence === "string"
          ? w.displaySentence
          : w.displaySentence?.[lang] ||
            w.displaySentence?.en ||
            "—",
    };
  });

  // filters
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [successRateFilter, setSuccessRateFilter] = useState(100);
  const [neverPracticedOnly, setNeverPracticedOnly] = useState(false);
  const [withNotesOnly, setWithNotesOnly] = useState(false);

  const filteredWords = wordsData
    .filter((word) => {
      if (difficultyFilter !== "all" && word.difficulty !== difficultyFilter)
        return false;
      if (word.successRate >= successRateFilter) return false;
      if (
        neverPracticedOnly &&
        word.lastPracticed !== t.favorites.general.neverPracticedLabel
      )
        return false;
      if (withNotesOnly && !word.notes) return false;
      return true;
    })
    .filter(
      (word) =>
        word.sourceWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // speech synthesis
  const speak = (text, langCode) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = langCode;
    window.speechSynthesis.speak(msg);
  };

  // play logic
  const handlePlay = () => {
    const sorted = [...wordsData].sort((a, b) => a.successRate - b.successRate);
    let selected = [];

    if (sorted.length <= selectedCount) {
      selected = sorted;
    } else {
      const threshold = sorted[selectedCount - 1].successRate;
      const below = sorted.filter((w) => w.successRate < threshold);
      const same = sorted.filter((w) => w.successRate === threshold);
      const needed = selectedCount - below.length;
      const shuffled = [...same].sort(() => 0.5 - Math.random());
      selected = [...below, ...shuffled.slice(0, needed)];
    }

    const chosen = selected
      .map((wd) => savedWords.find((w) => w.key === wd.id))
      .filter(Boolean);

    navigate("/games", {
      state: {
        words: chosen,
        sourceLang: settings.sourceLang,
        targetLang: settings.learningLang,
      },
    });
  };

  return (
    <div
      className={cn(
        "min-h-screen p-6 bg-gradient-to-br",
        // ☀️ Light: פסטלי עדין; 🌙 Dark: טורקיז עמוק (נשאר כמו שאהבת)
        "from-violet-50 via-sky-50 to-emerald-50",
        "dark:from-teal-900 dark:via-cyan-900 dark:to-sky-900"
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-screen-xl mx-auto space-y-10 md:space-y-12">
        {/* Favorite Series Section */}
        <motion.section
          className={cn(
            "space-y-6 rounded-2xl p-4 md:p-6 shadow-xl border transition-colors",
            // Light surface
            "bg-white/90 border-gray-200",
            // Dark glass
            "dark:bg-white/10 dark:border-white/20 dark:backdrop-blur-lg"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📺
            </motion.span>
            {t.favorites.seriesTitle}
            <Sparkles className="text-yellow-500 dark:text-yellow-300" />
          </motion.h2>

          {savedSeries.length === 0 ? (
            <motion.div
              className={cn(
                "text-center py-6 rounded-2xl border",
                "bg-white/80 border-gray-200",
                "dark:bg-white/15 dark:border-white/20 dark:backdrop-blur"
              )}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="text-7xl opacity-70"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📺
              </motion.div>
              <p className="text-gray-700 dark:text-white/70 text-lg">
                {t.favorites.noSeries}
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-center gap-4 flex-wrap">
                {(showAllSeries ? savedSeries : savedSeries.slice(0, 3)).map(
                  (id, idx) => {
                    const s = findSeries(id);
                    const name = s.name?.[lang] || s.name.en;
                    return (
                      <motion.div
                        key={id}
                        onClick={() => navigate(`/episodes/${id}`)}
                        className="cursor-pointer relative group"
                        initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ delay: 0.3 + idx * 0.15, duration: 0.6 }}
                        whileHover={{ scale: 1.08, y: -6 }}
                      >
                        <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-gray-200/60 dark:ring-white/20 group-hover:ring-gray-300 dark:group-hover:ring-white/40 transition-all duration-300 bg-white">
                          <img
                            src={s.coverImage || s.image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end">
                            <p className="text-white text-xs font-bold p-2 w-full text-center">
                              {name}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSeries(id);
                          }}
                          className="absolute -top-3 -right-3 z-10 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-all"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      </motion.div>
                    );
                  }
                )}
              </div>
              {savedSeries.length > 3 && (
                <div className="text-center">
                  <Button
                    onClick={() => setShowAllSeries(!showAllSeries)}
                    variant="ghost"
                    className="text-gray-700 hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/10"
                  >
                    {showAllSeries
                      ? t.favorites.general.showLess || t.favorites.viewAllSeries
                      : t.favorites.viewAllSeries.replace(
                          "{count}",
                          savedSeries.length
                        )}
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.section>

        {/* Saved Words Section */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-3xl">📘</span>
            {t.favorites.wordsTitle.replace("{count}", filteredWords.length)}
            <BookOpen className="text-blue-600 dark:text-blue-300" />
          </motion.h2>

          {/* Search + Filters */}
          <motion.div
            className={cn(
              "rounded-xl p-4 shadow-lg space-y-4 border",
              "bg-white/90 border-gray-200",
              "dark:bg-white/10 dark:border-white/20 dark:backdrop-blur-lg"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-700 dark:text-white" size={16} />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {t.filters.allLevels}
                </h3>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder={t.search.placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full px-4 py-2 rounded-md border transition-all duration-200",
                    "bg-white text-gray-800 placeholder-gray-400 border-gray-300 focus:ring-2 focus:ring-purple-400",
                    "dark:bg-white/10 dark:text-white dark:placeholder-white/60 dark:border-white/30"
                  )}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/60 pointer-events-none">
                  🔍
                </span>
              </div>
            </div>

            {/* Filters row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Difficulty */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-700 dark:text-white/80 font-medium">
                  {t.filters.allLevels.replace("All Levels", "Difficulty")}
                </span>
                <ToggleGroup
                  type="single"
                  value={difficultyFilter}
                  onValueChange={(v) => v && setDifficultyFilter(v)}
                  className="gap-1"
                >
                  {["all", "easy", "medium", "hard"].map((v) => (
                    <ToggleGroupItem
                      key={v}
                      value={v}
                      size="sm"
                      className={cn(
                        "text-xs px-2 py-1 border rounded-md",
                        "bg-white text-gray-700 border-gray-300 data-[state=on]:bg-purple-600 data-[state=on]:text-white",
                        "dark:bg-white/10 dark:text-white dark:border-white/20 dark:data-[state=on]:bg-purple-500"
                      )}
                    >
                      {t.filters[v] || v}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              {/* Success Rate */}
              <div className="flex items-center gap-2 min-w-[160px]">
                <span className="text-xs text-gray-700 dark:text-white/80 font-medium">
                  {t.filters.successBelowLabel} {successRateFilter}%
                </span>
                <div className="w-24">
                  <Slider
                    value={[successRateFilter]}
                    onValueChange={(vals) => setSuccessRateFilter(vals[0])}
                    max={101}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Never Practiced */}
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  id="never-practiced"
                  checked={neverPracticedOnly}
                  onCheckedChange={setNeverPracticedOnly}
                  className="border-gray-300 dark:border-white/30 w-4 h-4"
                />
                <span className="text-xs text-gray-800 dark:text-white/90">
                  {t.filters.neverPracticed}
                </span>
              </label>

              {/* With Notes */}
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  id="with-notes"
                  checked={withNotesOnly}
                  onCheckedChange={setWithNotesOnly}
                  className="border-gray-300 dark:border-white/30 w-4 h-4"
                />
                <span className="text-xs text-gray-800 dark:text-white/90">
                  {t.filters.withNotes}
                </span>
              </label>
            </div>
          </motion.div>

          {/* Word Cards */}
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAllWords ? filteredWords : filteredWords.slice(0, 3)).map(
                (word, idx) => {
                  const diffColors = {
                    easy: "from-green-500 to-emerald-600",
                    medium: "from-yellow-500 to-orange-600",
                    hard: "from-red-500 to-pink-600",
                  }[word.difficulty];
                  const mastery =
                    word.successRate >= 80
                      ? {
                          emoji: "👑",
                          text: t.favorites.mastered,
                          color: "text-yellow-600 dark:text-yellow-300",
                        }
                      : word.successRate >= 50
                      ? {
                          emoji: "📘",
                          text: t.favorites.intermediate,
                          color: "text-blue-600 dark:text-blue-300",
                        }
                      : {
                          emoji: "🌀",
                          text: t.favorites.review,
                          color: "text-orange-600 dark:text-orange-300",
                        };

                  return (
                    <motion.div
                      key={word.id}
                      className={cn(
                        "rounded-lg p-4 shadow-lg border transition",
                        "bg-white/95 border-gray-200",
                        "dark:bg-white/10 dark:border-white/20 dark:backdrop-blur"
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${diffColors} text-white`}
                          >
                            {t.difficulty[word.difficulty]}
                          </span>
                          <span className={`${mastery.color} text-xs font-medium flex items-center gap-1`}>
                            {mastery.emoji} {mastery.text}
                          </span>
                        </div>
                        <button
                          onClick={() => removeWord(word.id)}
                          className="bg-gray-100 text-gray-600 p-1 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors dark:bg-white/10 dark:text-white/60 dark:hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Word + TTS */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {word.sourceWord}
                          </h3>
                          <button
                            onClick={() => speak(word.sourceWord, lang)}
                            className="text-gray-600 hover:text-blue-600 transition-colors dark:text-white/60 dark:hover:text-blue-400"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sky-700 dark:text-cyan-300">
                            → {word.translation}
                          </span>
                          <button
                            onClick={() => speak(word.translation, lang)}
                            className="text-gray-600 hover:text-blue-600 transition-colors dark:text-white/60 dark:hover:text-blue-400"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Example Sentence */}
                      <p
                        dir="auto"
                        className="italic text-xs text-gray-700 bg-gray-50 p-2 rounded mb-2 border border-gray-200 dark:text-white/70 dark:bg-white/10 dark:border-white/20"
                      >
                        💬 {word.exampleSentence}
                      </p>

                      {/* Stats Row */}
                      <div className="flex justify-between text-xs text-gray-700 dark:text-white/80 mb-2">
                        <span>
                          🎯 {word.correct}/{word.attempts} ({word.successRate}
                          %)
                        </span>
                        <span>
                          📚 {word.exposed}/{word.total} ({word.exposureRate}
                          %)
                        </span>
                        <span>⏰ {word.lastPracticed}</span>
                      </div>

                      {/* Notes / Edit */}
                      {!editingKey || editingKey !== word.id ? (
                        <div className="flex items-center justify-between">
                          {word.notes ? (
                            <p className="text-xs text-gray-800 bg-gray-50 p-2 rounded border border-gray-200 flex-1 dark:text-white/80 dark:bg-white/10 dark:border-white/20">
                              📝 {word.notes}
                            </p>
                          ) : (
                            <button
                              onClick={() => startEdit(word.id)}
                              className="text-xs text-gray-700 hover:text-yellow-600 bg-gray-50 p-2 rounded border border-gray-200 transition-colors dark:text-white/60 dark:hover:text-yellow-400 dark:bg-white/10 dark:border-white/20"
                            >
                              <Edit3 size={14} className="inline-block mr-1" />
                              {t.favorites.addNotes}
                            </button>
                          )}
                          {word.notes && (
                            <button
                              onClick={() => startEdit(word.id)}
                              className="text-gray-600 p-1 rounded-full hover:bg-yellow-100 transition-colors dark:text-white/60 dark:hover:bg-yellow-500/20"
                            >
                              <Edit3 size={14} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2 mb-2">
                          <Textarea
                            value={tempNotes[word.id] || ""}
                            onChange={(e) =>
                              setTempNotes((n) => ({
                                ...n,
                                [word.id]: e.target.value,
                              }))
                            }
                            placeholder={t.notes.placeholder.replace(
                              "{{word}}",
                              word.sourceWord
                            )}
                            className="w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 text-xs dark:bg-white/10 dark:border-white/20 dark:text-white"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => saveNote(word.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
                            >
                              {t.notes.saveBtn}
                            </Button>
                            <Button
                              onClick={cancelEdit}
                              variant="outline"
                              size="sm"
                              className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs px-3 py-1 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                            >
                              {t.common.back}
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                }
              )}
            </div>
          ) : (
            <motion.div className="text-center py-6" whileHover={{ scale: 1.02 }}>
              <p className="text-gray-700 dark:text-white/70">{t.favorites.noWords}</p>
            </motion.div>
          )}

          {/* View All / Less Words */}
          {filteredWords.length > 3 && (
            <div className="text-center pt-2">
              <motion.button
                onClick={() => setShowAllWords(!showAllWords)}
                className={cn(
                  "font-bold px-4 py-2 rounded-full shadow-md border",
                  "text-gray-800 bg-white hover:bg-gray-100 border-gray-300",
                  "dark:text-white dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/30"
                )}
                animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {showAllWords
                  ? t.favorites.general.showLess || t.favorites.viewAllWords
                  : t.favorites.viewAllWords.replace(
                      "{count}",
                      filteredWords.length
                    )}
              </motion.button>
            </div>
          )}
        </motion.section>

        {/* Play Games Button */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3 justify-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎮
            </motion.span>
            {t.favorites.playWithWords.replace("{count}", selectedCount)}
            <Gamepad2 className="text-emerald-700 dark:text-emerald-300" />
          </motion.h2>

          {/* Count Selector */}
          <div className="flex gap-2 justify-center items-center mb-4">
            {gameOptions.map((opt) => (
              <Button
                key={opt}
                variant={selectedCount === opt ? "default" : "outline"}
                onClick={() => setSelectedCount(opt)}
                disabled={wordsData.length < opt}
                className={cn(
                  "px-3",
                  selectedCount === opt
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
                  "dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                )}
              >
                {opt}
              </Button>
            ))}
          </div>

          {/* Play Button */}
          <Button
            onClick={handlePlay}
            disabled={wordsData.length < selectedCount}
            className={cn(
              "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-full text-md font-bold shadow-2xl border border-emerald-700/30 relative overflow-hidden",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/0 to-white/10"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative flex items-center gap-2 justify-center">
              <Sparkles className="w-5 h-5" />
              {wordsData.length >= selectedCount
                ? t.games.start || "Play Now"
                : t.games.needMoreWords || "Add 5 words to play"}
            </div>
          </Button>

          <motion.p
            className="text-gray-800 dark:text-white/80 text-lg font-semibold bg-white/80 dark:bg-white/10 rounded-full px-6 py-2 border border-gray-200 dark:border-white/20 inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {t.favorites.general.savedWords}: {wordsData.length}
          </motion.p>
        </motion.div>

        {/* Statistics Section */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3 justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-4xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              📊
            </motion.span>
            {t.favorites.general.checkProgress}
            <TrendingUp className="text-orange-600 dark:text-orange-300" />
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "📚",
                title: t.favorites.general.savedWords,
                value: wordsData.length.toString(),
                color: "from-blue-500 to-cyan-600",
                caption: t.favorites.general.avgProgress,
                icon: BookOpen,
              },
              {
                emoji: "🎯",
                title: t.favorites.general.avgSuccess,
                value:
                  wordsData.length > 0
                    ? `${Math.round(
                        wordsData.reduce((s, w) => s + w.successRate, 0) /
                          wordsData.length
                      )}%`
                    : "—",
                color: "from-green-500 to-emerald-600",
                caption: t.favorites.general.avgSuccess,
                icon: Target,
              },
              {
                emoji: "📈",
                title: t.favorites.general.avgProgress,
                value:
                  wordsData.length > 0
                    ? `${Math.round(
                        wordsData.reduce(
                          (s, w) => s + (w.exposureRate + w.successRate) / 2,
                          0
                        ) / wordsData.length
                      )}%`
                    : "—",
                color: "from-purple-500 to-pink-600",
                caption: t.favorites.general.avgProgress,
                icon: TrendingUp,
              },
              {
                emoji: "⏰",
                title: t.favorites.general.lastPracticedLabel,
                value: (() => {
                  const practiced = wordsData.filter(
                    (w) =>
                      w.lastPracticed !==
                      t.favorites.general.neverPracticedLabel
                  );
                  if (!practiced.length)
                    return t.favorites.general.neverPracticedLabel;
                  return practiced.reduce((prev, w) =>
                    prev.lastPracticed.includes("hour")
                      ? prev
                      : w.lastPracticed.includes("hour")
                      ? w
                      : parseInt(w.lastPracticed) < parseInt(prev.lastPracticed)
                      ? w
                      : prev
                  ).lastPracticed;
                })(),
                color: "from-orange-500 to-red-600",
                caption: t.favorites.general.lastPracticedLabel,
                icon: Clock,
              },
            ].map((stat, idx) => (
              <motion.div
                key={stat.title}
                className={cn(
                  "rounded-2xl p-6 text-center space-y-4 shadow-2xl border relative overflow-hidden transition-all",
                  "bg-white/90 border-gray-200 hover:bg-white",
                  "dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/15 dark:backdrop-blur-xl"
                )}
                initial={{ opacity: 0, y: 20, rotateY: -90 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 1.1 + idx * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <motion.span
                      className="text-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                    >
                      {stat.emoji}
                    </motion.span>
                    <stat.icon className="text-gray-700 dark:text-white/60" size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white/80 mb-2">
                    {stat.title}
                  </h3>
                  <motion.div
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-xs text-gray-600 dark:text-white/60 font-medium">
                    {stat.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
