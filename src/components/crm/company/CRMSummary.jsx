import React, { useState } from 'react';
import { 
  Users, Droplets, Wallet, AlertTriangle, 
  TrendingUp, TrendingDown, ChevronRight, 
  Calendar, Truck, ArrowRight 
} from 'lucide-react';

// --- MOCK DATA ENGINE (Simulates Backend Response) ---
const getDataByRange = (range) => {
  // In a real app, this would fetch from an API based on startDate/endDate
  switch (range) {
    case 'Today':
      return {
        customers: { value: "1,248", trend: 2, isUp: true, sub: "+4 new signups" },
        water: { value: "92,000 L", trend: 5, isUp: true, sub: "86% Truck Utilization" },
        revenue: { value: "₹45,200", trend: 12, isUp: true, sub: "Collected today" },
        pending: { value: "₹12,500", trend: 8, isUp: false, sub: "3 invoices overdue" } // Trend UP is bad for pending
      };
    case 'Week':
      return {
        customers: { value: "1,254", trend: 4, isUp: true, sub: "+18 vs last week" },
        water: { value: "6.4 Lakh L", trend: 2, isUp: false, sub: "Avg 91k L / day" },
        revenue: { value: "₹4.2 Lakh", trend: 8, isUp: true, sub: "92% Collection Rate" },
        pending: { value: "₹85,000", trend: 15, isUp: false, sub: "8 High-Risk accts" }
      };
    case 'Month':
    default:
      return {
        customers: { value: "1,248", trend: 1.2, isUp: true, sub: "98% Retention Rate" },
        water: { value: "28.5 Lakh L", trend: 12, isUp: true, sub: "4 Supply Shortfalls" },
        revenue: { value: "₹18.6 Lakh", trend: 4.5, isUp: true, sub: "vs ₹17.8L Target" },
        pending: { value: "₹2.1 Lakh", trend: 22, isUp: false, sub: "12 Customers > 45 days" }
      };
  }
};

// --- SUB-COMPONENT: Trend Badge ---
const TrendBadge = ({ percent, isUp, invertColor = false }) => {
  // Logic: Usually Green is Up. 
  // But for "Pending Payments", Up is BAD (Red).
  const isPositive = invertColor ? !isUp : isUp;
  
  const colorClass = isPositive 
    ? "text-emerald-600 bg-emerald-50 border-emerald-100" 
    : "text-rose-600 bg-rose-50 border-rose-100";

  const Icon = isUp ? TrendingUp : TrendingDown;

  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold ${colorClass}`}>
      <Icon size={10} />
      <span>{percent}%</span>
    </div>
  );
};

// --- SUB-COMPONENT: Stat Card ---
const StatCard = ({ title, value, subtext, icon: Icon, color, trend, isUp, invertTrend, onClick }) => {
  const colorStyles = {
    indigo: "bg-indigo-500 shadow-indigo-200",
    cyan: "bg-cyan-500 shadow-cyan-200",
    emerald: "bg-emerald-500 shadow-emerald-200",
    rose: "bg-rose-500 shadow-rose-200",
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl shadow-lg ${colorStyles[color]} text-white transform group-hover:scale-105 transition-transform`}>
          <Icon size={22} />
        </div>
        <TrendBadge percent={trend} isUp={isUp} invertColor={invertTrend} />
      </div>
      
      <div>
        <h4 className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">{title}</h4>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-slate-800 tracking-tight">{value}</span>
        </div>
        <p className="text-xs text-slate-400 mt-2 font-medium flex items-center gap-1">
          {subtext.includes('High-Risk') || subtext.includes('Shortfalls') ? (
            <AlertTriangle size={12} className="text-amber-500" />
          ) : null}
          {subtext}
        </p>
      </div>

      {/* Drill-down arrow indicator */}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
        <ArrowRight size={18} />
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const CRMSummary = () => {
  const [timeRange, setTimeRange] = useState('Month');
  const data = getDataByRange(timeRange);

  const handleDrillDown = (category) => {
    alert(`Drill-down: Showing detailed report for ${category} (${timeRange} view)`);
    // In real app: navigate(`/reports/${category}?range=${timeRange}`)
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6 rounded-xl">
      
      {/* 1. Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Executive Overview</h2>
          <p className="text-sm text-slate-500">Real-time operational & financial insights.</p>
        </div>
        
        {/* Time Filter Pills */}
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          {['Today', 'Week', 'Month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                timeRange === range 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {range}
            </button>
          ))}
          <button className="px-3 py-1.5 text-slate-400 hover:text-indigo-600 border-l border-slate-100 ml-1">
            <Calendar size={14} />
          </button>
        </div>
      </div>

      {/* 2. KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Card 1: Customer Growth */}
        <StatCard 
          title="Active Customers"
          value={data.customers.value}
          subtext={data.customers.sub}
          trend={data.customers.trend}
          isUp={data.customers.isUp}
          icon={Users}
          color="indigo"
          onClick={() => handleDrillDown('customers')}
        />

        {/* Card 2: Operations / Logistics */}
        <StatCard 
          title="Water Supplied"
          value={data.water.value}
          subtext={data.water.sub}
          trend={data.water.trend}
          isUp={data.water.isUp}
          icon={Truck} // Changed to Truck to signify Logistics
          color="cyan"
          onClick={() => handleDrillDown('operations')}
        />

        {/* Card 3: Revenue (Finance) */}
        <StatCard 
          title="Total Revenue"
          value={data.revenue.value}
          subtext={data.revenue.sub}
          trend={data.revenue.trend}
          isUp={data.revenue.isUp}
          icon={Wallet}
          color="emerald"
          onClick={() => handleDrillDown('revenue')}
        />

        {/* Card 4: Risk / Pending (The 'Watch' Card) */}
        <StatCard 
          title="Pending Payments"
          value={data.pending.value}
          subtext={data.pending.sub}
          trend={data.pending.trend}
          isUp={data.pending.isUp}
          icon={AlertTriangle}
          color="rose"
          invertTrend={true} // High trend here is BAD (Red)
          onClick={() => handleDrillDown('risk')}
        />

      </div>

      {/* 3. Smart Alert Overlay (Only shows if high risk) */}
      {timeRange === 'Month' && (
         <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
           <AlertTriangle className="shrink-0 mt-0.5" size={16} />
           <div>
             <span className="font-bold">Attention Needed:</span> Pending payments have increased by 22% this month. 
             There are <span className="underline cursor-pointer hover:text-amber-900">12 corporate accounts</span> overdue by more than 45 days.
           </div>
           <button className="ml-auto text-xs font-bold bg-white border border-amber-200 px-3 py-1 rounded hover:bg-amber-100">
             View List
           </button>
         </div>
      )}
    </div>
  );
};

export default CRMSummary;
