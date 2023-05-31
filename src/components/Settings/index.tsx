import { useTransition, animated } from "@react-spring/web";
import { modalAnimation } from "../../animations";
import { useContext } from "react";
import { appContext } from "../../AppContext";

export function Settings() {
  const {
    mdsInfo,
    setTheme,
    setModal,
    setShowSettings,
    showSettings: display,
  } = useContext(appContext);
  const transition: any = useTransition(display, modalAnimation as any);

  const selectTheme = (theme: string) => {
    localStorage.setItem("__miniHub_theme", theme);
    setTheme(theme);
  };

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-10 flex items-center justify-center text-black">
              {display && (
                <div className="relative z-10 w-full h-full p-5">
                  <animated.div
                    style={style}
                    className="modal h-full bg-white box-shadow-lg p-8 mx-auto relative overflow-hidden"
                  >
                    <div className="flex flex-col h-full">
                      <h1 className="text-4xl mb-4">Settings</h1>
                      <div className="flex-grow my-4">
                        <h1 className="text-xl mb-5">Theme</h1>
                        <div className="flex gap-4">
                          <div
                            onClick={() => selectTheme('BLACK')}
                            className="cursor-pointer inset bg-black border-2 border-slate-500 w-8 h-8 rounded-full"
                          />
                          <div
                            onClick={() => selectTheme('WHITE')}
                            className="cursor-pointer inset bg-white border-2 border-slate-500 w-8 h-8 rounded-full"
                          />
                          <div
                            onClick={() => selectTheme('PURPLE')}
                            className="cursor-pointer inset bg-purple-500 border-2 border-slate-500 w-8 h-8 rounded-full"
                          />
                        </div>
                        {mdsInfo && (
                          <div className="my-8">
                            <div>
                              Installed: {mdsInfo.installed}
                            </div>
                            <div>
                              Connect URL: {mdsInfo.connect}
                            </div>
                            <div>
                              Password: {mdsInfo.password}
                            </div>
                          </div>
                        )}
                        <div className="my-8">
                          <button
                            type="button"
                            onClick={() => setModal({ display: true, title: 'You have reset your IP' })}
                            className="block mb-4 px-8 py-2 rounded font-bold text-black bg-black text-white"
                          >
                            Reset IP
                          </button>
                          <button
                            type="button"
                            onClick={() => setModal({ display: true, title: 'You have shutdown your node' })}
                            className="px-8 py-2 rounded font-bold text-black bg-black text-white"
                          >
                            Shutdown
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowSettings(false)}
                          className="px-8 py-3.5 rounded font-bold text-black bg-black text-white"
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

export default Settings;
