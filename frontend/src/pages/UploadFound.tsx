import React from 'react';
import { Camera, MapPin, Search, CheckCircle2, CloudUpload } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const UploadFound: React.FC = () => {
  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-73px)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">I Found Something</h1>
          <p className="text-slate-500 font-medium">Thank you for being a responsible student! Let's get this item back to its owner.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CloudUpload size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Upload Item Photo</h3>
                </div>
                
                <div className="relative group">
                  <div className="border-4 border-dashed border-slate-100 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/50 group-hover:bg-slate-50 group-hover:border-primary/20 transition-all cursor-pointer overflow-hidden aspect-video">
                    {/* Placeholder for uploaded image preview */}
                    <div className="flex flex-col items-center py-4">
                      <Camera size={48} className="text-slate-300 mb-4 group-hover:text-primary transition-colors" />
                      <p className="text-slate-900 font-black text-xl mb-1">Click to Capture or Drop Photo</p>
                      <p className="text-slate-400 font-medium">Use your camera for best AI matching</p>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-slate-50" />

              <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Where did you find it?</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-slate-700 text-sm font-bold ml-1">Location Details</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Near the vending machine in Admin Block" 
                      className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/20 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-700 text-sm font-bold ml-1">Your Remark (Optional)</label>
                    <textarea 
                      rows={3} 
                      placeholder="Found around 2pm, slightly dusty..." 
                      className="w-full p-5 bg-slate-50 border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/20 transition-all text-slate-900 placeholder:text-slate-400 font-medium resize-none"
                    />
                  </div>
                </div>
              </section>

              <button className="w-full h-16 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-3">
                <span>Process with AI Scanner</span>
                <Search size={22} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <h3 className="text-xl font-black mb-6 relative z-10">AI Recognition Preview</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <p className="text-xs font-black text-white/40 uppercase tracking-widest">Initial Analysis</p>
                  <div className="flex items-center justify-center h-40 bg-white/5 rounded-xl border border-white/10 border-dashed">
                    <p className="text-sm font-bold text-white/30 italic">Upload an image to start scanning</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white/80">Why use AI?</h4>
                  {[
                    'Instant item classification',
                    'Automatic color detection',
                    'Real-time owner matching',
                    'Higher return accuracy'
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <CheckCircle2 size={16} className="text-primary" />
                      <span className="text-xs font-medium text-white/60">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Security Office</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-tight">After uploading, please hand small items to the nearest Security Desk.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadFound;
