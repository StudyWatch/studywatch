// src/components/Spinner.jsx
import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center my-4">
      <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}
