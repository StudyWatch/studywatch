import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function BackgroundWrapper({ pageName, children, extension = '.png' }) {
  const { theme } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const backgroundName = `${pageName}-${theme}${isMobile ? '-mobile' : ''}${extension}`;
  const backgroundPath = `/images/backgrounds/${backgroundName}`;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ backgroundImage: `url('${backgroundPath}')` }}
    >
      <div className="min-h-screen bg-white/30 dark:bg-black/30">
        {children}
      </div>
    </div>
  );
}
