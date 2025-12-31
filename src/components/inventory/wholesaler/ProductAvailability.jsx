import React from "react";
import { CheckCircle, XCircle, Package, Activity, Info } from "lucide-react";

const ProductAvailability = () => {
  // Enhanced data to meet "View quantity" rule
  const items = [
    { name: "20L Water Jar", qty: 450, status: "Available" },
    { name: "1L Bottle (Case)", qty: 0, status: "Unavailable" },
    { name: "500ml Bottle (Case)", qty: 120, status: "Available" },
    { name: "300ml Mini (Case)", qty: 15, status: "Low Stock" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden animate-[fadeInUp_0.3s_ease-out]">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity className="text-indigo-600" size={20} />
            Production Capacity
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Current stock status for immediate dispatch.
          </p>
        </div>
        
        {/* Rule Badge */}
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-400 rounded uppercase tracking-wide">
          <Info size={10} /> Live View
        </span>
      </div>

      {/* List */}
      <ul className="space-y-3">
        {items.map((item, idx) => {
          const isUnavailable = item.status === "Unavailable";
          const isLow = item.status === "Low Stock";

          return (
            <li
              key={idx}
              className={`
                flex items-center justify-between px-4 py-3.5 border rounded-xl transition-all duration-300
                hover:shadow-md hover:border-indigo-100 hover:bg-slate-50/50 group
              `}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isUnavailable ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600'}`}>
                  <Package size={18} />
                </div>
                <div>
                  <p className={`font-semibold ${isUnavailable ? 'text-slate-400' : 'text-slate-800'}`}>
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    Qty: <span className={isUnavailable ? '' : 'text-slate-700 font-bold'}>{item.qty}</span> units
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                {isUnavailable ? (
                  <span className="inline-flex items-center gap-1.5 text-red-500 font-bold text-xs bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                    <XCircle size={14} /> Unavailable
                  </span>
                ) : isLow ? (
                  <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                    <Activity size={14} /> Low Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <CheckCircle size={14} /> Available
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer / Disclaimer */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <p className="text-[11px] text-slate-400 text-center">
          * Availability reflects confirmed production output. Updated hourly.
        </p>
      </div>
    </div>
  );
};

export default ProductAvailability;
