import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { FavoritesProvider } from './context/FavoritesContext';
import { WordsProvider } from './context/WordsContext';
import { ThemeProvider } from './context/ThemeContext'; // ← נוסף כאן

import './styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* ← עוטף את הכל כדי לאפשר שליטה במצב יום/לילה */}
      <FavoritesProvider>
        <WordsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WordsProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
