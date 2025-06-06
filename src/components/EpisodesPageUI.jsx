import React, { useState } from 'react';
import WordCard from './WordCard';
import CustomSelect from './CustomSelect';
import seriesList from "../../public/data/seriesList.json";
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

export default function EpisodesPageUI({
  seriesId,
  settings,
  words,
  spareWords,
  seasons,
  episodes,
  selectedSeasonIndex,
  setSelectedSeasonIndex,
  selectedEpisodeIndex,
  setSelectedEpisodeIndex,
  difficulty,
  setDifficulty,
  learningLang,
  setLearningLang,
  fromLang,
  setFromLang,
  handleStartGames,
  handleMarkAsKnown,
  animateFlyToFavorites,
  triggerFavoriteAnimation,
  speak,
  t,
  goToNext,
  goToPrev
}) {
  const dir = ['he', 'ar'].includes(settings.uiLang) ? 'rtl' : 'ltr';
  const isDarkMode = settings.darkMode;
  const noData = !words || words.length === 0;

  const [showLangMobile, setShowLangMobile] = useState(false);

  // מצא את הסדרה הנוכחית כדי לגשת לפלטפורמות
  const currentSeries = seriesList.find((s) => s.id === seriesId) || {};
  const platforms = currentSeries.platforms || [];

  // הכנת אופציות ל־select
  const languageOptions = Object.entries(t('languageNames'));
  const seasonOptions = seasons.map((s, i) => [i, s]);
  const episodeOptions = episodes.map((e, i) => [i, e]);

  return (
    <div
      className="min-h-screen bg-cover bg-center pt-14 lg:pt-0"
      style={{ backgroundImage: "url('/images/backgrounds/episode-bg.png')" }}
      dir={dir}
    >
      {/* ===== תפריט מובייל מינימלי ===== */}
      <div className="lg:hidden sticky top-0 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow text-xs">
        <div className="flex items-center justify-between px-2 py-2">
          {/* ב-Mobile: בחירת עונה */}
          <CustomSelect
            value={selectedSeasonIndex}
            onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
            options={seasonOptions}
            isDarkMode={isDarkMode}
            small
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {/* ב-Mobile: בחירת פרק */}
          <CustomSelect
            value={selectedEpisodeIndex}
            onChange={(e) => setSelectedEpisodeIndex(Number(e.target.value))}
            options={episodeOptions}
            isDarkMode={isDarkMode}
            small
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={() => setShowLangMobile((prev) => !prev)}
            className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
            aria-label={t('settings.language_toggle')}
          >
            🌐
          </button>
        </div>

        {showLangMobile && (
          <div className="flex justify-center items-center gap-2 px-2 pb-2">
            {/* ב-Mobile: בוחר שפת מקור */}
            <CustomSelect
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              options={languageOptions}
              isDarkMode={isDarkMode}
              small
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={() => {
                setFromLang(learningLang);
                setLearningLang(fromLang);
              }}
              className="p-1 text-gray-600 dark:text-gray-300 transition"
              aria-label={t('settings.swap_langs')}
            >
              🔁
            </button>
            {/* ב-Mobile: בוחר שפת יעד */}
            <CustomSelect
              value={learningLang}
              onChange={(e) => setLearningLang(e.target.value)}
              options={languageOptions}
              isDarkMode={isDarkMode}
              small
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        )}
      </div>

      {/* ======= מבנה ראשי + סיידבר בדסקטופ ======= */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* ===== Sidebar בדסקטופ ===== */}
        <aside
          className={`
            sidebar-base hidden lg:flex flex-col w-64
            text-gray-900 dark:text-white
          `}
          dir={dir}
        >
          {/* כותרת */}
          <h2
            className={`
              text-2xl font-bold text-center 
              ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
            `}
          >
            {t('episodes.learn_words')}
          </h2>

          {/* לחצני פרק קודם / פרק הבא */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={goToPrev}
              className={`
                p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700
                ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
              `}
              aria-label={t('episodes.previous_episode') || 'פרק קודם'}
            >
              <ArrowLeftCircle size={24} />
            </button>
            <button
              onClick={goToNext}
              className={`
                p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700
                ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
              `}
              aria-label={t('episodes.next_episode') || 'פרק הבא'}
            >
              <ArrowRightCircle size={24} />
            </button>
          </div>

          {/* CustomSelect – שפת מקור */}
          <div className="mb-4">
            <label
              className={`
                block text-sm font-medium 
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1
              `}
            >
              {t('settings.language_from')}
            </label>
            <CustomSelect
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              options={languageOptions}
              isDarkMode={isDarkMode}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* CustomSelect – שפת יעד */}
          <div className="mb-4">
            <label
              className={`
                block text-sm font-medium 
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1
              `}
            >
              {t('settings.language_to')}
            </label>
            <CustomSelect
              value={learningLang}
              onChange={(e) => setLearningLang(e.target.value)}
              options={languageOptions}
              isDarkMode={isDarkMode}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* CustomSelect – בחירת עונה */}
          <div className="mb-4">
            <label
              className={`
                block text-sm font-medium 
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1
              `}
            >
              {t('episodes.select_season')}
            </label>
            <CustomSelect
              value={selectedSeasonIndex}
              onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
              options={seasonOptions}
              isDarkMode={isDarkMode}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* CustomSelect – בחירת פרק */}
          <div className="mb-4">
            <label
              className={`
                block text-sm font-medium 
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1
              `}
            >
              {t('episodes.select_episode')}
            </label>
            <CustomSelect
              value={selectedEpisodeIndex}
              onChange={(e) => setSelectedEpisodeIndex(Number(e.target.value))}
              options={episodeOptions}
              isDarkMode={isDarkMode}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* איפה לצפות */}
          <div>
            <h3
              className={`
                text-base font-semibold mb-2 
                ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
              `}
            >
              {t('episodes.where_to_watch')}
            </h3>
            <div className="flex flex-col gap-2">
              {platforms.length > 0 ? (
                platforms.map((platform) => (
                  <a
                    key={platform}
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      platform + ' ' + currentSeries.name?.en
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      py-2 rounded-xl font-medium text-sm text-center transition-colors
                      ${isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                    `}
                  >
                    {platform}
                  </a>
                ))
              ) : (
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('episodes.no_platforms')}
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* ===== תוכן ראשי ===== */}
        <main
          className="flex-1 px-1 lg:px-4 pt-3 lg:pt-3 pb-3 max-w-screen-lg mx-auto"
          dir={dir}
        >
          <h1
            className={`
              text-3xl font-bold text-center mb-1 
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}
          >
            {t('episodes.learn_words')}
          </h1>

          {noData ? (
            <div
              className={`
                text-center
                ${isDarkMode ? 'text-red-400' : 'text-red-600'}
                mt-5 text-lg font-semibold
                bg-white/60 dark:bg-gray-800/60 backdrop-blur p-2 rounded-lg shadow-md
              `}
            >
              {t('episodes.no_data_message')}
            </div>
          ) : (
            <>
              {/* לחצני רמת קושי */}
              <div className="flex justify-center gap-1 mb-3">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`
                      w-16 py-1 rounded-full font-semibold text-sm transition-colors
                      ${
                        difficulty === level
                          ? 'bg-indigo-600 text-white shadow-md'
                          : `bg-indigo-100 hover:bg-indigo-200
                             dark:bg-gray-700 dark:hover:bg-gray-600
                             ${isDarkMode ? 'text-gray-200' : 'text-indigo-800'}`
                      }
                    `}
                  >
                    {t(`episodes.select_level_${level}`)}
                  </button>
                ))}
              </div>

              {/* גריד כרטיסי מילים – מובייל */}
              <div className="block md:hidden grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
                {words.map((w, idx) => (
                  <div key={idx} className="w-full flex justify-center">
                    <WordCard
                      idx={idx}
                      seriesId={seriesId}
                      seasons={seasons}
                      selectedSeasonIndex={selectedSeasonIndex}
                      episodes={episodes}
                      selectedEpisodeIndex={selectedEpisodeIndex}
                      difficulty={difficulty}
                      wordObj={w}
                      speak={speak}
                      animateFlyToFavorites={animateFlyToFavorites}
                      triggerFavoriteAnimation={triggerFavoriteAnimation}
                      handleMarkAsKnown={handleMarkAsKnown}
                      spareWords={spareWords}
                      t={t}
                      isDarkMode={isDarkMode}
                      dir={dir}
                      fromLang={fromLang}
                    />
                  </div>
                ))}
              </div>

              {/* גריד כרטיסי מילים – דסקטופ */}
              <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-x-[-160px] sm:gap-x-44 lg:gap-x-44 gap-y-12">
                {words.map((w, idx) => (
                  <div key={idx} className="h-28 w-full">
                    <WordCard
                      idx={idx}
                      seriesId={seriesId}
                      seasons={seasons}
                      selectedSeasonIndex={selectedSeasonIndex}
                      episodes={episodes}
                      selectedEpisodeIndex={selectedEpisodeIndex}
                      difficulty={difficulty}
                      wordObj={w}
                      speak={speak}
                      animateFlyToFavorites={animateFlyToFavorites}
                      triggerFavoriteAnimation={triggerFavoriteAnimation}
                      handleMarkAsKnown={handleMarkAsKnown}
                      spareWords={spareWords}
                      t={t}
                      isDarkMode={isDarkMode}
                      dir={dir}
                      fromLang={fromLang}
                    />
                  </div>
                ))}

                {/* כפתור “Play Game” בדסקטופ */}
                <div className="hidden lg:block h-36 w-56 lg:w-64 ml-[20px] lg:ml-[-100px]">
                  <div
                    onClick={handleStartGames}
                    className={`
                      h-full w-full cursor-pointer rounded-3xl overflow-hidden
                      shadow-md dark:shadow-none
                      hover:shadow-lg dark:hover:shadow-xl
                      transform hover:scale-[1.02] transition-all
                      bg-indigo-600 dark:bg-indigo-700 flex items-center justify-center
                    `}
                  >
                    <img
                      src="/icons/playgames.png"
                      alt="Play Game"
                      className="
                        w-10/12 h-10/12
                        sm:w-11/12 sm:h-11/12
                        lg:w-full lg:h-full
                        object-cover rounded-3xl
                      "
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* כפתור “Play Game” מובייל (מיקום RTL/RTL מטופל ב־CSS) */}
      <button
        onClick={handleStartGames}
        className="play-game-btn"
        aria-label={t('episodes.play_games_button')}
      >
        <img src="/icons/playgames.png" alt="Play Games" className="w-6 h-6" />
      </button>
    </div>
  );
}
