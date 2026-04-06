import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { 
  PlusCircle, 
  MapPin, 
  Calendar,
  TrendingUp,
  Package,
  Bell,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { itemService, notificationService } from '../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeReports: 0,
    itemsReturned: 0,
    totalItems: 0,
    successRate: 0
  });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [myItems, allNotifications] = await Promise.all([
          itemService.getMyLostItems(),
          notificationService.getNotifications()
        ]);
        
        setItems(myItems);
        setNotifications(allNotifications.slice(0, 3));
        
        // Calculate basic stats for display
        const active = myItems.filter((i: any) => i.status !== 'RETURNED').length;
        const matched = myItems.filter((i: any) => i.status === 'MATCHED').length;
        
        setStats({
          activeReports: active,
          itemsReturned: matched,
          totalItems: myItems.length,
          successRate: myItems.length > 0 ? Math.round((matched / myItems.length) * 100) : 0
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex bg-[#10062d] min-h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#a7a5ff] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex bg-[#10062d] min-h-screen text-[#eae1ff]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Welcome back, {user ? user.username : 'Student'}! 👋
            </h1>
            <p className="text-[#b0a4d3] font-medium">Your personal intelligence hub for campus discovery.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/reports')}
              className="group flex min-w-[160px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-[#645ef9] text-white text-base font-bold shadow-xl shadow-[#645ef9]/25 hover:-translate-y-1 transition-all"
            >
              <PlusCircle className="mr-2 group-hover:rotate-90 transition-transform" size={20} />
              <span>New Report</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Reports', val: stats.activeReports, color: 'text-[#a7a5ff]', icon: <Package size={18}/> },
            { label: 'Total Matches', val: stats.itemsReturned, color: 'text-green-400', icon: <TrendingUp size={18}/> },
            { label: 'Intelligence Reach', val: stats.totalItems, color: 'text-blue-400', icon: <Bell size={18}/> },
            { label: 'Success Rate', val: `${stats.successRate}%`, color: 'text-purple-400', icon: <TrendingUp size={18}/> }
          ].map((stat, i: number) => (
            <div key={i} className="bg-[#1c113f] p-6 rounded-3xl border border-[#4b426a]/20 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {stat.icon}
              </div>
              <p className="text-[#b0a4d3] text-xs font-bold uppercase tracking-[0.1em] mb-2">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Recent Reports</h2>
              <button onClick={() => navigate('/dashboard')} className="text-[#a7a5ff] font-bold text-sm hover:underline flex items-center gap-1">
                View All <ArrowRight size={14}/>
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {items.length === 0 ? (
                <div className="bg-[#1c113f]/40 border-2 border-dashed border-[#4b426a]/30 p-12 rounded-3xl text-center">
                  <p className="text-[#b0a4d3] font-medium">No active reports found. Start by creating one!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="group bg-[#1c113f] p-5 rounded-3xl border border-[#4b426a]/20 shadow-xl flex flex-col md:flex-row gap-8 hover:bg-[#231649] transition-all cursor-pointer">
                    <div className="w-full md:w-36 h-36 rounded-2xl overflow-hidden bg-black/20 flex-shrink-0 relative">
                      <img 
                        src={item.imageUrl || `/assets/item-placeholder.png`} 
                        alt={item.itemName} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-[10px] text-white font-bold">VIEW DETAILS</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-black text-xl text-white group-hover:text-[#a7a5ff] transition-colors">{item.itemName}</h3>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
                            item.status === 'MATCHED' ? 'bg-green-500/10 text-green-400' : 'bg-[#645ef9]/10 text-[#a7a5ff]'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-3">
                          <div className="flex items-center gap-2 text-[#b0a4d3] text-sm font-medium">
                            <MapPin size={16} className="text-[#a7a5ff]" />
                            <span>{item.lastSeenLocationId ? `Location ID: ${item.lastSeenLocationId}` : 'Campus'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#b0a4d3] text-sm font-medium">
                            <Calendar size={16} className="text-[#a7a5ff]" />
                            <span>{new Date(item.lastSeenTime).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex gap-4">
                        <button className="flex-1 bg-[#10062d] rounded-2xl h-12 text-sm font-bold text-[#eae1ff] hover:bg-black transition-all border border-[#4b426a]/30">Details</button>
                        <button onClick={() => navigate('/matches')} className="flex-[2] bg-[#645ef9] rounded-2xl h-12 text-sm font-bold text-white hover:bg-[#4e45e3] transition-all shadow-lg shadow-[#645ef9]/20 truncate px-4">
                          Track AI Matches
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <Bell size={24} className="text-[#a7a5ff]"/> AI Activity
              </h2>
              <div className="bg-[#1c113f] rounded-3xl border border-[#4b426a]/20 shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#645ef9]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="space-y-8 relative z-10">
                  {notifications.length === 0 ? (
                    <p className="text-[#b0a4d3] text-sm text-center py-4 italic">No new activity signals.</p>
                  ) : (
                    notifications.map((act, i: number) => (
                      <div key={i} className="flex gap-5 group">
                        <div className={`w-1.5 h-12 rounded-full flex-shrink-0 transition-all ${act.read ? 'bg-[#4b426a]' : 'bg-[#a7a5ff] shadow-[0_0_10px_rgba(167,165,255,0.5)]'}`}></div>
                        <div className="space-y-1">
                          <h4 className={`text-sm font-bold ${act.read ? 'text-[#b0a4d3]' : 'text-white'}`}>{act.title}</h4>
                          <p className="text-xs text-[#b0a4d3] font-medium leading-relaxed line-clamp-2">{act.message}</p>
                          <p className="text-[10px] text-[#a7a5ff] font-black uppercase tracking-wider mt-2">
                            {new Date(act.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#645ef9] to-[#10062d] p-8 rounded-3xl shadow-2xl shadow-[#645ef9]/20 text-white flex flex-col gap-6 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="space-y-2">
                <h3 className="text-xl font-black relative z-10">Secure Your Essence</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed relative z-10">
                  Generate unique, AI-linked QR tags for your high-value belongings. 
                  <span className="block mt-2 font-bold text-white">Recovery rate increases by +40%.</span>
                </p>
              </div>
              <button 
                onClick={() => navigate('/faq')}
                className="bg-white text-[#10062d] rounded-2xl h-14 text-sm font-black shadow-xl hover:-translate-y-1 transition-all relative z-10"
              >
                Generate QR Tag
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
