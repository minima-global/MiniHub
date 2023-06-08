import * as React from 'react';
import { useTransition, animated } from '@react-spring/web';
import { slideAnimation } from '../../../animations';

type SlideScreenProps = {
  display: boolean;
};

export const SlideScreen: React.FC<React.PropsWithChildren<SlideScreenProps>> = ({ display, children }) => {
  const transition: any = useTransition(display, slideAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <animated.div
              style={style}
              className="fixed top-0 left-0 z-[60] h-full w-full overflow-y-scroll custom-scrollbar mx-auto"
            >
              {children}
            </animated.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SlideScreen;
