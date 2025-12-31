import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Legend
} from "recharts";
import { TrendingUp, Calendar, BarChart3 } from "lucide-react";

const forecastData = [
  { day: "Dec 31", demand: 4800, actual: 4700 },
  { day: "Jan 1", demand: 5000, actual: 4950 },
  { day: "Jan 2", demand: 5200, actual: null },
  { day: "Jan 3", demand: 5100, actual: null },
  { day: "Jan 4", demand: 5300, actual: null },
  { day: "Jan 5", demand: 5400, actual: null },
  { day: "Jan 6", demand: 5500, actual: null },
];

const Forecasts = () => {
  // Calculate KPIs
  const totalForecast = forecastData.reduce((sum, item) => sum + item.demand, 0);
  const avgDailyDemand = Math.round(totalForecast / forecastData.length);
  const peakDemand = Math.max(...forecastData.map(d => d.demand));
  const peakDay = forecastData.find(d => d.demand === peakDemand)?.day;
  
  // Calculate growth trend
  const firstValue = forecastData[0].demand;
  const lastValue = forecastData[forecastData.length - 1].demand;
  const growthPercent = ((lastValue - firstValue) / firstValue * 100).toFixed(1);
  
  // Production capacity threshold
  const capacityLimit = 5200;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">{payload[0].payload.day}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}L</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Demand Forecasts (7-Day Outlook)</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                Total Forecasted Demand
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {totalForecast.toLocaleString()}L
              </p>
            </div>
            <BarChart3 className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border-2 border-amber-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
                Peak Demand Day
              </p>
              <p className="text-2xl font-bold text-slate-800">{peakDemand.toLocaleString()}L</p>
              <p className="text-xs text-slate-600 mt-1">{peakDay}</p>
            </div>
            <Calendar className="w-6 h-6 text-amber-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border-2 border-emerald-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                Avg Daily Demand
              </p>
              <p className="text-2xl font-bold text-slate-800">{avgDailyDemand.toLocaleString()}L</p>
              <div className="flex items-center text-sm text-emerald-600 font-semibold mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{growthPercent}% trend
              </div>
            </div>
            <TrendingUp className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Chart with Annotations */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="day" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              iconType="line"
            />
            
            {/* Capacity Threshold Line */}
            <ReferenceLine 
              y={capacityLimit} 
              stroke="#ef4444" 
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{ 
                value: `Capacity Limit: ${capacityLimit}L`, 
                position: 'insideTopRight',
                fill: '#ef4444',
                fontSize: 11,
                fontWeight: 'bold'
              }}
            />
            
            {/* Forecast Line */}
            <Line 
              type="monotone" 
              dataKey="demand" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 5 }}
              activeDot={{ r: 7 }}
              name="Forecasted Demand"
            />
            
            {/* Actual Demand Line (for comparison) */}
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
              strokeDasharray="5 5"
              name="Actual Demand"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Chart Legend/Notes */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span>Forecasted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>Actual (Past)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-red-500"></div>
              <span>Capacity Threshold</span>
            </div>
          </div>
          <p className="text-slate-500 italic">
            {peakDemand > capacityLimit ? '⚠️ Peak exceeds capacity' : '✓ Within capacity'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forecasts;
