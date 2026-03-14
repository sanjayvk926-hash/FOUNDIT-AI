import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
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
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/reports" element={<ReportLost />} />
          <Route path="/scanner" element={<UploadFound />} />
          <Route path="/security" element={<SecurityDesk />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/faq" element={<QRScanner />} /> {/* Mapping QR to FAQ for demo navigation */}
          {/* Add more routes as we convert pages */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Porting in Progress</h2>
              <p className="mt-2 text-slate-500 font-medium max-w-sm">I am currently converting this specific page from the original design into a React component.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
