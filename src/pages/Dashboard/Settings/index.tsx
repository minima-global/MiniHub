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
        <InScreenTitleBar onExit={dismiss} />
        <div className="pt-4 px-4 pb-4 flex flex-col h-full max-w-xl mx-auto w-full">
          <h1 className="text-2xl mb-4">Settings</h1>
          <div className="flex-grow my-4 flex flex-col gap-3">
            <div
              onClick={() => setShowBatteryOptimisation(true)}
              className="hidden relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer"
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
                className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer"
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
              className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer"
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
              className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer"
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
              className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer"
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
              className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer"
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
              className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer"
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
            
            <div onClick={() => setShowFoldersTheme(true)} className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer">
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
            
            <div onClick={() => setShowTermsAndConditions(true)} className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer">
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
