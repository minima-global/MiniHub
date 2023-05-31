import * as React from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { isWriteMode, mds } from './lib';
import downloadAndInstallMDSFile from './utilities/downloadAndInstallMDSFile';

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);
  const [appList, setAppList] = useState([]);
  const [appIsInWriteMode, setAppIsInWriteMode] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [showManage, setShowManage] = useState(false);
  const [showInstall, setShowInstall] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('');
  const [mdsInfo, setMdsInfo] = useState<any>(null)
  const [modal, setModal] = useState({
    display: false,
    title: '',
    onClose: null,
  });

  useEffect(() => {
    const theme = localStorage.getItem('__miniHub_theme');

    if (theme) {
      setTheme(theme);
    } else {
      setTheme('BLACK');
    }
  }, []);

  useEffect(() => {
    if (theme === 'PURPLE') {
      document.body.classList.remove('bg-heroWhite');
      document.body.classList.remove('bg-heroBlack');
      document.body.classList.remove('theme-light');
      document.body.classList.add('bg-heroPurple');
      document.body.classList.add('theme-dark');
    } else if (theme === 'WHITE') {
      document.body.classList.remove('bg-heroPurple');
      document.body.classList.remove('bg-heroWhite');
      document.body.classList.remove('bg-heroBlack');
      document.body.classList.remove('theme-dark');
      document.body.classList.add('bg-heroWhite');
      document.body.classList.add('theme-light');
    } else if (theme === 'BLACK') {
      document.body.classList.remove('bg-heroPurple');
      document.body.classList.remove('bg-heroWhite');
      document.body.classList.remove('bg-heroBlack');
      document.body.classList.remove('theme-light');
      document.body.classList.add('bg-heroBlack');
      document.body.classList.add('theme-dark');
    }
  }, [theme]);

  const refreshAppList = useCallback(() => {
    mds().then((response) => {
      setMdsInfo({
        installed: response.minidapps.length,
        connect:  response.connect,
        password: response.password,
      })
      setAppList([
        ...response.minidapps.filter(
          (app) => !(app.conf.name.includes('minihub') || app.conf.name.includes('MiniHub'))
        ),
        {
          uid: 'system_01',
          conf: {
            name: 'Install',
            system: true,
            onClick: () => setShowInstall(true),
          },
        },
        {
          uid: 'system_02',
          conf: {
            name: 'Manage',
            system: true,
            onClick: () => setShowManage(true),
          },
        },
        {
          uid: 'system_03',
          conf: {
            name: 'Settings',
            system: true,
            onClick: () => setShowSettings(true),
          },
        },
      ]);
    });
  }, []);

  const installRecommended = useCallback(() => {
    mds().then(async (response) => {
      const minidapps = response.minidapps;
      const downloadTarget: any = [];

      if (!minidapps.find((i) => i.conf.name === 'Health')) {
        console.log('health is not installed');
        downloadTarget.push({
          url: 'https://storage.googleapis.com/test-bucket-wt/minidapps/health-0.1.0.mds.zip',
          trust: 'read',
        });
      }

      if (!minidapps.find((i) => i.conf.name === 'Logs')) {
        console.log('logs is not installed');
        downloadTarget.push({
          url: 'https://storage.googleapis.com/test-bucket-wt/minidapps/logs-0.1.0.mds.zip',
          trust: 'read',
        });
      }

      if (!minidapps.find((i) => i.conf.name === 'Pending')) {
        console.log('pending is not installed');
        downloadTarget.push({
          url: 'https://storage.googleapis.com/test-bucket-wt/minidapps/pending-0.1.0.mds.zip',
          trust: 'write',
        });
      }

      if (!minidapps.find((i) => i.conf.name === 'Help')) {
        console.log('help is not installed');
        downloadTarget.push({
          url: 'https://storage.googleapis.com/test-bucket-wt/minidapps/help-1.0.0.mds.zip',
          trust: 'read',
        });
      }

      if (!minidapps.find((i) => i.conf.name === 'Mdsdebug')) {
        console.log('mds debug is not installed');
        downloadTarget.push({
          url: 'https://storage.googleapis.com/test-bucket-wt/minidapps/mdsdebug-0.1.0.mds.zip',
          trust: 'read',
        });
      }

      if (downloadTarget.length > 0) {
        await Promise.all(downloadTarget.map(({ url, trust }) => downloadAndInstallMDSFile(url, trust)));
        refreshAppList();
      }
    });
  }, [refreshAppList]);

  useEffect(() => {
    if (appIsInWriteMode) {
      refreshAppList();
      installRecommended();
    }
  }, [appIsInWriteMode, installRecommended, refreshAppList]);

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

  const value = {
    appList,
    query,
    setQuery,
    appIsInWriteMode,
    refreshAppList,
    showManage,
    setShowManage,
    showSettings,
    setShowSettings,
    theme,
    setTheme,
    showInstall,
    setShowInstall,
    modal,
    setModal,
    mdsInfo,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
