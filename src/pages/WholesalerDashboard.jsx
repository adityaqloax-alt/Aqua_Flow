import React, { useState } from "react";
import {
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Bell,
  FileText,
  AlertCircle,
  Phone,
  Truck,
  Wallet,
  PieChart,
} from "lucide-react";

// --- Import Your Dashboard Widgets ---
import KPICards from "../components/dashboard/wholesaler/KPICards";
import OrdersSummary from "../components/dashboard/wholesaler/OrdersSummary";
import OutstandingBalance from "../components/dashboard/wholesaler/OutstandingBalance";
import DeliveryStatus from "../components/dashboard/wholesaler/DeliveryStatus";
import RecentOrders from "../components/dashboard/wholesaler/RecentOrders";
import InventorySnapshot from "../components/inventory/wholesaler/FinishedGoods";

const TABS = [
  { id: "overview", label: "Overview", icon: PieChart },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "finance", label: "Finance", icon: Wallet },
  { id: "logistics", label: "Logistics", icon: Truck },
];

const WholesalerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="relative flex-1 h-full overflow-y-auto bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* --- 1. Background Aesthetic (Animated Blobs) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-[-10%] left-[20%] w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 max-w-7xl mx-auto">
        {/* --- 2. Header Section --- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-[fadeInDown_0.6s_ease-out]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} className="text-amber-500 animate-bounce" />
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-indigo-800 to-slate-800 tracking-tight">
                Wholesaler Portal
              </h1>
            </div>
            <p className="text-slate-500 font-medium">
              Welcome back. Here is your supply chain overview.
            </p>
          </div>

          {/* Animated CTA Button */}
          <button className="group relative inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl overflow-hidden transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0">
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1s_infinite]" />
            <ShoppingCart size={18} className="relative z-10 transition-transform group-hover:scale-110" />
            <span className="relative z-10">Place New Order</span>
          </button>
        </div>

        {/* --- 3. Quick Actions Toolbar --- */}
        <div className="flex flex-wrap gap-3 mb-6 animate-[fadeIn_0.8s_ease-out]">
          {[
            {
              label: "Download Catalog",
              icon: FileText,
              color: "text-blue-600 bg-blue-50 hover:bg-blue-100",
            },
            {
              label: "Report Issue",
              icon: AlertCircle,
              color: "text-rose-600 bg-rose-50 hover:bg-rose-100",
            },
            {
              label: "Contact Support",
              icon: Phone,
              color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100",
            },
          ].map((action, idx) => (
            <button
              key={idx}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 border border-transparent hover:border-black/5 ${action.color}`}
            >
              <action.icon size={14} />
              {action.label}
            </button>
          ))}
        </div>

        {/* --- 4. Tabs Bar --- */}
        <div className="mb-6 border-b border-slate-200 flex items-center justify-between">
          <div
            className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Wholesaler dashboard sections"
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
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg border-b-2 transition-all whitespace-nowrap
                    ${
                      isActive
                        ? "border-indigo-500 text-indigo-700 bg-white"
                        : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- 5. Tab Panels --- */}
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <section
            id="overview-panel"
            role="tabpanel"
            aria-labelledby="overview-tab"
            className="space-y-8 animate-[fadeInUp_0.4s_ease-out]"
          >
            {/* KPI Strip */}
            <KPICards />

            {/* Announcement */}
            <div className="animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 [animation-delay:0.1s]">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-[2px] shadow-lg">
                <div className="bg-white rounded-[10px] p-4 flex items-start sm:items-center gap-4">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                    <Bell size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-800">
                      🚀 New Summer Pricing Effective Oct 15
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Bulk rates for 20L jars are being updated. Download the latest price list before placing next week's orders.
                    </p>
                  </div>
                  <button className="hidden sm:block text-xs font-bold text-indigo-600 hover:underline shrink-0 px-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Grid: Orders + Balance + Delivery + Inventory */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <OrdersSummary />
              </div>
              <div className="lg:col-span-2">
                <div className="h-full bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800">Recent Order Activity</h3>
                    <button className="text-xs font-bold text-indigo-600 hover:underline">
                      View All
                    </button>
                  </div>
                  <RecentOrders />
                </div>
              </div>

              <div className="lg:col-span-1">
                <OutstandingBalance />
              </div>
              <div className="lg:col-span-1">
                <DeliveryStatus />
              </div>
              <div className="lg:col-span-1">
                <InventorySnapshot />
              </div>
            </div>
          </section>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <section
            id="orders-panel"
            role="tabpanel"
            aria-labelledby="orders-tab"
            className="space-y-6 animate-[fadeInUp_0.4s_ease-out]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <OrdersSummary />
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800">Recent Orders</h3>
                    <button className="text-xs font-bold text-indigo-600 hover:underline">
                      View All
                    </button>
                  </div>
                  <RecentOrders />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FINANCE TAB */}
        {activeTab === "finance" && (
          <section
            id="finance-panel"
            role="tabpanel"
            aria-labelledby="finance-tab"
            className="space-y-6 animate-[fadeInUp_0.4s_ease-out]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OutstandingBalance />
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">Credit Health</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Monitor dues and keep your account within the safe credit window.
                  </p>
                </div>
                <button className="self-start inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800">
                  Go to Billing
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* LOGISTICS TAB */}
        {activeTab === "logistics" && (
          <section
            id="logistics-panel"
            role="tabpanel"
            aria-labelledby="logistics-tab"
            className="space-y-6 animate-[fadeInUp_0.4s_ease-out]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DeliveryStatus />
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-slate-800 mb-2">Upcoming Dispatches</h3>
                <p className="text-xs text-slate-500">
                  Your next scheduled shipments will appear here once confirmed by the distribution team.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* --- Inline Styles for Animations --- */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default WholesalerDashboard;
