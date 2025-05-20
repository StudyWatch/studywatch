// src/components/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-3 pr-10 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <Search className="text-gray-400" />
      </div>
    </div>
  );
}
