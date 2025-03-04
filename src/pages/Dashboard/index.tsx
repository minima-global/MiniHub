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
import { IS_MINIMA_BROWSER } from '../../env';

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
          <svg className="w-10 h-10 rounded mt-1 mb-2" width="1024px" height="1024px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="pending" fillRule="nonzero">
                <rect id="Rectangle" fill="#AEF043" x="0" y="0" width="1024" height="1024"></rect>
                <path d="M512.001,737.056 C526.428,737.056 538.691,732.007 548.789,721.908 C558.888,711.809 563.937,699.547 563.937,685.12 L460.065,685.12 C460.065,699.547 465.115,711.809 475.213,721.908 C485.312,732.007 497.575,737.056 512.001,737.056 Z M338.882,650.496 L685.121,650.496 L685.121,581.248 L650.497,581.248 L650.497,491.226 C650.497,456.025 641.408,423.854 623.231,394.712 C605.053,365.57 579.518,346.959 546.625,338.881 L546.625,321.569 C546.625,311.758 543.307,303.535 536.671,296.899 C530.035,290.263 521.811,286.945 512.001,286.945 C502.191,286.945 493.968,290.263 487.332,296.899 C480.695,303.535 477.377,311.758 477.377,321.569 L477.377,338.881 C444.485,346.959 418.949,365.57 400.772,394.712 C382.594,423.854 373.505,456.025 373.505,491.226 L373.505,581.248 L338.882,581.248 L338.882,650.496 Z M512.001,858.24 C464.105,858.24 419.094,849.151 376.968,830.974 C334.842,812.796 298.198,788.126 267.037,756.965 C235.875,725.803 211.206,689.16 193.028,647.034 C174.851,604.908 165.762,559.897 165.762,512 C165.762,464.104 174.851,419.093 193.028,376.967 C211.206,334.841 235.875,298.197 267.037,267.036 C298.198,235.874 334.842,211.205 376.968,193.027 C419.094,174.85 464.105,165.761 512.001,165.761 C559.898,165.761 604.909,174.85 647.035,193.027 C689.161,211.205 725.804,235.874 756.966,267.036 C788.127,298.197 812.797,334.841 830.974,376.967 C849.152,419.093 858.241,464.104 858.241,512 C858.241,559.897 849.152,604.908 830.974,647.034 C812.797,689.16 788.127,725.803 756.966,756.965 C725.804,788.126 689.161,812.796 647.035,830.974 C604.909,849.151 559.898,858.24 512.001,858.24 Z" id="Shape" fill="#08090B"></path>
              </g>
            </g>
          </svg>
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
          <svg className="w-10 h-10 rounded mt-1 mb-2" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1024" height="1024" fill="#91919D" />
            <path d="M254.459 151.45L151.449 254.46H357.47V460.509L460.508 357.471V151.45H254.459Z" fill="#08090B" />
            <path d="M666.53 151.45L563.52 254.46H769.54V460.509L872.55 357.471V151.45H666.53Z" fill="#08090B" />
            <path d="M254.459 563.52L151.449 666.53H357.47V872.55L460.508 769.54V563.52H254.459Z" fill="#08090B" />
            <path d="M666.53 563.52L563.52 666.53H769.54V872.55L872.55 769.54V563.52H666.53Z" fill="#08090B" />
          </svg>
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
          <svg className="w-10 h-10 rounded mt-1 mb-2" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1024" height="1024" fill="#7723FF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M734.523 656.414C813.919 656.414 878.226 592.107 878.226 512.711C878.226 433.315 813.919 369.008 734.523 369.008C717.638 369.008 701.831 372.6 686.742 377.63C716.561 414.634 734.523 461.696 734.523 512.711C734.523 563.725 716.561 610.788 686.742 647.792C701.831 652.821 717.638 656.414 734.523 656.414ZM303.351 656.414C223.956 656.414 159.648 592.107 159.648 512.711C159.648 433.315 223.956 369.008 303.351 369.008C320.237 369.008 336.044 372.6 351.133 377.63C321.314 414.634 303.351 461.696 303.351 512.711C303.351 563.725 321.314 610.788 351.133 647.792C336.044 652.821 320.237 656.414 303.351 656.414ZM662.605 512.711C662.605 592.076 598.267 656.414 518.902 656.414C439.537 656.414 375.199 592.076 375.199 512.711C375.199 433.346 439.537 369.008 518.902 369.008C598.267 369.008 662.605 433.346 662.605 512.711Z" fill="#F9F9FA" />
          </svg>
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
          <svg className="w-10 h-10 rounded mt-1 mb-2" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1024" height="1024" fill="#FF5607" />
            <path d="M358.4 768C344.32 768 332.267 762.987 322.24 752.96C312.214 742.934 307.2 730.88 307.2 716.8V460.8C307.2 446.72 312.214 434.667 322.24 424.64C332.267 414.614 344.32 409.6 358.4 409.6H384V358.4C384 322.987 396.48 292.8 421.44 267.84C446.4 242.88 476.587 230.4 512 230.4C547.414 230.4 577.6 242.88 602.56 267.84C627.52 292.8 640 322.987 640 358.4V409.6H665.6C679.68 409.6 691.734 414.614 701.76 424.64C711.787 434.667 716.8 446.72 716.8 460.8V716.8C716.8 730.88 711.787 742.934 701.76 752.96C691.734 762.987 679.68 768 665.6 768H358.4ZM512 640C526.08 640 538.134 634.987 548.16 624.96C558.187 614.934 563.2 602.88 563.2 588.8C563.2 574.72 558.187 562.667 548.16 552.64C538.134 542.614 526.08 537.6 512 537.6C497.92 537.6 485.867 542.614 475.84 552.64C465.814 562.667 460.8 574.72 460.8 588.8C460.8 602.88 465.814 614.934 475.84 624.96C485.867 634.987 497.92 640 512 640ZM435.2 409.6H588.8V358.4C588.8 337.067 581.334 318.934 566.4 304C551.467 289.067 533.334 281.6 512 281.6C490.667 281.6 472.534 289.067 457.6 304C442.667 318.934 435.2 337.067 435.2 358.4V409.6Z" fill="#F9F9FA" />
          </svg>
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
          <svg className="w-10 h-10 rounded mt-1 mb-2" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1024" height="1024" fill="#4FDAE3" />
            <mask id="mask0_8619_12743" maskUnits="userSpaceOnUse" x="170" y="170" width="684" height="684">
              <rect x="170.7" y="170.799" width="682.667" height="682.667" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_8619_12743)">
              <path d="M433.745 796.488L422.367 705.466C416.204 703.096 410.396 700.251 404.945 696.933C399.493 693.614 394.159 690.059 388.945 686.266L304.322 721.822L226.1 586.711L299.345 531.244C298.87 527.926 298.633 524.726 298.633 521.644V502.444C298.633 499.363 298.87 496.163 299.345 492.844L226.1 437.377L304.322 302.266L388.945 337.822C394.159 334.029 399.611 330.474 405.3 327.155C410.989 323.837 416.678 320.992 422.367 318.622L433.745 227.6H590.189L601.567 318.622C607.73 320.992 613.537 323.837 618.989 327.155C624.441 330.474 629.774 334.029 634.989 337.822L719.611 302.266L797.833 437.377L724.589 492.844C725.063 496.163 725.3 499.363 725.3 502.444V521.644C725.3 524.726 724.826 527.926 723.878 531.244L797.122 586.711L718.9 721.822L634.989 686.266C629.774 690.059 624.322 693.614 618.633 696.933C612.945 700.251 607.256 703.096 601.567 705.466L590.189 796.488H433.745ZM513.389 611.6C540.885 611.6 564.352 601.881 583.789 582.444C603.226 563.007 612.945 539.54 612.945 512.044C612.945 484.548 603.226 461.081 583.789 441.644C564.352 422.207 540.885 412.488 513.389 412.488C485.419 412.488 461.833 422.207 442.633 441.644C423.433 461.081 413.833 484.548 413.833 512.044C413.833 539.54 423.433 563.007 442.633 582.444C461.833 601.881 485.419 611.6 513.389 611.6Z" fill="#08090B" />
            </g>
          </svg>
          <p>Be sure to check out all the options in Settings. You can customise the look of your MiniHub{IS_MINIMA_BROWSER ? ", connect to your node via a computer using Desktop Connect," : ""} and Shutdown your node from there.</p>
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
          <svg className="w-10 h-10 rounded mt-1 mb-2" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1024" height="1024" fill="white" />
            <path d="M387.361 400.4L569.281 473.88L680.681 428.88L719.621 256.7L569.281 317.42L283.521 202L179.641 661.24L343.321 595.12L387.361 400.4Z" fill="#08090B" />
            <path d="M680.679 428.88L636.639 623.6L454.719 550.12L343.319 595.12L304.379 767.3L454.719 706.58L740.479 822L844.359 362.76L680.679 428.88Z" fill="#08090B" />
          </svg>
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