import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  Briefcase, 
  ChevronRight, 
  Loader2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await register(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#10062d] min-h-screen text-[#eae1ff] flex items-center justify-center p-6 selection:bg-[#a7a5ff]/30">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#645ef9]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#a7a5ff]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-[#1c113f]/40 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-[#4b426a]/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle Gradient Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#645ef9] to-[#a7a5ff]"></div>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#a7a5ff]/10 rounded-3xl mb-6 shadow-2xl">
            <UserPlus className="text-[#a7a5ff]" size={36} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">Join the network.</h1>
          <p className="text-[#b0a4d3] font-medium text-lg mt-3">Initialize your unique discovery signature.</p>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-300 text-sm font-bold animate-shake">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Display Identification</label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4b426a] group-focus-within:text-[#a7a5ff] transition-colors" size={20} />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full h-18 pl-16 pr-6 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[2rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold"
                  placeholder="Researcher Name"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Neural Link (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4b426a] group-focus-within:text-[#a7a5ff] transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-18 pl-16 pr-6 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[2rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold"
                  placeholder="discovery@campus.edu"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Access Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4b426a] group-focus-within:text-[#a7a5ff] transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-18 pl-16 pr-6 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[2rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white placeholder:text-[#4b426a] font-bold"
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[#b0a4d3] text-xs font-black uppercase tracking-[0.2em] ml-2">Protocol Access Class</label>
              <div className="relative group">
                <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4b426a] group-focus-within:text-[#a7a5ff] transition-colors" size={20} />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-18 pl-16 pr-10 bg-[#10062d]/60 border border-[#4b426a]/40 rounded-[2rem] focus:outline-none focus:border-[#a7a5ff] focus:ring-4 focus:ring-[#a7a5ff]/10 transition-all text-white font-bold appearance-none cursor-pointer"
                >
                  <option value="STUDENT">Discovery Candidate</option>
                  <option value="FINDER">Recovery Agent</option>
                  <option value="ADMIN">System Administrator</option>
                </select>
                <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-[#a7a5ff] rotate-90 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-20 bg-[#645ef9] text-white rounded-full font-black text-xl shadow-2xl shadow-[#645ef9]/30 hover:bg-[#5048e5] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                  <span>Finalize Initialisation</span>
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" size={24} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center flex flex-col items-center gap-8">
          <div className="flex gap-10 opacity-40 grayscale group-hover:grayscale-0 transition-all">
            <ShieldCheck size={24} />
            <Sparkles size={24} />
            <Lock size={24} />
          </div>
          <p className="text-[#b0a4d3] font-medium text-lg">
            Already registered in the network?{' '}
            <Link to="/login" className="text-[#a7a5ff] font-black hover:text-white ml-2 transition-colors">
              Access Vault
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
