import { useContext, useEffect } from 'react';
import { appContext } from '../../AppContext';

function SettingsAddConnections() {
  const { setShowSettings, setShowAddConnections } = useContext(appContext);

  useEffect(() => {
    setShowSettings(true);
    setShowAddConnections(true);
  }, [setShowSettings, setShowAddConnections]);

  return <div />;
}

export default SettingsAddConnections;
