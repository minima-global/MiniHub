import { PropsWithChildren } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';

export const Confirm: React.FC<PropsWithChildren> = ({ display, children }) =>  {
  const transition: any = useTransition(display, modalAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-30 flex items-center justify-center text-black">
              <div className="relative z-30 w-full max-w-md px-5">
                <animated.div
                  style={style}
                  className="modal text-white core-black-contrast-2 box-shadow-lg rounded p-8 mx-auto relative overflow-hidden"
                >
                  {children}
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

export default Confirm;
