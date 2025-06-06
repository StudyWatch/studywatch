// src/components/UserPanel/Tabs/ProgressTab.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from '../../../context/I18nContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function ProgressTab() {
  const { t } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState('stats');
  const [data, setData] = useState({
    daily: [],
    labels: [],
    learnedTotal: 0,
    activeDays: 0,
    favorites: 0,
    gamesPlayed: 0
  });
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().slice(0, 10);
    });

    const stats = JSON.parse(localStorage.getItem('userStats')) || {};
    const dailyWords = stats.dailyWords || {};
    const learnedWords = stats.learnedWords || {};
    const favorites = stats.favorites || 0;
const gamesPlayed = Object.values(stats.gamesPlayed || {}).reduce((sum, g) => sum + (Number(g.total) || 0), 0);
    const streak = stats.dailyActivity?.streak || 0;

    const dailyCounts = last7Days.map(date => dailyWords[date] || 0);

    setData({
      labels: last7Days.map(date => date.slice(5)), // MM-DD
      daily: dailyCounts,
      learnedTotal: Object.keys(learnedWords).length,
      activeDays: Object.values(dailyWords).filter(v => v > 0).length,
      favorites,
      gamesPlayed
    });

    const dailyChallenges = [
      { id: 'learn-10', label: t('challenges.learn10'), done: Object.keys(learnedWords).length >= 10 },
      { id: 'play-3', label: t('challenges.play3'), done: gamesPlayed >= 3 },
      { id: 'fav-5', label: t('challenges.fav5'), done: favorites >= 5 },
      { id: 'streak-3', label: t('challenges.streak3'), done: streak >= 3 },
    ];
    setChallenges(dailyChallenges);
  }, [t]);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: t('progress.wordsLearned'),
        data: data.daily,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: t('progress.chartTitle')
      }
    }
  };

  const completedCount = challenges.filter((c) => c.done).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-center text-blue-800 dark:text-yellow-300">
        {t('progress.title')}
      </h3>

      <div className="flex justify-center space-x-2 rtl:space-x-reverse">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${
            activeSubTab === 'stats' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
          }`}
          onClick={() => setActiveSubTab('stats')}
        >
          {t('progress.statsTab')}
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${
            activeSubTab === 'challenges' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
          }`}
          onClick={() => setActiveSubTab('challenges')}
        >
          {t('progress.challengesTab')}
        </button>
      </div>

      {activeSubTab === 'stats' && (
        <>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <Line options={chartOptions} data={chartData} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Stat label={t('progress.totalWords')} value={data.learnedTotal} icon="📚" tip={t('dashboard.wordsLearnedTip')} />
            <Stat label={t('progress.activeDays')} value={data.activeDays} icon="📆" />
            <Stat label={t('progress.gamesPlayed')} value={data.gamesPlayed} icon="🎮" />
            <Stat label={t('progress.favorites')} value={data.favorites} icon="⭐" />
          </div>
        </>
      )}

      {activeSubTab === 'challenges' && (
        <>
          <div className="grid grid-cols-1 gap-4">
            {challenges.map((ch) => (
              <div
                key={ch.id}
                className={`flex justify-between items-center p-4 rounded-xl shadow-md transition-all duration-300
                  ${ch.done ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-50 text-red-800 dark:bg-gray-800 dark:text-gray-300'}`}
              >
                <span className="font-medium text-base">{ch.label}</span>
                <span className="text-2xl">{ch.done ? '✅' : '❌'}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl text-center shadow">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {t('challenges.completed')}: {completedCount} / {challenges.length} ✅
            </p>
            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              {t('challenges.note')}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, icon, tip }) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-900 shadow text-center h-[120px] flex flex-col justify-between">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
        {tip && (
          <span title={tip} className="ml-1 text-blue-500 cursor-help">❔</span>
        )}
      </div>
      <div className="text-xl font-bold text-blue-600 dark:text-yellow-200">{value}</div>
    </div>
  );
}
