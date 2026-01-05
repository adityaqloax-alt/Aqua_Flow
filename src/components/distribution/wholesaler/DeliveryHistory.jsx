import React, { useState } from "react";
import { 
  CheckCircle, Calendar, FileText, Package, Download, Search, Filter,
  ChevronDown, ChevronUp, AlertTriangle, XCircle, IndianRupee, User,
  Truck, Clock, MapPin, ShieldCheck, Eye, MessageCircle
} from "lucide-react";

const DeliveryHistory = () => {
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("30days");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [disputeModal, setDisputeModal] = useState(null);

  const history = [
    {
      id: "DEL-0981",
      date: "Dec 30, 2024 14:32",
      route: "Route A - City Center",
      driver: "Ramesh K. (#402)",
      customer: "Hotel Taj Palace",
      plannedQty: "120 Cases",
      deliveredQty: "120 Cases ✓",
      status: "Delivered",
      invoice: "INV-2456",
      payment: "Paid ₹45,000",
      podFile: "POD_DEL-0981.pdf",
      notes: "3 x 20L jars, subscription customer",
      isDisputed: false
    },
    {
      id: "DEL-0974",
      date: "Dec 30, 2024 11:45",
      route: "Route B - North Zone",
      driver: "Suresh M. (#405)",
      customer: "Apollo Hospital",
      plannedQty: "50 Jars",
      deliveredQty: "48 Jars ⚠️",
      status: "Partial Delivery",
      invoice: "INV-2398",
      payment: "Pending ₹24,000",
      podFile: "POD_DEL-0974.pdf",
      notes: "2 jars damaged in transit",
      isDisputed: true
    },
    {
      id: "DEL-0950",
      date: "Dec 28, 2024 16:20",
      route: "Route A - City Center",
      driver: "Ramesh K. (#402)",
      customer: "City Mall Food Court",
      plannedQty: "200 Units",
      deliveredQty: "200 Units ✓",
      status: "Delivered",
      invoice: "INV-2312",
      payment: "Credit ₹18,000",
      podFile: "POD_DEL-0950.pdf",
      notes: "Bulk 1L bottles, urgent order",
      isDisputed: false
    },
    {
      id: "DEL-0923",
      date: "Dec 25, 2024 09:30",
      route: "Route C - West Hub",
      driver: "Anil S. (#389)",
      customer: "West End School",
      plannedQty: "75 Jars",
      deliveredQty: "75 Jars ✓",
      status: "Delivered",
      invoice: "INV-2289",
      payment: "Paid ₹32,000",
      podFile: "POD_DEL-0923.pdf",
      notes: "Daily subscription delivery",
      isDisputed: false
    }
  ];

  // Filter Logic
  const filteredHistory = history.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    const dateMatch = dateFilter === "all" || 
                     (dateFilter === "30days" && new Date(item.date) > new Date(Date.now() - 30*24*60*60*1000)) ||
                     (dateFilter === "7days" && new Date(item.date) > new Date(Date.now() - 7*24*60*60*1000));
    
    if (filter === "all") return matchesSearch && dateMatch;
    if (filter === "delivered") return matchesSearch && item.status === "Delivered" && dateMatch;
    if (filter === "partial") return matchesSearch && item.status === "Partial Delivery" && dateMatch;
    if (filter === "disputed") return matchesSearch && item.isDisputed && dateMatch;
    if (filter === "pending") return matchesSearch && item.payment.includes("Pending") && dateMatch;
    return matchesSearch && dateMatch;
  });

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const toggleSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const markDispute = (delivery) => {
    setDisputeModal(delivery);
  };

  const getStatusConfig = (status, isDisputed) => {
    if (isDisputed) {
      return { color: "text-rose-600 bg-rose-50 border-rose-100", icon: AlertTriangle };
    }
    switch (status) {
      case "Delivered": return { color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle };
      case "Partial Delivery": return { color: "text-amber-600 bg-amber-50 border-amber-100", icon: Package };
      default: return { color: "text-slate-500 bg-slate-50 border-slate-200", icon: Clock };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in zoom-in duration-500">
      
      {/* HEADER & CONTROLS */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Package className="text-slate-400" size={24} />
              Delivery History
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Complete record of {filteredHistory.length} deliveries ({history.length} total)
            </p>
          </div>
          
          {/* BULK ACTIONS */}
          {selectedRows.size > 0 && (
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl p-2 text-sm">
              <span className="font-bold text-indigo-700">{selectedRows.size} selected</span>
              <button className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all">
                <Download size={14} className="inline mr-1" /> Export ({selectedRows.size})
              </button>
            </div>
          )}
        </div>

        {/* FILTERS & SEARCH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, customer, route..." 
              className="w-full pl-12 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* STATUS FILTER */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {["all", "delivered", "partial", "disputed", "pending"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 text-xs font-bold uppercase rounded-lg transition-all flex-1 ${
                  filter === f 
                    ? "bg-white shadow-sm text-slate-800" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {f === "all" ? "All" : f === "delivered" ? "Delivered" : f === "partial" ? "Partial" : f === "disputed" ? "Disputed" : "Pending"}
              </button>
            ))}
          </div>
        </div>

        {/* DATE FILTER */}
        <div className="flex mt-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
          {["all", "7days", "30days"].map(period => (
            <button
              key={period}
              onClick={() => setDateFilter(period)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex-1 ${
                dateFilter === period 
                  ? "bg-indigo-500 text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              {period === "all" ? "All Time" : period === "7days" ? "7 Days" : "30 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider sticky top-0 z-10">
            <tr>
              <th className="py-4 px-6 w-12">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              </th>
              <th className="py-4 px-6">Delivery ID</th>
              <th className="py-4 px-6">Customer & Route</th>
              <th className="py-4 px-6">Date & Time</th>
              <th className="py-4 px-6">Quantity</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-right">Invoice</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {filteredHistory.map((item) => {
              const statusConfig = getStatusConfig(item.status, item.isDisputed);
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedRows.has(item.id);
              const isSelected = selectedRows.has(item.id);

              return (
                <React.Fragment key={item.id}>
                  {/* MAIN ROW */}
                  <tr 
                    className={`
                      hover:bg-slate-50/50 transition-colors group
                      ${isSelected ? "bg-indigo-50 border-indigo-200" : ""}
                    `}
                  >
                    <td className="py-4 px-6">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => toggleSelection(item.id)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                      />
                    </td>
                    <td className="py-4 px-6 font-mono text-sm font-semibold text-slate-800">
                      <span className="bg-slate-100 px-2 py-1 rounded text-xs">{item.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-800">{item.customer}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Truck size={12} />
                        {item.route}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {item.date}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-800">{item.plannedQty}</div>
                      <div className={`text-xs font-bold ${item.deliveredQty.includes("✓") ? "text-emerald-600" : "text-amber-600"}`}>
                        {item.deliveredQty}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${statusConfig.color}`}>
                        <StatusIcon size={12} />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="text-xs">
                        <div className="font-mono text-slate-800">{item.invoice}</div>
                        <div className={`text-xs font-bold mt-1 ${item.payment.includes("Paid") ? "text-emerald-600" : "text-amber-600"}`}>
                          {item.payment}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all group-hover:scale-105"
                          title="View POD"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
                          title="Download"
                        >
                          <Download size={12} />
                          POD
                        </button>
                        {item.isDisputed && (
                          <button 
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Manage Dispute"
                            onClick={(e) => {
                              e.stopPropagation();
                              markDispute(item);
                            }}
                          >
                            <AlertTriangle size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* EXPANDED ROW */}
                  {isExpanded && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={8} className="p-0">
                        <div className="p-6 border-t border-slate-200">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* DELIVERY DETAILS */}
                            <div>
                              <h6 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                                📋 Delivery Details
                              </h6>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <User size={14} className="text-slate-400" />
                                  <span>{item.driver}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} className="text-slate-400" />
                                  <span>{item.route}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-slate-400" />
                                  <span>Notes: {item.notes}</span>
                                </div>
                              </div>
                            </div>

                            {/* QUANTITY BREAKDOWN */}
                            <div>
                              <h6 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                                📦 Quantity Breakdown
                              </h6>
                              <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-xl shadow-sm">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-slate-800">{item.plannedQty}</div>
                                  <div className="text-xs text-slate-500">Planned</div>
                                </div>
                                <div className="text-center">
                                  <div className={`text-lg font-bold ${item.deliveredQty.includes("✓") ? "text-emerald-600" : "text-amber-600"}`}>
                                    {item.deliveredQty.replace(/[✓⚠️]/g, '')}
                                  </div>
                                  <div className="text-xs text-slate-500">Delivered</div>
                                </div>
                              </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex flex-col gap-3 pt-2 lg:pt-0">
                              <button className="w-full px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                                <FileText size={16} />
                                View Full POD
                              </button>
                              <button className="w-full px-4 py-2.5 text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 shadow-sm transition-all flex items-center justify-center gap-2">
                                <IndianRupee size={16} />
                                View Invoice
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* DISPUTE MODAL */}
      {disputeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 shadow-2xl animate-in zoom-in">
            <div className="p-6 border-b border-slate-200">
              <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle size={20} className="text-rose-500" />
                Dispute: {disputeModal.id}
              </h4>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Customer: {disputeModal.customer}<br/>
                Issue: {disputeModal.notes}
              </p>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2.5 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-all">
                  Add Notes
                </button>
                <button className="flex-1 px-4 py-2.5 text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-all">
                  Resolve
                </button>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t text-right">
              <button 
                className="px-6 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                onClick={() => setDisputeModal(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck size={14} className="text-emerald-500" />
        Records retained for 12 months • Last sync: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default DeliveryHistory;
