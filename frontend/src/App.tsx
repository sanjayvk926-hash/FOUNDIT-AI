import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import ReportLost from './pages/ReportLost';
import UploadFound from './pages/UploadFound';
import SecurityDesk from './pages/SecurityDesk';
import Analytics from './pages/Analytics';
import QRScanner from './pages/QRScanner';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/reports" element={<ReportLost />} />
                <Route path="/scanner" element={<UploadFound />} />
                <Route path="/security" element={<SecurityDesk />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/faq" element={<QRScanner />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
