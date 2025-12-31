import React, { useState } from 'react';
import { Trophy, Medal, MoreHorizontal, ArrowRight, TrendingUp, Users, Target, Headphones } from 'lucide-react';

const TopPerformers = () => {
  const [metric, setMetric] = useState('Sales'); // Sales, Support, Efficiency

  // Enterprise Data Model
  const performers = {
    Sales: [
      { id: 1, name: 'Sarah Connor', role: 'Sales Lead', score: 98, subtext: '$142k closed', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', trend: '+12%', badge: 'Star' },
      { id: 2, name: 'Michael Chen', role: 'Acct. Exec', score: 92, subtext: '$98k closed', img: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', trend: '+5%', badge: null },
      { id: 3, name: 'Jessica Dopson', role: 'Sales Rep', score: 88, subtext: '$85k closed', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', trend: '+2%', badge: 'Rising' },
    ],
    Support: [
      { id: 4, name: 'David Kim', role: 'Support Lead', score: 96, subtext: '450 tickets', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', trend: '+8%', badge: 'Hero' },
      { id: 5, name: 'Sarah Connor', role: 'Sales Lead', score: 85, subtext: '120 tickets', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', trend: '-2%', badge: null },
    ],
    Efficiency: [
      { id: 2, name: 'Michael Chen', role: 'Acct. Exec', score: 99, subtext: '0.2% error rate', img: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', trend: '+1%', badge: 'Elite' },
      { id: 4, name: 'David Kim', role: 'Support Lead', score: 94, subtext: '0.5% error rate', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', trend: '+4%', badge: null },
    ]
  };

  const currentList = performers[metric] || performers.Sales;

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />;
    if (index === 1) return <Medal className="w-4 h-4 text-slate-400 fill-slate-300" />;
    if (index === 2) return <Medal className="w-4 h-4 text-orange-400 fill-orange-300" />;
    return <span className="text-xs font-bold text-slate-400">#{index + 1}</span>;
  };

  const getBarColor = (score) => {
    if (score >= 95) return 'bg-amber-500';
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-indigo-500';
    return 'bg-slate-400';
  };

  const getMetricIcon = () => {
     if(metric === 'Sales') return <Target size={14}/>;
     if(metric === 'Support') return <Headphones size={14}/>;
     return <TrendingUp size={14}/>;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
               <Users size={18} className="text-indigo-600"/> Top Performers
            </h3>
            <p className="text-xs text-slate-500 font-medium">Employee rankings</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Metric Toggles */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
           {['Sales', 'Support', 'Efficiency'].map(m => (
             <button
               key={m}
               onClick={() => setMetric(m)}
               className={`flex-1 py-1 text-[10px] font-bold rounded transition-all ${metric === m ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               {m}
             </button>
           ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 p-5 space-y-5 overflow-y-auto">
        {currentList.map((p, i) => (
          <div key={p.id} className="group relative">
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {/* Rank & Avatar */}
                <div className="relative">
                  <div className="w-5 h-5 absolute -top-1.5 -left-1.5 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100 z-10">
                    {getRankIcon(i)}
                  </div>
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    className="w-10 h-10 rounded-xl object-cover border-2 border-slate-50 group-hover:border-indigo-100 transition-colors"
                  />
                </div>
                
                {/* Text Info */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                    {p.name}
                    {p.badge && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">{p.badge}</span>}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{p.role}</p>
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <span className="flex items-center justify-end gap-1 text-sm font-bold text-slate-800">
                   {getMetricIcon()} {p.score}%
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">
                   {p.subtext}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(p.score)}`}
                style={{ width: `${p.score}%` }}
              >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>

            {/* Trend Footer */}
            <div className="flex justify-between items-center">
               <span className={`text-[10px] font-bold ${p.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {p.trend} vs last month
               </span>
               <button className="text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View Profile <ArrowRight size={10}/>
               </button>
            </div>
            
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
        <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-wider transition-colors">
          View All Employees
        </button>
      </div>
    </div>
  );
};

export default TopPerformers;
