import React from "react";
import { PieChart, List, CheckCircle, Clock } from "lucide-react";

const OrdersSummary = () => {
  const pending = 26;
  const delivered = 102;
  const total = pending + delivered;
  const completionRate = Math.round((delivered / total) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden animate-[fadeInUp_0.5s_ease-out]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <PieChart className="text-indigo-600" size={20} />
            Fulfillment Rate
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Completion status of all orders.
          </p>
        </div>
        <span className="text-2xl font-extrabold text-slate-800">{completionRate}%</span>
      </div>

      {/* Visual Bar */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex mb-6">
        <div 
          className="h-full bg-emerald-500 hover:bg-emerald-400 transition-colors" 
          style={{ width: `${completionRate}%` }} 
          title="Delivered"
        />
        <div 
          className="h-full bg-amber-400 hover:bg-amber-300 transition-colors" 
          style={{ width: `${100 - completionRate}%` }} 
          title="Pending"
        />
      </div>

      {/* Stats List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
          <div className="flex items-center gap-2">
             <CheckCircle size={16} className="text-emerald-500" />
             <span className="text-sm font-medium text-slate-600">Delivered Orders</span>
          </div>
          <span className="text-sm font-bold text-slate-800">{delivered}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-amber-50/50 rounded-lg border border-amber-100/50">
          <div className="flex items-center gap-2">
             <Clock size={16} className="text-amber-500" />
             <span className="text-sm font-medium text-slate-600">Pending Actions</span>
          </div>
          <span className="text-sm font-bold text-slate-800">{pending}</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersSummary;
