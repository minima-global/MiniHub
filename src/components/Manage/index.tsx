import { useTransition, animated } from "@react-spring/web";
import { modalAnimation } from "../../animations";
import { useContext, useState } from "react";
import { appContext } from "../../AppContext";
import ConfirmDelete from "./ConfirmDelete";

export function Manage() {
  const {
    showManage: display,
    setShowManage,
    appList,
  } = useContext(appContext);
  const transition: any = useTransition(display, modalAnimation as any);
  const [showConfirm, setShowConfirm] = useState<
    { appUid: string; appName: string } | false
  >(false);

  return (
    <div>
      <ConfirmDelete
        data={showConfirm}
        dismiss={() => {
          setShowConfirm(false);
        }}
      />
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-10 flex items-center justify-center text-black">
              {display && (
                <div className="relative z-10 w-full max-w-4xl px-5">
                  <animated.div
                    style={style}
                    className="modal bg-white box-shadow-lg p-5 mx-auto relative overflow-hidden"
                  >
                    <div>
                      <h1 className="text-xl mb-4">Manage apps</h1>
                      <div className="mb-4 flex flex-col gap-3">
                        {appList.length === 0 && (
                          <div
                            className="border border-gray-200 p-3 w-full"
                          >
                            <div>You have no installed applications.</div>
                          </div>
                        )}
                        {appList.map((app) => (
                          <div
                            key={`manage-app__${app.uid}`}
                            className="border border-gray-200 p-2 w-full"
                          >
                            <div className="flex w-full">
                              <div className="flex gap-4">
                                <img
                                  src={`${(window as any).MDS.filehost}/${
                                    app.uid
                                  }/${app.conf.icon}`}
                                  className="w-10 h-10 rounded-lg"
                                />
                                <div className="text-lg font-bold text-core-grey-80 flex items-center">
                                  {app.conf.name}
                                </div>
                              </div>
                              <div className="flex gap-3 flex-grow flex items-center justify-end">
                                <button
                                  onClick={() =>
                                    setShowConfirm({
                                      appUid: app.uid,
                                      appName: app.conf.name,
                                    })
                                  }
                                  className="p-1 active:scale-95 text-white bg-red-500 rounded flex items-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-x"
                                  >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowManage(false)}
                          className="w-full px-4 py-3.5 rounded font-bold text-black bg-black text-white"
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

export default Manage;
