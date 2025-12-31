import React, { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Target,
  ChevronDown,
  DollarSign,
  Activity,
  Calendar
} from 'lucide-react';

const KPIGrid = () => {
  const [timeRange, setTimeRange] = useState('30d'); // '7d' or '30d'

  // Enterprise Data Model with Timeframe Logic
  const kpiData = {
    revenue: {
      title: 'Total Revenue',
      icon: DollarSign,
      color: 'indigo',
      '7d': { value: '$32,450', change: '+4.2%', isUp: true, target: 35000, current: 32450, trend: [40, 35, 55, 60, 50, 75, 80] },
      '30d': { value: '$128,450', change: '+12.5%', isUp: true, target: 150000, current: 128450, trend: [20, 45, 30, 60, 55, 85, 90] },
      breakdown: [ { label: 'Direct', val: '60%' }, { label: 'B2B', val: '40%' } ]
    },
    inventory: {
      title: 'Active Inventory',
      icon: Package,
      color: 'emerald',
      '7d': { value: '44,100', change: '-0.5%', isUp: false, target: 50000, current: 44100, trend: [60, 58, 57, 56, 55, 54, 53] },
      '30d': { value: '45,231', change: '-2.4%', isUp: false, target: 50000, current: 45231, trend: [80, 75, 70, 65, 60, 55, 50] },
      breakdown: [ { label: 'Raw', val: '30%' }, { label: 'Finished', val: '70%' } ]
    },
    customers: {
      title: 'New Accounts',
      icon: Users,
      color: 'violet',
      '7d': { value: '305', change: '+15.2%', isUp: true, target: 300, current: 305, trend: [10, 15, 20, 25, 30, 45, 50] },
      '30d': { value: '1,204', change: '+8.2%', isUp: true, target: 1100, current: 1204, trend: [30, 40, 45, 50, 60, 70, 80] },
      breakdown: [ { label: 'Retail', val: '80%' }, { label: 'Distributor', val: '20%' } ]
    },
    orders: {
      title: 'Pending Orders',
      icon: Clock,
      color: 'amber',
      '7d': { value: '12', change: '-5.0%', isUp: true, target: 20, current: 12, trend: [5, 6, 8, 7, 5, 4, 3] }, // Lower is better logic could apply, but sticking to std
      '30d': { value: '85', change: '+1.2%', isUp: false, target: 50, current: 85, trend: [10, 12, 15, 20, 25, 30, 35] },
      breakdown: [ { label: 'Standard', val: '90%' }, { label: 'Expedited', val: '10%' } ]
    }
  };

  // Helper for Colors
  const getTheme = (color) => {
    const themes = {
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', stroke: '#4f46e5', bar: 'bg-indigo-500' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', stroke: '#059669', bar: 'bg-emerald-500' },
      violet: { bg: 'bg-violet-50', text: 'text-violet-600', stroke: '#7c3aed', bar: 'bg-violet-500' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-600', stroke: '#d97706', bar: 'bg-amber-500' },
    };
    return themes[color];
  };

  // Simple SVG Sparkline Generator
  const Sparkline = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / (max - min)) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible preserve-3d">
        <polyline 
          points={points} 
          fill="none" 
          stroke={color} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />
        <circle cx="100" cy={100 - ((data[data.length-1] - min) / (max - min)) * 100} r="6" fill={color} className="animate-pulse" />
      </svg>
    );
  };

  return (
    <div className="space-y-4 p-6">
      
      {/* 1. Control Bar */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
           <Activity size={16}/> Performance Overview
        </h3>
        <div className="flex bg-slate-100 p-1 rounded-lg">
           {['7d', '30d'].map((range) => (
             <button
               key={range}
               onClick={() => setTimeRange(range)}
               className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${timeRange === range ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {range === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
             </button>
           ))}
        </div>
      </div>

      {/* 2. Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.entries(kpiData).map(([key, data]) => {
          const currentData = data[timeRange];
          const theme = getTheme(data.color);
          const percentToTarget = Math.min(100, (currentData.current / currentData.target) * 100);

          return (
            <div 
              key={key} 
              className={`
                group relative bg-white rounded-2xl border border-slate-100 p-5
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-${data.color}-100
              `}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                 <div className={`p-2.5 rounded-xl ${theme.bg} ${theme.text}`}>
                    <data.icon size={20} strokeWidth={2.5} />
                 </div>
                 <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                    <Target size={10} />
                    <span>Goal: {percentToTarget.toFixed(0)}%</span>
                 </div>
              </div>

              {/* Main Metric */}
              <div className="mb-4">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{data.title}</p>
                 <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-slate-800">{currentData.value}</h3>
                    <span className={`flex items-center text-xs font-bold ${currentData.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                       {currentData.isUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                       {currentData.change}
                    </span>
                 </div>
              </div>

              {/* Progress Bar (Goal) */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
                 <div 
                   className={`h-full rounded-full transition-all duration-1000 ease-out ${theme.bar}`}
                   style={{ width: `${percentToTarget}%` }}
                 ></div>
              </div>

              {/* Footer / Sparkline Area */}
              <div className="flex items-end justify-between h-10 border-t border-slate-50 pt-3">
                 {/* Breakdown on Hover (Hidden by default, shown on hover) */}
                 <div className="hidden group-hover:flex gap-3 text-[10px] font-medium text-slate-500 animate-in fade-in slide-in-from-bottom-2">
                    {data.breakdown.map((b, i) => (
                      <span key={i} className="flex items-center gap-1">
                         <span className={`w-1.5 h-1.5 rounded-full ${theme.bg.replace('bg-', 'bg-')}-400`}></span>
                         {b.label}: <span className="text-slate-700 font-bold">{b.val}</span>
                      </span>
                    ))}
                 </div>
                 
                 {/* Default View: Trend Label */}
                 <div className="group-hover:hidden text-[10px] font-medium text-slate-400">
                    vs previous {timeRange === '7d' ? '7 days' : 'month'}
                 </div>

                 {/* Sparkline */}
                 <div className="w-20 h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                    <Sparkline data={currentData.trend} color={theme.stroke} />
                 </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KPIGrid;
