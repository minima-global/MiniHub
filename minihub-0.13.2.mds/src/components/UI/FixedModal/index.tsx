import { PropsWithChildren } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import Button from '../Button';

type ModalProps = {
  display: boolean;
  frosted: boolean;
  closeAtBottom?: () => void;
  className?: string;
  close?: (evt: any) => void;
  bottomText?: string;
  hideCloseAtBottomDesktop?: boolean;
};

export const FixedModal: React.FC<PropsWithChildren<ModalProps>> = ({
  frosted = false,
  closeAtBottom,
  display,
  children,
  close,
  bottomText,
  className,
  hideCloseAtBottomDesktop = false,
}) => {
  const transition: any = useTransition(display, modalAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div
              onClick={(evt) => evt.stopPropagation()}
              className="mx-auto fixed w-full h-full z-[60] flex items-center justify-center text-black"
            >
              <div className={`relative z-[80] w-full px-5 ${className ? className : 'max-w-lg'}`}>
                <animated.div style={style}>
                  <div className="modal text-white core-black-contrast-2 box-shadow-lg rounded p-6 lg:p-8 mb-6 mx-auto relative overflow-hidden">
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
                <div onClick={close} className="fixed z-[70] bg-black bg-opacity-90 top-0 left-0 w-full h-full" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FixedModal;
