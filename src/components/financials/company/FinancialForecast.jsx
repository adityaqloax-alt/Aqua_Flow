import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  ReferenceLine 
} from "recharts";
import { TrendingUp, Target } from "lucide-react";

const data = [
  { month: "Jan", profit: 420000 },
  { month: "Feb", profit: 460000 },
  { month: "Mar", profit: 520000 },
  { month: "Apr", profit: 580000 },
  { month: "May (Proj)", profit: 640000 }, // Added projection point
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
        <p className="text-sm font-bold text-slate-800 mb-1">{label}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Proj. Profit:</span>
          <span className="font-bold text-indigo-600">
            {formatCurrency(payload[0].value)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const FinancialForecast = () => {
  // Calculate Growth (Simple metric for header)
  const growth = ((data[data.length-1].profit - data[0].profit) / data[0].profit * 100).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Financial Forecast
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Projected Net Profit Growth
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold">
           <TrendingUp size={16} />
           <span>+{growth}% Growth</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              tickFormatter={(val) => `₹${val/1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }} />
            
            {/* Break-even Line Visualization */}
            <ReferenceLine 
              y={450000} 
              stroke="#f59e0b" 
              strokeDasharray="3 3" 
              label={{ position: 'insideTopRight', value: 'Break-even', fill: '#d97706', fontSize: 11, fontWeight: 600 }} 
            />

            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#6366f1" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorProfit)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-start gap-3">
        <div className="p-2 bg-slate-100 rounded-full text-slate-600 mt-0.5">
           <Target size={16} />
        </div>
        <div>
           <p className="text-sm text-slate-600 font-medium">
             Break-even Analysis
           </p>
           <p className="text-xs text-slate-500 leading-relaxed">
             Break-even volume projected at <span className="font-bold text-slate-800">42,000 L / month</span>. Current trajectory suggests surpassing this by <span className="text-emerald-600 font-bold">May 15th</span>.
           </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialForecast;
