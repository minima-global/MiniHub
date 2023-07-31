import "./index.css";
import AppProvider from "./AppContext";
import Dashboard from "./pages/Dashboard";
import useRewriteHistory from './hooks/useRewriteHistory';

function App() {
  useRewriteHistory();

  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

export default App;
