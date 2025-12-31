import React, { useState } from "react";
import { 
  CheckCircle, FileText, Calendar, PackageCheck, Clock, ArrowRight, 
  Eye, Download, Filter, Search, Star, Truck, MapPin, ExternalLink 
} from "lucide-react";

const DeliveredOrders = () => {
  // Enhanced Mock Data (Wholesaler-Safe Only)
  const orders = [
    { 
      id: 1008, 
      date: "Oct 24, 2024", 
      time: "2:30 PM", 
      items: "120 Units", 
      status: "Delivered", 
      sla: "On Time", 
      location: "Main Store", 
      products: [
        { name: "20L Water Jar", qty: 120, pack: "Single Unit" }
      ],
      podTypes: ["Signed Note", "Driver Signature"]
    },
    { 
      id: 1009, 
      date: "Oct 22, 2024", 
      time: "11:15 AM", 
      items: "50 Cases", 
      status: "Delivered Late", 
      sla: "Late (+2h)", 
      location: "Branch #2", 
      products: [
        { name: "1L Water Bottle", qty: 600, pack: "Case of 12" }
      ],
      podTypes: ["Signed Note", "Warehouse Stamp"]
    },
    { 
      id: 1012, 
      date: "Oct 18, 2024", 
      time: "4:45 PM", 
      items: "200 Jars", 
      status: "Delivered", 
      sla: "On Time", 
      location: "Main Store", 
      products: [
        { name: "20L Water Jar", qty: 200, pack: "Single Unit" }
      ],
      podTypes: ["Signed Note", "GPS Confirmed"]
    }
  ];

  // State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({ search: "", dateFrom: "", dateTo: "", location: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toString().includes(filters.search) || 
                         order.items.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDateFrom = !filters.dateFrom || order.date >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || order.date <= filters.dateTo;
    const matchesLocation = !filters.location || order.location.includes(filters.location);
    return matchesSearch && matchesDateFrom && matchesDateTo && matchesLocation;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE, 
    currentPage * PAGE_SIZE
  );

  const handleReorder = (order) => {
    // Copy quantities to NewOrders (via localStorage simulation)
    const orderData = {
      quantities: order.products.reduce((acc, product) => ({
        ...acc,
        [product.name]: product.qty
      }), {}),
      location: order.location
    };
    localStorage.setItem('reorderFromDelivered', JSON.stringify(orderData));
    
    // In real app: Navigate to NewOrders page
    alert(`Redirecting to New Order with ${order.items} pre-filled!`);
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <PackageCheck className="text-emerald-600" size={28} />
            Delivered Orders
          </h3>
          <p className="text-slate-600 mt-1">
            {filteredOrders.length} successfully completed shipments
          </p>
        </div>
        
        {/* Strict Rule Badge */}
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            🔒 Read-Only View
          </span>
          <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg">
            100% Delivery Success
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search Order # or Items..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          />
          
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          />
          
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Locations</option>
            <option value="Main">Main Store</option>
            <option value="Branch">Branch Stores</option>
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
                <th className="py-4 px-6">Delivery</th>
                <th className="py-4 px-6">Volume</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-emerald-50/50 transition-all group">
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

                  {/* Delivery Date/Time */}
                  <td className="py-4 px-6 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      <span>{order.date}</span>
                      <span className="text-xs text-slate-400">@{order.time}</span>
                    </div>
                  </td>

                  {/* Volume */}
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {order.items}
                  </td>

                  {/* Location */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{order.location}</span>
                    </div>
                  </td>

                  {/* Status + SLA */}
                  <td className="py-4 px-6 text-center">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                        order.status === "Delivered Late" 
                          ? "bg-amber-50 text-amber-800 border border-amber-200" 
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}>
                        <CheckCircle size={12} />
                        {order.status}
                      </span>
                      <span className="text-xs text-slate-500 block">{order.sla}</span>
                    </div>
                  </td>

                  {/* Actions - Read Only */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {/* Reorder Button */}
                      <button
                        onClick={() => handleReorder(order)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-all shadow-sm group"
                        title="Copy quantities to New Order"
                      >
                        <Star size={12} />
                        <span className="group-hover:underline">Reorder</span>
                      </button>
                      
                      {/* POD Dropdown */}
                      <div className="relative group">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-all shadow-sm">
                          <FileText size={12} />
                          View POD
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
                          {order.podTypes.map((type, i) => (
                            <button
                              key={i}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Download size={14} />
                              {type} PDF
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > PAGE_SIZE && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, filteredOrders.length)} of {filteredOrders.length} orders
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredOrders.length / PAGE_SIZE), p + 1))}
                  disabled={currentPage === Math.ceil(filteredOrders.length / PAGE_SIZE)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
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
                    <PackageCheck className="text-emerald-600" size={28} />
                    Order #{selectedOrder.id}
                  </h4>
                  <p className="text-slate-600 mt-1">{selectedOrder.date} @ {selectedOrder.time}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Products Breakdown */}
              <div>
                <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  Delivered Items
                </h5>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-bold text-slate-800">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.pack}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">{product.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-emerald-50 rounded-xl">
                <div>
                  <p className="text-sm text-slate-500 mb-1 flex items-center gap-2">
                    <MapPin size={16} />
                    Delivery Location
                  </p>
                  <p className="font-semibold text-slate-800">{selectedOrder.location}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1 flex items-center gap-2">
                    <Clock size={16} />
                    SLA Performance
                  </p>
                  <p className={`font-semibold text-sm ${
                    selectedOrder.sla.includes("Late") ? "text-amber-600" : "text-emerald-600"
                  }`}>
                    {selectedOrder.sla}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrders;
