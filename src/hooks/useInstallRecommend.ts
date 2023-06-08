import { mds } from '../lib';
import { useCallback, useContext } from 'react';
import miniDapps from '../minidapps.json';
import { appContext } from '../AppContext';
import utilityMiniDapps from '../utilities_minidapps.json';
import downloadAndInstallMDSFile from '../utilities/downloadAndInstallMDSFile';

/**
 * Installs recommended apps (DEV ONLY)
 * @returns {() => any}
 */
const useRecommended = () => {
  const { refreshAppList, setBadgeNotification } = useContext(appContext);

  return useCallback(() => {
    return mds().then(async (response) => {
      try {
        const minidapps = response.minidapps;
        const downloadTarget: any = [];

        for (const minidapp of utilityMiniDapps.dapps) {
          if (!minidapps.find((i) => i.conf.name === minidapp.name)) {
            downloadTarget.push({
              url: minidapp.url,
              trust: minidapp.trust,
            });
          }
        }

        for (const minidapp of miniDapps.dapps) {
          if (!minidapps.find((i) => i.conf.name === minidapp.name)) {
            downloadTarget.push({
              url: minidapp.file,
              trust: 'read',
            });
          }
        }

        if (downloadTarget.length > 0) {
          await Promise.all(downloadTarget.map(({ url, trust }) => downloadAndInstallMDSFile(url, trust)));
          refreshAppList();
        }

        setBadgeNotification('Recommended apps have been installed');
      } catch (e) {
        // console.log(e);
      }
    });
  }, [refreshAppList, setBadgeNotification]);
};

export default useRecommended;
