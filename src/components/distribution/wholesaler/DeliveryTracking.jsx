import React from "react";
import { Truck, MapPin, Clock, Navigation, ShieldCheck } from "lucide-react";

const DeliveryTracking = () => {
  const deliveries = [
    { id: "DEL-1001", route: "Route A - North Sector", status: "In Transit", eta: "2h 15m", progress: 60 },
    { id: "DEL-1002", route: "Route B - Market Hub", status: "Out for Delivery", eta: "45m", progress: 85 },
    { id: "DEL-1005", route: "Route C - Industrial Area", status: "Dispatched", eta: "4h 00m", progress: 20 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden animate-[fadeInUp_0.4s_ease-out]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Truck className="text-indigo-600" size={20} />
            Live Shipment Tracking
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status of your incoming inventory.
          </p>
        </div>

        {/* Read-Only Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-400 uppercase tracking-wide">
          <ShieldCheck size={12} /> Sync Active
        </div>
      </div>

      {/* Delivery List */}
      <div className="space-y-4">
        {deliveries.length > 0 ? (
          deliveries.map((d, idx) => (
            <div
              key={d.id}
              className="relative p-4 border border-slate-200 rounded-xl bg-slate-50/30 hover:bg-white hover:shadow-md hover:border-indigo-100 transition-all duration-300 group"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                {/* ID & Route */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                      <Truck size={16} />
                    </span>
                    <p className="font-bold text-slate-800">{d.id}</p>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 pl-1">
                    <MapPin size={12} /> {d.route}
                  </p>
                </div>

                {/* Status & ETA */}
                <div className="text-right">
                  <span className={`
                    inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1
                    ${d.status === 'Out for Delivery' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}
                  `}>
                    <Navigation size={10} /> {d.status}
                  </span>
                  <p className="text-xs font-semibold text-slate-600 flex items-center justify-end gap-1">
                    <Clock size={12} className="text-slate-400" /> 
                    <span className="text-indigo-600">ETA: {d.eta}</span>
                  </p>
                </div>
              </div>

              {/* Progress Bar (Visual Only) */}
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${d.status === 'Out for Delivery' ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                  style={{ width: `${d.progress}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            No active shipments at the moment.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Delivery data is synced live from logistics.
      </div>
    </div>
  );
};

export default DeliveryTracking;
