// src/components/MemoryCard.jsx
import React from 'react';
import { cn } from '../utils/utils';

import { Check, HelpCircle } from 'lucide-react';

interface MemoryCardProps {
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  word,
  isFlipped,
  isMatched,
  onClick,
}) => {
  return (
    <div className="perspective" onClick={onClick}>
      <div
        className={cn(
          'relative w-full h-20 md:h-28 preserve-3d rounded-lg shadow-md transition-transform duration-500 cursor-pointer',
          { '[transform:rotateY(180deg)]': isFlipped }
        )}
      >
        {/* גב הקלף */}
        <div className="absolute w-full h-full backface-hidden rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center">
          <HelpCircle className="w-10 h-10 text-white" />
        </div>
        {/* חזית הקלף */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center p-2 [transform:rotateY(180deg)]',
            {
              'bg-white': !isMatched,
              'bg-green-400 text-white border-2 border-green-500': isMatched,
            }
          )}
        >
          <span className="text-base md:text-xl font-bold text-center">
            {word}
          </span>
          {isMatched && (
            <Check className="absolute top-2 right-2 w-4 h-4 md:w-6 md:h-6 text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
