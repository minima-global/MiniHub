import { PropsWithChildren, useContext } from 'react';
import { useTransition, animated } from '@react-spring/web';
import Button from '../UI/Button';
import { appContext } from '../../AppContext';
import { modalAnimation } from '../../animations';
import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';
import { IS_MINIMA_BROWSER } from '../../env';

export const MDSFail: React.FC<PropsWithChildren> = () => {
  const { mdsFail, hasUpdated } = useContext(appContext);
  const { openTitleBar, isMinimaBrowser } = useAndroidShowTitleBar();
  const display = !!mdsFail;
  const transition: any = useTransition(display, modalAnimation as any);

  const goToLoginPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location.assign(MDS.filehost);
  };

  const closeWindow = () => {
    if (IS_MINIMA_BROWSER) {
      return Android.closeWindow();
    }
  };

  if (hasUpdated) {
    return <div />;
  }

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div
              onClick={(evt) => evt.stopPropagation()}
              className="mx-auto absolute w-full h-full z-[1000] flex items-center justify-center text-black"
            >
              <div className="relative z-[80] w-full max-w-[420px] px-5">
                <animated.div style={style}>
                  <div className="modal text-center text-white core-black-contrast-2 box-shadow-lg rounded p-6 lg:p-8 mb-6 mx-auto relative overflow-hidden">
                    <h5 className="text-xl -mt-1 mb-4 font-bold">Connection failed</h5>
                    {!isMinimaBrowser && (
                      <p className="mb-6">Your session is invalid, please click the button below to log in again.</p>
                    )}
                    {isMinimaBrowser && (
                      <p className="mb-6">
                        Your session is invalid, press the button below to open the title bar, then press the three
                        vertical dots and select refresh from the menu.
                      </p>
                    )}
                    <div className="flex flex-col gap-4">
                      {!isMinimaBrowser && (
                        <Button onClick={goToLoginPage} variant="secondary">
                          Login
                        </Button>
                      )}
                      {isMinimaBrowser && (
                        <>
                          <Button onClick={openTitleBar} variant="secondary">
                            Open title bar
                          </Button>
                          <Button onClick={closeWindow} variant="secondary">
                            Close window
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-core-grey-80 text-center mb-8 lg:mb-10"></p>
                </animated.div>
              </div>
              <div className="absolute z-[70] backdrop-blur-lg bg-black/40 top-0 left-0 w-full h-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MDSFail;
