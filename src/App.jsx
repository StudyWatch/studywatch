// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage                        from "./pages/HomePage";
import BotPage                         from "./pages/BotPage";
import FavoritesPage                   from "./pages/FavoritesPage";
import AllSeriesFavoritesPage          from "./pages/AllSeriesFavoritesPage";
import AllWordsFavoritesPage           from "./pages/AllWordsFavoritesPage";
import ReviewWordPage                  from "./pages/ReviewWordPage";
import NotesPage                       from "./pages/NotesPage";
import GameEndPage                     from "./pages/GameEndPage";
import TipsPage                        from "./pages/TipsPage";
import AccessibilityWidget             from "./components/accessibility/AccessibilityWidget";

import { LanguageProvider }            from "./context/LanguageContext";
import SettingsProvider, { useSettings } from "./context/SettingsContext";
import { I18nProvider, useTranslation } from "./context/I18nContext";
import { WordsProvider }               from "./context/WordsContext";
import { AuthProvider, useAuth }       from "./context/AuthContext";
import { SavedDataProvider }           from "./context/SavedDataContext";
import { FavoritesProvider }           from "./context/FavoritesContext";

import UserPanel                       from "./components/UserPanel/UserPanel";
import Header                          from "./components/Header";
import ErrorBoundary                   from "./components/ErrorBoundary";

import "./components/accessibility/accessibility.css";

// Lazy-load pages
const PremiumPage        = lazy(() => import("./pages/PremiumPage"));
const LoginPage          = lazy(() => import("./pages/LoginPage"));
const RegisterPage       = lazy(() => import("./pages/RegisterPage"));
const BrowseSeriesPage   = lazy(() => import("./pages/BrowseSeriesPage"));
const EpisodesPage       = lazy(() => import("./pages/EpisodesPage"));
const GameMenuPage       = lazy(() => import("./pages/GameMenuPage"));
const WordTreasureGame   = lazy(() => import("./components/games/WordTreasureGame"));
const MemoryGame         = lazy(() => import("./components/games/MemoryGame"));
const SentenceMatchGame  = lazy(() => import("./components/games/SentenceMatchGame"));
const SentenceScrambleGame = lazy(() => import("./components/games/SentenceScrambleGame"));
const ListeningGame      = lazy(() => import("./components/games/ListeningGame"));
const SynonymGame        = lazy(() => import("./components/games/SynonymGame"));
const WritingGame        = lazy(() => import("./components/games/WritingGame"));
const CategoriesPage     = lazy(() => import("./pages/CategoriesPage"));
const CategoryDetailPage = lazy(() => import("./pages/CategoryDetailPage"));

function MaintenancePopup({ onClose, lang }) {
  const messages = {
    he: {
      title: "🚧 האתר בשיפוצים! 🚧",
      line1: "ייתכן שחלק מהפונקציות לא יעבדו כראוי.",
      line2: "תודה על הסבלנות 🙏",
    },
    en: {
      title: "🚧 The site is under maintenance! 🚧",
      line1: "Some features may not work properly.",
      line2: "Thanks for your patience 🙏",
    },
    ar: {
      title: "🚧 الموقع تحت الصيانة! 🚧",
      line1: "قد لا تعمل بعض الوظائف بشكل صحيح.",
      line2: "شكرًا على صبرك 🙏",
    },
    ru: {
      title: "🚧 Сайт на техническом обслуживании! 🚧",
      line1: "Некоторые функции могут работать некорректно.",
      line2: "Спасибо за ваше терпение 🙏",
    },
    es: {
      title: "🚧 ¡El sitio está en mantenimiento! 🚧",
      line1: "Es posible que algunas funciones no funcionen correctamente.",
      line2: "Gracias por tu paciencia 🙏",
    },
  };

  const { title, line1, line2 } = messages[lang] || messages.en;

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
          {title}
          <br />
          {line1}
          <br />
          {line2}
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

  useEffect(() => {
    const savedLang = localStorage.getItem("uiLang");
    if (!savedLang) {
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
          const country = data.country_code;
          let lang = "en";
          switch (country) {
            case "IL": lang = "he"; break;
            case "RU": lang = "ru"; break;
            case "SA": lang = "ar"; break;
            case "ES": lang = "es"; break;
            default: lang = "en";
          }
          updateSetting("uiLang", lang);
          localStorage.setItem("uiLang", lang);
        })
        .catch(() => {
          updateSetting("uiLang", "en");
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        {t("loading") || "טוען..."}
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans ${settings.darkMode ? "dark" : ""}`}>
<div className="min-h-screen w-full bg-gradient-to-br from-teal-400 via-cyan-300 to-pink-300 dark:from-teal-600 dark:via-cyan-700 dark:to-pink-700">
        {showMaintenance && <MaintenancePopup onClose={() => setShowMaintenance(false)} />}

        <Header
          onMenuToggle={() => setMenuOpen((o) => !o)}
          menuOpen={menuOpen}
          onUserPanelToggle={() => setUserPanelOpen(true)}
          onLangChange={(code) => {
            updateSetting("uiLang", code);
            localStorage.setItem("uiLang", code);
          }}
        />

        <main className="pt-[56px] pb-8 w-full overflow-x-hidden">
          <Suspense fallback={<div className="text-center my-10 text-lg">⏳ {t("loading")}</div>}>
            <Routes>
              <Route path="/"                         element={<HomePage />} />
              <Route path="/favorites"                element={<FavoritesPage />} />
              <Route path="/favorites/all-series"     element={<AllSeriesFavoritesPage />} />
              <Route path="/favorites/all-words"      element={<AllWordsFavoritesPage />} />
              <Route path="/review-word/:wordKey"     element={<ReviewWordPage />} />
              <Route path="/notes"                    element={<NotesPage />} />
              <Route path="/series"                   element={<BrowseSeriesPage />} />
              <Route path="/episodes/:seriesId"       element={<EpisodesPage />} />
              <Route path="/bot"                      element={<BotPage />} />
              <Route path="/tips"                     element={<TipsPage />} />
              <Route path="/games"                    element={<GameMenuPage />} />
              <Route path="/games/word-treasure"      element={<WordTreasureGame />} />
              <Route path="/games/memory"             element={<MemoryGame />} />
              <Route path="/games/sentence-match"     element={<SentenceMatchGame />} />
              <Route path="/games/sentence-scramble"  element={<SentenceScrambleGame />} />
              <Route path="/games/listening"          element={<ListeningGame />} />
              <Route path="/games/synonyms"           element={<SynonymGame />} />
              <Route path="/games/writing"            element={<WritingGame />} />
              <Route path="/premium"                  element={<PremiumPage />} />
              <Route path="/login"                    element={<LoginPage />} />
              <Route path="/register"                 element={<RegisterPage />} />
              <Route path="/categories"               element={<CategoriesPage />} />
              <Route path="/categories/:id"           element={<CategoryDetailPage />} />
              <Route path="/game-end"                 element={<GameEndPage />} />
              <Route path="*"                         element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>

        {userPanelOpen && <UserPanel onClose={() => setUserPanelOpen(false)} />}
        <AccessibilityWidget />
      </div>
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
