import { useContext, useEffect, useMemo, useState } from 'react';
import { appContext } from '../AppContext';
import * as _ from 'lodash';

/**
 * Handles the grid list for apps
 * 6 columns for desktop
 * 4 columns for mobile
 * @returns {{currentAppListPage: any, hasMoreThanOnePage: boolean, numberOfPages: number, entireAppList: any[] | unknown[][], currentPage: number, maxCount: number, setPage: (value: (((prevState: number) => number) | number)) => void}}
 */
const useAppList = () => {
  const { appList, query, folderStatus } = useContext(appContext);

  const [maxColumn, setMaxColumns] = useState(4);
  const [maxRows, setMaxRows] = useState(4);
  const maxCount = maxColumn * maxRows;

  // chunkFolders
  const [folderMaxColumns, setFolderMaxColumns] = useState(3);
  const [folderMaxRows, setFolderMaxRows] = useState(3);
  const maxFolderCount = folderMaxColumns * folderMaxRows;

  // display
  const [displayMaxColumns, setDisplayMaxColumns] = useState(4);
  const [displayMaxRows, setDisplayMaxRows] = useState(3);
  const maxDisplay = displayMaxColumns * displayMaxRows;

  // set max per page based on width and height of screen
  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      /**
       * Folder outer display
       */
      if (width > 769) {
        setDisplayMaxRows(3);
        setDisplayMaxColumns(3);
      }
      if (width < 769) {
        setDisplayMaxRows(2);
        setDisplayMaxColumns(2);
      }

      if (height > 590) {
        setFolderMaxColumns(4);
        setFolderMaxRows(3);
      }

      if (height < 590) {
        setFolderMaxColumns(4);
        setFolderMaxRows(2);
      } else {
        setFolderMaxColumns(4);
        setFolderMaxRows(3);
      }

      if (height < 453) {
        setFolderMaxColumns(2);
        setFolderMaxRows(2);
      }

      if (width < 400) {
        if (height > 628) {
          setFolderMaxColumns(4);
          setFolderMaxRows(3);
        } else {
          setFolderMaxColumns(4);
          setFolderMaxRows(2);
        }
        if (height < 545) {
          setFolderMaxColumns(2);
          setFolderMaxRows(2);
        }
      }

      // desktop
      if (width > 1024) {
        if (height > 700) {
          setFolderMaxColumns(4);
          setFolderMaxRows(3);
        }

        if (height < 700) {
          setFolderMaxColumns(4);
          setFolderMaxRows(2);
        } else {
          setFolderMaxColumns(4);
          setFolderMaxRows(3);
        }

        if (height < 558) {
          setFolderMaxColumns(2);
          setFolderMaxRows(2);
        }

        if (height > 960) {
          setMaxRows(5);
        } else if (height > 830) {
          setMaxRows(4);
        } else if (height > 730) {
          setMaxRows(3);
        } else if (height > 630) {
          setMaxRows(2);
        }

        setMaxColumns(6);

        // mobile
      } else if (width > 390) {
        if (height > 900) {
          setMaxRows(6);
        } else if (height > 870) {
          setMaxRows(6);
        } else if (height > 770) {
          setMaxRows(5);
        } else if (height > 670) {
          setMaxRows(4);
        } else if (height > 570) {
          setMaxRows(3);
        } else {
          setMaxRows(2);
        }

        setMaxColumns(4);
      } else {
        if (height > 900) {
          setMaxRows(6);
        } else if (height > 780) {
          setMaxRows(6);
        } else if (height > 680) {
          setMaxRows(5);
        } else if (height > 590) {
          setMaxRows(4);
        } else if (height > 450) {
          setMaxRows(3);
        } else {
          setMaxRows(2);
        }

        setMaxColumns(3);
      }
    };

    window.addEventListener('resize', handler);
    handler();

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  const categorizedAppList = useMemo(() => {
    if (!appList) {
      return [];
    }

    /**
     * Apps data structure
     * [
     *  {uid, conf, sessionid}
     *  {uid, conf, sessionid}
     *  {uid, conf, sessionid} ...
     * ]
     */

    /**
     * I mutate appList to add categories
     * category should exist in the new MiniDapps
     * so we can remove this block after
     */
    // let i = 0;
    // const excludeApps = [
    //   'Security',
    //   'security',
    //   'Dapp Store',
    //   'dapp store',
    //   'dappstore',
    //   'Logs',
    //   'logs',
    //   'Settings',
    //   'settings',
    //   'Pending',
    //   'pending',
    // ];

    const folders = new Map();
    appList
      .filter((app) => !!app.conf.category)
      .map((_app) => {
        const key = _app.conf.category;
        const alreadyExists = folders.has(key);

        if (alreadyExists) {
          const prevVals = folders.get(key);
          return folders.set(key, [...prevVals, _app]);
        }

        return folders.set(key, [_app]);
      });

    const allApps = appList.filter((app) => !app.conf.category);

    for (const [key, value] of folders) {
      const map = new Map();
      // chunk only folders
      map.set(key, _.chunk(value, maxFolderCount));
      allApps.push(map);
    }

    return allApps;
    /**
     * After structuring appList, it should look like this
     * The specs we need is that it can be chunked for the dashboard's indexing of pages, and also each
     * app should fall under it's own category
     * [
     *  {"None" -> [{uid, conf, sessionid}]}
     *  {"Finance" -> [{uid, conf, sessionid}]}
     * ]
     */
  }, [appList, maxFolderCount]);

  const chunkFolderViewOnly: any = useMemo(() => {
    if (!appList) {
      return [];
    }

    return _.chunk(appList, maxFolderCount);
  }, [appList, maxDisplay]);

  const chunkedAppList = useMemo(() => {
    if (!categorizedAppList) {
      return [];
    }
    return _.chunk(
      query !== ''
        ? appList.filter((i) => i.conf.name.toLowerCase().includes(query.toLowerCase()))
        : folderStatus
        ? categorizedAppList
        : appList,
      maxRows * maxColumn
    );
  }, [categorizedAppList, query, maxRows, maxColumn, folderStatus]);

  const entireAppList = chunkedAppList;
  const numberOfPages = chunkedAppList && chunkedAppList.length;

  return {
    appList,
    isQueryingApps: query.length,

    maxCount,
    maxDisplay,
    maxFolderCount,
    entireAppList,
    numberOfPages,

    chunkFolderViewOnly,
    appListWithCategories: appList,

    hasMoreThanOnePage: numberOfPages > 1,
  };
};

export default useAppList;
