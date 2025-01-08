import { PropsWithChildren, useContext } from 'react';
import { useTransition, animated } from '@react-spring/web';
import Button from '../UI/Button';
import { appContext } from '../../AppContext';
import { modalAnimation } from '../../animations';
import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';
import { IS_MINIMA_BROWSER } from '../../env';

export const NodeRestored: React.FC<PropsWithChildren> = () => {
  const { nodeRestored } = useContext(appContext);
  const { isMinimaBrowser } = useAndroidShowTitleBar();

  const display = !!nodeRestored;
  const transition: any = useTransition(display, modalAnimation as any);

  const closeWindow = () => {
    if (IS_MINIMA_BROWSER) {
      return Android.closeWindow();
    }
  };

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
                  <div className="modal text-center text-white bg-contrast-1 box-shadow-lg rounded p-6 lg:p-8 mb-6 mx-auto relative overflow-hidden">
                    <h5 className="text-xl -mt-1 mb-4 font-bold">Node restored</h5>
                    <p className="text-grey-80 text-sm">
                      {isMinimaBrowser ? 'Your node has been restored, please close the window and re-open the Minima app.' : 'Your node has been restored, please restart the node to continue. '}
                    </p>
                    <div className="flex flex-col gap-4">
                      {isMinimaBrowser && (
                        <div className="mt-6">
                          <Button onClick={closeWindow} variant="secondary">
                            Close window
                          </Button>
                        </div>
                      )}
                      {!isMinimaBrowser && (
                        <div className="mb-1" />
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

export default NodeRestored;
