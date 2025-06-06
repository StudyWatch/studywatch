// src/hooks/useFlyToFavorites.js
export default function useFlyToFavorites() {
  return (sourceEl) => {
    const targetEl = document.getElementById('favorites-icon');
    if (!sourceEl || !targetEl) return;

    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    const clone = sourceEl.cloneNode(true);
    Object.assign(clone.style, {
      position: 'absolute',
      top: `${sourceRect.top + scrollTop}px`,
      left: `${sourceRect.left + scrollLeft}px`,
      width: `${sourceRect.width}px`,
      height: `${sourceRect.height}px`,
      zIndex: 9999,
      transition: 'all 1.1s ease-in-out',
      borderRadius: '1.5rem',
      overflow: 'hidden'
    });

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.top = `${targetRect.top + scrollTop}px`;
      clone.style.left = `${targetRect.left + scrollLeft}px`;
      clone.style.transform = 'scale(0.3)';
      clone.style.opacity = '0.2';
    });

    setTimeout(() => document.body.removeChild(clone), 1200);
  };
}
