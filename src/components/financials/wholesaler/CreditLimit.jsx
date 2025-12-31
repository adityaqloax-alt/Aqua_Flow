import React, { useState, useEffect } from "react";
import { 
  CreditCard, AlertTriangle, ShieldCheck, TrendingUp, ArrowUp, 
  ArrowDown, Eye, FileText, Clock, BarChart3 
} from "lucide-react";

const CreditLimit = () => {
  // Dynamic state with API simulation
  const [creditData, setCreditData] = useState({
    limit: 300000,
    used: 125000,
    available: 175000,
    trend: 2.3, // Monthly %
    topInvoices: [
      { id: "INV-2024-001", amount: 45000 },
      { id: "INV-2024-002", amount: 80000 },
      { id: "INV-2024-003", amount: 22500 }
    ],
    lastUpdated: new Date()
  });

  const [showDetails, setShowDetails] = useState(false);
  const [usageHistory, setUsageHistory] = useState([42, 38, 45, 41, 39]); // Last 5 months %

  // Simulate live API updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCreditData(prev => {
        const newUsed = prev.used + (Math.random() - 0.5) * 5000;
        return {
          ...prev,
          used: Math.max(0, Math.min(prev.limit, newUsed)),
          available: Math.max(0, prev.limit - newUsed),
          lastUpdated: new Date()
        };
      });
    }, 10000); // Update every 10s

    return () => clearInterval(interval);
  }, []);

  // Dynamic calculations
  const percent = Math.round((creditData.used / creditData.limit) * 100);
  const available = creditData.limit - creditData.used;

  // Clean health status logic
  const getHealthStatus = () => {
    if (percent > 90) return { bg: "bg-red-500/90", text: "text-red-600", status: "Critical", icon: AlertTriangle };
    if (percent > 75) return { bg: "bg-amber-500/90", text: "text-amber-600", status: "Attention Needed", icon: Clock };
    return { bg: "bg-emerald-500/90", text: "text-emerald-600", status: "Good Standing", icon: ShieldCheck };
  };

  const health = getHealthStatus();

  // Responsive grid
  const isMobile = window.innerWidth < 640;

  const handleViewInvoices = () => {
    // In real app: navigate to invoices page filtered by unpaid
    alert(`Opening ${creditData.topInvoices.length} outstanding invoices`);
  };

  const requestLimitIncrease = () => {
    // Modal/form for limit increase request
    alert("Request submitted! Credit team will review within 48 hours.");
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl p-6 lg:p-8 overflow-hidden relative group hover:shadow-3xl transition-all duration-500 animate-[float_6s_ease-in-out_infinite]">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-emerald-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-6 lg:mb-8">
        <div className="flex items-center gap-3">
          <div className={`p-3 lg:p-4 rounded-2xl ${health.bg} shadow-lg border-2 border-white/50`}>
            <CreditCard className={`${health.text} drop-shadow-md`} size={24} />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-1 leading-tight">
              Credit Utilization
            </h3>
            <p className="text-sm lg:text-base text-slate-600 font-medium">
              ₹{creditData.available.toLocaleString()} available
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <span className={`px-3 py-1.5 text-xs lg:text-sm font-bold uppercase tracking-wide rounded-full shadow-md border-2 ${health.bg} ${health.text}`}>
            {health.status}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock size={12} />
            {creditData.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Progress Bar with ARIA */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-slate-700">₹{creditData.used.toLocaleString()} Used</span>
          <span className="text-lg font-black text-slate-900">{percent}%</span>
        </div>
        
        <div 
          role="progressbar" 
          aria-valuenow={percent} 
          aria-valuemin="0" 
          aria-valuemax="100"
          aria-label={`Credit used ${percent}% of limit`}
          className="relative w-full bg-slate-100/50 backdrop-blur-sm rounded-2xl h-4 lg:h-5 overflow-hidden shadow-inner border border-slate-200/50"
        >
          <div
            className={`h-full rounded-2xl shadow-lg transition-all duration-1500 ease-out relative overflow-hidden ${health.bg}`}
            style={{ width: `${percent}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -skew-x-12 animate-shine" />
          </div>
          {/* Usage label on bar */}
          {percent > 20 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white drop-shadow-lg whitespace-nowrap">
              ₹{creditData.available.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 lg:grid-cols-3 gap-6'} mb-6 pt-6 border-t border-slate-100/50`}>
        <div className="text-center lg:text-left">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2 flex items-center justify-center lg:justify-start gap-1">
            Total Limit
          </p>
          <p className="text-2xl lg:text-3xl font-black text-slate-900">
            ₹{creditData.limit.toLocaleString()}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2 flex items-center justify-center gap-1">
            Used This Month
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <p className="text-xl lg:text-2xl font-black text-slate-900">
              ₹{creditData.used.toLocaleString()}
            </p>
            <TrendingUp className={`w-5 h-5 ${creditData.trend > 0 ? 'text-emerald-500' : 'text-red-500 rotate-180'}`} />
            <span className={`text-sm font-bold ${creditData.trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {creditData.trend}%
            </span>
          </div>
        </div>
        
        <div className="text-center lg:text-right">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2 flex items-center justify-center lg:justify-end gap-1">
            Available Balance
          </p>
          <p className={`text-2xl lg:text-3xl font-black ${available < 50000 ? 'text-red-600 animate-pulse' : 'text-emerald-600'}`}>
            ₹{available.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Top Contributing Invoices */}
      <div className="relative">
        <div 
          className="p-4 lg:p-6 bg-gradient-to-r from-slate-50/80 to-indigo-50/50 backdrop-blur-sm rounded-2xl border border-slate-100/50 cursor-pointer hover:shadow-md transition-all group"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <BarChart3 size={16} />
              Top Invoices Using Credit
            </h4>
            <Eye className={`w-5 h-5 text-slate-500 group-hover:text-indigo-600 transition-colors ${showDetails ? 'rotate-90' : ''}`} />
          </div>
          
          <div className={`space-y-2 overflow-hidden transition-all duration-300 ${showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {creditData.topInvoices.map((inv, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/60 rounded-xl border hover:bg-white hover:shadow-sm transition-all">
                <span className="text-xs font-mono text-slate-700">#{inv.id}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-indigo-600">₹{inv.amount.toLocaleString()}</span>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional Alerts */}
      {percent > 80 && (
        <div className="mt-6 p-4 lg:p-5 bg-gradient-to-r from-red-50/90 to-amber-50/90 border-2 border-red-200/50 backdrop-blur-sm rounded-2xl shadow-lg animate-pulse">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-red-900 mb-1 text-sm lg:text-base">High Credit Usage Alert</h5>
              <p className="text-red-800 text-sm mb-3">
                {percent > 90 
                  ? "Credit limit critical. Immediate payment recommended to avoid order restrictions." 
                  : "Usage approaching limit. Clear outstanding invoices to maintain ordering capacity."
                }
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleViewInvoices}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 shadow-lg transition-all"
                >
                  <FileText size={14} />
                  View Invoices
                </button>
                <button
                  onClick={requestLimitIncrease}
                  className="px-4 py-2 bg-white border-2 border-red-200 text-red-700 text-xs font-bold rounded-xl hover:bg-red-50 hover:shadow-md transition-all"
                >
                  Request Increase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100/50">
        <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2 font-medium">
          <ShieldCheck size={14} className="text-emerald-500" />
          Credit limits reviewed quarterly • Real-time balance updates
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default CreditLimit;
