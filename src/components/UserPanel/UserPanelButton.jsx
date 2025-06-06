// src/components/UserPanel/UserPanelButton.jsx
import React from 'react';
import { UserCircle } from 'lucide-react'; // 👤 אייקון דמות

export default function UserPanelButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="אזור אישי"
      className="ml-4 rounded-full p-2 bg-white/80 dark:bg-gray-800 text-blue-700 dark:text-yellow-300 shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-all"
    >
      <UserCircle size={26} strokeWidth={2.2} />
    </button>
  );
}
