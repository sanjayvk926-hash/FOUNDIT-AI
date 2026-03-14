import React from 'react';
import { Home, ClipboardList, Search, Bell, Settings, LogOut, BarChart2, QrCode } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: ClipboardList, label: 'My Reports', path: '/reports' },
    { icon: Search, label: 'AI Matches', path: '/matches' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: QrCode, label: 'QR Scanner', path: '/scanner' },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-73px)] bg-white border-r border-slate-100 p-6 hidden lg:flex flex-col gap-8 sticky top-[73px]">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Menu</p>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-500 hover:bg-red-50 transition-all text-left">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
