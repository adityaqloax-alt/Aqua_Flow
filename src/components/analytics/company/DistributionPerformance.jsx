import React, { useState } from "react";
import { 
  Truck, Clock, AlertTriangle, CheckCircle2, 
  MapPin, User, ChevronDown, Filter 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from "recharts";

// --- MOCK DATA ---
const overallStats = [
  { label: "Total Deliveries", value: "300", icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Avg On-Time %", value: "90%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Avg Delivery Time", value: "42m", icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Routes at Risk", value: "2", icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
];

const routeData = [
  { id: 1, route: "North Zone A", deliveries: 120, onTime: 95, delayed: 6, avgTime: "35m", driver: "Ramesh K.", status: "Good" },
  { id: 2, route: "City Center", deliveries: 80, onTime: 90, delayed: 8, avgTime: "45m", driver: "Suresh P.", status: "Warning" },
  { id: 3, route: "Industrial Hub", deliveries: 100, onTime: 85, delayed: 15, avgTime: "55m", driver: "Vikram S.", status: "Critical" },
  { id: 4, route: "East Sector", deliveries: 95, onTime: 98, delayed: 2, avgTime: "30m", driver: "Anil M.", status: "Good" },
  { id: 5, route: "Highway Route", deliveries: 110, onTime: 82, delayed: 20, avgTime: "1h 10m", driver: "Rajeev D.", status: "Critical" },
];

const DistributionPerformance = () => {
  const [filter, setFilter] = useState("All");

  // Helper to get status colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'Good': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Warning': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Critical': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. EXECUTIVE KPI SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. VISUALS: ON-TIME PERFORMANCE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">On-Time Performance by Route</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routeData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="route" type="category" axisLine={false} tickLine={false} width={100} tick={{fontSize: 12, fill: '#64748B'}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="onTime" name="On-Time %" radius={[0, 4, 4, 0]} barSize={20}>
                  {routeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.onTime >= 90 ? '#10B981' : entry.onTime >= 85 ? '#F59E0B' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ALERTS CARD */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-500" size={18} /> Routes at Risk
          </h3>
          <div className="space-y-3 flex-1 overflow-y-auto pr-2">
            {routeData.filter(r => r.status === 'Critical').map(route => (
              <div key={route.id} className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-rose-800 text-sm">{route.route}</span>
                  <span className="text-xs font-bold text-rose-600">{route.onTime}% On-Time</span>
                </div>
                <p className="text-xs text-rose-700">
                  {route.delayed} deliveries delayed. Driver: {route.driver}
                </p>
              </div>
            ))}
            {routeData.filter(r => r.status === 'Warning').map(route => (
              <div key={route.id} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                 <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-amber-800 text-sm">{route.route}</span>
                  <span className="text-xs font-bold text-amber-600">{route.onTime}% On-Time</span>
                </div>
                 <p className="text-xs text-amber-700">
                   Requires monitoring. {route.delayed} delays reported.
                </p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
            Contact Drivers
          </button>
        </div>
      </div>

      {/* 3. DETAILED DATA TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Header & Filter */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 text-lg">Route Performance Details</h3>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
               <Filter size={14} /> Filter Status
             </button>
             <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-100">
               Download Report
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Route Name</th>
                <th className="px-6 py-4">Assigned Driver</th>
                <th className="px-6 py-4">Deliveries</th>
                <th className="px-6 py-4">On-Time %</th>
                <th className="px-6 py-4">Delayed</th>
                <th className="px-6 py-4">Avg Time</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {routeData.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-700 flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors"/>
                    {r.route}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                        {r.driver.charAt(0)}
                      </div>
                      {r.driver}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-600">{r.deliveries}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${r.onTime >= 90 ? 'bg-emerald-500' : r.onTime >= 85 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                          style={{width: `${r.onTime}%`}}
                        ></div>
                      </div>
                      {r.onTime}%
                    </div>
                  </td>
                  <td className={`px-6 py-4 font-bold ${r.delayed > 5 ? 'text-rose-600' : 'text-slate-400'}`}>
                    {r.delayed}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{r.avgTime}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistributionPerformance;
