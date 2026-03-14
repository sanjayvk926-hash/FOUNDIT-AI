import React from 'react';
import { Search, MapPin, Calendar, CheckCircle2, XCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { matches } from '../data/mockData';
import Sidebar from '../components/Sidebar';

const Matches: React.FC = () => {
  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-73px)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">AI Smart Matches</h1>
          <p className="text-slate-500 font-medium">Our system analyzed existing inventory and found potential candidates for your lost items.</p>
        </div>

        <div className="space-y-8">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col lg:flex-row group transition-all hover:shadow-xl hover:border-primary/20">
              <div className="w-full lg:w-80 aspect-video lg:aspect-auto relative bg-slate-100 flex-shrink-0">
                <img src={match.image} alt={match.itemName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Match Core</span>
                  <span className="text-2xl font-black text-primary leading-none">{match.matchScore}%</span>
                </div>
              </div>

              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-slate-900">{match.itemName}</h2>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                          <MapPin size={16} />
                          <span>{match.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                          <Calendar size={16} />
                          <span>{match.foundDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black border ${
                      match.status.includes('Verification')
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-primary/5 text-primary border-primary/10'
                    }`}>
                      <AlertCircle size={18} />
                      <span>{match.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Similarity Breakdown</h4>
                      <div className="space-y-3">
                        {[
                          { label: 'Color Matching', score: 98 },
                          { label: 'Object Shape', score: 92 },
                          { label: 'Brand Detection', score: 88 }
                        ].map((stat, i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="flex justify-between items-end">
                              <span className="text-sm font-bold text-slate-700">{stat.label}</span>
                              <span className="text-xs font-black text-primary">{stat.score}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${stat.score}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Insights</h4>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">Color "Midnight Blue" significantly matches the visual report from your Sony headphones.</p>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">Location "Library" is within 250m of where this item was found 2h later.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-8">
                  <button className="flex-1 min-w-[160px] h-14 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                    <span>This is Mine</span>
                    <ArrowUpRight size={20} />
                  </button>
                  <button className="flex-1 min-w-[160px] h-14 bg-white text-slate-600 border border-slate-200 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <XCircle size={20} />
                    <span>Not My Item</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="p-12 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <Search size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-lg">Still searching...</h3>
              <p className="text-slate-500 font-medium max-w-sm">Our AI scans the campus lost & found every 15 minutes. We'll notify you as soon as more matches appear.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Matches;
