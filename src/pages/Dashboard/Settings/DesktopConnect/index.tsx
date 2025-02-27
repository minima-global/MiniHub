import { useContext, useState } from 'react';
import { appContext } from '../../../../AppContext';
import Block from '../../../../components/UI/Block';
import { networkRecalculate } from '../../../../lib';
import SlideScreen from '../../../../components/UI/SlideScreen';
import BackButton from '../_BackButton';

type DesktopConnectProps = {
  display: boolean;
  dismiss: () => void;
};

const DesktopConnect = ({ display, dismiss }: DesktopConnectProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mdsInfo, setBadgeNotification } = useContext(appContext);
  const { refreshAppList } = useContext(appContext);

  const refreshNetwork = async () => {
    try {
      setIsLoading(true);
      await networkRecalculate();
      await refreshAppList();
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

  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-full bg-black">
        <BackButton dismiss={dismiss} />
        <div className="p-4 pt-20 flex flex-col h-full max-w-xl mx-auto">
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
              <p className="text-core-grey-80">
                If you have recently switched from mobile data to WiFi, reset your URL by clicking on the Refresh icon.
              </p>
            </div>
            <div>
              <Block title="Password" value={mdsInfo?.password} />
            </div>
          </div>
        </div>
      </div>
    </SlideScreen>
  )
}

export default DesktopConnect;
