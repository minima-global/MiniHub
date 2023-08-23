import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import { appContext } from '../../../AppContext';

export function HasNoPeers() {
  const navigate = useNavigate();
  const { showHasNoPeers: display, setShowHasNoPeers, setShowAddConnectionsLater } = useContext(appContext);
  const transition: any = useTransition(display, modalAnimation as any);

  const goToPeers = () => {
    dismiss();
    navigate('/settings/add-connections');
  };

  const dismiss = () => {
    setShowHasNoPeers(false);
    setShowAddConnectionsLater(true);
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
                          <svg className="mx-auto" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0117 44C21.2451 44 18.6451 43.475 16.2117 42.425C13.7784 41.375 11.6617 39.95 9.86172 38.15C8.06172 36.35 6.63672 34.2333 5.58672 31.8C4.53672 29.3667 4.01172 26.7667 4.01172 24C4.01172 21.2333 4.53672 18.6333 5.58672 16.2C6.63672 13.7667 8.06172 11.65 9.86172 9.85C11.6617 8.05 13.7784 6.625 16.2117 5.575C18.6451 4.525 21.2451 4 24.0117 4C26.7784 4 29.3784 4.525 31.8117 5.575C34.2451 6.625 36.3617 8.05 38.1617 9.85C39.9617 11.65 41.3867 13.7667 42.4367 16.2C43.4867 18.6333 44.0117 21.2333 44.0117 24C44.0117 26.7667 43.4867 29.3667 42.4367 31.8C41.3867 34.2333 39.9617 36.35 38.1617 38.15C36.3617 39.95 34.2451 41.375 31.8117 42.425C29.3784 43.475 26.7784 44 24.0117 44ZM21.8617 40.95V36.85C20.6951 36.85 19.7117 36.4167 18.9117 35.55C18.1117 34.6833 17.7117 33.6667 17.7117 32.5V30.3L7.46172 20.05C7.29505 20.7167 7.17839 21.375 7.11172 22.025C7.04505 22.675 7.01172 23.3333 7.01172 24C7.01172 28.3333 8.42005 32.1167 11.2367 35.35C14.0534 38.5833 17.5951 40.45 21.8617 40.95ZM36.5617 35.55C37.2951 34.75 37.9367 33.9 38.4867 33C39.0367 32.1 39.5034 31.1583 39.8867 30.175C40.2701 29.1917 40.5534 28.1833 40.7367 27.15C40.9201 26.1167 41.0117 25.0667 41.0117 24C41.0117 20.4667 40.0451 17.2583 38.1117 14.375C36.1784 11.4917 33.5951 9.38333 30.3617 8.05V8.95C30.3617 10.1167 29.9617 11.1333 29.1617 12C28.3617 12.8667 27.3784 13.3 26.2117 13.3H21.8617V17.65C21.8617 18.2167 21.6367 18.6833 21.1867 19.05C20.7367 19.4167 20.2284 19.6 19.6617 19.6H15.5117V24H28.4117C28.9784 24 29.4451 24.2167 29.8117 24.65C30.1784 25.0833 30.3617 25.5833 30.3617 26.15V32.5H32.5117C33.4784 32.5 34.3284 32.7833 35.0617 33.35C35.7951 33.9167 36.2951 34.65 36.5617 35.55Z" fill="white"/>
                          </svg>
                        </div>
                        <h1 className="mt-1 text-2xl text-center mb-6">Join the network</h1>
                        <p className="text-center mb-4 line-height">
                          Minima is a completely decentralised network.
                        </p>
                        <p className="text-center mb-10 line-height">
                          To join, ask a Minima user to share connections with you.
                        </p>
                        <button
                          onClick={goToPeers}
                          className="w-full px-4 py-3.5 rounded font-bold text-black core-grey-5 mb-4 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Add connections
                        </button>
                        <button
                          type="button"
                          onClick={dismiss}
                          className="w-full px-4 py-3.5 rounded font-bold text-white core-black-contrast-3 mb-1"
                        >
                          I'll do it later
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
