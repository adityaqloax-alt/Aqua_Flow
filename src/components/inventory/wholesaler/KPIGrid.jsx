import React from "react";
import { 
  Droplets, 
  IndianRupee, 
  Truck, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp
} from "lucide-react";

const KPIGrid = () => {
  const kpiData = [
    {
      id: 1,
      title: "Water Processed",
      value: "12,450 L",
      subtext: "Shift A + B",
      trend: "+8.2%",
      trendUp: true,
      icon: Droplets,
      color: "blue", // Water theme
      footer: "Target: 12,000 L"
    },
    {
      id: 2,
      title: "Today's Revenue",
      value: "₹ 48,250",
      subtext: "42 Invoices generated",
      trend: "+12.5%",
      trendUp: true,
      icon: IndianRupee,
      color: "emerald", // Money theme
      footer: "Avg Order: ₹ 1,150"
    },
    {
      id: 3,
      title: "Empty Jars Returned",
      value: "842 / 900",
      subtext: "93.5% Return Rate",
      trend: "-2.1%",
      trendUp: false, // Negative because we want 100% return
      icon: RefreshCw,
      color: "indigo", // Logistics/Cycle theme
      footer: "58 Jars Missing"
    },
    {
      id: 4,
      title: "Pending Dispatches",
      value: "14 Orders",
      subtext: "Est. Load: 380 Units",
      trend: "High Load",
      trendUp: null, // Neutral/Warning
      icon: Truck,
      color: "amber", // Warning/Action theme
      footer: "Next Truck: 20 mins"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {kpiData.map((kpi) => {
        // Color Mapping for Dynamic Styles
        const colorStyles = {
          blue: "bg-blue-50 text-blue-600 border-blue-100 ring-blue-500/20",
          emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-500/20",
          indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 ring-indigo-500/20",
          amber: "bg-amber-50 text-amber-600 border-amber-100 ring-amber-500/20",
        };

        const activeStyle = colorStyles[kpi.color];

        return (
          <div 
            key={kpi.id} 
            className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Decoration Icon */}
            <div className={`absolute -right-4 -top-4 opacity-[0.05] transition-transform group-hover:scale-110 group-hover:rotate-12`}>
              <kpi.icon size={100} />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
              {/* Icon Box */}
              <div className={`p-3 rounded-xl border ${activeStyle} shadow-sm`}>
                <kpi.icon size={22} strokeWidth={2.5} />
              </div>

              {/* Trend Indicator */}
              {kpi.trendUp !== null ? (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border ${kpi.trendUp ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                  {kpi.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.trend}
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  <TrendingUp size={12} /> {kpi.trend}
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <h3 className="text-slate-500 text-sm font-medium tracking-wide uppercase mb-1">{kpi.title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</span>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-slate-100 w-full my-3"></div>

              {/* Footer Details */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">{kpi.subtext}</span>
                <span className={`font-bold ${kpi.trendUp === false ? 'text-rose-600' : 'text-slate-600'}`}>
                   {kpi.footer}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPIGrid;
