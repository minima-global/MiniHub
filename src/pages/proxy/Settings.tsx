import { useContext, useEffect } from 'react';
import { appContext } from '../../AppContext';

function Settings() {
  const { setShowSettings } = useContext(appContext);

  useEffect(() => {
    setShowSettings(true);
  }, [setShowSettings]);

  return <div />;
}

export default Settings;
