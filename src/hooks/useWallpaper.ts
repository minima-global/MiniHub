import { useEffect, useState } from 'react';

/**
 * Sets the correct wallpaper based on user settings
 * @returns {{setActiveWallpaper: (value: (((prevState: string) => string) | string)) => void, activeWallpaper: string}}
 */
function useWallpaper() {
  const [activeWallpaper, setActiveWallpaper] = useState('');

  useEffect(() => {
    const activeWallpaper = localStorage.getItem('__miniHub_bg');

    if (activeWallpaper) {
      document.body.classList.value = '';

      if (activeWallpaper.includes('thumbnail-')) {
        document.body.classList.add(`bg-${activeWallpaper.replace('thumbnail-', '')}`);
      } else {
        document.body.classList.add(`bg-${activeWallpaper}`);
      }
    }
  }, [activeWallpaper]);

  useEffect(() => {
    if (activeWallpaper !== '') {
      document.body.classList.value = '';

      console.log(activeWallpaper);

      if (activeWallpaper.includes('thumbnail-')) {
        document.body.classList.add(`bg-${activeWallpaper.replace('thumbnail-', '')}`);
      } else {
        document.body.classList.add(`bg-${activeWallpaper}`);
      }
    }
  }, [activeWallpaper]);

  return {
    activeWallpaper,
    setActiveWallpaper,
  };
}

export default useWallpaper;
