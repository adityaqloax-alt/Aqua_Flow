import React, { useState } from 'react';
import { 
  Package, 
  Droplets, 
  Box, 
  Container, 
  TrendingUp, 
  ChevronRight, 
  BarChart3,
  AlertTriangle,
  DollarSign,
  Layers,
  PieChart
} from 'lucide-react';

const TopProducts = () => {
  const [activeMetric, setActiveMetric] = useState('Revenue'); // Revenue, Units, Profit

  // Enterprise Data Model
  const products = [
    { 
      id: 1,
      name: '20L Polycarbonate Jar', 
      category: 'Bulk Storage',
      revenue: 12400, 
      units: 1240,
      profit: 4500,
      stock: 'Low', // Inventory Warning
      trendData: [10, 15, 20, 25, 30, 45],
      icon: Container,
      color: 'blue'
    },
    { 
      id: 2,
      name: '1L PET Bottle (Case)', 
      category: 'Retail Packs',
      revenue: 4250, 
      units: 850,
      profit: 1200,
      stock: 'Good',
      trendData: [20, 18, 22, 25, 24, 28],
      icon: Box,
      color: 'emerald'
    },
    { 
      id: 3,
      name: 'Water Dispenser Unit', 
      category: 'Equipment',
      revenue: 14400, 
      units: 120,
      profit: 5200, // High Profit
      stock: 'Critical',
      trendData: [5, 8, 12, 15, 10, 20],
      icon: Package,
      color: 'violet'
    },
    { 
      id: 4,
      name: '500ml Mini Bottle', 
      category: 'Retail Packs',
      revenue: 1860, 
      units: 620,
      profit: 450,
      stock: 'Good',
      trendData: [30, 25, 20, 15, 10, 5], // Down trend
      icon: Droplets,
      color: 'cyan'
    },
  ];

  // Sorting Logic
  const sortedProducts = [...products].sort((a, b) => {
    if (activeMetric === 'Revenue') return b.revenue - a.revenue;
    if (activeMetric === 'Units') return b.units - a.units;
    if (activeMetric === 'Profit') return b.profit - a.profit;
    return 0;
  });

  const getTheme = (color) => {
    const themes = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'bg-emerald-500' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', bar: 'bg-cyan-500' },
      violet: { bg: 'bg-violet-50', text: 'text-violet-600', bar: 'bg-violet-500' },
    };
    return themes[color];
  };

  const getMetricValue = (product) => {
     if(activeMetric === 'Revenue') return `$${product.revenue.toLocaleString()}`;
     if(activeMetric === 'Units') return `${product.units.toLocaleString()} units`;
     return `$${product.profit.toLocaleString()}`;
  };

  const getMaxMetricValue = () => {
    return Math.max(...products.map(p => {
        if(activeMetric === 'Revenue') return p.revenue;
        if(activeMetric === 'Units') return p.units;
        return p.profit;
    }));
  };

  // Mini Sparkline Component
  const Sparkline = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * 40;
      const y = 20 - ((val - min) / (max - min)) * 20;
      return `${x},${y}`;
    }).join(' ');
    
    // Determine color based on trend direction
    const isUp = data[data.length-1] >= data[0];
    const strokeColor = isUp ? '#10b981' : '#f43f5e'; // Emerald or Rose

    return (
      <svg width="40" height="20" className="overflow-visible">
         <polyline points={points} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
         <circle cx="40" cy={20 - ((data[data.length-1] - min) / (max - min)) * 20} r="2" fill={strokeColor} />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      
      {/* 1. Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg shadow-sm">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Top Products</h3>
              <p className="text-xs text-slate-500 font-medium">Performance Leaders</p>
            </div>
          </div>
        </div>
        
        {/* Metric Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
           {[
             { id: 'Revenue', icon: DollarSign }, 
             { id: 'Units', icon: Layers }, 
             { id: 'Profit', icon: PieChart }
           ].map((m) => (
             <button
               key={m.id}
               onClick={() => setActiveMetric(m.id)}
               className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold rounded transition-all ${activeMetric === m.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               <m.icon size={12}/> {m.id}
             </button>
           ))}
        </div>
      </div>

      {/* 2. Product List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {sortedProducts.map((product) => {
          const theme = getTheme(product.color);
          const Icon = product.icon;
          const percentage = ( (activeMetric === 'Revenue' ? product.revenue : activeMetric === 'Units' ? product.units : product.profit) / getMaxMetricValue() ) * 100;

          return (
            <div 
              key={product.id} 
              className="group relative p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3 mb-2">
                {/* Icon Box */}
                <div className={`
                  w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center 
                  ${theme.bg} ${theme.text}
                `}>
                  <Icon size={18} />
                </div>
                
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                     <h4 className="text-sm font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                       {product.name}
                     </h4>
                     {/* Stock Alert Badge */}
                     {(product.stock === 'Low' || product.stock === 'Critical') && (
                        <span className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${product.stock === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                           <AlertTriangle size={8}/> {product.stock === 'Critical' ? 'Crit' : 'Low'}
                        </span>
                     )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">{product.category}</p>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="flex items-end justify-between">
                 <div className="flex flex-col gap-1 w-full mr-4">
                    <div className="flex justify-between items-end">
                       <span className="text-xs font-bold text-slate-800">{getMetricValue(product)}</span>
                       <span className="text-[10px] text-slate-400">
                          {activeMetric === 'Revenue' ? `${product.units} units` : `$${product.revenue}`}
                       </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full transition-all duration-500 ease-out ${theme.bar}`}
                         style={{ width: `${percentage}%` }}
                       ></div>
                    </div>
                 </div>

                 {/* Sparkline */}
                 <div className="flex-shrink-0 pb-1">
                    <Sparkline data={product.trendData} />
                 </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-2">
        <button className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all uppercase tracking-wider flex items-center justify-center gap-2">
          <Package size={14} /> View Inventory
        </button>
      </div>
    </div>
  );
};

export default TopProducts;
