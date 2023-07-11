import * as React from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { block, isWriteMode, mds, mdsActionPermission, peers, status, uninstallApp } from './lib';
import useWallpaper from './hooks/useWallpaper';

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);

  const wallpaperProps = useWallpaper();

  // desktop / or / mobile
  const [mode, setMode] = useState('desktop');

  // controls the sort type for apps shown on the home screen
  const [sort, setSort] = useState('alphabetical');

  // shows fake utilities group folder
  const [showUtilities, setShowUtilities] = useState(false);

  // show settings menu
  const [showSettings, setShowSettings] = useState(false);

  // show desktop connect
  const [showDesktopConnect, setShowDesktopConnect] = useState(false);

  // show search
  const [showSearch, setShowSearch] = useState(false);

  // show install menu
  const [showInstall, setShowInstall] = useState(false);

  // peers
  const [peersInfo, setPeersInfo] = useState(false);

  // has shutdown
  const [hasShutdown, setHasShutdown] = useState(false);

  // has updated
  const [hasUpdated, setHasUpdated] = useState(false);

  // block info
  const [blockInfo, setBlockInfo] = useState<any>({
    blockHeight: null,
    date: null,
  });

  // status info
  const [statusInfo, setStatusInfo] = useState<any>({
    locked: null,
  });

  // warning blocks
  const [showWarning, setShowWarning] = useState<number | false>(false);

  const [appList, setAppList] = useState<any[]>([]);
  const [appIsInWriteMode, setAppIsInWriteMode] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('');
  const [mdsInfo, setMdsInfo] = useState<any>(null);
  const [rightMenu, setRightMenu] = useState<any>(false);
  const [badgeNotification, setBadgeNotification] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    display: boolean;
    title: string;
    textContent: string | null;
    onConfirm: any;
    onClose: any;
  }>({
    display: false,
    title: '',
    textContent: null,
    onConfirm: null,
    onClose: null,
  });
  const [showDeleteApp, setShowDeleteApp] = useState<any | false>(false);
  const [showUpdateApp, setShowUpdateApp] = useState<any | false>(false);
  const [mdsFail, setMDSFail] = useState<string | boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 568) {
      setMode('mobile');
    }
  }, []);

  const refreshAppList = useCallback(() => {
    return mds().then((response) => {
      setMdsInfo({
        installed: response.minidapps.length,
        connect: response.connect,
        password: response.password,
      });

      let apps = [
        ...response.minidapps.filter(
          (app) =>
            !(
              app.conf.name.includes('minihub') ||
              app.conf.name.includes('MiniHub') ||
              app.conf.name.includes('MiniHUB')
            )
        ),
        {
          uid: 'system_01',
          conf: {
            name: 'DappStore',
            system: true,
            overrideIcon: './assets/dappstore.png',
            onClick: () => {
              window.open('https://minidapps.minima.global/', '_blank')
            }
          },
        },
        {
          uid: 'system_02',
          conf: {
            name: 'Settings',
            system: true,
            overrideIcon: './assets/settings.png',
            onClick: () => setShowSettings(true),
          },
        },
      ];

      // let apps = response.minidapps;

      if (sort === 'alphabetical') {
        apps = apps.sort((a, b) => a.conf.name.localeCompare(b.conf.name));
      } else if (sort === 'last_added') {
        apps = apps.reverse();
      }

      setAppList([...apps]);

      return true;
    });
  }, [sort]);

  useEffect(() => {
    if (appIsInWriteMode) {
      refreshAppList();
    }
  }, [appIsInWriteMode, refreshAppList]);

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

          block().then((blockInfo) => {
            setBlockInfo({
              blockHeight: blockInfo.block,
              dateTime: blockInfo.date,
            });
          });

          status().then((response) => {
            setStatusInfo({
              locked: response.locked,
              noBlocksYet: response.chain.time === 'NO BLOCKS YET',
            });
          });
        }

        if (evt.event === 'NEWBLOCK') {
          setBlockInfo({
            blockHeight: evt.data.txpow.header.block,
            dateTime: evt.data.txpow.header.date,
          });
        }

        if (evt.event === 'MDS_MINIDAPPS_CHANGE') {
          refreshAppList();
        }

        if (evt.event === 'MDS_HEAVIER_CHAIN') {
          setShowWarning(1);
        }

        if (evt.event === 'MDSFAIL') {
          setMDSFail(true);
        }
      });
    }
  }, [loaded, refreshAppList]);

  const deleteApp = async (app: any) => {
    await uninstallApp(app.uid);
    await refreshAppList();
    setRightMenu(null);
    setBadgeNotification(`${app.conf.name} removed from MiniDapps`);
  };

  const setAppToWriteMode = async (app: any) => {
    setModal({
      display: true,
      title: 'Are you sure you wish to give this MiniDAPP WRITE permissions?',
      textContent:
        'This MiniDAPP will be able to send funds without triggering a pending request, ONLY do this if you trust this MiniDAPP.',
      onConfirm: async () => {
        await mdsActionPermission(app.uid, 'write');
        await refreshAppList();
        setBadgeNotification(`Write permissions enabled`);
      },
      onClose: null,
    });
  };

  const setAppToReadMode = async (app: any) => {
    setModal({
      display: true,
      title: 'Are you sure you wish to give this MiniDAPP READ permissions?',
      textContent: 'This MiniDAPP will NOT be able to send funds without triggering a pending request.',
      onConfirm: async () => {
        await mdsActionPermission(app.uid, 'read');
        await refreshAppList();
        setBadgeNotification(`Read permissions enabled`);
      },
      onClose: null,
    });
  };

  const getPeers = () => {
    return peers().then((response) => setPeersInfo(response));
  };

  const value = {
    mode,
    isMobile: mode === 'mobile',
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

    showInstall,
    setShowInstall,

    blockInfo,
    statusInfo,

    showDesktopConnect,
    setShowDesktopConnect,

    ...wallpaperProps,

    getPeers,
    peersInfo,

    showSearch,
    setShowSearch,

    hasShutdown,
    setHasShutdown,

    showWarning,
    setShowWarning,

    mdsFail,

    hasUpdated,
    setHasUpdated,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
