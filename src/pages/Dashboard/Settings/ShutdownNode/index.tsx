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

  const confirm = async () => {
    if (window.navigator.userAgent.includes('Minima Browser')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Android.shutdownMinima();
    } else {
      setIsLoading(true);
      await quit();
      setIsLoading(false);
      setShutdown(true);
      setHasShutdown(true);
    }
  };

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
      bottomText="Your node's databases will be compacted and will stop receiving blocks whilst offline."
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
          <p className="mb-10">If your node does not restart automatically, please restart it to resync to the chain</p>
          <Button onClick={confirm}>Shutdown node</Button>
          <div className="hidden lg:block mt-4">
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
