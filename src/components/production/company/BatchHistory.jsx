import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  MoreHorizontal, 
  CheckCircle2, 
  AlertTriangle, 
  Beaker, 
  Calendar,
  Factory,
  ArrowRight,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  Truck,
  Package,
  AlertCircle,
  Download
} from 'lucide-react';

const BatchHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedBatchId, setExpandedBatchId] = useState(null);

  // Enterprise Grade Mock Data
  const batches = [
    { 
      id: 'B-2025-001', 
      line: 'Line A (Bottling)', 
      product: '500ml Retail Pack',
      filled: 12000, 
      target: 12500,
      wasted: 500,
      efficiency: 96,
      status: 'Passed',
      qc_score: 9.8,
      date: 'Dec 28, 08:30 AM',
      operator: 'T. Cook',
      labResults: { pH: 7.2, tds: 120, ozone: '0.3ppm', bacteria: 'None' },
      materials: { preforms: '12,550 units', caps: '12,600 units', labels: '12,510 units' },
      downtime: '10m (Label Roll Change)',
      timeline: { start: '08:00', end: '12:00', qc: '12:30', release: '13:00' }
    },
    { 
      id: 'B-2025-002', 
      line: 'Line B (Washing)', 
      product: '20L Jar Cleaning',
      filled: 980, 
      target: 1000,
      wasted: 20,
      efficiency: 98,
      status: 'Testing',
      qc_score: null,
      date: 'Dec 28, 10:15 AM',
      operator: 'M. Chen',
      labResults: { pH: 'Testing...', tds: '118', ozone: 'Pending', bacteria: 'Pending' },
      materials: { detergent: '5.2 L', sanitizer: '2.1 L' },
      downtime: '0m',
      timeline: { start: '10:15', end: 'In Progress', qc: 'Pending', release: 'Pending' }
    },
    { 
      id: 'B-2025-003', 
      line: 'Line C (Filling)', 
      product: '20L Jar Refill',
      filled: 1100, 
      target: 1500,
      wasted: 150, // High waste
      efficiency: 73,
      status: 'Flagged',
      qc_score: 4.2,
      date: 'Dec 27, 02:45 PM',
      operator: 'J. Smith',
      failureReason: 'Cap Sealing Malfunction',
      labResults: { pH: 7.1, tds: 122, ozone: '0.1ppm (Low)', bacteria: 'None' },
      materials: { preforms: 'N/A', caps: '1300 units (High Waste)' },
      downtime: '45m (Maintenance Call)',
      timeline: { start: '14:45', end: '18:00', qc: 'Failed', release: 'Blocked' }
    },
    { 
      id: 'B-2025-004', 
      line: 'Line A (Bottling)', 
      product: '1L Premium Pack',
      filled: 5000, 
      target: 5000,
      wasted: 12,
      efficiency: 100,
      status: 'Passed',
      qc_score: 9.9,
      date: 'Dec 27, 11:00 AM',
      operator: 'A. Johnson',
      labResults: { pH: 7.3, tds: 115, ozone: '0.4ppm', bacteria: 'None' },
      materials: { preforms: '5012', caps: '5015' },
      downtime: '0m',
      timeline: { start: '11:00', end: '15:00', qc: '15:30', release: '16:00' }
    },
  ];

  // Helper Functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Passed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Flagged': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Testing': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getEfficiencyColor = (score) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const toggleExpand = (id) => {
    setExpandedBatchId(expandedBatchId === id ? null : id);
  };

  // Filter Logic
  const filteredBatches = batches.filter(b => 
    (statusFilter === 'All' || b.status === statusFilter) &&
    (b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.product.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      
      {/* 1. Control Toolbar */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search Batch ID, Product..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters & Export */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-slate-200/60 p-1 rounded-lg">
            {['All', 'Passed', 'Flagged', 'Testing'].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${statusFilter === filter ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors" title="Export CSV">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* 2. Data Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Batch Identity</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Production Line</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">QC Status</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBatches.map((batch) => {
              const isExpanded = expandedBatchId === batch.id;
              
              return (
                <React.Fragment key={batch.id}>
                  {/* Main Row */}
                  <tr 
                    onClick={() => toggleExpand(batch.id)}
                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{batch.id}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                          <Clock size={12} /> {batch.date}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700">{batch.line}</span>
                        <span className="text-xs text-slate-500">{batch.product}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Op: {batch.operator}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 w-48">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 font-medium">Yield: {((batch.filled / batch.target) * 100).toFixed(0)}%</span>
                        <span className={`font-bold ${batch.efficiency >= 90 ? 'text-emerald-600' : 'text-rose-600'}`}>{batch.efficiency}% Eff</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full rounded-full ${getEfficiencyColor(batch.efficiency)}`} style={{ width: `${batch.efficiency}%` }}></div>
                      </div>
                      <div className="mt-1 text-[10px] text-slate-400">
                        {batch.filled.toLocaleString()} filled / {batch.wasted} waste
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(batch.status)}`}>
                        {batch.status === 'Passed' && <CheckCircle2 size={12} />}
                        {batch.status === 'Flagged' && <AlertTriangle size={12} />}
                        {batch.status === 'Testing' && <Beaker size={12} />}
                        {batch.status}
                      </span>
                      {batch.status === 'Flagged' && (
                         <div className="text-[10px] text-rose-600 font-bold mt-1 max-w-[100px] truncate">{batch.failureReason}</div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                       {isExpanded ? <ChevronUp size={18} className="text-indigo-600 inline"/> : <ChevronDown size={18} className="text-slate-400 inline"/>}
                    </td>
                  </tr>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <tr className="bg-indigo-50/30">
                      <td colSpan="5" className="px-6 pb-6 pt-0">
                        <div className="bg-white rounded-xl border border-indigo-100 p-4 shadow-sm mt-2 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2">
                          
                          {/* Section 1: Lab & Quality */}
                          <div>
                             <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                               <Beaker size={14} /> Lab Analysis
                             </h4>
                             <div className="space-y-2 text-sm">
                                <div className="flex justify-between border-b border-slate-50 pb-1">
                                  <span className="text-slate-600">pH Level</span>
                                  <span className="font-mono font-bold text-slate-800">{batch.labResults.pH}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-1">
                                  <span className="text-slate-600">TDS</span>
                                  <span className="font-mono font-bold text-slate-800">{batch.labResults.tds}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-1">
                                  <span className="text-slate-600">Ozone</span>
                                  <span className="font-mono font-bold text-slate-800">{batch.labResults.ozone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Bacteria</span>
                                  <span className={`font-bold ${batch.labResults.bacteria === 'None' ? 'text-emerald-600' : 'text-rose-600'}`}>{batch.labResults.bacteria}</span>
                                </div>
                             </div>
                          </div>

                          {/* Section 2: Inventory Usage */}
                          <div>
                             <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                               <Package size={14} /> Material Consumption
                             </h4>
                             <div className="space-y-2 text-sm bg-slate-50 p-3 rounded-lg">
                                {Object.entries(batch.materials).map(([key, val]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="capitalize text-slate-600">{key}</span>
                                    <span className="font-bold text-slate-800">{val}</span>
                                  </div>
                                ))}
                             </div>
                             <div className="mt-2 text-xs text-rose-600 font-medium flex items-center gap-1">
                               <AlertCircle size={12}/> Downtime: {batch.downtime}
                             </div>
                          </div>

                          {/* Section 3: Logistics & Timeline */}
                          <div>
                             <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                               <Truck size={14} /> Logistics Status
                             </h4>
                             
                             {/* Mini Timeline */}
                             <div className="relative pl-4 border-l-2 border-indigo-100 space-y-4 my-4">
                               <div className="relative">
                                 <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-indigo-200"></div>
                                 <p className="text-xs font-bold text-slate-800">Production Started</p>
                                 <p className="text-[10px] text-slate-500">{batch.timeline.start}</p>
                               </div>
                               <div className="relative">
                                 <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${batch.status === 'Passed' ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
                                 <p className="text-xs font-bold text-slate-800">QC Verified</p>
                                 <p className="text-[10px] text-slate-500">{batch.timeline.qc}</p>
                               </div>
                               <div className="relative">
                                  <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${batch.status === 'Passed' ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                                  <p className="text-xs font-bold text-slate-800">Ready for Distribution</p>
                                  <p className="text-[10px] text-slate-500">{batch.timeline.release}</p>
                               </div>
                             </div>

                             {batch.status === 'Passed' && (
                               <button className="w-full py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
                                 <FileSpreadsheet size={14} /> Generate Cert
                               </button>
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

      {/* 3. Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-white text-xs text-slate-500">
        <span>Showing {filteredBatches.length} of {batches.length} records</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Prev</button>
          <button className="px-3 py-1 bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 rounded">1</button>
          <button className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Next</button>
        </div>
      </div>

    </div>
  );
};

export default BatchHistory;
