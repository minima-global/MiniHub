import { useEffect, useState } from 'react';
import { get, set } from '../lib';

/**
 * Sets the correct wallpaper based on user settings
 * @returns {{setActiveWallpaper: (value: (((prevState: string) => string) | string)) => void, activeWallpaper: string}}
 */
function useFoldersTheme(loaded: boolean) {
  const [activeFolderTheme, setActiveFolderTheme] = useState('');
  const [opacity, setOpacity] = useState(100);
  // toggling folder mode on/off
  const [folderStatus, setFolders] = useState(false);
  const [folderAnimation, setFolderAnimation] = useState(true);
  /**
   * This tracks the status of folders in settings (Folders can be activated and deactivated)
   */
  const getFolderStatus = () => {
    (window as any).MDS.keypair.get('folders', (resp: any) => {
      // if it doesn't exist, set it to default (true)
      if (!resp.status) {
        (window as any).MDS.keypair.set('folders', JSON.stringify({ status: false }));
      }

      if (resp.status) {
        const data = JSON.parse(resp.value);
        setFolders(data.status);
      }
    });
  };

  /**
   * This tracks the status of folders animation
   */
  const getAnimationStatus = () => {
    (window as any).MDS.keypair.get('FOLDER_ANIMATE', (resp: any) => {
      // if it doesn't exist, set it to default (true)
      if (!resp.status) {
        (window as any).MDS.keypair.set('FOLDER_ANIMATE', JSON.stringify({ status: false }));
      }

      if (resp.status) {
        const data = JSON.parse(resp.value);
        setFolderAnimation(data.status);
      }
    });
  };

  const toggleFolderStatus = () => {
    return new Promise((resolve) => {
      (window as any).MDS.keypair.set('folders', JSON.stringify({ status: !folderStatus }), (resp: any) => {
        setFolders((prevState) => !prevState);

        if (resp.status) {
          resolve(true);
        }
      });
    });
  };

  const toggleFolderAnimation = () => {
    return new Promise((resolve) => {
      (window as any).MDS.keypair.set('FOLDER_ANIMATE', JSON.stringify({ status: !folderAnimation }), (resp: any) => {
        setFolderAnimation((prevState) => !prevState);

        if (resp.status) {
          resolve(true);
        }
      });
    });
  };

  useEffect(() => {
    const activeWallpaper = localStorage.getItem('__miniHub_folder_bg');

    if (activeWallpaper) {
      set('FOLDER_BACKGROUND', activeWallpaper).then(() => {
        localStorage.removeItem('__miniHub_folder_bg');
      });
    }
  });

  /**
   * Checks to see if a wallpaper has been set in key / value storage
   */
  useEffect(() => {
    if (loaded) {
      getFolderStatus();

      getAnimationStatus();

      get('FOLDER_BACKGROUND').then(async (response) => {
        const activeWallpaper = response as string;

        if (activeWallpaper) {
          setActiveFolderTheme(activeWallpaper);
        }
      });
    }
  }, [loaded]);

  return {
    activeFolderTheme,
    setActiveFolderTheme,
    folderOpacity: opacity,
    setFolderOpacity: setOpacity,
    folderStatus,
    setFolders,
    toggleFolderStatus,
    folderAnimation,
    toggleFolderAnimation,
  };
}

export default useFoldersTheme;
