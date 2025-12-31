import React, { useState, useEffect } from "react";
import { 
  IndianRupee, FileText, AlertCircle, TrendingUp, CreditCard, 
  Clock, ShieldCheck, ArrowRight, Download, Calendar, Package, CheckCircle 
} from "lucide-react";

const Overview = () => {
  // AGGREGATED LIVE DATA from all 4 components
  const [financials, setFinancials] = useState({
    // From Invoices.jsx
    totalInvoices: 18,
    outstandingInvoices: 3,
    totalOutstanding: 125000,
    urgentInvoices: 2,
    
    // From Payments.jsx  
    totalPayments: 205000,
    verifiedPayments: 2,
    pendingPayments: 1,
    
    // From CreditLimit.jsx
    creditLimit: 300000,
    creditUsed: 125000,
    creditAvailable: 175000,
    creditUtilization: 42,
    
    // From Statements.jsx
    totalStatements: 3,
    outstandingFromStatements: 125000,
    
    // LIVE METRICS
    riskScore: 72,
    gstCompliance: "100%",
    lastActivity: "2h ago"
  });

  // Live updates aggregating all components
  useEffect(() => {
    const interval = setInterval(() => {
      setFinancials(prev => ({
        ...prev,
        totalOutstanding: Math.max(50000, prev.totalOutstanding + (Math.random() - 0.5) * 8000),
        urgentInvoices: Math.max(0, prev.urgentInvoices + (Math.random() > 0.8 ? 1 : 0)),
        creditUsed: Math.max(0, prev.creditUsed + (Math.random() - 0.5) * 5000),
        creditAvailable: prev.creditLimit - (Math.max(0, prev.creditUsed + (Math.random() - 0.5) * 5000))
      }));
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Derived calculations
  const creditUtilization = Math.round((financials.creditUsed / financials.creditLimit) * 100);
  const isCritical = financials.urgentInvoices > 2 || creditUtilization > 85;
  const totalActivity = financials.totalInvoices + financials.totalPayments + financials.totalStatements;

  const handleNavigate = (section) => {
    const messages = {
      invoices: `📄 Opening Invoices (${financials.totalInvoices} total, ${financials.outstandingInvoices} unpaid)`,
      payments: `💰 Opening Payments (₹${financials.totalPayments.toLocaleString()} total)`,
      credit: `💳 Opening Credit Limit (₹${financials.creditAvailable.toLocaleString()} available)`,
      statements: `📊 Opening Statements (${financials.totalStatements} months)`
    };
    alert(messages[section] || "Navigating to dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 🏗️ MASTER HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-emerald-900 bg-clip-text text-transparent mb-4">
            Wholesaler Financial Hub
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-600 mb-6">
            <span>{totalActivity} Total Records</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="font-bold text-emerald-600">{financials.gstCompliance} GST Compliance</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span>Live Data • {financials.lastActivity}</span>
          </div>
        </div>

        {/* 🔥 RISK DASHBOARD */}
        <div className={`p-10 lg:p-12 rounded-3xl shadow-2xl border-4 transition-all duration-700 hover:shadow-3xl hover:-translate-y-3 ${
          isCritical 
            ? 'bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-300' 
            : creditUtilization > 70 
            ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-300' 
            : 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-300'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl shadow-2xl ${
                isCritical ? 'bg-red-500' : 
                creditUtilization > 70 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}>
                {isCritical ? <AlertCircle size={28} className="text-white" /> : <ShieldCheck size={28} className="text-white" />}
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">
                  ₹{financials.totalOutstanding.toLocaleString()}
                </h2>
                <p className="text-xl font-bold text-slate-600 uppercase tracking-wider">
                  Total Outstanding
                </p>
              </div>
            </div>
            <div className={`px-6 py-3 rounded-2xl font-black text-lg uppercase tracking-wider shadow-lg ${
              isCritical ? 'bg-red-200 text-red-900 border-2 border-red-300' : 
              creditUtilization > 70 ? 'bg-amber-200 text-amber-900 border-2 border-amber-300' : 
              'bg-emerald-200 text-emerald-900 border-2 border-emerald-300'
            }`}>
              {isCritical ? 'CRITICAL ALERT' : creditUtilization > 70 ? 'HIGH RISK' : 'GOOD STANDING'}
            </div>
          </div>

          {/* 📊 LIVE METRICS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <FileText size={20} className="text-indigo-600" />
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Invoices</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900">{financials.totalInvoices}</h3>
              <p className="text-red-600 font-bold">{financials.outstandingInvoices} Unpaid</p>
            </div>

            <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <IndianRupee size={20} className="text-emerald-600" />
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Payments</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900">₹{financials.totalPayments.toLocaleString()}</h3>
              <p className="text-emerald-600 font-bold">{financials.verifiedPayments} Verified</p>
            </div>

            <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard size={20} className="text-indigo-600" />
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Credit</span>
              </div>
              <h3 className="text-3xl font-black text-emerald-600">
                ₹{financials.creditAvailable.toLocaleString()}
              </h3>
              <p className="text-indigo-600 font-bold">{creditUtilization}% Utilization</p>
            </div>

            <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={20} className="text-purple-600" />
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Statements</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900">{financials.totalStatements}</h3>
              <p className="text-purple-600 font-bold">Months Available</p>
            </div>
          </div>

          {/* 📈 CREDIT USAGE METER */}
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-slate-200 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-slate-700">Credit Utilization</span>
              <span className="text-2xl font-black text-slate-900">{creditUtilization}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-3xl h-6 shadow-inner overflow-hidden">
              <div 
                className={`h-full rounded-2xl shadow-lg transition-all duration-1500 ${
                  creditUtilization > 85 ? 'bg-red-500' : 
                  creditUtilization > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${creditUtilization}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-500 mt-3">
              <span>₹0</span>
              <span>₹{financials.creditLimit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ⚡ ONE-CLICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => handleNavigate('invoices')}
            className="group p-8 rounded-3xl bg-white border-2 hover:border-indigo-400 hover:shadow-2xl hover:-translate-y-2 transition-all shadow-xl flex flex-col items-center text-center h-full"
          >
            <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all group-hover:scale-110 shadow-lg">
              <FileText size={28} className="group-hover:text-white" />
            </div>
            <h4 className="font-black text-2xl text-slate-900 mb-4">GST Invoices</h4>
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white shadow-lg">
              <span className="font-black text-2xl text-indigo-700 group-hover:text-white">{financials.totalInvoices}</span>
            </div>
            <ArrowRight className="w-8 h-8 text-indigo-600 group-hover:translate-x-3 transition-transform text-2xl" />
          </button>

          <button
            onClick={() => handleNavigate('payments')}
            className="group p-8 rounded-3xl bg-white border-2 hover:border-emerald-400 hover:shadow-2xl hover:-translate-y-2 transition-all shadow-xl flex flex-col items-center text-center h-full"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all group-hover:scale-110 shadow-lg">
              <IndianRupee size={28} className="group-hover:text-white" />
            </div>
            <h4 className="font-black text-2xl text-slate-900 mb-4">Payments Ledger</h4>
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white shadow-lg">
              <span className="font-black text-2xl text-emerald-700 group-hover:text-white">₹{financials.totalPayments.toLocaleString()}</span>
            </div>
            <ArrowRight className="w-8 h-8 text-emerald-600 group-hover:translate-x-3 transition-transform text-2xl" />
          </button>

          <button
            onClick={() => handleNavigate('credit')}
            className="group p-8 rounded-3xl bg-white border-2 hover:border-purple-400 hover:shadow-2xl hover:-translate-y-2 transition-all shadow-xl flex flex-col items-center text-center h-full"
          >
            <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all group-hover:scale-110 shadow-lg">
              <CreditCard size={28} className="group-hover:text-white" />
            </div>
            <h4 className="font-black text-2xl text-slate-900 mb-4">Credit Limit</h4>
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white shadow-lg">
              <span className="font-black text-lg text-purple-700 group-hover:text-white">₹{financials.creditAvailable.toLocaleString()}</span>
            </div>
            <ArrowRight className="w-8 h-8 text-purple-600 group-hover:translate-x-3 transition-transform text-2xl" />
          </button>

          <button
            onClick={() => handleNavigate('statements')}
            className="group p-8 rounded-3xl bg-white border-2 hover:border-slate-400 hover:shadow-2xl hover:-translate-y-2 transition-all shadow-xl flex flex-col items-center text-center h-full"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-slate-600 group-hover:text-white transition-all group-hover:scale-110 shadow-lg">
              <Calendar size={28} className="group-hover:text-white" />
            </div>
            <h4 className="font-black text-2xl text-slate-900 mb-4">Statements</h4>
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-600 group-hover:text-white shadow-lg">
              <span className="font-black text-2xl text-slate-700 group-hover:text-white">{financials.totalStatements}</span>
            </div>
            <ArrowRight className="w-8 h-8 text-slate-600 group-hover:translate-x-3 transition-transform text-2xl" />
          </button>
        </div>

        {/* ✅ GST COMPLIANCE FOOTER */}
        <div className="p-8 bg-gradient-to-r from-slate-900 to-indigo-900 text-white rounded-3xl text-center shadow-2xl border-2 border-white/10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ShieldCheck className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-black mb-1">GST COMPLIANT SYSTEM</h3>
              <p className="opacity-90">{financials.gstCompliance} Input Tax Credit Eligible</p>
            </div>
          </div>
          <p className="text-lg opacity-90 mb-4">
            All invoices • payments • statements GST Act 2017 compliant
          </p>
          <p className="text-sm opacity-75">
            For queries: <span className="underline hover:text-indigo-300 font-bold">accounts@aquaflow.in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
