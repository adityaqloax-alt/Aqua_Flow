import React, { useState } from "react";
import { 
  Route, Truck, AlertTriangle, CheckCircle, Info, MapPin, 
  Phone, Clock, Package, IndianRupee, ChevronDown, ChevronUp,
  UserCheck, BatteryLow, Navigation, MessageCircle
} from "lucide-react";

const RouteStatus = () => {
  const [expandedRoutes, setExpandedRoutes] = useState(new Set());
  const [filter, setFilter] = useState("all");

  const routes = [
    {
      id: "route-a",
      name: "Route A - City Center",
      driver: "Ramesh K. (#402)",
      driverPhone: "+91 98765 43210",
      truck: "TRK-500L-#A12",
      capacityLeft: "350/500L",
      status: "On Schedule",
      eta: "2h 15m",
      orders: { total: 22, delivered: 18, pending: 4, cancelled: 0 },
      revenue: { collected: 18400, pending: 2300 },
      customers: [
        { name: "Hotel Taj", status: "Delivered", priority: "Urgent" },
        { name: "Apollo Hospital", status: "Pending", priority: "Subscription" },
        { name: "City Mall", status: "Delivered", priority: "Regular" }
      ],
      lastUpdate: "15 mins ago"
    },
    {
      id: "route-b",
      name: "Route B - North Zone",
      driver: "Suresh M. (#405)",
      driverPhone: "+91 87654 32109",
      truck: "TRK-1000L-#B45",
      capacityLeft: "120/1000L ⚠️",
      status: "Delayed",
      eta: "4h 30m (+1h 15m)",
      orders: { total: 28, delivered: 15, pending: 12, cancelled: 1 },
      revenue: { collected: 24500, pending: 5800 },
      customers: [
        { name: "North Plaza", status: "Pending", priority: "Urgent" },
        { name: "Green Park Apartments", status: "Delayed", priority: "Subscription" }
      ],
      lastUpdate: "8 mins ago",
      delayReason: "Traffic Jam"
    },
    {
      id: "route-c",
      name: "Route C - West Hub",
      driver: "Pending Assignment",
      driverPhone: "",
      truck: "TRK-500L-#C78",
      capacityLeft: "500/500L",
      status: "Scheduled",
      eta: "Starts 9:30 AM",
      orders: { total: 15, delivered: 0, pending: 15, cancelled: 0 },
      revenue: { collected: 0, pending: 11200 },
      customers: [
        { name: "West End School", status: "Pending", priority: "Subscription" },
        { name: "Industrial Park", status: "Pending", priority: "Regular" }
      ],
      lastUpdate: "45 mins ago"
    }
  ];

  const filteredRoutes = routes.filter(route => {
    if (filter === "all") return true;
    if (filter === "delayed") return route.status === "Delayed";
    if (filter === "on-schedule") return route.status === "On Schedule";
    if (filter === "scheduled") return route.status === "Scheduled";
    return true;
  });

  const toggleRoute = (routeId) => {
    const newExpanded = new Set(expandedRoutes);
    if (newExpanded.has(routeId)) {
      newExpanded.delete(routeId);
    } else {
      newExpanded.add(routeId);
    }
    setExpandedRoutes(newExpanded);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Delayed": return { color: "text-amber-600 bg-amber-50 border-amber-100", icon: AlertTriangle };
      case "Scheduled": return { color: "text-slate-500 bg-slate-100 border-slate-200", icon: Info };
      default: return { color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in zoom-in duration-500">
      
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Route className="text-indigo-600" size={24} />
              Live Route Status
            </h3>
            <p className="text-sm text-slate-500 mt-1">Real-time tracking for all supply routes</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg text-xs">
            {["all", "delayed", "on-schedule", "scheduled"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 font-bold rounded-md transition-all ${
                  filter === f 
                    ? "bg-white shadow-sm text-slate-800" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {f === "all" ? "All" : f === "delayed" ? "Delayed" : f === "on-schedule" ? "Active" : "Scheduled"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ROUTE LIST */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {filteredRoutes.map((route) => {
          const StatusIcon = getStatusConfig(route.status).icon;
          const statusConfig = getStatusConfig(route.status);
          const isExpanded = expandedRoutes.has(route.id);

          return (
            <div key={route.id} className="w-full">
              {/* COLLAPSED ROUTE CARD */}
              <div 
                className={`
                  p-5 rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer
                  ${statusConfig.color} ${route.status === "Delayed" ? "ring-2 ring-amber-200/50" : ""}
                `}
                onClick={() => toggleRoute(route.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* LEFT: ROUTE INFO */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-indigo-100 rounded-xl">
                        <Truck size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-800 truncate">{route.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          <span className="font-mono">{route.truck}</span>
                          <span className="flex items-center gap-1">
                            <BatteryLow size={14} className="text-amber-500" />
                            {route.capacityLeft}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ORDERS SUMMARY */}
                    <div className="flex items-center gap-6 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Package size={14} /> {route.orders.total} Orders
                      </div>
                      <div className="flex items-center gap-1 font-mono">
                        <IndianRupee size={14} /> {route.revenue.collected.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} /> ETA: {route.eta}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: STATUS & DRIVER */}
                  <div className="flex flex-col items-end gap-3 min-w-[140px]">
                    {/* STATUS BADGE */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border shadow-sm ${statusConfig.color}`}>
                      <StatusIcon size={14} />
                      {route.status}
                    </div>

                    {/* DRIVER ACTION */}
                    {route.driver !== "Pending Assignment" ? (
                      <div className="flex items-center gap-2 p-2 bg-slate-50/50 rounded-lg">
                        <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Phone size={16} />
                        </button>
                        <span className="text-xs font-medium text-slate-700 truncate max-w-[100px]">
                          {route.driver}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded-full">
                        Assign Driver
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {isExpanded && (
                <div className="mt-3 p-5 bg-slate-50/50 rounded-2xl border border-slate-200 animate-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    {/* ORDERS BREAKDOWN */}
                    <div className="space-y-2">
                      <h5 className="font-bold text-sm text-slate-700 flex items-center gap-2">
                        <Package size={16} /> Orders Breakdown
                      </h5>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-bold text-emerald-600 text-lg">{route.orders.delivered}</div>
                          <div className="text-slate-500">Delivered</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-bold text-amber-600 text-lg">{route.orders.pending}</div>
                          <div className="text-slate-500">Pending</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-bold text-slate-600 text-lg">{route.orders.cancelled}</div>
                          <div className="text-slate-500">Cancelled</div>
                        </div>
                      </div>
                    </div>

                    {/* REVENUE */}
                    <div className="space-y-2">
                      <h5 className="font-bold text-sm text-slate-700 flex items-center gap-2">
                        <IndianRupee size={16} /> Revenue Today
                      </h5>
                      <div className="p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                        <div className="text-2xl font-bold text-emerald-700">₹{route.revenue.collected.toLocaleString()}</div>
                        <div className="text-xs text-emerald-600 flex items-center gap-1">
                          Pending: ₹{route.revenue.pending.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* NEXT ACTIONS */}
                    <div className="space-y-2">
                      <h5 className="font-bold text-sm text-slate-700">Next Actions</h5>
                      <div className="flex gap-2">
                        <button className="flex-1 p-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <Navigation size={14} /> Track Live
                        </button>
                        <button className="flex-1 p-2 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <MessageCircle size={14} /> Notify
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CUSTOMER LIST */}
                  <div>
                    <h5 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      Recent Deliveries ({route.customers.length})
                    </h5>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {route.customers.slice(0, 4).map((customer, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              customer.status === "Delivered" ? "bg-emerald-500" :
                              customer.status === "Pending" ? "bg-amber-500" : "bg-slate-500"
                            }`} />
                            <span className="font-medium text-sm">{customer.name}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            customer.priority === "Urgent" ? "bg-rose-100 text-rose-700" :
                            customer.priority === "Subscription" ? "bg-indigo-100 text-indigo-700" :
                            "bg-slate-100 text-slate-700"
                          }`}>
                            {customer.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {route.delayReason && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="flex items-center gap-2 text-sm text-amber-800">
                        <AlertTriangle size={16} />
                        <span>Delay Reason: {route.delayReason}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredRoutes.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-8 text-slate-400">
            <div className="text-center">
              <Route size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No routes match this filter</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 text-center">
        GPS updates every 30 seconds • Last sync: 2 mins ago
      </div>
    </div>
  );
};

export default RouteStatus;
