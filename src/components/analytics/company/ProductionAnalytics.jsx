import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Cell,
  CartesianGrid
} from "recharts";
import { Factory, TrendingUp, AlertCircle } from "lucide-react";

const data = [
  { day: "Mon", output: 5000, target: 5000 },
  { day: "Tue", output: 5200, target: 5000 },
  { day: "Wed", output: 4800, target: 5000 },
  { day: "Thu", output: 5300, target: 5000 },
  { day: "Fri", output: 5000, target: 5000 },
  { day: "Sat", output: 4900, target: 5000 },
  { day: "Sun", output: 5100, target: 5000 },
];

const ProductionAnalytics = () => {
  // Calculate Summary Metrics
  const totalOutput = data.reduce((sum, item) => sum + item.output, 0);
  const avgOutput = Math.round(totalOutput / data.length);
  const targetMisses = data.filter(d => d.output < d.target).length;

  // Custom Tooltip for richer insights
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { output, target } = payload[0].payload;
      const difference = output - target;
      const isPositive = difference >= 0;

      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-200">
          <p className="font-bold text-slate-800 mb-1">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Output:</span>
              <span className="font-bold text-indigo-600">{output.toLocaleString()}L</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Target:</span>
              <span className="font-bold text-slate-600">{target.toLocaleString()}L</span>
            </div>
            <div className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              <span>{isPositive ? '+' : ''}{difference}L</span>
              <span className="text-xs font-normal text-slate-400">vs target</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Header & Mini-KPIs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Factory className="w-5 h-5 text-indigo-600" />
            Production Output
          </h2>
          <p className="text-sm text-slate-500 mt-1">Daily performance vs 5,000L target</p>
        </div>
        
        <div className="flex gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 uppercase font-semibold">Weekly Total</p>
            <p className="text-xl font-bold text-indigo-900">{totalOutput.toLocaleString()}L</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 uppercase font-semibold">Target Misses</p>
            <p className={`text-xl font-bold ${targetMisses > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {targetMisses} days
            </p>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(val) => `${val / 1000}k`} 
              />
              <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
              
              {/* Target Line Annotation */}
              <ReferenceLine 
                y={5000} 
                stroke="#f59e0b" 
                strokeDasharray="4 4" 
                label={{ 
                  value: 'Target (5k)', 
                  position: 'right', 
                  fill: '#d97706', 
                  fontSize: 10 
                }} 
              />
              
              <Bar 
                dataKey="output" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.output < entry.target ? '#f87171' : '#4f46e5'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Footer */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-indigo-600"></div>
            <span>Target Met</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-400"></div>
            <span>Below Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-amber-500"></div>
            <span>Daily Goal (5,000L)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionAnalytics;
