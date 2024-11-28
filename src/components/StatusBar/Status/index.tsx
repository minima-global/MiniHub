import { useContext, useState } from 'react';
import { appContext } from '../../../AppContext';

let timeout: number | null = null;

const Status = () => {
  const { statusInfo } = useContext(appContext);
  const [hover, setHover] = useState(false);
  const display = statusInfo && statusInfo.locked === false;

  const handleOnMouseOver = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    setHover(true);
  };

  const handleOnMouseLeave = () => {
    // @ts-ignore
    timeout = setTimeout(() => {
      setHover(false);
    }, 1000);
  };

  return (
    <div
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      onClick={(evt) => evt.stopPropagation()}
      className={`onboard_security_1 mr-1 rounded-[15px] flex items-center bg-status-red h-[32px] px-3.5 text-sm font-bold duration-500 ease-in-out text-black transition-all ${
        display ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
    >
      <div
        className={`transition-all origin-right ${hover ? 'duration-300' : 'duration-200'} ${
          hover ? 'ml-0.5 mr-2 w-[105px]' : 'w-[1px]'
        }`}
      >
        <div
          className={`absolute top-1.5 left-4 transition-all delay-100 ${
            hover ? 'opacity-100' : 'delay-0 duration-0 opacity-0 h-[0px] w-[0px]'
          }`}
        >
          <span className="pointer-events-none">Node unlocked</span>
        </div>
      </div>
      <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.2 4.66683H7V3.3335C7 2.77794 6.80556 2.30572 6.41667 1.91683C6.02778 1.52794 5.55556 1.3335 5 1.3335C4.44444 1.3335 3.97222 1.52794 3.58333 1.91683C3.19444 2.30572 3 2.77794 3 3.3335H2C2 2.50016 2.29156 1.79172 2.87467 1.20816C3.45822 0.625052 4.16667 0.333496 5 0.333496C5.83333 0.333496 6.54178 0.625052 7.12533 1.20816C7.70844 1.79172 8 2.50016 8 3.3335V4.66683H8.8C9.13333 4.66683 9.41667 4.7835 9.65 5.01683C9.88333 5.25016 10 5.5335 10 5.86683V12.1335C10 12.4668 9.88333 12.7502 9.65 12.9835C9.41667 13.2168 9.13333 13.3335 8.8 13.3335H1.2C0.866667 13.3335 0.583333 13.2168 0.35 12.9835C0.116667 12.7502 0 12.4668 0 12.1335V5.86683C0 5.5335 0.116667 5.25016 0.35 5.01683C0.583333 4.7835 0.866667 4.66683 1.2 4.66683ZM5 10.1668C5.32222 10.1668 5.59733 10.0531 5.82533 9.8255C6.05289 9.5975 6.16667 9.32238 6.16667 9.00016C6.16667 8.67794 6.05289 8.40283 5.82533 8.17483C5.59733 7.94727 5.32222 7.8335 5 7.8335C4.67778 7.8335 4.40267 7.94727 4.17467 8.17483C3.94711 8.40283 3.83333 8.67794 3.83333 9.00016C3.83333 9.32238 3.94711 9.5975 4.17467 9.8255C4.40267 10.0531 4.67778 10.1668 5 10.1668Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default Status;
