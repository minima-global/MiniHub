import { useContext, useEffect } from 'react';
import { appContext } from '../../AppContext';

const BadgeNotification = () => {
  const { badgeNotification, setBadgeNotification } = useContext(appContext);

  useEffect(() => {
    if (badgeNotification) {
      setTimeout(() => {
        setBadgeNotification(null);
      }, 5000);
    }
  }, [badgeNotification, setBadgeNotification]);

  if (!badgeNotification) {
    return <div />;
  }

  return (
    <div className="fixed z-[100] bottom-0 left-0 user-select-none w-full p-6 lg:p-8 mx-auto">
      <div className={`bg-white mx-auto text-center w-fit rounded text-black px-5 py-1.5 rounded-full`}>
        {badgeNotification}
      </div>
    </div>
  );
};

export default BadgeNotification;
