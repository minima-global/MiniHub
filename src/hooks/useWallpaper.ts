import { useEffect, useState } from 'react';

function useWallpaper() {
  const [activeWallpaper, setActiveWallpaper] = useState('');

  useEffect(() => {
    const item = localStorage.getItem('__miniHub_bg');

    if (item) {
      document.body.classList.value = '';
      document.body.classList.add(`bg-${item}`);
    }
  }, [activeWallpaper]);

  useEffect(() => {
    if (activeWallpaper !== '') {
      document.body.classList.value = '';
      document.body.classList.add(`bg-${activeWallpaper}`);
    }
  }, [activeWallpaper]);

  return {
    activeWallpaper,
    setActiveWallpaper,
  };
}

export default useWallpaper;
