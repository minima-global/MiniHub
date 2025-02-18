import { useContext, useEffect, useRef, useState } from 'react';
import { appContext } from '../../AppContext';
import Status from './Status';
import BlockInfo from './Block';
import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';
import { dAppLink } from '../../lib';
import { format } from 'date-fns';
import BroadcastIcon from '../UI/Icons/BroadcastIcon';

const TitleBar = () => {
  const { openTitleBar } = useAndroidShowTitleBar();
  const { blockInfo, showWarning, statusInfo, appList, showSearch, hasNoPeers, setShowHasNoPeers } =
    useContext(appContext);
  const [showBlockInfo, setShowBlockInfo] = useState(false);
  const { isNodeFiveMinutesAgoBehind } = useContext(appContext);
  const [blockHeight, setBlockHeight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (blockInfo.blockHeight) {
      if (ref.current && ((new Date().getTime() - ref.current) < 50)) {
        setIsLoading(true);
      }
  
      if (!blockHeight && !ref.current) {
        ref.current = new Date().getTime();
        setBlockHeight(blockInfo.blockHeight);
        setIsLoading(false);
      }

      ref.current = new Date().getTime();

      const timeout = setTimeout(() => {
        setBlockHeight(blockInfo.blockHeight);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [blockInfo.blockHeight]);

  const displayBlockInfo = async (evt) => {
    evt.stopPropagation();
    const statusApp = appList.find((i) => i.conf.name.toLowerCase() === 'status');
    const fallbackHealthApp = appList.find((i) => i.conf.name.toLowerCase() === 'health');
    const securityApp = appList.find((i) => i.conf.name.toLowerCase() === 'security');

    if (isNodeFiveMinutesAgoBehind && securityApp) {
      const link = await dAppLink(securityApp.conf.name);
      await new Promise((resolve) => setTimeout(resolve, 150));

      return window.open(`${(window as any).MDS.filehost}${link.uid}/index.html?uid=${link.sessionid}#/dashboard/quicksync/host`, '_blank');
    }

    // open health app instead of showing block panel if installed
    if (statusApp) {
      const link = await dAppLink(statusApp.conf.name);
      await new Promise((resolve) => setTimeout(resolve, 150));

      return window.open(`${(window as any).MDS.filehost}${link.uid}/index.html?uid=${link.sessionid}`, '_blank');
    }

    if (fallbackHealthApp) {
      const link = await dAppLink(fallbackHealthApp.conf.name);
      await new Promise((resolve) => setTimeout(resolve, 150));

      return window.open(`${(window as any).MDS.filehost}${link.uid}/index.html?uid=${link.sessionid}`, '_blank');
    }

    setShowBlockInfo(true);
  };

  return (
    <div
      onClick={openTitleBar}
      className={`p-4 z-40 ${showSearch ? 'sm:bg-black/80 sm:backdrop-blur-xl xl:bg-transparent lg:backdrop-blur-none' : 'bg-transparent'
        }`}
    >
      <BlockInfo display={showBlockInfo} close={() => setShowBlockInfo(false)} />
      <div className="grid grid-cols-12 h-full">
        <div className="svg col-span-3 h-full flex items-center">
          <svg width="28" height="24" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M25.6554 7.46969L24.2413 13.5076L22.4307 6.21148L16.0935 3.73123L14.3802 11.0346L12.8614 2.47302L6.5242 0L0 27.8974H6.92074L8.92588 19.3286L10.4297 27.8974H17.3654L19.0713 20.5868L20.8744 27.8974H27.7952L32 9.94271L25.6554 7.46969Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="svg col-span-9 flex items-center justify-end">
          <div className="absolute top-0 right-3 flex p-4 pr-0 items-center justify-end gap-2 overflow-hidden">
            {hasNoPeers && (
              <button
                onClick={() => setShowHasNoPeers(true)}
                className="bg-[#1B1B1B] hover:text-neutral-100 hover:bg-neutral-800 font-bold flex gap-1 items-center text-neutral-300 text-xs p-1 px-2 rounded-lg animate-pulse"
              >
                <BroadcastIcon fill="currentColor" size={18} />
                Add Peers
              </button>
            )}

            <Status />

            {blockInfo && blockInfo.blockHeight && (
              <div
                onClick={displayBlockInfo}
                className="!bg-black gradient-border block_info min-h-[28px] flex cursor-pointer block-info rounded-full px-3 pb-1 pt-1.5 -mt-0.5 text-sm font-bold"
              >
                {isLoading && <div className='mt-[1px] w-[12px]'>
                  <div className="absolute mt-[2.5px] spinner-loader" />
                </div>}
                {!isLoading && (
                  <>
                    {isNodeFiveMinutesAgoBehind && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white ml-0.5 mr-2"
                        style={{ marginTop: '2px' }}
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    )}
                    {showWarning && <div>Chain Error</div>}
                    {!showWarning && statusInfo && statusInfo.noBlocksYet && <>No Blocks Yet</>}
                    {!showWarning && statusInfo && !statusInfo.noBlocksYet && (
                      <>
                        <div>
                          <span>{blockHeight}</span>
                          {' @ '}
                          <span>{format(parseInt(blockInfo.timemilli), 'HH:mm')}</span>
                        </div>
                      </>
                    )}
                  </>
                )}
                <svg
                  className="ml-2 mt-[2.5px]"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.4706 12.6057V7.31901L1.05881 4.63864V9.79715C1.05881 9.83514 1.06786 9.87075 1.08597 9.90398C1.10406 9.93722 1.13121 9.96571 1.16741 9.98944L5.4706 12.6057ZM6.5294 12.6057L10.8326 9.98944C10.8688 9.96571 10.8959 9.93722 10.914 9.90398C10.9321 9.87075 10.9412 9.83514 10.9412 9.79715V4.63864L6.5294 7.31901V12.6057ZM6 6.36196L10.3589 3.71861L6.1086 1.13935C6.0724 1.11561 6.0362 1.10374 6 1.10374C5.9638 1.10374 5.9276 1.11561 5.8914 1.13935L1.64115 3.71861L6 6.36196ZM0.638013 10.965C0.437107 10.8435 0.280548 10.6811 0.168336 10.4779C0.0561117 10.2747 0 10.0516 0 9.80855V4.19145C0 3.94838 0.0561117 3.72526 0.168336 3.52208C0.280548 3.31889 0.437107 3.15652 0.638013 3.03499L5.36199 0.182297C5.56289 0.0607659 5.77556 0 6 0C6.22444 0 6.43711 0.0607659 6.63801 0.182297L11.362 3.03499C11.5629 3.15652 11.7195 3.31889 11.8317 3.52208C11.9439 3.72526 12 3.94838 12 4.19145V9.80855C12 10.0516 11.9439 10.2747 11.8317 10.4779C11.7195 10.6811 11.5629 10.8435 11.362 10.965L6.63801 13.8177C6.43711 13.9392 6.22444 14 6 14C5.77556 14 5.56289 13.9392 5.36199 13.8177L0.638013 10.965Z"
                    fill="#E9E9EB"
                  />
                </svg>
              </div>
            )}

            <div className="hidden lg:block">
              <form action="/logoff.html" method="GET">
                <button
                  type="submit"
                  onClick={(evt) => evt.stopPropagation()}
                  className="flex items-center cursor-pointer rounded-full px-4 pb-1 pt-1 -mt-0.5 text-sm"
                >
                  Log out
                  <svg
                    className="ml-3"
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8857 17.5C16.3908 17.5 16.8184 17.325 17.1684 16.975C17.5184 16.625 17.6934 16.1974 17.6934 15.6923V12.1346H16.1934V15.6923C16.1934 15.7692 16.1614 15.8397 16.0972 15.9038C16.0331 15.9679 15.9626 16 15.8857 16H2.11648C2.03955 16 1.96903 15.9679 1.90493 15.9038C1.84082 15.8397 1.80876 15.7692 1.80876 15.6923V2.3077C1.80876 2.23077 1.84082 2.16024 1.90493 2.09613C1.96903 2.03203 2.03955 1.99998 2.11648 1.99998H15.8857C15.9626 1.99998 16.0331 2.03203 16.0972 2.09613C16.1614 2.16024 16.1934 2.23077 16.1934 2.3077V5.86535H17.6934V2.3077C17.6934 1.80257 17.5184 1.375 17.1684 1.025C16.8184 0.675 16.3908 0.5 15.8857 0.5H2.11648C1.61135 0.5 1.18378 0.675 0.833782 1.025C0.483799 1.375 0.308809 1.80257 0.308809 2.3077V15.6923C0.308809 16.1974 0.483799 16.625 0.833782 16.975C1.18378 17.325 1.61135 17.5 2.11648 17.5H15.8857ZM10.5011 13.4615L11.5549 12.3769L8.92798 9.74995H17.6934V8.25H8.92798L11.5549 5.62308L10.5011 4.53848L6.03958 8.99998L10.5011 13.4615Z"
                      fill="#F9F9FA"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
