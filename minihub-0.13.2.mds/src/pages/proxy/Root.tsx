import { useContext, useEffect } from 'react';
import { appContext } from '../../AppContext';

function Root() {
  const { setShowSettings } = useContext(appContext);

  useEffect(() => {
    setShowSettings(false);
  }, [setShowSettings]);

  return <div />;
}

export default Root;
