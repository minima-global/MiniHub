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
  const { appList, query } = useContext(appContext);
  const [page, setPage] = useState(1);
  const [maxColumn, setMaxColumns] = useState(4);
  const [maxRows, setMaxRows] = useState(4);
  const maxCount = maxColumn * maxRows;

  // chunkFolders
  const [folderMaxColumns, setFolderMaxColumns] = useState(4);
  const [folderMaxRows, setFolderMaxRows] = useState(3);
  const maxFolderCount = folderMaxColumns * folderMaxRows;

  // set max per page based on width and height of screen
  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // desktop
      if (width > 1024) {
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
    for (const _app of appList) {
      if (!_app.uid.includes('system_01')) {
        _app.conf.category = 'Finance';
      }
    }

    const categoryMap = new Map();
    appList.map((_app) => {
      const key = _app.conf.category;
      const appsByCategory = categoryMap.get(key ? key : 'None');

      // None
      if (!key) {
        if (!categoryMap.has('None')) {
          return categoryMap.set('None', [_app]);
        }
        // this category already exists
        return categoryMap.set('None', [...appsByCategory, _app]);
        // Other
      } else {
        if (!categoryMap.has(key)) {
          return categoryMap.set(key, [_app]);
        }
        // this category already exists
        return categoryMap.set(key, [...appsByCategory, _app]);
      }
    });

    const cats: any = [];

    for (const [key, value] of categoryMap) {
      const map = new Map();

      const isFolder = key !== 'None';
      // chunk only folders
      map.set(key, isFolder ? _.chunk(value, maxFolderCount) : value);
      cats.push(map);
    }

    return cats;
    /**
     * After structuring appList, it should look like this
     * The specs we need is that it can be chunked for the dashboard's indexing of pages, and also each
     * app should fall under it's own category
     * [
     *  {"None" -> [{uid, conf, sessionid}]}
     *  {"Finance" -> [{uid, conf, sessionid}]}
     * ]
     */
  }, [appList]);

  const chunkedAppList = useMemo(() => {
    if (!categorizedAppList) {
      return [];
    }

    return _.chunk(
      query !== ''
        ? appList.filter((i) => i.conf.name.toLowerCase().includes(query.toLowerCase()))
        : categorizedAppList,
      maxRows * maxColumn
    );
  }, [categorizedAppList, query, maxRows, maxColumn]);

  const entireAppList = chunkedAppList;
  const currentAppListPage = chunkedAppList && chunkedAppList[page - 1];
  const numberOfPages = chunkedAppList && chunkedAppList.length;

  return {
    setPage,
    maxCount,
    entireAppList,
    numberOfPages,
    currentPage: page,
    currentAppListPage,
    hasMoreThanOnePage: numberOfPages > 1,
  };
};

export default useAppList;
