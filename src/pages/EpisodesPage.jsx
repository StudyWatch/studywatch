// src/pages/EpisodesPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FavoritesContext } from '../context/FavoritesContext';
import { WordsContext } from '../context/WordsContext';

export default function EpisodesPage() {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const { wordFavorites, addWordFavorite, removeWordFavorite } = useContext(FavoritesContext);
  const { setWords, setSeriesId } = useContext(WordsContext);

  const [episodesData, setEpisodesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [seasons, setSeasons] = useState([]);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await fetch(import.meta.env.BASE_URL + `episodes/${seriesId}.json`);
        const data = await response.json();
        setEpisodesData(data);
        const seasonKeys = Object.keys(data);
        setSeasons(seasonKeys);
        setEpisodes(Object.keys(data[seasonKeys[0]] || {}));
      } catch (err) {
        console.error('Error loading episodes:', err);
        setError('שגיאה בטעינת פרקים');
      } finally {
        setLoading(false);
      }
    }
    fetchEpisodes();
  }, [seriesId]);

  useEffect(() => {
    if (episodesData && seasons.length > 0) {
      const currentSeason = seasons[selectedSeasonIndex];
      setEpisodes(Object.keys(episodesData[currentSeason] || {}));
      setSelectedEpisodeIndex(0);
    }
  }, [selectedSeasonIndex, episodesData]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!episodesData) return null;

  const selectedSeason = seasons[selectedSeasonIndex];
  const selectedEpisode = episodes[selectedEpisodeIndex];
  const words = episodesData[selectedSeason]?.[selectedEpisode]?.[difficulty] || [];

  const handleNextEpisode = () => {
    if (selectedEpisodeIndex < episodes.length - 1) {
      setSelectedEpisodeIndex(selectedEpisodeIndex + 1);
    } else if (selectedSeasonIndex < seasons.length - 1) {
      const nextSeason = selectedSeasonIndex + 1;
      setSelectedSeasonIndex(nextSeason);
      setEpisodes(Object.keys(episodesData[seasons[nextSeason]] || {}));
      setSelectedEpisodeIndex(0);
    }
  };

  const handlePrevEpisode = () => {
    if (selectedEpisodeIndex > 0) {
      setSelectedEpisodeIndex(selectedEpisodeIndex - 1);
    } else if (selectedSeasonIndex > 0) {
      const prevSeason = selectedSeasonIndex - 1;
      setSelectedSeasonIndex(prevSeason);
      setEpisodes(Object.keys(episodesData[seasons[prevSeason]] || {}));
      setSelectedEpisodeIndex(episodes.length - 1);
    }
  };

  const toggleWordFavorite = (wordObj) => {
    const key = `${seriesId}_${selectedSeason}_${selectedEpisode}_${difficulty}_${wordObj.word}`;
    if (wordFavorites.some(fav => fav.key === key)) {
      removeWordFavorite(key);
    } else {
      addWordFavorite(key, wordObj);
    }
  };

  const handleStartGames = () => {
    setWords(words);
    setSeriesId(seriesId);
    navigate('/games');
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center" dir="rtl">
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-800">בחרו עונה ופרק לצפייה ולמידת מילים</h2>

      {/* בוחרי עונה ופרק */}
      <div className="flex flex-col md:flex-row gap-12 mb-10">
        {/* בוחר עונה */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">בחר עונה 🎬</h3>
          <div className="relative w-32 h-48 overflow-hidden rounded-2xl shadow-md border border-gray-300 bg-white">
            <div className="overflow-y-scroll h-full scrollbar-hide">
              {seasons.map((season, index) => (
                <div
                  key={season}
                  onClick={() => setSelectedSeasonIndex(index)}
                  className={`h-12 flex items-center justify-center cursor-pointer text-lg font-bold transition-colors ${
                    index === selectedSeasonIndex ? 'bg-blue-200 text-blue-800' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {season.replace('season-', 'עונה ')}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* בוחר פרק */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">בחר פרק 🎞️</h3>
          <div className="relative w-32 h-48 overflow-hidden rounded-2xl shadow-md border border-gray-300 bg-white">
            <div className="overflow-y-scroll h-full scrollbar-hide">
              {episodes.map((episode, index) => (
                <div
                  key={episode}
                  onClick={() => setSelectedEpisodeIndex(index)}
                  className={`h-12 flex items-center justify-center cursor-pointer text-lg font-bold transition-colors ${
                    index === selectedEpisodeIndex ? 'bg-green-200 text-green-800' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {episode.replace('episode-', 'פרק ')}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* כפתורי מעבר בין פרקים */}
      <div className="flex gap-6 mb-8">
        <button
          onClick={handlePrevEpisode}
          className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-full shadow text-gray-700 font-semibold transition"
        >
          ⬅️ קודם
        </button>
        <button
          onClick={handleNextEpisode}
          className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-full shadow text-gray-700 font-semibold transition"
        >
          הבא ➡️
        </button>
      </div>

      {/* רמות קושי */}
      <div className="flex gap-4 mb-10">
        {['easy', 'medium', 'hard'].map(level => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              difficulty === level ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-400'
            }`}
          >
            {level === 'easy' ? 'קל' : level === 'medium' ? 'בינוני' : 'קשה'}
          </button>
        ))}
      </div>

      {/* מילים */}
      {words.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
          {words.map((wordObj, idx) => {
            const key = `${seriesId}_${selectedSeason}_${selectedEpisode}_${difficulty}_${wordObj.word}`;
            const isFav = wordFavorites.some(fav => fav.key === key);

            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-200 flex flex-col items-center text-center relative"
              >
                <button
                  className="absolute top-4 left-4 text-2xl"
                  onClick={() => toggleWordFavorite(wordObj)}
                >
                  {isFav ? '💖' : '🤍'}
                </button>
                <h4 className="text-2xl font-bold text-blue-700 mb-2">{wordObj.word}</h4>
                <p className="text-lg text-gray-600 mb-2">{wordObj.translate}</p>
                <p className="text-gray-500 italic" dir="ltr">{wordObj.sentence}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8 text-lg">אין מילים ברמה זו לפרק הנבחר.</p>
      )}

      {/* כפתור מעבר למשחקים */}
      <div className="mt-14">
        <button
          onClick={handleStartGames}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg transition-all"
        >
          🎮 רוצה לשחק במשחקים על המילים שלמדת?
        </button>
      </div>
    </div>
  );
}