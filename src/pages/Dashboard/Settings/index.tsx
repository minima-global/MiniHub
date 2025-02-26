import { useContext, useEffect, useState } from 'react';
import PeerList from './AddConnections';
import Wallpaper from './Wallpaper';
import ShutdownNode from './ShutdownNode';
import { appContext } from '../../../AppContext';
import BatteryOptimisation from './BatteryOptimisation';
import FullScreen from '../../../components/UI/FullScreen';
import InScreenTitleBar from '../../../components/InScreenStatusBar';
import DesktopConnect from './DesktopConnect';
import UpdateMiniHub from './UpdateMiniHub';
import { useNavigate } from 'react-router-dom';
import ShareConnections from './ShareConnections';
import { peers } from '../../../lib';
import Folders from './Folders';
import TermsAndConditions from './TermsAndConditions';

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
  const [showShareConnectionsNav, setShowShareConnectionsNav] = useState(true);

  /**
   * Show share connections nav only if user has a peer list
   */
  // useEffect(() => {
  //   if (display && loaded) {
  //     peers().then((response) => {
  //       if (response['peerslist'] && response['peerslist'] !== '') {
  //         setShowShareConnectionsNav(true);
  //       }
  //     });
  //   }
  // }, [display, loaded]);

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
            <p className="text-sm max-w-md">Configure your Minima settings, including connections, wallpapers, and folder layouts</p>
          </div>
        </div>
        <div className="pt-4 px-4 pb-4 flex flex-col h-full max-w-xl mx-auto w-full">
          <div className="flex-grow my-4 flex flex-col gap-3">
            <div
              onClick={() => setShowBatteryOptimisation(true)}
              className="hidden relative bg-contrast1 py-4 px-5 rounded cursor-pointer"
            >
              Battery optimisation
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="#F4F4F5"
                  />
                </svg>
              </div>
            </div>
            {showShareConnectionsNav && (
              <div
                onClick={() => setShowShareConnections(true)}
                className="relative bg-contrast1 py-4 px-5 rounded cursor-pointer"
              >
                Share connections
                <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                      fill="#F4F4F5"
                    />
                  </svg>
                </div>
              </div>
            )}
            <div
              onClick={() => setShowAddConnections(true)}
              className="relative bg-contrast1 py-4 px-5 rounded cursor-pointer"
            >
              Add connections
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="#F4F4F5"
                  />
                </svg>
              </div>
            </div>
            <div
              onClick={() => setShowWallpaper(true)}
              className="relative bg-contrast1 py-4 px-5 rounded cursor-pointer"
            >
              Wallpaper
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="#F4F4F5"
                  />
                </svg>
              </div>
            </div>
            <div
              onClick={() => setShowDesktopConnect(true)}
              className="relative bg-contrast1 py-4 px-5 rounded cursor-pointer"
            >
              Desktop Connect
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="#F4F4F5"
                  />
                </svg>
              </div>
            </div>
            <div
              onClick={() => setShowUpdateMinHub(true)}
              className="relative bg-contrast1 py-4 px-5 rounded cursor-pointer"
            >
              Update MiniHub
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="#F4F4F5"
                  />
                </svg>
              </div>
            </div>
            <div
              onClick={() => {
                setShowOnboard(true);
                dismiss();
              }}
              className="relative bg-contrast1 py-4 px-5 rounded cursor-pointer"
            >
              Onboard tutorial
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="#F4F4F5"
                  />
                </svg>
              </div>
            </div>

            <div onClick={() => setShowFoldersTheme(true)} className="relative bg-contrast1 py-4 px-5 rounded cursor-pointer">
              Folders
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="#F4F4F5"
                  />
                </svg>
              </div>
            </div>

            <div onClick={() => setShowTermsAndConditions(true)} className="relative bg-contrast1 py-4 px-5 rounded cursor-pointer">
              Terms & Conditions
              <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
                    fill="#F4F4F5"
                  />
                </svg>
              </div>
            </div>



            <div
              onClick={() => setShutdown(true)}
              className="relative text-status-red core-black-contrast py-4 px-5 rounded cursor-pointer"
            >
              Shutdown node
              <div className="absolute right-0 top-0 h-full px-4 flex items-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 10V0H10V10H8ZM9 18C7.76667 18 6.60417 17.7625 5.5125 17.2875C4.42083 16.8125 3.46667 16.1667 2.65 15.35C1.83333 14.5333 1.1875 13.5792 0.7125 12.4875C0.2375 11.3958 0 10.2333 0 9C0 7.66667 0.275 6.40833 0.825 5.225C1.375 4.04167 2.15 3.01667 3.15 2.15L4.55 3.55C3.75 4.21667 3.125 5.025 2.675 5.975C2.225 6.925 2 7.93333 2 9C2 10.9333 2.68333 12.5833 4.05 13.95C5.41667 15.3167 7.06667 16 9 16C10.95 16 12.6042 15.3167 13.9625 13.95C15.3208 12.5833 16 10.9333 16 9C16 7.93333 15.7792 6.925 15.3375 5.975C14.8958 5.025 14.2667 4.21667 13.45 3.55L14.85 2.15C15.85 3.01667 16.625 4.04167 17.175 5.225C17.725 6.40833 18 7.66667 18 9C18 10.2333 17.7625 11.3958 17.2875 12.4875C16.8125 13.5792 16.1708 14.5333 15.3625 15.35C14.5542 16.1667 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18Z"
                    fill="#FF627E"
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

export default Settings;
