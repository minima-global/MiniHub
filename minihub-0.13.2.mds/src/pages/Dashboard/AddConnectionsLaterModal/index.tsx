import { useContext } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import { appContext } from '../../../AppContext';

export function AddConnectionsLaterModal() {
  const { showAddConnectionsLater: display, setShowAddConnectionsLater } = useContext(appContext);
  const transition: any = useTransition(display, modalAnimation as any);

  const dismiss = () => {
    setShowAddConnectionsLater(false);
  };

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-40 flex items-center justify-center text-black">
              {display && (
                <div className="relative z-20 w-full max-w-md px-4 lg:px-0">
                  <animated.div
                    style={style}
                    className="modal text-white core-black-contrast-2 box-shadow-lg rounded p-8 mx-auto relative overflow-hidden mb-4"
                  >
                    <div>
                      <div className="text-center">
                        <div className="mt-1 mb-6">
                          <svg
                            className="mx-auto"
                            width="48px"
                            height="48px"
                            viewBox="0 0 48 48"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g fill="#FFFFFF" fillRule="nonzero">
                                <path
                                  d="M23.99892,36 C24.55968,36 25.02996,35.8104 25.41,35.43108 C25.79004,35.05176 25.98,34.58172 25.98,34.02108 C25.98,33.46032 25.7904,32.99004 25.41108,32.61 C25.03176,32.22996 24.56172,32.04 24.00108,32.04 C23.44032,32.04 22.97004,32.2296 22.59,32.60892 C22.20996,32.98824 22.02,33.45828 22.02,34.01892 C22.02,34.57968 22.2096,35.04996 22.58892,35.43 C22.96824,35.81004 23.43828,36 23.99892,36 Z M22.38,26.82 L25.98,26.82 L25.98,11.64 L22.38,11.64 L22.38,26.82 Z M24.01596,48 C20.7066,48 17.59656,47.37 14.68596,46.11 C11.77536,44.85 9.23004,43.13004 7.05,40.95 C4.869996,38.76996 3.15,36.2232 1.89,33.3096 C0.63,30.396 0,27.28272 0,23.97 C0,20.65728 0.63,17.54412 1.89,14.63052 C3.15,11.7168 4.869996,9.18 7.05,7.02 C9.23004,4.86 11.7768,3.15 14.69052,1.89 C17.60412,0.63 20.71728,0 24.03,0 C27.34272,0 30.456,0.63 33.3696,1.89 C36.2832,3.15 38.82,4.86 40.98,7.02 C43.14,9.18 44.85,11.72004 46.11,14.64 C47.37,17.55996 48,20.67468 48,23.98404 C48,27.2934 47.37,30.40344 46.11,33.31404 C44.85,36.22464 43.14,38.76636 40.98,40.93896 C38.82,43.11156 36.27996,44.83164 33.36,46.09896 C30.44004,47.36628 27.32532,48 24.01596,48 Z M24.03,44.4 C29.69004,44.4 34.5,42.41004 38.46,38.43 C42.42,34.44996 44.4,29.63004 44.4,23.97 C44.4,18.30996 42.42372,13.5 38.47128,9.54 C34.51872,5.58 29.69496,3.6 24,3.6 C18.36,3.6 13.55004,5.576244 9.57,9.52872 C5.589996,13.48128 3.6,18.30504 3.6,24 C3.6,29.64 5.589996,34.44996 9.57,38.43 C13.55004,42.41004 18.36996,44.4 24.03,44.4 Z"
                                  id="Shape"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="text-center mt-1 mb-4 line-height">
                          You need to add connections before you can make transactions.
                        </p>
                        <p className="text-center mb-8 line-height">To add your connections later, visit Settings.</p>
                        <button
                          type="button"
                          onClick={dismiss}
                          className="w-full px-4 py-3.5 rounded font-bold text-white core-black-contrast-3 mb-1"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </animated.div>
                </div>
              )}
              <div className="absolute bg-frosted top-0 left-0 w-full h-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AddConnectionsLaterModal;
