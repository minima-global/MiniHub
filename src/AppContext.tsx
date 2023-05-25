import * as React from "react";
import { createContext, useEffect, useState } from "react";

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  // init mds
  useEffect(() => {
    if (!loaded) {
      (window as any).MDS.init((evt: any) => {
        if (evt.event === "inited") {
          // do something
        }
      });

      setLoaded(true);
    }
  }, [loaded]);

  const value = {};

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
