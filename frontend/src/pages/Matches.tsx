import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, CheckCircle2, XCircle, AlertCircle, ArrowUpRight, Loader2, Info, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { matchService } from '../services/api';

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'CONFIRMED'>('PENDING');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await matchService.getMatches();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleConfirm = async (matchId: number) => {
    try {
      await matchService.confirmMatch(matchId);
      // Refresh matches after confirmation
      const updatedMatches = await matchService.getMatches();
      setMatches(updatedMatches);
    } catch (error) {
      console.error("Failed to confirm match", error);
      alert("Failed to confirm match. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex bg-[#10062d] min-h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#a7a5ff] animate-spin" />
      </div>
    );
  }

  const filteredMatches = matches.filter(m => m.status === activeTab);

  return (
    <div className="flex bg-[#10062d] min-h-screen text-[#eae1ff]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#a7a5ff] font-black uppercase tracking-[0.2em] text-xs">
              <div className="w-8 h-[2px] bg-[#a7a5ff]"></div>
              AI Discovery Hub
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">AI Match Intelligence</h1>
            <p className="text-[#b0a4d3] font-medium text-lg">Neural analysis cross-referencing your items with campus inventory.</p>
          </div>
          <div className="flex bg-[#1c113f] p-1.5 rounded-2xl border border-[#4b426a]/30">
            <button 
              onClick={() => setActiveTab('PENDING')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'PENDING' ? 'bg-[#645ef9] text-white shadow-lg shadow-[#645ef9]/20' : 'text-[#b0a4d3] hover:text-white'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setActiveTab('CONFIRMED')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'CONFIRMED' ? 'bg-[#645ef9] text-white shadow-lg shadow-[#645ef9]/20' : 'text-[#b0a4d3] hover:text-white'}`}
            >
              Confirmed
            </button>
          </div>
        </div>

        <div className="space-y-10">
          {filteredMatches.length === 0 ? (
            <div className="p-20 rounded-[3rem] border-2 border-dashed border-[#4b426a]/30 flex flex-col items-center justify-center text-center space-y-6 bg-[#160b36]/40">
              <div className="w-20 h-20 bg-[#1c113f] rounded-3xl flex items-center justify-center text-[#a7a5ff] shadow-2xl">
                <Search size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-white text-2xl">Neural Scanner Active</h3>
                <p className="text-[#b0a4d3] font-medium max-w-sm mx-auto">No potential matches detected for your items yet. Our AI scans the campus lost & found every 15 minutes.</p>
              </div>
            </div>
          ) : (
            filteredMatches.map((match) => (
              <div key={match.id} className="group bg-[#1c113f] rounded-[2.5rem] border border-[#4b426a]/20 shadow-2xl overflow-hidden flex flex-col lg:flex-row transition-all hover:bg-[#231649] hover:border-[#a7a5ff]/30">
                <div className="w-full lg:w-[400px] aspect-square relative bg-black/40 flex-shrink-0">
                  <img 
                    src={match.foundItem.imageUrl || `/assets/found-placeholder.png`} 
                    alt={match.foundItem.itemName} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute top-8 right-8 bg-[#10062d]/90 backdrop-blur-xl px-6 py-4 rounded-[2rem] shadow-2xl border border-[#a7a5ff]/20 flex flex-col items-center">
                    <span className="text-[10px] font-black text-[#a7a5ff] uppercase tracking-[0.2em] mb-1">Match Confidence</span>
                    <span className="text-3xl font-black text-white">{Math.round(match.matchScore * 100)}%</span>
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <span className="bg-[#645ef9] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {match.foundItem.category}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#a7a5ff] text-sm font-bold">
                          <span>FOR YOUR REPORT:</span>
                          <span className="text-white bg-[#a7a5ff]/20 px-3 py-1 rounded-lg">{match.lostItem.itemName}</span>
                        </div>
                        <h2 className="text-3xl font-black text-white group-hover:text-[#a7a5ff] transition-colors">{match.foundItem.itemName}</h2>
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2 text-[#b0a4d3] text-sm font-bold uppercase tracking-wider">
                            <MapPin size={16} className="text-[#a7a5ff]" />
                            <span>{match.foundItem.foundLocation?.name || 'Campus'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#b0a4d3] text-sm font-bold uppercase tracking-wider">
                            <Calendar size={16} className="text-[#a7a5ff]" />
                            <span>{new Date(match.foundItem.foundTime).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-black tracking-widest uppercase border ${
                        match.status === 'PENDING'
                          ? 'bg-[#a7a5ff]/10 text-[#a7a5ff] border-[#a7a5ff]/20'
                          : 'bg-green-500/10 text-green-400 border-green-500/20'
                      }`}>
                        <AlertCircle size={18} />
                        <span>{match.status} Verification</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-[#b0a4d3] uppercase tracking-[0.2em] flex items-center gap-2">
                          <TrendingUp size={14} className="text-[#a7a5ff]"/> Neural Similarity Matrix
                        </h4>
                        <div className="space-y-5">
                          {[
                            { label: 'Image Feature Sim', score: match.imageSimilarityScore },
                            { label: 'Chromatic Accuracy', score: match.colorScore },
                            { label: 'Semantic Category', score: match.objectTypeScore },
                            { label: 'Description Overlap', score: match.descriptionScore }
                          ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between items-end">
                                <span className="text-xs font-bold text-white/80">{stat.label}</span>
                                <span className="text-xs font-black text-[#a7a5ff]">{Math.round((stat.score || 0) * 100)}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-[#10062d] rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#645ef9] to-[#a7a5ff] rounded-full transition-all duration-1000 delay-300" 
                                  style={{ width: `${(stat.score || 0) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-[#b0a4d3] uppercase tracking-[0.2em] flex items-center gap-2">
                          <Info size={14} className="text-[#a7a5ff]"/> System Insight
                        </h4>
                        <div className="bg-[#10062d] p-6 rounded-3xl border border-[#4b426a]/30 space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-[#645ef9]/5 rounded-full blur-2xl"></div>
                          <div className="flex gap-4 relative z-10">
                            <CheckCircle2 size={20} className="text-[#a7a5ff] flex-shrink-0 mt-1" />
                            <p className="text-xs text-[#b0a4d3] font-medium leading-relaxed">
                              YOLOv8 successfully identified <span className="text-white font-bold">"{match.foundItem.category}"</span> with 92% confidence.
                            </p>
                          </div>
                          <div className="flex gap-4 relative z-10">
                            <CheckCircle2 size={20} className="text-[#a7a5ff] flex-shrink-0 mt-1" />
                            <p className="text-xs text-[#b0a4d3] font-medium leading-relaxed">
                              Visual signature detected in <span className="text-white font-bold">{match.foundItem.foundLocation?.name}</span> matches report geography.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {match.status === 'PENDING' && (
                    <div className="flex flex-wrap gap-5 border-t border-[#4b426a]/20 pt-10">
                      <button 
                        onClick={() => handleConfirm(match.id)}
                        className="flex-1 min-w-[200px] h-16 bg-[#645ef9] text-white rounded-[1.5rem] font-black shadow-2xl shadow-[#645ef9]/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                      >
                        <span>This is Mine</span>
                        <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                      <button className="flex-1 min-w-[200px] h-16 bg-transparent text-[#b0a4d3] border border-[#4b426a]/40 rounded-[1.5rem] font-black hover:bg-[#1c113f] hover:text-white transition-all flex items-center justify-center gap-3">
                        <XCircle size={22} />
                        <span>Not My Item</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          <div className="p-16 rounded-[3rem] border border-[#4b426a]/20 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 bg-gradient-to-b from-[#1c113f] to-transparent">
            <div className="w-20 h-20 bg-[#10062d] rounded-full flex items-center justify-center text-[#4b426a] animate-pulse">
              <Search size={36} />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-white text-2xl">Neural Feedback Loop</h3>
              <p className="text-[#b0a4d3] font-medium max-w-sm mx-auto text-lg leading-relaxed">Our AI is continuously analyzing cross-campus signals. We'll alert you the microsecond a new match is detected.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Matches;
