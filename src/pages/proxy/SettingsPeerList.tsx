import { useContext, useEffect } from 'react';
import { appContext } from '../../AppContext';

function SettingsPeerList() {
  const { setShowSettings, setShowPeerList } = useContext(appContext);

  useEffect(() => {
    setShowSettings(true);
    setShowPeerList(true);
  }, [setShowSettings, setShowPeerList]);

  return <div />;
}

export default SettingsPeerList;
