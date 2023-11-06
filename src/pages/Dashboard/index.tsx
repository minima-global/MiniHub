import { useCallback, useContext, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { appContext } from '../../AppContext';
import AppList from '../../components/AppList';
import useAppList from '../../hooks/useAppList';
import AppIsInReadMode from '../AppIsInReadMode';
import Settings from './Settings';
import Blur from '../../components/Blur';
import DeleteMiniDapp from './DeleteMiniDapp';
import UpdateMiniDapp from './UpdateMiniDapp';
import InstallMiniDapp from './InstallMiniDapp';
import StatusBar from '../../components/StatusBar';
import Utilities from './Utilities';
import Confirmation from '../../components/Confirmation';
import DashboardActionBar from '../../components/DashboardActionBar';
import MobileRightMenu from '../../components/MobileRightMenu';
import BadgeNotification from '../../components/BadgeNotification';
import MDSFail from '../../components/MDSFail';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import HasNoPeersModal from './HasNoPeersModal';
import AddConnectionsLaterModal from './AddConnectionsLaterModal';
import Joyride from 'react-joyride';
import Introduction from '../../components/Introduction';

function Dashboard() {
  const [onboard, _] = useState([
    {
      title: 'Dashboard',
      target: '.dashboard',
      content:
        'All your minidapps are found here. Right click or long press on an icon to learn more, change permissions, update or delete it.',
      placement: 'center',
    },
    {
      title: 'Install new dapps',
      target: '.onboard_install',
      content: 'Click on the + to install new minidapps that you have downloaded.',
    },
    {
      title: 'Dapp Store',
      target: '.dapp_store',
      content: 'Install or update the latest dapps from the Minima Dapp Store.  You can also create your own store!',
    },
    {
      title: 'The Blockchain',
      target: '.block_info',
      content:
        'Once connected to the network, your latest block will show here. Tap on it to check the status and health of your node.',
    },
    {
      title: 'Be sociable',
      target: '.folder_social',
      content:
        'Add your friends as contacts in MaxContacts, chat 1 on 1 in MaxSolo or interact with all your contacts and beyond on Chatter.',
    },
    {
      title: 'Your coins',
      target: '.folder_finance',
      content:
        'Use the Wallet to check your balance, addresses and to send coins. You can also create your own tokens and NFTs!',
    },
    {
      title: 'Pending',
      target: '.onboard_pending',
      content: 'Check and approve the transactions you make from read-only minidapps.',
    },
    {
      title: 'Stay Secure',
      target: '.onboard_security',
      content:
        'Check your seed phrase and lock, backup or restore your node. Turn on auto-backup to take daily backups that you can restore without your seed phrase.',
    },
    {
      title: 'Settings',
      target: '.onboard_settings',
      content:
        'Android users can use their node from a desktop on the same WiFi network, your login details can be found in Settings under Desktop Connect. You can also change or upload your own wallpaper!',
    },
    {
      title: 'Lock your node',
      target: '.onboard_security_1',
      content:
        'A red padlock here indicates that your node is not locked. Use Security to set a password so that your coins cannot be spent without it.',
    },
    {
      title: 'All set!',
      target: '.dashboard',
      content: 'You can now start playing!',
      placement: 'center',
    },
  ]);

  const { setRightMenu, folderMenu, showOnboard, maximaName, checkPeers, setShowOnboard } = useContext(appContext);
  const { maxCount, hasMoreThanOnePage, entireAppList } = useAppList();
  // @ts-ignore
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: hasMoreThanOnePage }, [WheelGesturesPlugin()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const isDev = import.meta.env.MODE === 'development';

  /**
   * Navigate to the next page
   * @type {() => void}
   */
  const next = useCallback(() => {
    if (!folderMenu) emblaApi?.scrollTo(selectedIndex + 1);
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

  return (
    <>
      <Joyride
        run={showOnboard}
        callback={(evt: any) => {
          const finishTutorial = evt.action === 'reset';

          if (finishTutorial) {
            setShowOnboard(false);
            checkPeers();
          }
        }}
        showProgress={true}
        // @ts-ignore
        steps={onboard}
        floaterProps={{
          styles: {
            wrapper: {
              zIndex: 50,
            },
          },
        }}
        styles={{
          options: {
            arrowColor: '#FAFAFF',
            backgroundColor: '#FAFAFF',
            primaryColor: '#7A17F9',
            textColor: '#08090B',
            zIndex: 5,
          },
          tooltipTitle: {
            fontSize: 16,
            fontWeight: 800,
          },
        }}
        continuous={true}
        showSkipButton={true}
      />
      <div className="app bg overflow-hidden xl:overflow-visible custom-scrollbar">
        <Introduction />
        <AppIsInReadMode />
        <InstallMiniDapp />
        <Settings />
        <Confirmation />
        <DeleteMiniDapp />
        <MobileRightMenu />
        <Utilities />
        <MDSFail />
        <UpdateMiniDapp />
        <HasNoPeersModal />
        <AddConnectionsLaterModal />

        <div
          className="dashboard flex flex-col h-screen"
          onContextMenu={!isDev ? (evt) => evt.preventDefault() : undefined}
        >
          <StatusBar />
          <span
            onClick={() =>
              (window as any).MDS.dapplink('MaxContacts', function (msg) {
                return window.open(
                  `${(window as any).MDS.filehost}${msg.uid}/index.html?uid=${msg.sessionid}#/profile`,
                  '_blank'
                );
              })
            }
            className="w-max ml-3 mr-2 flex gap-2 items-center bg-white rounded-2xl px-2 py-1 hover:cursor-pointer hover:bg-[#7A17F9] text-white bg-opacity-20 hover:text-white"
          >
            <svg
              className="fill-gray-100"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20.985 12.528a9 9 0 1 0 -8.45 8.456" />
              <path d="M16 19h6" />
              <path d="M19 16v6" />
              <path d="M9 10h.01" />
              <path d="M15 10h.01" />
              <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1" />
            </svg>
            <h3 className="text-sm  font-semibold">{maximaName}</h3>
          </span>
          <DashboardActionBar />
          <div className="flex-grow w-full max-w-[72rem] flex items-start mx-auto" onClick={() => setRightMenu(null)}>
            <div className=" embla z-30 w-full h-full px-0 py-2 sm:px-3 lg:p-2" ref={emblaRef}>
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
                    <path
                      d="M5.23899 10L0 5L5.23899 0L6 0.726294L1.52203 5L6 9.27371L5.23899 10Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              {entireAppList &&
                entireAppList.map((_page, index) => (
                  <div key={`page_${index}`} onClick={() => emblaApi?.scrollTo(index)} className="cursor-pointer p-1.5">
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
        <BadgeNotification />
      </div>
    </>
  );
}

export default Dashboard;
