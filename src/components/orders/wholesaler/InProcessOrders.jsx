import React, { useState, useEffect } from "react";
import { 
  Loader2, Clock, Truck, MapPin, Eye, AlertCircle, CheckCircle, 
  Calendar, Package, ArrowRight, Filter, Search 
} from "lucide-react";

const InProcessOrders = () => {
  // Enhanced Mock Data (Wholesaler-Safe Only)
  const [orders, setOrders] = useState([
    { 
      id: 1015, 
      status: "Production", 
      eta: "Today, 4:00 PM", 
      etaConfidence: "on_track", 
      progress: 30, 
      delayReason: null,
      location: null,
      products: [{ name: "20L Water Jar", qty: 120 }],
      updated: Date.now()
    },
    { 
      id: 1014, 
      status: "Out for Delivery", 
      eta: "Today, 6:30 PM", 
      etaConfidence: "slight_delay", 
      progress: 80, 
      delayReason: "Traffic congestion",
      location: "En route to Central Area",
      products: [{ name: "1L Water Bottle", qty: 600 }],
      updated: Date.now() - 1000 * 60 * 5
    },
    { 
      id: 1013, 
      status: "Dispatched", 
      eta: "Tomorrow Morning", 
      etaConfidence: "on_track", 
      progress: 60, 
      delayReason: null,
      location: null,
      products: [{ name: "20L Water Jar", qty: 200 }],
      updated: Date.now() - 1000 * 60 * 15
    }
  ]);

  // State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({ search: "", status: "" });

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate status updates
      setOrders(prev => prev.map(order => {
        if (order.status === "Production" && Math.random() > 0.7) {
          return { ...order, status: "Dispatched", progress: 60, updated: Date.now() };
        }
        if (order.status === "Dispatched" && Math.random() > 0.8) {
          return { ...order, status: "Out for Delivery", progress: 80, updated: Date.now() };
        }
        return order;
      }));
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Status to Progress Mapping (Rule-Based)
  const getProgressFromStatus = (status) => {
    const progressMap = {
      "Confirmed": 10,
      "Production": 30,
      "Dispatched": 60,
      "Out for Delivery": 80,
      "Delivered": 100
    };
    return progressMap[status] || 0;
  };

  // Filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toString().includes(filters.search) || 
                         order.products.some(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesStatus = !filters.status || order.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const getStatusConfig = (status) => {
    const config = {
      "Production": { color: "amber", icon: Loader2, bg: "bg-amber-50", text: "text-amber-700" },
      "Dispatched": { color: "blue", icon: Truck, bg: "bg-blue-50", text: "text-blue-700" },
      "Out for Delivery": { color: "indigo", icon: Truck, bg: "bg-indigo-50", text: "text-indigo-700" }
    };
    return config[status] || config["Production"];
  };

  const getETAConfidenceColor = (confidence) => {
    const colors = {
      "on_track": "text-emerald-600 bg-emerald-50 border-emerald-200",
      "slight_delay": "text-amber-600 bg-amber-50 border-amber-200", 
      "delayed": "text-red-600 bg-red-50 border-red-200"
    };
    return colors[confidence] || colors["on_track"];
  };

  return (
    <div className="space-y-6">
      {/* Live Header */}
      <div className="p-6 bg-gradient-to-r from-amber-50 via-blue-50 to-indigo-50 border border-slate-100 rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <Loader2 className="text-amber-500 animate-spin-slow" size={28} />
              Live Order Tracking
            </h3>
            <p className="text-slate-600 mt-1 flex items-center gap-2">
              <span>{filteredOrders.length}</span> active shipments • Auto-refreshing
            </p>
          </div>
          
          {/* Read-Only Rule Badge */}
          <span className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full border border-slate-200 shadow-sm whitespace-nowrap">
            🔒 Live Read-Only Tracking
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search Order # or Products..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="Production">Production</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Out for Delivery">Out for Delivery</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-slate-500 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Progress</th>
                <th className="py-4 px-6">ETA</th>
                <th className="py-4 px-6 text-right">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const Icon = statusConfig.icon;
                
                return (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-all group">
                    {/* Order ID - Clickable */}
                    <td className="py-4 px-6">
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-2 group/item"
                      >
                        #{order.id}
                        <Eye size={14} className="opacity-0 group-hover:opacity-100 transition-all ml-1" />
                      </button>
                    </td>

                    {/* Status + Progress Bar */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        {/* Status Badge */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${statusConfig.bg} ${statusConfig.text} border`}>
                          <Icon size={12} className={order.status === "Production" ? "animate-spin" : ""} />
                          {order.status}
                        </span>
                        
                        {/* Progress Bar */}
                        <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${statusConfig.color === 'amber' ? 'bg-amber-500' : statusConfig.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'}`} 
                            style={{ width: `${getProgressFromStatus(order.status)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400">{getProgressFromStatus(order.status)}% Complete</p>
                      </div>
                    </td>

                    {/* ETA + Confidence */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Clock size={14} className="text-slate-400" />
                          {order.eta}
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${getETAConfidenceColor(order.etaConfidence)}`}>
                          {order.etaConfidence === "on_track" && <CheckCircle size={10} />}
                          {order.etaConfidence === "slight_delay" && <AlertCircle size={10} />}
                          {order.etaConfidence === "delayed" && <AlertCircle size={10} />}
                          {order.etaConfidence.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </td>

                    {/* Location (Out for Delivery Only) */}
                    <td className="py-4 px-6 text-right">
                      {order.status === "Out for Delivery" ? (
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full">
                          <MapPin size={14} />
                          <span>{order.location}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                      
                      {order.delayReason && (
                        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                          <AlertCircle size={12} />
                          <span className="ml-1">{order.delayReason}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-slate-500 bg-slate-50/50 border-t border-slate-200">
            <Package className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No active orders</h3>
            <p className="text-sm">All your orders have been delivered or are pending confirmation.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <Package className="text-indigo-600" size={28} />
                    Order #{selectedOrder.id}
                  </h4>
                  <p className="text-slate-600 mt-1">
                    Status: <span className="font-semibold capitalize">{selectedOrder.status}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Products */}
              <div>
                <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  Ordered Items
                </h5>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-bold text-slate-800">{product.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{product.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
                <div>
                  <p className="text-sm text-slate-500 mb-2 flex items-center gap-2">
                    <Clock size={16} />
                    Estimated Delivery
                  </p>
                  <p className="text-xl font-bold text-indigo-700">{selectedOrder.eta}</p>
                </div>
                {selectedOrder.status === "Out for Delivery" && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      Current Location
                    </p>
                    <p className="font-semibold text-indigo-700">{selectedOrder.location}</p>
                  </div>
                )}
              </div>

              {/* SLA */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                  <CheckCircle size={16} />
                  SLA: Delivery within 24 hours • Last updated {new Date(selectedOrder.updated).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InProcessOrders;
