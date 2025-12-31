import React from 'react';
import { 
  Factory, Zap, CheckCircle2, TrendingUp, AlertTriangle, 
  Settings, ArrowRight 
} from 'lucide-react';

// --- MOCK DATA ---
const productionKPIs = [
  { label: 'OEE Score', value: '87%', trend: '+2.4%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Units Today', value: '14,250', trend: 'Target: 15k', icon: Factory, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Quality Pass', value: '99.2%', trend: 'Stable', icon: CheckCircle2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Power Draw', value: '450 kW', trend: 'Peak', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const lines = [
  { id: 'L1', name: 'Line 1 (Bottling)', status: 'Running', speed: '100%', output: '4,200/hr' },
  { id: 'L2', name: 'Line 2 (Capping)', status: 'Running', speed: '98%', output: '4,150/hr' },
  { id: 'L3', name: 'Line 3 (Labeling)', status: 'Maintenance', speed: '0%', output: '0/hr' },
];

const ProductionSummary = () => {
  return (
    <div className="space-y-6">
      
      {/* 1. Header & Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Factory className="text-indigo-600" size={24} />
            Production Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1">Live metrics from Zone A • Shift A</p>
        </div>
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          Full Report <ArrowRight size={16} />
        </button>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {productionKPIs.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <Icon className={kpi.color} size={18} />
                </div>
                {kpi.trend.includes('+') && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {kpi.trend}
                  </span>
                )}
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-800">{kpi.value}</span>
                <p className="text-xs text-slate-500 font-medium mt-1">{kpi.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Live Line Status (Simplified List) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Line Status */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Settings size={18} className="text-slate-400"/> Line Status
          </h3>
          <div className="space-y-3">
            {lines.map((line) => (
              <div key={line.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${line.status === 'Running' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">{line.name}</p>
                    <p className="text-xs text-slate-400">Current Output: {line.output}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    line.status === 'Running' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {line.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Active Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-slate-400"/> Active Alerts
          </h3>
          
          <div className="flex-1 space-y-3">
             <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
               <div className="flex gap-2">
                 <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5"/>
                 <div>
                   <p className="text-xs font-bold text-rose-700">Line 3 Halted</p>
                   <p className="text-[10px] text-rose-600 mt-1">Maintenance required on labeling unit. ETA: 20 mins.</p>
                 </div>
               </div>
             </div>

             <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
               <div className="flex gap-2">
                 <Zap size={16} className="text-amber-600 shrink-0 mt-0.5"/>
                 <div>
                   <p className="text-xs font-bold text-amber-700">Power Surge</p>
                   <p className="text-[10px] text-amber-600 mt-1">Voltage fluctuation detected in Zone B.</p>
                 </div>
               </div>
             </div>
          </div>
          
          <button className="mt-4 w-full py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 rounded border border-dashed border-slate-300">
            View Incident Log
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductionSummary;
