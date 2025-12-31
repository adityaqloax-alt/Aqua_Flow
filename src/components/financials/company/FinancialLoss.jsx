import React from "react";
import { AlertTriangle, TrendingDown } from "lucide-react";

const losses = [
  { label: "Leakage Cost", value: 120000, formatted: "₹1.2L", severity: "critical" },
  { label: "Damaged Inventory", value: 85000, formatted: "₹85K", severity: "high" },
  { label: "Quality Rejection", value: 42000, formatted: "₹42K", severity: "medium" },
  { label: "Expired Stock", value: 30000, formatted: "₹30K", severity: "low" },
];

const FinancialLoss = () => {
  const totalLoss = losses.reduce((acc, curr) => acc + curr.value, 0);

  // Helper for severity styles
  const getSeverityColor = (level) => {
    switch (level) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-amber-400";
      default: return "bg-slate-400";
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Loss Analysis
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Breakdown of operational losses
          </p>
        </div>
        <div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-right">
           <p className="text-xs font-semibold uppercase tracking-wider">Total Impact</p>
           <p className="text-lg font-bold">₹{(totalLoss / 100000).toFixed(2)}L</p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-5">
        {losses.map((item, idx) => {
          // Calculate percentage for progress bar width
          const percent = Math.round((item.value / totalLoss) * 100);
          
          return (
            <div key={idx} className="group">
              <div className="flex justify-between items-end mb-1">
                <div className="flex items-center gap-2">
                   {item.severity === 'critical' && <AlertTriangle size={14} className="text-red-500" />}
                   <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                </div>
                <div className="text-right">
                   <span className="text-sm font-bold text-slate-800">{item.formatted}</span>
                   <span className="text-xs text-slate-400 ml-2">({percent}%)</span>
                </div>
              </div>
              
              {/* Progress Bar Background */}
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                {/* Active Progress */}
                <div 
                   className={`h-full rounded-full ${getSeverityColor(item.severity)} transition-all duration-500`} 
                   style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Recommendation */}
      <div className="mt-6 p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-start gap-3">
         <div className="p-1.5 bg-white rounded-md shadow-sm text-slate-400">
            <TrendingDown size={16} />
         </div>
         <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700">Insight:</span> Leakage accounts for <span className="font-bold text-red-600">43%</span> of total losses. Prioritize maintenance on Line B piping to reduce this by approx. ₹50k.
         </p>
      </div>
    </div>
  );
};

export default FinancialLoss;
