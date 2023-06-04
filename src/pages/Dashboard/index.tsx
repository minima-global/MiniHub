import { useCallback, useContext, useEffect, useState } from 'react';
import AppList from '../../components/AppList';
import Install from '../../components/Install';
import AppIsInReadMode from '../../components/AppIsInReadMode';
import useAppList from '../../hooks/useAppList';
import useEmblaCarousel from 'embla-carousel-react';
import Settings from '../../components/Settings';
import { Confirm } from '../../components/Confirmation';
import Blur from '../../components/Blur';
import BadgeNotification from '../../components/BadgeNotification';
import ConfirmDelete from '../../components/Delete';
import Update from '../../components/Update';
import TitleBar from '../../components/TitleBar';
import ActionBar from '../../components/ActionBar';
import MobileRightMenu from '../../components/MobileRightMenu';
import Utilities from '../../components/Utilities';
import { appContext } from '../../AppContext';

function Dashboard() {
  const { setRightMenu } = useContext(appContext);
  const { entireAppList, maxCount, hasMoreThanOnePage } = useAppList();
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: hasMoreThanOnePage });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const isDev = import.meta.env.MODE === 'development';

  const next = () => {1
    emblaApi?.scrollTo(selectedIndex + 1);
  };

  const previous = () => {
    emblaApi?.scrollTo(selectedIndex - 1);
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setHasNext(emblaApi.canScrollNext());
    setHasPrevious(emblaApi.canScrollPrev());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

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

  return (
    <div
      className="app bg overflow-hidden xl:overflow-visible"
      onContextMenu={!isDev ? (evt) => evt.preventDefault() : undefined}
    >
      <AppIsInReadMode />
      <Install />
      <Update />
      <Settings />
      <Confirm />
      <ConfirmDelete />
      <MobileRightMenu />
      <Utilities />

      <div onClick={hasPrevious ? previous : undefined} className="hidden xl:block fixed z-20 h-full px-10 pb-10">
        <div className={`h-full flex items-center ${hasPrevious ? 'cursor-pointer' : 'opacity-20 cursor-not-allowed'}`}>
          <svg width="20px" height="34px" viewBox="0 0 26 44" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g
              id="arrow_left"
              transform="translate(12.919084, 22.147865) rotate(90.000000) translate(-12.919084, -22.147865) translate(-8.647865, 9.647865)"
              fill="#E9E9EB"
              fillRule="nonzero"
            >
              <polygon points="21.5669697 25 -2.11887563e-16 3.33913521 3.43532811 0 21.5669697 18.1293514 39.6985732 0 43.1338975 3.43532429"></polygon>
            </g>
          </svg>
        </div>
      </div>

      <div onClick={hasNext ? next : undefined} className="hidden xl:block fixed fixed right-0 z-20 h-full px-10 pb-10">
        <div className={`h-full flex items-center ${hasNext ? 'cursor-pointer' : 'opacity-20 cursor-not-allowed'}`}>
          <svg width="20px" height="34px" viewBox="0 0 26 44" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="arrow_right" fill="#E9E9EB" fillRule="nonzero">
              <g transform="translate(12.500000, 21.566949) scale(-1, 1) rotate(90.000000) translate(-12.500000, -21.566949) translate(-9.066949, 9.066949)">
                <polygon points="21.5669697 25 -2.11887563e-16 3.33913521 3.43532811 0 21.5669697 18.1293514 39.6985732 0 43.1338975 3.43532429"></polygon>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <TitleBar />
        <ActionBar />
        <div className="flex-grow w-full max-w-[72rem] flex items-start mx-auto" onClick={() => setRightMenu(null)}>
          <div className="embla z-30 w-full h-full" ref={emblaRef}>
            <div className="flex items-start h-full">
              {entireAppList.map((appList, index) => (
                <div
                  key={`appList_${index}`}
                  className="app-grid embla__slide w-full pt-2 lg:pt-3 grid grid-cols-4 lg:grid-cols-6"
                >
                  <AppList data={appList} maxCount={maxCount} />
                </div>
              ))}
            </div>
          </div>
          <Blur />
        </div>
        <div>
          <div className="flex gap-1 items-center justify-center pb-16 lg:pb-24">
            {entireAppList &&
              entireAppList.map((_page, index) => (
                <div
                  key={`page_${index}`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="cursor-pointer p-2 lg:p-3"
                >
                  <div className={`dot ${index === selectedIndex ? '' : 'opacity-50'}`} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <BadgeNotification />
    </div>
  );
}

export default Dashboard;
