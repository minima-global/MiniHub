import { useCallback, useContext, useEffect, useState } from 'react';
import AppList from '../../components/AppList';
import Install from '../../components/Install';
import AppIsInReadMode from '../../components/AppIsInReadMode';
import useAppList from '../../hooks/useAppList';
import useEmblaCarousel from 'embla-carousel-react';
import { appContext } from '../../AppContext';
import Settings from '../../components/Settings';
import { Confirm } from '../../components/Settings/ConfirmDelete';
import Blur from '../../components/Blur';
import BadgeNotification from '../../components/BadgeNotification';
import ConfirmDelete from '../../components/Delete';
import Update from '../../components/Update';
import TitleBar from '../../components/TitleBar';
import ActionBar from '../../components/ActionBar';

function Dashboard() {
  const { query, setQuery } = useContext(appContext);
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

  return (
    <div className="app bg" onContextMenu={(evt) => evt.preventDefault()}>
      <AppIsInReadMode />
      <Install />
      <Update />
      <Settings />
      <Confirm />
      <ConfirmDelete />
      <div className="flex flex-col h-full">
        <TitleBar />
        <ActionBar />
        <div className="home relative flex items-start md:items-center flex-grow max-w-lg lg:max-w-5xl mx-auto mt-4 md:mt-8 lg:mt-0 lg:mt-0">
          <div className="embla z-30 w-full flex items-start lg:px-0" ref={emblaRef}>
            <div className="flex items-start h-full relative">
              {entireAppList.map((appList, index) => (
                <div
                  key={`appList_${index}`}
                  className="embla__slide grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6"
                >
                  <AppList data={appList} maxCount={maxCount} />
                </div>
              ))}
            </div>
          </div>
          <Blur />
        </div>
        <div>
          <div className="flex gap-1 items-center justify-center pb-24">
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
      <div className="fixed z-40 bottom-0 left-0 user-select-none w-full p-8 mx-auto">
        <BadgeNotification />
      </div>
    </div>
  );
}

export default Dashboard;
