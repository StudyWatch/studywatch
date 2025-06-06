import React, { useState } from 'react';
import { Settings2, Plus, Minus } from 'lucide-react';

const ACCESSIBILITY_OPTIONS = [
  { class: 'large-text', label: 'הגדלת טקסט', emoji: '🔠' },
  { class: 'grayscale', label: 'גווני אפור', emoji: '🖤' },
  { class: 'high-contrast', label: 'ניגודיות גבוהה', emoji: '⚫' },
  { class: 'light-background', label: 'רקע בהיר', emoji: '🌞' },
  { class: 'highlight-links', label: 'הדגשת קישורים', emoji: '🔗' },
];

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [activeClasses, setActiveClasses] = useState(() => new Set());

  const toggleClass = (className) => {
    const updated = new Set(activeClasses);
    if (updated.has(className)) {
      document.body.classList.remove(className);
      updated.delete(className);
    } else {
      document.body.classList.add(className);
      updated.add(className);
    }
    setActiveClasses(new Set(updated));
  };

  const resetAccessibility = () => {
    ACCESSIBILITY_OPTIONS.forEach(opt => document.body.classList.remove(opt.class));
    setActiveClasses(new Set());
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 text-right">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="נגישות"
      >
        <Settings2 className="w-6 h-6" />
      </button>

      {open && (
        <div className="mt-3 w-64 p-4 bg-white shadow-2xl rounded-xl border border-gray-200 text-sm space-y-2 animate-fade-in">
          <h3 className="font-bold text-gray-700 text-base mb-2">התאמות נגישות:</h3>

          {ACCESSIBILITY_OPTIONS.map(({ class: cls, label, emoji }) => (
            <button
              key={cls}
              onClick={() => toggleClass(cls)}
              className={`w-full text-right flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 ${
                activeClasses.has(cls) ? 'font-bold text-blue-700' : 'text-gray-700'
              }`}
            >
              <span>{emoji} {label}</span>
              {activeClasses.has(cls) ? <Minus size={16} /> : <Plus size={16} />}
            </button>
          ))}

          <button
            onClick={resetAccessibility}
            className="w-full text-right text-red-500 mt-3 hover:text-red-700 px-2"
          >
            ❌ איפוס
          </button>
        </div>
      )}
    </div>
  );
}
