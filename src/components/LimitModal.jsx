import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/I18nContext';
import { useSettings } from '../context/SettingsContext';

export default function LimitModal({ isOpen, onClose, limitType }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { settings } = useSettings();

  if (!isOpen) return null;

  const isRtl = ['he', 'ar'].includes(settings.uiLang);
  const direction = isRtl ? 'rtl' : 'ltr';

  const title = t(`limitModal.${limitType}Title`);
  const description = t(`limitModal.${limitType}Desc`);
  const spotsLeft = 477;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 border-2 border-blue-500/30"
        dir={direction}
      >
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {title}
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200 text-base leading-relaxed">
            {description}
          </p>
          <p className="mt-3 text-sm text-red-600 dark:text-red-400 font-semibold">
            ⏳ <span className="font-bold">{spotsLeft}</span> {t('limitModal.spotsLeft')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <button
            onClick={() => {
              onClose();
              navigate('/register');
            }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-lg transition duration-200 text-sm shadow"
          >
            {t('limitModal.register')}
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/login');
            }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold rounded-lg transition duration-200 text-sm shadow"
          >
            {t('limitModal.login')}
          </button>
        </div>

        {/* 🔗 כפתור לעמוד הפרימיום */}
        <button
          onClick={() => {
            onClose();
            navigate('/premium');
          }}
          className="block mx-auto text-blue-600 dark:text-blue-400 hover:underline text-sm mt-3"
        >
          {t('limitModal.learnMore')}
        </button>

        <button
          onClick={onClose}
          className="block mx-auto text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white mt-3 text-sm underline"
        >
          {t('limitModal.cancel')}
        </button>
      </div>
    </div>,
    document.body
  );
}
