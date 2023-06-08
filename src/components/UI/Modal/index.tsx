import { PropsWithChildren } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import Button from '../Button';

type ModalProps = {
  display: boolean;
  frosted: boolean;
  closeAtBottom?: () => void;
  close?: () => void;
  bottomText?: string;
  hideCloseAtBottomDesktop?: boolean;
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  frosted = false,
  closeAtBottom,
  display,
  children,
  close,
  bottomText,
  hideCloseAtBottomDesktop = false,
}) => {
  const transition: any = useTransition(display, modalAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-[60] flex items-center justify-center text-black">
              <div className="relative z-[80] w-full max-w-lg px-5">
                <animated.div
                  style={style}
                >
                  <div className="modal text-white core-black-contrast-2 box-shadow-lg rounded p-6 lg:p-8 mb-6 mx-auto relative">
                    {children}
                  </div>
                  <p className="text-sm text-core-grey-80 text-center mb-8 lg:mb-10">{bottomText}</p>
                </animated.div>
              </div>
              {closeAtBottom && (
                <div className={`absolute bottom-10 w-full px-8 z-[90] ${hideCloseAtBottomDesktop ? 'hidden' : ''}`}>
                  <Button variant="secondary" onClick={closeAtBottom}>
                    Cancel
                  </Button>
                </div>
              )}
              {frosted && (
                <div
                  onClick={close}
                  className="absolute z-[70] bg-black bg-opacity-90 top-0 left-0 w-full h-full"
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Modal;
