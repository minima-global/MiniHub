import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import { appContext } from '../../../AppContext';

export function AddConnectionsLaterModal() {
  const navigate = useNavigate();
  const { showAddConnectionsLater: display, setShowAddConnectionsLater } = useContext(appContext);
  const transition: any = useTransition(display, modalAnimation as any);

  const goToPeers = () => {
    dismiss();
    navigate('/settings/add-connections');
  };

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
                        <div className="mt-1 mb-5">
                          <svg className="mx-auto" width="42px" height="42px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g id="48px" transform="translate(0.428998, 0.099188)" fill="#FFFFFF" fillRule="nonzero">
                                <path d="M20.69925,31.44135 C21.3591833,31.44135 21.9040167,31.23365 22.33375,30.81825 C22.76345,30.4028167 22.9783,29.8651167 22.9783,29.20515 C22.9783,28.5452167 22.7658833,27.9956667 22.34105,27.5565 C21.9162167,27.1173667 21.3738167,26.8978 20.71385,26.8978 C20.0539167,26.8978 19.5090833,27.1170833 19.07935,27.55565 C18.64965,27.9941833 18.4348,28.5434333 18.4348,29.2034 C18.4348,29.8633667 18.6472167,30.40135 19.07205,30.81735 C19.4968833,31.23335 20.0392833,31.44135 20.69925,31.44135 Z M18.8761,23.11305 L22.837,23.11305 L22.837,9.9826 L18.8761,9.9826 L18.8761,23.11305 L18.8761,23.11305 Z M20.72375,41.4414 C17.8503167,41.4414 15.15855,40.9014333 12.64845,39.8216 C10.1383833,38.7417667 7.9427,37.2612167 6.0614,35.37995 C4.18013333,33.49865 2.69958333,31.3030167 1.61975,28.79305 C0.539916667,26.2830833 -1.42108547e-15,23.5899667 -1.42108547e-15,20.7137 C-1.42108547e-15,17.8374333 0.539916667,15.1430167 1.61975,12.63045 C2.69958333,10.1178833 4.17866667,7.9288 6.057,6.0632 C7.9353,4.1976 10.1301333,2.72066667 12.6415,1.6324 C15.1528333,0.544133333 17.8474333,0 20.7253,0 C23.6031333,0 26.29945,0.5434 28.81425,1.6302 C31.32905,2.717 33.51855,4.19195 35.38275,6.05505 C37.24695,7.91815 38.7227667,10.1090167 39.8102,12.62765 C40.8976333,15.1462833 41.44135,17.8442333 41.44135,20.7215 C41.44135,23.5975333 40.8972167,26.29045 39.80895,28.80025 C38.7206833,31.3100167 37.24375,33.5013167 35.37815,35.37415 C33.51255,37.2470167 31.3221167,38.7264333 28.80685,39.8124 C26.29155,40.8984 23.5971833,41.4414 20.72375,41.4414 L20.72375,41.4414 Z M20.73155,37.48045 C25.37285,37.48045 29.31995,35.8515833 32.57285,32.59385 C35.82575,29.3361167 37.4522,25.3747667 37.4522,20.7098 C37.4522,16.0685 35.8288667,12.1214 32.5822,8.8685 C29.3355667,5.6156 25.3723,3.98915 20.6924,3.98915 C16.0583667,3.98915 12.1112667,5.61248333 8.8511,8.85915 C5.59096667,12.1057833 3.9609,16.06905 3.9609,20.74895 C3.9609,25.3829833 5.58976667,29.3300833 8.8475,32.59025 C12.1052333,35.8503833 16.0665833,37.48045 20.73155,37.48045 L20.73155,37.48045 Z" id="Shape"></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="text-center mt-1 mb-4 line-height">
                          You need to add connections before you can make transactions.
                        </p>
                        <p className="text-center mb-6 line-height">
                          To add your connections later, visit Settings.
                        </p>
                        <button
                          type="button"
                          onClick={dismiss}
                          className="w-full px-4 py-3.5 rounded font-bold text-white core-black-contrast-3 mb-1"
                        >
                          Not now
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
