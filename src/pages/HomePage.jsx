import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeriesCard from '../components/SeriesCard';
import Spinner from '../components/Spinner';
import { useTranslation } from '../context/I18nContext';
import { useSettings } from '../context/SettingsContext';
import { ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();
  const { t } = useTranslation();
  const isRtl = ['he', 'ar'].includes(settings.uiLang);
  const isDarkMode = settings.darkMode;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await fetch('/data/seriesList.json');
        const data = await response.json();
        setSeriesList(data);
      } catch (error) {
        console.error('Error loading series:', error);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    }
    fetchSeries();
  }, []);

  const handleSeriesClick = () => {
    const container = document.getElementById('page-transition');
    if (container) {
      container.classList.add('explode');
      setTimeout(() => {
        navigate('/series');
      }, 900);
    } else {
      navigate('/series');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div id="page-transition">
      <main
        className={`
          w-full
          bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white
          dark:bg-gray-900 dark:text-white
          transition-content
        `}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* 🎯 Hero Section */}
       <section
  className={`
    w-full min-h-[380px] md:min-h-[405px]
    bg-cover bg-no-repeat bg-[center_right_30%] md:bg-bottom
    relative flex items-start md:items-center justify-start
    pt-6 md:pt-0
  `}
  style={{
    backgroundImage: isDarkMode
      ? "url('/images/backgrounds/hero-full-dark.png')"
      : "url('/images/backgrounds/hero-full.png')"
  }}
>

          <div
            className={`
              absolute
              left-4 sm:left-[8%]
              top-12 md:top-auto
              mt-2 md:mt-0
              max-w-md z-10
              ${isRtl ? 'text-right' : 'text-left'}
            `}
          >
            <h1
              className={`
                text-xl md:text-2xl font-extrabold leading-snug
                text-white
                drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]
                font-sans
              `}
            >
              {t('home.hero.title') || 'Learn languages with real TV series'}
            </h1>
            <p
              className={`
                text-md md:text-lg
                ${isDarkMode ? 'text-gray-200' : 'text-gray-100'}
                mt-3 mb-3 drop-shadow font-medium
              `}
            >
              {t('home.hero.subtitle') ||
                'Practice vocabulary and comprehension with real scenes.'}
            </p>
            <a
              href="#popular"
              className={`
                inline-block px-6 py-3 rounded-full font-semibold shadow
                transition active:scale-95
                ${
                  isDarkMode
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }
              `}
            >
              {t('home.hero.cta') || 'Start Learning'}
            </a>
          </div>
        </section>

        {/* 🌟 Popular Series */}
        <section
          id="popular"
          className={`
            pt-2 pb-10 px-4
            bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]
            dark:bg-gray-800 dark:text-gray-100
          `}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <h2
                className={`
                  ${isRtl ? 'text-right' : 'text-left'}
                  text-xl md:text-2xl font-bold
                  ${isDarkMode ? 'text-gray-100' : 'text-white'}
                `}
              >
                {t('home.popular') || 'Popular Series'}
              </h2>
              <button
                onClick={handleSeriesClick}
                className={`
                  flex items-center gap-1 px-4 py-2 rounded-full font-medium text-white shadow hover:scale-105 transition-transform
                  ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                  }
                `}
              >
                {t('home.allSeries') || 'All Series'}
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {seriesList.slice(0, 5).map((series, index) => (
                <div
                  key={series.id}
                  className={index > 1 ? 'hidden sm:block' : ''}
                >
                  <SeriesCard series={series} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📚 How It Works */}
        <section
          className={`
            how-it-works-section
            px-4 pt-0
            transition-colors
          `}
        >
          <div className="max-w-6xl mx-auto py-10">
            <h2
              className={`
                ${isRtl ? 'text-right' : 'text-center'}
                text-2xl sm:text-3xl font-bold mb-6 sm:mb-10
                ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}
              `}
            >
              {t('home.howItWorks') || 'How It Works'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* כרטיס 1: Learn Vocabulary */}
              <div className="card-base">
                <div
                  className={`
                    w-16 h-16 flex-shrink-0 flex items-center justify-center
                    ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'}
                    rounded-lg
                  `}
                >
                  <img
                    src="/icons/vocab-small.png"
                    alt={t('home.step1') || 'Learn Vocabulary'}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className={`${isRtl ? 'text-right' : 'text-left'} flex-1 ml-4`}>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-1`}>
                    {t('home.step1') || 'Learn Vocabulary'}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('home.step1desc') ||
                      'Expand your vocabulary with words and phrases from each episode.'}
                  </p>
                </div>
              </div>

              {/* כרטיס 2: Watch Episodes */}
              <div className="card-base">
                <div
                  className={`
                    w-16 h-16 flex-shrink-0 flex items-center justify-center
                    ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-100'}
                    rounded-lg
                  `}
                >
                  <img
                    src="/icons/watch-small.png"
                    alt={t('home.step2') || 'Watch Episodes'}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className={`${isRtl ? 'text-right' : 'text-left'} flex-1 ml-4`}>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-1`}>
                    {t('home.step2') || 'Watch Episodes'}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('home.step2desc') ||
                      'Watch episodes with interactive subtitles to reinforce your learning.'}
                  </p>
                </div>
              </div>

              {/* כרטיס 3: Deepen Understanding */}
              <div className="card-base">
                <div
                  className={`
                    w-16 h-16 flex-shrink-0 flex items-center justify-center
                    ${isDarkMode ? 'bg-gray-700' : 'bg-purple-100'}
                    rounded-lg
                  `}
                >
                  <img
                    src="/icons/quiz-small.png"
                    alt={t('home.step3') || 'Deepen Understanding'}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className={`${isRtl ? 'text-right' : 'text-left'} flex-1 ml-4`}>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-1`}>
                    {t('home.step3') || 'Deepen Understanding'}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('home.step3desc') ||
                      'Take quizzes and games to reinforce what you learned.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
