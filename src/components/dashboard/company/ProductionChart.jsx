import React, { useState, useEffect } from 'react';
import { 
  BarChart2, 
  Calendar, 
  ChevronDown, 
  Download, 
  MoreHorizontal,
  Target,
  Zap,
  TrendingUp,
  AlertOctagon
} from 'lucide-react';

const ProductionChart = () => {
  const [activeBar, setActiveBar] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState('monthly'); // 'monthly' or 'quarterly'

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Enterprise Data Model
  const monthlyData = [
    { label: 'Jan', value: 65, target: 70, efficiency: 92, defectRate: 1.2 },
    { label: 'Feb', value: 45, target: 70, efficiency: 64, defectRate: 2.5 }, // Underperforming
    { label: 'Mar', value: 75, target: 70, efficiency: 107, defectRate: 0.8 },
    { label: 'Apr', value: 55, target: 75, efficiency: 73, defectRate: 1.5 },
    { label: 'May', value: 85, target: 75, efficiency: 113, defectRate: 0.5 },
    { label: 'Jun', value: 95, target: 75, efficiency: 126, defectRate: 0.2 },
    { label: 'Jul', value: 70, target: 80, efficiency: 87, defectRate: 1.0 },
    { label: 'Aug', value: 60, target: 80, efficiency: 75, defectRate: 1.8 },
    { label: 'Sep', value: 50, target: 80, efficiency: 62, defectRate: 3.0 }, // Critical
    { label: 'Oct', value: 65, target: 85, efficiency: 76, defectRate: 1.2 },
    { label: 'Nov', value: 80, target: 85, efficiency: 94, defectRate: 0.9 },
    { label: 'Dec', value: 75, target: 85, efficiency: 88, defectRate: 1.1 },
  ];

  const quarterlyData = [
     { label: 'Q1', value: 62, target: 70, efficiency: 88, defectRate: 1.5 },
     { label: 'Q2', value: 78, target: 75, efficiency: 104, defectRate: 0.8 },
     { label: 'Q3', value: 60, target: 80, efficiency: 75, defectRate: 1.9 },
     { label: 'Q4', value: 73, target: 85, efficiency: 86, defectRate: 1.0 },
  ];

  const data = viewMode === 'monthly' ? monthlyData : quarterlyData;

  // Helper: Bar Color based on Efficiency
  const getBarColor = (efficiency, isActive) => {
     if (isActive) return 'bg-indigo-600 shadow-lg shadow-indigo-200';
     if (efficiency < 70) return 'bg-rose-500'; // Critical underperformance
     if (efficiency < 90) return 'bg-amber-400'; // Warning
     return 'bg-slate-800'; // Good
  };

  return (
    <div className="lg:col-span-2 w-full h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* 1. Header & KPI Summary */}
      <div className="p-6 border-b border-slate-100 flex flex-col gap-6">
         
         <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
               <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-200">
                  <BarChart2 size={24} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-slate-800">Production Output</h3>
                  <p className="text-xs text-slate-500 font-medium">Actual vs Target Performance</p>
               </div>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
               <button 
                 onClick={() => setViewMode('monthly')}
                 className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${viewMode === 'monthly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Monthly
               </button>
               <button 
                 onClick={() => setViewMode('quarterly')}
                 className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${viewMode === 'quarterly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Quarterly
               </button>
            </div>
         </div>

         {/* KPIs */}
         <div className="flex gap-6 sm:gap-12 pb-2">
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                 <Zap size={10} className="text-amber-500"/> Avg Efficiency
               </p>
               <p className="text-2xl font-bold text-slate-800 mt-1">87.5%</p>
               <span className="text-[10px] font-bold text-rose-500 flex items-center gap-0.5">
                  <TrendingUp size={10} className="rotate-180"/> -2.4%
               </span>
            </div>
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                 <Target size={10} className="text-indigo-500"/> Total Units
               </p>
               <p className="text-2xl font-bold text-slate-800 mt-1">84.2k</p>
               <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                  <TrendingUp size={10}/> +12.5%
               </span>
            </div>
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                 <AlertOctagon size={10} className="text-rose-500"/> Defect Rate
               </p>
               <p className="text-2xl font-bold text-slate-800 mt-1">1.4%</p>
               <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                  <TrendingUp size={10} className="rotate-180"/> -0.2%
               </span>
            </div>
         </div>
      </div>

      {/* 2. Chart Canvas */}
      <div className="p-6 relative flex-1 min-h-[300px]">
         
         {/* Y-Axis Grid */}
         <div className="absolute inset-x-6 top-6 bottom-16 flex flex-col justify-between pointer-events-none">
            {[100, 75, 50, 25, 0].map((line) => (
              <div key={line} className="w-full border-b border-dashed border-slate-100 flex items-center relative">
                 <span className="absolute -left-6 -top-2 text-[9px] font-bold text-slate-300 w-4 text-right">
                    {line}%
                 </span>
              </div>
            ))}
         </div>

         {/* Bars */}
         <div className="h-full flex items-end justify-between gap-2 sm:gap-4 relative z-10 pl-4 pb-6">
            {data.map((item, i) => (
               <div 
                 key={i} 
                 className="group relative flex-1 h-full flex items-end justify-center"
                 onMouseEnter={() => setActiveBar(i)}
                 onMouseLeave={() => setActiveBar(null)}
               >
                  {/* Goal Marker (Target Line) */}
                  <div 
                    className="absolute w-full h-0.5 bg-indigo-300 z-20 border-t border-dashed border-slate-50 opacity-50 group-hover:opacity-100 group-hover:bg-indigo-500 transition-all"
                    style={{ bottom: `${item.target}%` }}
                  ></div>

                  {/* The Bar */}
                  <div 
                    className={`
                      w-full max-w-[40px] rounded-t-lg relative transition-all duration-500 ease-out
                      ${getBarColor(item.efficiency, activeBar === i)}
                      ${activeBar !== null && activeBar !== i ? 'opacity-40' : ''}
                    `}
                    style={{ 
                      height: isVisible ? `${item.value}%` : '0%',
                      transitionDelay: `${i * 30}ms`
                    }}
                  >
                     {/* Glossy Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/5 rounded-t-lg"></div>
                  </div>

                  {/* Detailed Tooltip */}
                  <div className={`
                    absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50
                    flex flex-col gap-1 bg-slate-800 text-white text-xs p-3 rounded-xl shadow-xl shadow-slate-400/20 whitespace-nowrap
                    transition-all duration-200 pointer-events-none
                    ${activeBar === i ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}
                  `}>
                     <div className="font-bold border-b border-slate-600 pb-1 mb-1">{item.label} Performance</div>
                     <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Actual:</span>
                        <span className="font-mono font-bold">{item.value}k</span>
                     </div>
                     <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Target:</span>
                        <span className="font-mono font-bold text-indigo-400">{item.target}k</span>
                     </div>
                     <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Efficiency:</span>
                        <span className={`font-mono font-bold ${item.efficiency >= 100 ? 'text-emerald-400' : 'text-rose-400'}`}>
                           {item.efficiency}%
                        </span>
                     </div>
                     {/* Arrow */}
                     <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                  </div>
               
               </div>
            ))}
         </div>

         {/* X-Axis Labels */}
         <div className="absolute bottom-4 left-6 right-6 flex justify-between pl-4">
            {data.map((item, i) => (
              <span 
                key={i} 
                className={`
                  flex-1 text-center text-[10px] font-bold uppercase tracking-wider
                  transition-colors duration-200
                  ${activeBar === i ? 'text-indigo-600' : 'text-slate-400'}
                `}
              >
                {item.label}
              </span>
            ))}
         </div>
      </div>

    </div>
  );
};

export default ProductionChart;
