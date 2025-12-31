import React, { useState } from 'react';
import { 
  ClipboardList, 
  ArrowUpRight, 
  ArrowDownLeft, 
  AlertOctagon, 
  Search, 
  Filter, 
  Download, 
  History,
  ChevronDown,
  ChevronUp,
  FileText,
  Printer,
  Calendar,
  User,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

const AuditLogs = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Enterprise Data Model
  const logs = [
    { 
      id: 'TRX-2025-8821',
      batchId: 'B-2025-001',
      item: '500ml PET Bottles',
      sku: 'SKU-500-PET',
      prevQty: 5000,
      newQty: 5200,
      change: 200, 
      type: 'Inbound', 
      reason: 'PO #4492 Received', 
      user: 'Sarah Connor',
      role: 'Warehouse Mgr',
      date: 'Dec 29, 2025',
      time: '10:30 AM',
      location: 'Zone A - Rack 4',
      status: 'Verified'
    },
    { 
      id: 'TRX-2025-8822',
      batchId: 'B-2025-001',
      item: '20L Jar Caps',
      sku: 'SKU-CAP-20L',
      prevQty: 1050,
      newQty: 1000,
      change: -50, 
      type: 'Damage', 
      reason: 'Crushed by Forklift', 
      user: 'Mike Ross',
      role: 'Forklift Op',
      date: 'Dec 29, 2025',
      time: '09:15 AM',
      location: 'Zone B - Floor',
      status: 'Flagged' // Needs review
    },
    { 
      id: 'TRX-2025-8823',
      batchId: 'PROD-LINE-A',
      item: 'Adhesive Labels',
      sku: 'SKU-LBL-GLUE',
      prevQty: 12000,
      newQty: 10800,
      change: -1200, 
      type: 'Outbound', 
      reason: 'Consumption: Batch 001', 
      user: 'System Auto',
      role: 'Automation',
      date: 'Dec 28, 2025',
      time: '04:00 PM',
      location: 'Production Line A',
      status: 'Verified'
    },
    { 
      id: 'TRX-2025-8824',
      batchId: 'N/A',
      item: 'Raw Minerals (Mg)',
      sku: 'RAW-MIN-MG',
      prevQty: 450,
      newQty: 500,
      change: 50, 
      type: 'Adjustment', 
      reason: 'Quarterly Stock Count', 
      user: 'Tom Cook',
      role: 'Auditor',
      date: 'Dec 28, 2025',
      time: '08:45 AM',
      location: 'Silo 3',
      status: 'Verified'
    },
    { 
      id: 'TRX-2025-8825',
      batchId: 'SHIP-991',
      item: '1L Water Case',
      sku: 'FG-1L-CASE',
      prevQty: 200,
      newQty: 150,
      change: -50, 
      type: 'Outbound', 
      reason: 'Sales Order #SO-992', 
      user: 'Logistics Team',
      role: 'Dispatch',
      date: 'Dec 27, 2025',
      time: '02:30 PM',
      location: 'Loading Bay 1',
      status: 'Verified'
    },
  ];

  // Filtering Logic
  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'All' || log.type === filterType;
    const matchesSearch = log.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Action Handlers
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000); // Simulate API call
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Helper for Styles
  const getTypeStyle = (type) => {
    switch (type) {
      case 'Inbound': return { icon: <ArrowDownLeft size={16} />, bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' };
      case 'Outbound': return { icon: <ArrowUpRight size={16} />, bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' };
      case 'Damage': return { icon: <AlertOctagon size={16} />, bg: 'bg-rose-50', text: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' };
      default: return { icon: <History size={16} />, bg: 'bg-amber-50', text: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden w-full">
      
      {/* 1. KPI Dashboard (Quick Stats) */}
      <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/50 divide-x divide-slate-100">
         <div className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ClipboardList size={18}/></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Transactions</p>
              <p className="text-lg font-bold text-slate-800">{logs.length}</p>
            </div>
         </div>
         <div className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><ArrowDownLeft size={18}/></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Net Inbound</p>
              <p className="text-lg font-bold text-emerald-700">+250</p>
            </div>
         </div>
         <div className="p-4 flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><AlertTriangle size={18}/></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Flagged / Damage</p>
              <p className="text-lg font-bold text-rose-700">1</p>
            </div>
         </div>
      </div>

      {/* 2. Controls Toolbar */}
      <div className="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Search & Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search ID, SKU, Item..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
             {['All', 'Inbound', 'Outbound', 'Damage'].map(t => (
               <button 
                 key={t}
                 onClick={() => setFilterType(t)}
                 className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${filterType === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 {t}
               </button>
             ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex gap-2">
           <button className="p-2 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 rounded-lg border border-slate-200 transition-colors" title="Print Log">
              <Printer size={16} />
           </button>
           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-70"
           >
              {isExporting ? <RefreshCw size={14} className="animate-spin"/> : <Download size={14} />}
              {isExporting ? 'Exporting...' : 'Export CSV'}
           </button>
        </div>
      </div>

      {/* 3. The Ledger Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 w-10"></th>
              <th className="px-6 py-3">Transaction</th>
              <th className="px-6 py-3">Item Detail</th>
              <th className="px-6 py-3 text-right">Movement</th>
              <th className="px-6 py-3">Authorized By</th>
              <th className="px-6 py-3 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredLogs.map((log) => {
              const style = getTypeStyle(log.type);
              const isExpanded = expandedId === log.id;
              
              return (
                <React.Fragment key={log.id}>
                  {/* Main Row */}
                  <tr 
                    onClick={() => toggleExpand(log.id)}
                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-indigo-50/20' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4 text-slate-400">
                       {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${style.bg} ${style.text}`}>
                          {style.icon}
                        </div>
                        <div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${style.badge}`}>
                            {log.type}
                          </span>
                          <p className="text-[10px] text-slate-400 font-mono mt-1">{log.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700">{log.item}</p>
                      <p className="text-xs text-slate-400 font-mono">{log.sku}</p>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className={`font-mono font-bold text-base ${log.change > 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                        {log.change > 0 ? '+' : ''}{log.change}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {log.user.charAt(0)}
                        </div>
                        <div>
                           <p className="text-xs font-semibold text-slate-700">{log.user}</p>
                           <p className="text-[10px] text-slate-400">{log.role}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <p className="text-xs font-bold text-slate-600">{log.date}</p>
                      <p className="text-[10px] text-slate-400">{log.time}</p>
                    </td>
                  </tr>

                  {/* Expanded Details Row */}
                  {isExpanded && (
                    <tr className="bg-indigo-50/10 border-b border-indigo-50">
                       <td colSpan="6" className="px-6 py-0">
                          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-1">
                             
                             {/* Section 1: Stock Snapshot */}
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Inventory Snapshot</h4>
                                <div className="flex items-center justify-between gap-4">
                                   <div>
                                      <p className="text-xs text-slate-500">Before</p>
                                      <p className="text-sm font-mono font-bold text-slate-700">{log.prevQty}</p>
                                   </div>
                                   <div className="h-px flex-1 bg-slate-300 relative">
                                      <div className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 bg-slate-50 text-[10px] font-bold ${log.change > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                         {log.change > 0 ? '+' : ''}{log.change}
                                      </div>
                                   </div>
                                   <div className="text-right">
                                      <p className="text-xs text-slate-500">After</p>
                                      <p className="text-sm font-mono font-bold text-indigo-600">{log.newQty}</p>
                                   </div>
                                </div>
                             </div>

                             {/* Section 2: Context */}
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Context & Reason</h4>
                                <div className="space-y-1">
                                   <div className="flex justify-between">
                                      <span className="text-xs text-slate-500">Reason Code:</span>
                                      <span className="text-xs font-bold text-slate-700">{log.reason}</span>
                                   </div>
                                   <div className="flex justify-between">
                                      <span className="text-xs text-slate-500">Location:</span>
                                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1"><History size={10}/> {log.location}</span>
                                   </div>
                                   <div className="flex justify-between">
                                      <span className="text-xs text-slate-500">Related Batch:</span>
                                      <span className="text-xs font-bold text-indigo-600 underline cursor-pointer">{log.batchId}</span>
                                   </div>
                                </div>
                             </div>

                             {/* Section 3: Status */}
                             <div className="flex flex-col justify-center items-center bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Audit Status</h4>
                                {log.status === 'Verified' ? (
                                   <div className="flex items-center gap-2 text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full text-xs font-bold">
                                      <ClipboardList size={14}/> Verified by System
                                   </div>
                                ) : (
                                   <div className="flex items-center gap-2 text-rose-600 bg-rose-100 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                      <AlertTriangle size={14}/> Flagged for Review
                                   </div>
                                )}
                                <button className="mt-2 text-[10px] text-slate-400 underline hover:text-indigo-600">View Digital Signature</button>
                             </div>

                          </div>
                       </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 4. Footer / Pagination */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500">
         <span>Showing {filteredLogs.length} of {logs.length} transactions</span>
         <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold rounded">1</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Next</button>
         </div>
      </div>

    </div>
  );
};

export default AuditLogs;
