import React from "react";
import { FileText, ArrowUpRight, ArrowDownLeft, CalendarClock } from "lucide-react";

const GSTAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            GST Overview
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Input Tax Credit & Liability
          </p>
        </div>
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
           <FileText size={20} />
        </div>
      </div>

      {/* Main Metric: Net Liability */}
      <div className="bg-indigo-600 rounded-xl p-5 text-white mb-6 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <FileText size={64} />
         </div>
         <p className="text-indigo-200 text-sm font-medium mb-1">Net GST Liability</p>
         <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">₹1.4L</span>
            <span className="text-indigo-200 text-xs mb-1.5">to be paid</span>
         </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
         {/* Collected */}
         <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
               <div className="p-1 bg-white rounded shadow-sm text-emerald-600">
                  <ArrowUpRight size={14} />
               </div>
               <span className="text-xs font-bold text-slate-500 uppercase">Collected</span>
            </div>
            <p className="text-lg font-bold text-slate-800">₹3.2L</p>
            <p className="text-[10px] text-slate-400">Output Tax</p>
         </div>

         {/* Paid */}
         <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
               <div className="p-1 bg-white rounded shadow-sm text-blue-600">
                  <ArrowDownLeft size={14} />
               </div>
               <span className="text-xs font-bold text-slate-500 uppercase">Paid (ITC)</span>
            </div>
            <p className="text-lg font-bold text-slate-800">₹1.8L</p>
            <p className="text-[10px] text-slate-400">Input Tax Credit</p>
         </div>
      </div>

      {/* Footer: Filing Date */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
         <div className="flex items-center gap-2 text-slate-500">
            <CalendarClock size={16} />
            <span className="text-sm font-medium">Next Filing Date</span>
         </div>
         <span className="px-3 py-1 bg-amber-50 text-amber-700 text-sm font-bold rounded-full border border-amber-100">
            20 Jan
         </span>
      </div>

    </div>
  );
};

export default GSTAnalytics;
