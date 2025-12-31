import React, { useState, useEffect, useRef } from "react";
import { 
  IndianRupee, TrendingUp, ArrowUp, ArrowDown, Calendar, Download, 
  Filter, Eye, ShieldCheck, Package, Target, BarChart3, LineChart, PieChart 
} from "lucide-react";

const MonthlyPurchases = () => {
  const canvasRef = useRef(null);
  
  const [purchases, setPurchases] = useState([
    { 
      month: "Aug 2024", amount: 180000, prevMonth: 160000, target: 200000, 
      growth: 12.5, cumulative: 180000, invoiceCount: 12
    },
    { 
      month: "Sep 2024", amount: 245000, prevMonth: 180000, target: 220000, 
      growth: 36.1, cumulative: 425000, invoiceCount: 18 
    },
    { 
      month: "Oct 2024", amount: 210000, prevMonth: 245000, target: 240000, 
      growth: -14.3, cumulative: 635000, invoiceCount: 15
    },
    { 
      month: "Nov 2024", amount: 265000, prevMonth: 210000, target: 250000, 
      growth: 26.2, cumulative: 900000, invoiceCount: 22
    }
  ]);

  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [range, setRange] = useState('3m');
  const [isExporting, setIsExporting] = useState(false);
  const quarterlyTarget = 900000;

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPurchases(prev => prev.map((p, idx) => ({
        ...p,
        amount: Math.max(150000, p.amount + (Math.random() - 0.5) * 15000),
        invoiceCount: Math.max(10, p.invoiceCount + Math.floor(Math.random() * 3) - 1)
      })));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Draw trend line chart
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const data = purchases.map(p => p.amount);
      const max = Math.max(...data);
      const min = Math.min(...data);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw trend line
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = '#10B98140';
      ctx.shadowBlur = 8;
      
      ctx.beginPath();
      data.forEach((value, i) => {
        const x = (i / (data.length - 1)) * canvas.width;
        const y = canvas.height - ((value - min) / (max - min)) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Fill area under line
      ctx.fillStyle = '#10B98120';
      ctx.fill();
    }
  }, [purchases]);

  // Calculations
  const maxAmount = Math.max(...purchases.map(p => p.amount));
  const totalSpent = purchases.reduce((sum, p) => sum + p.amount, 0);
  const avgMonthly = (totalSpent / purchases.length).toFixed(0);
  const targetAchievement = ((totalSpent / quarterlyTarget) * 100).toFixed(1);
  const peakMonth = purchases.reduce((max, p) => p.amount > max.amount ? p : max);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csv = purchases.map(p => 
        `${p.month},${p.amount},${p.growth}%,${p.target},${p.cumulative}`
      ).join('\n');
      const blob = new Blob([`Month,Amount,Growth,Target,Cumulative\n${csv}`], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `purchases-${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      setIsExporting(false);
    }, 800);
  };

  const getTrendConfig = (growth) => {
    if (growth > 20) return { color: 'text-emerald-600', icon: ArrowUp, label: 'STRONG ↑' };
    if (growth > 0) return { color: 'text-emerald-500', icon: ArrowUp, label: 'GROWTH ↑' };
    if (growth > -10) return { color: 'text-amber-600', icon: ArrowDown, label: 'STABLE ↔' };
    return { color: 'text-red-600', icon: ArrowDown, label: 'DECLINE ↓' };
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-6 lg:p-8">
      
      {/* 🛠️ CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <IndianRupee className="w-9 h-9 text-emerald-600" />
            Monthly Purchases
          </h3>
          <div className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full">
            ₹{totalSpent.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-xl p-1">
            {['3m', '6m', '12m'].map(period => (
              <button
                key={period}
                onClick={() => setRange(period)}
                className={`px-3 py-2 rounded-lg text-xs font-bold ${
                  range === period 
                    ? 'bg-white shadow-sm text-emerald-700' 
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg"
          >
            <Download size={14} />
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* 📊 MAIN BAR CHART */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <BarChart3 size={20} />
            Monthly Breakdown
          </h4>
          
          {purchases.map((p, idx) => {
            const widthPercent = Math.max(25, (p.amount / maxAmount) * 100);
            const trendConfig = getTrendConfig(p.growth);
            const Icon = trendConfig.icon;
            const achievement = (p.amount / p.target) * 100;
            const barColor = achievement >= 100 ? 'bg-emerald-500' : achievement >= 80 ? 'bg-amber-500' : 'bg-red-500';

            return (
              <div key={p.month} className="group flex items-center justify-between gap-4 p-4 bg-slate-50/50 rounded-xl hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg ${
                    idx === 0 ? 'bg-emerald-500 text-white' : 
                    idx === purchases.length - 1 ? 'bg-indigo-500 text-white' : 'bg-slate-200'
                  }`}>
                    {p.month.slice(0,3)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{p.month}</p>
                    <p className="text-xs text-slate-500">{p.invoiceCount} invoices</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 w-48">
                  {/* Amount Bar */}
                  <div className="w-full bg-slate-200 rounded-xl h-6 overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-lg shadow-lg transition-all duration-1000 ${barColor}`}
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span>₹{p.amount.toLocaleString()}</span>
                    <span className={`font-bold ${trendConfig.color}`}>
                      <Icon size={12} className="inline mr-1" />
                      {p.growth.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 📈 TREND LINE CHART */}
        <div>
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <LineChart size={20} />
            Purchase Trend
          </h4>
          
          <div className="relative p-6 bg-gradient-to-b from-emerald-50 to-white rounded-2xl border border-emerald-200 shadow-xl">
            {/* Live Canvas Chart */}
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="w-full h-48 rounded-xl shadow-2xl border block mx-auto"
            />
            
            {/* Target Line */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[60%] left-6 right-6 h-px bg-gradient-to-r from-emerald-400/60 to-emerald-400/30 border-dashed z-10" />
              <div className="absolute top-[60%] right-4 w-2 h-2 bg-emerald-400 rounded-full shadow-lg" />
            </div>
            
            <div className="text-center mt-4 pt-4 border-t border-emerald-200">
              <div className="text-2xl font-black text-emerald-700">₹{totalSpent.toLocaleString()}</div>
              <div className="text-sm text-emerald-600 font-bold">vs ₹{quarterlyTarget.toLocaleString()} target</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🥧 TARGET ACHIEVEMENT PIE */}
      <div className="p-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
        <h4 className="text-lg font-bold text-purple-800 mb-8 flex items-center gap-2">
          <PieChart size={20} />
          Quarterly Achievement
        </h4>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Pie Chart */}
          <svg viewBox="0 0 250 250" className="w-64 h-64 mx-auto lg:mx-0 shadow-2xl rounded-full">
            {/* Target Arc (Outer Ring) */}
            <circle cx="125" cy="125" r="110" fill="none" stroke="#F59E0B" strokeWidth="20" 
              strokeDasharray="692 692" strokeDashoffset={692 - (692 * (quarterlyTarget / (totalSpent + quarterlyTarget * 2)))} 
              strokeLinecap="round" className="transition-all duration-1000" />
            
            {/* Achievement Arc (Inner Ring) */}
            <circle cx="125" cy="125" r="90" fill="none" stroke="#10B981" strokeWidth="20" 
              strokeDasharray="565 565" strokeDashoffset={565 - (565 * (totalSpent / quarterlyTarget))} 
              strokeLinecap="round" className="transition-all duration-1000" />
            
            {/* Center */}
            <circle cx="125" cy="125" r="50" fill="white" stroke="#F1F5F9" strokeWidth="4" />
            <text x="125" y="122" textAnchor="middle" fill="#1E293B" fontSize="24" fontWeight="bold">
              {targetAchievement}%
            </text>
            <text x="125" y="145" textAnchor="middle" fill="#64748B" fontSize="14" className="font-mono">
              Quarterly
            </text>
          </svg>

          {/* Legend */}
          <div className="flex-1 grid grid-cols-2 gap-4 text-sm lg:text-base">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
              <div className="w-4 h-4 bg-emerald-500 rounded-full shadow" />
              <div>
                <div className="font-bold text-slate-900">Achieved</div>
                <div className="text-emerald-600 font-bold">₹{totalSpent.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
              <div className="w-4 h-4 bg-amber-500 rounded-full shadow" />
              <div>
                <div className="font-bold text-slate-900">Target</div>
                <div className="text-amber-600 font-bold">₹{quarterlyTarget.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 SUMMARY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t-2 border-slate-200 mt-8">
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 text-center group hover:shadow-xl transition-all">
          <div className="text-3xl font-black text-emerald-700 mb-2">{totalSpent.toLocaleString()}</div>
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Total Spent</div>
        </div>
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 text-center group hover:shadow-xl transition-all">
          <div className="text-3xl font-black text-indigo-700 mb-2">{avgMonthly}</div>
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wide">Avg Monthly</div>
        </div>
        <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 text-center group hover:shadow-xl transition-all">
          <div className="text-3xl font-black text-slate-900 mb-2">{peakMonth.amount.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">Peak Month</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 text-center group hover:shadow-xl transition-all">
          <div className={`text-3xl font-black mb-2 ${targetAchievement >= 100 ? 'text-emerald-700' : 'text-red-700'}`}>
            {targetAchievement}%
          </div>
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">Target Achievement</div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPurchases;
