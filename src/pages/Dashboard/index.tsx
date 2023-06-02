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

function Dashboard() {
  const { entireAppList, maxCount, hasMoreThanOnePage } = useAppList();
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: hasMoreThanOnePage });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const isDev = import.meta.env.MODE === 'development';

  return (
    <div
      className="app bg overflow-hidden xl:overflow-visible"
      onContextMenu={!isDev ? (evt) => evt.preventDefault() : null}
    >
      <AppIsInReadMode />
      <Install />
      <Update />
      <Settings />
      <Confirm />
      <ConfirmDelete />
      <MobileRightMenu />
      <div className="flex flex-col h-full">
        <TitleBar />
        <ActionBar />
        <div className="flex-grow w-full max-w-5xl flex items-start mx-auto">
          <div className="embla z-30 w-full" ref={emblaRef}>
            <div className="flex items-start h-full lg:-ml-14 lg:-mr-14">
              {entireAppList.map((appList, index) => (
                <div
                  key={`appList_${index}`}
                  className="embla__slide w-full pt-2 lg:pt-3 grid grid-cols-4 lg:grid-cols-6"
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
      <div className="fixed z-50 bottom-0 left-0 user-select-none w-full p-6 lg:p-8 mx-auto">
        <BadgeNotification />
      </div>
    </div>
  );
}

export default Dashboard;
