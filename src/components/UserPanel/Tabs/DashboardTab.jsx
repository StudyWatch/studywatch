// src/components/UserPanel/Tabs/DashboardTab.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../../context/I18nContext';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Filler);

export default function DashboardTab() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    wordsLearned: 0,
    gamesPlayed: 0,
    streak: 0,
    languages: [],
    favoriteGenres: [],
    level: 'Beginner',
    points: 0,
    dailyWords: {}
  });

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('userStats')) || {};
      setStats({
        wordsLearned: Object.keys(data.learnedWords || {}).length,
gamesPlayed: Object.values(data.gamesPlayed || {}).reduce((acc, g) => acc + (Number(g.total) || 0), 0),
          streak: data.dailyActivity?.streak || 0,
        languages: data.languages || ['English'],
        favoriteGenres: data.favoriteGenres || ['Comedy'],
        level: data.level || 'Beginner',
        points: data.points || 0,
        dailyWords: data.dailyWords || {}
      });
    } catch (err) {
      console.error('Failed to load userStats:', err);
    }
  }, []);

  const levels = {
    Beginner: '🟢 Beginner',
    Explorer: '🔵 Explorer',
    Master: '🔴 Word Master'
  };

  const cards = [
    {
      label: (
        <span className="inline-flex items-center gap-1">
          {t('dashboard.wordsLearned')}
          <span
            title={t('dashboard.wordsLearnedTip')}
            className="text-blue-500 dark:text-blue-300 cursor-help"
          >
            ❔
          </span>
        </span>
      ),
      value: stats.wordsLearned,
      icon: '📚',
      color: 'blue'
    },
    { label: t('dashboard.gamesPlayed'), value: stats.gamesPlayed, icon: '🎮', color: 'green' },
    { label: t('dashboard.streak'), value: stats.streak, icon: '🔥', color: 'orange' },
    { label: t('dashboard.level'), value: levels[stats.level], icon: '⭐', color: 'purple' },
    { label: t('dashboard.points'), value: stats.points, icon: '🏅', color: 'red' },
    { label: t('dashboard.languages'), value: stats.languages.join(', '), icon: '🌐', color: 'indigo' },
    { label: t('dashboard.genres'), value: stats.favoriteGenres.join(', '), icon: '🎭', color: 'yellow' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-yellow-300">
        🧑‍🎓 {t('dashboard.overview')}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      <MotivationCard stats={stats} />

      <div className="bg-gradient-to-br from-purple-100 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-md text-center animate-fade-in">
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
          {t('dashboard.upgradeMsg')}
        </p>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-md">
          🚀 {t('dashboard.upgradeButton')}
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">{t('dashboard.progressGraph')}</h3>
        <LineChart data={stats.dailyWords} />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colorMap = {
    blue: 'text-blue-600 border-blue-300',
    green: 'text-green-600 border-green-300',
    orange: 'text-orange-600 border-orange-300',
    red: 'text-red-600 border-red-300',
    purple: 'text-purple-600 border-purple-300',
    indigo: 'text-indigo-600 border-indigo-300',
    yellow: 'text-yellow-600 border-yellow-300'
  };

  return (
    <div
      className={`flex flex-col justify-between p-3 sm:p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border-t-4 ${colorMap[color]} text-center h-[130px] sm:h-[140px] transform transition-transform hover:scale-105 duration-300`}
    >
      <div className="text-3xl sm:text-4xl mb-1">{icon}</div>
      <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
        {label}
      </div>
      <div className={`text-lg sm:text-xl font-bold ${colorMap[color].split(' ')[0]} mt-1`}>
        {value}
      </div>
    </div>
  );
}

function MotivationCard({ stats }) {
  const { t } = useTranslation();

  const getMessage = () => {
    const words = stats.wordsLearned || 0;
    const games = stats.gamesPlayed || 0;
    const streak = stats.streak || 0;

    if (words >= 50) return `🌟 ${t('dashboard.encouragement.pro')} – ${words} ${t('dashboard.encouragement.words')}`;
    if (words >= 30) return `🎉 ${t('dashboard.encouragement.great')} – ${words} ${t('dashboard.encouragement.words')}`;
    if (words >= 10) return `👏 ${t('dashboard.encouragement.good')} – ${words} ${t('dashboard.encouragement.words')}`;
    if (games >= 3) return `🎮 ${t('dashboard.encouragement.gamer')} – ${games} ${t('dashboard.encouragement.games')}`;
    if (streak >= 3) return `🔥 ${t('dashboard.encouragement.streak')} ${streak} ${t('dashboard.days')}`;
    return `💪 ${t('dashboard.encouragement.keepGoing')}`;
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-white dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl shadow-md text-center animate-fade-in">
      <p className="text-md sm:text-lg font-medium text-gray-800 dark:text-gray-100">
        {getMessage()}
      </p>
    </div>
  );
}

function LineChart({ data }) {
  const sortedDates = Object.keys(data).sort();
  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Words per Day',
        data: sortedDates.map(date => data[date]),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}
