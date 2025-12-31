import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, Calendar, ChevronDown, ChevronUp, 
  CheckCircle, XCircle, Clock, Truck, FileText, TrendingUp, 
  DollarSign, Users, Package, Activity
} from 'lucide-react';

const OrderHistory = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  // Mock Historical Data
  const historyData = [
    { 
      id: "ORD-2024-885", customer: "Grand Hotel", date: "Oct 20, 2025", amount: 15000, status: "Completed", payment: "Paid", items: "60x 20L Jars",
      timeline: [
        { status: "Order Created", time: "Oct 20, 09:00 AM", user: "System (Web)" },
        { status: "Approved", time: "Oct 20, 09:30 AM", user: "Manager: Tom Cook" },
        { status: "Dispatched", time: "Oct 20, 11:15 AM", user: "Driver: Rajesh" },
        { status: "Delivered", time: "Oct 20, 02:00 PM", user: "Driver: Rajesh" },
        { status: "Payment Verified", time: "Oct 21, 10:00 AM", user: "Finance: Sarah" }
      ]
    },
    { 
      id: "ORD-2024-886", customer: "Tech Park Cafe", date: "Oct 21, 2025", amount: 2500, status: "Cancelled", payment: "Voided", items: "10x 20L Jars",
      timeline: [
        { status: "Order Created", time: "Oct 21, 10:00 AM", user: "Sales Rep: Mike" },
        { status: "Cancelled", time: "Oct 21, 10:45 AM", user: "Manager: Tom Cook", note: "Customer request - Duplicate order" }
      ]
    },
    { 
      id: "ORD-2024-887", customer: "City Hospital", date: "Oct 22, 2025", amount: 45000, status: "Returned", payment: "Refunded", items: "200x 20L Jars",
      timeline: [
        { status: "Order Created", time: "Oct 22, 08:00 AM", user: "System (API)" },
        { status: "Dispatched", time: "Oct 22, 12:00 PM", user: "Driver: Sunil" },
        { status: "Returned", time: "Oct 22, 01:30 PM", user: "QC Inspector", note: "Batch quality issue reported" }
      ]
    },
  ];

  // 🚀 LIVE KPI CALCULATIONS
  const totalOrders = historyData.length;
  const totalRevenue = historyData.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = historyData.filter(o => o.status === 'Completed').length;
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0;
  const completionRate = totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0;

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Returned': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 🚀 1. KPI DASHBOARD - NEW! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Orders */}
        <div className="group p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
              <Package className="w-6 h-6 text-indigo-600" />
            </div>
            <ChevronUp className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-indigo-700 uppercase tracking-wide">Total Orders</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{totalOrders}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="group p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Total Revenue</p>
            <p className="text-3xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="group p-6 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <Activity className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-slate-700 uppercase tracking-wide">Completion Rate</p>
            <p className="text-3xl font-black text-emerald-600">{completionRate}%</p>
          </div>
        </div>

        {/* Avg Order Value */}
        <div className="group p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <ChevronUp className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-amber-700 uppercase tracking-wide">Avg Order Value</p>
            <p className="text-3xl font-black text-slate-900">₹{avgOrderValue}</p>
          </div>
        </div>
      </div>

      {/* 2. Archive Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['All', 'Completed', 'Cancelled', 'Returned'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${
                filterStatus === tab 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:shadow-md border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Order ID, Customer, Items..." 
              className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm hover:shadow-md transition-all" 
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-sm font-bold hover:from-emerald-500 hover:to-emerald-400 shadow-lg hover:shadow-xl transition-all">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* 3. Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 text-xs uppercase font-black text-slate-600 tracking-wider">
            <tr>
              <th className="p-6 font-bold">Order Reference</th>
              <th className="p-6 font-bold">Customer</th>
              <th className="p-6 font-bold">Date</th>
              <th className="p-6 font-bold">Amount</th>
              <th className="p-6 font-bold">Final Status</th>
              <th className="p-6 font-bold text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historyData.filter(o => filterStatus === 'All' || o.status === filterStatus).map((order) => (
              <React.Fragment key={order.id}>
                {/* Main Row */}
                <tr 
                  onClick={() => toggleRow(order.id)}
                  className={`cursor-pointer transition-all hover:shadow-md hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 border-b border-slate-100 ${expandedRow === order.id ? 'bg-indigo-50 shadow-lg' : ''}`}
                >
                  <td className="p-6 font-mono text-lg font-black text-indigo-700">{order.id}</td>
                  <td className="p-6">
                    <div className="font-bold text-slate-900 text-lg">{order.customer}</div>
                    <div className="text-sm text-slate-500">{order.items}</div>
                  </td>
                  <td className="p-6 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-500" />
                      {order.date}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-2xl font-black text-emerald-600">₹{order.amount.toLocaleString()}</div>
                    <div className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${order.payment === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {order.payment}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold uppercase shadow-md ${getStatusStyle(order.status)} border-2`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6 text-right text-slate-500">
                    {expandedRow === order.id ? <ChevronUp size={20} className="text-indigo-600" /> : <ChevronDown size={20} className="text-indigo-400" />}
                  </td>
                </tr>

                {/* Expanded Details Panel */}
                {expandedRow === order.id && (
                  <tr className="bg-gradient-to-r from-slate-50 to-indigo-50 animate-in slide-in-from-top-2 duration-300">
                    <td colSpan="6" className="p-8">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        
                        {/* Timeline */}
                        <div>
                          <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3 uppercase tracking-wide">
                            <Clock size={20} className="text-indigo-600" /> Order Lifecycle
                          </h4>
                          <div className="space-y-4 pl-4 border-l-4 border-indigo-200">
                            {order.timeline.map((event, idx) => (
                              <div key={idx} className="relative pl-8 pb-4">
                                <div className={`absolute left-[-12px] top-1 w-6 h-6 rounded-full shadow-lg flex items-center justify-center text-xs font-bold ${
                                  idx === order.timeline.length - 1 
                                    ? 'bg-indigo-600 text-white border-4 border-indigo-50' 
                                    : 'bg-indigo-100 text-indigo-600 border-2 border-white'
                                }`}>
                                  {idx + 1}
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                                  <p className="text-lg font-bold text-slate-900 mb-1">{event.status}</p>
                                  <p className="text-sm text-slate-600 mb-2">{event.time}</p>
                                  <p className="text-xs text-indigo-700 font-semibold">{event.user}</p>
                                  {event.note && (
                                    <div className="mt-3 p-3 bg-rose-50 border-l-4 border-rose-400 rounded-r-xl text-sm text-rose-800">
                                      📝 {event.note}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Invoice & Actions */}
                        <div className="space-y-6">
                          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl border-2 border-emerald-200 shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                              <h4 className="text-xl font-black text-emerald-900 flex items-center gap-3">
                                <FileText size={24} className="text-emerald-600" /> Invoice Details
                              </h4>
                              <span className="text-lg font-mono bg-emerald-200/50 px-4 py-2 rounded-xl text-emerald-800 font-bold">
                                INV-{order.id.split('-')[2]}
                              </span>
                            </div>
                            
                            <div className="space-y-4 text-lg mb-8">
                              <div className="flex justify-between py-2 border-b border-emerald-100">
                                <span className="text-emerald-800 font-semibold">Items Delivered:</span>
                                <span className="font-black text-slate-900">{order.items}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-emerald-100">
                                <span className="text-emerald-800 font-semibold">Payment Status:</span>
                                <span className={`font-black px-3 py-1 rounded-full text-sm ${
                                  order.payment === 'Paid' 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-rose-500 text-white'
                                }`}>
                                  {order.payment}
                                </span>
                              </div>
                              <div className="flex justify-between pt-4 border-t-2 border-emerald-200">
                                <span className="text-2xl font-black text-emerald-900">Total Amount</span>
                                <span className="text-3xl font-black text-slate-900">₹{order.amount.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <button className="py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all">
                                Download PDF
                              </button>
                              <button className="py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-all">
                                Send Invoice
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        
        {/* Empty State */}
        {historyData.filter(o => filterStatus === 'All' || o.status === filterStatus).length === 0 && (
          <div className="text-center py-20">
            <Truck className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-600 mb-2">No Orders Found</h3>
            <p className="text-slate-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
