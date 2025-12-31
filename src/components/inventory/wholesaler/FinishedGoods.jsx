import React from "react";
import { PackageCheck, AlertTriangle, Layers, Info } from "lucide-react";

const FinishedGoods = () => {
  const products = [
    { name: "20L Water Jar", sku: "WJ-20L", qty: 120, backorder: false },
    { name: "1L Bottle Case", sku: "WB-1L-CS", qty: 0, backorder: true },
    { name: "500ml Bottle Case", sku: "WB-500-CS", qty: 340, backorder: false },
    { name: "300ml Mini Case", sku: "WB-300-CS", qty: 45, backorder: false },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full animate-[fadeInUp_0.4s_ease-out]">
      
      {/* Header with Restricted View Indicator */}
      <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/30">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Layers className="text-indigo-600" size={20} />
            Available Inventory
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time stock levels for placing new orders.
          </p>
        </div>
        
        {/* Wholesaler Restricted View Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-wide rounded-full border border-slate-200 cursor-help" title="Restricted View: Raw Materials and Internal Logs hidden.">
          <Info size={12} />
          Finished Goods Only
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-4 px-6">Product Name</th>
              <th className="py-4 px-6 text-center">SKU Code</th>
              <th className="py-4 px-6 text-center">Available Stock</th>
              <th className="py-4 px-6 text-center">Current Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {products.map((p, idx) => (
              <tr 
                key={p.sku} 
                className="group hover:bg-slate-50 transition-colors duration-200"
                style={{ animation: `fadeIn 0.3s ease-out forwards`, animationDelay: `${idx * 0.1}s`, opacity: 0 }}
              >
                {/* Name */}
                <td className="py-4 px-6 font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                  {p.name}
                </td>
                
                {/* SKU */}
                <td className="py-4 px-6 text-center">
                  <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {p.sku}
                  </span>
                </td>

                {/* Qty */}
                <td className="py-4 px-6 text-center">
                  <span className={`font-bold ${p.qty < 50 && p.qty > 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                    {p.qty} <span className="text-xs font-normal text-slate-400">units</span>
                  </span>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6 text-center">
                  {p.backorder ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100 animate-pulse">
                      <AlertTriangle size={12} /> 
                      Backorder
                    </span>
                  ) : p.qty < 50 ? (
                     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold border border-amber-100">
                      <AlertTriangle size={12} /> 
                      Low Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 shadow-sm">
                      <PackageCheck size={12} /> 
                      Available
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Disclaimer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <Info size={12} />
          Note: Inventory counts are updated every 15 minutes. High demand items may change rapidly.
        </p>
      </div>

      {/* Inline Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FinishedGoods;
