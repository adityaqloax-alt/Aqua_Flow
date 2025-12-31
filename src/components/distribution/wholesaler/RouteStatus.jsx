import React from "react";
import { Route, Truck, AlertTriangle, CheckCircle, Info } from "lucide-react";

const RouteStatus = () => {
  const routes = [
    { name: "Route A - City Center", driver: "Driver #402 (Ramesh)", status: "On Schedule" },
    { name: "Route B - North Zone", driver: "Driver #405 (Suresh)", status: "Delayed" },
    { name: "Route C - West Hub", driver: "Pending Assignment", status: "Scheduled" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden animate-[fadeInUp_0.5s_ease-out]">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <Route size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Supply Routes</h3>
          <p className="text-xs text-slate-500">Current status of your supply chain lanes.</p>
        </div>
      </div>

      {/* Route List */}
      <ul className="space-y-3">
        {routes.map((r, idx) => {
          const isDelayed = r.status === "Delayed";
          const isScheduled = r.status === "Scheduled";

          return (
            <li
              key={idx}
              className={`
                flex items-center justify-between p-4 border rounded-xl transition-all duration-300 hover:shadow-sm
                ${isDelayed 
                  ? 'bg-amber-50/50 border-amber-100' 
                  : 'bg-white border-slate-100 hover:border-indigo-100'}
              `}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Route Info */}
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${isDelayed ? 'text-amber-500' : 'text-slate-400'}`}>
                  <Truck size={16} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {r.driver}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                {isDelayed ? (
                  <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                    <AlertTriangle size={12} /> Delayed
                  </span>
                ) : isScheduled ? (
                   <span className="inline-flex items-center gap-1.5 text-slate-500 font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    <Info size={12} /> Scheduled
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <CheckCircle size={12} /> On Schedule
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer Note */}
      <div className="mt-5 pt-4 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400">
          Route logistics are managed centrally. Contact dispatch for urgent changes.
        </p>
      </div>
    </div>
  );
};

export default RouteStatus;
