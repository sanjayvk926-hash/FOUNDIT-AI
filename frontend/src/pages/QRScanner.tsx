import React from 'react';
import { Camera, QrCode, ShieldCheck, ChevronLeft, MapPin } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const QRScanner: React.FC = () => {
  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-73px)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">QR Smart Scan</h1>
          <p className="text-slate-500 font-medium">Quickly report a found item by scanning a FoundIt sticker.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:flex-1 space-y-8">
            <div className="relative aspect-square max-w-md mx-auto bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-slate-800">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2??auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-40"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-64 h-64 border-2 border-primary rounded-3xl relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 animate-scan"></div>
                </div>
                <div className="mt-8 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                  <p className="text-white text-xs font-black uppercase tracking-widest">Scanning Active</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="h-14 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                <ChevronLeft size={20} />
                <span>Go Back</span>
              </button>
              <button className="h-14 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                <Camera size={20} />
                <span>Use Photo</span>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <QrCode size={32} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Scan & Return</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Found a sticker on an item? Point your camera to automatically identify the owner and skip the manual report.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <ShieldCheck size={24} className="text-green-500" />
                  <p className="text-[10px] text-slate-400 font-bold uppercase leading-tight tracking-wider">Secure Data Retrieval</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-3xl space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Status</p>
              </div>
              <h4 className="font-bold">Not detecting QR?</h4>
              <p className="text-xs text-white/60 font-medium leading-relaxed">Ensure lighting is sufficient and the sticker is fully within the frame.</p>
              <button className="w-full h-10 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest">Learn More</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRScanner;
