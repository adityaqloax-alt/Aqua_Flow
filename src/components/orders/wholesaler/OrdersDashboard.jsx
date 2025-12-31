import React, { useState, useEffect } from "react";
import {
  ShoppingCart, Layers, Loader2, CheckCircle2, History, ArrowRight, 
  Clock, CheckCircle, Package, TrendingUp, AlertTriangle, Download
} from "lucide-react";

import NewOrders from "./NewOrders";
import InProcessOrders from "./InProcessOrders";
import DeliveredOrders from "./DeliveredOrders";
import OrderHistory from "./OrderHistory";
import OrderDetailsModal from "./OrderDetailsModal";

const OverviewStats = ({ compact = false }) => {
  // Dynamic stats with trend data
  const stats = [
    {
      label: "New Requests",
      value: 4,
      change: "+2",
      trend: "up",
      desc: "Awaiting Confirmation",
      icon: ShoppingCart,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "In Process",
      value: 7,
      change: "-1",
      trend: "down", 
      desc: "Production & Transit",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Completed",
      value: 21,
      change: "+5",
      trend: "up",
      desc: "Delivered this Month",
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const recent = [
    { id: "ORD-7845", label: "Delivered", tone: "text-emerald-600", time: "2h ago" },
    { id: "ORD-7831", label: "In Process", tone: "text-amber-600", time: "5h ago" },
    { id: "ORD-7820", label: "New Request", tone: "text-indigo-600", time: "1d ago" },
  ];

  return (
    <div className="w-full">
      {!compact && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Orders Overview</h2>
            <p className="text-slate-500 text-sm">
              Summary of your procurement activity • <span className="text-emerald-600 font-semibold">32 total</span>
            </p>
          </div>
        </div>
      )}

      <div
        className={`grid gap-6 ${
          compact ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="relative bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 group bg-gradient-to-br"
            >
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-lg`}>
                <Icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-500 mb-1 truncate">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-3xl font-extrabold text-slate-800">
                    {stat.value}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    orders
                  </span>
                </div>
                {!compact && (
                  <p className="text-xs text-slate-400 mb-2">
                    {stat.desc}
                  </p>
                )}
                {/* Trend Indicator */}
                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  <TrendingUp className={`w-3 h-3 ${stat.trend === 'up' ? '' : 'rotate-180'}`} />
                  <span>{stat.change} from last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-8 bg-gradient-to-r from-slate-50 to-indigo-50 border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white shadow-lg text-slate-500">
              <Package size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Recent Order Activity
              </h3>
              <p className="text-sm text-slate-500">Latest updates across your pipeline</p>
            </div>
          </div>
          <div className="space-y-3">
            {recent.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all group"
              >
                <span className="font-mono text-sm font-semibold text-slate-800">#{r.id}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${r.tone}`}>
                    {r.label}
                  </span>
                  <span className="text-xs text-slate-500">{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TABS = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "new", label: "New Order", icon: ShoppingCart },
  { id: "in_process", label: "In Process", icon: Loader2 },
  { id: "delivered", label: "Delivered", icon: CheckCircle2 },
  { id: "history", label: "History", icon: History },
];

const OrdersDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({ new: 4, inProcess: 7, completed: 21 });

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        new: prev.new + (Math.random() > 0.7 ? 1 : 0),
        inProcess: Math.max(0, prev.inProcess + (Math.random() > 0.8 ? -1 : 0)),
        completed: prev.completed + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const containerClass =
    "flex-1 min-h-[600px] overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20";

  const openExampleOrder = () => {
    setSelectedOrder({
      id: 1015,
      status: "Out for Delivery",
      date: "Today, 6:30 PM",
      items: [
        { name: "20L Water Jar", qty: 80, pack: "Single Unit" },
        { name: "1L Water Bottle (Case of 12)", qty: 30, pack: "Case of 12" },
      ],
      location: "Main Store",
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Scroll to top when switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={containerClass}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent mb-3">
              Orders Center
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Complete lifecycle management for your water supply procurement. 
              Live tracking • Smart reordering • Delivery proof.
            </p>
          </div>
          
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleTabChange("new")}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 shadow-indigo-500/30"
            >
              <ShoppingCart size={20} />
              <span>New Purchase Order</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={openExampleOrder}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-xl transition-all shadow-lg"
            >
              👁️ Preview Order
            </button>
          </div>
        </div>

        {/* Sticky Tabs */}
        <div className="sticky top-4 z-20 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl p-1">
          <div
            className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-1"
            role="tablist"
            aria-label="Orders tabs"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleTabChange(tab.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleTabChange(tab.id);
                    }
                  }}
                  className={`flex items-center gap-2.5 px-5 py-3 text-sm font-bold rounded-2xl transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl group focus:outline-none focus:ring-4 focus:ring-indigo-500/20
                    ${isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/50 scale-105"
                      : "bg-white/60 text-slate-700 hover:bg-white hover:text-indigo-700 hover:scale-[1.05]"
                    }`}
                >
                  <Icon
                    size={16}
                    className={`${isActive ? 'drop-shadow-lg' : ''} ${tab.id === "in_process" ? "animate-spin-slow" : ""}`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <main className="space-y-8">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <section
              id="overview-panel"
              role="tabpanel"
              aria-labelledby="overview-tab"
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <OverviewStats compact={false} />
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-3xl p-8 text-center group hover:shadow-2xl hover:-translate-y-2 transition-all">
                  <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4 drop-shadow-lg" />
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">99.8% On-Time</h3>
                  <p className="text-emerald-700 mb-6">This month delivery performance</p>
                  <div className="inline-flex items-center gap-2 text-sm text-emerald-600 bg-white/60 px-4 py-2 rounded-2xl font-semibold">
                    View Analytics <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <AlertTriangle className="w-12 h-12 text-amber-500" />
                    <div>
                      <h4 className="text-lg font-bold text-slate-800">Pro Tips</h4>
                      <p className="text-sm text-slate-600">Maximize efficiency</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-2xl border hover:shadow-md transition-all">
                      <span className="font-semibold text-indigo-600">⭐</span> Use "Repeat Last Order"
                    </div>
                    <div className="bg-white p-4 rounded-2xl border hover:shadow-md transition-all">
                      <span className="font-semibold text-emerald-600">⚡</span> Orders before 2PM = Next Day
                    </div>
                    <div className="bg-white p-4 rounded-2xl border hover:shadow-md transition-all">
                      <span className="font-semibold text-amber-600">📦</span> Minimum 5 jars per order
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Component Tabs */}
          {activeTab === "new" && (
            <section id="new-panel" role="tabpanel" aria-labelledby="new-tab" className="animate-in fade-in slide-in-from-right-4 duration-500">
              <NewOrders />
            </section>
          )}

          {activeTab === "in_process" && (
            <section id="in_process-panel" role="tabpanel" aria-labelledby="in_process-tab" className="animate-in fade-in slide-in-from-right-4 duration-500">
              <InProcessOrders />
            </section>
          )}

          {activeTab === "delivered" && (
            <section id="delivered-panel" role="tabpanel" aria-labelledby="delivered-tab" className="animate-in fade-in slide-in-from-right-4 duration-500">
              <DeliveredOrders />
            </section>
          )}

          {activeTab === "history" && (
            <section id="history-panel" role="tabpanel" aria-labelledby="history-tab" className="animate-in fade-in slide-in-from-right-4 duration-500">
              <OrderHistory />
            </section>
          )}
        </main>

        {/* Global Order Modal */}
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInFromRight {
            from { opacity: 0; transform: translateX(32px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-spin-slow {
            animation: spin 2.5s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          .animate-float-slow {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default OrdersDashboard;
