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

  return (
    <div className={`bg-white mx-auto text-center w-fit rounded text-black px-5 py-1.5 rounded-full ${badgeNotification ? 'scale-100' : 'scale-0'}`}>
      {badgeNotification}
    </div>
  );
};

export default BadgeNotification;
