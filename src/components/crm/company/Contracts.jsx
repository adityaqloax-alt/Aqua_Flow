import React, { useState } from 'react';
import { 
  FileText, Calendar, AlertTriangle, CheckCircle, 
  TrendingUp, Shield, Clock, MoreHorizontal, Download, RefreshCw 
} from 'lucide-react';

// --- MOCK DATA (Simulating Database) ---
const CONTRACTS_DATA = [
  {
    id: 'CTR-2024-001',
    client: 'ABC Hospital',
    status: 'active', // active, expiring, expired, draft
    startDate: '2024-01-01',
    endDate: '2026-01-01', // Healthy duration
    value: 180000, // Monthly Value
    volume: {
      committed: 5000,
      min: 4500,
      max: 6000,
      currentUsage: 4800, // 96% utilization
    },
    pricing: {
      type: 'Fixed',
      rate: 1.2,
    },
    sla: {
      deliveryTime: 'Before 7:00 AM',
      penalty: '₹2000/delay',
    },
    autoRenew: true,
  },
  {
    id: 'CTR-2023-089',
    client: 'Green Villa Society',
    status: 'expiring',
    startDate: '2023-05-01',
    endDate: '2025-05-15', // Expires in < 45 days
    value: 45000,
    volume: {
      committed: 2000,
      min: 1500,
      max: 2500,
      currentUsage: 1200, // Under-utilized (Risk)
    },
    pricing: {
      type: 'Tiered',
      details: '₹1.2 base, ₹1.5 peak',
    },
    sla: {
      deliveryTime: '08:00 AM - 10:00 AM',
      penalty: 'None',
    },
    autoRenew: false,
  },
  {
    id: 'CTR-2025-002',
    client: 'Tech Park Zone 1',
    status: 'draft',
    startDate: '2025-06-01',
    endDate: '2026-06-01',
    value: 320000,
    volume: {
      committed: 12000,
      min: 10000,
      max: 15000,
      currentUsage: 0,
    },
    pricing: {
      type: 'Volume Discount',
      rate: 1.0,
    },
    sla: {
      deliveryTime: '24/7 On-call',
      penalty: 'Strict',
    },
    autoRenew: true,
  },
];

// --- UTILITY COMPONENTS ---

// 1. KPI Summary Card (Reused style for consistency)
const SummaryCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

// 2. Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    expiring: "bg-amber-100 text-amber-700 border-amber-200",
    expired: "bg-rose-100 text-rose-700 border-rose-200",
    draft: "bg-blue-100 text-blue-700 border-blue-200",
  };
  
  const labels = {
    active: "Active Contract",
    expiring: "Expiring Soon",
    expired: "Expired",
    draft: "Draft / Pending",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.draft}`}>
      {labels[status]}
    </span>
  );
};

// --- MAIN COMPONENT ---

const Contracts = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Contract Management</h1>
          <p className="text-slate-500 text-sm">Monitor commitments, renewals, and SLA compliance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-md transition-colors">
          <FileText size={18} /> + New Contract
        </button>
      </div>

      {/* KPI SUMMARIES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Active Contracts" 
          value="24" 
          subtext="Total Monthly Value: ₹12.5L" 
          icon={CheckCircle} 
          color="bg-emerald-500" 
        />
        <SummaryCard 
          title="Expiring (60 Days)" 
          value="3" 
          subtext="Needs immediate attention" 
          icon={AlertTriangle} 
          color="bg-amber-500" 
        />
        <SummaryCard 
          title="Draft Proposals" 
          value="5" 
          subtext="Pending Manager Approval" 
          icon={FileText} 
          color="bg-blue-500" 
        />
        <SummaryCard 
          title="Avg. Utilization" 
          value="88%" 
          subtext="4 clients under-utilizing" 
          icon={TrendingUp} 
          color="bg-indigo-500" 
        />
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {['All', 'Active', 'Expiring', 'Drafts'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === tab ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTRACTS LIST (Cards Layout) */}
      <div className="space-y-4">
        {CONTRACTS_DATA.map((contract) => (
          <div 
            key={contract.id} 
            className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden
              ${contract.status === 'expiring' ? 'border-amber-300 border-l-4' : 'border-slate-200 border-l-4 border-l-transparent'}
            `}
          >
            {/* Card Header */}
            <div className="p-5 flex flex-col md:flex-row justify-between md:items-center border-b border-slate-100 gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg">
                  {contract.client.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{contract.client}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{contract.id}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {contract.autoRenew ? <RefreshCw size={12} className="text-emerald-600"/> : <AlertTriangle size={12} className="text-amber-500"/>}
                      {contract.autoRenew ? 'Auto-Renew ON' : 'Manual Renewal'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-slate-400 uppercase font-semibold">Contract Value</p>
                  <p className="font-bold text-slate-800">₹{contract.value.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
                </div>
                <StatusBadge status={contract.status} />
              </div>
            </div>

            {/* Card Body Grid */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Column 1: Dates & Terms */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={14} /> Timeline
                </h4>
                <div className="text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Start Date</span>
                    <span className="font-medium text-slate-700">{contract.startDate}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">End Date</span>
                    <span className={`font-medium ${contract.status === 'expiring' ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                      {contract.endDate}
                    </span>
                  </div>
                </div>
                {contract.status === 'expiring' && (
                  <div className="bg-amber-50 text-amber-800 text-xs px-3 py-2 rounded border border-amber-100 flex items-center gap-2">
                    <Clock size={14} /> Renewal negotiation overdue by 5 days
                  </div>
                )}
              </div>

              {/* Column 2: Volume & SLA */}
              <div className="space-y-3">
                 <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Shield size={14} /> Service Terms
                </h4>
                <div className="text-sm space-y-1">
                  <p className="text-slate-700">
                    <span className="text-slate-500">Commitment:</span> 
                    <span className="font-medium ml-1">{contract.volume.committed.toLocaleString()} L/day</span>
                  </p>
                  <p className="text-slate-700">
                    <span className="text-slate-500">Limits:</span> 
                    <span className="font-medium ml-1">{contract.volume.min}L (Min) - {contract.volume.max}L (Max)</span>
                  </p>
                  <p className="text-slate-700">
                    <span className="text-slate-500">SLA:</span> 
                    <span className="font-medium ml-1 text-indigo-600">{contract.sla.deliveryTime}</span>
                  </p>
                </div>
              </div>

              {/* Column 3: Usage Visualization */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp size={14} /> Current Month Usage
                </h4>
                
                {contract.status !== 'draft' ? (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{contract.volume.currentUsage.toLocaleString()} L</span>
                      <span className="text-slate-400 text-xs">{Math.round((contract.volume.currentUsage / contract.volume.committed)*100)}% utilized</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full ${
                          (contract.volume.currentUsage / contract.volume.committed) > 1.1 ? 'bg-rose-500' : // Overuse
                          (contract.volume.currentUsage / contract.volume.committed) < 0.5 ? 'bg-amber-400' : // Underuse
                          'bg-emerald-500' // Healthy
                        }`} 
                        style={{ width: `${Math.min((contract.volume.currentUsage / contract.volume.committed) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Pricing: {contract.pricing.type} @ ₹{contract.pricing.rate || 'Tiered'} / L
                    </p>
                  </div>
                ) : (
                   <div className="h-full flex items-center justify-center text-slate-400 text-sm italic bg-slate-50 rounded border border-dashed border-slate-200">
                     Usage data unavailable (Draft)
                   </div>
                )}
              </div>
            </div>

            {/* Card Footer: Actions */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-end gap-3">
              <button className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                <Download size={14} /> Signed Contract (PDF)
              </button>
              
              {contract.status === 'expiring' && (
                <button className="flex items-center gap-1.5 text-xs font-medium bg-amber-100 text-amber-800 px-3 py-1.5 rounded hover:bg-amber-200 transition-colors">
                  <RefreshCw size={14} /> Renew Now
                </button>
              )}
              
              <button className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1.5">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contracts;
