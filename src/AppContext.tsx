import * as React from 'react';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { block, isWriteMode, mds, mdsActionPermission, peers, status, uninstallApp } from './lib';
import useWallpaper from './hooks/useWallpaper';
import { subMinutes, fromUnixTime, isBefore } from 'date-fns';
import * as utils from './utilities';
import { AppData } from './types/app';

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);

  const [maximaName, setMaximaName] = useState('');

  const [maximaIcon, setMaximaIcon] = useState<string | null>(null);

  const [appList, setAppList] = useState<AppData[]>([]);

  const [mdsInfo, setMdsInfo] = useState<any>(null);

  const [miniHUB, setMiniHUB] = useState(false);

  const wallpaperProps = useWallpaper(loaded.current, miniHUB);

  // desktop / or / mobile
  const [mode, setMode] = useState('desktop');

  // controls the sort type for apps shown on the home screen
  const [sort, setSort] = useState('alphabetical');

  // If sharing app state
  const [_tooltip, setToolTip] = useState<null | string>(null);

  // toggling folder mode on/off
  const [folderStatus, setFolders] = useState(false);

  // open a Folder
  const [openFolder, setOpenFolder] = useState<string[]>([]);

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

  // show introduction
  const [showIntroduction, setShowIntroduction] = useState<null | boolean>(null);

  // show onboard tour
  const [showOnboard, setShowOnboard] = useState(false);
  
  // show onboard tour
  const [tutorialMode, setTutorialMode] = useState(false);

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

  // show user does not have any peers modal
  const [showHasNoPeers, setShowHasNoPeers] = useState<boolean>(false);

  // show user does not want to add peers at this moment in time modal
  const [showAddConnectionsLater, setShowAddConnectionsLater] = useState<boolean>(false);

  // show peers list section in settings, this has been lifted because of the modal that can
  // appear if the user does not have any peers when booting up the minihub
  const [showAddConnections, setShowAddConnections] = useState(false);

  const [appIsInWriteMode, setAppIsInWriteMode] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('');
  const [rightMenu, setRightMenu] = useState<any>(false);
  const [folderMenu, setFolderMenu] = useState(false);
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

  /**
   * Hides the install / update modal if url changes
   * this is a workaround for the back button on Android phones
   * when the user presses the back button after installing / updating an app
   */
  useEffect(() => {
    const closeInstallAndUpdate = () => {
      setShowInstall(false);
      setShowUpdateApp(false);
    };

    window.addEventListener('popstate', closeInstallAndUpdate);

    return () => {
      window.removeEventListener('popstate', closeInstallAndUpdate);
    };
  }, []);

  const refreshAppList = useCallback(() => {
    return mds().then((response) => {
      setMdsInfo({
        installed: response.minidapps.length,
        connect: response.connect,
        password: response.password,
      });

      const apps = [
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
            name: 'Settings',
            system: true,
            overrideIcon: './assets/settings.png',
            onClick: 'GO_TO_SETTINGS',
          },
        },
      ];

      setMiniHUB(
        response.minidapps.find(
          (app) =>
            !(
              app.conf.name.includes('minihub') ||
              app.conf.name.includes('MiniHub') ||
              app.conf.name.includes('MiniHUB')
            )
        )
      );

      // let apps = response.minidapps;

      // if (sort === 'alphabetical') {
      //   apps = apps.sort((a, b) => a.conf.name.localeCompare(b.conf.name));
      // } else if (sort === 'last_added') {
      //   apps = apps.reverse();
      // }


      setAppList([...apps.sort((a, b) => a.conf.name.localeCompare(b.conf.name))]);

      return true;
    });
  }, []);

  useEffect(() => {
    if (appIsInWriteMode) {
      refreshAppList();
    }
  }, [appIsInWriteMode, refreshAppList]);

  // init mds
  useEffect(() => {
    const ls = localStorage.getItem(utils.getAppUID());
    const firstTimeOpeningDapp = !ls;
    if (!loaded.current) {
      loaded.current = true;

      (window as any).MDS.init((evt: any) => {
        if (evt.event === 'inited') {
          // get folder status
          getFolderStatus();

          // if it is their first time
          if (firstTimeOpeningDapp) {
            setShowIntroduction(true);
            localStorage.setItem(utils.getAppUID(), '1');
          }

          if (!firstTimeOpeningDapp) {
            setShowIntroduction(false);
            checkPeers();
          }

          getMaximaDetails();
          // check if app is in write mode and let the rest of the
          // app know if it is or isn't
          isWriteMode().then((appIsInWriteMode) => {
            setAppIsInWriteMode(appIsInWriteMode);
          });

          block().then((blockInfo) => {
            setBlockInfo({
              blockHeight: blockInfo.block,
              dateTime: blockInfo.date,
              timemilli: blockInfo.timemilli,
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
            timemilli: evt.data.txpow.header.timemilli,
          });

          status().then((response) => {
            setStatusInfo({
              locked: response.locked,
              noBlocksYet: response.chain.time === 'NO BLOCKS YET',
            });
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

  /**
   * Checks status on window focus
   */
  useEffect(() => {
    if (loaded) {
      const checkStatus = () => {
        status().then((response) => {
          setStatusInfo({
            locked: response.locked,
            noBlocksYet: response.chain.time === 'NO BLOCKS YET',
          });
        });
      };

      window.addEventListener('focus', checkStatus, false);

      return () => {
        window.removeEventListener('focus', checkStatus, false);
      };
    }
  }, [loaded]);

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

  const checkPeers = () => {
    peers().then((response) => {
      if (!response.havepeers) {
        setShowHasNoPeers(true);
      }
    });
  };

  const getMaximaDetails = () => {
    (window as any).MDS.cmd('maxima', (resp: any) => {
      if (resp.status) {
        if (resp.response.name !== 'noname') setMaximaName(resp.response.name);
        if (resp.response.icon) setMaximaIcon(resp.response.icon);
      }
    });
  };

  const getPeers = () => {
    return peers().then((response) => setPeersInfo(response));
  };

  const isNodeFiveMinutesAgoBehind = useMemo(() => {
    if (blockInfo.blockHeight) {
      const now = new Date();
      const fiveMinutesAgo = subMinutes(now, 5);
      const blockTime = fromUnixTime(Number(blockInfo.timemilli) / 1000);

      return isBefore(blockTime, fiveMinutesAgo);
    }

    return false;
  }, [blockInfo]);

  const toggleFolder = (folderId: string) => {
    setOpenFolder([folderId]);
  };

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

  const promptTooltip = (message: string, duration = 2000) => {
    setToolTip(message);

    setTimeout(() => {
      setToolTip(null);
    }, duration);
  };

  const shareApp = async (uid: string) => {
    return new Promise((resolve, reject) => {
      (window as any).MDS.cmd(`mds action:download uid:${uid}`, (resp) => {
        if (!resp.status) reject(resp.error ? resp.error : 'Download failed for this app.');
        try {
          const saveLocation = resp.response.original;
          const copy = resp.response.copy;
          if ((window as any).navigator.userAgent.includes('Minima Browser')) {
            resolve(copy);

            return Android.shareFile(saveLocation, '*/*');
          }

          resolve(copy);
        } catch (error) {
          if (error instanceof Error) {
            reject(error.message);
          }

          reject('Something went wrong');
        }
      });
    });
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

    folderMenu,
    setFolderMenu,

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
    checkPeers,

    showSearch,
    setShowSearch,

    hasShutdown,
    setHasShutdown,

    showWarning,
    setShowWarning,

    mdsFail,

    hasUpdated,
    setHasUpdated,

    showHasNoPeers,
    setShowHasNoPeers,

    showAddConnections,
    setShowAddConnections,

    showAddConnectionsLater,
    setShowAddConnectionsLater,

    isNodeFiveMinutesAgoBehind,

    loaded: loaded.current,

    showIntroduction,
    setShowIntroduction,

    // This will be just to track whether in tutorial Mode
    tutorialMode,
    setTutorialMode,
    // Toggling onboard tutorial on/off
    showOnboard,
    setShowOnboard,
    maximaName,
    maximaIcon,
    setMaximaIcon,
    setMaximaName,
    getMaximaDetails,

    toggleFolderStatus,
    folderStatus,

    openFolder,
    toggleFolder,

    shareApp,

    _tooltip,
    promptTooltip,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
