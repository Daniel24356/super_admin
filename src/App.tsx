import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import DashboardLayout from './Pages/Dashboard/DashboardLayout';
import DashboardMain from './Components/DashboardMain';

function App() {

  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardMain />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
