import { useCallback, useContext, useEffect, useState } from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
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
import Introduction from '../../components/Introduction';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NodeRestored from '../../components/NodeRestored';
import Joyride, { TooltipRenderProps } from 'react-joyride';
import { ACTIONS, EVENTS } from 'react-joyride';
import { Step } from 'react-joyride';
import { CallBackProps } from 'react-joyride';

function Dashboard() {
  const {
    setRightMenu,
    folderMenu,
  } = useContext(appContext);
  const { maxCount, hasMoreThanOnePage, entireAppList } = useAppList();
  // @ts-ignore
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: hasMoreThanOnePage, dragDecelerationFriction: 0.8, speed: 20 }, [WheelGesturesPlugin()]);
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
      <Tutorial emblaApi={emblaApi} entireAppList={entireAppList} />
      <div className="app bg overflow-hidden xl:overflow-visible custom-scrollbar">
        <Introduction />
        <AppIsInReadMode />
        <InstallMiniDapp />
        <Settings />
        <Confirmation />
        <DeleteMiniDapp />
        <MobileRightMenu />
        <Utilities />
        <UpdateMiniDapp />
        <HasNoPeersModal />
        <AddConnectionsLaterModal />
        <ToastContainer />

        <MDSFail />
        <NodeRestored />

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
              className={`flex gap-1 items-center justify-center pb-16 lg:pb-24 ${selectedIndex === 0 && !hasNext ? 'hidden' : ''
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
                  className={`mt-0.5 text-core-grey-40 ${hasNext ? 'cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'
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
      </div >
    </>
  );
}

function CustomTooltip(props: TooltipRenderProps) {
  const { backProps, size, continuous, index, primaryProps, skipProps, step, tooltipProps } =
    props;

  return (
    <div className="bg-contrast-1 mx-auto w-full min-w-[300px] max-w-[340px] relative p-3 rounded" {...tooltipProps}>
      {size - 1 !== index && (
        <button {...skipProps} className="absolute top-0 right-0 p-5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.0625 10L0 8.9375L3.9375 5L0 1.0625L1.0625 0L5 3.9375L8.9375 0L10 1.0625L6.0625 5L10 8.9375L8.9375 10L5 6.0625L1.0625 10Z" fill="white" />
          </svg>
        </button>
      )}
      <div className="absolute right-4 bottom-4 w-full">
        {size - 1 !== index && (
          <div className="flex justify-end gap-4">
            <button disabled={index === 0} className="outline-none disabled:opacity-20" {...backProps}>
              <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10L0 5L5 0L6.0625 1.0625L2.125 5L6.0625 8.9375L5 10Z" fill="white" />
              </svg>
            </button>
            {index + 1} / {size}
            {continuous && (
              <button disabled={index === size - 1} className="outline-none disabled:opacity-50" {...primaryProps}>
                <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.875 5L0.9375 1.0625L2 0L7 5L2 10L0.9375 8.9375L4.875 5Z" fill="white" />
                </svg>
              </button>
            )}
          </div>
        )}
        {size - 1 === index && (
          <div className="flex justify-end gap-4">
            <button className="w-fit bg-contrast-2 hover:bg-contrast-1.5 px-2 py-1 text-sm rounded" {...skipProps}>
              Close
            </button>
          </div>
        )}
      </div>
      <div className="content px-4 pt-4 pb-14">
        {step.title && <h4 className={`font-[800] mb-3 ${size - 1 === index ? '-mt-0.5' : ''}`}>{step.title}</h4>}
        <div className="text-sm">{step.content}</div>
      </div>
    </div>
  );
}

const Tutorial = ({ emblaApi, entireAppList }: { emblaApi?: EmblaCarouselType, entireAppList: unknown[][] }) => {
  const {
    tutorialMode,
    showOnboard,
    setTutorialMode,
    setShowOnboard,
    toggleFolder,
    folderStatus,
  } = useContext(appContext);
  const [stepIndex, setStepIndex] = useState(0);

  const [onboard, _] = useState<Step[]>([
    {
      // 1
      title: 'Dashboard',
      target: '.dashboard',
      content: (
        <div className="flex flex-col gap-2">
          <p>The MiniHub is the interface to your node and your MiniDapps.</p>
          <p>MiniDapps are decentralized applications that range from financial apps to games, social platforms, and more. They can initiate transactions, interact with smart contracts, communicate with other Minima users and much more!</p>
          <p>Right click or long press on a dapp to update, delete or change its permissions.</p>
          <p>Customise the look and feel of your MiniHub from Settings.</p>
        </div>
      ),
      placement: 'center',
    },
    {
      //2
      title: 'Blockchain status',
      target: '.block_info',
      content:
        'Once connected to the network, your latest block will show here. Tap to see the status of your node. If a warning is shown, you may need to re-sync to the latest block using QuickSync.',
      placement: 'bottom',
    },
    {
      //3
      title: 'Stay Secure',
      target: '.onboard_security',
      content:
        'Check your seed phrase and lock, backup or restore your node. Turn on auto-backup to take daily backups that you can restore without your seed phrase.',
    },
    {
      //4
      title: 'Lock your node',
      target: '.onboard_security_1',
      content:
        'A red padlock here indicates that your node is not locked. Use Security to set a password so that your coins cannot be spent without it.',
    },
    {
      //5
      title: 'Pending',
      target: '.onboard_pending',
      placement: 'center',
      content: (
        <div className="flex flex-col gap-2">
          <svg className="w-10 h-10 mt-1 mb-2" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="48" height="48" rx="8" fill="#4FDAE3"></rect><mask id="mask0_8367_17461" maskUnits="userSpaceOnUse" x="8" y="8" width="33" height="33"><rect x="8.5" y="8.00098" width="32" height="32" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_8367_17461)"><path d="M20.831 37.3337L20.2977 33.067C20.0088 32.9559 19.7365 32.8225 19.481 32.667C19.2254 32.5114 18.9754 32.3448 18.731 32.167L14.7643 33.8337L11.0977 27.5003L14.531 24.9003C14.5088 24.7448 14.4977 24.5948 14.4977 24.4503V23.5503C14.4977 23.4059 14.5088 23.2559 14.531 23.1003L11.0977 20.5003L14.7643 14.167L18.731 15.8337C18.9754 15.6559 19.231 15.4892 19.4977 15.3337C19.7643 15.1781 20.031 15.0448 20.2977 14.9337L20.831 10.667H28.1643L28.6977 14.9337C28.9865 15.0448 29.2588 15.1781 29.5143 15.3337C29.7699 15.4892 30.0199 15.6559 30.2643 15.8337L34.231 14.167L37.8977 20.5003L34.4643 23.1003C34.4865 23.2559 34.4977 23.4059 34.4977 23.5503V24.4503C34.4977 24.5948 34.4754 24.7448 34.431 24.9003L37.8643 27.5003L34.1977 33.8337L30.2643 32.167C30.0199 32.3448 29.7643 32.5114 29.4977 32.667C29.231 32.8225 28.9643 32.9559 28.6977 33.067L28.1643 37.3337H20.831ZM24.5643 28.667C25.8532 28.667 26.9532 28.2114 27.8643 27.3003C28.7754 26.3892 29.231 25.2892 29.231 24.0003C29.231 22.7114 28.7754 21.6114 27.8643 20.7003C26.9532 19.7892 25.8532 19.3337 24.5643 19.3337C23.2532 19.3337 22.1477 19.7892 21.2477 20.7003C20.3477 21.6114 19.8977 22.7114 19.8977 24.0003C19.8977 25.2892 20.3477 26.3892 21.2477 27.3003C22.1477 28.2114 23.2532 28.667 24.5643 28.667Z" fill="#08090B"></path></g></svg>
          <p>When using MiniDapps you will be asked to approve any transactions they attempt to make. Use the Pending MiniDapp to Approve or Deny actions.</p>
          <p>Granting a MiniDapp WRITE permission means you will not be asked for approval and you will give the dapp full access to your wallet. <strong>Only give a MiniDapp WRITE permission if you fully trust the developer.</strong></p>
          <p>Right click or long press on a MiniDapp icon to change its permissions.</p>
        </div>
      )
    },
    {
      //6
      title: 'Profile & wallet address',
      target: '#maxima-profile',
      content: 'Set your public username and profile icon for communicating via social MiniDapps. One of your Minima wallet addresses is shown here and can be used to receive Minima, custom tokens or NFTs.',
      placement: 'top',
    },
    {
      //7
      title: 'Dapp Store',
      target: '.onboard_dapp_store',
      placement: 'center',
      content: (
        <div className="flex flex-col gap-2">
          {/* Update the icon to the new one */}
          <svg className="w-10 h-10 mt-1 mb-2" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="48" height="48" rx="8" fill="#4FDAE3"></rect><mask id="mask0_8367_17461" maskUnits="userSpaceOnUse" x="8" y="8" width="33" height="33"><rect x="8.5" y="8.00098" width="32" height="32" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_8367_17461)"><path d="M20.831 37.3337L20.2977 33.067C20.0088 32.9559 19.7365 32.8225 19.481 32.667C19.2254 32.5114 18.9754 32.3448 18.731 32.167L14.7643 33.8337L11.0977 27.5003L14.531 24.9003C14.5088 24.7448 14.4977 24.5948 14.4977 24.4503V23.5503C14.4977 23.4059 14.5088 23.2559 14.531 23.1003L11.0977 20.5003L14.7643 14.167L18.731 15.8337C18.9754 15.6559 19.231 15.4892 19.4977 15.3337C19.7643 15.1781 20.031 15.0448 20.2977 14.9337L20.831 10.667H28.1643L28.6977 14.9337C28.9865 15.0448 29.2588 15.1781 29.5143 15.3337C29.7699 15.4892 30.0199 15.6559 30.2643 15.8337L34.231 14.167L37.8977 20.5003L34.4643 23.1003C34.4865 23.2559 34.4977 23.4059 34.4977 23.5503V24.4503C34.4977 24.5948 34.4754 24.7448 34.431 24.9003L37.8643 27.5003L34.1977 33.8337L30.2643 32.167C30.0199 32.3448 29.7643 32.5114 29.4977 32.667C29.231 32.8225 28.9643 32.9559 28.6977 33.067L28.1643 37.3337H20.831ZM24.5643 28.667C25.8532 28.667 26.9532 28.2114 27.8643 27.3003C28.7754 26.3892 29.231 25.2892 29.231 24.0003C29.231 22.7114 28.7754 21.6114 27.8643 20.7003C26.9532 19.7892 25.8532 19.3337 24.5643 19.3337C23.2532 19.3337 22.1477 19.7892 21.2477 20.7003C20.3477 21.6114 19.8977 22.7114 19.8977 24.0003C19.8977 25.2892 20.3477 26.3892 21.2477 27.3003C22.1477 28.2114 23.2532 28.667 24.5643 28.667Z" fill="#08090B"></path></g></svg>
          <p>Explore new MiniDapps and install updates from the Dapp Store. Find more information about each MiniDapp here. You can add new stores and even create your own!</p>
        </div>
      )
    },
    {
      //6
      title: 'Add contacts',
      target: '.folder_social',
      placement: 'center',
      content: (
        <div className="flex flex-col gap-2">
          {/* Update the icon to the new one */}
          <svg className="w-10 h-10 mt-1 mb-2" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="48" height="48" rx="8" fill="#4FDAE3"></rect><mask id="mask0_8367_17461" maskUnits="userSpaceOnUse" x="8" y="8" width="33" height="33"><rect x="8.5" y="8.00098" width="32" height="32" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_8367_17461)"><path d="M20.831 37.3337L20.2977 33.067C20.0088 32.9559 19.7365 32.8225 19.481 32.667C19.2254 32.5114 18.9754 32.3448 18.731 32.167L14.7643 33.8337L11.0977 27.5003L14.531 24.9003C14.5088 24.7448 14.4977 24.5948 14.4977 24.4503V23.5503C14.4977 23.4059 14.5088 23.2559 14.531 23.1003L11.0977 20.5003L14.7643 14.167L18.731 15.8337C18.9754 15.6559 19.231 15.4892 19.4977 15.3337C19.7643 15.1781 20.031 15.0448 20.2977 14.9337L20.831 10.667H28.1643L28.6977 14.9337C28.9865 15.0448 29.2588 15.1781 29.5143 15.3337C29.7699 15.4892 30.0199 15.6559 30.2643 15.8337L34.231 14.167L37.8977 20.5003L34.4643 23.1003C34.4865 23.2559 34.4977 23.4059 34.4977 23.5503V24.4503C34.4977 24.5948 34.4754 24.7448 34.431 24.9003L37.8643 27.5003L34.1977 33.8337L30.2643 32.167C30.0199 32.3448 29.7643 32.5114 29.4977 32.667C29.231 32.8225 28.9643 32.9559 28.6977 33.067L28.1643 37.3337H20.831ZM24.5643 28.667C25.8532 28.667 26.9532 28.2114 27.8643 27.3003C28.7754 26.3892 29.231 25.2892 29.231 24.0003C29.231 22.7114 28.7754 21.6114 27.8643 20.7003C26.9532 19.7892 25.8532 19.3337 24.5643 19.3337C23.2532 19.3337 22.1477 19.7892 21.2477 20.7003C20.3477 21.6114 19.8977 22.7114 19.8977 24.0003C19.8977 25.2892 20.3477 26.3892 21.2477 27.3003C22.1477 28.2114 23.2532 28.667 24.5643 28.667Z" fill="#08090B"></path></g></svg>
          <p>Add your friends as contacts in MaxContacts, chat 1 on 1 in MaxSolo or interact with all your contacts and beyond on Chatter.</p>  
        </div>
      )
    },
    {
      //7
      title: 'Security',
      target: '.onboard_security',
      placement: 'center',
      content: (
        <div className="flex flex-col gap-2">
          {/* Update the icon to the new one */}
          <svg className="w-10 h-10 mt-1 mb-2" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="48" height="48" rx="8" fill="#4FDAE3"></rect><mask id="mask0_8367_17461" maskUnits="userSpaceOnUse" x="8" y="8" width="33" height="33"><rect x="8.5" y="8.00098" width="32" height="32" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_8367_17461)"><path d="M20.831 37.3337L20.2977 33.067C20.0088 32.9559 19.7365 32.8225 19.481 32.667C19.2254 32.5114 18.9754 32.3448 18.731 32.167L14.7643 33.8337L11.0977 27.5003L14.531 24.9003C14.5088 24.7448 14.4977 24.5948 14.4977 24.4503V23.5503C14.4977 23.4059 14.5088 23.2559 14.531 23.1003L11.0977 20.5003L14.7643 14.167L18.731 15.8337C18.9754 15.6559 19.231 15.4892 19.4977 15.3337C19.7643 15.1781 20.031 15.0448 20.2977 14.9337L20.831 10.667H28.1643L28.6977 14.9337C28.9865 15.0448 29.2588 15.1781 29.5143 15.3337C29.7699 15.4892 30.0199 15.6559 30.2643 15.8337L34.231 14.167L37.8977 20.5003L34.4643 23.1003C34.4865 23.2559 34.4977 23.4059 34.4977 23.5503V24.4503C34.4977 24.5948 34.4754 24.7448 34.431 24.9003L37.8643 27.5003L34.1977 33.8337L30.2643 32.167C30.0199 32.3448 29.7643 32.5114 29.4977 32.667C29.231 32.8225 28.9643 32.9559 28.6977 33.067L28.1643 37.3337H20.831ZM24.5643 28.667C25.8532 28.667 26.9532 28.2114 27.8643 27.3003C28.7754 26.3892 29.231 25.2892 29.231 24.0003C29.231 22.7114 28.7754 21.6114 27.8643 20.7003C26.9532 19.7892 25.8532 19.3337 24.5643 19.3337C23.2532 19.3337 22.1477 19.7892 21.2477 20.7003C20.3477 21.6114 19.8977 22.7114 19.8977 24.0003C19.8977 25.2892 20.3477 26.3892 21.2477 27.3003C22.1477 28.2114 23.2532 28.667 24.5643 28.667Z" fill="#08090B"></path></g></svg>
          <p>In Security, you can find:</p>
          <p>1. Your seed phrase - keep it safe as you can always restore your coins with this.</p>
          <p>2. Option to lock your wallet with a password that will be required when approving transactions</p>
          <p>3. QuickSync - If your node is not up to date with the latest block, use QuickSync to re-sync your chain</p>
          <p>4. Backup - set up automatic backups which can be used to restore your wallet. Remember to download them!</p>
          <p>5. Restore - Here you can also re-sync your node if you are behind the chain tip.</p>
        </div>
      )
    },
    {
      //8
      title: 'Settings',
      target: '.onboard_settings',
      placement: 'center',
      content: (
        <div className="flex flex-col gap-2">
          <svg className="w-10 h-10 mt-1 mb-2" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="48" height="48" rx="8" fill="#4FDAE3"></rect><mask id="mask0_8367_17461" maskUnits="userSpaceOnUse" x="8" y="8" width="33" height="33"><rect x="8.5" y="8.00098" width="32" height="32" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_8367_17461)"><path d="M20.831 37.3337L20.2977 33.067C20.0088 32.9559 19.7365 32.8225 19.481 32.667C19.2254 32.5114 18.9754 32.3448 18.731 32.167L14.7643 33.8337L11.0977 27.5003L14.531 24.9003C14.5088 24.7448 14.4977 24.5948 14.4977 24.4503V23.5503C14.4977 23.4059 14.5088 23.2559 14.531 23.1003L11.0977 20.5003L14.7643 14.167L18.731 15.8337C18.9754 15.6559 19.231 15.4892 19.4977 15.3337C19.7643 15.1781 20.031 15.0448 20.2977 14.9337L20.831 10.667H28.1643L28.6977 14.9337C28.9865 15.0448 29.2588 15.1781 29.5143 15.3337C29.7699 15.4892 30.0199 15.6559 30.2643 15.8337L34.231 14.167L37.8977 20.5003L34.4643 23.1003C34.4865 23.2559 34.4977 23.4059 34.4977 23.5503V24.4503C34.4977 24.5948 34.4754 24.7448 34.431 24.9003L37.8643 27.5003L34.1977 33.8337L30.2643 32.167C30.0199 32.3448 29.7643 32.5114 29.4977 32.667C29.231 32.8225 28.9643 32.9559 28.6977 33.067L28.1643 37.3337H20.831ZM24.5643 28.667C25.8532 28.667 26.9532 28.2114 27.8643 27.3003C28.7754 26.3892 29.231 25.2892 29.231 24.0003C29.231 22.7114 28.7754 21.6114 27.8643 20.7003C26.9532 19.7892 25.8532 19.3337 24.5643 19.3337C23.2532 19.3337 22.1477 19.7892 21.2477 20.7003C20.3477 21.6114 19.8977 22.7114 19.8977 24.0003C19.8977 25.2892 20.3477 26.3892 21.2477 27.3003C22.1477 28.2114 23.2532 28.667 24.5643 28.667Z" fill="#08090B"></path></g></svg>
          <p>Be sure to check out all the options in Settings. You can customise the look of your MiniHub, connect to your node via a computer using Desktop Connect, and Shutdown your node from there.</p>
          <p className="font-bold">Note: only show this for android users “connect to your node via a computer using Desktop Connect”</p>
        </div>
      )
    },
    {
      //11
      title: 'Wallet',
      target: '.onboard_wallet',
      placement: 'center',
      content: (
        <div className="flex flex-col gap-2">
          {/* Update the icon to the new one */}
          <svg className="w-10 h-10 mt-1 mb-2" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="48" height="48" rx="8" fill="#4FDAE3"></rect><mask id="mask0_8367_17461" maskUnits="userSpaceOnUse" x="8" y="8" width="33" height="33"><rect x="8.5" y="8.00098" width="32" height="32" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_8367_17461)"><path d="M20.831 37.3337L20.2977 33.067C20.0088 32.9559 19.7365 32.8225 19.481 32.667C19.2254 32.5114 18.9754 32.3448 18.731 32.167L14.7643 33.8337L11.0977 27.5003L14.531 24.9003C14.5088 24.7448 14.4977 24.5948 14.4977 24.4503V23.5503C14.4977 23.4059 14.5088 23.2559 14.531 23.1003L11.0977 20.5003L14.7643 14.167L18.731 15.8337C18.9754 15.6559 19.231 15.4892 19.4977 15.3337C19.7643 15.1781 20.031 15.0448 20.2977 14.9337L20.831 10.667H28.1643L28.6977 14.9337C28.9865 15.0448 29.2588 15.1781 29.5143 15.3337C29.7699 15.4892 30.0199 15.6559 30.2643 15.8337L34.231 14.167L37.8977 20.5003L34.4643 23.1003C34.4865 23.2559 34.4977 23.4059 34.4977 23.5503V24.4503C34.4977 24.5948 34.4754 24.7448 34.431 24.9003L37.8643 27.5003L34.1977 33.8337L30.2643 32.167C30.0199 32.3448 29.7643 32.5114 29.4977 32.667C29.231 32.8225 28.9643 32.9559 28.6977 33.067L28.1643 37.3337H20.831ZM24.5643 28.667C25.8532 28.667 26.9532 28.2114 27.8643 27.3003C28.7754 26.3892 29.231 25.2892 29.231 24.0003C29.231 22.7114 28.7754 21.6114 27.8643 20.7003C26.9532 19.7892 25.8532 19.3337 24.5643 19.3337C23.2532 19.3337 22.1477 19.7892 21.2477 20.7003C20.3477 21.6114 19.8977 22.7114 19.8977 24.0003C19.8977 25.2892 20.3477 26.3892 21.2477 27.3003C22.1477 28.2114 23.2532 28.667 24.5643 28.667Z" fill="#08090B"></path></g></svg>
          <p>In your Minima wallet, you will find your Minima wallet addresses for receiving Minima, custom tokens or NFTs. You can also send funds, create your own tokens or NFTs and check your balance.</p>
          <p>All set! You can replay the tour from the Settings at any time.</p>
        </div>
      )
    },
  ]);

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

  const handleJoyrideCallback = useCallback(
    async (data: CallBackProps) => {
      const { action, index, type } = data;

      if (document.querySelector(data.step.target as string)
        && document.querySelector(data.step.target as string)?.classList.contains('app-grid__item')) {
        document.querySelectorAll('.app-grid__item').forEach((item) => {
          item.classList.remove('!z-[110]');
        });

        document.querySelector(data.step.target as string)?.classList.add('!z-[110]');

      } else {
        document.getElementById('tour-overlay-1')?.classList.add('hidden');
        document.getElementById('tour-overlay-1')?.classList.add('pointer-events-none');
      }

      if (([ACTIONS.CLOSE] as string[]).includes(action)) {
        setTutorialMode(false);
        document.body.classList.remove('body-black-overlay');
      }

      if (([ACTIONS.SKIP] as string[]).includes(action)) {
        setTutorialMode(false);
        document.body.classList.remove('body-black-overlay');
      }

      if (([EVENTS.TOUR_START, "tooltip"] as string[]).includes(type)) {
        setTutorialMode(true);
        document.body.classList.add('body-black-overlay');
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
            emblaApi?.scrollTo(pageIndex, true);
          }
        }

        setStepIndex(NEXT_STEP_INDEX);
      }
    },
    [setTutorialMode, setShowOnboard, setStepIndex, toggleFolder]
  );

  return (
    <Joyride
      continuous
      tooltipComponent={CustomTooltip}
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
      spotlightClicks={false}
      styles={{
        options: {
          arrowColor: '#17191c',
          backgroundColor: '#FAFAFF',
          primaryColor: '#7A17F9',
          textColor: '#08090B',
          overlayColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 50,
        },
        spotlight: {
          // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  )
}

export default Dashboard;