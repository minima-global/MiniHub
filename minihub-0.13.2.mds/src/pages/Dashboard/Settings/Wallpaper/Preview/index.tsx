import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../../../../AppContext';
import Button from '../../../../../components/UI/Button';
import SlideScreen from '../../../../../components/UI/SlideScreen';
import { set } from '../../../../../lib';

export type PreviewProps = {
  data: any; // TODO
  display: boolean;
  dismiss: (c: boolean) => void;
};

export function Preview({ display, data, dismiss }: PreviewProps) {
  const { setActiveWallpaper } = useContext(appContext);
  const [className, setClassName] = useState('');
  const [hasSetRecently, setHasSetRecently] = useState(false);

  useEffect(() => {
    if (hasSetRecently) {
      const timeout = setTimeout(() => {
        setHasSetRecently(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [hasSetRecently]);

  useEffect(() => {
    if (data) {
      if (data.includes('thumbnail-')) {
        setClassName(`bg-${data.replace('thumbnail-', '')}`);
      } else {
        setClassName(`bg-${data}`);
      }
    }
  }, [data]);

  const setWallpaper = () => {
    set('BACKGROUND', data);
    document.body.style.backgroundImage = '';
    setActiveWallpaper(data);
    setHasSetRecently(true);
  };

  const onClose = () => {
    dismiss(true);
    setHasSetRecently(false);
  };

  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-full">
        <div
          className={`max-w-xl mx-auto w-full pt-16 p-6 flex flex-col h-full overflow-auto custom-scrollbar ${className} bg-cover bg-preview flex h-full`}
        >
          <div onClick={onClose} className="pt-4 flex items-center">
            <svg
              className="mt-0.5 mr-4"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.90017 13.1693L0.730957 7.00009L6.90017 0.830872L7.79631 1.72701L2.52324 7.00009L7.79631 12.2732L6.90017 13.1693Z"
                fill="#F9F9FA"
              />
            </svg>
            Back
          </div>
          <div className="flex items-end flex-grow left-0 bottom-0 w-full">
            <Button onClick={setWallpaper} variant={hasSetRecently ? 'secondary' : 'primary'}>
              {hasSetRecently && 'Wallpaper updated'}
              <div
                className={`absolute top-0 right-4 flex items-center h-full transition-all ${
                  hasSetRecently ? 'scale-100' : 'scale-0'
                }`}
              >
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.32 17.52L18.78 9.06L17.1 7.38L10.32 14.16L6.9 10.74L5.22 12.42L10.32 17.52ZM12 24C10.34 24 8.78 23.685 7.32 23.055C5.86 22.425 4.59 21.57 3.51 20.49C2.43 19.41 1.575 18.14 0.945 16.68C0.315 15.22 0 13.66 0 12C0 10.34 0.315 8.78 0.945 7.32C1.575 5.86 2.43 4.59 3.51 3.51C4.59 2.43 5.86 1.575 7.32 0.945C8.78 0.315 10.34 0 12 0C13.66 0 15.22 0.315 16.68 0.945C18.14 1.575 19.41 2.43 20.49 3.51C21.57 4.59 22.425 5.86 23.055 7.32C23.685 8.78 24 10.34 24 12C24 13.66 23.685 15.22 23.055 16.68C22.425 18.14 21.57 19.41 20.49 20.49C19.41 21.57 18.14 22.425 16.68 23.055C15.22 23.685 13.66 24 12 24Z"
                      fill="#F9F9FA"
                    />
                  </svg>
                </div>
              </div>
              {!hasSetRecently && 'Set as wallpaper'}
            </Button>
          </div>
        </div>
      </div>
    </SlideScreen>
  );
}

export default Preview;
