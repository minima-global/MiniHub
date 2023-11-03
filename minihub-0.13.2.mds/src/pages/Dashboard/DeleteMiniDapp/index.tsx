import { useContext, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { uninstallApp } from '../../../lib';
import { appContext } from '../../../AppContext';
import { modalAnimation } from '../../../animations';
import { useLocation, useNavigate } from 'react-router-dom';

export function ConfirmDelete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showDeleteApp: data, setShowDeleteApp, refreshAppList, setRightMenu } = useContext(appContext);
  const display = data && data.uid;
  const transition: any = useTransition(display, modalAnimation as any);

  useEffect(() => {
    if (location.pathname === '/') {
      setShowDeleteApp(false);
    }
  }, [location]);

  const confirm = async () => {
    await uninstallApp(data.uid);
    refreshAppList();
    setShowDeleteApp(false);
    setRightMenu(false);
  };

  const onClose = () => {
    navigate(-1);
    setShowDeleteApp(false);
  };

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-[60] flex items-center justify-center text-black">
              <div className="relative z-[60] w-full max-w-sm px-4 lg:px-0">
                <animated.div
                  style={style}
                  className="modal rounded core-black-contrast-2 text-white box-shadow-lg p-6 mx-auto relative overflow-hidden"
                >
                  {data && (
                    <div>
                      <h1 className="mt-2 text-2xl text-center mb-6">{data.conf.name}</h1>
                      <p className="text-center mb-5 line-height">
                        Are you sure you want to remove this MiniDapp and all of its contents?
                      </p>
                      <div className="mb-4 flex flex-col gap-3"></div>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={confirm}
                          className="w-full px-4 py-3.5 rounded core-grey-5 font-bold text-black mb-4"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full px-4 py-3.5 rounded core-black-contrast-3 font-bold text-black bg-black text-white mb-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </animated.div>
              </div>
              <div className="absolute z-40 bg-black bg-opacity-60 top-0 left-0 w-full h-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ConfirmDelete;
