import React from 'react';
import { 
  Download, RefreshCw, Calendar 
} from 'lucide-react';

// --- WIDGET IMPORTS (Siblings in the same 'company' folder) ---
import KPIGrid from './KPIGrid';
import ProductionChart from './ProductionChart';
import RevenueChart from './RevenueChart';
import AlertsTable from './AlertsTable';
import QuickActions from './QuickActions';

// --- SUMMARY WIDGETS ---
import InventorySummary from './InventorySummary';
import ProductionSummary from './ProductionSummary';
import OrdersSummary from './OrdersSummary';
import DistributionSummary from './DistributionSummary';

const CompanyDashboard = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

      {/* 1. Page Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-30 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <Calendar size={14} /> Today, Dec 30 • Shift A (Active)
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors">
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold text-sm rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all">
            <Download size={16} /> Export Report
          </button>
        </div>
      </header>

      {/* 2. Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 scroll-smooth pb-20">

        {/* SECTION A: High-Level KPIs */}
        <section aria-label="KPIs">
          <KPIGrid />
        </section>

        {/* SECTION B: Financials & Charts */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
             <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-slate-800 text-lg">Revenue Trends</h3>
               <button className="text-xs font-bold text-indigo-600 hover:underline">View Report</button>
             </div>
             {/* Enforce height for charts */}
             <div className="h-[300px] w-full">
                <RevenueChart />
             </div>
          </div>
          <div className="xl:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
             <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-slate-800 text-lg">Production Yield</h3>
               <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+5% vs target</span>
             </div>
             <div className="h-[300px] w-full">
                <ProductionChart />
             </div>
          </div>
        </section>

        {/* SECTION C: Operational Deep Dives (Split View) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          
          {/* C1. Production Floor Snapshot */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <ProductionSummary />
          </section>

          {/* C2. Inventory Health */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 overflow-hidden">
            <InventorySummary />
          </section>

        </div>

        {/* SECTION D: Commercial & Logistics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

           {/* D1. Sales Pipeline */}
           <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
             <OrdersSummary />
           </section>

           {/* D2. Fleet & Distribution */}
           <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
             <DistributionSummary />
           </section>

        </div>

        {/* SECTION E: Alerts & Quick Actions */}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 text-lg mb-4">System Alerts & Notifications</h3>
             <AlertsTable />
          </div>
          <div className="xl:col-span-1">
             <QuickActions />
          </div>
        </section>

      </main>
    </div>
  );
};

export default CompanyDashboard;
