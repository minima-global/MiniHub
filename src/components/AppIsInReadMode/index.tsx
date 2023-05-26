import * as React from "react";
import { useTransition, animated } from "@react-spring/web";
import { modalAnimation } from "../../animations";
import { useContext, useState } from "react";
import { appContext } from "../../AppContext";

export function AppIsInReadMode() {
  const { appIsInWriteMode } = useContext(appContext);
  const display = appIsInWriteMode === false;
  const transition: any = useTransition(display, modalAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-10 flex items-center justify-center text-black">
              {display && (
                <div className="relative z-10 w-full max-w-md mx-8">
                  <animated.div
                    style={style}
                    className="modal bg-white box-shadow-lg rounded-xl p-8 mx-auto relative overflow-hidden"
                  >
                    <div>
                      <div>
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-8">App is in read mode!</h1>
                        </div>
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

export default AppIsInReadMode;
