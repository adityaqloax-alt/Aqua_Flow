import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign, 
  Calendar,
  Eye,
  EyeOff,
  Target
} from 'lucide-react';

const RevenueChart = () => {
  const [activeRange, setActiveRange] = useState('Monthly');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showProfit, setShowProfit] = useState(true);
  const [showForecast, setShowForecast] = useState(true);

  // Enterprise Data Model (Revenue + Margin + Projection Status)
  const data = [
    { label: 'Jan', revenue: 65, margin: 22, isProjected: false },
    { label: 'Feb', revenue: 45, margin: 18, isProjected: false },
    { label: 'Mar', revenue: 75, margin: 25, isProjected: false },
    { label: 'Apr', revenue: 55, margin: 20, isProjected: false },
    { label: 'May', revenue: 85, margin: 28, isProjected: false },
    { label: 'Jun', revenue: 95, margin: 30, isProjected: false },
    { label: 'Jul', revenue: 70, margin: 24, isProjected: false },
    { label: 'Aug', revenue: 60, margin: 21, isProjected: false },
    { label: 'Sep', revenue: 50, margin: 15, isProjected: false },
    { label: 'Oct', revenue: 65, margin: 22, isProjected: false },
    { label: 'Nov', revenue: 80, margin: 26, isProjected: true }, // Forecast
    { label: 'Dec', revenue: 90, margin: 29, isProjected: true }, // Forecast
  ];

  const monthlyTarget = 70; // 70k Target Line

  // Helper to generate SVG Path for Profit Line
  const getLinePath = () => {
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100; // X %
      const y = 100 - ((d.margin / 40) * 100); // Y % (Scale margin 0-40%)
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm col-span-1 lg:col-span-2 overflow-hidden relative flex flex-col h-full">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
            Revenue & Margin
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wide border border-emerald-100 flex items-center gap-1">
              <TrendingUp size={10} /> +14.2% YoY
            </span>
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-bold text-slate-800">$1.24M</h2>
            <span className="text-xs text-slate-500 font-medium">YTD Total</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['1M', '6M', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeRange === range ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {range}
              </button>
            ))}
          </div>
          
          {/* Legend / Toggles */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
             <button 
               onClick={() => setShowProfit(!showProfit)}
               className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-opacity ${showProfit ? 'opacity-100' : 'opacity-40'}`}
             >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Margin
             </button>
             <button 
               onClick={() => setShowForecast(!showForecast)}
               className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-opacity ${showForecast ? 'opacity-100' : 'opacity-40'}`}
             >
                <span className="w-2 h-2 rounded-full bg-slate-300 pattern-diagonal-lines"></span> Forecast
             </button>
          </div>
        </div>
      </div>

      {/* 2. Chart Area */}
      <div className="relative flex-1 min-h-[250px] w-full mt-2">
        
        {/* Background Grid & Target Line */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[100, 75, 50, 25, 0].map((val, i) => (
            <div key={i} className="w-full border-b border-dashed border-slate-100 h-full relative">
               <span className="absolute -left-8 -top-2 text-[9px] text-slate-300 w-6 text-right">${val}k</span>
            </div>
          ))}
          {/* Target Line */}
          <div 
            className="absolute left-0 right-0 border-t-2 border-dashed border-emerald-300 z-10 flex items-center justify-end"
            style={{ top: `${100 - monthlyTarget}%` }}
          >
             <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1 rounded -mt-5">Goal</span>
          </div>
        </div>

        {/* Canvas */}
        <div className="absolute inset-0 flex items-end justify-between gap-2 sm:gap-3 z-20 pl-4 pr-2">
          
          {/* SVG Layer for Profit Line */}
          {showProfit && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible" preserveAspectRatio="none">
              <path 
                d={getLinePath()} 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="drop-shadow-md"
              />
              {/* Dots */}
              {data.map((d, i) => (
                 <circle 
                   key={i}
                   cx={`${(i / (data.length - 1)) * 100}%`}
                   cy={`${100 - ((d.margin / 40) * 100)}%`}
                   r={hoveredIndex === i ? 6 : 4}
                   fill="#fff"
                   stroke="#f59e0b"
                   strokeWidth="2"
                   className="transition-all duration-200"
                 />
              ))}
            </svg>
          )}

          {/* Bars Loop */}
          {data.map((item, i) => {
            // Hide forecast bars if toggle is off
            if (item.isProjected && !showForecast) return <div key={i} className="flex-1"></div>;

            return (
              <div 
                key={i} 
                className="group relative flex-1 h-full flex items-end"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                
                {/* The Bar */}
                <div 
                  style={{ height: `${item.revenue}%` }} 
                  className={`
                    w-full rounded-t-lg transition-all duration-300 relative overflow-hidden
                    ${item.isProjected 
                      ? 'bg-slate-100 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_100%)] bg-[length:10px_10px] border-t border-slate-300' 
                      : hoveredIndex === i ? 'bg-indigo-600 shadow-lg shadow-indigo-200' : 'bg-indigo-500'}
                  `}
                >
                </div>

                {/* Advanced Tooltip */}
                <div className={`
                  absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-40
                  transition-all duration-200 pointer-events-none
                  ${hoveredIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}>
                  <div className="bg-slate-800 text-white p-3 rounded-xl shadow-xl shadow-slate-500/30 min-w-[140px]">
                    <div className="flex justify-between items-center mb-2 border-b border-slate-600 pb-2">
                       <span className="font-bold text-sm">{item.label} {item.isProjected && '(Est.)'}</span>
                       {item.revenue > monthlyTarget ? (
                         <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5"><Target size={10}/> Hit</span>
                       ) : (
                         <span className="text-[10px] font-bold text-rose-400 flex items-center gap-0.5"><Target size={10}/> Miss</span>
                       )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                       <span className="text-slate-400">Revenue</span>
                       <span className="text-right font-mono font-bold">${item.revenue}k</span>
                       
                       <span className="text-slate-400">Margin</span>
                       <span className="text-right font-mono font-bold text-amber-400">{item.margin}%</span>
                       
                       <span className="text-slate-400">Profit</span>
                       <span className="text-right font-mono font-bold text-emerald-400">
                          ${((item.revenue * item.margin) / 100).toFixed(1)}k
                       </span>
                    </div>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="w-3 h-3 bg-slate-800 rotate-45 mx-auto -mt-1.5"></div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between mt-2 pl-4 pr-2 pt-2 border-t border-slate-100">
        {data.map((item, i) => (
          <span 
            key={i} 
            className={`
              text-[10px] font-bold uppercase tracking-wider flex-1 text-center transition-colors
              ${hoveredIndex === i ? 'text-indigo-600' : 'text-slate-400'}
              ${item.isProjected && !showForecast ? 'opacity-0' : 'opacity-100'}
            `}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
