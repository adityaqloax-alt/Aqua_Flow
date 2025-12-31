import React, { useState } from "react";
import { 
  History, Search, Calendar, Filter, CheckCircle, XCircle, Eye, 
  Download, Star, ArrowRight, Package 
} from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderHistory = () => {
  // Enhanced Mock History Data (Wholesaler-Safe Only)
  const [historyData, setHistoryData] = useState([
    { 
      id: 998, 
      date: "Sep 28, 2024", 
      total: "150 Units", 
      status: "Completed", 
      items: [
        { name: "20L Water Jar", qty: 120, pack: "Single Unit" },
        { name: "1L Water Bottle", qty: 30, pack: "Case of 12" }
      ],
      location: "Main Store"
    },
    { 
      id: 995, 
      date: "Sep 20, 2024", 
      total: "80 Cases", 
      status: "Completed", 
      items: [{ name: "1L Water Bottle", qty: 960, pack: "Case of 12" }],
      location: "Branch #2"
    },
    { 
      id: 992, 
      date: "Sep 15, 2024", 
      total: "200 Jars", 
      status: "Cancelled", 
      items: [{ name: "20L Water Jar", qty: 200, pack: "Single Unit" }],
      location: "Main Store",
      cancelReason: "Customer cancelled"
    },
    { 
      id: 990, 
      date: "Sep 10, 2024", 
      total: "120 Units", 
      status: "Completed", 
      items: [{ name: "20L Water Jar", qty: 120, pack: "Single Unit" }],
      location: "Main Store"
    }
  ]);

  // State
  const [filters, setFilters] = useState({ search: "", dateFrom: "", dateTo: "", status: "" });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Filters + Pagination
  const filteredData = historyData.filter(record => {
    const matchesSearch = record.id.toString().includes(filters.search) || 
                         record.total.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDateFrom = !filters.dateFrom || record.date >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || record.date <= filters.dateTo;
    const matchesStatus = !filters.status || record.status === filters.status;
    return matchesSearch && matchesDateFrom && matchesDateTo && matchesStatus;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE, 
    currentPage * PAGE_SIZE
  );

  // Reorder handler
  const handleReorder = (order) => {
    const reorderData = {
      quantities: order.items.reduce((acc, item) => ({
        ...acc,
        [item.name]: item.qty
      }), {}),
      source: `History Order #${order.id}`
    };
    localStorage.setItem('reorderFromHistory', JSON.stringify(reorderData));
    alert(`Redirecting to New Orders with ${order.items.length} items pre-filled!`);
  };

  // Export handler (safe columns only)
  const handleExport = () => {
    const safeData = paginatedData.map(order => ({
      'Order ID': `#${order.id}`,
      'Date': order.date,
      'Volume': order.total,
      'Status': order.status
    }));
    
    const csv = [
      Object.keys(safeData[0]).join(','),
      ...safeData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aquaflow-orders-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const getStatusConfig = (status) => {
    return status === "Completed" 
      ? { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle }
      : { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: XCircle };
  };

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="p-6 bg-gradient-to-r from-slate-50 to-indigo-50 border border-slate-100 rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <History className="text-indigo-500" size={28} />
              Order Archive
            </h3>
            <p className="text-slate-600 mt-1">
              {filteredData.length} past transactions • <span className="font-semibold text-emerald-600">{historyData.filter(h => h.status === "Completed").length}</span> completed
            </p>
          </div>
          
          {/* Read-Only Badge */}
          <span className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full border border-slate-200 shadow-sm whitespace-nowrap">
            🔒 Historical Records Only
          </span>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search Order ID or Volume..."
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
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-slate-500 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Date Placed</th>
                <th className="py-4 px-6">Total Volume</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((record) => {
                const statusConfig = getStatusConfig(record.status);
                const Icon = statusConfig.icon;
                
                return (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-all group">
                    {/* Order ID - Clickable */}
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedOrder(record)}
                        className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-2 group/item cursor-pointer"
                      >
                        #{record.id}
                        <Eye size={14} className="opacity-0 group-hover:opacity-100 transition-all ml-1" />
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-600 flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {record.date}
                    </td>

                    {/* Volume */}
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {record.total}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                        <Package size={12} />
                        {record.location}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        <Icon size={12} />
                        {record.status}
                      </span>
                      {record.cancelReason && (
                        <p className="text-xs text-red-600 mt-1 font-medium">{record.cancelReason}</p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {record.status === "Completed" && (
                          <button
                            onClick={() => handleReorder(record)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-all shadow-sm"
                            title="Reorder same quantities"
                          >
                            <Star size={12} />
                            <span>Reorder</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="p-12 text-center text-slate-500 bg-slate-50/50 border-t border-slate-200">
            <History className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No orders found</h3>
            <p className="text-sm">Try adjusting your search or date range filters.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredData.length > PAGE_SIZE && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, filteredData.length)} of {filteredData.length} orders
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
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredData.length / PAGE_SIZE), p + 1))}
                  disabled={currentPage === Math.ceil(filteredData.length / PAGE_SIZE)}
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
      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
};

export default OrderHistory;
