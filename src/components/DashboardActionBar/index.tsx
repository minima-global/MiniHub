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

  const openSettings = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    navigate('/settings');
  };

  return (
    <div className="relative w-full pt-4 pb-4 sm:pt-6 sm:pb-3 px-8 lg:pt-10 lg:pb-4 lg:max-w-[72rem] lg:px-14 xl:px-16 lg:mx-auto">
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
          <div className="col-span-12 flex">
            <div className="grow">
              <MaximaProfile />
            </div>
            <div className="flex items-center justify-end gap-3.5">
              <svg
                onClick={openSearch}
                className="cursor-pointer w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]"
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

              <svg onClick={goToPending} className="cursor-pointer w-[26px] h-[26px] lg:w-[30px] lg:h-[30px]"
                width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_8367_39517" maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="13">
                  <rect x="0.80957" y="0.410156" width="11.7423" height="11.7423" fill="white" />
                </mask>
                <g mask="url(#mask0_8367_39517)">
                  <path d="M3.01172 9.65011V8.91633H3.89618V5.26558C3.89618 4.60761 4.09927 4.02583 4.50544 3.52026C4.91152 3.01469 5.43291 2.69133 6.06961 2.55018V2.24537C6.06961 2.07551 6.12901 1.9311 6.24782 1.81213C6.36663 1.69323 6.51088 1.63379 6.68057 1.63379C6.85035 1.63379 6.9948 1.69323 7.11394 1.81213C7.23315 1.9311 7.29276 2.07551 7.29276 2.24537V2.55018C7.92946 2.69133 8.45085 3.01469 8.85693 3.52026C9.2631 4.02583 9.46619 4.60761 9.46619 5.26558V8.91633H10.3507V9.65011H3.01172ZM6.68033 11.0238C6.43692 11.0238 6.22882 10.9372 6.05603 10.764C5.88316 10.5908 5.79672 10.3826 5.79672 10.1394H7.56565C7.56565 10.3834 7.47897 10.5919 7.30561 10.7646C7.13224 10.9374 6.92382 11.0238 6.68033 11.0238Z" fill="#E9E9EB" />
                </g>
              </svg>

              {folderStatus && (
                <svg onClick={toggleFolderStatus} className="cursor-pointer w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.0927734 3.79251V0.123047H3.76224V3.79251H0.0927734ZM0.0927734 8.4405V4.77104H3.76224V8.4405H0.0927734ZM4.74076 3.79251V0.123047H8.41023V3.79251H4.74076ZM4.74076 8.4405V4.77104H8.41023V8.4405H4.74076Z" fill="#E9E9EB" />
                </svg>

              )}

              {!folderStatus && (
                <svg onClick={toggleFolderStatus} className="cursor-pointer w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.05927 7.95124C0.812109 7.95124 0.602909 7.86562 0.431667 7.69438C0.260426 7.52313 0.174805 7.31393 0.174805 7.06677V1.49677C0.174805 1.24961 0.260426 1.04041 0.431667 0.869167C0.602909 0.697926 0.812109 0.612305 1.05927 0.612305H3.74544L4.72396 1.59083H8.58632C8.83348 1.59083 9.04268 1.67645 9.21392 1.84769C9.38517 2.01893 9.47079 2.22813 9.47079 2.47529V7.06677C9.47079 7.31393 9.38517 7.52313 9.21392 7.69438C9.04268 7.86562 8.83348 7.95124 8.58632 7.95124H1.05927Z" fill="#E9E9EB" />
                </svg>
              )}


              <svg onClick={openSettings} className="cursor-pointer onboard_install w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Artboard" transform="translate(-755.000000, -404.000000)" fill="#FFFFFF" fillRule="nonzero">
                    <g id="settings" transform="translate(755.000000, 404.000000)">
                      <path d="M3.63185154,10 L3.43284253,8.40000251 C3.32504744,8.35834231 3.22346154,8.3083325 3.12811982,8.25000823 C3.0327606,8.19166639 2.93946529,8.1291761 2.84826886,8.06250221 L1.36815988,8.68751057 L0,6.31251044 L1.28109475,5.33750373 C1.27280417,5.27917946 1.26865713,5.22292941 1.26865713,5.16875358 L1.26865713,4.83125329 C1.26865713,4.77709504 1.27280417,4.72084499 1.28109475,4.66250314 L0,3.68749643 L1.36815988,1.31250158 L2.84826886,1.93750466 C2.93946529,1.87083078 3.0348245,1.80834049 3.13432901,1.74999864 C3.23383351,1.69166734 3.33333802,1.64166808 3.43284253,1.60000085 L3.63185154,0 L6.36816424,0 L6.56717325,1.60000085 C6.67496834,1.64166808 6.77653675,1.69166734 6.87189596,1.74999864 C6.96725517,1.80834049 7.060533,1.87083078 7.15174692,1.93750466 L8.63184365,1.31250158 L10,3.68749643 L8.71891228,4.66250314 C8.72720286,4.72084499 8.73134816,4.77709504 8.73134816,4.83125329 L8.73134816,5.16875358 C8.73134816,5.22292941 8.72305757,5.27917946 8.7064764,5.33750373 L9.98756412,6.31251044 L8.61940777,8.68751057 L7.15174692,8.06250221 C7.060533,8.1291761 6.96517378,8.19166639 6.86566928,8.25000823 C6.76618226,8.3083325 6.66667776,8.35834231 6.56717325,8.40000251 L6.36816424,10 L3.63185154,10 Z M5.02487964,6.75001278 C5.50580351,6.75001278 5.91625741,6.57917083 6.25622385,6.23750452 C6.5961903,5.8958382 6.76618226,5.48333198 6.76618226,5.00000344 C6.76618226,4.51667489 6.5961903,4.10416867 6.25622385,3.76250235 C5.91625741,3.42083604 5.50580351,3.24999409 5.02487964,3.24999409 C4.53566519,3.24999409 4.12312989,3.42083604 3.78730875,3.76250235 C3.4514876,4.10416867 3.28357702,4.51667489 3.28357702,5.00000344 C3.28357702,5.48333198 3.4514876,5.8958382 3.78730875,6.23750452 C4.12312989,6.57917083 4.53566519,6.75001278 5.02487964,6.75001278 Z" id="Shape"></path>
                    </g>
                  </g>
                </g>
              </svg>

              <svg
                className="cursor-pointer onboard_install w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
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
    </div>
  );
};

export default DashboardActionBar;
