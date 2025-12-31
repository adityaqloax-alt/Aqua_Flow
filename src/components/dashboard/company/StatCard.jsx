import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Download, Eye, Bell } from 'lucide-react';

const StatCard = ({ title, value, change, isUp, icon: Icon, color = 'cyan', isLoading = false }) => {
  const [showMenu, setShowMenu] = useState(false);

  // comprehensive theme map for full control over UI elements
  const themeMap = {
    cyan: {
      gradient: 'from-cyan-400 to-blue-500',
      shadow: 'hover:shadow-cyan-100',
      text: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'group-hover:border-cyan-200',
      stroke: '#06b6d4', // cyan-500
      sparkline: "M4 16 L 8 18 L 12 10 L 16 14 L 20 4 L 24 8 L 28 2"
    },
    emerald: {
      gradient: 'from-emerald-400 to-teal-500',
      shadow: 'hover:shadow-emerald-100',
      text: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'group-hover:border-emerald-200',
      stroke: '#10b981', // emerald-500
      sparkline: "M4 14 L 8 16 L 12 10 L 16 12 L 20 6 L 24 8 L 28 4"
    },
    violet: {
      gradient: 'from-violet-400 to-purple-500',
      shadow: 'hover:shadow-violet-100',
      text: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'group-hover:border-violet-200',
      stroke: '#8b5cf6', // violet-500
      sparkline: "M4 18 L 8 12 L 12 16 L 16 10 L 20 14 L 24 8 L 28 2"
    },
    amber: {
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'hover:shadow-amber-100',
      text: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'group-hover:border-amber-200',
      stroke: '#f59e0b', // amber-500
      sparkline: "M4 12 L 8 12 L 12 8 L 16 10 L 20 6 L 24 6 L 28 4"
    }
  };

  const theme = themeMap[color] || themeMap.cyan;

  // Skeleton Loader State
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse">
        <div className="flex justify-between mb-6">
           <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
           <div className="w-6 h-6 bg-slate-100 rounded-full"></div>
        </div>
        <div className="h-4 w-24 bg-slate-100 rounded mb-2"></div>
        <div className="h-8 w-32 bg-slate-100 rounded mb-6"></div>
        <div className="flex justify-between pt-4 border-t border-slate-50">
           <div className="h-4 w-16 bg-slate-100 rounded"></div>
           <div className="h-8 w-24 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      group relative bg-white p-6 rounded-3xl 
      border border-slate-100 ${theme.border}
      shadow-sm ${theme.shadow} hover:shadow-xl
      transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
      hover:-translate-y-1 overflow-visible
    `}>
      
      {/* Background Grid Pattern (Subtle Texture) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-3xl overflow-hidden" 
        style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative z-10">
        {/* Header: Icon & Menu */}
        <div className="flex justify-between items-start mb-6">
          <div className={`
            p-3.5 rounded-2xl bg-gradient-to-br ${theme.gradient} 
            shadow-lg shadow-black/5 text-white
            group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
          `}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
          
          <div className="relative">
             <button 
               onClick={() => setShowMenu(!showMenu)}
               onBlur={() => setTimeout(() => setShowMenu(false), 200)}
               className="text-slate-300 hover:text-slate-500 transition-colors p-1 rounded-lg hover:bg-slate-50"
             >
               <MoreHorizontal size={20} />
             </button>
             
             {/* Context Menu */}
             {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
                   <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                      <Eye size={12}/> View Report
                   </button>
                   <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                      <Bell size={12}/> Set Alert
                   </button>
                   <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                      <Download size={12}/> Export
                   </button>
                </div>
             )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1 tracking-wide">{title}</p>
            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">
              {value}
            </h3>
          </div>
        </div>

        {/* Footer: Sparkline & Badge */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          
          {/* Badge */}
          <div 
             title="Compared to previous 30 days"
             className={`
               flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold cursor-help
               ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}
             `}
          >
            {isUp ? <ArrowUpRight size={14} strokeWidth={2.5} /> : <ArrowDownRight size={14} strokeWidth={2.5} />}
            {change}
            <span className="text-slate-400 font-medium ml-1 hidden sm:inline">vs last</span>
          </div>

          {/* Sparkline Chart */}
          <div className="w-24 h-8 relative opacity-60 group-hover:opacity-100 transition-opacity duration-300">
             <svg viewBox="0 0 32 20" className="w-full h-full overflow-visible">
               {/* Drop Shadow Filter */}
               <defs>
                 <filter id={`shadow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
                   <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={theme.stroke} floodOpacity="0.3"/>
                 </filter>
               </defs>
               
               <path 
                 d={theme.sparkline} 
                 fill="none" 
                 stroke={theme.stroke} 
                 strokeWidth="2.5" 
                 strokeLinecap="round" 
                 strokeLinejoin="round"
                 filter={`url(#shadow-${color})`}
                 className="path-animate" // Add CSS animation keyframes if needed
               />
               {/* Pulsing Dot at the end */}
               <circle 
                 cx="28" cy={isUp ? "2" : "18"} r="3" 
                 fill={theme.stroke} 
                 className="animate-pulse" 
               />
             </svg>
          </div>
        </div>
      </div>

      {/* Decorative Blob (Top Right) */}
      <div className={`
        absolute -top-12 -right-12 w-40 h-40 rounded-full 
        bg-gradient-to-br ${theme.gradient} opacity-0 
        group-hover:opacity-5 transition-opacity duration-500 blur-3xl pointer-events-none rounded-3xl
      `}></div>
    </div>
  );
};

export default StatCard;
