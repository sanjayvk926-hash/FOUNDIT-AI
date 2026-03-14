import React from 'react';

const Landing: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-slate-900 text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
              Lost it? <br/>
              <span className="text-primary">We’ll find it.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
              Our AI-powered matching system helps you reconnect with your lost belongings instantly through smart campus scanning.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-primary text-white text-base font-bold shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all">
              Report Lost Item
            </button>
            <button className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-white border-2 border-slate-200 text-slate-800 text-base font-bold hover:bg-slate-50 transition-all">
              I Found Something
            </button>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/10 rounded-xl blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <div className="relative aspect-square w-full bg-gradient-to-br from-primary/5 to-primary/20 rounded-xl overflow-hidden border border-white shadow-2xl flex items-center justify-center">
            <img 
              src="/assets/landing-hero.png" 
              alt="Abstract AI technology visualization" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <section className="mt-24 py-20 bg-slate-50/50 rounded-xl">
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
          <div className="w-full bg-white p-10 rounded-xl shadow-2xl border border-slate-100">
            <div className="text-center mb-10">
              <h3 className="text-slate-900 text-3xl font-extrabold tracking-tight mb-2">Welcome Back</h3>
              <p className="text-slate-500 font-medium">Enter your credentials to access your account</p>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-icon">mail</span>
                  <input className="w-full pl-12 pr-4 h-14 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium" placeholder="name@campus.edu" type="email"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-icon">lock</span>
                  <input className="w-full pl-12 pr-4 h-14 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium" placeholder="••••••••" type="password"/>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded text-primary focus:ring-primary/20 border-slate-300" type="checkbox"/>
                  <span className="text-slate-600 font-medium">Remember me</span>
                </label>
                <a className="text-primary font-bold hover:underline" href="#">Forgot password?</a>
              </div>
              <button className="w-full h-14 bg-primary text-white rounded-full font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 mt-4" type="submit">
                Sign In
              </button>
            </form>
            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 font-medium">
                Don't have an account? 
                <a className="text-primary font-bold hover:underline ml-1" href="#">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Landing;
