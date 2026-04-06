import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Search, CheckCircle2, CloudUpload, AlertCircle, X, Sparkles, Loader2, Zap, ShieldCheck } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { itemService } from '../services/api';

const UploadFound: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    locationName: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Visual signature required for neural matching.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const uploadRes = await itemService.uploadFile(selectedFile);
      
      await itemService.createLostItem({
        itemName: 'Found Item (AI Identified)',
        category: 'OTHER',
        description: formData.description,
        locationName: formData.locationName,
        lostTime: new Date().toISOString(),
        imageUrl: uploadRes.url,
        status: 'FOUND'
      });
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to process item signature. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-[#10062d] min-h-screen text-[#eae1ff] selection:bg-[#645ef9]/30">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#a7a5ff] font-black uppercase tracking-[0.2em] text-xs">
            <div className="w-8 h-[2px] bg-[#a7a5ff]"></div>
            Altruistic Contribution
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight italic">Contribute a Discovery.</h1>
          <p className="text-[#b0a4d3] font-medium text-lg max-w-2xl">Help us reunite items with their owners using our advanced neural vision network.</p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center gap-4 text-red-300 text-sm font-bold animate-shake">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-[#1c113f]/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-[#4b426a]/20 shadow-2xl space-y-12">
              <section className="space-y-8">
                <div className="flex items-center gap-4 text-[#a7a5ff]">
                  <div className="w-10 h-10 rounded-2xl bg-[#a7a5ff]/10 flex items-center justify-center">
                    <CloudUpload size={22} />
                  </div>
                  <h3 className="text-xl font-black text-white">Visual Capture</h3>
                </div>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                  <div className="border-[3px] border-dashed border-[#4b426a]/40 rounded-[2.5rem] p-4 flex flex-col items-center justify-center text-center bg-[#10062d]/20 group-hover:bg-[#10062d]/40 group-hover:border-[#645ef9]/50 transition-all overflow-hidden aspect-[16/10] relative">
                    {previewUrl ? (
                      <div className="relative w-full h-full">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-[2rem]" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                          className="absolute top-4 right-4 w-12 h-12 bg-[#10062d]/80 text-[#a7a5ff] rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-2xl backdrop-blur-md"
                        >
                          <X size={20} />
                        </button>
                        {/* Scanning Overlay Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#645ef9]/20 to-transparent pointer-events-none rounded-[2rem] animate-pulse"></div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-10">
                        <div className="w-24 h-24 bg-[#10062d] rounded-full flex items-center justify-center text-[#a7a5ff] mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                          <Camera size={44} />
                        </div>
                        <p className="text-white font-black text-2xl mb-2">Initialize Scanner</p>
                        <p className="text-[#b0a4d3] font-medium max-w-[280px]">Capture the item's visual signature for neural classification.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <hr className="border-[#4b426a]/10" />

              <section className="space-y-8">
                <div className="flex items-center gap-4 text-[#a7a5ff]">
                  <div className="w-10 h-10 rounded-2xl bg-[#a7a5ff]/10 flex items-center justify-center">
                    <MapPin size={22} />
                  </div>
                  <h3 className="text-xl font-black text-white">Discovery Matrix</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Detection Point</label>
                    <input 
                      type="text" 
                      required
                      value={formData.locationName}
                      onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                      placeholder="e.g. Science Library, Level 2 East Wing" 
                      className="w-full px-6 h-18 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[1.5rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Observer Remarks</label>
                    <textarea 
                      rows={4} 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Found near the power outlets. Left it with the front desk..." 
                      className="w-full p-6 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[1.5rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold resize-none"
                    />
                  </div>
                </div>
              </section>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-20 bg-[#645ef9] text-white rounded-full font-black text-xl shadow-2xl shadow-[#645ef9]/30 hover:bg-[#5048e5] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <Zap size={24} className="group-hover:text-yellow-400 transition-colors" />
                    <span>Deploy to Neural Network</span>
                    <Search size={22} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Info / Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#10062d]/90 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-[#4b426a]/20 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#645ef9]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <Sparkles size={24} className="text-[#a7a5ff]" />
                <h3 className="text-xl font-black italic">Neural Intelligence</h3>
              </div>
              
              <div className="space-y-10 relative z-10">
                <div className="p-6 bg-[#1c113f]/40 border border-[#4b426a]/40 rounded-3xl space-y-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#645ef9]/5 animate-pulse"></div>
                  <p className="text-[10px] font-black text-[#a7a5ff] uppercase tracking-[0.2em]">Real-time Scanner</p>
                  <div className="flex items-center justify-center h-48 bg-[#10062d]/60 rounded-2xl border border-[#4b426a]/40 border-dashed overflow-hidden relative group">
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-[#645ef9]/80 shadow-[0_0_15px_rgba(100,94,249,0.8)] animate-scan"></div>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <p className="text-sm font-black text-[#4b426a] italic">Awaiting Input Signal...</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Protocol Advantages</h4>
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle2, text: 'Instant Object Classification', color: 'text-green-400' },
                      { icon: Zap, text: 'Automated Attribute Detection', color: 'text-yellow-400' },
                      { icon: Search, text: 'Recursive Owner Discovery', color: 'text-blue-400' },
                      { icon: ShieldCheck, text: 'Secure Custody Logging', color: 'text-purple-400' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-center p-1">
                        <item.icon size={18} className={item.color} />
                        <span className="text-[13px] font-bold text-[#b0a4d3]">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1c113f]/40 p-8 rounded-[2.5rem] border border-[#a7a5ff]/10 flex items-center gap-5 backdrop-blur-xl group hover:border-[#a7a5ff]/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#a7a5ff]/10 text-[#a7a5ff] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-xl">
                <ShieldCheck size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-white text-sm">Security Custody</h4>
                <p className="text-[11px] text-[#b0a4d3] font-medium leading-relaxed">
                  After digital registration, please hand physical items to <span className="text-[#a7a5ff] font-bold underline cursor-help">Security Hub 4</span>.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UploadFound;
