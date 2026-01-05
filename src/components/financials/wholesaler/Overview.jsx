import React, { useState, useEffect } from "react";
import { 
  IndianRupee, FileText, AlertCircle, ShieldCheck, CreditCard,
  Calendar, ArrowRight
} from "lucide-react";

const Overview = () => {
  const [financials, setFinancials] = useState({
    totalInvoices: 18,
    outstandingInvoices: 3,
    totalOutstanding: 125000,
    urgentInvoices: 2,
    totalPayments: 205000,
    verifiedPayments: 2,
    pendingPayments: 1,
    creditLimit: 300000,
    creditUsed: 125000,
    creditAvailable: 175000,
    creditUtilization: 42,
    totalStatements: 3,
    outstandingFromStatements: 125000,
    riskScore: 72,
    gstCompliance: "100%",
    lastActivity: "2h ago"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFinancials(prev => {
        const newUsed = Math.max(0, prev.creditUsed + (Math.random() - 0.5) * 5000);
        const totalOutstanding = Math.max(50000, prev.totalOutstanding + (Math.random() - 0.5) * 8000);
        return {
          ...prev,
          totalOutstanding,
          creditUsed: newUsed,
          creditAvailable: prev.creditLimit - newUsed
        };
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const creditUtilization = Math.round((financials.creditUsed / financials.creditLimit) * 100);
  const isCritical = financials.urgentInvoices > 2 || creditUtilization > 85;
  const totalActivity =
    financials.totalInvoices + financials.totalPayments + financials.totalStatements;

  const handleNavigate = (section) => {
    const messages = {
      invoices: `Opening Invoices (${financials.totalInvoices} total, ${financials.outstandingInvoices} unpaid)`,
      payments: `Opening Payments (₹${financials.totalPayments.toLocaleString()} total)`,
      credit: `Opening Credit Limit (₹${financials.creditAvailable.toLocaleString()} available)`,
      statements: `Opening Statements (${financials.totalStatements} months)`
    };
    alert(messages[section] || "Navigating");
  };

  const statusLabel = isCritical
    ? "Critical risk"
    : creditUtilization > 70
    ? "High exposure"
    : "Healthy position";

  const statusColor =
    isCritical
      ? "text-red-700 bg-red-50 border-red-200"
      : creditUtilization > 70
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-emerald-700 bg-emerald-50 border-emerald-200";

  const barColor =
    creditUtilization > 85
      ? "bg-red-500"
      : creditUtilization > 70
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Wholesaler Financial Overview
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Consolidated view of invoices, payments, credit usage, and statements.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>{totalActivity} records</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>
              GST compliance:{" "}
              <span className="font-semibold text-emerald-600">
                {financials.gstCompliance}
              </span>
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Last activity: {financials.lastActivity}</span>
          </div>
        </header>

        {/* Top risk + credit block */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Outstanding & risk */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-lg ${
                    isCritical ? "bg-red-50" : "bg-emerald-50"
                  }`}
                >
                  {isCritical ? (
                    <AlertCircle className="text-red-600" size={22} />
                  ) : (
                    <ShieldCheck className="text-emerald-600" size={22} />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Total outstanding
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    ₹{financials.totalOutstanding.toLocaleString()}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusColor}`}
              >
                {statusLabel}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Invoices</p>
                <p className="text-lg font-semibold text-slate-900">
                  {financials.totalInvoices}
                </p>
                <p className="text-xs text-red-600 font-medium">
                  {financials.outstandingInvoices} unpaid
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Payments received</p>
                <p className="text-lg font-semibold text-slate-900">
                  ₹{financials.totalPayments.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 font-medium">
                  {financials.verifiedPayments} verified
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Credit used</p>
                <p className="text-lg font-semibold text-slate-900">
                  ₹{financials.creditUsed.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  Limit ₹{financials.creditLimit.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Statements</p>
                <p className="text-lg font-semibold text-slate-900">
                  {financials.totalStatements}
                </p>
                <p className="text-xs text-slate-500">months available</p>
              </div>
            </div>
          </div>

          {/* Credit utilization card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-indigo-600" />
                <p className="text-sm font-semibold text-slate-700">
                  Credit utilization
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {creditUtilization}%
              </p>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full ${barColor} rounded-full transition-all`}
                style={{ width: `${creditUtilization}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-4">
              <span>₹0</span>
              <span>₹{financials.creditLimit.toLocaleString()}</span>
            </div>
            <div className="space-y-1 text-xs">
              <p className="flex justify-between">
                <span>Available credit</span>
                <span className="font-semibold text-emerald-600">
                  ₹{financials.creditAvailable.toLocaleString()}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Risk score</span>
                <span className="font-semibold text-slate-800">
                  {financials.riskScore}/100
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Quick navigation */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => handleNavigate("invoices")}
            className="group bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-50">
                <FileText size={18} className="text-indigo-600" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                GST invoices
              </p>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {financials.totalInvoices}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {financials.outstandingInvoices} unpaid,{" "}
              {financials.urgentInvoices} urgent
            </p>
            <ArrowRight
              size={16}
              className="mt-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition"
            />
          </button>

          <button
            onClick={() => handleNavigate("payments")}
            className="group bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-50">
                <IndianRupee size={18} className="text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Payments ledger
              </p>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ₹{financials.totalPayments.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {financials.verifiedPayments} verified,{" "}
              {financials.pendingPayments} pending
            </p>
            <ArrowRight
              size={16}
              className="mt-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition"
            />
          </button>

          <button
            onClick={() => handleNavigate("credit")}
            className="group bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:border-purple-200 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <CreditCard size={18} className="text-purple-600" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Credit limit
              </p>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ₹{financials.creditAvailable.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {creditUtilization}% of ₹{financials.creditLimit.toLocaleString()} in use
            </p>
            <ArrowRight
              size={16}
              className="mt-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition"
            />
          </button>

          <button
            onClick={() => handleNavigate("statements")}
            className="group bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-slate-100">
                <Calendar size={18} className="text-slate-700" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Monthly statements
              </p>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {financials.totalStatements}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Closing balance: ₹
              {financials.outstandingFromStatements.toLocaleString()}
            </p>
            <ArrowRight
              size={16}
              className="mt-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition"
            />
          </button>
        </section>

        {/* Compliance footer */}
        <footer className="mt-4 bg-slate-900 text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} />
            <p className="text-sm font-semibold">
              GST-compliant billing and payment records.
            </p>
          </div>
          <p className="text-xs text-slate-300">
            For account queries:{" "}
            <span className="font-medium underline">accounts@aquaflow.in</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Overview;
