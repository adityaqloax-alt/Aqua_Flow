import React, { useState } from 'react';
import { 
  FlaskConical, 
  Check, 
  MoreHorizontal, 
  Microscope,
  Droplet,
  Search,
  Filter,
  AlertTriangle,
  FileText,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';

const LabResults = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  // Enterprise Data Model
  const results = [
    { 
      id: "LAB-2025-891", 
      sample: 'Sample #J-101', 
      batch: 'B-2025-001',
      source: 'Line A - 20L Jar',
      metrics: {
        ph: { val: 7.2, status: 'ok', min: 6.5, max: 8.5 }, 
        tds: { val: 120, status: 'ok', min: 50, max: 150 }, 
        chlorine: { val: 0.2, status: 'ok', min: 0.1, max: 0.5 },
        ozone: { val: 0.3, status: 'ok', min: 0.2, max: 0.4 }
      },
      status: 'Approved', // Approved, Review, Flagged, Testing
      technician: 'S. Rao',
      time: '10:30 AM',
      notes: 'All parameters within ISO 10500 limits.'
    },
    { 
      id: "LAB-2025-892", 
      sample: 'Sample #B-202', 
      batch: 'B-2025-002',
      source: 'Line B - 1L Bottle',
      metrics: {
        ph: { val: 6.2, status: 'low', min: 6.5, max: 8.5 }, 
        tds: { val: 45, status: 'low', min: 50, max: 150 }, 
        chlorine: { val: 0.05, status: 'low', min: 0.1, max: 0.5 },
        ozone: { val: 0.1, status: 'low', min: 0.2, max: 0.4 }
      },
      status: 'Flagged',
      technician: 'A. Khan',
      time: '11:15 AM',
      notes: 'Critical low pH. Re-dosing required. Batch halted.'
    },
    { 
      id: "LAB-2025-893", 
      sample: 'Sample #J-103', 
      batch: 'B-2025-003',
      source: 'Line A - 20L Jar',
      metrics: {
        ph: { val: 7.8, status: 'ok', min: 6.5, max: 8.5 }, 
        tds: { val: 145, status: 'warning', min: 50, max: 150 }, 
        chlorine: { val: 0.45, status: 'warning', min: 0.1, max: 0.5 },
        ozone: { val: 0.35, status: 'ok', min: 0.2, max: 0.4 }
      },
      status: 'Review',
      technician: 'Pending',
      time: '01:45 PM',
      notes: 'TDS approaching upper limit. Monitor closely.'
    },
  ];

  // Helper to determine color based on status
  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Flagged': return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'Review': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const getMetricColor = (status) => {
    if (status === 'ok') return 'bg-emerald-500';
    if (status === 'warning') return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredResults = results.filter(r => filterStatus === 'All' || r.status === filterStatus);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      
      {/* 1. Dashboard Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Microscope className="text-cyan-600" /> Quality Lab
            </h3>
            <p className="text-sm text-slate-500 mt-1">Chemical analysis and batch release certification.</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 hover:text-cyan-600 transition-colors shadow-sm">
            <Download size={14} /> Export Report
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
             <input 
               type="text" 
               placeholder="Search Sample ID, Batch..." 
               className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500/20" 
             />
          </div>
          <select 
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Flagged">Flagged</option>
            <option value="Review">In Review</option>
          </select>
        </div>
      </div>

      {/* 2. Results List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredResults.map((r) => {
          const isExpanded = expandedId === r.id;
          
          return (
            <div 
              key={r.id} 
              className={`rounded-xl border transition-all duration-300 ${isExpanded ? 'border-cyan-300 ring-1 ring-cyan-100 shadow-lg bg-white' : 'border-slate-200 bg-white hover:border-cyan-200 hover:shadow-md'}`}
            >
              {/* Row Header */}
              <div 
                onClick={() => toggleExpand(r.id)}
                className="p-4 flex justify-between items-start cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${getStatusColor(r.status)}`}>
                    <FlaskConical size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      {r.sample}
                      <span className="text-xs font-normal text-slate-400 font-mono">({r.batch})</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{r.source}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(r.status)}`}>
                    {r.status}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock size={10}/> {r.time}
                  </p>
                </div>
              </div>

              {/* Quick Metrics (Always Visible - Simplified) */}
              {!isExpanded && (
                <div className="px-4 pb-4 grid grid-cols-4 gap-2">
                   {Object.entries(r.metrics).map(([key, data]) => (
                     <div key={key} className="text-center p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{key}</p>
                        <p className={`text-xs font-bold ${data.status === 'ok' ? 'text-slate-700' : 'text-rose-600'}`}>{data.val}</p>
                     </div>
                   ))}
                </div>
              )}

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2">
                  <div className="border-t border-slate-100 pt-4 mb-4">
                    <h5 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                      <Activity size={14}/> Detailed Analysis
                    </h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(r.metrics).map(([key, data]) => (
                        <div key={key} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                           <div className="flex justify-between items-end mb-2">
                             <span className="text-xs font-bold text-slate-600 uppercase">{key}</span>
                             <span className="text-sm font-bold text-slate-800">{data.val}</span>
                           </div>
                           {/* Gauge Bar */}
                           <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                              {/* Safe Zone Markers (Visual Only) */}
                              <div className="absolute left-[20%] right-[20%] h-full bg-slate-300/30"></div>
                              {/* Value Indicator */}
                              <div 
                                className={`absolute h-full rounded-full ${getMetricColor(data.status)}`}
                                style={{ width: `${(data.val / (data.max * 1.5)) * 100}%` }} // Simplified visual logic
                              ></div>
                           </div>
                           <div className="flex justify-between mt-1 text-[9px] text-slate-400 font-mono">
                              <span>Min: {data.min}</span>
                              <span>Max: {data.max}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                     <h5 className="text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><FileText size={12}/> Technician Notes</h5>
                     <p className="text-xs text-slate-700 italic">"{r.notes}"</p>
                     <p className="text-[10px] text-slate-400 mt-2 text-right">— Tested by {r.technician}</p>
                  </div>

                  {r.status === 'Review' && (
                    <div className="flex gap-3">
                      <button className="flex-1 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-100">
                        <XCircle size={14}/> Reject Batch
                      </button>
                      <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-md shadow-emerald-200">
                        <CheckCircle size={14}/> Approve & Release
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default LabResults;
