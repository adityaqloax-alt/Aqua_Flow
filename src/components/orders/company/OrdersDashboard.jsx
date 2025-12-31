import React, { useState } from 'react';
import { 
  TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign, Activity, 
  Calendar, MapPin, ChevronDown, Download, Truck, BarChart3, 
  Users, ArrowUpRight, ArrowDownRight, Zap
} from 'lucide-react';

const OrdersDashboard = () => {
  const [timeRange, setTimeRange] = useState('This Week');
  const [zone, setZone] = useState('All Zones');
  const [chartMetric, setChartMetric] = useState('revenue'); // 'revenue' or 'volume'
  const [isZoneOpen, setIsZoneOpen] = useState(false);

  // Enterprise Data Configuration
  const kpiData = [
    { 
      label: "Total Revenue", 
      value: "₹ 4,50,000", 
      icon: DollarSign, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50", 
      trend: "+12.5%", 
      trendUp: true 
    },
    { 
      label: "Order Volume", 
      value: "1,240", 
      icon: Activity, 
      color: "text-blue-600", 
      bg: "bg-blue-50", 
      trend: "+5.2%", 
      trendUp: true 
    },
    { 
      label: "On-Time Delivery", 
      value: "94.2%", 
      icon: Truck, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50", 
      trend: "-1.1%", 
      trendUp: false 
    },
    { 
      label: "Pending Approvals", 
      value: "18", 
      icon: Clock, 
      color: "text-amber-600", 
      bg: "bg-amber-50", 
      trend: "High", 
      trendUp: false 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* 1. Executive Controls Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm sticky top-0 z-20 backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shadow-sm">
            <BarChart3 size={22} />
          </div>
          <div>
            <h2 className="font-black text-slate-800 text-lg tracking-tight">Performance Overview</h2>
            <p className="text-xs text-slate-500 font-medium">Real-time metrics for {zone}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Zone Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsZoneOpen(!isZoneOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <MapPin size={14} className="text-indigo-500" /> {zone} <ChevronDown size={14} className={`transition-transform ${isZoneOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isZoneOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsZoneOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {['All Zones', 'North Zone', 'South Zone', 'East Zone'].map(z => (
                    <button 
                      key={z} 
                      onClick={() => { setZone(z); setIsZoneOpen(false); }} 
                      className="w-full text-left px-4 py-3 text-xs hover:bg-slate-50 text-slate-600 font-bold border-b border-slate-50 last:border-0 transition-colors flex justify-between items-center"
                    >
                      {z}
                      {zone === z && <CheckCircle size={12} className="text-emerald-500" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Time Range */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['Today', 'This Week', 'This Month'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  timeRange === range 
                    ? 'bg-white text-slate-900 shadow-sm scale-105' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 hover:-translate-y-0.5 transition-all">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* 2. Operational KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiData.map((kpi, index) => (
          <div key={index} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
            {/* Background Pattern */}
            <div className={`absolute top-0 right-0 p-16 opacity-5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110 ${kpi.color.replace('text', 'bg')}`} />
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{kpi.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
              </div>
              <div className={`p-3.5 rounded-2xl ${kpi.bg} ${kpi.color} shadow-sm group-hover:scale-110 transition-transform`}>
                <kpi.icon size={22} />
              </div>
            </div>
            
            <div className="mt-5 flex items-center gap-2 relative z-10">
              <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                kpi.trendUp 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                  : 'bg-rose-50 text-rose-700 border-rose-100'
              }`}>
                {kpi.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.trend}
              </span>
              <span className="text-[11px] font-medium text-slate-400">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. Analytics Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <TrendingUp className="text-indigo-500" size={20} /> Business Trends
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Comparative analysis for {zone}</p>
            </div>
            <div className="flex gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <button 
                onClick={() => setChartMetric('revenue')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  chartMetric === 'revenue' 
                    ? 'bg-white shadow text-indigo-600 scale-105' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Revenue
              </button>
              <button 
                onClick={() => setChartMetric('volume')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  chartMetric === 'volume' 
                    ? 'bg-white shadow text-indigo-600 scale-105' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Volume
              </button>
            </div>
          </div>

          {/* Simulated Chart */}
          <div className="flex-1 flex items-end gap-3 sm:gap-6 min-h-[280px] w-full pb-2 border-b border-slate-100 px-2">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer h-full">
                <div className="relative w-full h-full flex items-end">
                   <div 
                      className={`w-full rounded-t-xl transition-all duration-700 ease-out relative hover:opacity-90 ${
                        chartMetric === 'revenue' 
                          ? 'bg-gradient-to-t from-emerald-400 to-emerald-300 shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)]' 
                          : 'bg-gradient-to-t from-indigo-400 to-indigo-300 shadow-[0_4px_20px_-5px_rgba(99,102,241,0.4)]'
                      }`} 
                      style={{ height: `${h}%` }}
                    >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-10 pointer-events-none">
                        {chartMetric === 'revenue' ? `₹ ${(h * 1200).toLocaleString()}` : `${h * 15} Orders`}
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* 4. Urgent Alerts & Feed */}
        <div className="space-y-6">
          
          {/* Critical Alerts Card */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <h4 className="text-rose-900 font-black text-sm flex items-center gap-2 mb-4 uppercase tracking-wide">
              <AlertCircle size={18} className="animate-pulse" /> Attention Required
            </h4>
            <div className="space-y-3">
               <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm hover:border-rose-200 transition-all group">
                 <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-slate-800">Route RT-N04 Delayed</p>
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1"></span>
                 </div>
                 <p className="text-[10px] text-slate-500 leading-relaxed">Truck breakdown reported at Sector 4. 12 orders affected.</p>
                 <button className="mt-3 text-[10px] font-bold text-white bg-rose-500 px-3 py-1.5 rounded-lg hover:bg-rose-600 transition-colors w-full shadow-sm shadow-rose-200">
                    Reassign Driver
                 </button>
               </div>
               
               <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm hover:border-rose-200 transition-all">
                 <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-slate-800">Stockout Risk: 1L Bottles</p>
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1"></span>
                 </div>
                 <p className="text-[10px] text-slate-500 leading-relaxed">Inventory below safety threshold for tomorrow's dispatch.</p>
               </div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <h3 className="font-bold text-sm text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
              <Zap size={16} className="text-amber-500 fill-amber-500" /> Live Operations
            </h3>
            <div className="space-y-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-100 -z-10" />
              
              {[
                { text: "Order #ORD-1024 Approved", time: "2m ago", type: "success" },
                { text: "Payment received from ABC Corp", time: "12m ago", type: "success" },
                { text: "New Order: Tech Park", time: "1h ago", type: "info" },
                { text: "Driver Rajesh reached destination", time: "1h 15m ago", type: "info" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className={`w-3 h-3 mt-1 rounded-full border-2 border-white ring-1 ring-slate-100 flex-shrink-0 z-10 ${
                    item.type === 'success' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]'
                  }`} />
                  <div>
                    <p className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{item.text}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 rounded-xl transition-all border border-slate-100">
               View Full Activity Log
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;
