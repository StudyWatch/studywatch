import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function BotPage() {
  const [seriesList, setSeriesList] = useState([]);
  const [genre, setGenre] = useState('');
  const [level, setLevel] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const genres = [
    { value: 'comedy', label: 'קומדיה 🎭', color: 'bg-yellow-300' },
    { value: 'drama', label: 'דרמה 🎬', color: 'bg-red-300' },
    { value: 'sci-fi', label: 'מדע בדיוני 🧬', color: 'bg-indigo-300' },
    { value: 'animation', label: 'אנימציה 🖍️', color: 'bg-pink-300' },
    { value: 'crime', label: 'פשע 🗅️', color: 'bg-gray-300' },
    { value: 'romance', label: 'רומנטיקה ❤️', color: 'bg-rose-300' },
    { value: 'documentary', label: 'דוקומנטרי 📚', color: 'bg-green-300' }
  ];

  const levels = [
    { value: 'beginner', label: 'מתחיל 🟢' },
    { value: 'intermediate', label: 'בינוני 🟡' },
    { value: 'advanced', label: 'מתקדם 🔴' }
  ];

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
  };

  const handleLevelSelect = (lvl) => {
    setLevel(lvl);
    const exact = seriesList.filter(
      s =>
        s.genre?.toLowerCase() === genre &&
        s.level?.toLowerCase() === lvl
    );
    setRecommendations(exact);
  };

  return (
    <BackgroundWrapper pageName="bot" extension=".png">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-12 font-sans" dir="rtl">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-900 dark:text-yellow-300 drop-shadow">
          🤖 מצא את הסדרה שמתאימה לך
        </h1>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-white mb-4">איזה סוג סדרה בא לך לראות?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {genres.map(g => (
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

        {genre && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-white mb-4">מה רמת האנגלית שלך?</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {levels.map(lvl => (
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

        {level && (
          <div className="mt-10">
            {recommendations.length === 0 ? (
              <p className="text-center text-red-500 text-lg">
                😔 לא נמצאו סדרות מתאימות. נסה לבחור ז'אנר או רמה אחרת.
              </p>
            ) : (
              <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((series, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col overflow-hidden"
                  >
                    <img
                      src={series.image || '/images/default.jpg'}
                      alt={series.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <h3 className="text-2xl font-bold text-blue-800 dark:text-yellow-300 mb-2">{series.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{series.description}</p>

                      <details className="mb-4 bg-blue-50 dark:bg-blue-900 p-3 rounded-lg border border-blue-200">
                        <summary className="cursor-pointer text-blue-700 dark:text-blue-300 font-semibold hover:underline text-sm">
                          📖 קרא עוד
                        </summary>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 leading-relaxed">{series.details || 'בהמשך נוסיף מידע נוסף על הסדרה.'}</p>
                      </details>

                      <button
                        onClick={() => navigate(`/episodes/${series.id}`)}
                        className="mt-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                      >
                        🚀 התחל ללמוד מהסדרה
                      </button>
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
