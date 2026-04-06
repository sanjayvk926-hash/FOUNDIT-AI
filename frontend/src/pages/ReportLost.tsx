import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Tag, Calendar, ChevronRight, Info, AlertCircle, Loader2, Sparkles, Upload } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { itemService } from '../services/api';

const ReportLost: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'ELECTRONICS',
    description: '',
    locationName: '',
    lostTime: new Date().toISOString().split('T')[0]
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      let imageUrl = '';
      if (image) {
        const uploadRes = await itemService.uploadFile(image);
        imageUrl = uploadRes.url;
      }

      await itemService.createLostItem({
        ...formData,
        imageUrl,
        status: 'LOST'
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to initialize discovery protocol. Please verify your data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex bg-[#10062d] min-h-screen text-[#eae1ff]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto">
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#a7a5ff] font-black uppercase tracking-[0.2em] text-xs">
            <div className="w-8 h-[2px] bg-[#a7a5ff]"></div>
            Intelligence Submission
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Initiate Search Protocol</h1>
          <p className="text-[#b0a4d3] font-medium text-lg max-w-2xl">Feed our neural network with the specific signatures of your lost item.</p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center gap-4 text-red-300 text-sm font-bold animate-shake">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="bg-[#1c113f]/40 backdrop-blur-3xl rounded-[3rem] border border-[#4b426a]/20 shadow-2xl overflow-hidden p-8 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column: Details */}
              <div className="space-y-10">
                <section className="space-y-8">
                  <div className="flex items-center gap-4 text-[#a7a5ff]">
                    <div className="w-10 h-10 rounded-[1rem] bg-[#a7a5ff]/10 flex items-center justify-center">
                      <Sparkles size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white">Item Identity</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Item Designation</label>
                      <input 
                        type="text" 
                        name="itemName"
                        required
                        value={formData.itemName}
                        onChange={handleChange}
                        placeholder="e.g. Midnight Black Sony XM5" 
                        className="w-full px-6 h-16 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[1.5rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Signature Classification</label>
                      <div className="relative">
                        <select 
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-6 h-16 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[1.5rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white font-bold appearance-none cursor-pointer"
                        >
                          <option value="ELECTRONICS">Electronics & Gadgets</option>
                          <option value="BOOKS">Academic Materials</option>
                          <option value="ACCESSORIES">Wallets & Accessories</option>
                          <option value="CLOTHING">Apparel & Bags</option>
                          <option value="OTHER">Miscellaneous</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#a7a5ff]">
                          <ChevronRight size={20} className="rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Visual & Semantic Description</label>
                      <textarea 
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={5} 
                        placeholder="Scratches, stickers, unique patterns, or specific case colors..." 
                        className="w-full p-6 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[1.5rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold resize-none"
                      />
                    </div>
                  </div>
                </section>

                <hr className="border-[#4b426a]/10" />

                <section className="space-y-8">
                  <div className="flex items-center gap-4 text-[#a7a5ff]">
                    <div className="w-10 h-10 rounded-[1rem] bg-[#a7a5ff]/10 flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white">Spatio-Temporal Matrix</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Last Detection Point</label>
                      <input 
                        type="text" 
                        name="locationName"
                        required
                        value={formData.locationName}
                        onChange={handleChange}
                        placeholder="e.g. Science Hub Level 3" 
                        className="w-full px-6 h-16 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[1.5rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Loss Timestamp</label>
                      <input 
                        type="date" 
                        name="lostTime"
                        required
                        value={formData.lostTime}
                        onChange={handleChange}
                        className="w-full px-6 h-16 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[1.5rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white font-bold"
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Photo Upload */}
              <div className="space-y-10">
                <section className="space-y-8 h-full flex flex-col">
                  <div className="flex items-center gap-4 text-[#a7a5ff]">
                    <div className="w-10 h-10 rounded-[1rem] bg-[#a7a5ff]/10 flex items-center justify-center">
                      <Camera size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white">Visual DNA</h3>
                  </div>
                  
                  <div className="flex-1 min-h-[300px] relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                    />
                    <div className="absolute inset-0 border-[3px] border-dashed border-[#4b426a]/40 rounded-[3rem] transition-all group-hover:border-[#a7a5ff]/50 bg-[#10062d]/20 flex flex-col items-center justify-center text-center p-10 overflow-hidden">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-[2rem]" />
                      ) : (
                        <>
                          <div className="w-24 h-24 bg-[#1c113f] rounded-full flex items-center justify-center text-[#a7a5ff] mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                            <Upload size={40} />
                          </div>
                          <p className="text-white font-black text-xl mb-2">Upload Visual Signature</p>
                          <p className="text-[#b0a4d3] font-medium text-sm leading-relaxed max-w-[200px]">Drop your item photo here or click to browse.</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#10062d]/80 p-8 rounded-[2rem] border border-[#a7a5ff]/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#a7a5ff]/5 rounded-full blur-3xl"></div>
                    <div className="flex gap-4 relative z-10">
                      <Info size={24} className="text-[#a7a5ff] flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm text-white font-black">AI Accuracy Hint</p>
                        <p className="text-xs text-[#b0a4d3] font-medium leading-relaxed">
                          A clear photo of the item or its packaging increases discovery probability by <span className="text-[#a7a5ff] font-bold">~85%</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-6 pb-12">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')} 
              className="text-[#b0a4d3] font-black hover:text-white transition-colors uppercase tracking-widest text-sm"
            >
              Abort Protocol
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto h-20 px-16 bg-[#645ef9] text-white rounded-full font-black text-xl shadow-2xl shadow-[#645ef9]/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <span>Broadcast Report</span>
                  <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReportLost;
