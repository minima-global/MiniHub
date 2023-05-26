import * as React from "react";
import { createContext, useEffect, useState } from "react";
import { isWriteMode, mds } from "./lib";

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [appList, setAppList] = useState([]);
  const [appIsInWriteMode, setAppIsInWriteMode] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');

  // init mds
  useEffect(() => {
    if (!loaded) {
      (window as any).MDS.init((evt: any) => {
        if (evt.event === "inited") {
          // check if app is in write mode and let the rest of the
          // app know if it is or isn't
          isWriteMode().then((appIsInWriteMode) => {
            setAppIsInWriteMode(appIsInWriteMode);
          });

          mds().then((response) => {
            setAppList(response.minidapps)
          });
        }
      });

      setLoaded(true);
    }
  }, [loaded]);

  const value = {
    appList,
    query,
    setQuery,
    appIsInWriteMode,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
