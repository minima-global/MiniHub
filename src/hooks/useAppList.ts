import { useContext, useEffect, useMemo, useState } from "react";
import { appContext } from "../AppContext";
import * as _ from "lodash";

const useAppList = () => {
  const { appList, query } = useContext(appContext);
  const [page, setPage] = useState(1);
  const [maxColumn, setMaxColumns] = useState(4);
  const [maxRows, setMaxRows] = useState(4);
  const maxCount = maxColumn * maxRows;

  // set max per page based on width and height of screen
  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      const height =  window.innerHeight;

      // desktop
      if (width > 1024) {
        if (height > 1200) {
          setMaxRows(5);
        } else if (height > 980) {
          setMaxRows(4);
        } else if (height > 860) {
          setMaxRows(3);
        } else {
          setMaxRows(2);
        }

        setMaxColumns(6);

      // mobile
      } else {
        if (height > 960) {
          setMaxRows(6);
        } else if (height > 800) {
          setMaxRows(4);
        } else if (height > 700) {
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
    }
  }, []);

  const chunkedAppList = useMemo(() => {
    if (!appList) {
      return [];
    }

    return _.chunk(query !== '' ? appList.filter(i => i.conf.name.toLowerCase().includes(query.toLowerCase())) : appList, maxRows * maxColumn);
  }, [appList, query, maxRows, maxColumn]);

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
  };
}

export default useAppList;
