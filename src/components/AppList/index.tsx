import App from './App';
import { useContext } from 'react';
import { appContext } from '../../AppContext';
import AppFolder from '../AppFolder';

import * as _ from 'lodash';

const AppList = ({ data, maxCount }: any) => {
  const { setRightMenu } = useContext(appContext);
  const empty = maxCount - Object.keys(data).length;
  const emptySlots = empty && empty > 0 ? [...Array(empty).keys()] : [];

  const dismissRightMenu = () => setRightMenu(null);

  // data should look like [[Map], [Map], [Map]... n]
  const renderApps = () => {
    const categorizedApps = data;
    if (!categorizedApps.length) {
      return null;
    }

    return categorizedApps.map((_category) => {
      for (const [key, value] of _category) {
        const category = key;
        const apps = value;

        const isAFolder = !category.includes('None');
        if (!isAFolder) {
          return apps.map((app) => <App data={app} />);
        }
        if (isAFolder) {
          return <AppFolder title={category} data={apps} />;
        }
      }
    });
  };

  return (
    <>
      {renderApps()}

      {!!empty && emptySlots.map((k) => <div onClick={dismissRightMenu} key={`empty_${k}`} className="opacity-0" />)}
    </>
  );
};

export default AppList;
