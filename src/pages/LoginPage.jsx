import React, { useState } from 'react';
import { Droplets, Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- SIMPLE ROLE LOGIC ---
    if (email === 'admin@aquaflow.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Tom Cook');
      navigate('/app');
    } 
    else if (email === 'buyer@store.com' && password === 'buyer123') {
      localStorage.setItem('userRole', 'wholesaler');
      localStorage.setItem('userName', 'Rahul Distributors');
      navigate('/app');
    } 
    else {
      setError('Invalid credentials. Try admin@aquaflow.com / admin123');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0f172a]">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4">
        <Link to="/" className="absolute -top-12 left-0 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mx-auto mb-5">
               <Droplets size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 mt-2 text-sm">Sign in to access your portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aquaflow.com"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all sm:text-sm"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button type="submit" className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            <p>Admin: admin@aquaflow.com / admin123</p>
            <p>Wholesaler: buyer@store.com / buyer123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
