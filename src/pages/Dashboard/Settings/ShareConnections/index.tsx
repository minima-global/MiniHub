import { useEffect, useState } from 'react';
import { peers } from '../../../../lib';
import Block from '../../../../components/UI/Block';
import Button from '../../../../components/UI/Button';
import SlideScreen from '../../../../components/UI/SlideScreen';
import { IS_MINIMA_BROWSER } from '../../../../env';

type ShareConnectionsProps = {
  display: boolean;
  dismiss: () => void;
};

export function ShareConnections({ display, dismiss }: ShareConnectionsProps) {
  const [peersInfo, setPeersInfo] = useState<string | null>(null);

  useEffect(() => {
    if (display) {
      peers().then((response) => {
        if (response['peerslist']) {
          const asString = JSON.stringify(response['peerslist']);
          const cleanString = asString.replace(/^"/gm, '').replace(/"$/gm, '');
          setPeersInfo(cleanString);
        }
      });
    }
  }, [display]);

  const sharePeers = () => {
    // remove wrapping quotes
    const content = JSON.stringify(peersInfo).replace(/^"/gm, '').replace(/"$/gm, '');
    Android.shareText(content);
  };

  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-full w-full bg-black">
        <div className="pt-20 px-4 lg:px-0 w-full pb-6 flex flex-col bg-black">
          <div className="max-w-xl mx-auto">
            <div onClick={dismiss} className="sticky top-0 cursor-pointer flex items-center">
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
            <div className="text-2xl mt-6 mb-6">
              Share connections
            </div>
            <div className="flex flex-col gap-5">
              <p>Help a new Minima user to join the network:</p>
              <ol className="list-decimal ml-4 text-gray-400 mb-2">
                {IS_MINIMA_BROWSER && <li>Copy your connections or press the 'Share connections' button</li>}
                {!IS_MINIMA_BROWSER && <li>Copy your connections below </li>}
                <li>Share your connections with a new user</li>
              </ol>
              {peersInfo && (
                <div>
                  <Block title="Connections" value={peersInfo} copy>
                    <div className="break-all text-blue-400">
                      <>{peersInfo}</>
                    </div>
                  </Block>
                  <div className="mt-5">
                    {IS_MINIMA_BROWSER && (
                      <Button variant="secondary" onClick={sharePeers}>
                        Share connections
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SlideScreen>
  );
}

export default ShareConnections;
