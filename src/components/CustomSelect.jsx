// src/components/CustomSelect.jsx
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

/**
 * קומפוננטת Select מעוצבת לפי Tailwind:
 *   - value, onChange: כמו select רגיל
 *   - options: מערך של [value, label]
 *   - isDarkMode: האם במצב כהה (dark)
 *   - label (אופציונלי): כיתוב שמשתמשים בו כ־aria-label
 *   - className (אופציונלי): למחלקות Tailwind נוספות
 */
export default function CustomSelect({
  value,
  onChange,
  options,
  isDarkMode,
  label = '',
  className = ''
}) {
  return (
    <div className={`relative flex-1 ${className}`} aria-label={label}>
      <select
        value={value}
        onChange={onChange}
        className={`
          appearance-none w-full
          ${isDarkMode
            ? 'bg-gray-700 border-gray-600 text-gray-100'
            : 'bg-white border-gray-300 text-gray-900'}
          border rounded-xl py-2 pl-4 pr-10
          text-sm shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all
        `}
      >
        {options.map(([optValue, optLabel]) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>

      {/* Chevron בצד ימין */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDownIcon
          className={`h-4 w-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
        />
      </div>
    </div>
  );
}
