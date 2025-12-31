import React, { useState } from "react";
import { ArrowUpDown, Truck, MapPin, TrendingUp, MoreHorizontal } from "lucide-react";

// Enhanced data with numeric values for sorting
const initialRoutes = [
  { id: 1, route: "Route A (North)", revenue: 450000, profit: 160000, margin: 36, trucks: 4 },
  { id: 2, route: "Route B (East)", revenue: 320000, profit: 90000, margin: 28, trucks: 3 },
  { id: 3, route: "Route C (Central)", revenue: 280000, profit: 60000, margin: 21, trucks: 2 },
  { id: 4, route: "Route D (South)", revenue: 510000, profit: 195000, margin: 38, trucks: 5 },
  { id: 5, route: "Route E (West)", revenue: 150000, profit: 15000, margin: 10, trucks: 2 },
];

const ProfitabilityByRoute = () => {
  const [data, setData] = useState(initialRoutes);
  const [sortConfig, setSortConfig] = useState({ key: 'margin', direction: 'desc' });

  // Helper to format currency
  const formatVal = (val) => `₹${(val / 100000).toFixed(1)}L`;

  // Sort Handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  // Helper for Margin Color
  const getMarginColor = (margin) => {
    if (margin >= 30) return "bg-emerald-500";
    if (margin >= 20) return "bg-blue-500";
    return "bg-rose-500";
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Route Profitability
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Performance breakdown by distribution zone
          </p>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Route
              </th>
              {['revenue', 'profit', 'margin'].map((key) => (
                <th 
                  key={key}
                  onClick={() => handleSort(key)}
                  className="py-3 px-2 text-right cursor-pointer group"
                >
                  <div className="flex items-center justify-end gap-1 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-indigo-600 transition-colors">
                    {key}
                    <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === key ? 'opacity-100 text-indigo-600' : ''}`} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((r) => (
              <tr key={r.id} className="group hover:bg-slate-50/80 transition-colors duration-200">
                
                {/* Route Name Column */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                       <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700">{r.route}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                        <Truck size={10} />
                        <span>{r.trucks} Trucks</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Revenue Column */}
                <td className="py-4 px-2 text-right">
                  <span className="font-semibold text-slate-700">{formatVal(r.revenue)}</span>
                </td>

                {/* Profit Column */}
                <td className="py-4 px-2 text-right">
                  <div className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">
                     <TrendingUp size={12} />
                     {formatVal(r.profit)}
                  </div>
                </td>

                {/* Margin Column with Progress Bar */}
                <td className="py-4 px-2 text-right min-w-[120px]">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold text-slate-700">{r.margin}%</span>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getMarginColor(r.margin)} transition-all duration-500`} 
                        style={{ width: `${r.margin}%` }}
                      />
                    </div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitabilityByRoute;
