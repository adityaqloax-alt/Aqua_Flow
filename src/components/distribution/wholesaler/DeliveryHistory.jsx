import React from "react";
import { CheckCircle, Calendar, FileText, Package, Download } from "lucide-react";

const DeliveryHistory = () => {
  const history = [
    { id: "DEL-0981", date: "Oct 02, 2024", items: "120 Cases", status: "Delivered" },
    { id: "DEL-0974", date: "Sep 28, 2024", items: "50 Jars", status: "Delivered" },
    { id: "DEL-0950", date: "Sep 15, 2024", items: "200 Units", status: "Delivered" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-[fadeInUp_0.6s_ease-out]">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Package className="text-slate-400" size={20} />
            Delivery Archive
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Official record of completed inventory transfers.
          </p>
        </div>

        {/* Action Button (Visual Only) */}
        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-4 px-6">Delivery ID</th>
              <th className="py-4 px-6">Received Date</th>
              <th className="py-4 px-6">Volume</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-right">Documents</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {history.map((h, idx) => (
              <tr 
                key={h.id} 
                className="hover:bg-slate-50/50 transition-colors duration-200 group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* ID */}
                <td className="py-4 px-6">
                  <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                    {h.id}
                  </span>
                </td>

                {/* Date */}
                <td className="py-4 px-6 text-slate-600 flex items-center gap-2">
                  <Calendar size={14} className="text-slate-400" />
                  {h.date}
                </td>

                {/* Volume */}
                <td className="py-4 px-6 text-slate-700 font-medium">
                  {h.items}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 shadow-sm">
                    <CheckCircle size={12} /> {h.status}
                  </span>
                </td>

                {/* POD Action */}
                <td className="py-4 px-6 text-right">
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-end gap-1 ml-auto group/link">
                    <FileText size={14} />
                    <span className="group-hover/link:underline">View POD</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400">
          * Proof of Delivery (POD) documents are retained for 12 months.
        </p>
      </div>
    </div>
  );
};

export default DeliveryHistory;
