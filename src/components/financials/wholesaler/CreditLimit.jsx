import React, { useState } from "react";
import {
  CreditCard, AlertTriangle, ShieldCheck, FileText, TrendingUp,
  ArrowRight, Minus, CheckCircle, Clock
} from "lucide-react";

const W_CreditLimit = () => {
  const [showInvoices, setShowInvoices] = useState(false);

  const credit = {
    limit: 300000,
    used: 125000,
    available: 175000,
    invoices: [
      { id: "INV-001", amount: 45000, status: "pending", due: "Jan 15" },
      { id: "INV-002", amount: 80000, status: "overdue", due: "Dec 28" },
      { id: "INV-003", amount: 22500, status: "paid", due: "Jan 05" }
    ]
  };

  const percentUsed = Math.round((credit.used / credit.limit) * 100);
  const status = percentUsed > 85 ? "critical" : percentUsed > 65 ? "warning" : "healthy";

  const getStatusConfig = () => {
    switch (status) {
      case "critical": return { label: "Critical", color: "text-red-600", bg: "bg-red-50 border-red-200", gradient: "from-red-500/20 to-red-600/20" };
      case "warning": return { label: "Warning", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", gradient: "from-amber-500/20 to-amber-600/20" };
      default: return { label: "Healthy", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", gradient: "from-emerald-500/20 to-emerald-600/20" };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200/50 rounded-3xl shadow-xl backdrop-blur-sm p-8 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${statusConfig.bg} shadow-lg border-2 ${statusConfig.color.replace('text-', 'border-')} backdrop-blur-sm`}>
            <CreditCard size={28} className={`${statusConfig.color} drop-shadow-lg`} />
          </div>
          <div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
              Credit Limit
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">₹{credit.limit.toLocaleString()} Total Capacity</p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-2xl font-bold text-sm shadow-lg ${statusConfig.bg} ${statusConfig.color} border-2 ${statusConfig.color.replace('text-', 'border-')}`}>
          {statusConfig.label}
        </div>
      </div>

      {/* Progress Ring + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
        
        {/* Animated Progress Ring */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path 
                className="text-slate-200 fill-none stroke-slate-200 stroke-6"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path 
                className={`
                  fill-none stroke-[6] stroke-linecap-round transition-all duration-1500 
                  ${status === 'critical' ? 'stroke-red-500' : status === 'warning' ? 'stroke-amber-500' : 'stroke-emerald-500'}
                `}
                strokeDasharray="100, 100"
                strokeDashoffset={100 - percentUsed}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-black text-slate-900">{percentUsed}%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Used</div>
            </div>
          </div>
          <div className="text-center mt-4 space-y-1">
            <p className="text-sm text-slate-600 flex items-center justify-center gap-1">
              <TrendingUp size={16} className="text-emerald-500" />
              Available: ₹{credit.available.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50">
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Outstanding</p>
              <p className="text-2xl font-black text-slate-900">₹{credit.used.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Limit</p>
              <p className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                ₹{credit.limit.toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200/50">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2">
              <CreditCard size={18} />
              Request Increase
            </button>
            <button className="px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 font-bold rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2">
              <CheckCircle size={18} />
              Make Payment
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Invoices */}
      <div className="relative">
        <div 
          className="p-6 bg-gradient-to-r from-slate-50 to-indigo-50/30 backdrop-blur-sm rounded-2xl border border-slate-200/50 cursor-pointer hover:shadow-md transition-all group"
          onClick={() => setShowInvoices(!showInvoices)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                <FileText size={20} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-800">Outstanding Invoices</h4>
                <p className="text-sm text-slate-600">{credit.invoices.length} invoices • ₹{(credit.used).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
              <span>{showInvoices ? "Hide" : "View"}</span>
              <ArrowRight size={16} className={`transition-transform ${showInvoices ? 'rotate-90' : ''}`} />
            </div>
          </div>
        </div>

        {showInvoices && (
          <div className="mt-4 space-y-3 animate-in slide-in-from-top-4">
            {credit.invoices.map((inv, idx) => {
              const invStatus = inv.status === 'paid' ? 'text-emerald-600 bg-emerald-100' : 
                               inv.status === 'overdue' ? 'text-red-600 bg-red-100' : 
                               'text-amber-600 bg-amber-100';
              
              return (
                <div key={inv.id} className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${invStatus}`}>
                      <FileText size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-mono font-bold text-sm text-slate-800">{inv.id}</p>
                      <p className={`text-xs font-semibold ${invStatus}`}>{inv.status.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-slate-900">₹{inv.amount.toLocaleString()}</p>
                    <p className={`text-xs ${inv.status === 'overdue' ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
                      Due: {inv.due}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Conditional Alert */}
      {percentUsed > 80 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-red-100/50 border-2 border-red-200/50 rounded-2xl backdrop-blur-sm animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center border-2 border-red-500/30 mt-0.5 flex-shrink-0">
              <AlertTriangle size={24} className="text-red-600 drop-shadow-lg" />
            </div>
            <div>
              <h5 className="font-bold text-lg text-red-800 mb-1">⚠️ Credit Limit Warning</h5>
              <p className="text-sm text-red-700 leading-relaxed">
                Your credit usage is <span className="font-black">{percentUsed}%</span>. 
                Clear pending invoices to maintain uninterrupted supply.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200/50 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Secured by AquaFlow Finance • Last updated 2 mins ago</span>
      </div>
    </div>
  );
};

export default W_CreditLimit;
