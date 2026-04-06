import React from 'react';
import { Home, ClipboardList, Search, Bell, Settings, LogOut, BarChart2, QrCode, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: ClipboardList, label: 'My Reports', path: '/reports' },
    { icon: Search, label: 'AI Matches', path: '/matches' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: QrCode, label: 'QR Scanner', path: '/scanner' },
  ];

  return (
    <aside className="w-80 h-screen bg-[#1c113f]/40 backdrop-blur-3xl border-r border-[#4b426a]/20 p-8 hidden lg:flex flex-col gap-10 sticky top-0">
      <div className="px-4 py-6 border-b border-[#4b426a]/10 mb-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#645ef9] to-[#a7a5ff] flex items-center justify-center shadow-lg shadow-[#645ef9]/20">
            <User size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-white tracking-tight">{user?.username || 'Researcher'}</span>
            <span className="text-[10px] font-bold text-[#a7a5ff] uppercase tracking-widest">Active Session</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[10px] font-black text-[#4b426a] uppercase tracking-[0.2em] ml-4">Core Intelligence</p>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-bold transition-all ${
                  isActive
                    ? 'bg-[#645ef9] text-white shadow-2xl shadow-[#645ef9]/30 translate-x-2'
                    : 'text-[#b0a4d3] hover:bg-[#1c113f] hover:text-white hover:translate-x-1'
                }`}
              >
                <item.icon size={22} className={isActive ? 'text-white' : 'text-[#a7a5ff] group-hover:text-white transition-colors'} />
                <span className="tracking-tight text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <p className="text-[10px] font-black text-[#4b426a] uppercase tracking-[0.2em] ml-4">System</p>
        <div className="flex flex-col gap-2">
          <Link
            to="/settings"
            className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-bold text-[#b0a4d3] hover:bg-[#1c113f] hover:text-white hover:translate-x-1 transition-all"
          >
            <Settings size={22} className="text-[#a7a5ff]" />
            <span className="text-base">Settings</span>
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-bold text-red-400 hover:bg-red-500/10 hover:translate-x-1 transition-all text-left"
          >
            <LogOut size={22} />
            <span className="text-base uppercase tracking-widest text-[10px] font-black">Terminate Protocol</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
