import { useContext, useState } from 'react';
import { appContext } from '../../../../AppContext';
import Block from '../../../../components/UI/Block';
import { networkRecalculate } from '../../../../lib';
import SlideScreen from '../../../../components/UI/SlideScreen';

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
        <div className="p-4 flex flex-col h-full max-w-xl mx-auto">
          <div className="pt-10 mt-8" />
          <div onClick={dismiss} className="cursor-pointer flex items-center mb-6">
            <svg
              className="mt-0.5 mr-4"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.90017 13.1693L0.730957 7.00009L6.90017 0.830872L7.79631 1.72701L2.52324 7.00009L7.79631 12.2732L6.90017 13.1693Z"
                fill="#F9F9FA"
              />
            </svg>
            Settings
          </div>
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
