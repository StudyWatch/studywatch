// src/components/UserPanel/UserPanel.jsx
import React, { useState, useEffect } from 'react';
import DashboardTab from './Tabs/DashboardTab';
import SettingsTab from './Tabs/SettingsTab';
import ProgressTab from './Tabs/ProgressTab';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../context/I18nContext';

export default function UserPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('settings'); // 👈 שינוי ברירת מחדל
  const [fadeIn, setFadeIn] = useState(false);
  const { settings } = useSettings();
  const { t } = useTranslation();
  const isRtl = ['he', 'ar'].includes(settings.uiLang);

  const tabs = [
    { id: 'dashboard', label: t('userPanel.dashboard') || 'Dashboard', icon: '🏠' },
    { id: 'progress', label: t('userPanel.progress') || 'Progress', icon: '📈' },
    { id: 'settings', label: t('userPanel.settings') || 'Settings', icon: '⚙️' }
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 10);
    return () => {
      clearTimeout(timeout);
      setFadeIn(false);
    };
  }, [settings.uiLang]);

  return (
    <div
      className={`user-panel fixed top-0 h-full w-full sm:w-[400px] z-50 shadow-xl transition-all duration-500 transform 
      ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} 
      bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700`}
    >
      {/* כותרת עליונה */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-yellow-300">
          {t('userPanel.title') || 'Your Panel'}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 text-2xl transition"
          aria-label={t('userPanel.close')}
        >
          ✕
        </button>
      </div>

      {/* טאבים */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-sm font-semibold border-b-2 transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-300 bg-white dark:bg-gray-900'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:dark:text-blue-300'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* תוכן פעיל */}
      <div
        key={settings.uiLang + activeTab}
        className={`p-4 overflow-y-auto h-[calc(100%-110px)] transition-opacity duration-500 ease-in-out ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'progress' && <ProgressTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}
