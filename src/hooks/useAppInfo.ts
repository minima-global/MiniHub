import { useContext, useMemo } from 'react';
import { appContext } from '../AppContext';

function useAppInfo(appName: string) {
  const { appList } = useContext(appContext);

  return useMemo(() => {
    return appList && appList.find((i) => i.conf.name === appName);
  }, [appList, appName]);
}

export default useAppInfo;
