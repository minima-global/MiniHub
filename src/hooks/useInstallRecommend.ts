import { mds } from '../lib';
import { useCallback, useEffect, useRef } from 'react';
import downloadAndInstallMDSFile from '../utilities/downloadAndInstallMDSFile';
import utilityMiniDapps from '../utilities_minidapps.json';
import miniDapps from '../minidapps.json';

const useRecommended = (appIsInWriteMode, refreshAppList) => {
  const loaded = useRef(false);

  const installRecommended = useCallback(() => {
    mds().then(async (response) => {
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

        console.log('installed');
      } catch (e) {
        console.log(e);
      }
    });
  }, [refreshAppList]);

  useEffect(() => {
    if (appIsInWriteMode && !loaded.current) {
      loaded.current = true;
      installRecommended();
    }
  }, [appIsInWriteMode, loaded, installRecommended]);
};

export default useRecommended;
