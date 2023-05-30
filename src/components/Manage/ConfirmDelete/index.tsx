import { useTransition, animated } from "@react-spring/web";
import { modalAnimation } from "../../../animations";
import { uninstallApp } from "../../../lib";
import { useContext } from "react";
import { appContext } from "../../../AppContext";

export function ConfirmDelete({ data, dismiss }: any) {
  const display = data && data.appUid;
  const { refreshAppList } = useContext(appContext);
  const transition: any = useTransition(display, modalAnimation as any);

  const confirm = async () => {
    await uninstallApp(data.appUid);
    refreshAppList();
    dismiss();
  };

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-20 flex items-center justify-center text-black">
              <div className="relative z-20 w-full max-w-lg px-5">
                <animated.div
                  style={style}
                  className="modal rounded bg-white box-shadow-lg p-6 mx-auto relative overflow-hidden"
                >
                  {data && (
                    <div>
                      <h1 className="text-xl text-center mb-4">
                        Confirm that you want to delete the {data.appName} app?
                      </h1>
                      <div className="mb-4 flex flex-col gap-3"></div>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={confirm}
                          className="w-full px-4 py-3.5 rounded font-bold text-black bg-black text-white"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={dismiss}
                          className="mt-4 mb-1 mx-auto text-black border-b border-black mx-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </animated.div>
              </div>
              <div className="absolute bg-black bg-opacity-60 top-0 left-0 w-full h-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ConfirmDelete;
