// src/hooks/useStats.js

import { useState, useEffect } from 'react';
import statsManager from '../utils/statsManager';

/**
 * Hook שמחזיר אובייקט stats ומאזין גם לאירוע 'storage' וגם לאירוע מותאם 'statsUpdate'
 * כדי לעדכן את המצב גם כשה־localStorage משתנה באותו חלון.
 */
export default function useStats() {
  const [stats, setStats] = useState(() => statsManager.getStats());

  useEffect(() => {
    // מאזין לאירוע storage (משתנה בדפדפן, רק בחלון אחר)
    const onStorage = (e) => {
      if (e.key === 'userStats') {
        setStats(statsManager.getStats());
      }
    };
    // מאזין לאירוע מותאם 'statsUpdate' (נתון ע"י saveStats בכל עדכון)
    const onCustom = () => {
      setStats(statsManager.getStats());
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('statsUpdate', onCustom);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('statsUpdate', onCustom);
    };
  }, []);

  return stats;
}
