import React from "react";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Percent, 
  DollarSign, 
  Droplets,
  Activity
} from "lucide-react";

const stats = [
  { 
    label: "Revenue (MTD)", 
    value: "₹18.5L", 
    change: "+12.5%", 
    trend: "up",
    icon: Wallet,
    color: "indigo"
  },
  { 
    label: "Operating Cost", 
    value: "₹11.2L", 
    change: "-4.2%", 
    trend: "down", // down is good for cost
    icon: Activity,
    color: "rose"
  },
  { 
    label: "Gross Margin", 
    value: "39.4%", 
    change: "+3.1%", 
    trend: "up",
    icon: Percent,
    color: "emerald"
  },
  { 
    label: "Net Profit", 
    value: "₹5.6L", 
    change: "+18.2%", 
    trend: "up",
    icon: DollarSign,
    color: "blue"
  },
  { 
    label: "Cost per Liter", 
    value: "₹2.35", 
    change: "-6.5%", 
    trend: "down", // down is good
    icon: Droplets,
    color: "amber"
  },
];

const FinancialKPIGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        
        // Dynamic styling based on 'good' direction
        // For costs, down is good (green), up is bad (red)
        // For profits, up is good (green), down is bad (red)
        const isCostMetric = ["Operating Cost", "Cost per Liter"].includes(s.label);
        const isPositiveChange = s.change.startsWith("+");
        
        let changeColor = "text-emerald-600 bg-emerald-50";
        if (isCostMetric) {
             changeColor = isPositiveChange ? "text-rose-600 bg-rose-50" : "text-emerald-600 bg-emerald-50";
        } else {
             changeColor = isPositiveChange ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50";
        }

        const iconColors = {
            indigo: "bg-indigo-50 text-indigo-600",
            rose: "bg-rose-50 text-rose-600",
            emerald: "bg-emerald-50 text-emerald-600",
            blue: "bg-blue-50 text-blue-600",
            amber: "bg-amber-50 text-amber-600",
        };

        return (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            {/* Header: Icon + Label */}
            <div className="flex items-start justify-between mb-3">
               <div className={`p-2 rounded-lg ${iconColors[s.color]}`}>
                  <Icon size={18} />
               </div>
               {/* Optional: Add a sparkline or mini indicator here if needed */}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {s.label}
              </p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-slate-800 leading-none">
                  {s.value}
                </p>
              </div>
              
              <div className="mt-3 flex items-center gap-2">
                 <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${changeColor}`}>
                    {s.change.startsWith("+") ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {s.change}
                 </span>
                 <span className="text-[10px] text-slate-400 font-medium">vs last month</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FinancialKPIGrid;
