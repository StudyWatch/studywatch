import React, { useState, useEffect, useContext, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WordsContext } from '../context/WordsContext';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../context/I18nContext';
import Spinner from '../components/Spinner';
import EpisodesPageUI from '../components/EpisodesPageUI';
import useFlyToFavorites from '../hooks/useFlyToFavorites';
import { wordsReducer, initialState as initialWordsState } from '../reducers/wordsReducer';
import { incrementStat } from '../utils/userStats';

export default function EpisodesPage() {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const { setWords } = useContext(WordsContext);
  const { settings } = useSettings();
  const { t } = useTranslation();

  const [episodesData, setEpisodesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [seasons, setSeasons] = useState([]);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(() => {
    const saved = localStorage.getItem(`${seriesId}_lastSeasonIndex`);
    return saved !== null ? parseInt(saved, 10) : 0;
  });
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(() => {
    const saved = localStorage.getItem(`${seriesId}_lastEpisodeIndex`);
    return saved !== null ? parseInt(saved, 10) : 0;
  });
  const [difficulty, setDifficulty] = useState('easy');

  const [learningLang, setLearningLang] = useState(localStorage.getItem('learningLang') || 'he');
  const [fromLang, setFromLang] = useState(localStorage.getItem('fromLang') || 'en');
  const sentenceLangMode = settings.sentenceLangMode || 'auto';

  const [wordsState, dispatchWords] = useReducer(wordsReducer, initialWordsState);
  const { words, spareWords } = wordsState;

  const animateFlyToFavorites = useFlyToFavorites();

  // שמירת השפות ב־localStorage
  useEffect(() => {
    localStorage.setItem('learningLang', learningLang);
    localStorage.setItem('fromLang', fromLang);
  }, [learningLang, fromLang]);

  // טעינת נתוני הפרקים
  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await fetch(`/episodes/${seriesId}.json`);
        const data = await response.json();
        setEpisodesData(data);
        const seasonKeys = Object.keys(data);
        setSeasons(seasonKeys);

        // ברגע שיש נתונים, נקבע את רשימת הפרקים לעונה השמורה או לעונה הראשונה
        const initialSeason = seasonKeys[selectedSeasonIndex] || seasonKeys[0];
        const initialEpisodes = Object.keys(data[initialSeason] || {});
        setEpisodes(initialEpisodes);
      } catch {
        setError(t('error.loading_episodes') || 'Error loading episodes');
      } finally {
        setLoading(false);
      }
    }
    fetchEpisodes();
  }, [seriesId, t, selectedSeasonIndex]);

  // עדכון רשימת הפרקים כשמשתנה העונה
  useEffect(() => {
    if (!episodesData) return;
    const season = seasons[selectedSeasonIndex];
    const eps = Object.keys(episodesData[season] || {});
    setEpisodes(eps);
    // אם הפרק השמור כבר לא קיים (למשל הורדת מספר הפרקים), נאפס ל־0
    setSelectedEpisodeIndex(idx => (idx < eps.length ? idx : 0));
  }, [episodesData, seasons, selectedSeasonIndex]);

  // שמירת העונה הנוכחית ב־localStorage
  useEffect(() => {
    localStorage.setItem(`${seriesId}_lastSeasonIndex`, selectedSeasonIndex);
  }, [seriesId, selectedSeasonIndex]);

  // שמירת הפרק הנוכחי ב־localStorage
  useEffect(() => {
    localStorage.setItem(`${seriesId}_lastEpisodeIndex`, selectedEpisodeIndex);
  }, [seriesId, selectedEpisodeIndex]);

  // טעינת המילים כשמשתנים עונה/פרק/קושי/שפה
  useEffect(() => {
    if (!episodesData) return;
    const season = seasons[selectedSeasonIndex];
    const episode = episodes[selectedEpisodeIndex];
    const entries = episodesData[season]?.[episode]?.[difficulty] || {};

    const getSentence = s => {
      if (!s) return '—';
      if (typeof s === 'string') return s;
      switch (sentenceLangMode) {
        case 'fromLang':
          return s[fromLang] || s.en || '—';
        case 'learningLang':
          return s[learningLang] || s.en || '—';
        default:
          return s.en || '—';
      }
    };

    const allWordsArr = Object.keys(entries).map(key => {
      const obj = entries[key];
      return {
        word: key,
        ...obj,
        displayFrom: obj.translations?.[fromLang] || key,
        displayTo: obj.translations?.[learningLang] || key,
        displaySentence: getSentence(obj.sentence),
        sentence: obj.sentence, // נשמור גם את המפה המקורית לצורך tooltip
      };
    });

    dispatchWords({ type: 'INITIALIZE', payload: { words: allWordsArr, limit: 15 } });
  }, [
    episodesData,
    seasons,
    selectedSeasonIndex,
    episodes,
    selectedEpisodeIndex,
    difficulty,
    fromLang,
    learningLang,
    sentenceLangMode
  ]);

  // עדכון סטטיסטיקות לימוד בפעם הראשונה שהטענו מילים
  useEffect(() => {
    if (!episodesData) return;
    const season = seasons[selectedSeasonIndex];
    const episode = episodes[selectedEpisodeIndex];
    const entries = episodesData[season]?.[episode]?.[difficulty] || {};
    const keyStat = `learned_${seriesId}_S${season}_E${episode}_${difficulty}`;
    if (!localStorage.getItem(keyStat)) {
      incrementStat('learnedWords', Object.keys(entries).length);
      localStorage.setItem(keyStat, 'true');
    }
  }, [
    episodesData,
    seasons,
    selectedSeasonIndex,
    selectedEpisodeIndex,
    difficulty,
    seriesId
  ]);

  // פונקציית השמעת קול
  const speak = (text, lang) => {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    const voice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith(lang));
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  };

  // לחיצה על כפתור Mark as Known
  const handleMarkAsKnown = idx => {
    dispatchWords({ type: 'MARK_KNOWN', payload: { idx } });
  };

  // לחיצה על "Play Games"
  const handleStartGames = () => {
    setWords(words);
    navigate('/games', {
      state: {
        sourceLang: fromLang,
        targetLang: learningLang
      }
    });
  };

  // פונקציה לקפיצה לפרק הבא / עונה הבאה
  const goToNext = () => {
    if (!episodesData) return;
    const currentSeason = seasons[selectedSeasonIndex];
    const epsList = Object.keys(episodesData[currentSeason] || {});
    if (selectedEpisodeIndex < epsList.length - 1) {
      setSelectedEpisodeIndex(prev => prev + 1);
    } else if (selectedSeasonIndex < seasons.length - 1) {
      setSelectedSeasonIndex(prev => prev + 1);
      setSelectedEpisodeIndex(0);
    }
    // אם זה הפרק האחרון בעונה האחרונה — אין פעולה בשאר
  };

  // פונקציה לקפיצה לפרק הקודם / עונה הקודמת
  const goToPrev = () => {
    if (!episodesData) return;
    if (selectedEpisodeIndex > 0) {
      setSelectedEpisodeIndex(prev => prev - 1);
    } else if (selectedSeasonIndex > 0) {
      const prevSeasonIndex = selectedSeasonIndex - 1;
      const prevSeason = seasons[prevSeasonIndex];
      const epsInPrev = Object.keys(episodesData[prevSeason] || {});
      setSelectedSeasonIndex(prevSeasonIndex);
      setSelectedEpisodeIndex(epsInPrev.length - 1);
    }
    // אם זה הפרק הראשון בעונה הראשונה — אין פעולה בשאר
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <EpisodesPageUI
      seriesId={seriesId}
      settings={settings}
      words={words}
      spareWords={spareWords}
      seasons={seasons}
      episodes={episodes}
      selectedSeasonIndex={selectedSeasonIndex}
      setSelectedSeasonIndex={setSelectedSeasonIndex}
      selectedEpisodeIndex={selectedEpisodeIndex}
      setSelectedEpisodeIndex={setSelectedEpisodeIndex}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      learningLang={learningLang}
      setLearningLang={setLearningLang}
      fromLang={fromLang}
      setFromLang={setFromLang}
      handleStartGames={handleStartGames}
      handleMarkAsKnown={handleMarkAsKnown}
      animateFlyToFavorites={animateFlyToFavorites}
      triggerFavoriteAnimation={(idx) => dispatchWords({ type: 'TRIGGER_ANIMATE_TO_FAVORITE', payload: { idx } })}
      speak={speak}
      t={t}
      goToNext={goToNext}
      goToPrev={goToPrev}
    />
  );
}
