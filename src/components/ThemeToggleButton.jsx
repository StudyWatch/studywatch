import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className="theme-toggle"
      data-active={theme === 'dark'}
      onClick={toggleTheme}
      title={theme === 'dark' ? 'מצב יום' : 'מצב לילה'}
    >
      <div className="theme-toggle-thumb" />
    </div>
  );
}
