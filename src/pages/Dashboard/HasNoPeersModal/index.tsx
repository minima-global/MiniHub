import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import { appContext } from '../../../AppContext';

export function HasNoPeers() {
  const navigate = useNavigate();
  const { showHasNoPeers: display, setShowHasNoPeers } = useContext(appContext);
  const transition: any = useTransition(display, modalAnimation as any);

  const goToPeers = () => {
    dismiss();
    navigate('/settings/peer-list');
  };

  const dismiss = () => {
    setShowHasNoPeers(false);
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
                        <div className="mt-1 mb-5">
                          <svg className="mx-auto" width="48px" height="48px" viewBox="0 0 24 21" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                              <g id="alert-triangle" transform="translate(1.551981, 1.897256)" stroke="#FFFFFF" strokeWidth="2">
                                <path d="M8.73801895,0.962744005 L0.268018949,15.102744 C-0.0873394236,15.7181436 -0.0894611177,16.4758909 0.262445469,17.0932709 C0.614352055,17.7106509 1.26743097,18.0949338 1.97801895,18.102744 L18.9180189,18.102744 C19.6286069,18.0949338 20.2816858,17.7106509 20.6335924,17.0932709 C20.985499,16.4758909 20.9833773,15.7181436 20.6280189,15.102744 L12.1580189,0.962744005 C11.7954533,0.365025325 11.1471051,0 10.4480189,0 C9.74893277,0 9.10058461,0.365025325 8.73801895,0.962744005 Z" id="Path"></path>
                                <line x1="10.4480189" y1="6.102744" x2="10.4480189" y2="10.102744" id="Path"></line>
                                <line x1="10.4480189" y1="14.102744" x2="10.4580189" y2="14.102744" id="Path"></line>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <h1 className="mt-1 text-2xl text-center mb-6">Peers required</h1>
                        <p className="text-center mb-4 line-height">You need least one peer node to join Minima.</p>
                        <p className="text-center mb-4 line-height">
                          There are no longer central servers that control the gateway to the Minima network.
                        </p>
                        <p className="text-center mb-10 line-height">
                          Please go to <span className="font-extrabold">Settings <strong>&gt;</strong> Peer list</span> to enter a list of peers provided to you
                          by another node runner.
                        </p>
                        <button
                          onClick={goToPeers}
                          className="w-full px-4 py-3.5 rounded font-bold text-black core-grey-5 mb-4 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Go to Peers list
                        </button>
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

export default HasNoPeers;
