import React, { useState, useEffect } from "react";
import { 
  Package, Box, AlertTriangle, ShoppingCart, ClipboardList, Layers, 
  Search, Plus, Filter, Download, ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- IMPORT COMPONENTS (Keep your existing imports) ---
import RawMaterials from "@/components/inventory/company/RawMaterials";
import FinishedGoods from "@/components/inventory/company/FinishedGoods";
import DamagedReturns from "@/components/inventory/company/DamagedReturns";
import Procurement from "@/components/inventory/company/Procurement";
import AuditLogs from "@/components/inventory/company/AuditLogs";

// --- CHART DATA ---
const chartData = [
  { category: "Raw Material", stock: 850, threshold: 200, status: "Healthy" },
  { category: "Preforms", stock: 120, threshold: 300, status: "Low" },
  { category: "Caps", stock: 5000, threshold: 1000, status: "Healthy" },
  { category: "Labels", stock: 3200, threshold: 500, status: "Healthy" },
  { category: "20L Jars", stock: 450, threshold: 100, status: "Healthy" },
  { category: "1L Bottles", stock: 80, threshold: 200, status: "Critical" }
];

const getBarColor = (status) => {
  if (status === 'Critical') return '#ef4444'; // Red-500
  if (status === 'Low') return '#f59e0b';      // Amber-500
  return '#10b981';                            // Emerald-500
};

// --- ENHANCED OVERVIEW COMPONENT ---
const InventoryOverview = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    
    {/* 1. KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Total Valuation</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹4.2M</h3>
          </div>
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
          <ArrowUpRight size={14} className="mr-1" />
          +12% from last month
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Low Stock Alerts</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">5 Items</h3>
          </div>
          <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
            <AlertTriangle size={20} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs font-medium text-amber-600">
          Action required immediately
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Pending POs</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">12</h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <ShoppingCart size={20} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs font-medium text-slate-500">
          3 deliveries expected today
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Critical Stock</p>
            <h3 className="text-2xl font-black text-rose-600 mt-1">2 SKUs</h3>
          </div>
          <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
            <AlertCircle size={20} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs font-medium text-rose-600">
          Production halted risk
        </div>
      </div>
    </div>

    {/* 2. Main Dashboard Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Chart Section */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 text-lg">Stock Level Analysis</h3>
          <select className="text-sm border-slate-200 rounded-lg bg-slate-50 p-2 outline-none">
            <option>All Categories</option>
            <option>Raw Materials</option>
            <option>Finished Goods</option>
          </select>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="stock" radius={[4, 4, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts & Activity Feed */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Critical Alerts</h3>
        
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[300px] custom-scrollbar">
          
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex gap-3">
            <div className="mt-1"><AlertCircle size={18} className="text-rose-600" /></div>
            <div>
              <p className="text-sm font-bold text-rose-800">Critical: 1L Bottles</p>
              <p className="text-xs text-rose-600 mt-1">Stock (80) below threshold (200). Production may halt.</p>
              <button className="mt-2 text-xs font-bold text-white bg-rose-500 px-3 py-1 rounded hover:bg-rose-600 transition-colors">
                Raise PO
              </button>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
            <div className="mt-1"><AlertTriangle size={18} className="text-amber-600" /></div>
            <div>
              <p className="text-sm font-bold text-amber-800">Low Stock: Preforms</p>
              <p className="text-xs text-amber-600 mt-1">Stock (120) nearing reorder level.</p>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
            <div className="mt-1"><ShoppingCart size={18} className="text-blue-600" /></div>
            <div>
              <p className="text-sm font-bold text-blue-800">PO #4920 Update</p>
              <p className="text-xs text-blue-600 mt-1">Shipment delayed by 2 days. Expected: Oct 24.</p>
            </div>
          </div>

        </div>
        
        <button className="w-full mt-4 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
          View All Notifications
        </button>
      </div>
    </div>
  </div>
);

const InventoryPage = ({ initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const map = {
      'overview': 'overview',
      'raw_materials': 'rawMaterials',
      'finished_goods': 'finishedGoods',
      'procurement': 'procurement',
      'damaged_returns': 'damagedReturns',
      'audit_logs': 'auditLogs'
    };
    if (initialTab && map[initialTab]) setActiveTab(map[initialTab]);
  }, [initialTab]);

  const tabs = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "rawMaterials", label: "Raw Materials", icon: Package },
    { id: "finishedGoods", label: "Finished Goods", icon: Box },
    { id: "procurement", label: "Procurement", icon: ShoppingCart },
    { id: "damagedReturns", label: "Loss & Defects", icon: AlertTriangle },
    { id: "auditLogs", label: "Audit Ledger", icon: ClipboardList },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <InventoryOverview />;
      case "rawMaterials": return <RawMaterials />;
      case "finishedGoods": return <FinishedGoods />;
      case "procurement": return <Procurement />;
      case "damagedReturns": return <DamagedReturns />;
      case "auditLogs": return <AuditLogs />;
      default: return <InventoryOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* 1. Sticky Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
                <Layers className="w-7 h-7 text-indigo-600" />
                Inventory Management
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Real-time stock tracking • Procurement • Audit Logs
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search SKU / Item..." 
                  className="pl-9 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white border focus:border-indigo-500 rounded-xl text-sm font-medium text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all w-48 lg:w-64"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all">
                <Plus className="w-4 h-4" />
                <span>Add Stock</span>
              </button>
            </div>
          </div>

          <div className="mt-6 border-b border-slate-200 overflow-x-auto no-scrollbar scroll-smooth">
            <nav className="flex space-x-8 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      group inline-flex items-center py-4 px-1 border-b-2 font-bold text-sm transition-all duration-300
                      ${isActive ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}
                    `}
                  >
                    <Icon className={`-ml-0.5 mr-2 h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
         </div>
      </main>
    </div>
  );
};

export default InventoryPage;
