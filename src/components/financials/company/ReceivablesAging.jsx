import React from "react";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";

const aging = [
  { range: "0–30 Days", amount: 320000, formatted: "₹3.2L", status: "healthy" },
  { range: "31–60 Days", amount: 160000, formatted: "₹1.6L", status: "warning" },
  { range: "60+ Days", amount: 90000, formatted: "₹0.9L", status: "critical" },
];

const ReceivablesAging = () => {
  const totalReceivables = aging.reduce((acc, curr) => acc + curr.amount, 0);

  // Helper for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "healthy": return "bg-emerald-500";
      case "warning": return "bg-amber-500";
      case "critical": return "bg-rose-500";
      default: return "bg-slate-400";
    }
  };

  const getStatusIcon = (status) => {
     switch (status) {
      case "healthy": return <CheckCircle2 size={16} className="text-emerald-500" />;
      case "warning": return <Clock size={16} className="text-amber-500" />;
      case "critical": return <AlertCircle size={16} className="text-rose-500" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Receivables Aging
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Outstanding invoices by age
          </p>
        </div>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
           <Clock size={20} />
        </div>
      </div>

      {/* List */}
      <div className="space-y-6 flex-1">
        {aging.map((item, i) => {
          const percent = Math.round((item.amount / totalReceivables) * 100);
          
          return (
            <div key={i} className="group">
              {/* Row Top: Label + Amount */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                   {getStatusIcon(item.status)}
                   <span className="font-semibold text-slate-700 text-sm">{item.range}</span>
                </div>
                <div className="text-right">
                   <span className="font-bold text-slate-800 text-sm">{item.formatted}</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full rounded-full ${getStatusColor(item.status)} transition-all duration-1000 ease-out`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Tooltip / Percentage (Hidden by default, visible on group hover could be added, but showing always for dashboard) */}
              <div className="mt-1 flex justify-end">
                 <span className="text-[10px] font-medium text-slate-400">{percent}% of total</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Summary */}
      <div className="mt-6 pt-4 border-t border-slate-50 text-center">
         <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">Total Outstanding</p>
         <p className="text-2xl font-bold text-slate-800">
            ₹{(totalReceivables / 100000).toFixed(2)}L
         </p>
      </div>

    </div>
  );
};

export default ReceivablesAging;
