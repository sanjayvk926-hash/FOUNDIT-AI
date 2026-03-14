import React from 'react';
import { ShieldCheck, Search, Filter, MoreVertical, CheckCircle2, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const SecurityDesk: React.FC = () => {
  const inventory = [
    { id: 'f101', item: 'iPhone 13', location: 'Cafe Area', finder: 'Student #290', date: 'Mar 12', status: 'In Custody' },
    { id: 'f102', item: 'Leather Wallet', location: 'Sports Hall', finder: 'Staff #12', date: 'Mar 12', status: 'In Custody' },
    { id: 'f103', item: 'Car Keys', location: 'Parking P2', finder: 'Student #104', date: 'Mar 11', status: 'Claimed' },
    { id: 'f104', item: 'Blue Backpack', location: 'Lecture Hall B', finder: 'Professor #4', date: 'Mar 11', status: 'In Custody' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-73px)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20">
              <ShieldCheck size={28} />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Security Inventory</h1>
              <p className="text-slate-500 font-medium">Managing physical handovers and verification.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="h-12 px-6 bg-white border border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
              <Filter size={18} />
              <span>Filters</span>
            </button>
            <button className="h-12 px-6 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              Add Item
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID, Item, or Finder..." 
                className="w-full pl-12 pr-4 h-12 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              />
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-primary/10 text-primary text-xs font-black rounded-lg uppercase tracking-wider">All Items</span>
              <span className="px-4 py-2 text-slate-400 text-xs font-black rounded-lg uppercase tracking-wider hover:bg-slate-100 cursor-pointer transition-colors">In Custody</span>
              <span className="px-4 py-2 text-slate-400 text-xs font-black rounded-lg uppercase tracking-wider hover:bg-slate-100 cursor-pointer transition-colors">Claimed</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Found Item</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Location / Finder</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 font-bold text-primary text-sm">{item.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                          <ShieldCheck size={18} />
                        </div>
                        <span className="font-bold text-slate-900">{item.item}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900 text-sm">{item.location}</p>
                        <p className="text-xs text-slate-400 font-medium">{item.finder}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-semibold text-slate-600">{item.date}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        item.status === 'In Custody' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100">
                          <MoreVertical size={16} />
                        </button>
                        <button className="px-4 h-9 bg-primary/10 text-primary rounded-lg text-xs font-black hover:bg-primary hover:text-white transition-all">
                          Verify Return
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 border-t border-slate-100 flex items-center justify-between text-sm">
            <p className="text-slate-400 font-medium">Showing 4 of 127 items</p>
            <div className="flex gap-2">
              <button className="px-4 h-10 border border-slate-200 rounded-lg font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 h-10 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-all">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecurityDesk;
