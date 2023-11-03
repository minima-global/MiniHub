import { useContext } from 'react';
import { appContext } from '../../../AppContext';
import { animated, useTransition } from '@react-spring/web';
import { folderAnimation } from '../../../animations';
import useAppInfo from '../../../hooks/useAppInfo';
import { dAppLink } from '../../../lib';
import Button from '../../../components/UI/Button';

const Utilities = () => {
  const { isMobile, showUtilities, setShowUtilities, setShowSettings, setShowDesktopConnect } = useContext(appContext);
  const transition: any = useTransition(showUtilities, folderAnimation as any);
  const logsApp = useAppInfo('Logs');
  const healthApp = useAppInfo('Health');
  const securityApp = useAppInfo('Security');

  const dismiss = () => {
    setShowUtilities(false);
  };

  const openApp = async (app: any) => {
    const link = await dAppLink(app.conf.name);
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.open(
      `${(window as any).MDS.filehost}${link.uid}/index.html?uid=${link.sessionid}`,
      isMobile ? '_self' : '_blank'
    );
    dismiss();
  };

  return (
    <>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto fixed w-full h-full z-40 flex items-start lg:items-center justify-center text-black">
              <div onClick={dismiss} className="cursor-pointer hidden lg:block fixed z-[70] top-20 right-10 text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.30039 19.0994L0.900391 17.6994L8.60039 9.99941L0.900391 2.29941L2.30039 0.899414L10.0004 8.59941L17.7004 0.899414L19.1004 2.29941L11.4004 9.99941L19.1004 17.6994L17.7004 19.0994L10.0004 11.3994L2.30039 19.0994Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div
                onClick={dismiss}
                className="absolute backdrop-blur-lg bg-black/70 z-[60] top-0 left-0 w-full h-full"
              />
              <div className="relative z-[60] h-full w-full max-w-lg px-4 lg:px-0">
                <animated.div style={style} className="h-full">
                  <div className="mx-auto text-center flex items-center justify-center h-full w-full">
                    <div className="w-full h-full lg:h-fit flex flex-col items-center">
                      <div onClick={dismiss} className="pt-24 lg:pt-0" />
                      <h1 className="text-white font-bold text-3xl mb-8 lg:mb-10">Utilities</h1>
                      <div className="text-white w-full max-w-lg mx-auto rounded-xl flex flex-col gap-0.5 bg-core-black-contrast-2-50 rounded-xl overflow-y-scroll lg:overflow-y-auto">
                        {healthApp && (
                          <>
                            <div
                              onClick={() => openApp(healthApp)}
                              className="cursor-pointer flex items-stretch w-full p-4 bg-core-black-contrast-2-50"
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
                            <div
                              onClick={() => openApp(logsApp)}
                              className="cursor-pointer flex items-stretch w-full p-4 bg-core-black-contrast-2-50"
                            >
                              <div>
                                <img
                                  className="icon"
                                  src={`${(window as any).MDS.filehost}${logsApp.uid}/${logsApp.conf.icon}`}
                                />
                              </div>
                              <div className="flex-grow flex justify-start items-center pl-5 text-lg">
                                {logsApp.conf.name}
                              </div>
                            </div>
                          </>
                        )}
                        {securityApp && (
                          <>
                            <div
                              onClick={() => openApp(logsApp)}
                              className="cursor-pointer flex items-stretch w-full p-4 bg-core-black-contrast-2-50"
                            >
                              <div>
                                <img
                                  className="icon"
                                  src={`${(window as any).MDS.filehost}${securityApp.uid}/${securityApp.conf.icon}`}
                                />
                              </div>
                              <div className="flex-grow flex justify-start items-center pl-5 text-lg">Security</div>
                            </div>
                          </>
                        )}
                        <>
                          <a
                            href="https://minidapps.minima.global/"
                            target="_blank"
                            className="cursor-pointer flex items-stretch w-full p-4 bg-core-black-contrast-2-50"
                          >
                            <div>
                              <img className="icon" src="./assets/dappstore.png" />
                            </div>
                            <div className="flex-grow flex justify-start items-center pl-5 text-lg">MiniDapp Store</div>
                          </a>
                        </>
                        <>
                          <div
                            onClick={() => {
                              setShowUtilities(false);
                              setShowDesktopConnect(true);
                            }}
                            className="cursor-pointer flex items-stretch w-full p-4 bg-core-black-contrast-2-50"
                          >
                            <div>
                              <img className="icon" src="./assets/desktop_connect.png" />
                            </div>
                            <div className="flex-grow flex justify-start items-center pl-5 text-lg">
                              Desktop connect
                            </div>
                          </div>
                        </>
                        <>
                          <div
                            onClick={() => {
                              setShowUtilities(false);
                              setShowSettings(true);
                            }}
                            className="cursor-pointer flex items-stretch w-full p-4 bg-core-black-contrast-2-50"
                          >
                            <div>
                              <img className="icon" src="./assets/settings.png" />
                            </div>
                            <div className="flex-grow flex justify-start items-center pl-5 text-lg">Settings</div>
                          </div>
                        </>
                      </div>
                      <div onClick={dismiss} className="pb-10 lg:pb-10" />
                      <div className="pb-5 flex-grow flex justify-end items-end block lg:hidden w-full z-[100]">
                        <Button variant="secondary" onClick={dismiss}>
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </animated.div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Utilities;
