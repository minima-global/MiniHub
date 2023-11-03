import './index.css';
import AppProvider from './AppContext';
import Dashboard from './pages/Dashboard';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Install from './pages/proxy/Install';
import Update from './pages/proxy/Update';
import Settings from './pages/proxy/Settings';
import Delete from './pages/proxy/Delete';
import Root from './pages/proxy/Root';
import Introduction from './components/Introduction';
import SettingsAddConnections from './pages/proxy/SettingsAddConnections';

function App() {
  return (
    <HashRouter>
      <AppProvider>
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
      </AppProvider>
    </HashRouter>
  );
}

export default App;
