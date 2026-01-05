import React, { useState } from "react";
import { 
  Truck, MapPin, Clock, Navigation, ShieldCheck, Search, Filter,
  BatteryLow, Package, User, Phone, MessageCircle, X, ChevronDown,
  AlertTriangle, CheckCircle2, Droplets, AlertCircle, Map
} from "lucide-react";

const DeliveryTracking = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDeliveries, setExpandedDeliveries] = useState(new Set());
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [mapModal, setMapModal] = useState(false);

  const deliveries = [
    {
      id: "DEL-1001",
      route: "Route A - North Sector",
      driver: { name: "Ramesh K. (#402)", phone: "+91 98765 43210", photo: "👨" },
      truck: "TRK-500L-#A12",
      status: "Out for Delivery",
      eta: "45m",
      etaConfidence: "high",
      progress: 85,
      loaded: "450L",
      remaining: "120L ⚠️",
      jars: { full: 22, emptyReturned: 18, breakage: 0 },
      orders: { total: 22, completed: 18, pending: 4 },
      nextStop: "Hotel Taj Palace (2.5km)",
      customers: [
        { name: "Hotel Taj Palace", status: "Pending", priority: "Urgent" },
        { name: "Apollo Hospital", status: "Delivered", priority: "Subscription" }
      ],
      alerts: ["Low water capacity"],
      lastUpdate: "2 mins ago"
    },
    {
      id: "DEL-1002",
      route: "Route B - Market Hub",
      driver: { name: "Suresh M. (#405)", phone: "+91 87654 32109", photo: "👨‍🦱" },
      truck: "TRK-1000L-#B45",
      status: "In Transit",
      eta: "2h 15m",
      etaConfidence: "medium",
      progress: 60,
      loaded: "850L",
      remaining: "520L",
      jars: { full: 42, emptyReturned: 28, breakage: 2 },
      orders: { total: 28, completed: 15, pending: 12 },
      nextStop: "City Mall (8.2km)",
      customers: [
        { name: "City Mall", status: "Pending", priority: "Regular" },
        { name: "North Plaza", status: "Pending", priority: "Urgent" }
      ],
      alerts: ["Minor breakage reported"],
      lastUpdate: "5 mins ago"
    },
    {
      id: "DEL-1005",
      route: "Route C - Industrial Area",
      driver: { name: "Pending Assignment", phone: "", photo: "" },
      truck: "TRK-500L-#C78",
      status: "Dispatched",
      eta: "4h 00m",
      etaConfidence: "low",
      progress: 20,
      loaded: "500L",
      remaining: "500L",
      jars: { full: 25, emptyReturned: 0, breakage: 0 },
      orders: { total: 15, completed: 0, pending: 15 },
      nextStop: "Industrial Park (12.5km)",
      customers: [
        { name: "Industrial Park", status: "Pending", priority: "Regular" }
      ],
      alerts: ["Driver assignment pending"],
      lastUpdate: "45 mins ago"
    }
  ];

  // Filter Logic
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "in-transit") return matchesSearch && delivery.status === "In Transit";
    if (filter === "out-for-delivery") return matchesSearch && delivery.status === "Out for Delivery";
    if (filter === "dispatched") return matchesSearch && delivery.status === "Dispatched";
    if (filter === "alerts") return matchesSearch && delivery.alerts.length > 0;
    return matchesSearch;
  });

  const toggleDelivery = (deliveryId) => {
    const newExpanded = new Set(expandedDeliveries);
    if (newExpanded.has(deliveryId)) {
      newExpanded.delete(deliveryId);
    } else {
      newExpanded.add(deliveryId);
    }
    setExpandedDeliveries(newExpanded);
  };

  const openMapModal = (delivery) => {
    setSelectedDelivery(delivery);
    setMapModal(true);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Out for Delivery": return { color: "text-emerald-600 bg-emerald-50", icon: CheckCircle2, confidence: "✅ On Time" };
      case "In Transit": return { color: "text-blue-600 bg-blue-50", icon: Navigation, confidence: "⚠️ Medium Risk" };
      case "Dispatched": return { color: "text-indigo-600 bg-indigo-50", icon: Truck, confidence: "⏳ Low Confidence" };
      default: return { color: "text-slate-500 bg-slate-50", icon: Clock, confidence: "—" };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in zoom-in duration-500">
      
      {/* HEADER & FILTERS */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Truck className="text-indigo-600" size={24} />
              Live Delivery Tracking
            </h3>
            <p className="text-sm text-slate-500">Real-time status of incoming shipments</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg text-xs">
            {["all", "out-for-delivery", "in-transit", "dispatched", "alerts"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 font-bold rounded-md transition-all whitespace-nowrap ${
                  filter === f 
                    ? "bg-white shadow-sm text-slate-800" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {f === "all" ? "All" : f === "out-for-delivery" ? "Out" : f === "in-transit" ? "Transit" : f === "dispatched" ? "Dispatched" : "Alerts"}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by ID or route..." 
            className="w-full pl-12 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* DELIVERY LIST */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {filteredDeliveries.map((delivery) => {
          const statusConfig = getStatusConfig(delivery.status);
          const StatusIcon = statusConfig.icon;
          const isExpanded = expandedDeliveries.has(delivery.id);

          return (
            <div key={delivery.id} className="w-full">
              {/* COLLAPSED CARD */}
              <div 
                className={`
                  p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden
                  ${statusConfig.color} hover:border-indigo-200
                  ${delivery.alerts.length > 0 ? "ring-2 ring-amber-200/50" : ""}
                `}
                onClick={() => toggleDelivery(delivery.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* LEFT: DELIVERY INFO */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-sm">
                        <Truck size={22} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-800 truncate">{delivery.id}</h4>
                        <p className="text-sm text-slate-600 font-medium truncate">{delivery.route}</p>
                      </div>
                    </div>

                    {/* KEY METRICS */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Droplets size={16} className="text-blue-500" />
                        <span>{delivery.remaining} / {delivery.loaded}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package size={16} />
                        <span>{delivery.orders.total} orders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{delivery.nextStop}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BatteryLow size={16} className="text-amber-500" />
                        <span>{delivery.jars.full} jars</span>
                      </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${statusConfig.color.replace('text-', 'bg-').replace('50', '500')}`} 
                        style={{ width: `${delivery.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* RIGHT: STATUS & DRIVER */}
                  <div className="flex flex-col items-end gap-4 min-w-[160px]">
                    {/* STATUS */}
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm ${statusConfig.color}`}>
                        <StatusIcon size={14} />
                        {delivery.status}
                      </div>
                      <div className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-full ${
                        delivery.etaConfidence === "high" ? "bg-emerald-100 text-emerald-700" :
                        delivery.etaConfidence === "medium" ? "bg-amber-100 text-amber-700" :
                        "bg-rose-100 text-rose-700"
                      }`}>
                        {statusConfig.confidence}
                      </div>
                    </div>

                    {/* DRIVER */}
                    {delivery.driver.name !== "Pending Assignment" ? (
                      <div className="flex items-center gap-2 p-3 bg-white/50 rounded-xl backdrop-blur-sm shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold text-sm">
                          {delivery.driver.photo || delivery.driver.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-800 truncate">{delivery.driver.name}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <button className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
                              <Phone size={14} />
                            </button>
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <MessageCircle size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="px-3 py-2 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                        Assign Driver
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {isExpanded && (
                <div className="mt-4 p-6 bg-slate-50/70 rounded-2xl border border-slate-200 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* JAR & CAPACITY */}
                    <div>
                      <h5 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                        <Droplets size={16} /> Capacity & Jars
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-white rounded-xl shadow-sm">
                          <div className="text-2xl font-bold text-blue-600">{delivery.remaining}</div>
                          <div className="text-xs text-slate-500 mt-1">Remaining</div>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm">
                          <div className="text-2xl font-bold text-emerald-600">{delivery.jars.full}</div>
                          <div className="text-xs text-slate-500 mt-1">Full Jars</div>
                        </div>
                      </div>
                    </div>

                    {/* ORDERS */}
                    <div>
                      <h5 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                        <Package size={16} /> Orders Progress
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed:</span>
                          <span className="font-bold text-emerald-600">{delivery.orders.completed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Pending:</span>
                          <span className="font-bold text-amber-600">{delivery.orders.pending}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Next Stop:</span>
                          <span className="font-bold">{delivery.nextStop}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ALERTS */}
                  {delivery.alerts.length > 0 && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle size={20} className="text-amber-500" />
                        <div>
                          <h6 className="font-bold text-sm text-amber-800">Active Alerts</h6>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {delivery.alerts.map((alert, idx) => (
                              <span key={idx} className="px-2 py-1 bg-amber-200 text-amber-800 text-xs font-bold rounded-full">
                                {alert}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-3 pt-4 border-t border-slate-200">
                    <button 
                      className="flex-1 px-6 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                      onClick={() => openMapModal(delivery)}
                    >
                      <Map size={18} />
                      Track Live
                    </button>
                    <button className="px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2">
                      Notify Customer
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredDeliveries.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12">
            <Truck size={64} className="opacity-30 mb-6" />
            <h3 className="text-xl font-bold mb-2">No Active Deliveries</h3>
            <p className="text-sm mb-8 max-w-md text-center">All shipments are either completed or no new deliveries are scheduled.</p>
          </div>
        )}
      </div>

      {/* MAP MODAL */}
      {mapModal && selectedDelivery && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <Map size={24} className="text-indigo-600" />
                Live Tracking: {selectedDelivery.id}
              </h4>
              <button 
                onClick={() => setMapModal(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-96 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <Truck size={64} className="mx-auto mb-4 text-indigo-500 animate-bounce" />
                <p className="text-lg font-bold">Live GPS Map</p>
                <p className="text-sm mt-1">Google Maps / Mapbox Integration</p>
                <p className="text-xs mt-2 opacity-75">ETA: {selectedDelivery.eta} • Progress: {selectedDelivery.progress}%</p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t">
              <button 
                className="w-full px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                onClick={() => setMapModal(false)}
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center gap-2">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>GPS synced every 30s • Last update: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default DeliveryTracking;
