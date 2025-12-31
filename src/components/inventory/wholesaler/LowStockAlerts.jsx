import React from "react";
import { AlertCircle, BellRing, PackageX, TrendingDown } from "lucide-react";

const LowStockAlerts = () => {
  const alerts = [
    { name: "1L Bottle Case", sku: "WB-1L-CS", status: "Backorder" },
    { name: "500ml Bottle Case", sku: "WB-500-CS", status: "Low Stock" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden animate-[fadeInUp_0.3s_ease-out]">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="p-2 bg-red-50 text-red-600 rounded-lg animate-pulse">
           <BellRing size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Critical Stock Alerts</h3>
          <p className="text-xs text-slate-500">Items requiring immediate attention.</p>
        </div>
      </div>

      {/* Alert List */}
      <ul className="space-y-3">
        {alerts.map((item, idx) => {
          const isBackorder = item.status === "Backorder";
          
          return (
            <li
              key={item.sku}
              className={`
                flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
                ${isBackorder 
                  ? 'bg-red-50/60 border-red-100' 
                  : 'bg-amber-50/60 border-amber-100'}
              `}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isBackorder ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                  {isBackorder ? <PackageX size={18} /> : <TrendingDown size={18} />}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-xs font-mono text-slate-500 bg-white/50 px-1.5 rounded inline-block">
                    SKU: {item.sku}
                  </p>
                </div>
              </div>

              <span className={`
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm
                ${isBackorder 
                  ? 'bg-white text-red-700 border-red-200' 
                  : 'bg-white text-amber-700 border-amber-200'}
              `}>
                <AlertCircle size={14} /> 
                {item.status}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Footer / Read-Only Note */}
      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400 font-medium">
          System generated alerts. These cannot be modified manually.
        </p>
      </div>

    </div>
  );
};

export default LowStockAlerts;
