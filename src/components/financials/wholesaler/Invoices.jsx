import React, { useState } from "react";
import { 
  Download, FileText, Calendar, IndianRupee, CheckCircle, Clock, 
  Search, AlertTriangle, ShieldCheck 
} from "lucide-react";

const Invoices = () => {
  const [invoicesData, setInvoicesData] = useState([
    { 
      id: "INV-2024-001", 
      date: "2024-10-01", 
      amount: 45000, 
      status: "Unpaid", 
      dueDate: "2024-10-04",
      dueDays: 3,
      gstCompliant: true
    },
    { 
      id: "INV-2024-002", 
      date: "2024-09-20", 
      amount: 80000, 
      status: "Paid", 
      dueDate: "2024-09-20",
      paidDate: "2024-09-25",
      gstCompliant: true
    },
    { 
      id: "INV-2024-003", 
      date: "2024-09-15", 
      amount: 22500, 
      status: "Partially Paid", 
      dueDate: "2024-09-15",
      paidAmount: 15000,
      gstCompliant: true
    }
  ]);

  const [filters, setFilters] = useState({ search: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const filteredInvoices = invoicesData.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                         invoice.amount.toString().includes(filters.search);
    const matchesStatus = !filters.status || invoice.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalOutstanding = invoicesData
    .filter(inv => inv.status !== "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const urgentInvoices = invoicesData.filter(inv => 
    inv.status !== "Paid" && new Date(inv.dueDate) < new Date()
  );

  const handleDownload = (invoice) => {
    console.log(`✅ GST-compliant invoice downloaded: ${invoice.id}`);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Paid": return { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle };
      case "Partially Paid": return { bg: "bg-amber-50", text: "text-amber-700", icon: Clock };
      default: return { bg: "bg-red-50", text: "text-red-700", icon: Clock };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <FileText size={24} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">GST Invoices</h1>
                <p className="text-sm text-slate-500">{invoicesData.length} total invoices</p>
              </div>
            </div>
            {urgentInvoices.length > 0 && (
              <div className="flex items-center gap-2 bg-red-50 text-red-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200">
                <AlertTriangle size={14} />
                {urgentInvoices.length} overdue
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
          <p className="text-sm text-slate-500 uppercase font-semibold tracking-wide">Total outstanding</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            ₹{totalOutstanding.toLocaleString()}
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
              placeholder="Search by INV-XXXX or amount"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All status</option>
            <option value="Paid">Paid</option>
            <option value="Partially Paid">Partially paid</option>
            <option value="Unpaid">Unpaid</option>
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
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700">Invoice ID</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-slate-700">Date</th>
                <th className="py-4 px-6 text-right text-sm font-semibold text-slate-700">Amount</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-slate-700">Status</th>
                <th className="py-4 px-6 text-right text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {paginatedInvoices.map((inv) => {
                const statusConfig = getStatusConfig(inv.status);
                const Icon = statusConfig.icon;
                const isUrgent = inv.status !== "Paid" && new Date(inv.dueDate) < new Date();

                return (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6 font-mono font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        {inv.gstCompliant && (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                            GST ✓
                          </span>
                        )}
                        {inv.id}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-center">
                      <div className="text-sm text-slate-700 font-medium">
                        {inv.date.slice(5).replace('-', '/')}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-right">
                      <div className="text-lg font-bold text-slate-900">
                        ₹{inv.amount.toLocaleString()}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-center">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                        <Icon size={16} />
                        {inv.status}
                      </div>
                      {isUrgent && (
                        <div className="mt-1 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                          Overdue
                        </div>
                      )}
                    </td>
                    
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDownload(inv)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                        <Download size={16} />
                        GST PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {paginatedInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                    <p className="text-lg font-semibold text-slate-900 mb-2">No invoices found</p>
                    <p className="text-sm text-slate-500">Try adjusting your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredInvoices.length > PAGE_SIZE && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Showing {((currentPage - 1) * PAGE_SIZE) + 1}-{Math.min(currentPage * PAGE_SIZE, filteredInvoices.length)} 
                of {filteredInvoices.length} invoices
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
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredInvoices.length / PAGE_SIZE), p + 1))}
                  disabled={currentPage === Math.ceil(filteredInvoices.length / PAGE_SIZE)}
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
          <span className="text-sm font-semibold">GST-compliant invoices</span>
        </div>
        <a href="mailto:accounts@aquaflow.in" className="text-xs hover:text-indigo-300">
          accounts@aquaflow.in
        </a>
      </div>
    </div>
  );
};

export default Invoices;
