import React from "react";
import { AlertCircle, BellRing, PackageX, TrendingDown, ArrowRight, RefreshCw, Clock } from "lucide-react";

const LowStockAlerts = () => {
  const alerts = [
    { name: "1L Bottle Case", sku: "WB-1L-CS", status: "Backorder", daysLeft: 0, requested: false },
    { name: "500ml Bottle Case", sku: "WB-500-CS", status: "Low Stock", daysLeft: 2, requested: true },
    { name: "20L Jar Caps", sku: "JC-20L", status: "Low Stock", daysLeft: 4, requested: false },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
           <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl animate-pulse shadow-sm shadow-rose-100">
              <BellRing size={20} />
           </div>
           <div>
             <h3 className="text-lg font-bold text-slate-800">Critical Stock Alerts</h3>
             <p className="text-xs text-slate-500 font-medium">3 items require immediate attention</p>
           </div>
        </div>
        <button className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
           View All <ArrowRight size={14} />
        </button>
      </div>

      {/* Alert List */}
      <ul className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {alerts.map((item, idx) => {
          const isCritical = item.status === "Backorder";
          
          return (
            <li
              key={item.sku}
              className={`
                group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:shadow-md
                ${isCritical ? 'bg-rose-50/40 border-rose-100' : 'bg-amber-50/40 border-amber-100'}
              `}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className={`p-2.5 rounded-xl shadow-sm ${isCritical ? 'bg-white text-rose-600' : 'bg-white text-amber-600'}`}>
                  {isCritical ? <PackageX size={18} /> : <TrendingDown size={18} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                     <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                     {isCritical && <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping"/>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                     <p className="text-[10px] font-mono text-slate-500 bg-white/60 px-1.5 rounded border border-slate-100/50">
                       {item.sku}
                     </p>
                     <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> {item.daysLeft === 0 ? "Out of Stock" : `${item.daysLeft} days coverage`}
                     </span>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                 {item.requested ? (
                    <span className="flex-1 sm:flex-none text-center text-[10px] font-bold bg-white text-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm flex items-center justify-center gap-1">
                       <RefreshCw size={12} className="animate-spin-slow" /> Request Sent
                    </span>
                 ) : (
                    <button className={`
                       flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm transition-all active:scale-95
                       ${isCritical 
                         ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200' 
                         : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200'}
                    `}>
                       <RefreshCw size={12} /> Restock Now
                    </button>
                 )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer / Read-Only Note */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
          <AlertCircle size={12} />
          Auto-generated based on current sales velocity.
        </p>
      </div>

    </div>
  );
};

export default LowStockAlerts;
