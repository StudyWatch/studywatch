import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultSettings = {
  uiLang: 'he',
  learningLang: 'he',
  fromLang: 'en',
  darkMode: false,
  sentenceLangMode: 'auto',
  autoPlay: true,
  translations: {
    genres: {
      comedy:      { he: "קומדיה 🎭",       en: "Comedy 🎭",      es: "Comedia 🎭",     ar: "كوميديا 🎭",     ru: "Комедия 🎭" },
      drama:       { he: "דרמה 🎬",         en: "Drama 🎬",       es: "Drama 🎬",       ar: "دراما 🎬",       ru: "Драма 🎬" },
      "sci-fi":    { he: "מדע בדיוני 🧬",    en: "Sci-Fi 🧬",      es: "Ciencia ficción 🧬", ar: "خيال علمي 🧬", ru: "Научная фантастика 🧬" },
      animation:   { he: "אנימציה 🖍️",      en: "Animation 🖍️",   es: "Animación 🖍️",   ar: "رسوم متحركة 🖍️", ru: "Анимация 🖍️" },
      crime:       { he: "פשע 🗅️",          en: "Crime 🗅️",       es: "Crimen 🗅️",      ar: "جريمة 🗅️",      ru: "Криминал 🗅️" },
      romance:     { he: "רומנטיקה ❤️",     en: "Romance ❤️",     es: "Romance ❤️",     ar: "رومانسية ❤️",    ru: "Романтика ❤️" },
      documentary: { he: "דוקומנטרי 📚",    en: "Documentary 📚", es: "Documental 📚",  ar: "وثائقي 📚",       ru: "Документальный 📚" }
    },
    levels: {
      beginner:    { he: "מתחיל 🟢",        en: "Beginner 🟢",     es: "Principiante 🟢", ar: "مبتدئ 🟢",        ru: "Новичок 🟢" },
      intermediate:{ he: "בינוני 🟡",       en: "Intermediate 🟡", es: "Intermedio 🟡",   ar: "متوسط 🟡",        ru: "Средний 🟡" },
      advanced:    { he: "מתקדם 🔴",        en: "Advanced 🔴",     es: "Avanzado 🔴",     ar: "متقدم 🔴",        ru: "Продвинутый 🔴" }
    },
    bot: {
      title: {
        he: "🤖 מצא את הסדרה שמתאימה לך",
        en: "🤖 Find the Show That Fits You",
        es: "🤖 Encuentra la Serie Perfecta para Ti",
        ar: "🤖 اعثر على المسلسل المناسب لك",
        ru: "🤖 Найди подходящий тебе сериал"
      },
      genreQuestion: {
        he: "איזה סוג סדרה בא לך לראות?",
        en: "What type of show do you want to watch?",
        es: "¿Qué tipo de serie quieres ver?",
        ar: "ما نوع المسلسل الذي تريد مشاهدته؟",
        ru: "Какой тип сериала ты хочешь смотреть?"
      },
      levelQuestion: {
        he: "מה רמת האנגלית שלך?",
        en: "What is your English level?",
        es: "¿Cuál es tu nivel de inglés?",
        ar: "ما مستوى اللغة الإنجليزية لديك؟",
        ru: "Какой у тебя уровень английского?"
      },
      noResults: {
        he: "😔 לא נמצאו סדרות מתאימות. נסה לבחור ז'אנר או רמה אחרת.",
        en: "😔 No matching shows found. Try another genre or level.",
        es: "😔 No se encontraron series coincidentes. Intenta otro género o nivel.",
        ar: "😔 لم يتم العثور على مسلسلات مناسبة. جرّب نوعًا أو مستوى آخر.",
        ru: "😔 Нет подходящих сериалов. Попробуй другой жанр или уровень."
      },
      readMore: {
        he: "📖 קרא עוד",
        en: "📖 Read more",
        es: "📖 Leer más",
        ar: "📖 قراءة مزيد",
        ru: "📖 Читать дальше"
      },
      startLearning: {
        he: "🚀 התחל ללמוד מהסדרה",
        en: "🚀 Start learning from this show",
        es: "🚀 Comienza a aprender de esta serie",
        ar: "🚀 ابدأ التعلم من هذا المسلسل",
        ru: "🚀 Начни учиться с этого сериала"
      },
      dismiss: {
        he: "❌ לא רלוונטי",
        en: "❌ Not Relevant",
        es: "❌ No relevante",
        ar: "❌ غير مناسب",
        ru: "❌ Не подходит"
      }
    }
  }
};

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('userSettings');
    const parsed = saved ? JSON.parse(saved) : {};
    return {
      ...defaultSettings,
      ...parsed,
      translations: parsed.translations || defaultSettings.translations
    };
  });

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    document.documentElement.dir = ['he', 'ar'].includes(settings.uiLang) ? 'rtl' : 'ltr';
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
export const useSettings = () => useContext(SettingsContext);
