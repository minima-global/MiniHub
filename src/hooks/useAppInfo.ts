import { useContext, useMemo } from 'react';
import { appContext } from '../AppContext';

/**
 * Retrieves the app information based on app name
 * E.g. Using arg health will return the mds information for that app
 * @param {string} appName
 * @returns {any}
 */
function useAppInfo(appName: string) {
  const { appList } = useContext(appContext);

  return useMemo(() => {
    return appList && appList.find((i) => i.conf.name === appName);
  }, [appList, appName]);
}

export default useAppInfo;
