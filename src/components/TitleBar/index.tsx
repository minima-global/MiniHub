import { useContext } from 'react';
import { appContext } from '../../AppContext';

const TitleBar = () => {
  const { blockInfo } = useContext(appContext);

  return (
    <div className="backdrop-blur-md bg-black/40 p-4 z-40">
      <div className="grid grid-cols-12 h-full">
        <div className="svg col-span-3 h-full flex items-center">
          <svg width="28" height="24" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M25.6554 7.46969L24.2413 13.5076L22.4307 6.21148L16.0935 3.73123L14.3802 11.0346L12.8614 2.47302L6.5242 0L0 27.8974H6.92074L8.92588 19.3286L10.4297 27.8974H17.3654L19.0713 20.5868L20.8744 27.8974H27.7952L32 9.94271L25.6554 7.46969Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="svg col-span-9 flex gap-2 items-center justify-end">
          {blockInfo && blockInfo.blockHeight &&(
            <div className="flex cursor-pointer core-black-contrast-2 rounded-full px-3 pb-1 pt-1.5 -mt-0.5 text-sm font-bold">
              <div className="ml-0.5">Block</div>
              <div className="ml-1">{blockInfo.blockHeight}</div>
              <svg className="ml-2 mt-0.5" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4706 12.6057V7.31901L1.05881 4.63864V9.79715C1.05881 9.83514 1.06786 9.87075 1.08597 9.90398C1.10406 9.93722 1.13121 9.96571 1.16741 9.98944L5.4706 12.6057ZM6.5294 12.6057L10.8326 9.98944C10.8688 9.96571 10.8959 9.93722 10.914 9.90398C10.9321 9.87075 10.9412 9.83514 10.9412 9.79715V4.63864L6.5294 7.31901V12.6057ZM6 6.36196L10.3589 3.71861L6.1086 1.13935C6.0724 1.11561 6.0362 1.10374 6 1.10374C5.9638 1.10374 5.9276 1.11561 5.8914 1.13935L1.64115 3.71861L6 6.36196ZM0.638013 10.965C0.437107 10.8435 0.280548 10.6811 0.168336 10.4779C0.0561117 10.2747 0 10.0516 0 9.80855V4.19145C0 3.94838 0.0561117 3.72526 0.168336 3.52208C0.280548 3.31889 0.437107 3.15652 0.638013 3.03499L5.36199 0.182297C5.56289 0.0607659 5.77556 0 6 0C6.22444 0 6.43711 0.0607659 6.63801 0.182297L11.362 3.03499C11.5629 3.15652 11.7195 3.31889 11.8317 3.52208C11.9439 3.72526 12 3.94838 12 4.19145V9.80855C12 10.0516 11.9439 10.2747 11.8317 10.4779C11.7195 10.6811 11.5629 10.8435 11.362 10.965L6.63801 13.8177C6.43711 13.9392 6.22444 14 6 14C5.77556 14 5.56289 13.9392 5.36199 13.8177L0.638013 10.965Z" fill="#E9E9EB"/>
              </svg>
            </div>
          )}
          <div className="hidden lg:block">
            <div className="cursor-pointer border-2 border-gray-700 rounded-full px-5 pb-1 pt-1.5 -mt-0.5 text-xs uppercase font-bold">
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
