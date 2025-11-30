import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './Pages/LoginPage';
import DashboardLayout from './Pages/Dashboard/DashboardLayout';
import DashboardMain from './Components/DashboardMain';
import AmbulanceOperators from './Pages/Dashboard/AmbulanceOperators';
import HospitalsPage from './Pages/Dashboard/HospitalsPage';
import TransactionsPage from './Pages/Dashboard/TransactionsPage';
import SettingsPage from './Pages/Dashboard/SettingsPage';
import SupportPage from './Pages/Dashboard/SupportsPage';
import ReportsPage from './Pages/Dashboard/ReportsPage';
import MonitoringPage from './Pages/Dashboard/MonitoringPage';
import Notifications from './Pages/Dashboard/Notifications';

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin Dashboard Layout */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardMain />} />
          <Route path="operators" element={<AmbulanceOperators/>} />
          <Route path="hospitals" element={<HospitalsPage/>} />
           <Route path="monitoring" element={<MonitoringPage/>} />
          <Route path="transactions" element={<TransactionsPage/>} />
          <Route path="reports" element={<ReportsPage/>} />
          <Route path="support" element={<SupportPage/>} />
          <Route path="settings" element={<SettingsPage/>} />
          <Route path="notifications" element={<Notifications/>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
