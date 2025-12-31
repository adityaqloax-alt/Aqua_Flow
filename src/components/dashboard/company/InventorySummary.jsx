import React from "react";
import {
  Layers, DollarSign, AlertTriangle, ShoppingCart,
  Truck, ClipboardCheck, TrendingUp, Package, ArrowRight
} from "lucide-react";

// --- MOCK DATA ---
const kpis = [
  {
    label: "Total Inventory Value",
    value: "₹5.7 Cr",
    subtext: "+12% vs last month",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100"
  },
  {
    label: "Low Stock SKUs",
    value: "12",
    subtext: "Needs attention",
    icon: AlertTriangle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100"
  },
  {
    label: "Open POs",
    value: "8",
    subtext: "2 overdue",
    icon: ShoppingCart,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100"
  },
  {
    label: "Dispatch Ready",
    value: "85%",
    subtext: "Target: 90%",
    icon: Truck,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100"
  },
];

const InventorySummary = () => {
  return (
    <div className="flex flex-col gap-6 w-full">

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Layers className="text-indigo-600" size={24} />
            Inventory Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time snapshot across raw materials, FG, and procurement.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto">
          <ClipboardCheck size={16} /> Run Audit
        </button>
      </div>

      {/* KPI GRID - Responsive Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className={`bg-white p-4 sm:p-5 rounded-xl border ${kpi.border} shadow-sm hover:shadow-md transition-shadow cursor-default`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${kpi.bg}`}>
                  <Icon className={`${kpi.color}`} size={22} />
                </div>
                {kpi.subtext.includes('last month') && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
                    +12%
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide truncate">
                  {kpi.label}
                </p>
                <div className="flex flex-wrap items-baseline gap-2 mt-1">
                  <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{kpi.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED CARDS GRID - Stacks on mobile, 3 cols on XL screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* 1. RAW MATERIALS STATUS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
              <Package size={18} className="text-slate-400 shrink-0"/> Raw Materials
            </h3>
            <span className="text-xs font-medium text-indigo-600 cursor-pointer hover:underline whitespace-nowrap">View All</span>
          </div>
          <div className="p-4 sm:p-5 space-y-4 flex-1">
            {[
              { name: "RO Water Chemical", status: "Critical", color: "bg-rose-500", width: "15%" },
              { name: "Caps & Seals", status: "Low", color: "bg-amber-500", width: "35%" },
              { name: "Preforms", status: "Good", color: "bg-emerald-500", width: "85%" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-600 font-medium truncate pr-2">{item.name}</span>
                  <span className={`text-xs font-bold shrink-0 ${
                    item.status === 'Critical' ? 'text-rose-600' : 
                    item.status === 'Low' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>{item.status}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. FINISHED GOODS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
              <Truck size={18} className="text-slate-400 shrink-0"/> Finished Goods
            </h3>
            <span className="text-xs font-medium text-indigo-600 cursor-pointer hover:underline whitespace-nowrap">View Stock</span>
          </div>
          <div className="p-4 sm:p-5 space-y-4 flex-1">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 font-bold text-slate-600 shrink-0">20L</div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">20L Cans</p>
                  <p className="text-xs text-slate-500 truncate">Main Warehouse</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-slate-800">12,400</p>
                <p className="text-xs text-emerald-600">In Stock</p>
              </div>
            </div>

             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3 overflow-hidden">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 font-bold text-slate-600 shrink-0">1L</div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">1L Bottles</p>
                  <p className="text-xs text-slate-500 truncate">Distribution Hub</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-slate-800">28,000</p>
                <p className="text-xs text-emerald-600">In Stock</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
              <span>Blocked QC Stock:</span>
              <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">320 Units</span>
            </div>
          </div>
        </div>

        {/* 3. PROCUREMENT & INSIGHTS - Combined Column on LG screens */}
        <div className="space-y-6 lg:col-span-2 xl:col-span-1 h-full flex flex-col">
          {/* Procurement Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 flex-1">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <ShoppingCart size={18} className="text-slate-400 shrink-0"/> Procurement
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-600">Late POs</span>
                <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">2 Critical</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">Avg Supplier Delay</span>
                <span className="font-mono font-bold text-slate-800">1.8 days</span>
              </div>
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-indigo-600 shrink-0" size={18} />
              <h3 className="font-bold text-indigo-900 text-sm">Operational Insight</h3>
            </div>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Procurement delays may impact production within 72 hours. 
              <span className="font-semibold block sm:inline"> Action recommended: Expedite 2 critical purchase orders.</span>
            </p>
            <button className="mt-3 text-xs font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
              View POs <ArrowRight size={12}/>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InventorySummary;
