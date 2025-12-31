import React, { useState, useEffect } from "react";
import { 
  TrendingUp, BarChart2, Calendar, Download, Filter, ArrowUp, ArrowDown,
  Eye, Maximize2, ChevronLeft, ChevronRight 
} from "lucide-react";

const OrderTrends = () => {
  // Enhanced dataset with growth, revenue, targets
  const [data, setData] = useState([
    { month: "Jul", orders: 12, revenue: 45000, growth: 0, target: 15, region: "All" },
    { month: "Aug", orders: 18, revenue: 72000, growth: 50, target: 20, region: "All" },
    { month: "Sep", orders: 25, revenue: 112500, growth: 39, target: 22, region: "All" }, // Peak
    { month: "Oct", orders: 21, revenue: 94500, growth: -16, target: 25, region: "All" },
    { month: "Nov", orders: 28, revenue: 126000, growth: 33, target: 28, region: "All" },
  ]);

  // State management
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [filters, setFilters] = useState({ region: 'All', type: 'All' });
  const [isExporting, setIsExporting] = useState(false);
  const maxOrders = Math.max(...data.map(d => d.orders));
  const minOrders = Math.min(...data.map(d => d.orders));

  // Live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map((d, idx) => ({
        ...d,
        orders: Math.max(8, d.orders + (Math.random() - 0.5) * 3),
        revenue: Math.max(30000, d.revenue + (Math.random() - 0.5) * 5000)
      })));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Metrics calculations
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
  const avgOrders = (totalOrders / data.length).toFixed(1);
  const overallGrowth = ((data[data.length-1].orders - data[0].orders) / data[0].orders * 100).toFixed(1);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Simulate PNG export
      const link = document.createElement('a');
      link.download = `order-trends-${new Date().toISOString().slice(0,10)}.png`;
      link.click();
      setIsExporting(false);
    }, 1000);
  };

  const getGrowthColor = (growth) => {
    if (growth > 20) return { bg: 'bg-emerald-500', text: 'text-emerald-900', icon: ArrowUp };
    if (growth > 0) return { bg: 'bg-emerald-400', text: 'text-emerald-800', icon: ArrowUp };
    if (growth > -10) return { bg: 'bg-amber-400', text: 'text-amber-800', icon: ArrowDown };
    return { bg: 'bg-red-500', text: 'text-red-900', icon: ArrowDown };
  };

  const getBarColor = (d, idx) => {
    const growth = d.growth;
    const targetAchievement = ((d.orders / d.target) * 100);
    if (targetAchievement >= 110) return 'bg-emerald-600';
    if (targetAchievement >= 95) return 'bg-emerald-500';
    if (targetAchievement >= 80) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-6 lg:p-8 overflow-hidden relative group">
      
      {/* 🔧 CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-slate-100">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <TrendingUp className="w-9 h-9 text-indigo-600 drop-shadow-lg" />
            Procurement Trends
          </h3>
          <div className="flex items-center gap-2 p-2 bg-indigo-50 rounded-xl text-indigo-700 text-sm font-bold">
            <BarChart2 size={16} />
            {viewMode.toUpperCase()} View
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* View Mode */}
          <div className="flex bg-slate-100 rounded-xl p-1">
            {['day', 'week', 'month'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  viewMode === mode 
                    ? 'bg-white shadow-md text-indigo-700' 
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Filters */}
          <select
            value={filters.region}
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
          >
            <option>All Regions</option>
            <option>North</option>
            <option>South</option>
          </select>

          {/* Export */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            <Download size={16} />
            {isExporting ? 'Exporting...' : 'Export PNG'}
          </button>
        </div>
      </div>

      {/* 📊 METRICS SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 text-center">
          <div className="text-3xl font-black text-emerald-700 mb-1">{totalOrders}</div>
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Total Orders</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200 text-center">
          <div className="text-3xl font-black text-indigo-700 mb-1">{avgOrders}</div>
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wide">Avg Monthly</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200 text-center">
          <div className={`text-3xl font-black mb-1 ${overallGrowth >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
            {overallGrowth}%
          </div>
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">Overall Growth</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200 text-center">
          <div className="text-3xl font-black text-slate-800 mb-1">{data.length}</div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">Months</div>
        </div>
      </div>

      {/* 📈 ENHANCED BAR CHART */}
      <div className="relative">
        {/* Target Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-slate-400/50 via-slate-300/70 to-slate-400/50 z-10"
          style={{ top: `${100 - (20 / maxOrders * 100)}%` }}
        />
        
        {/* Chart Container */}
        <div 
          className="flex items-end justify-between h-64 lg:h-72 gap-3 pb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
          role="img"
          aria-label="Order volume trend chart"
        >
          {data.map((d, idx) => {
            const heightPercent = Math.max(15, (d.orders / maxOrders) * 100);
            const isPeak = d.orders === maxOrders;
            const isLow = d.orders === minOrders;
            const growth = d.growth;
            const growthConfig = getGrowthColor(growth);
            const Icon = growthConfig.icon;
            const targetPercent = (d.target / maxOrders) * 100;
            
            return (
              <div 
                key={d.month} 
                className="flex flex-col items-center justify-end flex-shrink-0 w-16 group cursor-pointer"
                tabIndex={0}
                onMouseEnter={() => setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
                onFocus={() => setHoveredMonth(idx)}
                aria-label={`${d.orders} orders in ${d.month}`}
              >
                {/* ENHANCED TOOLTIP */}
                <div className={`absolute -top-16 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap text-xs font-bold rounded-xl shadow-2xl border px-3 py-2 ${
                  hoveredMonth === idx 
                    ? 'bg-slate-900 text-white scale-105 shadow-slate-900/25 border-slate-700' 
                    : 'bg-white text-slate-900 shadow-lg border-slate-200'
                }`}>
                  <div className="font-black">{d.orders} Orders</div>
                  <div>₹{d.revenue.toLocaleString()} Revenue</div>
                  <div className={`text-xs ${growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {growth >= 0 ? '+' : ''}{growth}% vs last
                  </div>
                  <div className="text-xs opacity-75">{targetPercent.toFixed(0)}% of target</div>
                </div>

                {/* GROWTH INDICATOR */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 shadow-lg border-2 transition-all group-hover:scale-110 ${
                  growthConfig.bg.replace('bg', 'border') + ' ' + growthConfig.text
                }`}>
                  <Icon size={12} />
                </div>

                {/* BAR WITH TARGET MARKER */}
                <div 
                  className={`w-10 rounded-xl transition-all duration-700 relative group-hover:shadow-2xl hover:scale-x-110 origin-center overflow-hidden cursor-pointer ${
                    isPeak ? 'ring-2 ring-indigo-400/50' : 
                    isLow ? 'ring-2 ring-red-400/50' : ''
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Main Bar */}
                  <div 
                    className={`absolute inset-0 transition-all duration-500 ${getBarColor(d, idx)}`}
                  />
                  
                  {/* Target Marker */}
                  <div 
                    className="absolute right-0 top-[calc(100%-4px)] w-1 h-1 bg-slate-400 rounded-full shadow-sm z-10"
                    style={{ bottom: `${100 - targetPercent}%` }}
                  />
                  
                  {/* Peak/Low Badge */}
                  {(isPeak || isLow) && (
                    <div className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-1 rounded-full shadow-lg whitespace-nowrap ${
                      isPeak ? 'bg-indigo-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {isPeak ? 'PEAK' : 'LOW'}
                    </div>
                  )}
                </div>

                {/* MONTH LABEL */}
                <span className={`text-xs font-bold mt-4 text-center px-1 ${
                  isPeak ? 'text-indigo-700 font-black drop-shadow-sm' : 
                  hoveredMonth === idx ? 'text-indigo-600 font-semibold' : 'text-slate-500'
                }`}>
                  {d.month}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">{d.orders}</span>
              </div>
            );
          })}
        </div>

        {/* X-AXIS */}
        <div className="flex justify-between -mt-4">
          {data.map(d => (
            <span key={d.month} className="text-[11px] text-slate-400 font-mono w-16 text-center">
              {d.month}
            </span>
          ))}
        </div>
      </div>

      {/* 📋 LEGENDS & CONTEXT */}
      <div className="mt-8 pt-6 border-t-2 border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded" />
          <span className="font-bold text-emerald-700">Above Target</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded" />
          <span className="font-bold text-amber-700">Near Target</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="font-bold text-red-700">Below Target</span>
        </div>
        <div className="flex items-center gap-2 md:justify-end">
          <Calendar size={12} className="text-slate-400" />
          <span className="text-slate-500">Target: 25 avg</span>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes growUp {
          from { height: 15%; opacity: 0; transform: translateY(10px); }
          to { height: var(--bar-height); opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default OrderTrends;
