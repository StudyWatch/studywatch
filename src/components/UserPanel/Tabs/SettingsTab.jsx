import React, { useEffect, useState } from 'react';
import { useSettings } from '../../../context/SettingsContext';
import { useTranslation } from '../../../context/I18nContext';

const langOptions = [
  { code: 'he', label: 'עברית' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
  { code: 'es', label: 'Español' }
];

export default function SettingsTab() {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();

  const isRtl = ['he', 'ar'].includes(settings.uiLang);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 20);
    return () => clearTimeout(timeout);
  }, [settings.uiLang]);

  const getSentenceLangLabel = () => {
    switch (settings.sentenceLangMode) {
      case 'fromLang':
        return t('settings.sentence.fromLang');
      case 'learningLang':
        return t('settings.sentence.learningLang');
      case 'auto':
      default:
        return t('settings.sentence.auto');
    }
  };

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    const root = document.getElementById('fade-root');
    if (root) root.classList.add('opacity-0');

    setTimeout(() => {
      updateSetting('uiLang', newLang);
      localStorage.setItem('uiLang', newLang);
      document.documentElement.dir = ['he', 'ar'].includes(newLang) ? 'rtl' : 'ltr';
      if (root) root.classList.remove('opacity-0');
    }, 300);
  };

  return (
    <div
      className={`transition-all duration-500 transform ${fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      {/* UI Language */}
      <div>
        <label className="block font-bold text-blue-800 dark:text-yellow-300 mb-1">
          🌐 {t('settings.language.ui')}
        </label>
        <select
          value={settings.uiLang}
          onChange={handleLangChange}
          className="w-full border border-blue-300 dark:border-yellow-400 rounded-xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm"
        >
          {langOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-1">{t('settings.language.uiDescription')}</p>
      </div>

      {/* Sentence Language Display */}
      <div>
        <label className="block font-bold text-blue-800 dark:text-yellow-300 mb-1">
          🗣️ {t('settings.sentence.label')}
        </label>
        <select
          value={settings.sentenceLangMode}
          onChange={(e) => updateSetting('sentenceLangMode', e.target.value)}
          className="w-full border border-blue-300 dark:border-yellow-400 rounded-xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm"
        >
          <option value="learningLang">{t('settings.sentence.learningLang')}</option>
          <option value="fromLang">{t('settings.sentence.fromLang')}</option>
          <option value="auto">{t('settings.sentence.auto')}</option>
        </select>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {t('settings.sentence.description')}
        </p>

        <p className="text-sm text-gray-600 mt-1">
          {t('settings.sentence.current')}: <strong className="text-blue-700 dark:text-yellow-300">{getSentenceLangLabel()}</strong>
        </p>
      </div>

      {/* Dark Mode */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-xl shadow-sm">
        <div className="text-gray-800 dark:text-white font-medium">🌙 {t('settings.darkMode')}</div>
        <input
          type="checkbox"
          checked={settings.darkMode}
          onChange={(e) => updateSetting('darkMode', e.target.checked)}
          className="scale-125 accent-blue-500 dark:accent-yellow-400"
        />
      </div>

      {/* Auto Play */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-xl shadow-sm">
        <div className="text-gray-800 dark:text-white font-medium">🔈 {t('settings.autoPlay')}</div>
        <input
          type="checkbox"
          checked={settings.autoPlay}
          onChange={(e) => updateSetting('autoPlay', e.target.checked)}
          className="scale-125 accent-blue-500 dark:accent-yellow-400"
        />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('settings.autoPlayNote')}
      </p>

      {/* News Section */}
     {/* What's New Section */}
<div className="mt-10 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md p-4">
  <h3 className="text-xl font-bold text-blue-700 dark:text-yellow-300 mb-3">🆕 {t('news.title')}</h3>

  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
    <div className="flex items-start gap-2">
      <span className="text-lg">📊</span>
      <div>
        <p className="font-medium">{t('news.update1Title') || 'New Progress Panel ✨'}</p>
        <p>{t('news.update1Desc') || 'Check out your weekly stats and challenges in the upgraded panel.'}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{t('news.date1') || 'Updated: July 2025'}</p>
      </div>
    </div>

    <div className="flex items-start gap-2 opacity-60 italic">
      <span className="text-lg">🚧</span>
      <div>
        <p>{t('news.comingSoon') || 'More features are on the way...'}</p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
