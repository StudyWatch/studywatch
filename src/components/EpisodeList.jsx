// src/components/EpisodeList.jsx
import React from 'react';
import EpisodeItem from './EpisodeItem';

export default function EpisodeList({ episodes, seasonNumber, toggleFavorite, isFavorite }) {
  return (
    <div className="overflow-x-auto shadow rounded-lg mb-8">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-right">פרק</th>
            <th className="px-4 py-2">מילים (קלות)</th>
            <th className="px-4 py-2">מילים (בינוניות)</th>
            <th className="px-4 py-2">מילים (קשות)</th>
            <th className="px-4 py-2">קישור</th>
            <th className="px-4 py-2">מועדף</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(episodes).map(([episodeKey, details]) => {
            const episodeNumber = episodeKey.replace('episode-', '');
            return (
              <EpisodeItem
                key={episodeKey}
                season={seasonNumber}
                episodeNumber={episodeNumber}
                details={details}
                onToggleFavorite={() => toggleFavorite(seasonNumber, episodeNumber)}
                isFavorite={isFavorite(seasonNumber, episodeNumber)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
