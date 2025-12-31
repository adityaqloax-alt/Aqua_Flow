import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Download, 
  Filter,
  BarChart3,
  Factory,
  Package,
  ShoppingCart,
  ShieldAlert,
  Users,
  Map
} from "lucide-react";

// --- Import Sub-Components ---
import ExecutiveOverview from "../components/analytics/company/ExecutiveOverview";
import ProductionAnalytics from "../components/analytics/company/ProductionAnalytics";
import InventoryAnalytics from "../components/analytics/company/InventoryAnalytics";
import SalesRevenue from "../components/analytics/company/SalesRevenue";
import LossRisk from "../components/analytics/company/LossRisk";
import Forecasts from "../components/analytics/company/Forecasts";
import CustomerInsights from "../components/analytics/company/CustomerInsights";
import DistributionPerformance from "../components/analytics/company/DistributionPerformance";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("Last 7 Days");
  
  // 1. State to track the active view
  const [activeTab, setActiveTab] = useState("Overview");

  // 2. Tab Configuration: Define the menu items
  const tabs = [
    { id: "Overview", label: "Executive Overview", icon: LayoutDashboard },
    { id: "Production", label: "Production & Forecasts", icon: Factory },
    { id: "Inventory", label: "Inventory Health", icon: Package },
    { id: "Sales", label: "Sales & Revenue", icon: ShoppingCart }, // Using ShoppingCart for Sales
    { id: "Risk", label: "Loss & Risk", icon: ShieldAlert },
    { id: "Distribution", label: "Distribution", icon: Map },
    { id: "Customers", label: "Customer Insights", icon: Users },
  ];

  // 3. Render Logic: Decide what to show based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-6">
            <section>
              <ExecutiveOverview />
            </section>
            {/* Show a snapshot of everything in Overview, or just the high-level cards */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Production Snapshot</h3>
                    <ProductionAnalytics />
                 </div>
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Revenue Trend</h3>
                    <SalesRevenue />
                 </div>
             </div>
          </div>
        );
      
      case "Production":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <ProductionAnalytics />
                </section>
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <Forecasts />
                </section>
            </div>
          </div>
        );

      case "Inventory":
        return (
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <InventoryAnalytics />
           </div>
        );

      case "Sales":
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <SalesRevenue />
            </div>
        );

      case "Risk":
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <LossRisk />
            </div>
        );

      case "Distribution":
         return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
               <DistributionPerformance />
            </div>
         );

      case "Customers":
          return (
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <CustomerInsights />
             </div>
          );

      default:
        return <ExecutiveOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* 1. Sticky Header & Global Controls */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title Section */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
                Enterprise Analytics
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Operational visibility & financial performance dashboard
              </p>
            </div>

            {/* Global Actions Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Filter */}
              <div className="relative">
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-white transition-colors cursor-pointer appearance-none"
                >
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Quarter</option>
                </select>
                <CalendarIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* 2. Navigation Tabs (Scrollable on mobile) */}
          <div className="mt-6 border-b border-slate-200 overflow-x-auto no-scrollbar">
            <nav className="flex space-x-8 min-w-max" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                      ${isActive 
                        ? 'border-indigo-500 text-indigo-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                    `}
                  >
                    <Icon 
                      className={`
                        -ml-0.5 mr-2 h-5 w-5
                        ${isActive ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-500'}
                      `} 
                    />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* 3. Main Dashboard Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* This renders only the component for the active tab */}
         {renderContent()}
      </main>
    </div>
  );
};

export default Analytics;
