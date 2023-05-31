import { useContext } from 'react';
import { appContext } from '../../AppContext';

const Blur = () => {
  const { rightMenu, setRightMenu } = useContext(appContext);

  const dismiss = () => {
    setRightMenu(false);
  };

  return (
    <div
      onClick={dismiss}
      className={`z-10 w-screen h-screen bg-frosted top-0 left-0 ${rightMenu ? 'absolute' : 'hidden'}`}
    />
  );
};

export default Blur;
