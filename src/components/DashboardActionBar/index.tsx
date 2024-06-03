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
  const { showSearch, setShowSearch } = useContext(appContext);
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
                className="border-2 border-core-black-contrast-3 bg-transparent outline-none rounded w-full mx-auto py-3 px-4"
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
                className="w-full border-2 border-core-black-contrast-3 bg-transparent outline-none rounded mx-auto py-2 px-3"
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
        <div className="grid grid-cols-12">
          <div className="col-span-6 truncate overflow-x-hidden">            
              <MaximaProfile />
          </div>
          <div className="col-span-6 flex items-center justify-end gap-4">
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
