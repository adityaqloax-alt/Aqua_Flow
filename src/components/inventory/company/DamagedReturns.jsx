import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  RefreshCw, 
  RotateCcw, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronUp,
  Camera,
  CheckCircle,
  XCircle,
  BarChart3
} from 'lucide-react';

const DamagedReturns = () => {
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Enterprise Data Model
  const incidents = [
    { 
      id: 'DMG-2025-001',
      item: '500ml PET Bottles',
      sku: 'RM-PET-500',
      batch: 'B-9921',
      qty: 150, 
      unitCost: 0.15,
      totalLoss: 22.50,
      reason: 'Crushed/Deformed', 
      source: 'Inbound Shipping', 
      severity: 'Medium',
      disposition: 'Recycled',
      status: 'Closed',
      date: 'Dec 28, 2025',
      inspector: 'Sarah C.',
      notes: 'Pallet 4 was tipped over upon arrival. Carrier notified.'
    },
    { 
      id: 'DMG-2025-002',
      item: '20L Polycarbonate Jar',
      sku: 'FG-JAR-20L',
      batch: 'B-9904',
      qty: 12, 
      unitCost: 4.50,
      totalLoss: 54.00,
      reason: 'Micro-cracks / Leakage', 
      source: 'Production Line B', 
      severity: 'Critical',
      disposition: 'Pending Investigation',
      status: 'Open',
      date: 'Dec 27, 2025',
      inspector: 'Mike R.',
      notes: 'Possible mold defect. Samples sent to QA Lab.'
    },
    { 
      id: 'DMG-2025-003',
      item: 'Shrink Wrap Rolls',
      sku: 'PKG-WRAP-01',
      batch: 'B-8812',
      qty: 5, 
      unitCost: 12.00,
      totalLoss: 60.00,
      reason: 'Water Damage', 
      source: 'Warehouse Storage', 
      severity: 'Low',
      disposition: 'Disposed',
      status: 'Closed',
      date: 'Dec 26, 2025',
      inspector: 'Tom K.',
      notes: 'Roof leak in Sector 4 caused water damage.'
    },
    { 
      id: 'RTN-2025-089',
      item: '1L Water Case (12pk)',
      sku: 'FG-H20-1L-12',
      batch: 'B-9800',
      qty: 40, 
      unitCost: 3.20,
      totalLoss: 128.00,
      reason: 'Customer Return (Expired)', 
      source: 'Distributor A', 
      severity: 'Low',
      disposition: 'Disposed',
      status: 'Closed',
      date: 'Dec 25, 2025',
      inspector: 'Alex D.',
      notes: 'Returned from retail partner. Expiry date passed.'
    },
  ];

  // Filtering Logic
  const filteredIncidents = incidents.filter(inc => {
    const matchesSeverity = filterSeverity === 'All' || inc.severity === filterSeverity;
    const matchesSearch = inc.item.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inc.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inc.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  // Toggle Row Expansion
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Helper for Severity Styles
  const getSeverityStyle = (level) => {
    switch(level) {
      case 'Critical': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  // Helper for Disposition Icons
  const getDispositionIcon = (type) => {
    switch(type) {
      case 'Recycled': return <RefreshCw size={14} className="text-emerald-500" />;
      case 'Disposed': return <Trash2 size={14} className="text-slate-400" />;
      case 'Returned': return <RotateCcw size={14} className="text-blue-500" />;
      default: return <AlertTriangle size={14} className="text-amber-500" />; // Pending
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden w-full">
      
      {/* 1. Industrial KPI Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="text-rose-500" />
              Loss & Defect Management
            </h3>
            <p className="text-sm text-slate-500 mt-1">Track financial loss, defective batches, and waste disposal.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
              <FileText size={16} /> QC Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg text-sm font-bold text-white hover:bg-slate-800 transition-colors">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-50 rounded-lg text-rose-600 border border-rose-100"><DollarSign size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Loss (Dec)</p>
              <p className="text-xl font-bold text-slate-800">$264.50</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600 border border-amber-100"><AlertTriangle size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Open Incidents</p>
              <p className="text-xl font-bold text-slate-800">1 Critical</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100"><RefreshCw size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Recovery Rate</p>
              <p className="text-xl font-bold text-slate-800">35%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Controls & Filter */}
      <div className="px-6 py-4 flex flex-col sm:flex-row items-center gap-4 border-b border-slate-100 bg-white">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by SKU, Batch, or Reason..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
           {['All', 'Critical', 'Medium', 'Low'].map(s => (
             <button 
               key={s}
               onClick={() => setFilterSeverity(s)}
               className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${filterSeverity === s ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {s}
             </button>
           ))}
        </div>
      </div>

      {/* 3. Detailed Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 w-8"></th>
              <th className="px-6 py-3">Item / SKU</th>
              <th className="px-6 py-3">Reason & Source</th>
              <th className="px-6 py-3">Batch Info</th>
              <th className="px-6 py-3 text-right">Financial Impact</th>
              <th className="px-6 py-3">Disposition</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredIncidents.map((inc) => {
              const isExpanded = expandedId === inc.id;

              return (
                <React.Fragment key={inc.id}>
                  <tr 
                    onClick={() => toggleExpand(inc.id)}
                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-indigo-50/20' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4 text-slate-400">
                       {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          <AlertTriangle size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{inc.item}</p>
                          <p className="text-xs text-slate-400 font-mono">{inc.sku}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSeverityStyle(inc.severity)}`}>
                          {inc.severity}
                        </span>
                        <span className="font-medium text-slate-700">{inc.reason}</span>
                        <span className="text-xs text-slate-400">Via: {inc.source}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                        {inc.batch}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">{inc.date}</p>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-rose-600">-${inc.totalLoss.toFixed(2)}</p>
                      <p className="text-xs text-slate-400">{inc.qty} units @ ${inc.unitCost}</p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getDispositionIcon(inc.disposition)}
                        <span className="text-sm font-medium text-slate-700">{inc.disposition}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${inc.status === 'Open' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">{inc.status}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <tr className="bg-indigo-50/10 border-b border-indigo-50">
                      <td colSpan="7" className="px-6 py-0">
                         <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-1">
                            
                            {/* Section 1: Investigation */}
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                               <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                                 <Search size={12}/> Investigation Details
                               </h4>
                               <div className="space-y-3">
                                  <p className="text-sm text-slate-700 bg-white p-3 rounded border border-slate-200 italic">
                                    "{inc.notes}"
                                  </p>
                                  <div className="flex justify-between text-xs text-slate-500">
                                     <span>Inspector: <span className="font-bold text-slate-700">{inc.inspector}</span></span>
                                     <span>Reported: <span className="font-bold text-slate-700">{inc.date}</span></span>
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                     <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:text-indigo-600">
                                       <Camera size={12}/> View Photos
                                     </button>
                                     <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:text-indigo-600">
                                       <BarChart3 size={12}/> Loss Analysis
                                     </button>
                                  </div>
                               </div>
                            </div>

                            {/* Section 2: Actions */}
                            <div className="flex flex-col justify-center items-center bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                               <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3">Resolution Actions</h4>
                               {inc.status === 'Open' ? (
                                 <div className="space-y-2 w-full max-w-xs">
                                    <button className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-sm">
                                      <CheckCircle size={14}/> Approve Disposal
                                    </button>
                                    <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 flex items-center justify-center gap-2">
                                      <XCircle size={14}/> Reject / Re-Investigate
                                    </button>
                                 </div>
                               ) : (
                                  <div className="text-emerald-600 bg-emerald-100 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                                     <CheckCircle size={16}/> Case Closed
                                  </div>
                               )}
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
    </div>
  );
};

export default DamagedReturns;
