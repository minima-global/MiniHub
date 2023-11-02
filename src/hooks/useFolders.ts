import { useEffect, useState } from 'react';
import * as _ from 'lodash';

const useFolders = () => {
  const [page, setPage] = useState(0);
  const [maxColumns, setMaxColumns] = useState(4);
  const [maxRows, setMaxRows] = useState(3);
  const maxDisplay = maxColumns * maxRows;

  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;

      if (width > 769) {
        setMaxRows(3);
        setMaxColumns(4);
      }
      if (width < 769) {
        setMaxRows(2);
        setMaxColumns(2);
      }
    };

    window.addEventListener('resize', handler);
    handler();

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return {
    page,
    setPage,
    maxDisplay,
  };
};

export default useFolders;
