import React from "react";
import { ShoppingCart, CheckCircle, Clock, Wallet, ArrowUpRight } from "lucide-react";

const KPICards = () => {
  const kpis = [
    { 
      label: "Total Orders", 
      value: 128, 
      subtext: "+12 this month",
      icon: ShoppingCart, 
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "hover:border-indigo-200"
    },
    { 
      label: "Delivered", 
      value: 102, 
      subtext: "98% On Time",
      icon: CheckCircle, 
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "hover:border-emerald-200"
    },
    { 
      label: "Pending", 
      value: 26, 
      subtext: "Expected by Fri",
      icon: Clock, 
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "hover:border-amber-200"
    },
    { 
      label: "Amount Due", 
      value: "₹ 1,24,500", 
      subtext: "Due in 5 days",
      icon: Wallet, 
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "hover:border-rose-200"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-[fadeInUp_0.4s_ease-out]">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        
        return (
          <div
            key={kpi.label}
            className={`
              group relative bg-white border border-slate-200 rounded-xl p-5 
              flex items-start gap-4 transition-all duration-300
              hover:shadow-lg hover:-translate-y-1 ${kpi.border}
            `}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Icon Box */}
            <div className={`p-3.5 rounded-xl transition-colors ${kpi.bg} ${kpi.color}`}>
              <Icon size={22} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                {kpi.label}
              </p>
              <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                {kpi.value}
              </h3>
              <p className="text-[10px] font-medium text-slate-400 mt-1 flex items-center gap-1">
                {kpi.subtext}
              </p>
            </div>

            {/* Hover Decorator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300">
              <ArrowUpRight size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
