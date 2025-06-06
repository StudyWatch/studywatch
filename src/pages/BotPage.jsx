import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function BotPage() {
  const [seriesList, setSeriesList] = useState([]);
  const [genre, setGenre] = useState('');
  const [level, setLevel] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [dismissedSeries, setDismissedSeries] = useState([]);
  const navigate = useNavigate();

  const { settings } = useSettings();
  const fromLang = settings.uiLang || 'he';

  const translations = {
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
  };

  const genreList = [
    'comedy', 'drama', 'sci-fi', 'animation', 'crime', 'romance', 'documentary'
  ].map((key) => ({
    value: key,
    label: settings.translations?.genres?.[key]?.[fromLang] || key,
    color: {
      comedy: 'bg-yellow-300',
      drama: 'bg-red-300',
      'sci-fi': 'bg-indigo-300',
      animation: 'bg-pink-300',
      crime: 'bg-gray-300',
      romance: 'bg-rose-300',
      documentary: 'bg-green-300'
    }[key]
  }));

  const levelList = ['beginner', 'intermediate', 'advanced'].map((key) => ({
    value: key,
    label: settings.translations?.levels?.[key]?.[fromLang] || key
  }));

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/seriesList.json');
        const data = await res.json();
        setSeriesList(data);
      } catch (err) {
        console.error('שגיאה בטעינת סדרות:', err);
      }
    }
    fetchData();
  }, []);

  const handleGenreSelect = (g) => {
    setGenre(g);
    setLevel('');
    setRecommendations([]);
    setDismissedSeries([]);
  };

  const handleLevelSelect = (lvl) => {
    setLevel(lvl);
    const filtered = seriesList.filter(
      s => s.genre?.toLowerCase() === genre && s.level?.toLowerCase() === lvl
    );
    setRecommendations(filtered);
  };

  const handleDismiss = (id) => {
    setDismissedSeries(prev => [...prev, id]);
  };

  return (
    <BackgroundWrapper pageName="bot" extension=".png">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-12 font-sans" dir={['he', 'ar'].includes(fromLang) ? 'rtl' : 'ltr'}>
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-900 dark:text-yellow-300 drop-shadow">
          {translations.title[fromLang]}
        </h1>

        {/* ז'אנרים */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-white mb-4">
            {translations.genreQuestion[fromLang]}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {genreList.map(g => (
              <button
                key={g.value}
                onClick={() => handleGenreSelect(g.value)}
                className={`text-gray-800 font-bold py-3 px-6 rounded-full shadow transition hover:scale-105 ${g.color} ${genre === g.value ? 'ring-4 ring-blue-500' : ''}`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* רמות */}
        {genre && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-white mb-4">
              {translations.levelQuestion[fromLang]}
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {levelList.map(lvl => (
                <button
                  key={lvl.value}
                  onClick={() => handleLevelSelect(lvl.value)}
                  className={`text-white font-bold py-3 px-6 rounded-full shadow-lg transition hover:scale-105 ${level === lvl.value ? 'bg-blue-700' : 'bg-blue-500'}`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* המלצות */}
        {level && (
          <div className="mt-10">
            {recommendations.filter(s => !dismissedSeries.includes(s.id)).length === 0 ? (
              <p className="text-center text-red-500 text-lg">
                {translations.noResults[fromLang]}
              </p>
            ) : (
              <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.filter(s => !dismissedSeries.includes(s.id)).map(series => (
                  <div
                    key={series.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col overflow-hidden"
                  >
                    <img
                      src={series.image || '/images/default.jpg'}
                      alt={series.name?.[fromLang] || 'סדרה'}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <h3 className="text-2xl font-bold text-blue-800 dark:text-yellow-300 mb-2">
                        {series.name?.[fromLang] || series.name?.he}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {series.description?.[fromLang] || series.description?.he}
                      </p>
                      <details className="mb-4 bg-blue-50 dark:bg-blue-900 p-3 rounded-lg border border-blue-200">
                        <summary className="cursor-pointer text-blue-700 dark:text-blue-300 font-semibold hover:underline text-sm">
                          {translations.readMore[fromLang]}
                        </summary>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 leading-relaxed">
                          {series.details?.[fromLang] || series.details?.he}
                        </p>
                      </details>
                      <div className="flex justify-between items-center mt-auto">
                        <button
                          onClick={() => navigate(`/episodes/${series.id}`)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                        >
                          {translations.startLearning[fromLang]}
                        </button>
                        <button
                          onClick={() => handleDismiss(series.id)}
                          className="ml-4 text-red-500 hover:text-red-700 text-sm"
                        >
                          {translations.dismiss[fromLang]}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
}
