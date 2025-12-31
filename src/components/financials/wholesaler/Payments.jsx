import React, { useState, useEffect } from "react";
import { 
  CreditCard, CheckCircle, Calendar, IndianRupee, Download, ShieldCheck, 
  Search, Filter, Eye, TrendingUp, Clock, AlertCircle, Package 
} from "lucide-react";

const Payments = () => {
  // Enhanced payments data with full audit trail
  const [paymentsData, setPaymentsData] = useState([
    { 
      ref: "PAY-9081", 
      date: "Sep 25, 2024", 
      amount: 80000, 
      method: "Bank Transfer", 
      status: "Verified", 
      bankRef: "HDFC123456789",
      reconciled: true,
      itemsCount: 2
    },
    { 
      ref: "PAY-9055", 
      date: "Aug 30, 2024", 
      amount: 45000, 
      method: "UPI", 
      status: "Verified", 
      upiId: "buyer@paytm",
      reconciled: true,
      itemsCount: 1
    },
    { 
      ref: "PAY-9012", 
      date: "Aug 15, 2024", 
      amount: 25000, 
      method: "Cheque", 
      status: "Processing", 
      chequeNo: "CHK-45678",
      reconciled: false,
      itemsCount: 3
    }
  ]);

  // State management
  const [filters, setFilters] = useState({ search: "", status: "", dateFrom: "", dateTo: "", method: "" });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
  const PAGE_SIZE = 10;

  // Live totals
  const totalPaid = paymentsData.reduce((sum, p) => sum + p.amount, 0);
  const verifiedCount = paymentsData.filter(p => p.status === "Verified").length;
  const processingCount = paymentsData.filter(p => p.status === "Processing").length;

  // Filters + Sorting + Pagination
  const filteredPayments = paymentsData
    .filter(payment => {
      const matchesSearch = payment.ref.toLowerCase().includes(filters.search.toLowerCase()) ||
                          payment.amount.toString().includes(filters.search);
      const matchesStatus = !filters.status || payment.status === filters.status;
      const matchesMethod = !filters.method || payment.method === filters.method;
      const matchesDateFrom = !filters.dateFrom || payment.date >= filters.dateFrom;
      const matchesDateTo = !filters.dateTo || payment.date <= filters.dateTo;
      return matchesSearch && matchesStatus && matchesMethod && matchesDateFrom && matchesDateTo;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (sortConfig.key === 'amount') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      } else if (sortConfig.key === 'date') {
        aVal = new Date(a.date);
        bVal = new Date(b.date);
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDownloadReceipt = (payment) => {
    // Simulate PDF receipt download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `payment-receipt-${payment.ref}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCSV = () => {
    const safeData = paginatedPayments.map(p => ({
      'Ref ID': p.ref,
      'Date': p.date,
      'Method': p.method,
      'Amount': `₹${p.amount.toLocaleString()}`,
      'Status': p.status
    }));
    
    const csv = [
      Object.keys(safeData[0]).join(','),
      ...safeData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aquaflow-payments-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const SortIcon = ({ direction }) => (
    <div className={`w-4 h-4 transition-transform ${direction === 'desc' ? 'rotate-180' : ''}`}>
      <TrendingUp />
    </div>
  );

  const getMethodIcon = (method) => {
    const icons = {
      "Bank Transfer": "🏦",
      "UPI": "💳",
      "Cheque": "📄",
      "Card": "💳"
    };
    return icons[method] || "💰";
  };

  const getStatusConfig = (status) => {
    return status === "Verified" 
      ? { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle }
      : { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: Clock };
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-3xl shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-2">
                <CreditCard className="text-emerald-600 w-9 h-9 drop-shadow-lg" />
                Payment Ledger
              </h3>
              <p className="text-lg text-slate-700 font-semibold">
                {verifiedCount} verified • ₹{totalPaid.toLocaleString()} total credited
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border-2 border-emerald-200 rounded-2xl text-emerald-700 font-bold shadow-lg">
              <ShieldCheck className="w-4 h-4" />
              Finance Verified
            </span>
          </div>
        </div>
        
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all group">
          <IndianRupee className="w-14 h-14 text-emerald-500 mx-auto mb-3 drop-shadow-2xl group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-black text-slate-900 mb-1">₹{totalPaid.toLocaleString()}</div>
          <p className="text-sm text-slate-600 font-semibold">Total Paid</p>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div className="relative col-span-2 lg:col-span-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Ref ID or Amount..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500"
          />
          
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500"
          />
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Status</option>
            <option value="Verified">Verified</option>
            <option value="Processing">Processing</option>
          </select>
          
          <select
            value={filters.method}
            onChange={(e) => setFilters({ ...filters, method: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Methods</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
            <option value="Cheque">Cheque</option>
          </select>
          
          <button
            onClick={handleExportCSV}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all col-span-1 lg:col-span-1"
          >
            <Download className="inline w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-blue-50 text-slate-600 font-bold border-b-2 border-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th 
                  className="py-4 px-6 cursor-pointer hover:text-emerald-600 transition-colors"
                  onClick={() => handleSort('ref')}
                >
                  Reference {sortConfig.key === 'ref' && <SortIcon direction={sortConfig.direction} />}
                </th>
                <th 
                  className="py-4 px-6 cursor-pointer hover:text-emerald-600 transition-colors"
                  onClick={() => handleSort('date')}
                >
                  Date {sortConfig.key === 'date' && <SortIcon direction={sortConfig.direction} />}
                </th>
                <th 
                  className="py-4 px-6 cursor-pointer hover:text-emerald-600 transition-colors"
                  onClick={() => handleSort('method')}
                >
                  Method
                </th>
                <th 
                  className="py-4 px-6 text-right cursor-pointer hover:text-emerald-600 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  Amount {sortConfig.key === 'amount' && <SortIcon direction={sortConfig.direction} />}
                </th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Receipt</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {paginatedPayments.map((payment, idx) => {
                const statusConfig = getStatusConfig(payment.status);
                const Icon = statusConfig.icon;
                
                return (
                  <tr 
                    key={payment.ref} 
                    className="hover:bg-emerald-50/50 transition-all group"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    {/* Reference - Clickable */}
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="font-mono text-sm font-bold text-slate-800 bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-2 rounded-xl border border-slate-300 hover:bg-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all group/item"
                      >
                        {payment.ref}
                        <Eye className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all inline" />
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {payment.date}
                      </div>
                    </td>

                    {/* Method */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-xl border border-emerald-200">
                        {getMethodIcon(payment.method)}
                        <span className="font-semibold">{payment.method}</span>
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6 text-right">
                      <div className="font-black text-2xl text-emerald-700 flex items-baseline justify-end gap-1">
                        <IndianRupee className="w-5 h-5 text-emerald-500" />
                        {payment.amount.toLocaleString()}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold shadow-lg ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        <Icon className="w-4 h-4" />
                        {payment.status}
                      </span>
                    </td>

                    {/* Receipt */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDownloadReceipt(payment)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-0.5 hover:scale-[1.02] transition-all group"
                        title={`Download receipt for ${payment.ref}`}
                      >
                        <Download className="w-4 h-4 group-hover:rotate-[-15deg] transition-transform" />
                        Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <div className="p-16 text-center text-slate-500 bg-gradient-to-r from-slate-50 to-emerald-50 border-t border-slate-200 rounded-b-3xl">
            <CreditCard className="mx-auto w-16 h-16 text-slate-400 mb-6 opacity-60" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No payments found</h3>
            <p className="text-sm mb-8">Try adjusting your search or date range filters.</p>
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-100 text-emerald-800 rounded-3xl font-bold hover:bg-emerald-200 transition-colors shadow-lg">
              <Package className="w-5 h-5" />
              Make a Payment
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredPayments.length > PAGE_SIZE && (
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-emerald-50 border-t-2 border-slate-100">
            <div className="flex items-center justify-between text-sm text-slate-700 font-semibold">
              <span>
                Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, filteredPayments.length)} of {filteredPayments.length} payments
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-2.5 border-2 border-slate-300 rounded-2xl hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-sm"
                >
                  Previous
                </button>
                <span className="px-5 py-2.5 bg-white border-2 border-slate-200 rounded-2xl font-black shadow-md">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredPayments.length / PAGE_SIZE), p + 1))}
                  disabled={currentPage === Math.ceil(filteredPayments.length / PAGE_SIZE)}
                  className="px-5 py-2.5 border-2 border-slate-300 rounded-2xl hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compliance Footer */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl shadow-2xl text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold mb-1">
            <ShieldCheck className="inline w-5 h-5 mr-2" />
            All transactions bank-reconciled • Receipts GST compliant
          </p>
          <p className="text-xs opacity-90">
            Payments reflect within 24 hours • For queries: accounts@aquaflow.in
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        tr {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>
    </div>
  );
};

export default Payments;
