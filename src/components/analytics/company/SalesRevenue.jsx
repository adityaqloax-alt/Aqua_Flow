import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Area, 
  ComposedChart,
  ReferenceDot
} from "recharts";
import { IndianRupee, TrendingUp, CalendarDays, DollarSign } from "lucide-react";

const data = [
  { date: "Dec 24", revenue: 12000, orders: 45 },
  { date: "Dec 25", revenue: 15000, orders: 52 },
  { date: "Dec 26", revenue: 11000, orders: 38 },
  { date: "Dec 27", revenue: 17000, orders: 60 }, // Peak
  { date: "Dec 28", revenue: 14000, orders: 49 },
  { date: "Dec 29", revenue: 16000, orders: 55 },
  { date: "Dec 30", revenue: 18000, orders: 65 }, // Current / Highest
];

const SalesRevenue = () => {
  // Financial formatters
  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // Calculations
  const totalRevenue = data.reduce((acc, cur) => acc + cur.revenue, 0);
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxDay = data.find(d => d.revenue === maxRevenue);
  
  // Trend calculation (Last vs First)
  const growth = ((data[data.length - 1].revenue - data[0].revenue) / data[0].revenue * 100).toFixed(1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-xl border border-emerald-100">
          <p className="font-bold text-slate-700 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-slate-500">Revenue:</span>
              <span className="text-sm font-bold text-emerald-700">{formatCurrency(payload[0].value)}</span>
            </div>
            {/* Optional: Show orders count context */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              <span className="text-sm text-slate-500">Orders:</span>
              <span className="text-sm font-bold text-slate-700">{payload[0].payload.orders}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Header Section with Key Metrics */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-emerald-600" />
            Sales & Revenue
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{growth}%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Total revenue (Last 7 Days)</p>
        </div>

        {/* Peak Day Insight */}
        <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 text-right">
          <p className="text-xs text-slate-500 font-semibold uppercase">Highest Sales Day</p>
          <p className="text-lg font-bold text-slate-800">{formatCurrency(maxRevenue)}</p>
          <div className="flex items-center justify-end text-xs text-slate-500 mt-0.5">
            <CalendarDays className="w-3 h-3 mr-1" />
            {maxDay.date}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[250px] w-full bg-white p-2 sm:p-4 rounded-xl border border-slate-100 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            {/* Area fill for better visual weight */}
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="none" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            
            {/* Main Trend Line */}
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesRevenue;
