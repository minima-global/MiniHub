import { useContext, useState } from 'react';
import { addPeers } from '../../../../lib';
import { appContext } from '../../../../AppContext';
import Button from '../../../../components/UI/Button';
import FixedModal from '../../../../components/UI/FixedModal';
import SlideScreen from '../../../../components/UI/SlideScreen';
import { useNavigate } from 'react-router-dom';

type AddConnectionsProps = {
  display: boolean;
  dismiss: () => void;
};

export function AddConnections({ display, dismiss }: AddConnectionsProps) {
  const navigate = useNavigate();
  const { setBadgeNotification } = useContext(appContext);
  const [inputPeerList, setInputPeerList] = useState('');
  const [importing, setImporting] = useState(false);
  const [displayImportSuccess, setDisplayImportSuccess] = useState(false);

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
    navigate('/');
  }

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
              Add connections
            </div>
            <div className="flex flex-col gap-5">
              <p>Ask someone on the network to:</p>
              <ol className="list-decimal ml-4 text-gray-400">
                <li>Open Settings & select 'Share connections'</li>
                <li>Copy their connections or press the 'Share connections' button</li>
              </ol>
              <p className="mb-2">Once they have shared them, paste the connections below.</p>
              <div className="block mb-8">
                <div className="core-black-contrast-2 p-4 rounded">
                  <input
                    value={inputPeerList}
                    onChange={handleOnChange}
                    type="text"
                    className="core-black-contrast w-full p-3 mb-5 outline-none placeholder-gray-500"
                    placeholder="Enter connections"
                  />
                  <Button onClick={importPeers} disabled={inputPeerList.length === 0 || importing}>
                    Add connections
                  </Button>
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
