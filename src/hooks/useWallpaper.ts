import { useEffect, useState } from 'react';
import { copyToWeb, get, set } from '../lib';

/**
 * Sets the correct wallpaper based on user settings
 * @returns {{setActiveWallpaper: (value: (((prevState: string) => string) | string)) => void, activeWallpaper: string}}
 */
function useWallpaper(loaded: boolean, miniHUB: any) {
  const [activeWallpaper, setActiveWallpaper] = useState('');
  const [customWallpaper, setCustomWallpaper] = useState<string | boolean>(false);

  useEffect(() => {
    if (customWallpaper && miniHUB) {
      const now = new Date();
      document.body.style.backgroundImage = `url('./my_wallpapers/${customWallpaper}?t=${now.getTime()}')`;
    }
  }, [customWallpaper, miniHUB]);

  useEffect(() => {
    const activeWallpaper = localStorage.getItem('__miniHub_bg');

    if (activeWallpaper) {
      set('BACKGROUND', activeWallpaper).then(() => {
        localStorage.removeItem('__miniHub_bg');
      });
    }
  });

  /**
   * Checks to see if a wallpaper has been set in key / value storage
   */
  useEffect(() => {
    if (loaded) {
      get('BACKGROUND').then(async (response) => {
        const activeWallpaper = response as string;

        if (activeWallpaper) {
          setActiveWallpaper(activeWallpaper);
        } else {
          document.body.classList.value = 'bg-minima';
        }
      });
    }
  }, [loaded]);

  /**
   * This handles update, when the wallpaper is set from either from load
   * or from the settings
   */
  useEffect(() => {
    (async () => {
      if (activeWallpaper !== '' && activeWallpaper) {
        /**
         * If wallpaper is custom, we need to copy the file from the file directory
         * to the web folder so that we can use it as a web file! We do this everytime because
         * the app can be updated and the web folder would be emptied!
         */
        if (activeWallpaper.includes('custom-')) {
          document.body.classList.value = 'bg-custom';
          document.body.style.backgroundImage = '';

          const fileName = activeWallpaper.split('-')[1];
          const filePath = `/${fileName}`;
          await copyToWeb(filePath, `/my_wallpapers/` + fileName);

          setCustomWallpaper(fileName);
        } else {
          document.body.classList.value = '';
          document.body.style.backgroundImage = '';

          /**
           * Set preloaded wallpaper if custom one hasn't been selected
           */
          if (activeWallpaper.includes('thumbnail-')) {
            document.body.classList.add(`bg-${activeWallpaper.replace('thumbnail-', '')}`);
          } else {
            document.body.classList.add(`bg-${activeWallpaper}`);
          }

          setCustomWallpaper(false);
        }
      }
    })();
  }, [activeWallpaper]);

  return {
    activeWallpaper,
    setActiveWallpaper,
    customWallpaper,
    setCustomWallpaper,
  };
}

export default useWallpaper;
