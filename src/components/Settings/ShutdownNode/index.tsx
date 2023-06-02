import { useContext } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { appContext } from '../../../AppContext';
import { modalAnimation } from '../../../animations';

export function Confirm() {
  const { modal, setModal } = useContext(appContext);
  const transition: any = useTransition(modal?.display, modalAnimation as any);

  const onClose = async () => {
    if (modal.onClose) {
      modal.onClose();
    }

    setModal({ display: false, title: modal.title, onClose: null })
  };

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-30 flex items-center justify-center text-black">
              <div className="relative z-30 w-full max-w-md px-5">
                <animated.div
                  style={style}
                  className="modal text-white core-black-contrast-2 box-shadow-lg rounded p-8 mx-auto relative overflow-hidden"
                >
                  <div>
                    <h1 className="text-xl font-bold text-center mb-6">{modal.title}</h1>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full px-4 py-3.5 rounded font-bold text-black core-black-contrast-3 text-white"
                      >
                        Close
                      </button>
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
