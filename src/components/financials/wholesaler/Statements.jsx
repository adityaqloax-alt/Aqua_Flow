import React, { useState } from "react";
import { 
  Archive, FileText, Calendar, Download, ShieldCheck, 
  Search, CheckCircle 
} from "lucide-react";

const Statements = () => {
  const [statementsData, setStatementsData] = useState([
    { 
      id: 1, 
      month: "September 2024", 
      date: "Oct 01, 2024", 
      size: "1.2 MB", 
      viewed: true,
      totalInvoices: 15,
      totalAmount: 245000,
      payments: 3,
      outstanding: 45000
    },
    { 
      id: 2, 
      month: "August 2024", 
      date: "Sep 01, 2024", 
      size: "0.9 MB", 
      viewed: true,
      totalInvoices: 12,
      totalAmount: 180000,
      payments: 4,
      outstanding: 0
    },
    { 
      id: 3, 
      month: "July 2024", 
      date: "Aug 01, 2024", 
      size: "1.1 MB", 
      viewed: false,
      totalInvoices: 18,
      totalAmount: 320000,
      payments: 2,
      outstanding: 125000
    }

    
  ]);

  const [filters, setFilters] = useState({ search: "", viewed: "" });

  const filteredStatements = statementsData.filter(statement => {
    const matchesSearch = statement.month.toLowerCase().includes(filters.search.toLowerCase());
    const matchesViewed = !filters.viewed || 
      (filters.viewed === "new" && !statement.viewed) || 
      (filters.viewed === "viewed" && statement.viewed);
    return matchesSearch && matchesViewed;
  });

  const totalOutstanding = statementsData.reduce((sum, s) => sum + s.outstanding, 0);
  const viewedCount = statementsData.filter(s => s.viewed).length;

  const handleDownloadStatement = (statement) => {
    console.log(`✅ Statement downloaded: ${statement.month}`);
  };

  const getViewedBadge = (viewed) => {
    return viewed ? 
      "bg-emerald-100 text-emerald-700 border-emerald-200" : 
      "bg-indigo-100 text-indigo-700 border-indigo-200";
  };

  return (
    <div className="space-y-6">
      
      {/* Header + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Archive size={24} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Monthly Statements</h1>
                <p className="text-sm text-slate-500">{statementsData.length} statements available</p>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getViewedBadge(true)}`}>
              {viewedCount} viewed
            </div>
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
              placeholder="Search by month"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <select
            value={filters.viewed}
            onChange={(e) => setFilters({ ...filters, viewed: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All statements</option>
            <option value="new">New</option>
            <option value="viewed">Viewed</option>
          </select>

          <button
            onClick={() => setFilters({ search: "", viewed: "" })}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Statements Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredStatements.map((statement) => {
            const viewedBadgeClass = getViewedBadge(statement.viewed);

            return (
              <div key={statement.id} className="p-6 hover:bg-slate-50 transition-colors group">
                <div className="flex items-start lg:items-center justify-between gap-6">
                  
                  {/* Icon & Details */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`p-3 rounded-xl shadow-sm transition-all group-hover:scale-105 ${viewedBadgeClass}`}>
                      <FileText size={20} />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-xl text-slate-900 truncate">{statement.month}</h3>
                      <div className="flex items-center gap-4 text-sm mt-1 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {statement.date}
                        </div>
                        <span>•</span>
                        <span>{statement.size}</span>
                      </div>
                      
                      {/* Financial Summary */}
                      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                        <div>
                          <span className="text-slate-500 block text-xs">Invoices</span>
                          <span className="font-semibold text-slate-900">{statement.totalInvoices}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-xs">Payments</span>
                          <span className="font-semibold text-emerald-600">{statement.payments}</span>
                        </div>
                        <div>
                          <span className={`font-semibold text-sm ${statement.outstanding > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {statement.outstanding > 0 ? `₹${statement.outstanding.toLocaleString()}` : "Cleared"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${viewedBadgeClass}`}>
                      {statement.viewed ? "Viewed" : "New"}
                    </span>
                    
                    <button
                      onClick={() => handleDownloadStatement(statement)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                      title="Download PDF"
                    >
                      <Download size={16} />
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredStatements.length === 0 && (
            <div className="p-16 text-center">
              <Archive className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <p className="text-lg font-semibold text-slate-900 mb-2">No statements found</p>
              <p className="text-sm text-slate-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} />
          <span className="text-sm font-semibold">GST-compliant monthly statements</span>
        </div>
        <a href="mailto:accounts@aquaflow.in" className="text-xs hover:text-indigo-300">
          accounts@aquaflow.in
        </a>
      </div>
    </div>
  );
};

export default Statements;
