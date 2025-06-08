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
  Grid,
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
  const isRtl = ['he','ar'].includes(settings.uiLang);
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
        ${theme==='dark' ? 'bg-gray-900 border-b border-gray-700' : 'bg-white border-b border-gray-200'}
        backdrop-blur-sm
      `}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-12">
        {/* Left: logo + toggles */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className={`
              flex items-center h-8 gap-1 text-lg font-extrabold
              ${theme==='dark' ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}
              transition-colors
            `}
          >
            <UserPanelButton onClick={onUserPanelToggle}/>
            <span>StudyWatch</span>
          </Link>

          <button
            onClick={toggleTheme}
            className={`
              h-8 w-8 flex items-center justify-center rounded-full
              ${theme==='dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
              transition-colors
            `}
            aria-label={ theme==='dark' ? t('settings.lightMode') : t('settings.darkMode') }
          >
            {theme==='dark'
              ? <Sun size={18} className="text-yellow-300"/>
              : <Moon size={18} className="text-gray-600"/>
            }
          </button>

          <div className="relative">
            <button
              onClick={()=>setLangMenuOpen(o=>!o)}
              className={`
                h-8 w-8 flex items-center justify-center rounded-full
                ${theme==='dark'?'hover:bg-gray-800':'hover:bg-gray-100'}
                transition-colors
              `}
              aria-label={t('settings.language')||'Language'}
            >
              <Globe size={18} className={theme==='dark'?'text-gray-200':'text-gray-600'} />
            </button>
            {langMenuOpen && (
              <div className={`
                absolute top-full mt-1 w-40
                ${theme==='dark'?'bg-gray-800 border border-gray-600':'bg-white border border-gray-200'}
                rounded-lg shadow-lg z-50 ${isRtl?'right-0':'left-0'}
              `}>
                {languages.map(l=>(
                  <button
                    key={l.code}
                    onClick={()=>{ onLangChange(l.code); setLangMenuOpen(false); }}
                    className={`
                      w-full px-3 py-2 text-sm flex justify-between
                      ${settings.uiLang===l.code
                        ? theme==='dark' ? 'font-semibold bg-gray-700 text-white' : 'font-semibold bg-gray-100 text-gray-900'
                        : theme==='dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile burger */}
        <button
          onClick={onMenuToggle}
          className={`
            md:hidden h-8 w-8 flex items-center justify-center text-xl
            ${theme==='dark'?'text-gray-200 hover:text-gray-300':'text-gray-600 hover:text-gray-800'}
            transition-colors
          `}
          aria-label={t('menu.openMenu')||'Open menu'}
        >☰</button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link to="/"        className="flex items-center gap-1 hover:underline"><Home size={18}/> {t('menu.home')}</Link>
          <Link to="/favorites" className="flex items-center gap-1 hover:underline relative">
            <Star size={18}/> {t('menu.favorites')}
            <div id="favorites-icon" className="absolute -top-2 -right-2 w-3 h-3" />
          </Link>
          <Link to="/series"    className="flex items-center gap-1 hover:underline"><Clapperboard size={18}/> {t('menu.series')}</Link>
          <Link to="/categories" className="flex items-center gap-1 hover:underline"><Grid size={18}/> {t('menu.categories')}</Link>
          <Link to="/bot"       className="flex items-center gap-1 hover:underline"><Bot size={18}/> {t('menu.bot')}</Link>
          <Link to="/tips"      className="flex items-center gap-1 hover:underline"><Lightbulb size={18}/> {t('menu.tips')}</Link>
        </nav>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={`
          md:hidden
          ${theme==='dark'?'bg-gray-800 border-t border-gray-700':'bg-white border-t border-gray-200'}
          shadow-md
        `}>
          <nav className="flex flex-col px-4 py-2 gap-1">
            {[ ['/', <Home size={18}/>, t('menu.home')],
               ['/favorites', <Star size={18}/>, t('menu.favorites')],
               ['/series', <Clapperboard size={18}/>, t('menu.series')],
               ['/categories', <Grid size={18}/>, t('menu.categories')],
               ['/bot', <Bot size={18}/>, t('menu.bot')],
               ['/tips', <Lightbulb size={18}/>, t('menu.tips')] ].map(([to,icon,label]) => (
              <Link key={to} to={to} onClick={onMenuToggle} className="flex items-center gap-2 h-8 hover:underline relative">
                {icon}<span>{label}</span>
                {to === '/favorites' && <div id="favorites-icon" className="absolute -top-2 -right-2 w-3 h-3" />}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}