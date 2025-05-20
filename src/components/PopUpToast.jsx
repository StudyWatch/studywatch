// src/components/PopUpToast.jsx
import React, { useEffect, useState } from "react";

export default function PopUpToast({ message, show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 bg-opacity-90 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm">
      {message}
    </div>
  );
}
