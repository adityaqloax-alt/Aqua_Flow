import React, { useState } from "react";
import { 
  PackageCheck, AlertTriangle, Layers, Info, Search, 
  Filter, ArrowUpRight, PlusCircle, RefreshCw, Box
} from "lucide-react";

const FinishedGoods = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { name: "20L Water Jar", sku: "WJ-20L", qty: 120, max: 200, price: 450, status: "Healthy" },
    { name: "1L Bottle Case", sku: "WB-1L-CS", qty: 0, max: 500, price: 240, status: "Backorder" },
    { name: "500ml Bottle Case", sku: "WB-500-CS", qty: 340, max: 400, price: 180, status: "Healthy" },
    { name: "300ml Mini Case", sku: "WB-300-CS", qty: 45, max: 300, price: 150, status: "Low Stock" },
    { name: "Premium Glass 750ml", sku: "PG-750", qty: 15, max: 100, price: 850, status: "Critical" },
  ];

  // Logic: Filter & Search
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "low") return matchesSearch && (p.status === "Low Stock" || p.status === "Critical");
    if (filter === "out") return matchesSearch && p.status === "Backorder";
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Backorder": return "bg-rose-50 text-rose-600 border-rose-100";
      case "Critical": return "bg-rose-50 text-rose-600 border-rose-100";
      case "Low Stock": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-emerald-50 text-emerald-600 border-emerald-100";
    }
  };

  const getProgressColor = (qty, max) => {
    const pct = (qty / max) * 100;
    if (pct === 0) return "bg-rose-500";
    if (pct < 20) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in zoom-in duration-300">
      
      {/* 1. Header & Controls */}
      <div className="p-5 border-b border-slate-100 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
           <div>
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <Layers className="text-indigo-600" size={20} />
               Finished Goods Inventory
             </h3>
             <p className="text-xs text-slate-500 mt-1">Real-time availability for sales & distribution.</p>
           </div>
           
           {/* Restricted View Badge */}
           <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wide rounded-full border border-slate-200" title="Internal View Only">
             <Info size={12} /> Wholesaler View
           </div>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
             <input 
               type="text" 
               placeholder="Search SKU or Name..." 
               className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <div className="flex bg-slate-100 p-1 rounded-lg">
              {['all', 'low', 'out'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${filter === f ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {f === 'all' ? 'All Items' : f === 'low' ? 'Low Stock' : 'Out of Stock'}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* 2. Table List */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-6">Product Details</th>
              <th className="py-3 px-6 w-1/4">Stock Level</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {filteredProducts.map((p, idx) => {
               const stockPercent = Math.min(100, (p.qty / p.max) * 100);
               
               return (
                <tr 
                  key={p.sku} 
                  className="group hover:bg-slate-50/80 transition-all duration-200"
                >
                  {/* Product Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Box size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{p.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 rounded inline-block mt-0.5">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Stock Meter */}
                  <td className="py-4 px-6">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1.5">
                       <span>{p.qty} Available</span>
                       <span className="text-slate-400">Target: {p.max}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full transition-all duration-500 ${getProgressColor(p.qty, p.max)}`} 
                         style={{ width: `${stockPercent}%` }}
                       />
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border ${getStatusColor(p.status)}`}>
                      {p.status === 'Backorder' || p.status === 'Critical' ? <AlertTriangle size={10} /> : <PackageCheck size={10} />}
                      {p.status}
                    </span>
                  </td>

                  {/* Quick Action */}
                  <td className="py-4 px-6 text-right">
                    {p.qty === 0 || p.status === 'Critical' ? (
                       <button className="text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg shadow-sm shadow-indigo-200 transition-colors flex items-center gap-1 ml-auto">
                         <RefreshCw size={12} /> Restock
                       </button>
                    ) : (
                       <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50">
                         <ArrowUpRight size={16} />
                       </button>
                    )}
                  </td>
                </tr>
               );
            })}
            
            {filteredProducts.length === 0 && (
               <tr>
                 <td colSpan="4" className="py-8 text-center text-slate-400 text-sm">
                   No products found matching your search.
                 </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500 font-medium">
        <span className="flex items-center gap-1"><Info size={12} /> Auto-sync enabled</span>
        <span>Last updated: Just now</span>
      </div>

    </div>
  );
};

export default FinishedGoods;
