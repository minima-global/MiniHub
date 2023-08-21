import { useContext, useState } from 'react';
import { quit } from '../../../../lib';
import Modal from '../../../../components/UI/Modal';
import Button from '../../../../components/UI/Button';
import { appContext } from '../../../../AppContext';

type ShutdownProps = {
  display: boolean;
  dismiss: () => void;
};

export function ShutdownNode({ display, dismiss }: ShutdownProps) {
  const { setHasShutdown } = useContext(appContext);
  const [shutdown, setShutdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [compactDatabase, setCompactDatabase] = useState(false);

  const confirm = async () => {
    if (window.navigator.userAgent.includes('Minima Browser')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Android.shutdownMinima(compactDatabase);
    } else {
      setIsLoading(true);
      await quit(compactDatabase);
      setIsLoading(false);
      setShutdown(true);
      setHasShutdown(true);
    }
  };

  const toggleCompactDatabase = () => {
    setCompactDatabase(prevState => !prevState);
  }

  if (shutdown) {
    return (
      <Modal display={display} frosted>
        <div>
          <div className="text-center">
            <h1 className="text-xl">Your node has been shutdown, please close this page</h1>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      frosted
      display={display}
      closeAtBottom={dismiss}
      hideCloseAtBottomDesktop
    >
      <div
        className={`absolute z-20 top-0 left-0 w-full h-full core-black-contrast-2 text-white ${
          isLoading ? 'flex items-center justify-center' : 'hidden'
        }`}
      >
        <div className="flex flex-col items-center mt-6 gap-6">
          <div className="spinner" />
          <div className="text-gray-400">Please wait</div>
        </div>
      </div>
      <div className="mb-1">
        <div className="text-center">
          <h5 className="text-2xl mb-6">Shutdown node</h5>
          <p className="mb-8">If your node does not restart automatically, please restart it to resync to the chain</p>
          <div className="mb-10 flex item-center justify-center">
            <label className="flex items-center">
              <input type="checkbox" className="checkbox mr-4" onClick={toggleCompactDatabase} />
              Compact database
            </label>
          </div>
          <Button onClick={confirm}>Shutdown node</Button>
          <div className="block mt-4">
            <Button onClick={dismiss} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ShutdownNode;
