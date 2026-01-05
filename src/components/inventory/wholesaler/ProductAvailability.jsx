import React, { useState } from "react";
import { 
  CheckCircle2, XCircle, Package, Activity, Info, 
  Filter, ArrowRight, Battery, BatteryWarning, BatteryCharging 
} from "lucide-react";

const ProductAvailability = () => {
  const [viewMode, setViewMode] = useState("all"); // 'all' or 'available'

  const items = [
    { name: "20L Water Jar", qty: 450, max: 500, status: "Available", sku: "WJ-20" },
    { name: "1L Bottle (Case)", qty: 0, max: 200, status: "Unavailable", sku: "WB-1L" },
    { name: "500ml Bottle (Case)", qty: 120, max: 300, status: "Available", sku: "WB-500" },
    { name: "300ml Mini (Case)", qty: 15, max: 150, status: "Low Stock", sku: "WB-300" },
    { name: "Premium Glass", qty: 85, max: 100, status: "Available", sku: "PG-750" },
  ];

  // Filter Logic
  const filteredItems = items.filter(item => 
    viewMode === 'available' ? item.status !== 'Unavailable' : true
  );

  // Helper for visual status
  const getStatusConfig = (status, qty, max) => {
    const percentage = Math.round((qty / max) * 100);
    
    switch (status) {
      case "Unavailable":
        return {
          color: "text-slate-400",
          bg: "bg-slate-100",
          border: "border-slate-200",
          icon: XCircle,
          text: "Out of Stock",
          percent: 0
        };
      case "Low Stock":
        return {
          color: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-100",
          icon: BatteryWarning,
          text: "Low Stock",
          percent: percentage
        };
      default:
        return {
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          border: "border-emerald-100",
          icon: CheckCircle2,
          text: "Ready to Ship",
          percent: percentage
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      
      {/* 1. Header */}
      <div className="p-5 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-indigo-600" size={20} />
              Stock Availability
            </h3>
            <p className="text-xs text-slate-500 mt-1">Live dispatch capacity.</p>
          </div>
          <div className="p-1 bg-slate-100 rounded-lg flex text-[10px] font-bold">
            <button 
              onClick={() => setViewMode('all')}
              className={`px-2 py-1 rounded transition-all ${viewMode === 'all' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              All
            </button>
            <button 
              onClick={() => setViewMode('available')}
              className={`px-2 py-1 rounded transition-all ${viewMode === 'available' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Ready
            </button>
          </div>
        </div>
      </div>

      {/* 2. Scrollable List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {filteredItems.map((item, idx) => {
          const config = getStatusConfig(item.status, item.qty, item.max);
          const Icon = config.icon;

          return (
            <div 
              key={item.sku}
              className={`
                group relative p-3 rounded-xl border transition-all duration-200 hover:shadow-md
                ${item.status === 'Unavailable' ? 'bg-slate-50/50 border-slate-100 grayscale-[0.5]' : 'bg-white border-slate-100 hover:border-indigo-100'}
              `}
            >
              <div className="flex items-center justify-between">
                
                {/* Left: Product Info */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ${config.color}`}>
                     <Icon size={18} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${item.status === 'Unavailable' ? 'text-slate-500' : 'text-slate-800'}`}>
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 rounded">
                      {item.sku}
                    </span>
                  </div>
                </div>

                {/* Right: Quantity & Visual */}
                <div className="text-right">
                   <div className="flex items-center justify-end gap-2 mb-1">
                      <span className={`text-sm font-bold ${config.color}`}>
                        {item.qty}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase">units</span>
                   </div>
                   
                   {/* Mini Progress Bar */}
                   <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden ml-auto">
                     <div 
                       className={`h-full rounded-full transition-all duration-1000 ${config.bg.replace('bg-', 'bg-').replace('50', '500')}`} 
                       style={{ width: `${config.percent}%` }}
                     />
                   </div>
                </div>
              </div>

              {/* Status Footer (Only shows on hover or if critical) */}
              <div className="mt-2 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                 <span className={`text-[10px] font-bold ${config.color} flex items-center gap-1`}>
                   {item.status === 'Low Stock' && <Info size={10} />}
                   {config.text}
                 </span>
                 {item.status !== 'Unavailable' && (
                    <button className="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                       Plan Dispatch <ArrowRight size={10} />
                    </button>
                 )}
              </div>
            </div>
          );
        })}
        
        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No items match the current filter.
          </div>
        )}
      </div>

      {/* 3. Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-center">
        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
          <Info size={12} />
          Syncs with Warehouse every 5 mins
        </p>
      </div>
    </div>
  );
};

export default ProductAvailability;
