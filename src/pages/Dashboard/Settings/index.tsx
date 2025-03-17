import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import PeerList from './AddConnections';
import Wallpaper from './Wallpaper';
import ShutdownNode from './ShutdownNode';
import { appContext } from '../../../AppContext';
import BatteryOptimisation from './BatteryOptimisation';
import FullScreen from '../../../components/UI/FullScreen';
import DesktopConnect from './DesktopConnect';
import UpdateMiniHub from './UpdateMiniHub';
import { useNavigate } from 'react-router-dom';
import ShareConnections from './ShareConnections';
import Folders from './Folders';
import TermsAndConditions from './TermsAndConditions';
import { peers } from '../../../lib';

export function Settings() {
  const navigate = useNavigate();
  const {
    loaded,
    setShowSettings,
    showSettings: display,
    showAddConnections,
    setShowAddConnections,
    setShowOnboard,
    showFoldersTheme,
    setShowFoldersTheme,
    setShowTermsAndConditions,
    showTermsAndConditions
  } = useContext(appContext);
  const [showShutdown, setShutdown] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [showDesktopConnect, setShowDesktopConnect] = useState(false);
  const [showBatteryOptimisation, setShowBatteryOptimisation] = useState(false);
  const [showUpdateMiniHub, setShowUpdateMinHub] = useState(false);
  const [showShareConnections, setShowShareConnections] = useState(false);
  const [showShareConnectionsNav, setShowShareConnectionsNav] = useState(false);

  /**
   * Show share connections nav only if user has a peer list
   */
  useEffect(() => {
    if (display && loaded) {
      peers().then((response) => {
        if (response['peerslist'] && response['peerslist'] !== '') {
          setShowShareConnectionsNav(true);
        }
      });
    }
  }, [display, loaded]);

  const dismiss = () => {
    navigate('/');
    setShowSettings(false);
    setShowUpdateMinHub(false);
    setShowAddConnections(false);
    setShowWallpaper(false);
    setShowShareConnections(false);
    setShowDesktopConnect(false);
    setShowBatteryOptimisation(false);
  };

  return (
    <FullScreen display={display}>
      <ShutdownNode display={showShutdown} dismiss={() => setShutdown(false)} />
      <Wallpaper display={showWallpaper} dismiss={() => setShowWallpaper(false)} />
      <PeerList display={showAddConnections} dismiss={() => setShowAddConnections(false)} />
      <UpdateMiniHub display={showUpdateMiniHub} dismiss={() => setShowUpdateMinHub(false)} />
      <DesktopConnect display={showDesktopConnect} dismiss={() => setShowDesktopConnect(false)} />
      <ShareConnections display={showShareConnections} dismiss={() => setShowShareConnections(false)} />
      <BatteryOptimisation display={showBatteryOptimisation} dismiss={() => setShowBatteryOptimisation(false)} />
      <TermsAndConditions display={showTermsAndConditions} dismiss={() => setShowTermsAndConditions(false)} />

      <Folders display={showFoldersTheme} dismiss={() => setShowFoldersTheme(false)} />
      <div className="flex flex-col h-full min-h-[700px]">
        <div className="absolute top-0 left-0 p-5">
          <svg onClick={dismiss} className="cursor-pointer" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.6041 5.99957L7.3291 10.7246L6.40035 11.6533L0.746601 5.99957L6.40035 0.345819L7.3291 1.27457L2.6041 5.99957Z" fill="#A7A7B0" />
          </svg>
        </div>
        <div className="pt-16 w-full mx-auto flex justify-center">
          <div className="text-center flex flex-col items-center gap-2">
            <svg className="block mb-1" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" width="48" height="48" rx="8" fill="#4FDAE3" />
              <mask id="mask0_8367_17461" maskUnits="userSpaceOnUse" x="8" y="8" width="33" height="33">
                <rect x="8.5" y="8.00098" width="32" height="32" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_8367_17461)">
                <path d="M20.831 37.3337L20.2977 33.067C20.0088 32.9559 19.7365 32.8225 19.481 32.667C19.2254 32.5114 18.9754 32.3448 18.731 32.167L14.7643 33.8337L11.0977 27.5003L14.531 24.9003C14.5088 24.7448 14.4977 24.5948 14.4977 24.4503V23.5503C14.4977 23.4059 14.5088 23.2559 14.531 23.1003L11.0977 20.5003L14.7643 14.167L18.731 15.8337C18.9754 15.6559 19.231 15.4892 19.4977 15.3337C19.7643 15.1781 20.031 15.0448 20.2977 14.9337L20.831 10.667H28.1643L28.6977 14.9337C28.9865 15.0448 29.2588 15.1781 29.5143 15.3337C29.7699 15.4892 30.0199 15.6559 30.2643 15.8337L34.231 14.167L37.8977 20.5003L34.4643 23.1003C34.4865 23.2559 34.4977 23.4059 34.4977 23.5503V24.4503C34.4977 24.5948 34.4754 24.7448 34.431 24.9003L37.8643 27.5003L34.1977 33.8337L30.2643 32.167C30.0199 32.3448 29.7643 32.5114 29.4977 32.667C29.231 32.8225 28.9643 32.9559 28.6977 33.067L28.1643 37.3337H20.831ZM24.5643 28.667C25.8532 28.667 26.9532 28.2114 27.8643 27.3003C28.7754 26.3892 29.231 25.2892 29.231 24.0003C29.231 22.7114 28.7754 21.6114 27.8643 20.7003C26.9532 19.7892 25.8532 19.3337 24.5643 19.3337C23.2532 19.3337 22.1477 19.7892 21.2477 20.7003C20.3477 21.6114 19.8977 22.7114 19.8977 24.0003C19.8977 25.2892 20.3477 26.3892 21.2477 27.3003C22.1477 28.2114 23.2532 28.667 24.5643 28.667Z" fill="#08090B" />
              </g>
            </svg>
            <h1 className="text-2xl mb-2">Settings</h1>
            <p className="text-sm max-w-md text-grey80 mb-2">Configure your Minima settings, including connections, wallpapers, and folder layouts</p>
          </div>
        </div>
        <div className="pt-4 px-4 pb-4 flex flex-col h-full max-w-xl mx-auto w-full">
          <div className="flex-grow my-4 flex flex-col gap-1">
            <div
              onClick={() => setShowBatteryOptimisation(true)}
              className="hidden relative bg-contrast1 py-4 px-5 rounded cursor-pointer"
            >
              Battery optimisation
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            {showShareConnectionsNav && (
              <div
                onClick={() => setShowShareConnections(true)}
                className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <MenuButton>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.8055 19.5C14.057 19.5 13.4215 19.2383 12.899 18.7148C12.3767 18.1912 12.1155 17.5556 12.1155 16.8078C12.1155 16.7078 12.1501 16.4648 12.2193 16.0788L5.10775 11.8923C4.86675 12.1423 4.58042 12.3381 4.24875 12.4798C3.91708 12.6214 3.56175 12.6923 3.18275 12.6923C2.43758 12.6923 1.80417 12.4294 1.2825 11.9038C0.760833 11.3781 0.5 10.7435 0.5 10C0.5 9.2565 0.760833 8.62192 1.2825 8.09625C1.80417 7.57058 2.43758 7.30775 3.18275 7.30775C3.56175 7.30775 3.91708 7.37858 4.24875 7.52025C4.58042 7.66192 4.86675 7.85775 5.10775 8.10775L12.2193 3.93075C12.1796 3.80775 12.1523 3.68725 12.1375 3.56925C12.1228 3.45125 12.1155 3.32558 12.1155 3.19225C12.1155 2.44442 12.3774 1.80875 12.9012 1.28525C13.4253 0.761749 14.0615 0.5 14.81 0.5C15.5585 0.5 16.1939 0.762 16.7163 1.286C17.2388 1.80983 17.5 2.446 17.5 3.1945C17.5 3.943 17.2383 4.5785 16.7148 5.101C16.1912 5.62333 15.5556 5.8845 14.8077 5.8845C14.4269 5.8845 14.0728 5.81208 13.7452 5.66725C13.4176 5.52242 13.1333 5.325 12.8923 5.075L5.78075 9.2615C5.82042 9.38467 5.84767 9.50517 5.8625 9.623C5.87717 9.741 5.8845 9.86667 5.8845 10C5.8845 10.1333 5.87717 10.259 5.8625 10.377C5.84767 10.4948 5.82042 10.6153 5.78075 10.7385L12.8923 14.925C13.1333 14.675 13.4176 14.4776 13.7452 14.3328C14.0728 14.1879 14.4269 14.1155 14.8077 14.1155C15.5556 14.1155 16.1912 14.3774 16.7148 14.9012C17.2383 15.4253 17.5 16.0615 17.5 16.81C17.5 17.5585 17.238 18.1939 16.714 18.7163C16.1902 19.2388 15.554 19.5 14.8055 19.5ZM14.8077 18C15.1456 18 15.4287 17.8857 15.6572 17.6572C15.8857 17.4287 16 17.1456 16 16.8078C16 16.4699 15.8857 16.1868 15.6572 15.9583C15.4287 15.7296 15.1456 15.6152 14.8077 15.6152C14.4699 15.6152 14.1868 15.7296 13.9583 15.9583C13.7296 16.1868 13.6152 16.4699 13.6152 16.8078C13.6152 17.1456 13.7296 17.4287 13.9583 17.6572C14.1868 17.8857 14.4699 18 14.8077 18ZM3.18275 11.1923C3.52325 11.1923 3.80867 11.078 4.039 10.8495C4.2695 10.621 4.38475 10.3378 4.38475 10C4.38475 9.66217 4.2695 9.379 4.039 9.1505C3.80867 8.922 3.52325 8.80775 3.18275 8.80775C2.84758 8.80775 2.56667 8.922 2.34 9.1505C2.11333 9.379 2 9.66217 2 10C2 10.3378 2.11333 10.621 2.34 10.8495C2.56667 11.078 2.84758 11.1923 3.18275 11.1923ZM14.8077 4.38475C15.1456 4.38475 15.4287 4.27042 15.6572 4.04175C15.8857 3.81325 16 3.53008 16 3.19225C16 2.85442 15.8857 2.57125 15.6572 2.34275C15.4287 2.11425 15.1456 2 14.8077 2C14.4699 2 14.1868 2.11425 13.9583 2.34275C13.7296 2.57125 13.6152 2.85442 13.6152 3.19225C13.6152 3.53008 13.7296 3.81325 13.9583 4.04175C14.1868 4.27042 14.4699 4.38475 14.8077 4.38475Z" fill="currentColor" />
                    </svg>
                  </MenuButton>
                </div>
                Share connections
                <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                  <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            )}
            <div
              onClick={() => setShowAddConnections(true)}
              className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <MenuButton>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 19.5V17.3173C13.118 17.0621 12.3667 16.5928 11.7462 15.9095C11.1257 15.2262 10.7463 14.423 10.6077 13.5H12.1077C12.2859 14.223 12.6602 14.8204 13.2308 15.2923C13.8013 15.7641 14.4743 16 15.25 16H18.25C18.5962 16 18.891 16.1218 19.1345 16.3655C19.3782 16.609 19.5 16.9038 19.5 17.25V19.5H14ZM16.75 14.5C16.2642 14.5 15.851 14.3298 15.5105 13.9895C15.1702 13.649 15 13.2358 15 12.75C15 12.2642 15.1702 11.851 15.5105 11.5105C15.851 11.1702 16.2642 11 16.75 11C17.2358 11 17.649 11.1702 17.9895 11.5105C18.3298 11.851 18.5 12.2642 18.5 12.75C18.5 13.2358 18.3298 13.649 17.9895 13.9895C17.649 14.3298 17.2358 14.5 16.75 14.5ZM7.38475 11.75C7.38475 9.532 8.16033 7.649 9.7115 6.101C11.2628 4.553 13.1474 3.779 15.3652 3.779V5.27875C13.5627 5.27875 12.032 5.90667 10.773 7.1625C9.514 8.41833 8.8845 9.9475 8.8845 11.75H7.38475ZM10.8845 11.75C10.8845 10.5077 11.3207 9.45033 12.1932 8.578C13.0658 7.7055 14.1231 7.26925 15.3652 7.26925V8.76925C14.5384 8.76925 13.8349 9.05933 13.2548 9.6395C12.6746 10.2195 12.3845 10.923 12.3845 11.75H10.8845ZM0.5 9V6.75C0.5 6.40383 0.621833 6.109 0.8655 5.8655C1.109 5.62183 1.40383 5.5 1.75 5.5H4.75C5.52567 5.5 6.19875 5.26408 6.76925 4.79225C7.33975 4.32058 7.71408 3.72317 7.89225 3H9.402C9.27633 3.91033 8.90167 4.71033 8.278 5.4C7.65417 6.08983 6.89483 6.56225 6 6.81725V9H0.5ZM3.25 4C2.76417 4 2.351 3.82983 2.0105 3.4895C1.67017 3.149 1.5 2.73583 1.5 2.25C1.5 1.76417 1.67017 1.351 2.0105 1.0105C2.351 0.670166 2.76417 0.5 3.25 0.5C3.73583 0.5 4.149 0.670166 4.4895 1.0105C4.82983 1.351 5 1.76417 5 2.25C5 2.73583 4.82983 3.149 4.4895 3.4895C4.149 3.82983 3.73583 4 3.25 4Z" fill="currentColor" />
                  </svg>
                </MenuButton>
              </div>
              Add connections
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div
              onClick={() => setShowWallpaper(true)}
              className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <MenuButton>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.30775 17.5C1.80258 17.5 1.375 17.325 1.025 16.975C0.675 16.625 0.5 16.1974 0.5 15.6923V10H2V15.6923C2 15.7692 2.03208 15.8398 2.09625 15.9038C2.16025 15.9679 2.23075 16 2.30775 16H8V17.5H2.30775ZM10 17.5V16H15.6923C15.7692 16 15.8398 15.9679 15.9038 15.9038C15.9679 15.8398 16 15.7692 16 15.6923V10H17.5V15.6923C17.5 16.1974 17.325 16.625 16.975 16.975C16.625 17.325 16.1974 17.5 15.6923 17.5H10ZM3.75 13.75L6.23075 10.4615L8.23075 13.0192L11.0385 9.3655L14.3268 13.75H3.75ZM0.5 8V2.30775C0.5 1.80258 0.675 1.375 1.025 1.025C1.375 0.675 1.80258 0.5 2.30775 0.5H8V2H2.30775C2.23075 2 2.16025 2.03208 2.09625 2.09625C2.03208 2.16025 2 2.23075 2 2.30775V8H0.5ZM16 8V2.30775C16 2.23075 15.9679 2.16025 15.9038 2.09625C15.8398 2.03208 15.7692 2 15.6923 2H10V0.5H15.6923C16.1974 0.5 16.625 0.675 16.975 1.025C17.325 1.375 17.5 1.80258 17.5 2.30775V8H16ZM12.4038 6.90375C12.0283 6.90375 11.7164 6.77975 11.4682 6.53175C11.2202 6.28358 11.0962 5.97175 11.0962 5.59625C11.0962 5.22058 11.2202 4.90867 11.4682 4.6605C11.7164 4.4125 12.0283 4.2885 12.4038 4.2885C12.7794 4.2885 13.0913 4.4125 13.3395 4.6605C13.5875 4.90867 13.7115 5.22058 13.7115 5.59625C13.7115 5.97175 13.5875 6.28358 13.3395 6.53175C13.0913 6.77975 12.7794 6.90375 12.4038 6.90375Z" fill="currentColor" />
                  </svg>
                </MenuButton>
              </div>
              Wallpaper
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div
              onClick={() => setShowDesktopConnect(true)}
              className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <MenuButton>
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.15375 12.8463H4.84625C4.81408 12.3924 4.63742 12.0049 4.31625 11.6838C3.99508 11.3626 3.60758 11.1859 3.15375 11.1538V12.8463ZM6.70375 12.8463H7.86525C7.86525 11.5398 7.40667 10.4278 6.4895 9.5105C5.57217 8.59333 4.46025 8.13475 3.15375 8.13475V9.29625C4.13708 9.29625 4.97458 9.64208 5.66625 10.3338C6.35792 11.0254 6.70375 11.8629 6.70375 12.8463ZM9.723 12.8463H10.8845C10.8845 11.7846 10.6826 10.7823 10.2788 9.8395C9.87492 8.8965 9.32333 8.07533 8.624 7.376C7.92467 6.67667 7.1035 6.12508 6.1605 5.72125C5.21767 5.31742 4.21542 5.1155 3.15375 5.1155V6.277C4.97692 6.277 6.52758 6.91608 7.80575 8.19425C9.08392 9.47242 9.723 11.0231 9.723 12.8463ZM6.5 17.5V15.5H2.30775C1.80258 15.5 1.375 15.325 1.025 14.975C0.675 14.625 0.5 14.1974 0.5 13.6923V2.30775C0.5 1.80258 0.675 1.375 1.025 1.025C1.375 0.675 1.80258 0.5 2.30775 0.5H17.6923C18.1974 0.5 18.625 0.675 18.975 1.025C19.325 1.375 19.5 1.80258 19.5 2.30775V13.6923C19.5 14.1974 19.325 14.625 18.975 14.975C18.625 15.325 18.1974 15.5 17.6923 15.5H13.5V17.5H6.5ZM2.30775 14H17.6923C17.7693 14 17.8398 13.9679 17.9038 13.9038C17.9679 13.8398 18 13.7692 18 13.6923V2.30775C18 2.23075 17.9679 2.16025 17.9038 2.09625C17.8398 2.03208 17.7693 2 17.6923 2H2.30775C2.23075 2 2.16025 2.03208 2.09625 2.09625C2.03208 2.16025 2 2.23075 2 2.30775V13.6923C2 13.7692 2.03208 13.8398 2.09625 13.9038C2.16025 13.9679 2.23075 14 2.30775 14Z" fill="currentColor" />
                  </svg>
                </MenuButton>
              </div>
              Desktop Connect
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div
              onClick={() => setShowUpdateMinHub(true)}
              className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
            >
              <MenuButton>
                <svg className="w-5 h-5" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.25 15.5V14H9.75V15.5H0.25ZM4.25 11.8077V3.35375L1.3905 6.198L0.34625 5.15375L5 0.5L9.65375 5.15375L8.6095 6.198L5.75 3.35375V11.8077H4.25Z" fill="currentColor" />
                </svg>
              </MenuButton>
              Update MiniHub
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div
              onClick={() => {
                setShowOnboard(true);
                dismiss();
              }}
              className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <MenuButton>
                  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 6.7885L7.85577 3.64425L11 0.5L14.1538 3.64425L11 6.7885ZM0.509766 17.6923V13.9423C0.509766 13.4589 0.673516 13.0497 1.00102 12.7145C1.32852 12.3792 1.7256 12.2051 2.19227 12.1923H5.27502C5.57635 12.1923 5.8626 12.266 6.13377 12.4135C6.40477 12.561 6.6256 12.7668 6.79627 13.0308C7.29227 13.7128 7.90727 14.2435 8.64127 14.623C9.37527 15.0025 10.1615 15.1923 11 15.1923C11.8487 15.1923 12.6416 15.0025 13.3788 14.623C14.1161 14.2435 14.7277 13.7128 15.2135 13.0308C15.4045 12.7668 15.633 12.561 15.899 12.4135C16.165 12.266 16.4403 12.1923 16.725 12.1923H19.8078C20.2846 12.2051 20.6859 12.3792 21.0115 12.7145C21.3372 13.0497 21.5 13.4589 21.5 13.9423V17.6923H15V15.3403C14.4295 15.7763 13.8052 16.1106 13.127 16.3433C12.4487 16.5759 11.7397 16.6923 11 16.6923C10.277 16.6923 9.57543 16.5749 8.89527 16.3403C8.2151 16.1058 7.58652 15.7705 7.00952 15.3345V17.6923H0.509766ZM3.28852 10.8078C2.53218 10.8078 1.88477 10.5385 1.34627 10C0.807766 9.4615 0.538516 8.81408 0.538516 8.05775C0.538516 7.28458 0.807766 6.633 1.34627 6.103C1.88477 5.57283 2.53218 5.30775 3.28852 5.30775C4.06152 5.30775 4.7131 5.57283 5.24327 6.103C5.77343 6.633 6.03852 7.28458 6.03852 8.05775C6.03852 8.81408 5.77343 9.4615 5.24327 10C4.7131 10.5385 4.06152 10.8078 3.28852 10.8078ZM18.7115 10.8078C17.9552 10.8078 17.3078 10.5385 16.7693 10C16.2308 9.4615 15.9615 8.81408 15.9615 8.05775C15.9615 7.28458 16.2308 6.633 16.7693 6.103C17.3078 5.57283 17.9552 5.30775 18.7115 5.30775C19.4845 5.30775 20.1361 5.57283 20.6663 6.103C21.1964 6.633 21.4615 7.28458 21.4615 8.05775C21.4615 8.81408 21.1964 9.4615 20.6663 10C20.1361 10.5385 19.4845 10.8078 18.7115 10.8078Z" fill="currentColor" />
                  </svg>
                </MenuButton>
              </div>
              Onboard tutorial
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <div onClick={() => setShowFoldersTheme(true)}
              className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <MenuButton>
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.30775 15.5C1.80258 15.5 1.375 15.325 1.025 14.975C0.675 14.625 0.5 14.1974 0.5 13.6923V2.30775C0.5 1.80258 0.675 1.375 1.025 1.025C1.375 0.675 1.80258 0.5 2.30775 0.5H7.798L9.798 2.5H17.6923C18.1974 2.5 18.625 2.675 18.975 3.025C19.325 3.375 19.5 3.80258 19.5 4.30775V13.6923C19.5 14.1974 19.325 14.625 18.975 14.975C18.625 15.325 18.1974 15.5 17.6923 15.5H2.30775ZM2.30775 14H17.6923C17.7821 14 17.8558 13.9712 17.9135 13.9135C17.9712 13.8558 18 13.7821 18 13.6923V4.30775C18 4.21792 17.9712 4.14417 17.9135 4.0865C17.8558 4.02883 17.7821 4 17.6923 4H9.1845L7.1845 2H2.30775C2.21792 2 2.14417 2.02883 2.0865 2.0865C2.02883 2.14417 2 2.21792 2 2.30775V13.6923C2 13.7821 2.02883 13.8558 2.0865 13.9135C2.14417 13.9712 2.21792 14 2.30775 14Z" fill="currentColor" />
                  </svg>
                </MenuButton>
              </div>
              Folders
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <div onClick={() => setShowTermsAndConditions(true)}
              className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <MenuButton>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 19.5V18H17.5V19.5H0.5ZM0.5 13.6635V12.1635H17.5V13.6635H0.5ZM0.5 7.8365V6.3365H17.5V7.8365H0.5ZM0.5 2V0.5H17.5V2H0.5Z" fill="currentColor" />
                  </svg>
                </MenuButton>
              </div>
              Terms & Conditions
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <div
              onClick={() => setShutdown(true)}
              className="relative bg-contrast1 p-3 rounded cursor-pointer flex items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <MenuButton>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 10V0H10V10H8ZM9 18C7.76667 18 6.60417 17.7625 5.5125 17.2875C4.42083 16.8125 3.46667 16.1667 2.65 15.35C1.83333 14.5333 1.1875 13.5792 0.7125 12.4875C0.2375 11.3958 0 10.2333 0 9C0 7.66667 0.275 6.40833 0.825 5.225C1.375 4.04167 2.15 3.01667 3.15 2.15L4.55 3.55C3.75 4.21667 3.125 5.025 2.675 5.975C2.225 6.925 2 7.93333 2 9C2 10.9333 2.68333 12.5833 4.05 13.95C5.41667 15.3167 7.06667 16 9 16C10.95 16 12.6042 15.3167 13.9625 13.95C15.3208 12.5833 16 10.9333 16 9C16 7.93333 15.7792 6.925 15.3375 5.975C14.8958 5.025 14.2667 4.21667 13.45 3.55L14.85 2.15C15.85 3.01667 16.625 4.04167 17.175 5.225C17.725 6.40833 18 7.66667 18 9C18 10.2333 17.7625 11.3958 17.2875 12.4875C16.8125 13.5792 16.1708 14.5333 15.3625 15.35C14.5542 16.1667 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18Z"
                      fill="currentColor"
                    />
                  </svg>
                </MenuButton>
              </div>
              Shutdown node
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg className="text-grey80" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </FullScreen>
  );
}

const MenuButton: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-[40px] h-[40px] text-statusBlue bg-contrast2 border border-contrast4 rounded-md flex items-center justify-center">
      {children}
    </div>
  )

  return (
    <div className="w-[40px] h-[40px] bg-statusBlue text-black bg-contrast2 rounded-md flex items-center justify-center">
      {children}
    </div>
  )

  return (
    <div className="w-[40px] h-[40px] border border-statusBlue bg-contrast2 rounded-md flex items-center justify-center">
      {children}
    </div>
  )
};

export default Settings;
