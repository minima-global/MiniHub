import { useContext } from 'react';
import { appContext } from '../../AppContext';
import { animated, useTransition } from '@react-spring/web';
import { folderAnimation } from '../../animations';
import useAppInfo from '../../hooks/useAppInfo';
import { dAppLink } from '../../lib';
import Button from '../UI/Button';

const Utilities = () => {
  const { showUtilities, setShowUtilities, setShowSettings } = useContext(appContext);
  const transition: any = useTransition(showUtilities, folderAnimation as any);
  const logsApp = useAppInfo('Logs');
  const healthApp = useAppInfo('Health');

  const dismiss = () => {
    setShowUtilities(false);
  };

  const openApp = async (app: any) => {
    const link = await dAppLink(app.conf.name);
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.open(`${(window as any).MDS.filehost}${link.uid}/index.html?uid=${link.sessionid}`);
    dismiss();
  };

  return (
    <>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-40 flex items-start lg:items-center justify-center text-black">
              <div onClick={dismiss} className="cursor-pointer hidden lg:block fixed z-[70] top-20 right-10 text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.30039 19.0994L0.900391 17.6994L8.60039 9.99941L0.900391 2.29941L2.30039 0.899414L10.0004 8.59941L17.7004 0.899414L19.1004 2.29941L11.4004 9.99941L19.1004 17.6994L17.7004 19.0994L10.0004 11.3994L2.30039 19.0994Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div onClick={dismiss} className="absolute bg-frosted z-[60] top-0 left-0 w-full h-full" />
              {display && (
                <div className="relative z-[60] w-full max-w-lg px-4 lg:px-0 mt-24">
                  <animated.div style={style} className="h-full mb-10 lg:mb-16">
                    <div className="mx-auto text-center flex items-center justify-center h-full w-full">
                      <div className="w-full">
                        <h1 className="text-white font-bold text-3xl mb-8 lg:mb-10">Utilities</h1>
                        <div className="bg-utility text-white w-full max-w-lg mx-auto rounded-xl">
                          {healthApp && (
                            <>
                              <div
                                onClick={() => openApp(healthApp)}
                                className="cursor-pointer flex items-stretch w-full p-4"
                              >
                                <div>
                                  <img
                                    className="icon"
                                    src={`${(window as any).MDS.filehost}${healthApp.uid}/${healthApp.conf.icon}`}
                                  />
                                </div>
                                <div className="flex-grow flex justify-start items-center pl-5 text-lg">
                                  {healthApp.conf.name}
                                </div>
                              </div>
                            </>
                          )}
                          {logsApp && (
                            <>
                              <div className="h-0.5 w-full bg-black opacity-40" />
                              <div
                                onClick={() => openApp(logsApp)}
                                className="cursor-pointer flex items-stretch w-full p-4"
                              >
                                <div>
                                  <img
                                    className="icon"
                                    src={`${(window as any).MDS.filehost}${logsApp.uid}/${healthApp.conf.icon}`}
                                  />
                                </div>
                                <div className="flex-grow flex justify-start items-center pl-5 text-lg">
                                  {logsApp.conf.name}
                                </div>
                              </div>
                            </>
                          )}
                          <>
                            <div className="h-0.5 w-full bg-black opacity-40" />
                            <div
                              onClick={() => openApp(logsApp)}
                              className="cursor-pointer flex items-stretch w-full p-4"
                            >
                              <div>
                                <img className="icon" src={`./assets/app.png`} />
                              </div>
                              <div className="flex-grow flex justify-start items-center pl-5 text-lg">Security</div>
                            </div>
                          </>
                          <>
                            <div className="h-0.5 w-full bg-black opacity-40" />
                            <div
                              onClick={() => setShowSettings(true)}
                              className="cursor-pointer flex items-stretch w-full p-4"
                            >
                              <div>
                                <img className="icon" src="./assets/settings.png" />
                              </div>
                              <div className="flex-grow flex justify-start items-center pl-5 text-lg">Settings</div>
                            </div>
                          </>
                        </div>
                        <div className="block lg:hidden fixed left-0 bottom-0 w-full p-4 z-[100]">
                          <Button variant="secondary" onClick={dismiss}>
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </animated.div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Utilities;
