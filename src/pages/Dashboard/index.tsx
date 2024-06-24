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
import Joyride, { ACTIONS, CallBackProps, EVENTS, Step } from 'react-joyride';
import Introduction from '../../components/Introduction';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function findPageIndexContainingApp(name, apps) {
  // Loop through each inner array
  for (let i = 0; i < apps.length; i++) {
    const innerArray = apps[i];
    // Check if the inner array contains an object with the specified name
    const foundObjectIndex = innerArray.findIndex((obj) => obj.conf.name === name);
    // If found, return the index of the inner array
    if (foundObjectIndex !== -1) {
      return i;
    }
  }

  return -1;
}

function Dashboard() {
  // onboard tutorial content
  const [onboard, _] = useState<Step[]>([
    {
      // 1
      title: 'Dashboard',
      target: '.dashboard',
      content:
        'All your minidapps are found here. Right click or long press on an icon to learn more, change permissions, update or delete it.',
      placement: 'center',
    },
    {
      //2
      title: 'Stay Secure',
      target: '.onboard_security',
      content:
        'Check your seed phrase and lock, backup or restore your node. Turn on auto-backup to take daily backups that you can restore without your seed phrase.',
    },
    {
      //3
      title: 'Install new dapps',
      target: '.onboard_install',
      content: 'Click on the + to install new minidapps that you have downloaded.',
      placement: 'top',
    },
    {
      //4
      title: 'Dapp Store',
      target: '.dapp_store',
      content: 'Install or update the latest dapps from the Minima Dapp Store.  You can also create your own store!',
    },
    {
      //5
      title: 'The Blockchain',
      target: '.block_info',
      content:
        'Once connected to the network, your latest block will show here. Tap on it to check the status and health of your node.',
      placement: 'bottom',
    },
    {
      //6
      title: 'Be sociable',
      target: '.folder_social',
      placement: 'top',
      content:
        'Add your friends as contacts in MaxContacts, chat 1 on 1 in MaxSolo or interact with all your contacts and beyond on Chatter.',
    },
    {
      //7
      title: 'Your coins',
      target: '.onboard_wallet',
      content:
        'Use the Wallet to check your balance, addresses and to send coins. You can also create your own tokens and NFTs!',
    },
    {
      //8
      title: 'Pending',
      target: '.onboard_pending',
      content: 'Check and approve the transactions you make from read-only minidapps.',
    },
    {
      //9
      title: 'Lock your node',
      target: '.onboard_security_1',
      content:
        'A red padlock here indicates that your node is not locked. Use Security to set a password so that your coins cannot be spent without it.',
    },
    {
      //10
      title: 'Settings',
      target: '.onboard_settings',
      content:
        'Android users can use their node from a desktop on the same WiFi network, your login details can be found in Settings under Desktop Connect. You can also change or upload your own wallpaper!',
    },
    {
      //11
      title: 'Let\'s go!',
      target: '.dashboard',
      content: 'You can now start playing!',
      placement: 'center'
    },
  ]);

  const [stepIndex, setStepIndex] = useState(0);

  const {
    setRightMenu,
    folderMenu,
    showOnboard,
    setShowOnboard,
    tutorialMode,
    setTutorialMode,
    folderStatus,
    toggleFolder,
  } = useContext(appContext);
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

  const handleJoyrideCallback = useCallback(
    async (data: CallBackProps) => {
      const { action, index, type } = data;

      if (([ACTIONS.CLOSE] as string[]).includes(action)) {        
        setTutorialMode(false);
      }

      if (([EVENTS.TOUR_START, "tooltip"] as string[]).includes(type)) {        
        setTutorialMode(true);
      }
      
      if ((["beacon"] as string[]).includes(type)) {        
        setTutorialMode(false);
      }

      if (([EVENTS.TOUR_END, EVENTS.ERROR] as string[]).includes(type)) {
        setTutorialMode(false);
        setShowOnboard(false);
        setStepIndex(0);
      }


      const USING_FOLDERS = folderStatus;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure toggleFolder completes

      if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
        const NEXT_STEP_INDEX = index + (action === ACTIONS.PREV ? -1 : 1);

        const REQUIRES_ACTION = [1, 3, 5, 6, 8, 9].includes(NEXT_STEP_INDEX);

        if (USING_FOLDERS) {
          const folderMapping = {
            0: 'System',
            2: 'System',
            8: 'System',
            4: 'Social',
            5: 'Finance',
            10: 'System',
          };
          const folderName = folderMapping[index] || null;
          toggleFolder(REQUIRES_ACTION ? folderName : null);
        } else {
          const indexToAppNameMapping = {
            0: 'Security',
            2: 'Dapp Store',
            4: 'MaxContacts',
            5: 'Wallet',
            6: 'Pending',
            8: 'Settings',
          };

          if (typeof indexToAppNameMapping[index] === 'string') {
            const pageIndex = findPageIndexContainingApp(indexToAppNameMapping[index], entireAppList);
            emblaApi?.scrollTo(pageIndex);
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure toggleFolder completes
        setStepIndex(NEXT_STEP_INDEX);
      }
    },
    [setTutorialMode, setShowOnboard, setStepIndex, toggleFolder]
  );

  return (
    <>
      <Joyride
        continuous
        callback={handleJoyrideCallback}
        run={showOnboard}
        showProgress
        showSkipButton
        stepIndex={stepIndex}
        steps={onboard}
        floaterProps={{
          styles: {
            wrapper: {
              zIndex: 50,
            },
          },
        }}       
        hideCloseButton       
        styles={{
          options: {
            arrowColor: '#FAFAFF',
            backgroundColor: '#FAFAFF',
            primaryColor: '#7A17F9',
            textColor: '#08090B',
            zIndex: 5,
          },
          beacon: {
            display: tutorialMode ? 'none' : 'block'
          },
          tooltipTitle: {
            fontSize: 16,
            fontWeight: 800
          },
        }}
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
        <ToastContainer />

        <div
          className="dashboard flex flex-col h-screen"
          onContextMenu={!isDev ? (evt) => evt.preventDefault() : undefined}
        >
          <StatusBar />
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