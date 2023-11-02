import { useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import App from '../AppList/App';

import { appContext } from '../../AppContext';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import useFolders from '../../hooks/useFolders';

const Page = ({ data }: any) => {
  return data.map((app) => <App data={app} />);
};

const AppFolder = ({ title, data }: any) => {
  const [scale, setScale] = useState(false);
  const { rightMenu } = useContext(appContext);
  const { maxDisplay } = useFolders();

  const numberOfPages = data && data.length;
  const empty = 12 - data.length;
  const emptySlots = [...Array(empty).keys()];

  //@ts-ignore
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: data.length > 1 }, [WheelGesturesPlugin()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  /**
   * Navigate to the next page
   * @type {() => void}
   */
  const next = useCallback(() => {
    emblaApi?.scrollTo(selectedIndex + 1);
  }, [emblaApi, selectedIndex]);

  /**
   * Navigate to the previous page
   * @type {() => void}
   */
  const previous = useCallback(() => {
    emblaApi?.scrollTo(selectedIndex - 1);
  }, [emblaApi, selectedIndex]);

  /**
   * Store embla api values in state
   */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setHasNext(emblaApi.canScrollNext());
    setHasPrevious(emblaApi.canScrollPrev());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  /**
   * Run callbacks if emblaApi has updated
   */
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  /**
   * Allows the user to control the slider based on the left and right keys
   */
  useEffect(() => {
    const event = (evt) => {
      if (evt.keyCode === 37 && hasPrevious) {
        previous();
      } else if (evt.keyCode === 39 && hasNext) {
        next();
      }
    };

    document.addEventListener('keyup', event);

    return () => {
      document.removeEventListener('keydown', event);
    };
  }, [hasNext, hasPrevious, next, previous]);

  // disable right click on android
  useEffect(() => {
    if (window.navigator.userAgent.includes('Minima Browser')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Android.disableDefaultContextMenu();
    }
  }, []);

  const dismiss = () => {
    setScale(false);
  };
  return (
    <>
      <div
        onClick={dismiss}
        className={`z-20 w-screen h-screen backdrop-blur-sm top-0 left-0 ${scale ? 'fixed' : 'hidden'}`}
      />

      {scale &&
        createPortal(
          <div className="grid grid-cols-1 grid-rows-[112px_1fr] absolute left-0 right-0 bottom-0 top-0">
            <header />
            <main>
              <div className="grid grid-cols-[1fr_minmax(0,560px)_1fr] grid-rows-1">
                <div />

                <div className="mx-2 my-4 bg-white bg-opacity-40 p-4 rounded-lg self-center z-[30] grid grid-cols-1 grid-rows-[auto_1fr] h-max">
                  <h1 className="font-semibold text-2xl text-center text-white mb-4">{title}</h1>
                  <div
                    className={`embla z-30 w-full h-full px-0 py-2 sm:px-3 lg:p-2 ${
                      rightMenu ? '!overflow-visible' : 'overflow-hidden'
                    }`}
                    ref={emblaRef}
                  >
                    <div className="flex items-start h-full">
                      {data.map((apps, index) => (
                        <div
                          key={`appList_${index}`}
                          className="app-grid embla__slide w-full pt-1 sm:pt-2 lg:pt-3 grid grid-cols-3 sm:grid-cols-4"
                        >
                          <Page data={apps} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div
                      className={`flex gap-1 items-center justify-center ${
                        selectedIndex === 0 && !hasNext ? 'hidden' : ''
                      }`}
                    >
                      <div onClick={hasPrevious ? previous : undefined} className="hidden mr-4">
                        <div
                          className={`mt-0.5 ${
                            hasPrevious ? 'cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'
                          }}`}
                        >
                          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5.23899 10L0 5L5.23899 0L6 0.726294L1.52203 5L6 9.27371L5.23899 10Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>

                      {data &&
                        data.map((_page, index) => (
                          <div
                            key={`page_${index}`}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className="cursor-pointer p-1.5"
                          >
                            <div className={`dot ${index === selectedIndex ? 'dot--active' : ''}`} />
                          </div>
                        ))}
                      <div onClick={hasNext ? next : undefined} className="hidden ml-4">
                        <div
                          className={`mt-0.5 text-core-grey-40 ${
                            hasNext ? 'cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'
                          }}`}
                        >
                          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M0.76101 10L6 5L0.76101 0L0 0.726294L4.47797 5L0 9.27371L0.76101 10Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div />
              </div>
            </main>
          </div>,
          document.body
        )}

      <div onClick={() => setScale(true)}>
        <div className="app-grid__icon">
          <div className="item relative flex justify-center items-center flex-col">
            <ul
              className={`hover:scale-95 active:scale-95 hover:cursor-pointer bg-white bg-opacity-50 pl-1 py-1 rounded-lg mb-3 overflow-hidden folder grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 gap-1`}
            >
              {data &&
                data[0]
                  .filter((_, index) => index < maxDisplay)
                  .map((app) => (
                    <li className="flex justify-center items-center">
                      <img
                        className={`folder_icon rounded`}
                        alt="app_icon"
                        src={
                          app.conf.overrideIcon
                            ? app.conf.overrideIcon
                            : `${(window as any).MDS.filehost}${app.uid}/${app.conf.icon}`
                        }
                      />
                    </li>
                  ))}
            </ul>

            <h1 className="appLabel">{title}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppFolder;