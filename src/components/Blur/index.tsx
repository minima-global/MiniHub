import { useContext } from 'react';
import { appContext } from '../../AppContext';

const Blur = () => {
  const { rightMenu, setRightMenu, folderStatus } = useContext(appContext);

  const dismiss = () => {
    setRightMenu(false);
  };

  if (folderStatus) {
    return null;
  }

  return (
    <div
      onClick={dismiss}
      className={`z-20 w-screen h-screen backdrop-blur-sm top-0 left-0 ${rightMenu ? 'fixed' : 'hidden'}`}
    />
  );
};

export default Blur;
