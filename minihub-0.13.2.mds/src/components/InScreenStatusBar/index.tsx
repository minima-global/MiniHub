import { useContext } from 'react';
import { appContext } from '../../AppContext';
import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';

type InScreenTitleBarProps = {
  onExit?: () => void;
};

const InScreenTitleBar = ({ onExit }: InScreenTitleBarProps) => {
  const { hasShutdown, hasUpdated } = useContext(appContext);
  const { openTitleBar } = useAndroidShowTitleBar();

  const handleOnExit = (evt) => {
    evt.stopPropagation();

    if (hasShutdown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return window.location.assign(MDS.filehost);
    }

    if (onExit) {
      onExit();
    }
  };

  return (
    <div onClick={openTitleBar} className="backdrop-blur-md bg-black/60 p-4 z-[80]">
      <div className="grid grid-cols-12 h-full">
        <div className="svg col-span-6 h-full flex items-center">
          <svg width="28" height="24" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M25.6554 7.46969L24.2413 13.5076L22.4307 6.21148L16.0935 3.73123L14.3802 11.0346L12.8614 2.47302L6.5242 0L0 27.8974H6.92074L8.92588 19.3286L10.4297 27.8974H17.3654L19.0713 20.5868L20.8744 27.8974H27.7952L32 9.94271L25.6554 7.46969Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="svg col-span-6 flex items-center justify-end">
          {onExit && !hasUpdated && (
            <button
              type="button"
              onClick={handleOnExit}
              className="flex items-center cursor-pointer rounded-full px-4 pb-1 pt-1 -mt-0.5 text-sm"
            >
              Exit
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
          )}
        </div>
      </div>
    </div>
  );
};

export default InScreenTitleBar;
