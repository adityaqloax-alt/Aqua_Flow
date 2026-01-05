import React from 'react';
import { 
  Factory, Search, Filter, Download, Zap, TrendingUp, CheckCircle2, Clock, User, Plus 
} from 'lucide-react';

// Import Enterprise Components
import LiveLineStatus from '../components/production/company/LiveLineStatus';
import BatchHistory from '../components/production/company/BatchHistory';
import Maintenance from '../components/production/company/Maintenance';
import LabResults from '../components/production/company/LabResults';
import IncidentReports from '../components/production/company/IncidentReports';


const ProductionPage = () => {
  
  const factoryKPIs = [
    { label: 'Global OEE', value: '87%', trend: '+2.4%', color: 'text-emerald-600', icon: <TrendingUp size={16}/> },
    { label: 'Daily Output', value: '14,250', unit: 'units', color: 'text-indigo-600', icon: <Factory size={16}/> },
    { label: 'Power Usage', value: '450', unit: 'kW/h', color: 'text-amber-600', icon: <Zap size={16}/> },
    { label: 'Quality Score', value: '99.2%', trend: 'Stable', color: 'text-cyan-600', icon: <CheckCircle2 size={16}/> },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans overflow-hidden relative">
      
      {/* 1. Sticky Page Header */}
      <div className="px-6 py-5 bg-white border-b border-slate-200 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 sticky top-0 z-40">
        
        {/* Title & Context */}
        <div className="flex justify-between items-start xl:block">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-indigo-600 rounded-lg">
                <Factory className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Production Floor</h1>
            </div>
            <p className="text-xs text-slate-500 font-medium ml-1">Live Operations • Zone A</p>
          </div>
          
          <div className="xl:hidden flex flex-col items-end">
             <span className="text-[10px] font-bold uppercase text-slate-400">Current Shift</span>
             <span className="text-xs font-bold text-slate-800">Shift A</span>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="hidden xl:flex items-center gap-8 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
           <div className="flex items-center gap-3 pr-6 border-r border-slate-200">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Supervisor</p>
                <p className="text-xs font-bold text-slate-700 flex items-center justify-end gap-1"><User size={12}/> Rajesh K.</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Shift</p>
                <p className="text-xs font-bold text-slate-700 flex items-center justify-end gap-1"><Clock size={12}/> Shift A</p>
              </div>
           </div>
           
           <div className="flex gap-6">
              {factoryKPIs.map((kpi, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    {kpi.icon} {kpi.label}
                  </span>
                  <span className={`text-base font-bold ${kpi.color}`}>
                    {kpi.value} <span className="text-[10px] text-slate-400 font-normal">{kpi.unit}</span>
                  </span>
                </div>
              ))}
           </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white w-48 transition-all"
            />
          </div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all">
            <Download size={16} /> Report
          </button>
        </div>
      </div>

      {/* 2. Scrollable Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth pb-24">
        <div className="max-w-[1920px] mx-auto space-y-8">

          {/* SECTION A: Operations (Split Grid) */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-6 w-1.5 bg-indigo-600 rounded-full"></span>
              <h2 className="text-lg font-bold text-slate-700">Live Operations</h2>
            </div>
            
            {/* 
                Grid Logic: 
                - Mobile: Stacked (h-auto)
                - XL Screens: Side-by-side with fixed height (h-[600px]) to ensure alignment 
            */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-auto xl:h-[600px]">
              <div className="xl:col-span-2 h-[500px] xl:h-full">
                <LiveLineStatus />
              </div>
              <div className="xl:col-span-1 h-[500px] xl:h-full">
                <Maintenance />
              </div>
            </div>
          </section>

          {/* SECTION B: Output (Full Width) */}
          <section>
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                <span className="h-6 w-1.5 bg-emerald-500 rounded-full"></span>
                <h2 className="text-lg font-bold text-slate-700">Production Output</h2>
              </div>
              <button className="text-xs font-bold text-emerald-600 hover:underline">View Full Ledger</button>
            </div>
            
            {/* Height is auto to allow table to grow, but min-height ensures presence */}
            <div className="w-full min-h-[400px]">
              <BatchHistory />
            </div>
          </section>

          {/* SECTION C: Quality & Safety (Equal Grid) */}
          <section>
             <div className="flex items-center gap-2 mb-4">
              <span className="h-6 w-1.5 bg-cyan-500 rounded-full"></span>
              <h2 className="text-lg font-bold text-slate-700">Quality & Safety</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[500px]">
              <div className="h-[450px] lg:h-full">
                <LabResults />
              </div>
              <div className="h-[450px] lg:h-full">
                <IncidentReports />
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Mobile FAB */}
      <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/40 flex items-center justify-center z-50 hover:scale-110 transition-transform">
        <Plus size={24} />
      </button>

    </div>
  );
};

export default ProductionPage;
