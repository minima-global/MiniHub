import * as React from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { isWriteMode, mds, mdsActionPermission, uninstallApp } from './lib';
import downloadAndInstallMDSFile from './utilities/downloadAndInstallMDSFile';
import useRecommended from './hooks/useInstallRecommend';

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);

  // controls the sort type for apps shown on the home screen
  const [sort, setSort] = useState('alphabetical');

  // shows fake utilities group folder
  const [showUtilities, setShowUtilities] = useState(false);

  // show settings menu
  const [showSettings, setShowSettings] = useState(false);

  const [appList, setAppList] = useState<any[]>([]);
  const [appIsInWriteMode, setAppIsInWriteMode] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('');
  const [mdsInfo, setMdsInfo] = useState<any>(null);
  const [rightMenu, setRightMenu] = useState<any>(false);
  const [badgeNotification, setBadgeNotification] = useState<string | null>(null);
  const [modal, setModal] = useState({
    display: false,
    title: '',
    onClose: null,
  });
  const [showDeleteApp, setShowDeleteApp] = useState<any | false>(false);
  const [showUpdateApp, setShowUpdateApp] = useState<any | false>(false);

  const refreshAppList = useCallback(() => {
    mds().then((response) => {
      setMdsInfo({
        installed: response.minidapps.length,
        connect: response.connect,
        password: response.password,
      });

      let apps = [
        ...response.minidapps.filter(
          (app) => !(app.conf.name.includes('minihub') || app.conf.name.includes('MiniHub'))
        ),
      ];

      if (sort === 'alphabetical') {
        apps = apps.sort((a, b) => a.conf.name.localeCompare(b.conf.name));
      } else if (sort === 'last_added') {
        apps = apps.reverse();
      }

      setAppList([
        ...apps,
        {
          uid: 'system_03',
          conf: {
            name: 'Utilities',
            system: true,
            overrideIcon: './assets/utilities.png',
            onClick: () => setShowUtilities(true),
          },
        },
      ]);
    });
  }, [sort]);

  useEffect(() => {
    if (appIsInWriteMode) {
      refreshAppList();
    }
  }, [appIsInWriteMode, refreshAppList]);

  useRecommended(appIsInWriteMode, refreshAppList);

  // init mds
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      (window as any).MDS.init((evt: any) => {
        if (evt.event === 'inited') {
          // check if app is in write mode and let the rest of the
          // app know if it is or isn't
          isWriteMode().then((appIsInWriteMode) => {
            setAppIsInWriteMode(appIsInWriteMode);
          });
        }
      });
    }
  }, [loaded]);

  const deleteApp = async (app: any) => {
    await uninstallApp(app.uid);
    await refreshAppList();
    setRightMenu(null);
    setBadgeNotification(`${app.conf.name} removed from MiniDapps`);
  };

  const setAppToWriteMode = async (app: any) => {
    await mdsActionPermission(app.uid, 'write');
    await refreshAppList();
    setBadgeNotification(`Write permissions enabled`);
  };

  const setAppToReadMode = async (app: any) => {
    await mdsActionPermission(app.uid, 'read');
    await refreshAppList();
    setBadgeNotification(`Read permissions enabled`);
  };

  const homeScreenAppList = appList.filter(i => !['Health', 'Logs', 'Security'].includes(i.conf.name));

  const value = {
    homeScreenAppList,
    appList,
    query,
    setQuery,
    appIsInWriteMode,
    refreshAppList,
    theme,
    setTheme,
    modal,
    setModal,
    mdsInfo,
    rightMenu,
    setRightMenu,
    badgeNotification,
    setBadgeNotification,
    deleteApp,
    setAppToReadMode,
    setAppToWriteMode,
    showDeleteApp,
    setShowDeleteApp,
    showUpdateApp,
    setShowUpdateApp,

    sort,
    setSort,

    showUtilities,
    setShowUtilities,

    showSettings,
    setShowSettings,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
