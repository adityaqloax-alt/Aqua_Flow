import React, { useState } from "react";
import { 
  Users, FileText, CreditCard, LayoutDashboard, 
  BarChart3, Filter, AlertTriangle, X 
} from "lucide-react";

// 👇 FIX: Point to the 'components' folder, not the current './' folder
import CRMSummary from "@/components/crm/company/CRMSummary";
import Customers from "@/components/crm/company/Customers";
import Contracts from "@/components/crm/company/Contracts";
import Billing from "@/components/crm/company/Billing";
import Insights from "@/components/crm/company/Insights";


const CRMPage = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [showAlert, setShowAlert] = useState(true);

  // Filters State (Simulated)
  const [filters, setFilters] = useState({
    route: "All Routes",
    type: "All Types",
    status: "All Status"
  });

  const tabs = [
    { id: "summary", label: "Overview", icon: LayoutDashboard },
    { id: "customers", label: "Customers", icon: Users },
    { id: "contracts", label: "Contracts", icon: FileText },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "insights", label: "Insights", icon: BarChart3 },
  ];

  return (
    <div className="flex-1 bg-slate-50 h-full font-sans">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* 1. HEADER & GLOBAL FILTERS */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              CRM – Aqua Water Management
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Manage relationships, track revenue, and monitor supply risk.
            </p>
          </div>
          
          {/* Global Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex items-center px-3 text-slate-400 border-r border-slate-100">
              <Filter size={14} />
            </div>
            {["Route", "Type", "Status"].map((f) => (
              <select 
                key={f} 
                className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none cursor-pointer hover:text-indigo-600"
              >
                <option>All {f}s</option>
                <option>Option A</option>
                <option>Option B</option>
              </select>
            ))}
          </div>
        </div>

        {/* 2. ALERT BANNER */}
        {showAlert && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex gap-3">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600 h-fit">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-amber-800 text-sm">Attention Needed</h4>
                <p className="text-amber-700 text-sm mt-0.5">
                  <span className="font-semibold">3 Contracts</span> are expiring in the next 15 days, and 
                  <span className="font-semibold"> 12 Customers</span> have overdue payments totaling ₹2.1L.
                </p>
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={() => setActiveTab('contracts')}
                    className="text-xs font-bold text-amber-900 underline hover:text-amber-700"
                  >
                    View Expiring Contracts
                  </button>
                  <button 
                    onClick={() => setActiveTab('billing')}
                    className="text-xs font-bold text-amber-900 underline hover:text-amber-700"
                  >
                    Check Overdue Invoices
                  </button>
                </div>
              </div>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-amber-400 hover:text-amber-600 transition-colors">
              <X size={18} />
            </button>
          </div>
        )}

        {/* 3. NAVIGATION TABS */}
        <div>
          <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-t-lg transition-all relative whitespace-nowrap
                    ${isActive
                      ? "text-indigo-600 bg-white border-x border-t border-slate-200 shadow-[0_2px_0_0_white]"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                    }
                  `}
                >
                  <Icon size={16} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                  {tab.label}
                  {tab.id === 'insights' && !isActive && (
                    <span className="ml-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 4. MAIN CONTENT AREA */}
          <div className="bg-white border-x border-b border-slate-200 rounded-b-xl rounded-tr-xl shadow-sm min-h-[500px] p-6">
            <div className="animate-in fade-in duration-300">
              {activeTab === "summary" && <CRMSummary />}
              {activeTab === "customers" && <Customers />}
              {activeTab === "contracts" && <Contracts />}
              {activeTab === "billing" && <Billing />}
              {activeTab === "insights" && <Insights />}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CRMPage;
