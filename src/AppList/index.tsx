import { dAppLink } from "../lib";
import { displayDAppName } from "../utilities/utilities";

const AppList = ({ data, maxCount }: any) => {
  const empty = maxCount - data.length;

  console.log(empty);

  const openApp = async (dAppName: string) => {
    const link = await dAppLink(dAppName);
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.open(`${(window as any).MDS.filehost}${link.uid}/index.html?uid=${link.sessionid}`)
  };

  return (
    <>
      {data && data.map((app) => (
        <div className="item" onClick={() => openApp(app.conf.name)}>
          <div
            className="icon mb-2"
            style={{ backgroundImage: `url(${(window as any).MDS.filehost}/${app.uid}/${app.conf.icon}), url('./assets/app.png')` }}
          />
          <span className="item__label">{displayDAppName(app.conf.name)}</span>
        </div>
      ))}
      {!!empty && [...Array(empty).keys()].map(() => (
        <div className="item opacity-0" />
      ))}
    </>
  )
}

export default AppList;
