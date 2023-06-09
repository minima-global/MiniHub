import { useContext } from 'react';
import { useTransition, animated } from '@react-spring/web';
import Button from '../UI/Button';
import { appContext } from '../../AppContext';
import { modalAnimation } from '../../animations';

export function Confirm() {
  const { modal, setModal } = useContext(appContext);
  const transition: any = useTransition(modal?.display, modalAnimation as any);

  const onClose = async () => {
    if (modal.onClose) {
      modal.onClose();
    }

    setModal({ display: false, title: modal.title, textContent: modal.textContent, onClose: null });
  };

  const onConfirm = () => {
    modal.onConfirm();
    setModal({ display: false, title: modal.title, textContent: modal.textContent, onConfirm: true, onClose: null });
  };

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-[70] flex items-center justify-center text-black">
              <div className="relative z-[70] w-full max-w-md px-5">
                <animated.div
                  style={style}
                  className="modal text-white core-black-contrast-2 box-shadow-lg rounded p-8 mx-auto relative overflow-hidden"
                >
                  <div>
                    <h1 className="text-xl font-bold text-center mb-6">{modal.title}</h1>
                    {modal.textContent && <p className="text-center mb-6 text-core-grey-80">{modal.textContent}</p>}
                    <div className="text-center">
                      {modal.onConfirm && (
                        <div className="mb-4">
                          <Button onClick={onConfirm}>Confirm</Button>
                        </div>
                      )}
                      <Button variant="secondary" onClick={onClose}>
                        {modal.onCloseLabel || 'Close'}
                      </Button>
                    </div>
                  </div>
                </animated.div>
              </div>
              <div className="absolute bg-black bg-opacity-60 top-0 left-0 w-full h-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Confirm;
