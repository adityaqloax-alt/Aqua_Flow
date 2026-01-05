import React, { useState } from "react";
import { 
  Layers, Search, Filter, ArrowUpRight, RefreshCw, Box, 
  AlertTriangle, PackageCheck, BellRing, PackageX, TrendingDown,
  Clock, Info, Truck, ArrowRight, BarChart3, Activity
} from "lucide-react";

// --- ACTUAL WHOLESALER COMPONENTS ---
import W_FinishedGoods from "../../inventory/wholesaler/FinishedGoods";
import W_LowStockAlerts from "../../inventory/wholesaler/LowStockAlerts";
import W_ProductAvailability from "../../inventory/wholesaler/ProductAvailability";

const InventorySummary = () => {
  const [activeTab, setActiveTab] = useState("summary");

  const tabs = [
    { id: "summary", label: "Summary", icon: Layers },
    { id: "finished-goods", label: "Finished Goods", icon: Box },
    { id: "alerts", label: "Low Stock Alerts", icon: BellRing },
    { id: "availability", label: "Product Availability", icon: PackageCheck },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in zoom-in duration-500">
      
      {/* 1. HEADER & TABS */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <Activity className="text-indigo-600" size={24} />
            My Stock Overview
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <RefreshCw size={16} className="animate-spin text-indigo-500" />
            <span>Live Data</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold rounded-lg transition-all duration-200 group flex-1
                ${activeTab === tab.id 
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-200" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.icon && <tab.icon size={14} />}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAB CONTENT */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* TAB 1: SUMMARY */}
        {activeTab === "summary" && (
          <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Layers size={24} className="text-blue-600" />
                    </div>
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Total Units</p>
                    <p className="text-3xl font-bold text-slate-900">12,450</p>
                    <p className="text-xs text-slate-400 mt-1">Available for dispatch</p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-emerald-50 to-indigo-50 p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <RefreshCw size={24} className="text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded-full">-2.1%</span>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Jars Returned</p>
                    <p className="text-3xl font-bold text-slate-900">93.5%</p>
                    <p className="text-xs text-slate-400 mt-1">58 jars missing</p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-100 rounded-xl">
                      <Truck size={24} className="text-amber-600" />
                    </div>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-full">High</span>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Pending Dispatch</p>
                    <p className="text-3xl font-bold text-slate-900">380 Units</p>
                    <p className="text-xs text-slate-400 mt-1">Next truck: 20 mins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FINISHED GOODS */}
        {activeTab === "finished-goods" && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300 h-full">
            <W_FinishedGoods />
          </div>
        )}

        {/* TAB 3: LOW STOCK ALERTS */}
        {activeTab === "alerts" && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300 h-full">
            <W_LowStockAlerts />
          </div>
        )}

        {/* TAB 4: PRODUCT AVAILABILITY */}
        {activeTab === "availability" && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300 h-full">
            <W_ProductAvailability />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <Info size={12} /> Auto-sync every 5 minutes • Wholesaler View
        </p>
      </div>
    </div>
  );
};

export default InventorySummary;
