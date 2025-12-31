import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CheckCircle, 
  Factory, 
  Truck, 
  AlertTriangle,
  LayoutGrid
} from "lucide-react";

// --- Internal Sub-Component: Sparkline Chart ---
const Sparkline = ({ data, status }) => {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1; 
  const width = 60;
  const height = 24;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const getLineColor = () => {
    switch (status) {
      case "good": return "#10b981";
      case "warning": return "#f59e0b";
      case "critical": return "#ef4444";
      default: return "#64748b";
    }
  };

  return (
    <div className="flex justify-end mt-3 opacity-90">
        <svg width={width} height={height} className="overflow-visible">
            <polyline
                fill="none"
                stroke={getLineColor()}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    </div>
  );
};

// --- Internal Sub-Component: KPI Card ---
const KPICard = ({ label, value, trend, change, icon: Icon, status, sparklineData }) => {
  
  const getCardStyles = () => {
    switch(status) {
      case "good": 
        return "bg-white border-emerald-100/60 hover:border-emerald-300 shadow-sm hover:shadow-md";
      case "warning": 
        return "bg-white border-amber-100/60 hover:border-amber-300 shadow-sm hover:shadow-md";
      case "critical": 
        return "bg-white border-red-100/60 hover:border-red-300 shadow-sm hover:shadow-md";
      default: 
        return "bg-white border-slate-200 hover:border-slate-300 shadow-sm";
    }
  };

  const getIconStyles = () => {
     switch(status) {
      case "good": return "bg-emerald-50 text-emerald-600";
      case "warning": return "bg-amber-50 text-amber-600";
      case "critical": return "bg-red-50 text-red-600";
      default: return "bg-slate-100 text-slate-500";
    }
  };

  const getTrendStyles = () => {
    const isUp = trend === "up";
    if (status === "good") return "text-emerald-700 bg-emerald-50";
    if (status === "warning") return "text-amber-700 bg-amber-50";
    if (status === "critical") return "text-red-700 bg-red-50";
    return "text-slate-600 bg-slate-100";
  };

  return (
    <div className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-full group ${getCardStyles()}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        <div className={`p-1.5 rounded-lg transition-colors ${getIconStyles()}`}>
             <Icon size={16} />
        </div>
      </div>

      <div className="flex items-end justify-between mt-1">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none tracking-tight">{value}</h3>
            <div className={`inline-flex items-center gap-1 mt-2 px-1.5 py-0.5 rounded text-[11px] font-bold ${getTrendStyles()}`}>
                {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{change}</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <Sparkline data={sparklineData} status={status} />
          </div>
      </div>
    </div>
  );
};

// --- Main Component: Executive Overview ---
const ExecutiveOverview = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Mock Data
  const allKpis = [
    { 
      id: 1,
      category: "Revenue",
      label: "Total Revenue", 
      value: "$1.2M", 
      trend: "up", 
      change: "5.2%",
      icon: DollarSign,
      status: "good",
      sparklineData: [1.0, 1.05, 1.08, 1.12, 1.15, 1.18, 1.2]
    },
    { 
      id: 2,
      category: "Operations",
      label: "Orders Fulfilled", 
      value: "92%", 
      trend: "down", 
      change: "1.8%",
      icon: CheckCircle,
      status: "warning",
      sparklineData: [95, 94, 93, 94, 93, 92, 92]
    },
    { 
      id: 3,
      category: "Production",
      label: "Production Vol", 
      value: "45k L", 
      trend: "up", 
      change: "8.4%",
      icon: Factory,
      status: "good",
      sparklineData: [40000, 41000, 42500, 43000, 43500, 44000, 45000]
    },
    { 
      id: 4,
      category: "Operations",
      label: "On-Time Delivery", 
      value: "97%", 
      trend: "up", 
      change: "0.5%",
      icon: Truck,
      status: "good",
      sparklineData: [95, 96, 96, 97, 96, 97, 97]
    },
    { 
      id: 5,
      category: "Production",
      label: "Loss / Waste", 
      value: "1.8%", 
      trend: "down", 
      change: "0.3%",
      icon: AlertTriangle,
      status: "good",
      sparklineData: [2.5, 2.3, 2.1, 2.0, 1.9, 1.9, 1.8]
    },
  ];

  // Filter Logic
  const filteredKpis = activeTab === "All" 
    ? allKpis 
    : allKpis.filter(k => k.category === activeTab || (activeTab === "Operations" && ["Revenue", "Operations"].includes(k.category)));

  // Tabs Configuration
  const tabs = [
    { id: "All", icon: LayoutGrid },
    { id: "Revenue", icon: DollarSign },
    { id: "Production", icon: Factory },
    { id: "Operations", icon: Truck },
  ];

  return (
    <div className="w-full">
      {/* Header & Tabs Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Executive Overview</h2>
          <p className="text-xs text-slate-500">Real-time performance metrics</p>
        </div>
        
        {/* Animated Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-lg self-start sm:self-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200
                  ${isActive 
                    ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
                `}
              >
                <Icon size={14} />
                <span>{tab.id}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredKpis.map((kpi) => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
        
        {/* Empty State Helper (if filter has no results) */}
        {filteredKpis.length === 0 && (
          <div className="col-span-full py-8 text-center text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl">
            No data available for this category
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveOverview;
