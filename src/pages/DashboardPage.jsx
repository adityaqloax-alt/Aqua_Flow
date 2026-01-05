import React, { useState } from 'react';
import { 
  Download, RefreshCw, Calendar, LayoutDashboard, Factory, Truck, 
  AlertTriangle, DollarSign, Package
} from 'lucide-react';

// --- COMPONENT IMPORTS ---
import KPIGrid from "@/components/dashboard/company/KPIGrid";
import ProductionChart from "@/components/dashboard/company/ProductionChart";
import RevenueChart from "@/components/dashboard/company/RevenueChart";
import AlertsTable from "@/components/dashboard/company/AlertsTable";
import QuickActions from "@/components/dashboard/company/QuickActions";
import InventorySummary from "@/components/dashboard/company/InventorySummary";
import ProductionSummary from "@/components/dashboard/company/ProductionSummary";
import OrdersSummary from "@/components/dashboard/company/OrdersSummary";
import DistributionSummary from "@/components/dashboard/company/DistributionSummary";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // --- TAB DEFINITIONS ---
  const tabs = [
    { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
    { id: "production", label: "Production & Ops", icon: Factory },
    { id: "logistics", label: "Sales & Logistics", icon: Truck },
    { id: "alerts", label: "Alerts & Actions", icon: AlertTriangle }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

      {/* 1. Header & Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        
        {/* Top Bar */}
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <DollarSign className="text-indigo-600" /> Executive Dashboard
            </h1>
            <p className="text-slate-500 text-xs mt-1 flex items-center gap-2 font-medium uppercase tracking-wide">
              <Calendar size={12} /> Today, Dec 30 • Shift A (Active)
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-lg hover:bg-slate-50 transition-colors">
              <RefreshCw size={14} /> Refresh
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
              <Download size={14} /> Export Report
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="px-6 flex gap-8 overflow-x-auto no-scrollbar border-t border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? "border-indigo-600 text-indigo-700" 
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "animate-pulse" : ""} />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. Dynamic Content Area */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 scroll-smooth pb-24 bg-slate-50/50">

        {/* --- TAB 1: OVERVIEW (The Big Picture) --- */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section aria-label="KPIs">
              <KPIGrid />
            </section>
            
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-slate-800">Revenue Performance</h3>
                   <select className="text-xs bg-slate-100 border-none rounded-md px-2 py-1 font-bold text-slate-600 outline-none">
                     <option>This Month</option>
                     <option>Last Quarter</option>
                   </select>
                 </div>
                 <div className="h-[320px] w-full"><RevenueChart /></div>
              </div>
              <div className="xl:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
                 <h3 className="font-bold text-slate-800 mb-4">Production Efficiency</h3>
                 <div className="h-[320px] w-full"><ProductionChart /></div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-800 mb-4">Urgent Alerts</h3>
               <AlertsTable limit={3} /> 
               {/* Pass a 'limit' prop if your AlertsTable supports it to show only top 3 here */}
            </section>
          </div>
        )}


        {/* --- TAB 2: PRODUCTION & OPS --- */}
        {activeTab === "production" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-2">
                 <Factory className="text-indigo-600" />
                 <h3 className="font-bold text-lg text-slate-800">Production Floor Status</h3>
              </div>
              <ProductionSummary />
            </section>

            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
               <div className="flex items-center gap-2 mb-2">
                 <Package className="text-emerald-600" />
                 <h3 className="font-bold text-lg text-slate-800">Inventory Health</h3>
              </div>
              <InventorySummary />
            </section>
            
            {/* Full Width Chart for Production Depth */}
            <section className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
               <h3 className="font-bold text-slate-800 mb-4">Detailed Yield Analysis</h3>
               <ProductionChart detailed /> 
            </section>
          </div>
        )}


        {/* --- TAB 3: LOGISTICS --- */}
        {activeTab === "logistics" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex items-center gap-2 mb-4">
                 <DollarSign className="text-indigo-600" />
                 <h3 className="font-bold text-lg text-slate-800">Sales Pipeline</h3>
               </div>
               <OrdersSummary />
             </section>

             <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                 <Truck className="text-blue-600" />
                 <h3 className="font-bold text-lg text-slate-800">Fleet & Distribution</h3>
               </div>
               <DistributionSummary />
             </section>
          </div>
        )}


        {/* --- TAB 4: ALERTS --- */}
        {activeTab === "alerts" && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="xl:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                   <AlertTriangle className="text-amber-500" /> System Notifications
                 </h3>
                 <div className="flex gap-2">
                    <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded">3 Critical</span>
                    <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">5 Warning</span>
                 </div>
               </div>
               <AlertsTable />
             </div>
             <div className="xl:col-span-1">
                <QuickActions />
             </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default DashboardPage;
