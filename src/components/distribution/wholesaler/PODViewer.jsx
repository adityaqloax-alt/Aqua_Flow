import React from "react";
import { FileText, Eye, Download, Shield } from "lucide-react";

const PODViewer = () => {
  const pods = [
    { id: "DEL-0981", file: "POD_0981_Signed.pdf", date: "Oct 02, 2024" },
    { id: "DEL-0974", file: "POD_0974_Signed.pdf", date: "Sep 28, 2024" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden animate-[fadeInUp_0.7s_ease-out]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Shield className="text-emerald-600" size={20} />
            Digital PODs
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access signed proof of delivery documents.
          </p>
        </div>
      </div>

      {/* POD List */}
      <ul className="space-y-3">
        {pods.map((p, idx) => (
          <li
            key={p.id}
            className="group flex items-center justify-between p-4 bg-slate-50/50 border border-slate-200 rounded-xl hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* File Info */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-red-500 shadow-sm group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800 group-hover:text-indigo-700 transition-colors">
                  {p.id}
                </p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {p.file} • <span className="text-slate-500">{p.date}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" 
                title="Preview"
              >
                <Eye size={16} />
              </button>
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400">
          Documents are securely signed and timestamped upon receipt.
        </p>
      </div>
    </div>
  );
};

export default PODViewer;
