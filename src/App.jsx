import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BotPage from "./pages/BotPage";
import FavoritesPage from "./pages/FavoritesPage";
import AllSeriesFavoritesPage from "./pages/AllSeriesFavoritesPage";
import AllWordsFavoritesPage from "./pages/AllWordsFavoritesPage";
import ReviewWordPage from "./pages/ReviewWordPage";
import NotesPage from "./pages/NotesPage";
import GameEndPage from "./pages/GameEndPage";
import TipsPage from "./pages/TipsPage";
import AccessibilityWidget from "./components/accessibility/AccessibilityWidget";

import { LanguageProvider } from "./context/LanguageContext";
import SettingsProvider, { useSettings } from "./context/SettingsContext.jsx";
import { I18nProvider, useTranslation } from "./context/I18nContext.jsx";
import { WordsProvider } from "./context/WordsContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SavedDataProvider } from "./context/SavedDataContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import UserPanel from "./components/UserPanel/UserPanel";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";

import "./components/accessibility/accessibility.css";

const PremiumPage = lazy(() => import("./pages/PremiumPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const BrowseSeriesPage = lazy(() => import("./pages/BrowseSeriesPage"));
const EpisodesPage = lazy(() => import("./pages/EpisodesPage"));
const GameMenuPage = lazy(() => import("./pages/GameMenuPage"));
const WordTreasureGame = lazy(() => import("./components/games/WordTreasureGame"));
const MemoryGame = lazy(() => import("./components/games/MemoryGame"));
const SentenceMatchGame = lazy(() => import("./components/games/SentenceMatchGame"));
const SentenceScrambleGame = lazy(() => import("./components/games/SentenceScrambleGame"));
const ListeningGame = lazy(() => import("./components/games/ListeningGame"));
const SynonymGame = lazy(() => import("./components/games/SynonymGame"));
const WritingGame = lazy(() => import("./components/games/WritingGame"));

function MaintenancePopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
      <div className="bg-yellow-300 text-black rounded-xl shadow-2xl max-w-2xl w-full p-10 relative border-4 border-yellow-500">
        <button
          className="absolute top-3 right-4 text-3xl font-bold text-gray-800 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center font-extrabold text-2xl md:text-3xl leading-relaxed">
          🚧 האתר בשיפוצים! 🚧
          <br />
          ייתכן שחלק מהפונקציות לא יעבדו כראוי.
          <br />
          תודה על הסבלנות 🙏
        </div>
      </div>
    </div>
  );
}

function InnerApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(true);
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();
  const { loading } = useAuth();

  useEffect(() => {
    document.documentElement.dir = ["he", "ar"].includes(settings.uiLang) ? "rtl" : "ltr";
  }, [settings.uiLang]);

  const isRtl = ["he", "ar"].includes(settings.uiLang);
  const direction = isRtl ? "rtl" : "ltr";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        {t("loading") || "טוען..."}
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans ${settings.darkMode ? "dark" : ""}`} dir={direction}>
      {showMaintenance && <MaintenancePopup onClose={() => setShowMaintenance(false)} />}
      <Header
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        menuOpen={menuOpen}
        onUserPanelToggle={() => setUserPanelOpen(true)}
        onLangChange={(langCode) => updateSetting("uiLang", langCode)}
      />

      <main className="pt-[56px] pb-8 w-full overflow-x-hidden">
        <Suspense fallback={<div className="text-center my-10 text-lg">⏳ {t("loading") || "Loading..."}</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/favorites/all-series" element={<AllSeriesFavoritesPage />} />
            <Route path="/favorites/all-words" element={<AllWordsFavoritesPage />} />
            <Route path="/review-word/:wordKey" element={<ReviewWordPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/series" element={<BrowseSeriesPage />} />
            <Route path="/episodes/:seriesId" element={<EpisodesPage />} />
            <Route path="/bot" element={<BotPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/games" element={<GameMenuPage />} />
            <Route path="/games/word-treasure" element={<WordTreasureGame />} />
            <Route path="/games/memory" element={<MemoryGame />} />
            <Route path="/games/sentence-match" element={<SentenceMatchGame />} />
            <Route path="/games/sentence-scramble" element={<SentenceScrambleGame />} />
            <Route path="/games/listening" element={<ListeningGame />} />
            <Route path="/games/synonyms" element={<SynonymGame />} />
            <Route path="/games/writing" element={<WritingGame />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/game-end" element={<GameEndPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      {userPanelOpen && <UserPanel onClose={() => setUserPanelOpen(false)} />}
      <AccessibilityWidget />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <I18nProvider>
          <WordsProvider>
            <AuthProvider>
              <SavedDataProvider>
                <FavoritesProvider>
                  <ErrorBoundary>
                    <InnerApp />
                  </ErrorBoundary>
                </FavoritesProvider>
              </SavedDataProvider>
            </AuthProvider>
          </WordsProvider>
        </I18nProvider>
      </SettingsProvider>
    </LanguageProvider>
  );
}
