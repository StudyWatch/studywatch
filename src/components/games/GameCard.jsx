// ✅ GameCard.jsx – גרסה מתוקנת מלאה למניעת שגיאות הקשורות לאובייקטים במקום מחרוזות
import React from 'react';
import PropTypes from 'prop-types';

export default function GameCard({ title, description, image, onClick }) {
  const backgroundUrl = typeof image === 'string' ? `url('${image}')` : 'none';

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: backgroundUrl }}
      ></div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{String(title)}</h2>
        <p className="text-gray-600">{String(description)}</p>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
