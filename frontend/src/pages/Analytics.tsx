import React from 'react';
import { BarChart2, TrendingUp, Users, CheckCircle2, MapPin, Sparkles, Zap, ShieldCheck, Activity } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Analytics: React.FC = () => {
  return (
    <div className="flex bg-[#10062d] min-h-screen text-[#eae1ff] selection:bg-[#645ef9]/30">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#a7a5ff] font-black uppercase tracking-[0.2em] text-xs">
            <div className="w-8 h-[2px] bg-[#a7a5ff]"></div>
            System Intelligence
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight italic">Campus Neural Patterns.</h1>
          <p className="text-[#b0a4d3] font-medium text-lg max-w-2xl">Real-time telemetry and predictive distribution across the university network.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Neural Traffic', val: '2,482', icon: Activity, trend: '+12%', trendUp: true, color: 'text-[#a7a5ff]' },
            { label: 'Network Nodes', val: '8,104', icon: Users, trend: '+4%', trendUp: true, color: 'text-[#645ef9]' },
            { label: 'Recovery Rate', val: '615', icon: CheckCircle2, trend: '98%', trendUp: true, color: 'text-green-400' },
            { label: 'AI Precision', val: '94%', icon: Sparkles, trend: '+2%', trendUp: true, color: 'text-yellow-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#1c113f]/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-[#4b426a]/20 shadow-2xl flex flex-col gap-6 group hover:border-[#a7a5ff]/40 transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className={`p-4 rounded-2xl bg-[#10062d]/60 border border-[#4b426a]/40 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} />
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black ${stat.trendUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'} border border-current opacity-70`}>
                  <span>{stat.trend}</span>
                  <TrendingUp size={12} />
                </div>
              </div>
              <div>
                <p className="text-[#b0a4d3] text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black text-white tracking-tighter">{stat.val}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Recovery Analytics */}
          <div className="lg:col-span-7 bg-[#1c113f]/40 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-[#4b426a]/20 shadow-2xl space-y-10 group">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white tracking-tight italic">Recovery Vectors</h3>
                <p className="text-xs text-[#b0a4d3] font-bold uppercase tracking-widest">Efficiency over time</p>
              </div>
              <div className="px-6 py-3 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-full text-[10px] font-black text-[#a7a5ff] uppercase tracking-widest cursor-pointer hover:border-[#a7a5ff] transition-all">
                Last 30 Cycles
              </div>
            </div>
            
            <div className="aspect-[16/8] w-full bg-[#10062d]/40 rounded-[2.5rem] flex items-end justify-between p-8 gap-5 border border-[#4b426a]/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#645ef9]/5 blur-3xl"></div>
              {[60, 40, 80, 50, 95, 70, 85, 45, 90, 65, 75, 80].map((h, i) => (
                <div key={i} className="flex-1 space-y-4 relative z-10 group/bar">
                  <div 
                    className="w-full bg-gradient-to-t from-[#645ef9]/20 to-[#a7a5ff]/40 rounded-t-xl relative transition-all duration-700 hover:to-[#a7a5ff] hover:shadow-[0_0_20px_rgba(167,165,255,0.4)] cursor-crosshair group-hover/bar:bg-opacity-100" 
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#a7a5ff] text-[#10062d] text-[10px] px-3 py-1 rounded-full opacity-0 group-hover/bar:opacity-100 transition-all font-black scale-50 group-hover/bar:scale-100">{h}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Map */}
          <div className="lg:col-span-5 bg-[#10062d]/80 backdrop-blur-md p-10 rounded-[3.5rem] border border-[#a7a5ff]/10 shadow-2xl space-y-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#645ef9]/10 rounded-full blur-[100px]"></div>
            
            <div className="space-y-1 relative z-10">
              <h3 className="text-2xl font-black text-white tracking-tight italic">Discovery Hotspots</h3>
              <p className="text-xs text-[#b0a4d3] font-bold uppercase tracking-widest">Geographical Intensity</p>
            </div>

            <div className="aspect-square w-full bg-[#1c113f]/40 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center p-12 border border-[#4b426a]/40 border-dashed group-hover:border-[#a7a5ff]/30 transition-all">
              <div className="absolute inset-0 grayscale opacity-20 bg-[url('https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center"></div>
              
              <div className="relative z-10 w-full h-full grid grid-cols-3 grid-rows-3 gap-16">
                {[
                  { label: 'Library', pos: 'row-start-1 col-start-1', status: 'critical', size: 'w-6 h-6' },
                  { label: 'Cafe', pos: 'row-start-1 col-start-3', status: 'active', size: 'w-4 h-4' },
                  { label: 'Sports', pos: 'row-start-2 col-start-2', status: 'critical', size: 'w-8 h-8' },
                  { label: 'Labs', pos: 'row-start-3 col-start-2', status: 'stable', size: 'w-3 h-3' }
                ].map((point, i) => (
                  <div key={i} className={`flex flex-col items-center gap-3 ${point.pos} group/point`}>
                    <div className={`${point.size} rounded-full ${
                      point.status === 'critical' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-ping' : 
                      point.status === 'active' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse' : 
                      'bg-[#a7a5ff]'
                    }`}></div>
                    <div className={`${point.size} rounded-full ${
                      point.status === 'critical' ? 'bg-red-500' : 
                      point.status === 'active' ? 'bg-amber-500' : 
                      'bg-[#a7a5ff]'
                    } absolute`}></div>
                    <span className="text-[9px] font-black uppercase text-white/40 tracking-[0.2em] group-hover/point:text-[#a7a5ff] transition-colors">{point.label}</span>
                  </div>
                ))}
              </div>
              {/* Radar Effect overlay */}
              <div className="absolute inset-0 border border-[#a7a5ff]/10 rounded-full scale-[0.8] animate-ping opacity-10"></div>
            </div>

            <div className="flex gap-4 p-6 bg-[#10062d]/60 rounded-3xl border border-[#4b426a]/40 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-white font-black text-sm">Critical Vector Detected</p>
                <p className="text-[10px] text-[#b0a4d3] font-bold uppercase tracking-widest mt-1">Main Library: 24 Signatures/Week</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
