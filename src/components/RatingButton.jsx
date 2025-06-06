// src/components/RatingButton.jsx
import React, { useContext } from 'react';
import { RatingsContext } from '../context/RatingsContext';
import { ThumbUp, ThumbDown } from 'lucide-react';

export default function RatingButton({ seriesId }) {
  const { ratings, rateSeries } = useContext(RatingsContext);
  const current = ratings[seriesId] || { up: 0, down: 0 };

  const handleRate = (isUp) => {
    rateSeries(seriesId, isUp);
  };

  const total = current.up + current.down;
  const score = total === 0 ? 0 : Math.round((current.up / total) * 5); // 0–5 כוכבים

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => handleRate(true)} className="text-green-500 hover:text-green-700">
        <ThumbUp size={20} />
      </button>
      <span className="text-yellow-400">
        {"★".repeat(score) + "☆".repeat(5 - score)}
      </span>
      <button onClick={() => handleRate(false)} className="text-red-500 hover:text-red-700">
        <ThumbDown size={20} />
      </button>
    </div>
  );
}
