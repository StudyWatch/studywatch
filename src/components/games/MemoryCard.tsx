// src/components/games/MemoryCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Check } from 'lucide-react';

export default function MemoryCard({ content, isFlipped, isMatched, disabled, onClick }) {
  return (
    <div
      className="w-24 h-24 md:w-32 md:h-32 cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => !disabled && onClick()}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* גב הקלף – סימן שאלה */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white text-3xl shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <HelpCircle className="w-8 h-8 opacity-90" />
        </div>

        {/* חזית הקלף – המילה */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-2 rounded-xl text-center text-lg md:text-2xl font-semibold
            ${isMatched
              ? 'bg-green-500 text-white border-2 border-green-700'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md'}
          `}
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {content}
          {isMatched && (
            <Check className="absolute top-2 right-2 w-5 h-5 text-white" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
