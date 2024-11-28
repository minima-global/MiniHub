import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import { appContext } from '../../../AppContext';
import FixedModal from '../../../components/UI/FixedModal';
import Button from '../../../components/UI/Button';

export function HasNoPeers() {
  const navigate = useNavigate();
  let {
    showHasNoPeers: display,
    setShowHasNoPeers,
    setShowAddConnectionsLater,
    autoConnectPeers,
    setHeaderNoPeers,
    notify
  } = useContext(appContext);
  const transition: any = useTransition(display, modalAnimation as any);


  const [displayImportSuccess, setDisplayImportSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const goToPeers = () => {
    setShowHasNoPeers(false);
    navigate('/settings/add-connections');
  };

  const dismiss = () => {
    setShowHasNoPeers(false);
    setShowAddConnectionsLater(true);
  };

  const handleAutoConnect = async () => {
    setLoading(true);
    try {
      await autoConnectPeers();
      setShowHasNoPeers(false);
      setDisplayImportSuccess(true);
      setHeaderNoPeers(false);
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

  const dismissImportSuccess = () => {
    setDisplayImportSuccess(false);
    navigate('/');
  };

  return (
    <div>
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
                                  d="M24,48 C20.67996,48 17.55996,47.37 14.64,46.11 C11.72004,44.85 9.18,43.14 7.02,40.98 C4.86,38.82 3.15,36.27996 1.89,33.36 C0.63,30.44004 0,27.32004 0,24 C0,20.67996 0.63,17.55996 1.89,14.64 C3.15,11.72004 4.86,9.18 7.02,7.02 C9.18,4.86 11.72004,3.15 14.64,1.89 C17.55996,0.63 20.67996,0 24,0 C27.32004,0 30.44004,0.63 33.36,1.89 C36.27996,3.15 38.82,4.86 40.98,7.02 C43.14,9.18 44.85,11.72004 46.11,14.64 C47.37,17.55996 48,20.67996 48,24 C48,27.32004 47.37,30.44004 46.11,33.36 C44.85,36.27996 43.14,38.82 40.98,40.98 C38.82,43.14 36.27996,44.85 33.36,46.11 C30.44004,47.37 27.32004,48 24,48 Z M21.42,44.34 L21.42,39.42 C20.01996,39.42 18.84,38.90004 17.88,37.86 C16.92,36.81996 16.44,35.60004 16.44,34.2 L16.44,31.56 L4.14,19.26 C3.939996,20.06004 3.800004,20.85 3.72,21.63 C3.639996,22.41 3.6,23.19996 3.6,24 C3.6,29.19996 5.289996,33.74004 8.67,37.62 C12.05004,41.49996 16.29996,43.74 21.42,44.34 Z M39.06,37.86 C39.93996,36.9 40.71,35.88 41.37,34.8 C42.03,33.72 42.59004,32.58996 43.05,31.41 C43.50996,30.23004 43.85004,29.01996 44.07,27.78 C44.28996,26.54004 44.4,25.28004 44.4,24 C44.4,19.76004 43.23996,15.90996 40.92,12.45 C38.60004,8.99004 35.49996,6.459996 31.62,4.86 L31.62,5.94 C31.62,7.34004 31.14,8.55996 30.18,9.6 C29.22,10.64004 28.04004,11.16 26.64,11.16 L21.42,11.16 L21.42,16.38 C21.42,17.06004 21.15,17.61996 20.61,18.06 C20.07,18.50004 19.46004,18.72 18.78,18.72 L13.8,18.72 L13.8,24 L29.28,24 C29.96004,24 30.51996,24.26004 30.96,24.78 C31.40004,25.29996 31.62,25.89996 31.62,26.58 L31.62,34.2 L34.2,34.2 C35.36004,34.2 36.38004,34.53996 37.26,35.22 C38.13996,35.90004 38.73996,36.78 39.06,37.86 Z"
                                  id="Shape"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <h1 className="mt-1 text-2xl text-center mb-6">Join the network</h1>
                        <p className="text-center mb-4 line-height">To start transacting, you must connect to other users on the network. </p>
                        <p className="text-center mb-10 line-height">
                          You may use auto-connect to connect via a centralised Minima server.
                        </p>
                        <div className="mb-2">
                          <button
                            disabled={loading}
                            onClick={handleAutoConnect}
                            className={`w-full px-4 py-3.5 rounded font-bold bg-white text-black border border-neutral-100  mb-4 disabled:opacity-40 disabled:cursor-not-allowed ${loading && 'animate-pulse'}`}
                          >
                            {!loading && 'Connect to the network'}
                            {loading && 'Finding peers...'}
                          </button>
                        </div>
                        <p className="text-center mb-6 line-height">
                          Alternatively, you can supply your own connections by asking another user to share their connections with you. 
                        </p>
                        <button
                          disabled={loading}
                          onClick={goToPeers}
                          className="w-full px-4 py-3.5 rounded font-bold text-black core-grey-5 mb-4 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Use my own connections
                        </button>
                        <button
                          disabled={loading}
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
