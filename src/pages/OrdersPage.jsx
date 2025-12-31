import React, { useState } from "react";
import { 
  ShoppingCart, 
  LayoutDashboard, 
  PlusCircle, 
  Loader, 
  CheckSquare, 
  History,
  Plus,
  FileText
} from 'lucide-react';

// Orders sub-modules
import OrdersDashboard from "../components/orders/company/OrdersDashboard";
import NewOrders from "../components/orders/company/NewOrders";
import InProcessOrders from "../components/orders/company/InProcessOrders";
import DeliveredOrders from "../components/orders/company/DeliveredOrders";
import OrderHistory from "../components/orders/company/OrderHistory";

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "new", label: "New Orders", icon: PlusCircle, count: 3, alert: true }, // Alert = Red Dot
    { id: "process", label: "In Process", icon: Loader, count: 12 },
    { id: "delivered", label: "Delivered", icon: CheckSquare, count: 5 },
    { id: "history", label: "History", icon: History },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 font-sans h-full">
      <div className="max-w-[1600px] mx-auto p-6 sm:p-8">
        
        {/* 1. Page Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Orders Management</h1>
              <p className="text-sm text-slate-500">
                Commercial command center: Track orders from request to cash collection.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors">
              <FileText size={16} /> Reports
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors">
              <Plus size={16} /> Create Order
            </button>
          </div>
        </div>

        {/* 2. Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-sm transition-all relative top-[1px]
                  ${isActive 
                    ? "bg-white text-indigo-600 border border-slate-200 border-b-white shadow-sm z-10" 
                    : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-transparent"}
                `}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                {tab.label}
                
                {/* Badge Logic */}
                {tab.count !== undefined && (
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : tab.alert 
                        ? 'bg-rose-100 text-rose-600 animate-pulse' 
                        : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. Dynamic Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px]">
          {/* Key prop ensures animation triggers on tab switch */}
          <div key={activeTab} className="p-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
             {activeTab === "dashboard" && <OrdersDashboard />}
             {activeTab === "new" && <NewOrders />}
             {activeTab === "process" && <InProcessOrders />}
             {activeTab === "delivered" && <DeliveredOrders />}
             {activeTab === "history" && <OrderHistory />}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrdersPage;
