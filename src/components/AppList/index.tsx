import App from './App';

const AppList = ({ data, maxCount }: any) => {
  const empty = maxCount - data.length;

  return (
    <>
      {data && data.map((app) => <App key={app.uid} data={app} />)}
      {!!empty && [...Array(empty).keys()].map((k) => <div key={`empty_${k}`} className="item opacity-0" />)}
    </>
  );
};

export default AppList;
