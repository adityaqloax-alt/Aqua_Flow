import React, { useState } from 'react';
import { 
  Users, Search, Filter, MoreVertical, MapPin, 
  Clock, AlertTriangle, Building2, Home, Factory,
  Phone, Ban, FileText, Truck, DollarSign 
} from 'lucide-react';

// --- MOCK DATA (Simulating CRM + Finance DB) ---
const CUSTOMERS_DATA = [
  {
    id: 'CUST-001',
    name: 'ABC Hospital',
    type: 'Corporate',
    contact: 'Dr. Mehta',
    route: 'North - Route 4',
    delivery: {
      freq: 'Daily',
      time: '06:00 AM',
      vehicle: 'Tanker-04'
    },
    finance: {
      revenue: 85000,
      outstanding: 0,
      status: 'Reliable' 
    },
    status: 'Active',
    risk: 'low', 
  },
  {
    id: 'CUST-002',
    name: 'Green Villa Society',
    type: 'Residential',
    contact: 'Ravi Kumar (Sec)',
    route: 'East - Route 2',
    delivery: {
      freq: 'Alternate Days',
      time: '08:30 AM',
      vehicle: 'Mini-02'
    },
    finance: {
      revenue: 42000,
      outstanding: 1200,
      status: 'Regular'
    },
    status: 'Active',
    risk: 'low',
  },
  {
    id: 'CUST-003',
    name: 'XYZ Factory',
    type: 'Industrial',
    contact: 'Plant Manager',
    route: 'West - Industrial Zone',
    delivery: {
      freq: 'On-Demand',
      time: 'Flexible',
      vehicle: 'Tanker-01'
    },
    finance: {
      revenue: 120000,
      outstanding: 45000, // High due
      status: 'Payment Issue'
    },
    status: 'On Hold', // Supply paused
    risk: 'high',
  },
  {
    id: 'CUST-004',
    name: 'Sunrise Apartments',
    type: 'Residential',
    contact: 'Mrs. Sharma',
    route: 'East - Route 2',
    delivery: {
      freq: 'Daily',
      time: '07:00 AM',
      vehicle: 'Mini-02'
    },
    finance: {
      revenue: 25000,
      outstanding: 5000,
      status: 'Slow Payer'
    },
    status: 'Active',
    risk: 'medium',
  },
];

// --- UTILITY COMPONENTS ---

// 1. KPI Summary Card
const SummaryCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase">{title}</p>
      <h3 className="text-xl font-bold text-slate-800">{value}</h3>
      {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
    </div>
  </div>
);

// 2. Customer Type Icon Helper
const TypeIcon = ({ type }) => {
  if (type === 'Corporate') return <Building2 size={14} className="text-indigo-500" />;
  if (type === 'Industrial') return <Factory size={14} className="text-slate-500" />;
  return <Home size={14} className="text-emerald-500" />;
};

// 3. Risk Indicator
const RiskBadge = ({ level }) => {
  const colors = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-rose-100 text-rose-700 font-bold",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${colors[level]}`}>
      {level === 'high' ? 'High Risk' : level === 'medium' ? 'Watchlist' : 'Reliable'}
    </span>
  );
};

// --- MAIN COMPONENT ---

const Customers = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans space-y-6">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customer Database</h1>
          <p className="text-slate-500 text-sm">Manage profiles, delivery routes, and credit risk.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors">
             <Filter size={16} /> Filter
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors shadow-md">
             <Users size={16} /> + Add Customer
           </button>
        </div>
      </div>

      {/* KPI DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Customers" 
          value="142" 
          icon={Users} 
          color="bg-blue-500" 
          subtext="+4 this month"
        />
        <SummaryCard 
          title="Monthly Revenue" 
          value="₹12.4L" 
          icon={DollarSign} 
          color="bg-emerald-500" 
          subtext="Avg ₹8.7k / customer"
        />
        <SummaryCard 
          title="On-Hold / Blocked" 
          value="8" 
          icon={Ban} 
          color="bg-rose-500" 
          subtext="Due to non-payment"
        />
         <SummaryCard 
          title="Active Routes" 
          value="6" 
          icon={Truck} 
          color="bg-amber-500" 
          subtext="Covering 4 zones"
        />
      </div>

      {/* MAIN TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or route..." 
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Logistics & Route</th>
                <th className="p-4">Financial Health</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {CUSTOMERS_DATA.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                  
                  {/* Column 1: Identity */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-800 text-base">{c.name}</span>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <TypeIcon type={c.type} />
                        <span>{c.type}</span>
                        <span className="text-slate-300">|</span>
                        <span>{c.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Route & Delivery */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <MapPin size={14} className="text-slate-400"/> {c.route}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Clock size={12} /> {c.delivery.time} ({c.delivery.freq})
                      </div>
                    </div>
                  </td>

                  {/* Column 3: Finance & Risk */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center w-32">
                        <span className="text-slate-500 text-xs">Rev:</span>
                        <span className="font-medium">₹{c.finance.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center w-32">
                        <span className="text-slate-500 text-xs">Due:</span>
                        <span className={`${c.finance.outstanding > 10000 ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                          ₹{c.finance.outstanding.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-1">
                        <RiskBadge level={c.risk} />
                      </div>
                    </div>
                  </td>

                  {/* Column 4: Status */}
                  <td className="p-4">
                    {c.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        {c.status}
                      </span>
                    )}
                  </td>

                  {/* Column 5: Actions (Hover) */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="View Invoices" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                        <FileText size={16} />
                      </button>
                      <button title="Contact" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                        <Phone size={16} />
                      </button>
                      <button title="Pause Supply" className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center">
            <button className="text-xs text-slate-500 hover:text-indigo-600 font-medium">View All Customers</button>
        </div>

      </div>
    </div>
  );
};

export default Customers;
