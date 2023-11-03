import App from './App';
import { useContext } from 'react';
import { appContext } from '../../AppContext';

const AppList = ({ data, maxCount }: any) => {
  const { setRightMenu } = useContext(appContext);
  const empty = maxCount - data.length;
  const emptySlots = [...Array(empty).keys()];

  const dismissRightMenu = () => setRightMenu(null);

  return (
    <>
      {data && data.map((app) => <App key={app.uid} data={app} />)}
      {!!empty && emptySlots.map((k) => <div onClick={dismissRightMenu} key={`empty_${k}`} className="opacity-0" />)}
    </>
  );
};

export default AppList;
