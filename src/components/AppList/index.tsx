import App from './App';
import { useContext } from 'react';
import { appContext } from '../../AppContext';
import AppFolder from '../AppFolder';

import * as _ from 'lodash';
import useAppList from '../../hooks/useAppList';
import { excludedFromFolders, systemApps } from '../../constants';

const AppList = ({ data, maxCount }: any) => {
  const { setRightMenu, folderStatus } = useContext(appContext);
  const { appListWithCategories, isQueryingApps } = useAppList();
  const empty = maxCount - Object.keys(data).length;
  const emptySlots = empty && empty > 0 ? [...Array(empty).keys()] : [];

  const dismissRightMenu = () => setRightMenu(null);

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

    const apps = categorizedApps.filter((_a) => !(_a instanceof Map));
    const folders = categorizedApps.filter((_a) => _a instanceof Map);

    const renderFolders = folders.map((f) => {
      for (const [key, value] of f) {
        const category = key;
        const apps = value;


        if (category === "System") {
          return (
            <AppFolder
              key={`appFolder_${key}`}
              title={category}
              data={apps}
              display={appListWithCategories.filter((_app) => systemApps.includes(_app.conf.name))}
            />
          );
        }

        if (category === "Other") {
          return (
            <AppFolder
              key={`appFolder_${key}`}
              title={category}
              data={apps}
              display={appListWithCategories.filter(_app =>
                !_app.conf.category &&
                !_app.uid.includes("system") &&
                !systemApps.includes(_app.conf.name) &&
                !excludedFromFolders.includes(_app.conf.name)
              )}
            />
          );
        }

        return (
          <AppFolder
            key={`appFolder_${key}`}
            title={category}
            data={apps}
            display={appListWithCategories.filter(i => !systemApps.includes(i.conf.name)).filter((_app) => _app.conf.category && _app.conf.category.includes(key))}
          />
        );
      }
    });

    const renderApps = apps.map((app) => {
      return <App key={app.uid} data={app} />;
    });

    return [...renderFolders, ...renderApps];
  };

  return (
    <>
      {renderApps()}

      {!!empty && emptySlots.map((k) => <div onClick={dismissRightMenu} key={`empty_${k}`} className="opacity-0" />)}
    </>
  );
};

export default AppList;
