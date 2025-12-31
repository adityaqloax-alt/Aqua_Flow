import React from 'react';
import { 
  TrendingUp, TrendingDown, AlertCircle, 
  Award, ArrowRight, ShieldAlert 
} from 'lucide-react';

const Insights = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. TOP REVENUE CUSTOMERS (The VIP List) */}
        <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Award className="text-amber-500" size={20}/> Top Revenue Sources
            </h3>
            <button className="text-xs text-indigo-600 font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: "ABC Hospital", val: "₹1.2L", trend: "+12%", share: 85 },
              { name: "Tech Park Zone 1", val: "₹95k", trend: "+5%", share: 60 },
              { name: "Grand Hotel", val: "₹72k", trend: "+8%", share: 45 },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{c.name}</span>
                    <span className="font-bold text-slate-900">{c.val}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${c.share}%` }}></div>
                  </div>
                </div>
                <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">
                  {c.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CHURN RISK (Declining Usage) */}
        <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingDown className="text-rose-500" size={20}/> Usage Drop (Risk)
            </h3>
            <span className="text-xs text-slate-400">Last 30 Days</span>
          </div>
          <div className="space-y-3">
             {[
              { name: "Sunrise Apts", drop: "-45%", reason: "Pump Maintenance?" },
              { name: "XYZ Factory", drop: "-100%", reason: "Stopped Ordering (Critical)" },
              { name: "Green Villa", drop: "-20%", reason: "Seasonal Dip" },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-rose-50 border border-rose-100 rounded-lg">
                <div>
                   <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                   <p className="text-xs text-rose-700">{c.reason}</p>
                </div>
                <div className="text-right">
                   <p className="font-bold text-rose-600">{c.drop}</p>
                   <button className="text-[10px] uppercase font-bold text-rose-800 underline">Check</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. RETENTION & CONTRACT HEALTH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm md:col-span-2">
           <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <ShieldAlert className="text-slate-400" size={18} /> High Risk Payment Accounts
           </h3>
           <table className="w-full text-sm text-left">
             <thead className="bg-slate-50 text-slate-500">
               <tr>
                 <th className="p-2">Customer</th>
                 <th className="p-2">Due Amount</th>
                 <th className="p-2">Days Overdue</th>
                 <th className="p-2">Action</th>
               </tr>
             </thead>
             <tbody>
               <tr className="border-b border-slate-50">
                 <td className="p-2 font-medium">Industrial Zone C</td>
                 <td className="p-2 font-bold text-rose-600">₹45,000</td>
                 <td className="p-2 text-rose-600">62 Days</td>
                 <td className="p-2"><button className="text-xs bg-slate-800 text-white px-2 py-1 rounded">Call</button></td>
               </tr>
                <tr>
                 <td className="p-2 font-medium">City Gym</td>
                 <td className="p-2 font-bold text-rose-600">₹12,200</td>
                 <td className="p-2 text-amber-600">35 Days</td>
                 <td className="p-2"><button className="text-xs bg-slate-100 text-slate-600 border px-2 py-1 rounded">Email</button></td>
               </tr>
             </tbody>
           </table>
        </div>
        
        <div className="p-5 border border-slate-200 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-lg flex flex-col justify-between">
           <div>
             <h3 className="font-bold text-lg">Renewal Forecast</h3>
             <p className="text-indigo-200 text-sm mt-1">Next 60 Days</p>
           </div>
           <div className="text-center py-4">
             <div className="text-5xl font-bold">8</div>
             <div className="text-indigo-200 text-sm">Contracts Expiring</div>
           </div>
           <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
             View Contracts <ArrowRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default Insights;
