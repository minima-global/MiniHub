import { useContext } from 'react';
import { appContext } from '../../../AppContext';
import Modal from '../../UI/Modal';

const BlockInfo = ({ display, close }: any) => {
  const { blockInfo } = useContext(appContext);

  return (
    <div className={`${display ? 'fixed' : 'hidden'} h-screen w-screen top-0 left-0 z-10`}>
      <div className="fixed z-[100] left-4 top-4 mt-0.5">
        <svg width="28" height="24" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25.6554 7.46969L24.2413 13.5076L22.4307 6.21148L16.0935 3.73123L14.3802 11.0346L12.8614 2.47302L6.5242 0L0 27.8974H6.92074L8.92588 19.3286L10.4297 27.8974H17.3654L19.0713 20.5868L20.8744 27.8974H27.7952L32 9.94271L25.6554 7.46969Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div onClick={close} className="fixed z-[100] top-4 right-4">
        <div className="flex cursor-pointer core-black-contrast-2 rounded-full px-4 py-1 text-sm font-bold">
          Close
        </div>
      </div>
      <Modal display={display} frosted close={close}>
        <div className="text-center pb-2">
          <div className="text-2xl mx-auto mb-8">Chain status</div>
          <div className="core-black-contrast p-5 flex items-center mb-4 rounded gap-4">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.25 17.5695V10.431L1.99997 6.81174V13.7771C1.99997 13.8284 2.0128 13.8765 2.03845 13.9214C2.06408 13.9662 2.10254 14.0047 2.15383 14.0368L8.25 17.5695ZM9.74995 17.5695L15.8461 14.0368C15.8974 14.0047 15.9359 13.9662 15.9615 13.9214C15.9872 13.8765 16 13.8284 16 13.7771V6.81174L9.74995 10.431V17.5695ZM8.99998 9.13869L15.175 5.56947L9.15383 2.08676C9.10254 2.05471 9.05126 2.03869 8.99998 2.03869C8.94869 2.03869 8.89741 2.05471 8.84613 2.08676L2.82495 5.56947L8.99998 9.13869ZM1.40385 15.354C1.11923 15.1899 0.897441 14.9707 0.738475 14.6963C0.579491 14.422 0.5 14.1207 0.5 13.7925V6.20791C0.5 5.87971 0.579491 5.57844 0.738475 5.30409C0.897441 5.02972 1.11923 4.81049 1.40385 4.64639L8.09613 0.79449C8.38074 0.63039 8.68202 0.54834 8.99998 0.54834C9.31793 0.54834 9.61921 0.63039 9.90383 0.79449L16.5961 4.64639C16.8807 4.81049 17.1025 5.02972 17.2615 5.30409C17.4205 5.57844 17.5 5.87971 17.5 6.20791V13.7925C17.5 14.1207 17.4205 14.422 17.2615 14.6963C17.1025 14.9707 16.8807 15.1899 16.5961 15.354L9.90383 19.2059C9.61921 19.37 9.31793 19.4521 8.99998 19.4521C8.68202 19.4521 8.38074 19.37 8.09613 19.2059L1.40385 15.354Z"
                fill="#E9E9EB"
              />
            </svg>
            Block {blockInfo.blockHeight}
          </div>
          <div className="core-black-contrast p-5 flex items-center rounded gap-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.4731 14.5269L14.5269 13.4731L10.75 9.6959V4.99998H9.25V10.3038L13.4731 14.5269ZM10.0016 19.5C8.68772 19.5 7.45268 19.2506 6.29655 18.752C5.1404 18.2533 4.13472 17.5765 3.2795 16.7217C2.42427 15.8669 1.74721 14.8616 1.24833 13.706C0.749442 12.5504 0.5 11.3156 0.5 10.0017C0.5 8.68772 0.749334 7.45268 1.248 6.29655C1.74667 5.1404 2.42342 4.13472 3.27825 3.2795C4.1331 2.42427 5.13834 1.74721 6.29398 1.24833C7.44959 0.749443 8.68437 0.5 9.9983 0.5C11.3122 0.5 12.5473 0.749334 13.7034 1.248C14.8596 1.74667 15.8652 2.42342 16.7205 3.27825C17.5757 4.1331 18.2527 5.13834 18.7516 6.29398C19.2505 7.44959 19.5 8.68437 19.5 9.9983C19.5 11.3122 19.2506 12.5473 18.752 13.7034C18.2533 14.8596 17.5765 15.8652 16.7217 16.7205C15.8669 17.5757 14.8616 18.2527 13.706 18.7516C12.5504 19.2505 11.3156 19.5 10.0016 19.5ZM9.99998 18C12.2166 18 14.1041 17.2208 15.6625 15.6625C17.2208 14.1041 18 12.2166 18 9.99998C18 7.78331 17.2208 5.89581 15.6625 4.33748C14.1041 2.77914 12.2166 1.99998 9.99998 1.99998C7.78331 1.99998 5.89581 2.77914 4.33748 4.33748C2.77914 5.89581 1.99998 7.78331 1.99998 9.99998C1.99998 12.2166 2.77914 14.1041 4.33748 15.6625C5.89581 17.2208 7.78331 18 9.99998 18Z"
                fill="#E9E9EB"
              />
            </svg>
            {blockInfo.dateTime}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlockInfo;
