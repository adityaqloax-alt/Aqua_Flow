import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Aug", inflow: 1200000, outflow: 900000 },
  { month: "Sep", inflow: 1350000, outflow: 950000 },
  { month: "Oct", inflow: 1500000, outflow: 1100000 },
  { month: "Nov", inflow: 1650000, outflow: 1200000 },
  { month: "Dec", inflow: 1800000, outflow: 1250000 },
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
      <div className="bg-white p-4 border border-slate-200 shadow-xl rounded-xl z-50">
        <p className="text-sm font-bold text-slate-800 mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-500">Inflow:</span>
            <span className="font-bold text-emerald-600 ml-auto">
              {formatCurrency(payload[0].value)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="text-slate-500">Outflow:</span>
            <span className="font-bold text-rose-600 ml-auto">
              {formatCurrency(payload[1].value)}
            </span>
          </div>
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-400">
             <span>Net:</span>
             <span className={(payload[0].value - payload[1].value) >= 0 ? "text-slate-700" : "text-rose-600"}>
               {formatCurrency(payload[0].value - payload[1].value)}
             </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CashFlow = () => {
  const currentMonth = data[data.length - 1];
  const netCashFlow = currentMonth.inflow - currentMonth.outflow;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Cash Flow Trends
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Inflow vs Outflow analysis
          </p>
        </div>
        
        {/* KPI Pill */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
          <div className={`p-1.5 rounded-full ${netCashFlow >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Net (Dec)</p>
            <p className={`text-sm font-bold ${netCashFlow >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {netCashFlow >= 0 ? '+' : ''}{formatCurrency(netCashFlow)}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
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
              tickFormatter={(val) => `₹${val/100000}L`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Legend 
               wrapperStyle={{ paddingTop: '20px' }}
               formatter={(value) => <span className="text-sm font-medium text-slate-600 ml-1">{value}</span>}
            />
            <Area 
              name="Cash Inflow"
              type="monotone" 
              dataKey="inflow" 
              stroke="#10b981" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorInflow)" 
            />
            <Area 
              name="Cash Outflow"
              type="monotone" 
              dataKey="outflow" 
              stroke="#f43f5e" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorOutflow)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlow;
