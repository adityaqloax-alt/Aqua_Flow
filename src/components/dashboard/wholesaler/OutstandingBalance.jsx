import React from "react";
import { Wallet, AlertCircle, ArrowRight } from "lucide-react";

const OutstandingBalance = () => {
  const balance = 124500;
  const dueDate = "Oct 05, 2024";

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 relative overflow-hidden group animate-[fadeInUp_0.6s_ease-out]">
      
      {/* Background Decorator */}
      <div className="absolute -right-6 -top-6 text-rose-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
        <Wallet size={120} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-2 mb-4">
        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
          <Wallet size={20} />
        </div>
        <h3 className="font-bold text-slate-800">Payment Due</h3>
      </div>

      {/* Main Metric */}
      <div className="relative z-10">
        <p className="text-3xl font-extrabold text-rose-600 tracking-tight mb-1">
          ₹ {balance.toLocaleString()}
        </p>
        <p className="text-xs font-semibold text-rose-500 bg-rose-50 inline-flex items-center gap-1 px-2 py-0.5 rounded border border-rose-100">
          <AlertCircle size={10} /> Due by {dueDate}
        </p>
      </div>

      {/* Footer / CTA */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
        <p className="text-[10px] text-slate-400">
          * Clear dues to maintain credit limit.
        </p>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
          View Invoices <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default OutstandingBalance;
