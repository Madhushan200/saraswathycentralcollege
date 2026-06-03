import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { LogIn, Key, Mail, AlertCircle, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, skip login page
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate('/admin');
        }
      } catch (e) {
        console.warn('Session check ignored due to unreachable DB server:', e);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      let errMsg = error.message || 'Invalid login credentials.';
      
      // Check for fetch / network failure
      if (
        errMsg.toLowerCase().includes('fetch') || 
        errMsg.toLowerCase().includes('failed') || 
        errMsg.toLowerCase().includes('network') ||
        errMsg.toLowerCase().includes('unreachable') ||
        errMsg.toLowerCase().includes('enotfound')
      ) {
        errMsg = 'Database Connection Failed: The configured Supabase database host is unreachable. Please verify your internet connection or check your environment credentials.';
      }
      setErrorMsg(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen flex items-center justify-center bg-slate-900 px-6 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-school-gold/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-96 h-96 bg-school-navy-light/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-md w-full bg-slate-950/70 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6 animate-scaleUp">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-school-gold/10 text-school-gold rounded-2xl flex items-center justify-center mx-auto border border-school-gold/25">
            <LogIn className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">
              Saraswathy Central College
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm p-4 rounded-xl flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed text-xs">{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-wider block">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@saraswathycc.edu.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Key className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-school-gold rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-school-gold hover:bg-school-gold-dark text-school-navy font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider mt-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-school-navy border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign In Securely</span>
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;


