import { useContext, useEffect, useState } from 'react';
import { addPeers, peers } from '../../../../lib';
import Block from '../../../../components/UI/Block';
import Button from '../../../../components/UI/Button';
import SlideScreen from '../../../../components/UI/SlideScreen';
import { appContext } from '../../../../AppContext';
import Modal from '../../../../components/UI/Modal';
import { IS_MINIMA_BROWSER } from '../../../../env';

type PeerListProps = {
  display: boolean;
  dismiss: () => void;
};

export function PeerList({ display, dismiss }: PeerListProps) {
  const { setBadgeNotification } = useContext(appContext);
  const [peersInfo, setPeersInfo] = useState<string | null>(null);
  const [inputPeerList, setInputPeerList] = useState('');
  const [importing, setImporting] = useState(false);
  const [displayImportSuccess, setDisplayImportSuccess] = useState(false);

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

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputPeerList(evt.target.value);
  };

  const importPeers = async () => {
    try {
      setImporting(true);
      await addPeers(inputPeerList);
      setInputPeerList('');
      setDisplayImportSuccess(true);
    } catch {
      setBadgeNotification('Unable to import peers list');
    } finally {
      setImporting(false);
    }
  };

  const dismissImportSuccess = () => {
    setDisplayImportSuccess(false);
  }

  const sharePeers = () => {
    // remove wrapping quotes
    const content = JSON.stringify(peersInfo).replace(/^"/gm, '').replace(/"$/gm, '');

    Android.shareText(content);
  };

  const downloadPeers = () => {
    const dateString = new Date().toISOString();
    const timeString = new Date().toTimeString();
    const date = dateString.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)![0];
    const month = date.split('-')[1];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const time = timeString.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/g)![0];
    const actualMonth = monthNames[Number(month) - 1];
    const fileName = `minima_peers_${date.split('-')[2]}${actualMonth}${date.split('-')[0]}_${time
      .split(':')
      .join('')}.txt`;

    // remove wrapping quotes
    const content = JSON.stringify(peersInfo).replace(/^"/gm, '').replace(/"$/gm, '');

    const blob = new Blob([content]);
    const url = (window as any).URL.createObjectURL(blob, { type: 'plain/text' });
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.id = 'download';
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', fileName);
    document.body.appendChild(anchor);
    document.getElementById('download')!.click();
    (window as any).URL.revokeObjectURL(url);
    anchor.remove();
  };

  return (
    <SlideScreen display={display}>
      <Modal display={displayImportSuccess} frosted={true} className="max-w-md">
        <div className="text-center">
          <div>
            <h5 className="text-2xl -mt-0.5 mx-auto mb-4">Success</h5>
            <p className="mb-9">You have successfully imported your peers</p>
          </div>
          <Button onClick={dismissImportSuccess}>Close</Button>
        </div>
      </Modal>
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
                    <div className="break-all">
                      <>{peersInfo}</>
                    </div>
                  </Block>
                  <div className="mt-5">
                    {!IS_MINIMA_BROWSER && (
                      <Button variant="secondary" onClick={downloadPeers}>Export</Button>
                    )}
                    {IS_MINIMA_BROWSER && (
                      <Button variant="secondary" onClick={sharePeers}>Share</Button>
                    )}
                  </div>
                </div>
              )}
              <p className="text-core-grey-80 text-sm">
                Share your list of peers with a new node runner, this will enable them to join the network and receive
                the blockchain.
              </p>
              <div className="block">
                <div className="core-black-contrast-2 p-4 rounded">
                  <div className="text-lg -mt-0.5 mb-4">Import peers</div>
                  <div className="mb-6 text-core-grey-80">
                    Import a list of peers that another node runner has shared with you.
                  </div>
                  <input
                    value={inputPeerList}
                    onChange={handleOnChange}
                    type="text"
                    className="core-black-contrast w-full p-3 mb-5 outline-none placeholder-gray-500"
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
