import { useContext } from 'react';
import { dAppLink } from '../../../lib';
import { appContext } from '../../../AppContext';
import { displayDAppName } from '../../../utilities';

const MobileSearchItem = ({ data, onRightClick }) => {
  const { rightMenu, setRightMenu, isMobile } = useContext(appContext);

  const openApp = async () => {
    if (rightMenu) {
      return setRightMenu(null);
    }

    if (data.conf.onClick) {
      return data.conf.onClick();
    }

    const link = await dAppLink(data.conf.name);
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.open(
      `${(window as any).MDS.filehost}${link.uid}/index.html?uid=${link.sessionid}`,
      isMobile ? '_self' : '_blank'
    );
  };

  const handleOnContextMenu = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    setRightMenu(data);
    onRightClick();
  };

  const dismiss = () => {
    setRightMenu(null);
  };

  return (
    <div onClick={openApp} className="w-full core-black-contrast-2 rounded-lg" onContextMenu={handleOnContextMenu}>
      <div className="flex relative">
        {/* App icon */}
        <div onClick={() => (rightMenu ? setRightMenu(null) : null)} className={`z-30`}>
          <img
            alt="app_icon"
            className="w-[64px] h-[64px] rounded-lg core-black-contrast-2"
            src={
              data.conf.overrideIcon
                ? data.conf.overrideIcon
                : `${(window as any).MDS.filehost}${data.uid}/${data.conf.icon}`
            }
          />
        </div>
        <span className="flex-grow flex items-center pl-5">{displayDAppName(data.conf.name)}</span>
      </div>
      {/* Background blur for dismissing right click context menu */}
      {rightMenu === data.uid && <div className="w-full h-full fixed left-0 top-0 z-30" onClick={dismiss} />}
    </div>
  );
};

export default MobileSearchItem;
