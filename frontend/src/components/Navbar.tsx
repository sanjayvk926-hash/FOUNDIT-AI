import React from 'react';
import { Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <div className="text-primary">
          <Layers size={36} fill="currentColor" />
        </div>
        <h2 className="text-slate-900 font-black text-xl tracking-tight">FoundIt AI</h2>
      </Link>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/about" className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors">About</Link>
          <Link to="/how-it-works" className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors">How it Works</Link>
          <Link to="/faq" className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors">FAQ</Link>
        </nav>
        <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-11 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
          <span>Login</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
