import React, { useState } from 'react';
import { 
  FileText, Download, DollarSign, Bell, MoreVertical, 
  TrendingUp, AlertCircle, CheckCircle, Clock 
} from 'lucide-react';

// --- MOCK DATA (Simulating Database) ---
const INVOICE_DATA = [
  {
    id: 'INV-4581',
    client: 'ABC Hospital',
    date: '2025-04-01',
    dueDate: '2025-04-08',
    volume: 72000, // Liters
    rate: 1.2,
    amount: 86400, // Base Amount
    tax: 15552, // 18% GST approx
    total: 101952,
    paid: 40000,
    status: 'partial', // paid, partial, unpaid, overdue
    daysOverdue: 0,
  },
  {
    id: 'INV-4582',
    client: 'Green Villa',
    date: '2025-03-15',
    dueDate: '2025-03-22',
    volume: 45000,
    rate: 1.2,
    amount: 54000,
    tax: 9720,
    total: 63720,
    paid: 63720,
    status: 'paid',
    daysOverdue: 0,
  },
  {
    id: 'INV-4579',
    client: 'Tech Park Zone 1',
    date: '2025-02-01',
    dueDate: '2025-02-08',
    volume: 120000,
    rate: 1.1,
    amount: 132000,
    tax: 23760,
    total: 155760,
    paid: 0,
    status: 'overdue',
    daysOverdue: 45, // Critical
  },
  {
    id: 'INV-4588',
    client: 'Sunrise Apartments',
    date: '2025-04-05',
    dueDate: '2025-04-12',
    volume: 25000,
    rate: 1.3,
    amount: 32500,
    tax: 5850,
    total: 38350,
    paid: 0,
    status: 'due',
    daysOverdue: 0,
  },
];

// --- UTILITY COMPONENTS ---

// 1. KPI Summary Card
const SummaryCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      <p className={`text-xs mt-1 ${subtext.includes('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
        {subtext}
      </p>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

// 2. Status Badge with Aging Logic
const StatusBadge = ({ status, daysOverdue }) => {
  let styles = "bg-slate-100 text-slate-600";
  let label = status;

  if (status === 'paid') {
    styles = "bg-emerald-100 text-emerald-700 border border-emerald-200";
    label = "Paid";
  } else if (status === 'partial') {
    styles = "bg-blue-100 text-blue-700 border border-blue-200";
    label = "Partial";
  } else if (daysOverdue > 30) {
    styles = "bg-rose-100 text-rose-700 border border-rose-200 font-bold";
    label = `Critical (${daysOverdue}d)`;
  } else if (daysOverdue > 7) {
    styles = "bg-orange-100 text-orange-700 border border-orange-200";
    label = `Overdue (${daysOverdue}d)`;
  } else {
    styles = "bg-amber-100 text-amber-700 border border-amber-200";
    label = "Due Soon";
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}>
      {label}
    </span>
  );
};

// --- MAIN COMPONENT ---

const Billing = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Billing & Invoices</h1>
          <p className="text-slate-500 text-sm">Manage water supply invoices, track payments, and audit revenue.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors">
             <Download size={16} /> Export Report
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors shadow-md">
             + Create Invoice
           </button>
        </div>
      </div>

      {/* KPI SUMMARY CARDS (Revenue Insights) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Outstanding" 
          value="₹1,99,342" 
          subtext="+12% vs last month" 
          icon={AlertCircle} 
          color="bg-rose-500" 
        />
        <SummaryCard 
          title="Collected This Month" 
          value="₹84,500" 
          subtext="+5% vs last month" 
          icon={CheckCircle} 
          color="bg-emerald-500" 
        />
        <SummaryCard 
          title="Avg. Payment Delay" 
          value="14 Days" 
          subtext="-2 days improvement" 
          icon={Clock} 
          color="bg-amber-500" 
        />
        <SummaryCard 
          title="Active Contracts" 
          value="24" 
          subtext="2 expiring soon" 
          icon={FileText} 
          color="bg-blue-500" 
        />
      </div>

      {/* MAIN INVOICE TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-100 flex gap-2 overflow-x-auto">
          {['All', 'Paid', 'Partial', 'Overdue', 'Critical'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === tab 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">Invoice Details</th>
                <th className="p-4 font-semibold">Usage (Liters)</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Balance</th>
                <th className="p-4 font-semibold">Status (Aging)</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INVOICE_DATA.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors group">
                  
                  {/* Column 1: Invoice Details */}
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{invoice.client}</span>
                      <span className="text-xs text-slate-500 font-mono">{invoice.id} • {invoice.date}</span>
                    </div>
                  </td>

                  {/* Column 2: Water Usage */}
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700 font-medium">{invoice.volume.toLocaleString()} L</span>
                      <span className="text-xs text-slate-400">@ ₹{invoice.rate}/L</span>
                    </div>
                  </td>

                  {/* Column 3: Total Amount */}
                  <td className="p-4">
                    <div className="text-slate-700 font-medium">₹{invoice.total.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Tax: ₹{invoice.tax.toLocaleString()}</div>
                  </td>

                  {/* Column 4: Balance (Partial Payment Logic) */}
                  <td className="p-4">
                    {invoice.paid > 0 && invoice.paid < invoice.total ? (
                      <div>
                        <span className="text-rose-600 font-bold">₹{(invoice.total - invoice.paid).toLocaleString()}</span>
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1">
                          <div 
                            className="h-1.5 bg-emerald-500 rounded-full" 
                            style={{ width: `${(invoice.paid / invoice.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-slate-500">Paid: {Math.round((invoice.paid / invoice.total) * 100)}%</span>
                      </div>
                    ) : (
                      <span className={invoice.status === 'paid' ? "text-emerald-600 font-medium" : "text-slate-800"}>
                        {invoice.status === 'paid' ? '₹0.00' : `₹${invoice.total.toLocaleString()}`}
                      </span>
                    )}
                  </td>

                  {/* Column 5: Status Badge */}
                  <td className="p-4">
                    <StatusBadge status={invoice.status} daysOverdue={invoice.daysOverdue} />
                  </td>

                  {/* Column 6: Actions */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="View PDF" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <FileText size={18} />
                      </button>
                      <button title="Record Payment" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                        <DollarSign size={18} />
                      </button>
                      <button title="Send Reminder" className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                        <Bell size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
          <span>Showing 4 of 128 invoices</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-slate-50">Previous</button>
            <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
