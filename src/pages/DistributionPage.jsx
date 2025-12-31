import React, { useState } from "react";
import { 
  Map, 
  Users, 
  Bell, 
  FileText, 
  Truck, 
  Activity,
  AlertCircle,
  Clock,
  Filter,
  Download,
  Plus
} from 'lucide-react';

// Import all distribution components
import RoutePlanning from "@/components/distribution/company/RoutePlanning";
import RouteCustomers from "@/components/distribution/company/RouteCustomers";
import RouteNotifications from "@/components/distribution/company/RouteNotifications";
import TripSheets from "@/components/distribution/company/TripSheets";
import DeliveryConfirmation from "@/components/distribution/company/DeliveryConfirmation";


const DistributionPage = () => {
  const [activeTab, setActiveTab] = useState("route_planning");

  // Mock "Heads Up" Dashboard Stats
  const stats = [
    { label: "Active Routes", value: "8", icon: Map, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { label: "Pending Deliveries", value: "142", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { label: "Issues Reported", value: "3", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
    { label: "On-Time Rate", value: "94%", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  ];

  const tabs = [
    { id: "route_planning", label: "Route Planner", icon: Map },
    { id: "route_customers", label: "Customer List", icon: Users },
    { id: "route_notifications", label: "Broadcaster", icon: Bell },
    { id: "trip_sheets", label: "Trip Sheets", icon: FileText },
    { id: "delivery_confirmation", label: "Execution", icon: Truck },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "route_planning": return <RoutePlanning />;
      case "route_customers": return <RouteCustomers />;
      case "route_notifications": return <RouteNotifications />;
      case "trip_sheets": return <TripSheets />;
      case "delivery_confirmation": return <DeliveryConfirmation />;
      default: return <RoutePlanning />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* 1. Sticky Header & Stats Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          {/* Top Row: Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
             <div>
               <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                 <Truck className="w-6 h-6 text-indigo-600" />
                 Distribution Hub
               </h1>
               <p className="text-sm text-slate-500 mt-1">
                 Manage daily logistics, fleets, and customer fulfillment
               </p>
             </div>

             <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Route</span>
                </button>
             </div>
          </div>

          {/* Stats Grid (Inside Header) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
             {stats.map((stat, idx) => {
               const Icon = stat.icon;
               return (
                 <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between ${stat.bg} ${stat.border}`}>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xl font-bold text-slate-800 mt-0.5">{stat.value}</p>
                    </div>
                    <div className="p-2 bg-white/60 rounded-lg backdrop-blur-sm">
                      <Icon size={18} className={stat.color} />
                    </div>
                 </div>
               );
             })}
          </div>

          {/* 2. Navigation Tabs */}
          <div className="mt-6 border-b border-slate-200 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
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

      {/* 3. Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Container with Animation */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
           {renderContent()}
        </div>
      </main>

    </div>
  );
};

export default DistributionPage;
