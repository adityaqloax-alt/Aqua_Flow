import React, { useState } from "react";
import {
  FileText,
  IndianRupee,
  AlertTriangle,
  Clock,
  CheckCircle,
  Receipt,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  ChevronDown,
  Printer,
  Calendar,
  PieChart as PieIcon,
  TrendingUp
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts";

// --- MOCK DATA ---
const revenueData = [
  { name: "Retail", value: 45, color: "#4f46e5" }, // Indigo
  { name: "Bulk", value: 30, color: "#0ea5e9" },   // Sky
  { name: "Contracts", value: 15, color: "#f59e0b" }, // Amber
  { name: "Tanker", value: 10, color: "#10b981" },   // Emerald
];

const agingData = [
  { range: "0-30 Days", amount: 320000 },
  { range: "31-60 Days", amount: 110000 },
  { range: "60+ Days", amount: 210000 },
];

const invoiceList = [
  { id: "#INV-4581", customer: "ABC Hospital", type: "Contract", date: "2024-01-10", amount: 85000, status: "Overdue", due: "2024-01-15" },
  { id: "#INV-4582", customer: "Green Villa Apts", type: "Bulk", date: "2024-01-12", amount: 42000, status: "Pending", due: "2024-01-20" },
  { id: "#INV-4583", customer: "Tech Park Zone 1", type: "Contract", date: "2024-01-14", amount: 120000, status: "Paid", due: "2024-01-14" },
  { id: "#INV-4584", customer: "City Gym", type: "Retail", date: "2024-01-15", amount: 15000, status: "Paid", due: "2024-01-15" },
  { id: "#INV-4585", customer: "Sunshine School", type: "Bulk", date: "2024-01-18", amount: 32000, status: "Pending", due: "2024-01-25" },
  { id: "#INV-4586", customer: "Metro Station", type: "Contract", date: "2024-01-19", amount: 55000, status: "Pending", due: "2024-01-26" },
  { id: "#INV-4587", customer: "Royal Hotel", type: "Tanker", date: "2024-01-05", amount: 28000, status: "Overdue", due: "2024-01-12" },
];

const kpis = [
  { label: "Total Invoices (MTD)", value: "186", sub: "+12 vs last mo", icon: FileText, color: "blue" },
  { label: "Total Billed", value: "₹42.8L", sub: "95% of target", icon: IndianRupee, color: "indigo" },
  { label: "Collected Amount", value: "₹36.4L", sub: "85% collection rate", icon: CheckCircle, color: "emerald" },
  { label: "Outstanding", value: "₹6.4L", sub: "Needs attention", icon: Clock, color: "amber" },
  { label: "Critical Overdue", value: "₹2.1L", sub: "> 60 Days", icon: AlertTriangle, color: "rose" },
];

// --- COMPONENTS ---

const KPICard = ({ kpi }) => {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-all duration-200">
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</h3>
        <p className="text-xs text-slate-400 mt-1 font-medium">{kpi.sub}</p>
      </div>
      <div className={`p-3 rounded-xl ${colorStyles[kpi.color]}`}>
        <kpi.icon size={20} />
      </div>
    </div>
  );
};

const Invoices = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Logic
  const filteredInvoices = invoiceList.filter((inv) => {
    const matchesStatus = filterStatus === "All" || inv.status === filterStatus;
    const matchesSearch = inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) || inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Overdue": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6 space-y-6 font-sans text-slate-900">
      
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="text-indigo-600" />
            Invoice Command Center
          </h1>
          <p className="text-slate-500 mt-1">Manage billing, collections, and financial health.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            <Download size={18} />
            <span>Export Report</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
            <ArrowUpRight size={18} />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* --- SECTION 1: KPI GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* --- SECTION 2: CHARTS & INSIGHTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Receivables Aging (Bar Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-amber-500" />
              Receivables Aging Analysis
            </h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-2 py-1 outline-none">
              <option>This Month</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agingData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="range" type="category" width={80} tick={{fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="amount" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown (Pie Chart) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <PieIcon size={18} className="text-indigo-500" />
            Revenue by Category
          </h3>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="text-center">
                 <p className="text-xs text-slate-400">Total</p>
                 <p className="text-xl font-bold text-slate-800">100%</p>
               </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {revenueData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}}></span>
                <span className="text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECTION 3: INVOICE LIST & GST --- */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Main Table */}
        <div className="xl:col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
          
          {/* Table Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
               <h3 className="font-bold text-slate-800">Recent Invoices</h3>
               <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{filteredInvoices.length}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search customer or ID..." 
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                {["All", "Paid", "Pending", "Overdue"].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      filterStatus === status 
                        ? 'bg-slate-800 text-white' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Invoice</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-indigo-600 cursor-pointer hover:underline">{inv.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {inv.customer}
                      <div className="text-xs text-slate-400 font-normal">{inv.date}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{inv.type}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                       {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(inv.amount)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                       <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-slate-400" />
                          {inv.due}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination (Static for Demo) */}
          <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
             <span>Showing {filteredInvoices.length} of {invoiceList.length} invoices</span>
             <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
             </div>
          </div>
        </div>

        {/* Right Sidebar: Tax & Alerts */}
        <div className="space-y-6">
          
          {/* GST Summary */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Receipt size={18} className="text-blue-500" />
               GST Snapshot
             </h3>
             <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <p className="text-xs font-bold text-slate-400 uppercase">GST Collected (Output)</p>
                   <p className="text-xl font-bold text-slate-800 mt-1">₹6.8L</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <p className="text-xs font-bold text-slate-400 uppercase">GST Paid (Input)</p>
                   <p className="text-xl font-bold text-slate-800 mt-1">₹4.2L</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                   <span className="text-sm font-medium text-slate-600">Net Liability</span>
                   <span className="text-lg font-bold text-rose-600">₹2.6L</span>
                </div>
                <button className="w-full py-2 bg-blue-50 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-100 transition-colors">
                   File GSTR-1
                </button>
             </div>
          </div>

          {/* Alerts / Actions */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <AlertTriangle size={18} className="text-rose-500" />
               Critical Actions
             </h3>
             <div className="space-y-3">
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg flex gap-3 items-start">
                   <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-rose-500"></div>
                   <div>
                      <p className="text-sm font-bold text-rose-800">3 Invoices &gt; 60 Days</p>
                      <p className="text-xs text-rose-600 mt-1">Total value: ₹2.1L. Send final reminder?</p>
                      <button className="mt-2 text-xs font-bold text-rose-700 underline">Review List</button>
                   </div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex gap-3 items-start">
                   <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-amber-500"></div>
                   <div>
                      <p className="text-sm font-bold text-amber-800">Contract Expiring</p>
                      <p className="text-xs text-amber-600 mt-1">Tech Park Zone 1 (Paid) expires in 5 days.</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Invoices;
