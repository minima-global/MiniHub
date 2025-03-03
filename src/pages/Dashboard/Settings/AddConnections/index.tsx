import { useContext, useState } from 'react';
import { addPeers } from '../../../../lib';
import { appContext } from '../../../../AppContext';
import Button from '../../../../components/UI/Button';
import FixedModal from '../../../../components/UI/FixedModal';
import SlideScreen from '../../../../components/UI/SlideScreen';
import { useNavigate } from 'react-router-dom';
import BackButton from '../_BackButton';

type AddConnectionsProps = {
  display: boolean;
  dismiss: () => void;
};

export function AddConnections({ display, dismiss }: AddConnectionsProps) {
  const navigate = useNavigate();
  const { setBadgeNotification, autoConnectPeers, notify, setHeaderNoPeers } = useContext(appContext);
  const [inputPeerList, setInputPeerList] = useState('');
  const [importing, setImporting] = useState(false);
  const [displayImportSuccess, setDisplayImportSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputPeerList(evt.target.value);
  };

  const importPeers = async () => {
    try {
      setImporting(true);
      await addPeers(inputPeerList);
      setInputPeerList('');
      setDisplayImportSuccess(true);
      setHeaderNoPeers(false);
    } catch {
      setBadgeNotification('Unable to import peers list');
    } finally {
      setImporting(false);
    }
  };

  const dismissImportSuccess = () => {
    setDisplayImportSuccess(false);
    navigate('/');
  };

  const handleAutoConnect = async () => {
    setLoading(true);
    try {
      await autoConnectPeers();

      setHeaderNoPeers(false);
      notify('Connected to peers');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return notify('Failed to connect to peers, try a manual connection.');
      }

      return notify('Failed to connect to peers, try a manual connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SlideScreen display={display}>
      <FixedModal display={displayImportSuccess} frosted={true} className="max-w-md">
        <div className="text-center">
          <div>
            <h5 className="text-2xl -mt-0.5 mx-auto mb-5">Connections added</h5>
            <p className="mb-4">You are connecting to the network!</p>
            <p className="mb-9">Please wait a few minutes before sending transactions.</p>
          </div>
          <Button onClick={dismissImportSuccess}>Continue</Button>
        </div>
      </FixedModal>
      <div className="flex flex-col h-full w-full bg-black">
        <BackButton dismiss={dismiss} />
        <div className="pt-16 px-4 lg:px-0 w-full pb-6 flex flex-col bg-black">
          <div className="max-w-xl mx-auto">
            <div className="text-2xl mt-6 mb-6">Add connections</div>
            <p className="mb-4">To start transacting, you must connect to other users on the network.</p>
            <p className="mb-4">You may use auto-connect to connect via a centralised Minima server. </p>
            <h5 className="font-bold text-lg mb-4">Connect to the network</h5>
            <div className="flex flex-col gap-5">
              <p>Ask someone on the network to:</p>
              <ol className="list-decimal ml-4 text-gray-400">
                <li>Open their Settings and select ‘Share connections’</li>
                <li>Copy or Share their connections </li>
              </ol>
              <p className="mb-2">Paste the list in the box below.</p>
              <div className="block mb-2">
                <div className="bg-contrast1 p-4 rounded">
                  <input
                    value={inputPeerList}
                    onChange={handleOnChange}
                    type="text"
                    className="bg-contrast2 w-full p-3 mb-5 outline-none placeholder-gray-500"
                    placeholder="Enter connections"
                  />
                  <Button onClick={importPeers} disabled={inputPeerList.length === 0 || importing}>
                    Add connections
                  </Button>
                </div>
                <div className="flex gap-5 text-sm text-gray-300 mt-4 border-l-[3px] bg-gray-500/20 pl-4 py-3 border-gray-600 text-[14px] flex items-center gap-2">
                    <svg className="min-w-[18px] min-h-[18px] text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    <div>
                    Enter a list of IP addresses or a URL to a .txt file containing a list of IPs e.g. <span className="underline">https://minima.global/minimapeers.txt</span>
                    </div>
                  </div>
              </div>
              <div className="block mb-8">
                <p className="mb-6">Otherwise you can try this auto-connect feature:</p>
                <div className="bg-contrast1 p-4 rounded">
                  <button
                    disabled={loading}
                    onClick={handleAutoConnect}
                    className={`bg-contrast2 w-full px-4 py-3.5 rounded font-bold bg-transparent text-white disabled:opacity-40 disabled:cursor-not-allowed ${loading && 'animate-pulse'}`}
                  >
                    {!loading && 'Use auto-connect'}
                    {loading && 'Finding peers...'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideScreen>
  );
}

export default AddConnections;
