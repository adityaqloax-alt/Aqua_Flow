import React, { useState } from "react";
import { 
  CreditCard, CheckCircle, Calendar, IndianRupee, Download, ShieldCheck, 
  Search, Clock 
} from "lucide-react";

const Payments = () => {
  const [paymentsData, setPaymentsData] = useState([
    { 
      ref: "PAY-9081", 
      date: "Sep 25, 2024", 
      amount: 80000, 
      method: "Bank Transfer", 
      status: "Verified", 
      bankRef: "HDFC123456789",
      reconciled: true
    },
    { 
      ref: "PAY-9055", 
      date: "Aug 30, 2024", 
      amount: 45000, 
      method: "UPI", 
      status: "Verified", 
      upiId: "buyer@paytm",
      reconciled: true
    },
    { 
      ref: "PAY-9012", 
      date: "Aug 15, 2024", 
      amount: 25000, 
      method: "Cheque", 
      status: "Processing", 
      chequeNo: "CHK-45678",
      reconciled: false
    }
  ]);

  const [filters, setFilters] = useState({ search: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.ref.toLowerCase().includes(filters.search.toLowerCase()) ||
                         payment.amount.toString().includes(filters.search);
    const matchesStatus = !filters.status || payment.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPaid = paymentsData.reduce((sum, p) => sum + p.amount, 0);
  const verifiedCount = paymentsData.filter(p => p.status === "Verified").length;

  const handleDownloadReceipt = (payment) => {
    console.log(`✅ Receipt downloaded: ${payment.ref}`);
  };

  const getStatusConfig = (status) => {
    return status === "Verified" 
      ? { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle }
      : { bg: "bg-amber-50", text: "text-amber-700", icon: Clock };
  };

  return (
    <div className="space-y-6">
      
      {/* Header + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <CreditCard size={24} className="text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Payment Ledger</h1>
                <p className="text-sm text-slate-500">{paymentsData.length} total payments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-200">
              <ShieldCheck size={14} />
              {verifiedCount} verified
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
          <p className="text-sm text-slate-500 uppercase font-semibold tracking-wide">Total paid</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            ₹{totalPaid.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by ref or amount"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All status</option>
            <option value="Verified">Verified</option>
            <option value="Processing">Processing</option>
          </select>

          <button
            onClick={() => {
              setFilters({ search: "", status: "" });
              setCurrentPage(1);
            }}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700">Ref ID</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700">Date</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700">Method</th>
                <th className="py-4 px-6 text-right text-sm font-semibold text-slate-700">Amount</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-slate-700">Status</th>
                <th className="py-4 px-6 text-right text-sm font-semibold text-slate-700">Receipt</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {paginatedPayments.map((payment) => {
                const statusConfig = getStatusConfig(payment.status);
                const Icon = statusConfig.icon;

                return (
                  <tr key={payment.ref} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6 font-mono font-semibold text-slate-900">
                      {payment.ref}
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <Calendar size={16} className="text-slate-400" />
                        {payment.date}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-lg border border-emerald-200">
                        {payment.method}
                      </span>
                    </td>
                    
                    <td className="py-4 px-6 text-right">
                      <div className="text-lg font-bold text-slate-900">
                        ₹{payment.amount.toLocaleString()}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-center">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                        <Icon size={16} />
                        {payment.status}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDownloadReceipt(payment)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        <Download size={16} />
                        Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {paginatedPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <CreditCard className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                    <p className="text-lg font-semibold text-slate-900 mb-2">No payments found</p>
                    <p className="text-sm text-slate-500">Try adjusting your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredPayments.length > PAGE_SIZE && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Showing {((currentPage - 1) * PAGE_SIZE) + 1}-{Math.min(currentPage * PAGE_SIZE, filteredPayments.length)} 
                of {filteredPayments.length} payments
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-semibold">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredPayments.length / PAGE_SIZE), p + 1))}
                  disabled={currentPage === Math.ceil(filteredPayments.length / PAGE_SIZE)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} />
          <span className="text-sm font-semibold">Bank-reconciled payments</span>
        </div>
        <a href="mailto:accounts@aquaflow.in" className="text-xs hover:text-emerald-300">
          accounts@aquaflow.in
        </a>
      </div>
    </div>
  );
};

export default Payments;
