import React from 'react';
import { BarChart2, TrendingUp, Users, CheckCircle2, MapPin } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Analytics: React.FC = () => {
  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-73px)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Campus Analytics</h1>
          <p className="text-slate-500 font-medium">Real-time insights into lost & found patterns across the university.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Monthly Traffic', val: '2,482', icon: BarChart2, trend: '+12%', trendUp: true, color: 'text-primary' },
            { label: 'Active Users', val: '8,104', icon: Users, trend: '+4%', trendUp: true, color: 'text-blue-600' },
            { label: 'Items Returned', val: '615', icon: CheckCircle2, trend: '98%', trendUp: true, color: 'text-green-600' },
            { label: 'Match Accuracy', val: '94%', icon: TrendingUp, trend: '+2%', trendUp: true, color: 'text-purple-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-black ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                  <span>{stat.trend}</span>
                  <TrendingUp size={12} />
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900">{stat.val}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Return Success Rate</h3>
              <select className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-500 h-10 px-4 focus:ring-0">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>
            {/* Visual Placeholder for a Chart */}
            <div className="aspect-[16/9] w-full bg-slate-50 rounded-2xl flex items-end justify-between p-6 gap-4 border border-slate-100/50">
              {[60, 40, 80, 50, 95, 70, 85, 45, 90, 65, 75, 80].map((h, i) => (
                <div key={i} className="flex-1 space-y-2">
                  <div className="w-full bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary cursor-pointer" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">{h}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl shadow-slate-900/10 space-y-8">
            <h3 className="text-xl font-bold">Hotspot Activity Map</h3>
            <div className="aspect-[16/9] w-full bg-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center p-8 border border-white/10 border-dashed">
              <div className="absolute inset-0 grayscale opacity-20 bg-[url('https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center"></div>
              <div className="relative z-10 w-full grid grid-cols-3 grid-rows-3 gap-12">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]"></div>
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Library</span>
                </div>
                <div></div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse delay-75"></div>
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Cafe</span>
                </div>
                <div></div>
                <div className="flex flex-col items-center gap-2 col-start-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse delay-150"></div>
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Sports Hall</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                <MapPin size={24} className="text-red-500" />
                <div>
                  <p className="text-xs font-bold">Main Library</p>
                  <p className="text-[10px] text-white/40 font-medium">Critical hotspot (24 items/week)</p>
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                <MapPin size={24} className="text-amber-500" />
                <div>
                  <p className="text-xs font-bold">Student Union</p>
                  <p className="text-[10px] text-white/40 font-medium">Medium activity (12 items/week)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
