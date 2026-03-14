import React from 'react';
import { Search, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { lostItems, statistics } from '../data/mockData';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-73px)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Welcome, Sanjay</h1>
            <p className="text-slate-500 font-medium">Here's what's happening with your items today.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 md:flex-none h-12 px-6 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              <Search size={18} />
              <span>New Report</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Active Reports', val: statistics.activeReports, color: 'text-primary' },
            { label: 'Total Matches', val: statistics.itemsReturned, color: 'text-green-600' },
            { label: 'System Reach', val: statistics.totalItems, color: 'text-blue-600' },
            { label: 'Success Rate', val: `${statistics.successRate}%`, color: 'text-purple-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Your Recent Reports</h2>
              <button className="text-primary font-bold text-sm hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {lostItems.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status.includes('Found') ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                          <MapPin size={16} className="text-slate-400" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                          <Calendar size={16} className="text-slate-400" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 bg-slate-50 rounded-lg h-10 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">Details</button>
                      <button className="flex-2 bg-primary/10 rounded-lg h-10 text-xs font-bold text-primary hover:bg-primary/20 transition-colors">Track AI Matches</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden relative">
              <div className="space-y-6 relative z-10">
                {[
                  { title: 'New match found!', desc: 'Sony Headphones matches with a found item in Eng. Lab', time: '10m ago', primary: true },
                  { title: 'Report updated', desc: 'Hydro Flask status changed to "Verifying"', time: '2h ago', primary: false },
                  { title: 'System alert', desc: 'Scanner active in Student Union area', time: '5h ago', primary: false }
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-2 rounded-full flex-shrink-0 ${act.primary ? 'bg-primary' : 'bg-slate-200'}`}></div>
                    <div className="space-y-1">
                      <h4 className={`text-sm font-bold ${act.primary ? 'text-primary' : 'text-slate-900'}`}>{act.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{act.desc}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-primary p-6 rounded-2xl shadow-xl shadow-primary/20 text-white flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-lg font-bold relative z-10">Secure Your Belongings</h3>
              <p className="text-xs text-white/80 font-medium leading-relaxed relative z-10">Generate unique QR stickers for your laptop, bottle, or keys to make returning easier.</p>
              <button className="bg-white text-primary rounded-xl h-10 text-xs font-black shadow-lg shadow-black/5 relative z-10">Get QR Codes</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
