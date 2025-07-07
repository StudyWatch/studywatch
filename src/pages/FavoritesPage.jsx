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
  ChevronsDown,
  ChevronsUp,
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
      if (neverPracticedOnly && word.lastPracticed !== t.favorites.general.neverPracticedLabel)
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
  const speak = (text, lang) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang;
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
    "from-teal-400 via-cyan-300 to-pink-300" // אותו צבע יפה תמיד
  )}
  dir={isRtl ? "rtl" : "ltr"}
>

      <div className="max-w-screen-xl mx-auto space-y-10 md:space-y-12">

        {/* Favorite Series Section */}
        <motion.section
className="space-y-6 backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl font-bold text-white flex items-center gap-3 justify-center"
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
            <Sparkles className="text-yellow-300" />
          </motion.h2>

          {savedSeries.length === 0 ? (
            <motion.div
              className="text-center py-6 backdrop-blur-lg bg-white/20 rounded-2xl border border-white/20"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="text-7xl opacity-70"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📺
              </motion.div>
              <p className="text-white/70 text-lg">
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
                        whileHover={{ scale: 1.1, y: -8 }}
                      >
                        <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
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
                    className="text-white/80 hover:bg-white/10"
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
            className="text-2xl font-bold text-white flex items-center gap-3 justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-3xl">📘</span>
            {t.favorites.wordsTitle.replace("{count}", filteredWords.length)}
            <BookOpen className="text-blue-300" />
          </motion.h2>

          {/* Search + Filters */}
          <motion.div
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-white" size={16} />
                <h3 className="text-sm font-bold text-white">{t.filters.allLevels}</h3>
              </div>
              <div className="relative w-full md:w-80">
  <input
    type="text"
    placeholder={t.search.placeholder}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full bg-white/20 placeholder-white/60 text-white px-4 py-2 pr-10 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
  />
  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none">
    🔍
  </span>
</div>

            </div>
            <div className="flex flex-wrap items-center gap-4">
              {/* Difficulty */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/80 font-medium">
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
                      className="text-xs px-2 py-1 bg-white/10 text-white border-white/20 data-[state=on]:bg-purple-500 data-[state=on]:text-white"
                    >
                      {t.filters[v] || v}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              {/* Success Rate */}
              <div className="flex items-center gap-2 min-w-[140px]">
                <span className="text-xs text-white/80 font-medium">
                  {t.filters.successBelowLabel} {successRateFilter}%
                </span>
                <div className="w-20">
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
              <div className="flex items-center space-x-1">
                <Checkbox
                  id="never-practiced"
                  checked={neverPracticedOnly}
                  onCheckedChange={setNeverPracticedOnly}
                  className="border-white/30 w-4 h-4"
                />
                <label
                  htmlFor="never-practiced"
                  className="text-xs text-white/90 cursor-pointer"
                >
                  {t.filters.neverPracticed}
                </label>
              </div>
              {/* With Notes */}
              <div className="flex items-center space-x-1">
                <Checkbox
                  id="with-notes"
                  checked={withNotesOnly}
                  onCheckedChange={setWithNotesOnly}
                  className="border-white/30 w-4 h-4"
                />
                <label
                  htmlFor="with-notes"
                  className="text-xs text-white/90 cursor-pointer"
                >
                  {t.filters.withNotes}
                </label>
              </div>
            </div>
          </motion.div>

          {/* Word Cards */}
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAllWords ? filteredWords : filteredWords.slice(0, 3)).map(
                (word, idx) => {
                  const diffColors = {
                    easy: "from-green-400 to-emerald-500",
                    medium: "from-yellow-400 to-orange-500",
                    hard: "from-red-400 to-pink-500",
                  }[word.difficulty];
                  const mastery =
                    word.successRate >= 80
                      ? {
                          emoji: "👑",
                          text: t.favorites.mastered,
                          color: "text-yellow-300",
                        }
                      : word.successRate >= 50
                      ? {
                          emoji: "📘",
                          text: t.favorites.intermediate,
                          color: "text-blue-300",
                        }
                      : {
                          emoji: "🌀",
                          text: t.favorites.review,
                          color: "text-orange-300",
                        };

                  return (
                    <motion.div
                      key={word.id}
                      className="bg-white/10 border border-white/20 rounded-lg p-4 shadow-lg"
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
                          <span
                            className={`${mastery.color} text-xs font-medium flex items-center gap-1`}
                          >
                            {mastery.emoji} {mastery.text}
                          </span>
                        </div>
                        <button
                          onClick={() => removeWord(word.id)}
                          className="bg-white/10 p-1 rounded-full text-white/60 hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Word + TTS */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <h3 className="text-lg font-bold text-white">
                            {word.sourceWord}
                          </h3>
                          <button
                            onClick={() => speak(word.sourceWord, lang)}
                            className="text-white/60 hover:text-blue-400 transition-colors"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-300 font-medium">
                            → {word.translation}
                          </span>
                          <button
                            onClick={() => speak(word.translation, lang)}
                            className="text-white/60 hover:text-blue-400 transition-colors"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Example Sentence */}
                      <p
                        dir="auto"
                        className="italic text-xs text-white/70 bg-white/10 p-2 rounded mb-2"
                      >
                        💬 {word.exampleSentence}
                      </p>

                      {/* Stats Row */}
                      <div className="flex justify-between text-xs text-white/80 mb-2">
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
                            <p className="text-xs text-white/80 bg-white/10 p-2 rounded border border-white/20 flex-1">
                              📝 {word.notes}
                            </p>
                          ) : (
                            <button
                              onClick={() => startEdit(word.id)}
                              className="text-xs text-white/60 hover:text-yellow-400 bg-white/10 p-2 rounded border border-white/20 transition-colors"
                            >
                              <Edit3 size={14} className="inline-block mr-1" />
                              {t.favorites.addNotes}
                            </button>
                          )}
                          {word.notes && (
                            <button
                              onClick={() => startEdit(word.id)}
                              className="text-white/60 p-1 rounded-full hover:bg-yellow-500/20 transition-colors"
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
                            className="w-full bg-white/10 border-white/20 text-white placeholder-white/60 text-xs"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => saveNote(word.id)}
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-xs px-3 py-1"
                            >
                              {t.notes.saveBtn}
                            </Button>
                            <Button
                              onClick={cancelEdit}
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-white hover:bg-white/10 text-xs px-3 py-1"
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
              <p className="text-white/70">{t.favorites.noWords}</p>
            </motion.div>
          )}

          {/* View All / Less Words */}
          {filteredWords.length > 3 && (
            <div className="text-center pt-2">
              <motion.button
  onClick={() => setShowAllWords(!showAllWords)}
  className="text-white font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/30 shadow-md"
  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  {showAllWords
    ? t.favorites.general.showLess || t.favorites.viewAllWords
    : t.favorites.viewAllWords.replace("{count}", filteredWords.length)}
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
            className="text-3xl font-bold text-white flex items-center gap-3 justify-center mb-6"
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
            <Gamepad2 className="text-emerald-300" />
          </motion.h2>

          {/* Count Selector */}
          <div className="flex gap-2 justify-center items-center mb-4">
            {gameOptions.map((opt) => (
              <Button
                key={opt}
                variant={selectedCount === opt ? "default" : "ghost"}
                onClick={() => setSelectedCount(opt)}
                disabled={wordsData.length < opt}
                className="text-white border-white/30"
              >
                {opt} {t.common.back /* replace with words label if needed */}
              </Button>
            ))}
          </div>

          {/* Play Button */}
          <Button
  onClick={handlePlay}
  disabled={wordsData.length < selectedCount}
  className={cn(
    "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-full text-md font-bold shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden",
    wordsData.length < selectedCount && "opacity-50 cursor-not-allowed"
  )}
>
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20"
    animate={{ x: ["-100%", "100%"] }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  />
  <div className="relative flex items-center gap-2 justify-center">
    <Sparkles className="text-white w-5 h-5" />
    {wordsData.length >= selectedCount
      ? t.games.start || "Play Now"
      : t.games.needMoreWords || "Add 5 words to play"}
  </div>
</Button>


          <motion.p
            className="text-white/80 text-lg font-semibold bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 inline-block"
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
            className="text-3xl font-bold text-white flex items-center gap-3 justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-4xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10,-10,0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              📊
            </motion.span>
            {t.favorites.general.checkProgress}
            <TrendingUp className="text-orange-300" />
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "📚",
                title: t.favorites.general.savedWords,
                value: wordsData.length.toString(),
                color: "from-blue-400 to-cyan-500",
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
                color: "from-green-400 to-emerald-500",
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
                color: "from-purple-400 to-pink-500",
                caption: t.favorites.general.avgProgress,
                icon: TrendingUp,
              },
              {
                emoji: "⏰",
                title: t.favorites.general.lastPracticedLabel,
                value: (() => {
                  const practiced = wordsData.filter(
                    (w) => w.lastPracticed !== t.favorites.general.neverPracticedLabel
                  );
                  if (!practiced.length) return t.favorites.general.neverPracticedLabel;
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
                color: "from-orange-400 to-red-500",
                caption: t.favorites.general.lastPracticedLabel,
                icon: Clock,
              },
            ].map((stat, idx) => (
              <motion.div
                key={stat.title}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center space-y-4 hover:bg-white/15 transition-all duration-300 shadow-2xl relative overflow-hidden"
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
                    <stat.icon className="text-white/60" size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-white/80 mb-2">
                    {stat.title}
                  </h3>
                  <motion.div
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-xs text-white/60 font-medium">
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
