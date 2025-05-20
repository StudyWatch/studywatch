import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SeriesCard from '../components/SeriesCard';
import Spinner from '../components/Spinner';
import BackgroundWrapper from '../components/BackgroundWrapper'; // ✅ חדש

export default function HomePage() {
  const [seriesList, setSeriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

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

  const filteredSeries = seriesList.filter(series =>
    series.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <BackgroundWrapper pageName="home" extension=".png">
      <main className="flex-1 container mx-auto px-4 py-12" dir="rtl">
        {/* כותרת */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-12 drop-shadow-lg">
          לימדו אנגלית דרך הסדרות האהובות!
        </h1>

        {/* שדה חיפוש */}
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="חיפוש סדרה..."
        />

        {/* סדרות */}
        {filteredSeries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 animate-fade-in">
            {filteredSeries.map(series => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300 mt-12 text-xl animate-pulse">
            לא נמצאו סדרות מתאימות. נסו מילה אחרת 🎯
          </p>
        )}
      </main>
    </BackgroundWrapper>
  );
}
