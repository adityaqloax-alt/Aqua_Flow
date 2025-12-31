import React from "react";
import {
  Users, UserMinus, DollarSign, UserPlus, 
  AlertTriangle, TrendingUp, TrendingDown, 
  Search, Filter, ChevronRight
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid 
} from "recharts";

// --- MOCK DATA ---
const metrics = [
  { label: "Active Customers", value: "1,248", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+12%" },
  { label: "Churn Risk", value: "5%", icon: UserMinus, color: "text-rose-600", bg: "bg-rose-50", trend: "+0.5%" },
  { label: "Overdue Payments", value: "₹2.4L", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50", trend: "-2%" },
  { label: "New Cust. (MTD)", value: "25", icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+8" },
];

const growthData = [
  { month: "Jan", active: 980, new: 45 },
  { month: "Feb", active: 1050, new: 70 },
  { month: "Mar", active: 1120, new: 65 },
  { month: "Apr", active: 1180, new: 50 },
  { month: "May", active: 1248, new: 68 },
];

const churnData = [
  { month: "Jan", rate: 4.2 },
  { month: "Feb", rate: 4.5 },
  { month: "Mar", rate: 3.8 },
  { month: "Apr", rate: 4.0 },
  { month: "May", rate: 5.1 }, // Spike
];

const customerTable = [
  { id: 1, name: "ABC Hospital", status: "Active", risk: "Low", overdue: "₹0", region: "North" },
  { id: 2, name: "Green Villa Soc", status: "Active", risk: "High", overdue: "₹12,500", region: "East" },
  { id: 3, name: "Tech Park Zone 1", status: "At-Risk", risk: "Critical", overdue: "₹45,000", region: "West" },
  { id: 4, name: "City Gym", status: "Active", risk: "Medium", overdue: "₹2,100", region: "South" },
  { id: 5, name: "Grand Hotel", status: "Inactive", risk: "Low", overdue: "₹0", region: "North" },
];

const CustomerInsights = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. TOP ROW: KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          const isPositive = m.trend.includes('+');
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{m.label}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{m.value}</h3>
                <span className={`text-xs font-bold flex items-center gap-1 mt-2 ${
                  m.label === 'Churn Risk' || m.label === 'Overdue Payments' 
                    ? (isPositive ? 'text-rose-600' : 'text-emerald-600') // Inverted logic for "Bad" metrics
                    : (isPositive ? 'text-emerald-600' : 'text-rose-600')
                }`}>
                  {isPositive ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                  {m.trend} vs last mo
                </span>
              </div>
              <div className={`p-3 rounded-lg ${m.bg}`}>
                <Icon className={m.color} size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. ALERT BANNER */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-600 shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 text-sm">Action Required: High Churn Risk</h4>
            <p className="text-amber-800 text-xs mt-1">
              3 key accounts (Total Value: ₹4.5L/yr) are showing signs of churn. Contracts expire in less than 30 days.
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-amber-200 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-100 transition-colors">
            View Accounts
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 shadow-sm transition-colors">
            Send Offers
          </button>
        </div>
      </div>

      {/* 3. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart A: Growth Trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-600" /> Customer Growth Trend
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  cursor={{fill: '#F1F5F9'}}
                />
                <Bar dataKey="active" name="Active Users" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Churn Rate */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <UserMinus size={18} className="text-rose-500" /> Churn Rate (%)
            </h3>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">Avg: 4.2%</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churnData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="rate" stroke="#E11D48" strokeWidth={3} dot={{r: 4, fill: '#E11D48', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. DETAILED TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Header / Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-800 text-lg">Customer Risk Analysis</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40 sm:w-64"
              />
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">Overdue Amount</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customerTable.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{row.name}</td>
                  <td className="px-6 py-4 text-slate-500">{row.region}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      row.status === 'At-Risk' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`flex items-center gap-1.5 text-xs font-bold ${
                        row.risk === 'Critical' ? 'text-rose-600' :
                        row.risk === 'High' ? 'text-amber-600' : 'text-emerald-600'
                     }`}>
                       <span className={`w-2 h-2 rounded-full ${
                          row.risk === 'Critical' ? 'bg-rose-500' :
                          row.risk === 'High' ? 'bg-amber-500' : 'bg-emerald-500'
                       }`}></span>
                       {row.risk}
                     </span>
                  </td>
                  <td className={`px-6 py-4 font-mono font-bold ${row.overdue !== '₹0' ? 'text-rose-600' : 'text-slate-400'}`}>
                    {row.overdue}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 font-bold text-xs flex items-center justify-end gap-1 ml-auto">
                      View Profile <ChevronRight size={14} />
                    </button>
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

export default CustomerInsights;
