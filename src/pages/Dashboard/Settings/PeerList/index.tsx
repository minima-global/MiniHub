import { useContext, useEffect, useState } from 'react';
import { addPeers, peers } from '../../../../lib';
import Block from '../../../../components/UI/Block';
import Button from '../../../../components/UI/Button';
import SlideScreen from '../../../../components/UI/SlideScreen';
import { appContext } from '../../../../AppContext';

type PeerListProps = {
  display: boolean;
  dismiss: () => void;
};

export function PeerList({ display, dismiss }: PeerListProps) {
  const { setBadgeNotification } = useContext(appContext);
  const [peersInfo, setPeersInfo] = useState<string | null>(null);
  const [showEntirePeersInfo, setShowEntirePeersInfo] = useState(false);
  const [peersInfoSnippet, setPeersInfoSnippet] = useState<string | null>(null);
  const [moreThan200Characters, setMoreThan200Characters] = useState<boolean>(false);
  const [inputPeerList, setInputPeerList] = useState('');
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (display) {
      peers().then((response) => {
        if (response['peers-list']) {
          const asString = JSON.stringify(response['peers-list']);
          const cleanString = asString.replace(/^"/gm, '').replace(/"$/gm, '');

          setPeersInfo(cleanString);
          setShowEntirePeersInfo(false);

          if (asString.length > 200) {
            setMoreThan200Characters(true);
            setPeersInfoSnippet(cleanString.slice(0, 200));
          }
        }
      });
    }
  }, [display]);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputPeerList(evt.target.value);
  };

  const importPeers = async () => {
    try {
      setImporting(true);
      await addPeers(inputPeerList);
    } catch {
      setBadgeNotification('Unable to import peers list');
    } finally {
      setImporting(false);
    }
  };

  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-full w-full bg-black">
        <div className="pt-20 px-4 lg:px-0 w-full pb-6 flex flex-col">
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
            <div className="mt-6 text-2xl mb-8">Peer list</div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-core-grey mb-4">
                  Your peers are a list of other Minima nodes that your node can connect to.
                </p>
                <p className="mb-2">
                  Every node must have at least one peer when joining the network to receive the initial blockchain
                  download.
                </p>
              </div>
              {peersInfo && (
                <div>
                  <Block title="Peers" value={peersInfo} copy>
                    {!moreThan200Characters && (
                      <div className="break-all">
                        <>{peersInfo}</>
                      </div>
                    )}
                    {moreThan200Characters && (
                      <div>
                        <div className="break-all">{showEntirePeersInfo ? peersInfo : `${peersInfoSnippet}...`}</div>
                        <div className="mt-5 cursor-pointer" onClick={() => setShowEntirePeersInfo((prevState) => !prevState)}>
                          {showEntirePeersInfo ? 'Show less' : 'Show more'}
                        </div>
                      </div>
                    )}
                  </Block>
                </div>
              )}
              <p className="text-core-grey-80 text-sm">
                Share your list of peers with a new node runner, this will enable them to join the network and receive
                the blockchain.
              </p>
              <div className="hidden">
                <div className="core-black-contrast-2 p-4 rounded">
                  <div className="text-lg -mt-0.5 mb-4">Import peers</div>
                  <div className="mb-6 text-core-grey-80">
                    Import a list of peers that another node runner has shared with you.
                  </div>
                  <input
                    value={inputPeerList}
                    onChange={handleOnChange}
                    type="text"
                    className="core-black-contrast w-full p-3 mb-5 outline-none"
                    placeholder="Peer list"
                  />
                  <Button onClick={importPeers} disabled={inputPeerList.length === 0 || importing}>Import peers</Button>
                </div>
                <p className="text-core-grey-80 text-sm mt-4">
                  This only needs to be done once when using Minima for the first time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideScreen>
  );
}

export default PeerList;
