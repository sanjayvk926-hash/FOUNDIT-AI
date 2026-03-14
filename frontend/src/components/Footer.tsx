import React from 'react';
import { Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto w-full px-6 md:px-20 py-12 border-t border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 opacity-60 grayscale">
          <Layers size={24} />
          <span className="font-black text-slate-900">FoundIt AI</span>
        </div>
        <div className="flex gap-8 text-slate-400 text-sm font-semibold">
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/support" className="hover:text-primary transition-colors">Contact Support</Link>
        </div>
        <p className="text-slate-400 text-sm font-medium">
          © 2024 FoundIt AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
