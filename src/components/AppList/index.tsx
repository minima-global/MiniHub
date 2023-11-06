import App from './App';
import { useContext } from 'react';
import { appContext } from '../../AppContext';
import AppFolder from '../AppFolder';

import * as _ from 'lodash';
import useAppList from '../../hooks/useAppList';

const AppList = ({ data, maxCount }: any) => {
  const { setRightMenu, folderStatus } = useContext(appContext);
  const { appListWithCategories, isQueryingApps } = useAppList();
  const empty = maxCount - Object.keys(data).length;
  const emptySlots = empty && empty > 0 ? [...Array(empty).keys()] : [];

  const dismissRightMenu = () => setRightMenu(null);

  // data should look like [[Map], [Map], [Map]... n]
  const renderApps = () => {
    const categorizedApps = data;
    if (!categorizedApps.length) {
      return null;
    }

    if (!folderStatus) {
      return data.map((app) => <App key={app.uid} data={app} />);
    }

    if (isQueryingApps) {
      return data.map((app) => <App key={app.uid} data={app} />);
    }

    return categorizedApps.map((app) => {
      if (!(app instanceof Map)) {
        return <App key={app.uid} data={app} />;
      }

      // if we make it this far then it's a folder..
      for (const [key, value] of app) {
        const category = key;
        const apps = value;

        return (
          <AppFolder
            key={`appFolder_${key}`}
            title={category}
            data={apps}
            display={appListWithCategories.filter((_app) => _app.conf.category && _app.conf.category.includes(key))}
          />
        );
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
