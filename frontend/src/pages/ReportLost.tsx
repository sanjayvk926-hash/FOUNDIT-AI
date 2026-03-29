import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Tag, Calendar, ChevronRight, Info, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { lostItemService } from '../services/api';

const ReportLost: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await lostItemService.reportLostItem(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-73px)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Report Lost Item</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">Provide details about your missing item. Our AI will automatically begin scanning new finds.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 md:p-12 space-y-10">
            {/* Form Section 1 */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Tag size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">General Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-700 text-sm font-bold ml-1">Item Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sony WH-1000XM5 Headphones" 
                    className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/20 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-700 text-sm font-bold ml-1">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/20 transition-all text-slate-900 font-medium appearance-none"
                  >
                    <option>Electronics</option>
                    <option>Books & Stationary</option>
                    <option>Wallets & Keys</option>
                    <option>Clothing & Bags</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-slate-700 text-sm font-bold ml-1">Detailed Description</label>
                  <textarea 
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={4} 
                    placeholder="Describe distinguishing features (scratches, stickers, case color...)" 
                    className="w-full p-5 bg-slate-50 border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/20 transition-all text-slate-900 placeholder:text-slate-400 font-medium resize-none"
                  />
                </div>
              </div>
            </section>

            <hr className="border-slate-50" />

            {/* Form Section 2 */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Lost Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-700 text-sm font-bold ml-1">Last Seen Location</label>
                  <input 
                    type="text" 
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Central Library - 2nd Floor" 
                    className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/20 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-700 text-sm font-bold ml-1">Estimated Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/20 transition-all text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-50" />

            {/* Section 3: Photo Upload */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Camera size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Item Reference Photo (Optional)</h3>
              </div>
              
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center group hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:bg-white group-hover:text-primary transition-all">
                  <Camera size={28} />
                </div>
                <p className="text-slate-900 font-bold mb-1">Upload a photo of your item</p>
                <p className="text-slate-400 text-sm font-medium">JPG, PNG up to 10MB. This helps AI match faster.</p>
                <input type="file" className="hidden" />
              </div>

              <div className="flex gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                <Info size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                  Even if you don't have a photo of the original item, you can upload a similar image from the web to help our AI understand the object type and color.
                </p>
              </div>
            </section>
          </div>

          <div className="p-8 md:p-12 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <button type="button" onClick={() => navigate('/dashboard')} className="text-slate-500 font-bold hover:text-slate-900 transition-colors">Cancel</button>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto h-14 px-10 bg-primary text-white rounded-full font-black shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <span>{isLoading ? 'Submitting...' : 'Submit Report'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReportLost;
