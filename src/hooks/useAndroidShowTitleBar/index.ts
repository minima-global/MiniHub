import { useEffect, useState } from 'react';

const useAndroidShowTitleBar = (extraData = false) => {
  const [isMinimaBrowser, setIsMinimaBrowser] = useState(false);

  const openTitleBar = () => {
    if (!isMinimaBrowser) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Android.showTitleBar();
  };

  useEffect(() => {
    if ((window as any).navigator.userAgent.includes('Minima Browser')) {
      setIsMinimaBrowser(true);
    }
  }, []);

  if (extraData) {
    return {
      openTitleBar,
      isMinimaBrowser,
    }
  }

  return openTitleBar;
};

export default useAndroidShowTitleBar;
