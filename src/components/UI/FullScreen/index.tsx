import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import { useEffect } from 'react';

type FullScreenProps = {
  display: boolean;
};

const FullScreen: React.FC<React.PropsWithChildren<FullScreenProps>> = ({ children, display }) => {
  const transition: any = useTransition(display, modalAnimation as any);

  useEffect(() => {
    document.body.classList.toggle('locked', display);
  }, [display]);

  return (
    <>
      {transition((style, display) => (
        <div>
          {display && (
            <animated.div style={style} className="fixed z-[60] bg-black w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar mb-5">
              {children}
            </animated.div>
          )}
        </div>
      ))}
    </>
  );
};

export default FullScreen;
