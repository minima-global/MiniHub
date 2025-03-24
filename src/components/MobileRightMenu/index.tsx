import { useContext } from 'react';
import { appContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

const MobileRightMenu = () => {
  const navigate = useNavigate();
  const { rightMenu, setRightMenu, appList, setAppToWriteMode, setAppToReadMode, setShowDeleteApp, setShowUpdateApp } =
    useContext(appContext);
  const data = appList && rightMenu && appList.find((i) => i.uid === rightMenu?.uid);
  const isRead = data && data.conf.permission === 'read';

  return (
    <div
      className={`z-[50] md:z-[100] absolute bottom-0 left-0 w-full transition-all duration-20 origin-bottom ${
        rightMenu ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
      }`}
    >
      {data && (
        <>
          <div className="backdrop-blur-md bg-black/60 p-6">
            <div className="flex h-full">
              <img
                alt="app_icon"
                className={`block lg:hidden mt-1 icon icon--small relative active:scale-95 hover:scale-95`}
                src={`${(window as any).MDS.filehost}${data.uid}/${data.conf.icon}`}
              />
              <div className="px-6 lg:px-0 flex items-center">
                <div>
                  <div className="mb-1">
                    {data.conf.name} {data.conf.version && <>v{data.conf.version}</>}
                  </div>
                  <div className="text-core-grey">{data.conf.description}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={`block core-black-contrast-2 py-6 p-5 lg:hidden text-left`}>
            <div className="flex flex-col gap-2">
              <div className="core-black-contrast py-3.5 px-3.5 rounded" onClick={() => setAppToReadMode(rightMenu)}>
                <div className={`grid grid-cols-12 ${isRead ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="col-span-10 cursor-pointer">
                    <div>Read mode</div>
                    <div className="mt-1 text-xs">You will need to accept transactions</div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end cursor-pointer">
                    {!isRead && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" fill="#282B2E" opacity="0.5" stroke="white" />
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
              </div>
              <div className="core-black-contrast py-3.5 px-3.5 rounded" onClick={() => setAppToWriteMode(rightMenu)}>
                <div className={`grid grid-cols-12 ${!isRead ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="col-span-10 cursor-pointer">
                    <div>Write mode</div>
                    <div className="mt-1 text-xs">Allow this app to transact without restriction</div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end cursor-pointer">
                    {isRead && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" fill="#282B2E" opacity="0.5" stroke="white" />
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
              </div>
              <div
                onClick={() => {
                  navigate('/update');
                  setShowUpdateApp(rightMenu);
                }}
                className="core-black-contrast py-3.5 px-3.5 rounded cursor-pointer"
              >
                Update
              </div>
              {/* <div
                onClick={async () => {
                  try {
                    await shareApp(data.uid);
                    if (window.navigator.userAgent.includes('Minima Browser')) {
                      return notify("Sharing file...");
                    }

                    notify(`Downloaded file in your Downloads directory`);


                  } catch (error) {
                    if (error instanceof Error) {
                      return notify("Download failed, " + error.message);
                    }
                    notify(typeof error === 'string' ? error : 'Download failed.');                  
                  }
                }}
                className="core-black-contrast py-3.5 px-3.5 rounded cursor-pointer"
              >
                Share App
              </div> */}
              <div
                onClick={() => {
                  navigate('/delete/' + data.uid);
                  setShowDeleteApp(rightMenu);
                }}
                className="core-black-contrast py-3.5 px-3.5 rounded cursor-pointer"
              >
                Delete MiniDapp
              </div>
              <div
                onClick={() => setRightMenu(null)}
                className="md:device:hidden core-black-contrast py-3.5 px-3.5 rounded cursor-pointer"
              >
                Close
              </div>
              <div className="md:pb-24" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileRightMenu;
