import './index.css';
import AppProvider, { appContext } from './AppContext';
import Dashboard from './pages/Dashboard';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Install from './pages/proxy/Install';
import Update from './pages/proxy/Update';
import Settings from './pages/proxy/Settings';
import Delete from './pages/proxy/Delete';
import Root from './pages/proxy/Root';
import Introduction from './components/Introduction';
import SettingsAddConnections from './pages/proxy/SettingsAddConnections';
import Onboarding from './components/Onboarding';
import { useContext } from 'react';

const Bootstrapper = () => {
  const { bootstrapping, appReady } = useContext(appContext);
  console.log(appReady);
  return (
    <>
      {bootstrapping && <div id="hello" className="fixed top-0 left-0 h-screen w-screen bg-black z-[100]" />}
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/introduction" element={<Introduction />}></Route>
        <Route path="/install" element={<Install />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/add-connections" element={<SettingsAddConnections />} />
        <Route path="/" element={<Root />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Onboarding />
        <Bootstrapper />
      </AppProvider>
    </HashRouter>
  );
}

const urlParams = new URLSearchParams(window.location.search);
global.UID = urlParams.get('uid');

export default App;
