import { useContext } from 'react';
import { appContext } from '../../AppContext';
import MobileSearchItem from './MobileSearchItem';
import { useNavigate } from 'react-router-dom';
import MaximaProfile from '../MaximaProfile';

/**
 * The dashboard action bar
 * Currently features sorter, search and install app
 * @returns {JSX.Element}
 * @constructor
 */
const DashboardActionBar = () => {
  const navigate = useNavigate();

  const { showSearch, setShowSearch, folderStatus, toggleFolderStatus } = useContext(appContext);
  const { appList, setShowInstall, query, setQuery } = useContext(appContext);
  const filteredAppList = appList.filter((i) => i.conf.name.toLowerCase().includes(query.toLowerCase()));
  const limitedAppList = query === '' ? [] : filteredAppList.slice(0, 5);

  const openSearch = () => {
    setShowSearch(true);
  };

  const closeSearch = () => {
    setQuery('');
    setShowSearch(false);
  };

  const openInstallModal = () => {
    navigate('/install');
    setShowInstall(true);
  };

  const goToPending = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    (window as any).MDS.dapplink('Pending', function (msg: any) {
      window.open(`${(window as any).MDS.filehost}${msg.uid}/index.html?uid=${msg.sessionid}#/profile`, '_blank');
    });
  };

  return (
    <div className="relative w-full pt-4 sm:pt-6 pb-2 px-8 lg:pt-10 lg:pb-4 lg:max-w-[72rem] lg:px-16 lg:mx-auto">
      {showSearch && (
        <div className="flex flex-col lg:hidden mt-14 z-40 fixed w-full h-full top-0 left-0 z-10 text-center">
          <div className="bg-black w-full p-5">
            <div className="text-right mb-4 cursor-pointer" onClick={closeSearch}>
              Close
            </div>
            <div className="relative mb-5">
              <input
                type="text"
                className="border-2 border-core-black-contrast-3 bg-black outline-none rounded w-full mx-auto py-3 px-4"
                placeholder="Search"
                value={query}
                onChange={(evt) => setQuery(evt.target.value)}
              />
              <div className={query !== '' ? 'opacity-100' : 'opacity-0'}>
                <div
                  onClick={() => setQuery('')}
                  className="svg cursor-pointer absolute top-0 right-4 flex items-center h-full"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.39998 14.6538L9.99998 11.0538L13.6 14.6538L14.6538 13.6L11.0538 9.99998L14.6538 6.39998L13.6 5.34615L9.99998 8.94615L6.39998 5.34615L5.34615 6.39998L8.94615 9.99998L5.34615 13.6L6.39998 14.6538ZM10.0016 19.5C8.68772 19.5 7.45268 19.2506 6.29655 18.752C5.1404 18.2533 4.13472 17.5765 3.2795 16.7217C2.42427 15.8669 1.74721 14.8616 1.24833 13.706C0.749442 12.5504 0.5 11.3156 0.5 10.0017C0.5 8.68772 0.749334 7.45268 1.248 6.29655C1.74667 5.1404 2.42342 4.13472 3.27825 3.2795C4.1331 2.42427 5.13834 1.74721 6.29398 1.24833C7.44959 0.749442 8.68437 0.5 9.9983 0.5C11.3122 0.5 12.5473 0.749333 13.7034 1.248C14.8596 1.74667 15.8652 2.42342 16.7205 3.27825C17.5757 4.1331 18.2527 5.13834 18.7516 6.29398C19.2505 7.44959 19.5 8.68437 19.5 9.9983C19.5 11.3122 19.2506 12.5473 18.752 13.7034C18.2533 14.8596 17.5765 15.8652 16.7217 16.7205C15.8669 17.5757 14.8616 18.2527 13.706 18.7516C12.5504 19.2505 11.3156 19.5 10.0016 19.5Z"
                      fill="#A7A7B0"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {query !== '' && limitedAppList.length === 0 && (
                <div className="text-core-grey-80 my-14">No results could be found for this query...</div>
              )}
              {limitedAppList.map((app) => (
                <MobileSearchItem key={app.uid} data={app} onRightClick={closeSearch} />
              ))}
            </div>
          </div>
          <div className="flex-grow backdrop-blur-md bg-black/80" />
        </div>
      )}
      {showSearch && (
        <div className="hidden lg:flex absolute bg-red w-full left-0 top-0 bottom-0 z-10 text-center">
          <div className="flex-grow flex items-center relative mx-auto pt-8 pb-4 px-16">
            <div className="w-full flex-grow relative">
              <input
                type="text"
                className="w-full border-2 border-core-black-contrast-3 bg-black/50 outline-none rounded mx-auto py-2 px-3"
                placeholder="Search"
                value={query}
                onChange={(evt) => setQuery(evt.target.value)}
              />
              <div className={query !== '' ? 'opacity-100' : 'opacity-0'}>
                <div
                  onClick={() => setQuery('')}
                  className="svg cursor-pointer absolute top-0 right-4 flex items-center h-full"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.39998 14.6538L9.99998 11.0538L13.6 14.6538L14.6538 13.6L11.0538 9.99998L14.6538 6.39998L13.6 5.34615L9.99998 8.94615L6.39998 5.34615L5.34615 6.39998L8.94615 9.99998L5.34615 13.6L6.39998 14.6538ZM10.0016 19.5C8.68772 19.5 7.45268 19.2506 6.29655 18.752C5.1404 18.2533 4.13472 17.5765 3.2795 16.7217C2.42427 15.8669 1.74721 14.8616 1.24833 13.706C0.749442 12.5504 0.5 11.3156 0.5 10.0017C0.5 8.68772 0.749334 7.45268 1.248 6.29655C1.74667 5.1404 2.42342 4.13472 3.27825 3.2795C4.1331 2.42427 5.13834 1.74721 6.29398 1.24833C7.44959 0.749442 8.68437 0.5 9.9983 0.5C11.3122 0.5 12.5473 0.749333 13.7034 1.248C14.8596 1.74667 15.8652 2.42342 16.7205 3.27825C17.5757 4.1331 18.2527 5.13834 18.7516 6.29398C19.2505 7.44959 19.5 8.68437 19.5 9.9983C19.5 11.3122 19.2506 12.5473 18.752 13.7034C18.2533 14.8596 17.5765 15.8652 16.7217 16.7205C15.8669 17.5757 14.8616 18.2527 13.706 18.7516C12.5504 19.2505 11.3156 19.5 10.0016 19.5Z"
                      fill="#A7A7B0"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center ml-5 cursor-pointer" onClick={closeSearch}>
              Close
            </div>
          </div>
        </div>
      )}
      <div className={showSearch ? 'opacity-0' : 'opacity-100'}>
        <div className="flex grid grid-cols-12">
          <div className="col-span-3 md:col-span-6">
            <MaximaProfile />
          </div> 

          <div className="col-span-9 md:col-span-6 flex items-center justify-end gap-4">
            <svg
              onClick={openSearch}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3913 10.6957C18.3913 14.9458 14.9459 18.3913 10.6957 18.3913C6.44546 18.3913 3 14.9458 3 10.6957C3 6.44546 6.44546 3 10.6957 3C14.9459 3 18.3913 6.44546 18.3913 10.6957Z"
                stroke="#E9E9EB"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z"
                fill="#E9E9EB"
              />
            </svg>

            <svg onClick={goToPending} className="cursor-pointer w-[30px] h-[30px]" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_8367_39517" maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="13">
                <rect x="0.80957" y="0.410156" width="11.7423" height="11.7423" fill="white" />
              </mask>
              <g mask="url(#mask0_8367_39517)">
                <path d="M3.01172 9.65011V8.91633H3.89618V5.26558C3.89618 4.60761 4.09927 4.02583 4.50544 3.52026C4.91152 3.01469 5.43291 2.69133 6.06961 2.55018V2.24537C6.06961 2.07551 6.12901 1.9311 6.24782 1.81213C6.36663 1.69323 6.51088 1.63379 6.68057 1.63379C6.85035 1.63379 6.9948 1.69323 7.11394 1.81213C7.23315 1.9311 7.29276 2.07551 7.29276 2.24537V2.55018C7.92946 2.69133 8.45085 3.01469 8.85693 3.52026C9.2631 4.02583 9.46619 4.60761 9.46619 5.26558V8.91633H10.3507V9.65011H3.01172ZM6.68033 11.0238C6.43692 11.0238 6.22882 10.9372 6.05603 10.764C5.88316 10.5908 5.79672 10.3826 5.79672 10.1394H7.56565C7.56565 10.3834 7.47897 10.5919 7.30561 10.7646C7.13224 10.9374 6.92382 11.0238 6.68033 11.0238Z" fill="#E9E9EB" />
              </g>
            </svg>

            {folderStatus && (
              <svg onClick={toggleFolderStatus} className="cursor-pointer w-[22px] h-[22px]" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.0927734 3.79251V0.123047H3.76224V3.79251H0.0927734ZM0.0927734 8.4405V4.77104H3.76224V8.4405H0.0927734ZM4.74076 3.79251V0.123047H8.41023V3.79251H4.74076ZM4.74076 8.4405V4.77104H8.41023V8.4405H4.74076Z" fill="#E9E9EB" />
              </svg>

            )}

            {!folderStatus && (
              <svg onClick={toggleFolderStatus} className="cursor-pointer w-[22px] h-[22px]" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.05927 7.95124C0.812109 7.95124 0.602909 7.86562 0.431667 7.69438C0.260426 7.52313 0.174805 7.31393 0.174805 7.06677V1.49677C0.174805 1.24961 0.260426 1.04041 0.431667 0.869167C0.602909 0.697926 0.812109 0.612305 1.05927 0.612305H3.74544L4.72396 1.59083H8.58632C8.83348 1.59083 9.04268 1.67645 9.21392 1.84769C9.38517 2.01893 9.47079 2.22813 9.47079 2.47529V7.06677C9.47079 7.31393 9.38517 7.52313 9.21392 7.69438C9.04268 7.86562 8.83348 7.95124 8.58632 7.95124H1.05927Z" fill="#E9E9EB" />
              </svg>
            )}

            <svg
              className="cursor-pointer onboard_install"
              onClick={openInstallModal}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.88892 20V11.1111H0V8.88892H8.88892V0H11.1111V8.88892H20V11.1111H11.1111V20H8.88892Z"
                fill="#E9E9EB"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardActionBar;
