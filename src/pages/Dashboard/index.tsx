import { useCallback, useContext, useEffect, useState } from "react";
import AppList from "../../AppList";
import Install from "../../components/Install";
import AppIsInReadMode from "../../components/AppIsInReadMode";
import useAppList from "../../hooks/useAppList";
import useEmblaCarousel from "embla-carousel-react";
import { appContext } from "../../AppContext";
import ColorThief from 'colorthief';

function pickTextColorBasedOnBgColorSimple(r,g,b) {
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? '#000' : '#FFF';
}

function Dashboard() {
  const { query, setQuery } = useContext(appContext);
  const [showInstall, setShowInstall] = useState(false);
  const { entireAppList, maxCount } = useAppList();
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    setTimeout(() => {
      try {
        const colorThief = new ColorThief();
        const elem = document.querySelector('img#ct-bg');

        if (elem) {
          const [r,g,b] = colorThief.getColor(elem);
          const dominateColor = pickTextColorBasedOnBgColorSimple(r,g,b);
          console.log(dominateColor);
        }
      } catch {
        // die
      }
    }, 2000);
  }, [])

  return (
    <div className="app bg">
      <AppIsInReadMode />
      <img alt="background" id="ct-bg" src="/assets/install.png" width="100" height="100" className="absolute z-[-1]" />
      <Install display={showInstall} dismiss={() => setShowInstall(false)} />
      <div className="flex flex-col h-full">
        <div className="title-bar p-4">
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-6 h-full flex items-center">
              <svg
                width="32"
                height="28"
                viewBox="0 0 32 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.6554 7.46969L24.2413 13.5076L22.4307 6.21148L16.0935 3.73123L14.3802 11.0346L12.8614 2.47302L6.5242 0L0 27.8974H6.92074L8.92588 19.3286L10.4297 27.8974H17.3654L19.0713 20.5868L20.8744 27.8974H27.7952L32 9.94271L25.6554 7.46969Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="col-span-6 flex items-center justify-end">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.39998 18C1.89998 18 1.47498 17.825 1.12498 17.475C0.774976 17.125 0.599976 16.7 0.599976 16.2V2.3C0.599976 1.8 0.774976 1.375 1.12498 1.025C1.47498 0.675 1.89998 0.5 2.39998 0.5H9.12498V2H2.39998C2.33331 2 2.26664 2.03333 2.19998 2.1C2.13331 2.16667 2.09998 2.23333 2.09998 2.3V16.2C2.09998 16.2667 2.13331 16.3333 2.19998 16.4C2.26664 16.4667 2.33331 16.5 2.39998 16.5H9.12498V18H2.39998ZM13.125 13.525L12.1 12.425L14.525 10H6.12498V8.5H14.525L12.1 6.075L13.125 4.975L17.4 9.25L13.125 13.525Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="search-bar py-8 px-3 sm:px-0 sm:py-12 text-center hidden lg:block">
          <div className="search-container relative mx-auto">
            <input
              type="text"
              className="input w-full mx-auto py-4 px-6"
              placeholder="Search"
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
            ></input>
            <div className="absolute top-0 right-5 flex items-center h-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3913 8.69565C16.3913 12.9458 12.9459 16.3913 8.69566 16.3913C4.44546 16.3913 1 12.9458 1 8.69565C1 4.44546 4.44546 1 8.69566 1C12.9459 1 16.3913 4.44546 16.3913 8.69565Z"
                  stroke="#E9E9EB"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L15 15"
                  stroke="#E9E9EB"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="home flex items-start md:items-center flex-grow max-w-lg lg:max-w-5xl mx-auto mt-4 md:mt-8 lg:mt-0 lg:mt-0">
          <div
            className="embla w-full flex items-start lg:px-0"
            ref={emblaRef}
          >
            <div className="flex items-start h-full">
              {entireAppList.map((appList) => (
                <div className="embla__slide grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
                  <AppList data={appList} maxCount={maxCount} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-1 items-center justify-center p-5">
            {entireAppList &&
              entireAppList.map((_page, index) => (
                <div
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="cursor-pointer p-2 lg:p-3"
                >
                  <div
                    className={`dot ${
                      index === selectedIndex ? "" : "opacity-50"
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="taskbar p-4">
          <div className="taskbar__shell flex gap-5">
            <div className="item">
              <div
                className="icon lg:mb-2"
                style={{ backgroundImage: "url(./assets/app.png)" }}
              />
              <span className="hidden lg:block">E</span>
            </div>
            <div className="item">
              <div
                className="icon lg:mb-2"
                style={{ backgroundImage: "url(./assets/app.png)" }}
              />
              <span className="hidden lg:block">L</span>
            </div>
            <div className="item">
              <div
                className="icon lg:mb-2"
                style={{ backgroundImage: "url(./assets/app.png)" }}
              />
              <span className="hidden lg:block">I</span>
            </div>
            <div className="item" onClick={() => setShowInstall(true)}>
              <div
                className="icon mb-2"
                style={{ backgroundImage: "url(./assets/install.png)" }}
              />
              <span className="mx-auto">Install</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
