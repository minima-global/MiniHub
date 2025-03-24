import { useContext, useEffect } from 'react';
import { appContext } from '../../../AppContext';
import { displayDAppName } from '../../../utilities';
import { IS_MINIMA_BROWSER } from '../../../env';
import { useNavigate } from 'react-router-dom';

const AppList = ({ data }) => {
  const navigate = useNavigate();
  const { setShowDeleteApp,  setShowUpdateApp, toggleFolder,  tutorialMode, folderStatus } =
    useContext(appContext);
  const { isMobile, rightMenu, setRightMenu, setAppToWriteMode, setAppToReadMode } = useContext(appContext);

  const handleEscapeKey = (event) => {
    if (event.keyCode === 27) {
      // Call your set method here
      setRightMenu(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleEscapeKey(event);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openApp = async () => {
    if (tutorialMode) {
      return null;
    }

    if (rightMenu) {
      return setRightMenu(null);
    }

    if (toggleFolder.length) {
      toggleFolder([]);
    }

    // if there is an onclick method in app conf (utility app / settings) do that instead of calling
    // minima method to get session id
    if (data.conf.onClick) {
      if (data.conf.onClick === 'GO_TO_SETTINGS') {
        return navigate('/settings');
      }
      return data.conf.onClick();
    }

    if (data.conf.browser === 'external' && IS_MINIMA_BROWSER) {
      return (window as any).Android.openExternalBrowser(
        `${(window as any).MDS.filehost}${data.uid}/index.html?uid=${data.sessionid}`,
        '_blank'
      );
    }

    window.open(
      `${(window as any).MDS.filehost}${data.uid}/index.html?uid=${data.sessionid}`,
      isMobile ? '_blank' : '_blank'
    );
  };

  const handleOnContextMenu = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    if (tutorialMode) {
      return null;
    }
    setRightMenu(data);
  };

  const dismiss = () => {
    setRightMenu(null);
  };

  const isRead = data.conf.permission === 'read';
  const isInstalledApp = data.conf.permission;

  return (
    <div className="app-grid__icon mb-4 sm:mb-6 lg:mb-8">
      <div className="relative">
        {/* App icon */}
        <div
          onClick={() => (rightMenu ? setRightMenu(null) : null)}
          onContextMenu={isInstalledApp ? handleOnContextMenu : undefined}
          className={`${data.conf.name === 'Dapp Store' ? 'dapp_store' : ''} ${
            data.conf.name === 'Pending' ? 'onboard_pending' : ''
          } ${data.conf.name === 'Security' ? 'onboard_security' : ''} ${
            data.conf.name === 'MaxContacts' ? 'folder_social' : ''
          } ${
            data.conf.name === 'Settings' ? 'onboard_settings' : data.conf.name === 'Wallet' ? 'onboard_wallet' : ''
          } item w-full z-30
          ${rightMenu && !folderStatus && rightMenu.uid !== data.uid ? 'blur-md lg:blur-md lg:opacity-20 !opacity-0' : ''}
          ${rightMenu && folderStatus && rightMenu.uid === data.uid ? 'opacity-100 lg:opacity-100' : ''}`}
        >
          <img
            alt="app_icon"
            id={`app_icon_${data.uid}_${data.conf.name.toLowerCase()}`}
            onClick={openApp}
            className={`icon relative mb-3 active:scale-95 hover:scale-95 ${
              rightMenu && rightMenu.uid !== data.uid ? '' : 'cursor-pointer'
            }`}
            src={
              data.conf.overrideIcon
                ? data.conf.overrideIcon
                : `${(window as any).MDS.filehost}${data.uid}/${data.conf.icon}`
            }
          />
          <span className="appLabel">{displayDAppName(data.conf.name)}</span>
        </div>
        {/* Desktop right click context menu */}
        <div
          className={`menu hidden lg:block absolute inset-x-0 left-18 text-left z-40 transition-all origin-top ${
            rightMenu && rightMenu.uid === data.uid ? 'scale-100' : 'scale-0'
          }`}
        >
          <div className="absolute mt-5 left-8 flex flex-col gap-4 pt-4 pl-4 pr-3 pb-4 text-core-grey-5 core-black-contrast-2 shadow-xl min-w-[220px]">
            <div
              onClick={() => setAppToReadMode(data)}
              className={`grid grid-cols-2 ${isRead ? 'opacity-100' : 'opacity-50'}`}
            >
              <div className="col-span-1 cursor-pointer">
                <div>Read mode</div>
              </div>
              <div className="col-span-1 flex items-center justify-end cursor-pointer">
                {!isRead && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9.5" fill="#282B2E" stroke="white" />
                  </svg>
                )}
                {isRead && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.67188 13.75L14.8698 7.57812L13.5417 6.25L8.67188 11.0938L6.45833 8.90625L5.13021 10.2344L8.67188 13.75ZM10 20C8.62847 20 7.33507 19.7396 6.11979 19.2188C4.90451 18.6979 3.84115 17.9818 2.92969 17.0703C2.01823 16.1589 1.30208 15.0955 0.78125 13.8802C0.260417 12.6649 0 11.3715 0 10C0 8.61111 0.260417 7.31337 0.78125 6.10677C1.30208 4.90017 2.01823 3.84115 2.92969 2.92969C3.84115 2.01823 4.90451 1.30208 6.11979 0.78125C7.33507 0.260417 8.62847 0 10 0C11.3889 0 12.6866 0.260417 13.8932 0.78125C15.0998 1.30208 16.1589 2.01823 17.0703 2.92969C17.9818 3.84115 18.6979 4.90017 19.2188 6.10677C19.7396 7.31337 20 8.61111 20 10C20 11.3715 19.7396 12.6649 19.2188 13.8802C18.6979 15.0955 17.9818 16.1589 17.0703 17.0703C16.1589 17.9818 15.0998 18.6979 13.8932 19.2188C12.6866 19.7396 11.3889 20 10 20Z"
                      fill="#F9F9FA"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div
              onClick={() => setAppToWriteMode(data)}
              className={`grid grid-cols-2 ${!isRead ? 'opacity-100' : 'opacity-50'}`}
            >
              <div className="col-span-1 cursor-pointer">
                <div>Write mode</div>
              </div>
              <div className="col-span-1 flex items-center justify-end cursor-pointer">
                {isRead && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9.5" fill="#282B2E" stroke="white" />
                  </svg>
                )}
                {!isRead && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.67188 13.75L14.8698 7.57812L13.5417 6.25L8.67188 11.0938L6.45833 8.90625L5.13021 10.2344L8.67188 13.75ZM10 20C8.62847 20 7.33507 19.7396 6.11979 19.2188C4.90451 18.6979 3.84115 17.9818 2.92969 17.0703C2.01823 16.1589 1.30208 15.0955 0.78125 13.8802C0.260417 12.6649 0 11.3715 0 10C0 8.61111 0.260417 7.31337 0.78125 6.10677C1.30208 4.90017 2.01823 3.84115 2.92969 2.92969C3.84115 2.01823 4.90451 1.30208 6.11979 0.78125C7.33507 0.260417 8.62847 0 10 0C11.3889 0 12.6866 0.260417 13.8932 0.78125C15.0998 1.30208 16.1589 2.01823 17.0703 2.92969C17.9818 3.84115 18.6979 4.90017 19.2188 6.10677C19.7396 7.31337 20 8.61111 20 10C20 11.3715 19.7396 12.6649 19.2188 13.8802C18.6979 15.0955 17.9818 16.1589 17.0703 17.0703C16.1589 17.9818 15.0998 18.6979 13.8932 19.2188C12.6866 19.7396 11.3889 20 10 20Z"
                      fill="#F9F9FA"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div
              onClick={() => {
                navigate('/update');
                setShowUpdateApp(data);
              }}
              className="cursor-pointer"
            >
              Update
            </div>
            {/* <div
              onClick={async () => {
                try {
                  await shareApp(data.uid);
                  if (window.navigator.userAgent.includes('Minima Browser')) {
                    return notify('Sharing file...');
                  }

                  notify(`Downloaded file in your Downloads directory`);
                } catch (error) {
                  if (error instanceof Error) {
                    return notify('Download failed, ' + error.message);
                  }
                  notify(typeof error === 'string' ? error : 'Download failed.');
                }
              }}
              className="cursor-pointer"
            >
              Share App
            </div> */}

            <div
              onClick={() => {
                navigate('/delete');
                setShowDeleteApp(data);
              }}
              className="cursor-pointer"
            >
              Delete MiniDapp
            </div>
          </div>
        </div>
      </div>
      {/* Background blur for dismissing right click context menu */}
      {rightMenu === data.uid && <div className="w-full h-full fixed left-0 top-0 z-30" onClick={dismiss} />}
    </div>
  );
};

export default AppList;
