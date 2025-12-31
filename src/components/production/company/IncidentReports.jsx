import React, { useState } from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Droplets, 
  ArrowRight, 
  ShieldAlert,
  Search,
  Filter,
  MoreHorizontal,
  X,
  CheckCircle,
  User,
  Clock,
  FileText,
  Activity,
  Wrench,
  Send
} from 'lucide-react';

const IncidentReports = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('All');
  
  // Enterprise Data Model
  const [incidents, setIncidents] = useState([
    { 
      id: 'INC-2025-089', 
      batch: 'B-2025-002', 
      type: 'Contamination', 
      title: 'High pH levels detected in sample B2',
      desc: 'Routine pH testing showed spike to 8.5. Production halted immediately. Lab analysis requested.',
      severity: 'High', 
      status: 'Open', // Open, In Progress, Resolved
      date: 'Dec 28, 10:45 AM',
      location: 'Tank 4 (Mixing)',
      assignee: 'Dr. A. Gupta (QA)',
      impact: 'Batch B-2025-002 Quarantined',
      activityLog: [
        { user: 'System', action: 'Alert triggered by pH Sensor 4', time: '10:44 AM' },
        { user: 'Operator', action: 'Production Halted', time: '10:45 AM' },
      ]
    },
    { 
      id: 'INC-2025-088', 
      batch: 'B-2025-004', 
      type: 'Leakage', 
      title: 'Minor seal breach in valve #4',
      desc: 'Slow drip observed during pressure test. Maintenance notified for shift end repair.',
      severity: 'Medium', 
      status: 'In Progress',
      date: 'Dec 27, 03:20 PM',
      location: 'Line A (Filling)',
      assignee: 'Maint. Team B',
      impact: 'Throughput reduced by 5%',
      activityLog: [
        { user: 'Supervisor', action: 'Maintenance Ticket #442 Created', time: '03:30 PM' }
      ]
    },
    { 
      id: 'INC-2025-087', 
      batch: 'B-2025-005', 
      type: 'Process Alert', 
      title: 'Pump B output fluctuation',
      desc: 'Flow rate varied by +/- 10% for 5 mins. Stabilized automatically.',
      severity: 'Low', 
      status: 'Resolved',
      date: 'Dec 27, 09:10 AM',
      location: 'Pump Station',
      assignee: 'System Auto-Heal',
      impact: 'None',
      activityLog: [
        { user: 'System', action: 'Auto-calibration executed', time: '09:12 AM' },
        { user: 'Manager', action: 'Marked as Resolved', time: '09:30 AM' }
      ]
    },
  ]);

  // Styles Helper
  const getSeverityStyles = (level) => {
    switch (level) {
      case 'High':
        return { bg: 'bg-rose-50', border: 'border-rose-100', iconColor: 'text-rose-600', badge: 'bg-rose-500 text-white', icon: AlertOctagon };
      case 'Medium':
        return { bg: 'bg-amber-50', border: 'border-amber-100', iconColor: 'text-amber-600', badge: 'bg-amber-500 text-white', icon: AlertTriangle };
      default:
        return { bg: 'bg-slate-50', border: 'border-slate-200', iconColor: 'text-slate-500', badge: 'bg-slate-500 text-white', icon: Droplets };
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Resolved': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-slate-600';
    }
  };

  // Filter Logic
  const filteredIncidents = incidents.filter(i => filterSeverity === 'All' || i.severity === filterSeverity);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden">
      
      {/* 1. Dashboard Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="text-rose-600" /> Safety & Incidents
            </h3>
            <p className="text-sm text-slate-500 mt-1">Real-time issue tracking and resolution workflow.</p>
          </div>
          <div className="flex gap-2">
             <div className="px-4 py-2 bg-rose-100 rounded-lg border border-rose-200 text-center">
                <p className="text-[10px] font-bold text-rose-600 uppercase">Critical</p>
                <p className="text-xl font-bold text-rose-800">{incidents.filter(i => i.severity === 'High' && i.status !== 'Resolved').length}</p>
             </div>
             <div className="px-4 py-2 bg-blue-100 rounded-lg border border-blue-200 text-center">
                <p className="text-[10px] font-bold text-blue-600 uppercase">Active</p>
                <p className="text-xl font-bold text-blue-800">{incidents.filter(i => i.status !== 'Resolved').length}</p>
             </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
             <input 
               type="text" 
               placeholder="Search logs..." 
               className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" 
             />
          </div>
          <select 
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none"
            onChange={(e) => setFilterSeverity(e.target.value)}
          >
            <option value="All">All Severity</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 shadow-sm">
            Report New
          </button>
        </div>
      </div>

      {/* 2. Incident List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredIncidents.map((item) => {
          const style = getSeverityStyles(item.severity);
          const Icon = style.icon;

          return (
            <div 
              key={item.id} 
              onClick={() => setSelectedIncident(item)}
              className={`
                group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer
                ${selectedIncident?.id === item.id ? 'ring-2 ring-indigo-500 bg-indigo-50/20 border-indigo-200' : `${style.bg} ${style.border} hover:shadow-md`}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-2 rounded-lg bg-white/60 ${style.iconColor}`}>
                    <Icon size={20} className={item.severity === 'High' ? 'animate-pulse' : ''} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${style.badge}`}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{item.id} • {item.batch}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${getStatusColor(item.status)}`}>
                  {item.status}
                </div>
              </div>
              
              <p className="text-xs text-slate-600 line-clamp-1 pl-12 mb-2">{item.desc}</p>
              
              <div className="flex items-center gap-4 pl-12 text-[10px] text-slate-500 font-medium">
                 <span className="flex items-center gap-1"><User size={12}/> {item.assignee}</span>
                 <span className="flex items-center gap-1"><Clock size={12}/> {item.date}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Slide-Over Detail Panel */}
      {selectedIncident && (
        <div className="absolute inset-y-0 right-0 w-full sm:w-[400px] bg-white border-l border-slate-200 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Panel Header */}
          <div className={`p-6 border-b border-slate-100 ${getSeverityStyles(selectedIncident.severity).bg}`}>
             <div className="flex justify-between items-start mb-4">
               <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${getStatusColor(selectedIncident.status)}`}>
                 {selectedIncident.status}
               </span>
               <button onClick={() => setSelectedIncident(null)} className="text-slate-400 hover:text-slate-700">
                 <X size={20} />
               </button>
             </div>
             <h2 className="text-lg font-bold text-slate-900 leading-tight">{selectedIncident.title}</h2>
             <div className="flex items-center gap-2 mt-2 text-xs font-mono text-slate-500">
                <span>{selectedIncident.id}</span>
                <span>•</span>
                <span>{selectedIncident.location}</span>
             </div>
          </div>

          {/* Panel Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
             
             {/* Description */}
             <div>
               <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                 <FileText size={14}/> Incident Details
               </h4>
               <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                 {selectedIncident.desc}
               </p>
             </div>

             {/* Impact */}
             <div>
               <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                 <Activity size={14}/> Operational Impact
               </h4>
               <div className="text-sm font-bold text-rose-700 bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-start gap-2">
                 <AlertTriangle size={16} className="mt-0.5 shrink-0"/>
                 {selectedIncident.impact}
               </div>
             </div>

             {/* Activity Log */}
             <div>
               <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                 <Clock size={14}/> Resolution Log
               </h4>
               <div className="space-y-4 pl-2 border-l-2 border-slate-100">
                 {selectedIncident.activityLog.map((log, idx) => (
                   <div key={idx} className="relative pl-4">
                     <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-400 ring-2 ring-white"></div>
                     <p className="text-xs font-bold text-slate-700">{log.action}</p>
                     <p className="text-[10px] text-slate-400">{log.user} • {log.time}</p>
                   </div>
                 ))}
               </div>
             </div>

          </div>

          {/* Panel Footer (Actions) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50">
             {selectedIncident.status !== 'Resolved' ? (
               <div className="grid grid-cols-2 gap-3">
                 <button className="py-2.5 rounded-lg bg-white border border-slate-300 text-slate-600 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50">
                   <Wrench size={14}/> Assign Maint.
                 </button>
                 <button className="py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                   <CheckCircle size={14}/> Mark Resolved
                 </button>
               </div>
             ) : (
                <div className="text-center p-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                   <CheckCircle size={14} className="inline mr-2"/> Incident Resolved & Verified
                </div>
             )}
          </div>

        </div>
      )}

    </div>
  );
};

export default IncidentReports;
