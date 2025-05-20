import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg" dir="rtl">
        <button
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 text-xl"
          onClick={onClose}
          aria-label="סגור מודאל"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
