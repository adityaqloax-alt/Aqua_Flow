import React, { useState, useEffect } from "react";
import { 
  Archive, FileText, Calendar, Download, Eye, Filter, Search, 
  CheckCircle, Mail, TrendingUp, ShieldCheck, Package 
} from "lucide-react";

const Statements = () => {
  // Enhanced statements with full metadata
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
      outstanding: 45000,
      emailed: true
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
      outstanding: 0,
      emailed: true
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
      outstanding: 125000,
      emailed: false
    }
  ]);

  // State
  const [filters, setFilters] = useState({ search: "", year: "", viewed: "" });
  const [selectedStatements, setSelectedStatements] = useState(new Set());
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 12;

  // Simulate new statement notification
  useEffect(() => {
    const unread = statementsData.find(s => !s.viewed);
    if (unread && !unread.viewed) {
      // Mark as viewed on component mount
      setStatementsData(prev => prev.map(s => 
        !s.viewed ? { ...s, viewed: true } : s
      ));
    }
  }, []);

  // Filters + Pagination
  const filteredStatements = statementsData
    .filter(statement => {
      const matchesSearch = statement.month.toLowerCase().includes(filters.search.toLowerCase());
      const matchesYear = !filters.year || statement.month.includes(filters.year);
      const matchesViewed = !filters.viewed || 
        (filters.viewed === "new" && !statement.viewed) || 
        (filters.viewed === "viewed" && statement.viewed);
      return matchesSearch && matchesYear && matchesViewed;
    });

  const paginatedStatements = filteredStatements.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handlers
  const toggleSelection = (id) => {
    const newSelected = new Set(selectedStatements);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedStatements(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedStatements.size === paginatedStatements.length) {
      setSelectedStatements(new Set());
    } else {
      setSelectedStatements(new Set(paginatedStatements.map(s => s.id)));
    }
  };

  const handleBulkDownload = () => {
    if (selectedStatements.size === 0) {
      alert("Please select statements to download");
      return;
    }
    alert(`Downloading ${selectedStatements.size} statements as ZIP (GST compliant)`);
  };

  const handleEmailStatement = (statement) => {
    alert(`Emailing ${statement.month} statement to your registered email`);
  };

  const handleDownloadStatement = (statement) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `aquaflow-statement-${statement.month.toLowerCase().replace(' ', '-')}.pdf`;
    link.click();
  };

  const getViewedBadge = (viewed) => {
    return viewed ? 
      "bg-emerald-100 text-emerald-700 border-emerald-200" : 
      "bg-indigo-100 text-indigo-700 border-indigo-200 animate-pulse";
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="p-8 bg-gradient-to-r from-indigo-50 to-slate-50 border-2 border-indigo-200 rounded-3xl shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 flex items-center gap-3 mb-2">
              <Archive className="w-10 h-10 text-indigo-600 drop-shadow-lg" />
              Monthly Statements
            </h3>
            <p className="text-lg text-slate-700">
              {filteredStatements.length} statements • Auto-generated 1st of each month
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-indigo-600 mb-1">{statementsData.filter(s => s.viewed).length}</div>
              <p className="text-xs text-slate-600 uppercase tracking-wide font-bold">Viewed</p>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600 mb-1">{statementsData.filter(s => s.payments > 0).length}</div>
              <p className="text-xs text-slate-600 uppercase tracking-wide font-bold">With Payments</p>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-600 mb-1">₹{statementsData.reduce((sum, s) => sum + s.outstanding, 0).toLocaleString()}</div>
              <p className="text-xs text-slate-600 uppercase tracking-wide font-bold">Total Outstanding</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search month or year..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          
          <select
            value={filters.viewed}
            onChange={(e) => setFilters({ ...filters, viewed: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="viewed">Viewed</option>
          </select>
          
          <div className="flex gap-2">
            <button
              onClick={handleBulkDownload}
              disabled={selectedStatements.size === 0}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Download className="w-4 h-4" />
              {selectedStatements.size > 0 ? `${selectedStatements.size} ZIP` : 'Bulk Download'}
            </button>
          </div>
        </div>
      </div>

      {/* Statements Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {paginatedStatements.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {paginatedStatements.map((statement, idx) => (
                <div
                  key={statement.id}
                  className="p-6 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-slate-50 transition-all group border-b border-slate-50 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Checkbox */}
                      <label className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 cursor-pointer group-hover:bg-indigo-50 transition-all">
                        <input
                          type="checkbox"
                          checked={selectedStatements.has(statement.id)}
                          onChange={() => toggleSelection(statement.id)}
                          className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                        />
                      </label>
                      
                      {/* Icon & Details */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`p-3 lg:p-4 rounded-2xl shadow-lg transition-all group-hover:scale-105 ${
                          statement.viewed 
                            ? "bg-slate-100 text-slate-600 border-2 border-slate-200" 
                            : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-500/25 border-2 border-white/50"
                        }`}>
                          <FileText size={20} />
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <h4 className="font-black text-xl text-slate-900 truncate">{statement.month}</h4>
                          <div className="flex items-center gap-4 text-sm mt-1">
                            <span className="flex items-center gap-1 text-slate-500">
                              <Calendar className="w-3 h-3" />
                              {statement.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-500">
                              📊 {statement.totalInvoices} invoices
                            </span>
                          </div>
                          
                          {/* Financial Summary */}
                          <div className="grid grid-cols-3 gap-4 mt-3 text-xs lg:text-sm">
                            <div className="text-right">
                              <span className="text-slate-500 block">Total</span>
                              <span className="font-bold text-slate-900">₹{statement.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="text-center">
                              <span className="text-slate-500 block">Payments</span>
                              <span className="font-bold text-emerald-600">{statement.payments}</span>
                            </div>
                            <div className="text-left">
                              <span className={`font-bold ${statement.outstanding > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                {statement.outstanding > 0 ? `₹${statement.outstanding.toLocaleString()}` : "Cleared"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getViewedBadge(statement.viewed)}`}>
                        {statement.viewed ? "Viewed" : "New"}
                      </span>
                      
                      {statement.emailed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" title="Emailed" />
                      ) : (
                        <button
                          onClick={() => handleEmailStatement(statement)}
                          className="p-1.5 hover:bg-indigo-100 rounded-xl transition-all"
                          title="Email Statement"
                        >
                          <Mail className="w-4 h-4 text-slate-500 hover:text-indigo-600" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => setSelectedPreview(statement)}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all ml-2"
                        aria-label={`Preview ${statement.month} statement`}
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Preview</span>
                      </button>
                      
                      <button
                        onClick={() => handleDownloadStatement(statement)}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-slate-500/50 hover:-translate-y-0.5 transition-all"
                        aria-label={`Download ${statement.month} PDF`}
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center text-slate-500 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-b-3xl">
              <Archive className="mx-auto w-16 h-16 text-slate-400 mb-6 opacity-60" />
              <h3 className="text-2xl font-black text-slate-900 mb-3">No statements available</h3>
              <p className="text-lg text-slate-600 mb-8">Statements generated on 1st of each month</p>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-100 text-indigo-800 rounded-3xl font-bold shadow-lg hover:bg-indigo-200 transition-all">
                <Package className="w-6 h-6" />
                First statement generates next month
              </div>
            </div>
          )}
        </div>

        {/* Select All Row */}
        {paginatedStatements.length > 0 && (
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-2 rounded-xl transition-all">
              <input
                type="checkbox"
                checked={selectedStatements.size === paginatedStatements.length && paginatedStatements.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm font-bold text-slate-700">Select all ({paginatedStatements.length})</span>
            </label>
          </div>
        )}

        {/* Pagination */}
        {filteredStatements.length > PAGE_SIZE && (
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-indigo-50 border-t-2 border-slate-100">
            <div className="flex items-center justify-between text-sm text-slate-700 font-semibold">
              <span>{filteredStatements.length} total statements</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 disabled:opacity-50 transition-all"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white border rounded-xl font-bold">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredStatements.length / PAGE_SIZE), p + 1))}
                  disabled={currentPage === Math.ceil(filteredStatements.length / PAGE_SIZE)}
                  className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 disabled:opacity-50 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legal Footer */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-900 text-white rounded-3xl shadow-2xl text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold mb-2 flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            GST Compliant • Auto-generated monthly statements
          </p>
          <p className="text-xs opacity-90">
            For disputes or queries: accounts@aquaflow.in
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 p-6 border-b border-slate-200 bg-white z-10">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-black text-slate-900">{selectedPreview.month} Statement</h4>
                <button 
                  onClick={() => setSelectedPreview(null)}
                  className="p-2 hover:bg-slate-100 rounded-2xl transition-all"
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="bg-gradient-to-r from-indigo-50 to-slate-50 rounded-2xl p-8 text-center">
                <FileText className="w-20 h-20 text-indigo-400 mx-auto mb-6 opacity-60" />
                <h3 className="text-3xl font-black text-slate-800 mb-4">PDF Preview</h3>
                <p className="text-xl text-slate-600 mb-8">Full statement available for download</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleDownloadStatement(selectedPreview)}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleEmailStatement(selectedPreview)}
                    className="px-8 py-4 border-2 border-indigo-200 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-lg"
                  >
                    Email Statement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statements;
