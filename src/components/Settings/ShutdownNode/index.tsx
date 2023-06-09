import Modal from '../../UI/Modal';
import Button from '../../UI/Button';
import { quit } from '../../../lib';
import { useState } from 'react';

type ShutdownProps = {
  display: boolean;
  dismiss: () => void;
};

export function ShutdownNode({ display, dismiss }: ShutdownProps) {
  const [shutdown, setShutdown] = useState(false);

  const confirm = async () => {
    await quit();
    setShutdown(true);
    (window as any).history.back();
  };

  if (shutdown) {
    return (
      <Modal display={display} frosted>
        <div>
          <div className="text-center">
            <h1 className="text-xl mb-6">Your node has been shutdown</h1>
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
      <div className="mb-1">
        <div className="text-center">
          <h5 className="text-2xl mb-6">Shutdown node</h5>
          <p className="mb-10">Your node will restart and resync to the chain automatically.</p>
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
