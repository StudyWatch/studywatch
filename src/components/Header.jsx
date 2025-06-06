// src/components/Header.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserPanelButton from './UserPanel/UserPanelButton';
import { useTranslation } from '../context/I18nContext';
import { useSettings } from '../context/SettingsContext';
import { ThemeContext } from '../context/ThemeContext';
import {
  Home,
  Star,
  Clapperboard,
  Bot,
  Lightbulb,
  Moon,
  Sun,
  Globe,
} from 'lucide-react';

export default function Header({ onMenuToggle, menuOpen, onUserPanelToggle, onLangChange }) {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isRtl = settings.uiLang === 'he' || settings.uiLang === 'ar';
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'he', label: 'עברית 🇮🇱' },
    { code: 'en', label: 'English 🇺🇸' },
    { code: 'es', label: 'Español 🇪🇸' },
    { code: 'ru', label: 'Русский 🇷🇺' },
    { code: 'ar', label: 'العربية 🇸🇦' },
  ];

  return (
    <header
      className={`
        fixed top-0 w-full z-50
        ${theme === 'dark' ? 'bg-gray-900 border-b border-gray-700' : 'bg-white border-b border-gray-200'}
        backdrop-blur-sm
      `}
    >
      {/* ================================ */}
      {/* השורה העליונה: לוגו + אייקונים מצד שמאל, + המבורגר מצד ימין */}
      {/* ================================ */}
      <div
        className="max-w-screen-xl mx-auto flex items-center justify-between px-3 sm:px-4 h-12"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* -------- צד שמאל: לוגו ואייקונים -------- */}
        <div className="flex items-center gap-2">
          {/* לוגו (גובה קבוע של 32px) */}
          <Link
  to="/"
  className={`
    flex items-center justify-center h-8 gap-1 sm:gap-2
    ${isRtl ? 'flex-row-reverse' : 'flex-row'}
    text-base sm:text-lg font-extrabold whitespace-nowrap
    ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}
    hover:${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}
    transition-colors
  `}
>
  <UserPanelButton onClick={onUserPanelToggle} />
  <span>StudyWatch</span>
</Link>


          {/* כפתור מצב כהה/בהיר */}
          <button
            onClick={toggleTheme}
            className={`
              flex items-center justify-center h-8 w-8 rounded-full
              ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
              transition-colors
            `}
            aria-label={theme === 'dark'
              ? t('settings.lightMode') || 'Light mode'
              : t('settings.darkMode') || 'Dark mode'
            }
          >
            {theme === 'dark' ? (
              <Sun size={18} className="min-w-[18px] min-h-[18px] text-yellow-300" />
            ) : (
              <Moon size={18} className="min-w-[18px] min-h-[18px] text-gray-600" />
            )}
          </button>

          {/* בורר שפה */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className={`
                flex items-center justify-center h-8 w-8 rounded-full
                ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
                transition-colors
              `}
              aria-label={t('settings.language.ui') || 'Language'}
            >
              <Globe
                size={18}
                className={theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}
              />
            </button>
            {langMenuOpen && (
              <div
                className={`
                  absolute top-full mt-1 w-40
                  ${theme === 'dark' ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'}
                  rounded-lg shadow-lg z-50
                  ${isRtl ? 'right-0' : 'left-0'}
                `}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLangChange(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`
                      w-full px-3 py-2 text-sm flex justify-between
                      ${settings.uiLang === lang.code
                        ? theme === 'dark'
                          ? 'font-semibold bg-gray-700 text-white'
                          : 'font-semibold bg-gray-100 text-gray-900'
                        : theme === 'dark'
                        ? 'text-gray-200 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* -------- צד ימין: כפתור המבורגר במובייל -------- */}
        <button
          onClick={onMenuToggle}
          className={`
            flex items-center justify-center h-8 w-8
            md:hidden
            ${theme === 'dark' ? 'text-gray-200 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}
            transition-colors
          `}
          aria-label={t('menu.openMenu') || "פתח תפריט"}
        >
          <span className="text-2xl">☰</span>
        </button>

        {/* -------- ניווט דסקטופ (מוסתר במובייל) -------- */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link
            to="/"
            className={`
              flex items-center gap-1
              ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
              transition-colors
            `}
          >
            <Home size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
            <span>{t('menu.home')}</span>
          </Link>
          <Link
            to="/favorites"
            className={`
              flex items-center gap-1
              ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
              transition-colors
            `}
          >
            <Star id="favorites-icon" size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
            <span>{t('menu.favorites')}</span>
          </Link>
          <Link
            to="/series"
            className={`
              flex items-center gap-1
              ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
              transition-colors
            `}
          >
            <Clapperboard size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
            <span>{t('menu.series')}</span>
          </Link>
          <Link
            to="/bot"
            className={`
              flex items-center gap-1
              ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
              transition-colors
            `}
          >
            <Bot size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
            <span>{t('menu.bot')}</span>
          </Link>
          <Link
            to="/tips"
            className={`
              flex items-center gap-1
              ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
              transition-colors
            `}
          >
            <Lightbulb size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
            <span>{t('menu.tips')}</span>
          </Link>
        </nav>
      </div>

      {/* ================================ */}
      {/* תפריט מתקפל במובייל (נראה רק אם menuOpen === true) */}
      {/* ================================ */}
      {menuOpen && (
        <div
          className={`
            md:hidden
            ${theme === 'dark' ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'}
            shadow-md
          `}
        >
          <nav className="flex flex-col gap-1 px-3 py-2">
            <Link
              to="/"
              onClick={onMenuToggle}
              className={`
                flex items-center gap-2 h-8
                ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
                transition-colors
              `}
            >
              <Home size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
              <span>{t('menu.home')}</span>
            </Link>
            <Link
              to="/favorites"
              onClick={onMenuToggle}
              className={`
                flex items-center gap-2 h-8
                ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
                transition-colors
              `}
            >
              <Star id="favorites-icon" size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
              <span>{t('menu.favorites')}</span>
            </Link>
            <Link
              to="/series"
              onClick={onMenuToggle}
              className={`
                flex items-center gap-2 h-8
                ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
                transition-colors
              `}
            >
              <Clapperboard size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
              <span>{t('menu.series')}</span>
            </Link>
            <Link
              to="/bot"
              onClick={onMenuToggle}
              className={`
                flex items-center gap-2 h-8
                ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
                transition-colors
              `}
            >
              <Bot size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
              <span>{t('menu.bot')}</span>
            </Link>
            <Link
              to="/tips"
              onClick={onMenuToggle}
              className={`
                flex items-center gap-2 h-8
                ${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}
                transition-colors
              `}
            >
              <Lightbulb size={18} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
              <span>{t('menu.tips')}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
