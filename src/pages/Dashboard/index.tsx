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
import DesktopConnect from '../../components/DesktopConnect';

function Dashboard() {
  const { setRightMenu } = useContext(appContext);
  const { entireAppList, maxCount, hasMoreThanOnePage } = useAppList();
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: hasMoreThanOnePage });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const isDev = import.meta.env.MODE === 'development';

  const next = () => {
    1;
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
      className="app bg overflow-hidden xl:overflow-visible custom-scrollbar"
      onContextMenu={!isDev ? (evt) => evt.preventDefault() : undefined}
    >
      <AppIsInReadMode />
      <Install />
      <Update />
      <Settings />
      <Confirm />
      <ConfirmDelete />
      <MobileRightMenu />
      <DesktopConnect />
      <Utilities />

      <div className="flex flex-col h-full">
        <TitleBar />
        <ActionBar />
        <div className="flex-grow w-full max-w-[72rem] flex items-start mx-auto" onClick={() => setRightMenu(null)}>
          <div className="embla z-30 w-full h-full px-0 py-2 sm:px-3 lg:p-2" ref={emblaRef}>
            <div className="flex items-start h-full">
              {entireAppList.map((appList, index) => (
                <div
                  key={`appList_${index}`}
                  className="app-grid embla__slide w-full pt-1 sm:pt-2 lg:pt-3 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
                >
                  <AppList data={appList} maxCount={maxCount} />
                </div>
              ))}
            </div>
          </div>
          <Blur />
        </div>
        <div>
          <div
            className={`flex gap-1 items-center justify-center pb-16 lg:pb-24 ${
              selectedIndex === 0 && !hasNext ? 'hidden' : ''
            }`}
          >
            <div onClick={hasPrevious ? previous : undefined} className="hidden mr-4">
              <div
                className={`mt-0.5 ${hasPrevious ? 'cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'}}`}
              >
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.23899 10L0 5L5.23899 0L6 0.726294L1.52203 5L6 9.27371L5.23899 10Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            {entireAppList &&
              entireAppList.map((_page, index) => (
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
                  <path d="M0.76101 10L6 5L0.76101 0L0 0.726294L4.47797 5L0 9.27371L0.76101 10Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BadgeNotification />
    </div>
  );
}

export default Dashboard;
