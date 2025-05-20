import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Repeat } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'he', label: 'עברית' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' }
];

export default function LanguageSelector() {
  const { fromLang, toLang, setFromLang, setToLang, switchLanguages } = useContext(LanguageContext);

  return (
    <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 border border-gray-200 w-full sm:w-fit">
      <div className="flex flex-col items-start gap-1">
        <label className="text-sm font-medium text-gray-700">מ־שפה</label>
        <select
          value={fromLang}
          onChange={(e) => setFromLang(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={switchLanguages}
        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full shadow-sm transition"
        title="החלף שפות"
      >
        <Repeat className="w-5 h-5" />
      </button>

      <div className="flex flex-col items-start gap-1">
        <label className="text-sm font-medium text-gray-700">לשפה</label>
        <select
          value={toLang}
          onChange={(e) => setToLang(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
