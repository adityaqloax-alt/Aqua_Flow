import React, { useState, useEffect } from "react";
import { 
  Download, FileText, Calendar, IndianRupee, CheckCircle, Clock, 
  Search, Filter, AlertTriangle, Eye, Package, TrendingUp, ShieldCheck 
} from "lucide-react";

const Invoices = () => {
  // Wholesaler-compliant invoices (READ-ONLY data)
  const [invoicesData, setInvoicesData] = useState([
    { 
      id: "INV-2024-001", 
      date: "2024-10-01", 
      amount: 45000, 
      status: "Unpaid", 
      dueDate: "2024-10-04",
      dueDays: 3,
      gstCompliant: true,
      invoiceType: "Tax Invoice",
      items: [{ name: "20L Water Jar", qty: 1000, pack: "Single Unit" }]
    },
    { 
      id: "INV-2024-002", 
      date: "2024-09-20", 
      amount: 80000, 
      status: "Paid", 
      dueDate: "2024-09-20",
      paidDate: "2024-09-25",
      gstCompliant: true,
      invoiceType: "Tax Invoice",
      items: [{ name: "1L Water Bottle (Case)", qty: 8000, pack: "Case of 12" }]
    },
    { 
      id: "INV-2024-003", 
      date: "2024-09-15", 
      amount: 22500, 
      status: "Partially Paid", 
      dueDate: "2024-09-15",
      paidAmount: 15000,
      gstCompliant: true,
      invoiceType: "Tax Invoice",
      items: [{ name: "20L Water Jar", qty: 500, pack: "Single Unit" }]
    }
  ]);

  // State management
  const [filters, setFilters] = useState({ search: "", status: "", dateFrom: "", dateTo: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
  const PAGE_SIZE = 10;

  // Dynamic due status calculation (GST compliant)
  const getDueStatus = (invoice) => {
    if (invoice.status === "Paid") return "Cleared";
    const dueDate = new Date(invoice.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 0) return "Overdue";
    if (daysDiff <= 3) return "Due Soon";
    if (daysDiff <= 7) return "Due in 7 days";
    return `Due in ${daysDiff} days`;
  };

  // Filters + Sorting + Pagination
  const filteredInvoices = invoicesData
    .filter(invoice => {
      const matchesSearch = invoice.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                          invoice.amount.toString().includes(filters.search);
      const matchesStatus = !filters.status || invoice.status === filters.status;
      const matchesDateFrom = !filters.dateFrom || invoice.date >= filters.dateFrom;
      const matchesDateTo = !filters.dateTo || invoice.date <= filters.dateTo;
      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'amount') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      } else if (sortConfig.key === 'date' || sortConfig.key === 'dueDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Wholesaler financial metrics
  const totalOutstanding = invoicesData
    .filter(inv => inv.status !== "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
    
  const urgentInvoices = invoicesData.filter(inv => 
    inv.status !== "Paid" && new Date(inv.dueDate) < new Date()
  );
  
  const totalInvoices = invoicesData.length;

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDownload = (invoice) => {
    // GST-compliant PDF download simulation
    const link = document.createElement('a');
    link.href = '#';
    link.download = `GST-INV-${invoice.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`✅ GST-compliant invoice downloaded: ${invoice.id}`);
  };

  const SortIcon = ({ direction }) => (
    <div className={`w-4 h-4 transition-transform ${direction === 'desc' ? 'rotate-180' : ''}`}>
      <TrendingUp />
    </div>
  );

  const getStatusConfig = (status) => {
    switch (status) {
      case "Paid":
        return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle };
      case "Partially Paid":
        return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: Clock };
      default:
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: Clock };
    }
  };

  return (
    <div className="space-y-6">
      {/* 🚨 WHOLESALER FINANCIAL SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Header */}
        <div className="lg:col-span-2 p-8 bg-gradient-to-r from-indigo-50 via-blue-50 to-emerald-50 border-2 border-indigo-200 rounded-3xl shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-2">
                <FileText className="w-10 h-10 text-indigo-600 drop-shadow-2xl" />
                GST Billing Portal
              </h3>
              <p className="text-lg text-slate-700 font-semibold">
                {totalInvoices} Tax Invoices • <span className="text-emerald-600 font-black">₹{totalOutstanding.toLocaleString()}</span> Outstanding
              </p>
            </div>
            
            {/* Urgent Alert */}
            {urgentInvoices.length > 0 && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold animate-pulse">
                <AlertTriangle className="w-6 h-6" />
                <span>{urgentInvoices.length} OVERDUE</span>
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
            )}
          </div>
        </div>
        
        {/* Total Outstanding Card */}
        <div className="p-8 bg-gradient-to-br from-red-50 to-amber-50 border-2 border-red-200 rounded-3xl shadow-xl text-center group hover:shadow-2xl hover:-translate-y-2 transition-all">
          <IndianRupee className="w-16 h-16 text-red-600 mx-auto mb-4 drop-shadow-2xl group-hover:scale-110 transition-transform" />
          <div className="text-4xl font-black text-red-700 mb-2">₹{totalOutstanding.toLocaleString()}</div>
          <p className="text-sm font-bold text-red-800 uppercase tracking-wide">Total Outstanding</p>
        </div>
      </div>

      {/* 🔍 ADVANCED FILTERS */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div className="relative col-span-2 lg:col-span-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search INV-XXXX or ₹ amount..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm text-sm placeholder-slate-400"
            />
          </div>
          
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="px-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
          />
          
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="px-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
          />
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
          >
            <option value="">All Status</option>
            <option value="Paid">✅ Paid</option>
            <option value="Partially Paid">⏳ Partial</option>
            <option value="Unpaid">⚠️ Unpaid</option>
          </select>
          
          <button
            onClick={() => {
              setFilters({ search: "", status: "", dateFrom: "", dateTo: "" });
              setCurrentPage(1);
            }}
            className="px-6 py-3.5 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-slate-400/50 hover:-translate-y-0.5 transition-all"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* 📋 GST INVOICES TABLE */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white sticky top-0 z-10 shadow-lg">
              <tr>
                <th 
                  className="py-5 px-6 text-left font-black uppercase text-xs tracking-wider cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => handleSort('id')}
                >
                  GST Invoice ID 
                  {sortConfig.key === 'id' && <SortIcon direction={sortConfig.direction} />}
                </th>
                <th 
                  className="py-5 px-6 text-center font-black uppercase text-xs tracking-wider cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => handleSort('date')}
                >
                  Invoice Date 
                  {sortConfig.key === 'date' && <SortIcon direction={sortConfig.direction} />}
                </th>
                <th 
                  className="py-5 px-6 text-right font-black uppercase text-xs tracking-wider cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => handleSort('amount')}
                >
                  Amount (₹) 
                  {sortConfig.key === 'amount' && <SortIcon direction={sortConfig.direction} />}
                </th>
                <th className="py-5 px-6 text-center font-black uppercase text-xs tracking-wider">Status</th>
                <th className="py-5 px-6 text-right font-black uppercase text-xs tracking-wider">Download</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {paginatedInvoices.map((inv, idx) => {
                const isUrgent = inv.status !== "Paid" && new Date(inv.dueDate) < new Date();
                const statusConfig = getStatusConfig(inv.status);
                const Icon = statusConfig.icon;
                
                return (
                  <tr 
                    key={inv.id}
                    className={`group hover:bg-gradient-to-r hover:from-indigo-50 hover:to-slate-50 transition-all duration-300 border-l-4 ${
                      isUrgent 
                        ? 'border-red-500 shadow-lg bg-red-50/50' 
                        : 'border-emerald-400/50'
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {/* GST Invoice ID */}
                    <td className="py-5 px-6 font-mono font-bold text-lg text-slate-900 group-hover:text-indigo-700 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-10 rounded-full ${isUrgent ? 'bg-red-500' : 'bg-emerald-500'}`} />
                        {inv.id}
                        {inv.gstCompliant && (
                          <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                            GST ✓
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-5 px-6 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2 text-slate-700 font-semibold">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          {inv.date.slice(5).replace('-', '/')}
                        </div>
                        <span className="text-xs text-slate-500">{inv.invoiceType}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-5 px-6 text-right">
                      <div className={`font-black text-2xl ${
                        inv.status === "Paid" ? 'text-emerald-700' : 
                        isUrgent ? 'text-red-700' : 'text-slate-900'
                      } flex items-baseline justify-end gap-1`}>
                        <IndianRupee className="w-6 h-6" />
                        {inv.amount.toLocaleString()}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-5 px-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold shadow-lg border-2 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                          <Icon className="w-5 h-5" />
                          <span className="uppercase tracking-wide">{inv.status}</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isUrgent 
                            ? 'bg-red-200 text-red-800 shadow-md' 
                            : inv.status === "Paid" 
                            ? 'bg-emerald-200 text-emerald-800' 
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {getDueStatus(inv)}
                        </span>
                      </div>
                    </td>

                    {/* GST Download */}
                    <td className="py-5 px-6 text-right">
                      <button
                        onClick={() => handleDownload(inv)}
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                        title={`Download GST-compliant PDF: ${inv.id}`}
                      >
                        <Download className="w-4 h-4 group-hover:rotate-[-15deg] group-hover:scale-110 transition-all" />
                        <span className="uppercase tracking-wider">GST PDF</span>
                        <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform origin-left duration-300" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {paginatedInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <FileText className="mx-auto w-16 h-16 text-slate-400 mb-4 opacity-50" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No invoices match your filters</h3>
                    <p className="text-slate-500 mb-6">Try adjusting search, date range, or status filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredInvoices.length > PAGE_SIZE && (
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-indigo-50 border-t-2 border-slate-200">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>
                Showing {((currentPage - 1) * PAGE_SIZE) + 1}-{Math.min(currentPage * PAGE_SIZE, filteredInvoices.length)} 
                of {filteredInvoices.length} GST invoices
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 border-2 border-slate-300 rounded-2xl font-bold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all hover:shadow-md"
                >
                  ← Previous
                </button>
                <span className="px-6 py-3 bg-white border-2 border-slate-200 rounded-2xl font-black shadow-md min-w-[80px] text-center">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredInvoices.length / PAGE_SIZE), p + 1))}
                  disabled={currentPage === Math.ceil(filteredInvoices.length / PAGE_SIZE)}
                  className="px-6 py-3 border-2 border-slate-300 rounded-2xl font-bold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all hover:shadow-md"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ⚖️ GST LEGAL COMPLIANCE */}
      <div className="p-8 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-2xl border-2 border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ShieldCheck className="w-12 h-12 opacity-90" />
            <div>
              <h4 className="text-2xl font-black mb-1">GST COMPLIANT</h4>
              <p className="text-indigo-200">All invoices valid for Input Tax Credit</p>
            </div>
          </div>
          <p className="text-lg opacity-90 mb-3">
            Digital Tax Invoices • Sequential numbering • Auto-generated per GST Act 2017
          </p>
          <p className="text-sm opacity-75">
            For disputes: <a href="mailto:accounts@aquaflow.in" className="underline hover:text-indigo-300">accounts@aquaflow.in</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        tr {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(24px);
        }
      `}</style>
    </div>
  );
};

export default Invoices;
