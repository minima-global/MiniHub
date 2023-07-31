import { useEffect, useState } from 'react';

function useRewriteHistory() {
  const [times, setTimes] = useState(0);

  useEffect(() => {
    if (times < 10) {
      setTimeout(() => {
        history.pushState({}, "", window.location.href);
        setTimes(prevState => prevState + 1);
      }, 100);
    }
  }, [times]);
}

export default useRewriteHistory;
