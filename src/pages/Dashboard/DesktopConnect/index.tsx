import { useContext, useState } from 'react';
import { appContext } from '../../../AppContext';
import Block from '../../../components/UI/Block';
import FullScreen from '../../../components/UI/FullScreen';
import { networkRecalculate } from '../../../lib';
import InScreenTitleBar from '../../../components/InScreenStatusBar';

export function DesktopConnect() {
  const [isLoading, setIsLoading] = useState(false);
  const { mdsInfo, setBadgeNotification } = useContext(appContext);
  const { setShowDesktopConnect, showDesktopConnect: display } = useContext(appContext);

  const refreshNetwork = async () => {
    try {
      setIsLoading(true);
      await networkRecalculate();
      setBadgeNotification('Network URL has been refreshed');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 750);
    }
  };

  const onCopy = () => {
    setBadgeNotification('Copied to clipboard');
  };

  const dismiss = () => setShowDesktopConnect(false);

  return (
    <FullScreen display={display}>
      <div className="flex flex-col h-full">
        <InScreenTitleBar onExit={dismiss} />
        <div className="p-4 flex flex-col h-full max-w-xl mx-auto">
          <h1 className="text-2xl mb-8">Desktop connect</h1>
          <p className="text-core-grey-20 mb-4">
            You can login to your mobile node from a computer by going to the URL shown below on your computer and
            entering the password provided.
          </p>
          <p className="text-core-grey-20 mb-4">Both devices must be on the same WiFi network.</p>
          <p className="text-core-grey-80">
            You may be shown a security warning and will have to use a self signed certificate - this is safe to proceed
            past.
          </p>
          <div className="flex flex-col gap-5 mt-6">
            <div>
              <Block
                copy
                title="URL"
                value={mdsInfo?.connect}
                onCopy={onCopy}
                refresh={{
                  loading: isLoading,
                  callback: refreshNetwork,
                }}
              />
            </div>
            <div>
              <p className="text-core-grey-80 text-sm">
                If you have recently switched from mobile data to WiFi, reset your URL by clicking on the Refresh icon.
              </p>
            </div>
            <div>
              <Block copy title="Password" value={mdsInfo?.password} onCopy={onCopy} />
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
}

export default DesktopConnect;
