import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Lock, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  Loader2,
  AlertCircle
} from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    try {
      await login({ username: email, password }); // Username is email in this simplified case
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="bg-[#10062d] min-h-screen text-[#eae1ff] selection:bg-[#a7a5ff]/30 selection:text-white">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#645ef9]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#a7a5ff]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#a7a5ff] font-black uppercase tracking-[0.3em] text-xs">
                <Sparkles size={16} />
                Next-Gen Discovery
              </div>
              <h1 className="text-white text-6xl md:text-8xl font-black leading-[0.95] tracking-tight">
                FoundIt <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#645ef9] to-[#a7a5ff]">AI.</span>
              </h1>
              <p className="text-[#b0a4d3] text-xl md:text-2xl font-medium leading-relaxed max-w-lg">
                The future of item recovery is here. Reconnect with your belongings through high-fidelity neural matching.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-[#1c113f] px-6 py-3 rounded-full border border-[#4b426a]/30">
                  <ShieldCheck size={20} className="text-[#a7a5ff]" />
                  <span className="text-sm font-bold">Secure AI Processing</span>
                </div>
                <div className="flex items-center gap-3 bg-[#1c113f] px-6 py-3 rounded-full border border-[#4b426a]/30">
                  <Zap size={20} className="text-[#a7a5ff]" />
                  <span className="text-sm font-bold">99% Recognition Rate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Background Glow for Form */}
            <div className="absolute -inset-10 bg-[#645ef9]/20 rounded-full blur-[100px] opacity-20"></div>
            
            <div className="relative bg-[#1c113f]/40 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-[#4b426a]/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <div className="mb-12">
                <h3 className="text-white text-4xl font-black tracking-tight mb-3 italic">Initialize access.</h3>
                <p className="text-[#b0a4d3] font-medium text-lg">Enter the discovery protocols to proceed.</p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-sm font-medium flex items-center gap-3 animate-shake">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Intelligence ID (Email)</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4b426a] group-focus-within:text-[#a7a5ff] transition-colors" size={20} />
                    <input 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-16 pr-6 h-18 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[2rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold text-lg" 
                      placeholder="discovery@campus.edu" 
                      type="email"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Secret Key (Password)</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4b426a] group-focus-within:text-[#a7a5ff] transition-colors" size={20} />
                    <input 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-16 pr-6 h-18 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[2rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold text-lg" 
                      placeholder="••••••••" 
                      type="password"
                    />
                  </div>
                </div>

                <button 
                  disabled={isLoggingIn}
                  className="w-full h-20 bg-[#645ef9] text-white rounded-full font-black text-xl shadow-2xl shadow-[#645ef9]/30 hover:bg-[#5048e5] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 group mt-10 disabled:opacity-50 disabled:translate-y-0" 
                  type="submit"
                >
                  {isLoggingIn ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      <span>Begin Recovery</span>
                      <ChevronRight className="group-hover:translate-x-2 transition-transform" size={24} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-12 pt-10 border-t border-[#4b426a]/10 text-center">
                <p className="text-[#b0a4d3] font-medium text-base">
                  New to the discovery network? 
                  <button onClick={() => navigate('/register')} className="text-[#a7a5ff] font-black hover:text-white ml-2 transition-colors">Join FoundIt AI</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
