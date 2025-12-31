import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  User, 
  MoreVertical,
  AlertCircle,
  Filter,
  FileText,
  MapPin,
  ChevronRight,
  PlusCircle,
  Timer
} from 'lucide-react';

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Enterprise Data Model
  const [tasks, setTasks] = useState([
    { 
      id: "MNT-2025-001", 
      machine: 'Line A - Bottling Unit',
      location: 'Zone 1 - Filling',
      task: 'Hydraulic Motor Check', 
      desc: 'Inspect oil levels and check for seal leaks.',
      date: 'Today', 
      dueTime: '14:00',
      duration: '45m',
      priority: 'High', 
      assignee: 'Tom C.',
      assigneeRole: 'Senior Tech',
      status: 'pending',
      overdue: false
    },
    { 
      id: "MNT-2025-002", 
      machine: 'Line C - Sensors', 
      location: 'Zone 3 - Packaging',
      task: 'Calibration & Alignment', 
      desc: 'Re-calibrate optical sensors.',
      date: 'Tomorrow', 
      dueTime: '09:00',
      duration: '1h 30m',
      priority: 'Medium', 
      assignee: 'Sarah J.',
      assigneeRole: 'Specialist',
      status: 'pending',
      overdue: false
    },
    { 
      id: "MNT-2025-003", 
      machine: 'Pump Station B', 
      location: 'Zone 4 - Utility',
      task: 'Filter Replacement', 
      desc: 'Replace sediment filters on intake.',
      date: 'Yesterday', 
      dueTime: '16:00',
      duration: '20m',
      priority: 'Critical', 
      assignee: 'Mike R.',
      assigneeRole: 'Junior Tech',
      status: 'pending',
      overdue: true
    },
    { 
      id: "MNT-2025-004", 
      machine: 'Line B - Conveyor', 
      location: 'Zone 2 - Washing',
      task: 'Lubrication Chain 4', 
      desc: 'Apply food-grade grease.',
      date: 'Dec 28', 
      dueTime: '10:00',
      duration: '30m',
      priority: 'Low', 
      assignee: 'Mike R.',
      assigneeRole: 'Junior Tech',
      status: 'completed',
      overdue: false
    },
    { 
      id: "MNT-2025-005", 
      machine: 'RO Unit 2', 
      location: 'Zone 1 - Filtration',
      task: 'Membrane Cleaning', 
      desc: 'CIP Cycle for RO membranes.',
      date: 'Dec 29', 
      dueTime: '08:00',
      duration: '2h',
      priority: 'Medium', 
      assignee: 'Alex D.',
      assigneeRole: 'Senior Tech',
      status: 'pending',
      overdue: false
    },
  ]);

  const toggleStatus = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
    ));
  };

  const filteredTasks = tasks.filter(t => t.status === activeTab);

  const getPriorityStyle = (p) => {
    if (p === 'Critical') return 'bg-rose-100 text-rose-700 border-rose-200 animate-pulse';
    if (p === 'High') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (p === 'Medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden w-full">
      
      {/* 1. Header (Fixed Height) */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex-none">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Wrench className="text-amber-600" size={20} /> Maintenance
            </h3>
            <p className="text-xs text-slate-500 mt-1">Work orders queue.</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold hover:bg-indigo-700 shadow-sm">
             <PlusCircle size={14} /> New
          </button>
        </div>

        <div className="flex p-1 bg-slate-200/50 rounded-lg">
          {['pending', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-[10px] font-bold capitalize rounded-md transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab} ({tasks.filter(t => t.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* 2. Scrollable Task List (Scrollbar Hidden) */}
      {/* 
          - flex-1: Fills remaining height 
          - overflow-y-auto: Enables scrolling
          - [&::-webkit-scrollbar]:hidden: Hides scrollbar on Chrome/Safari
          - [-ms-overflow-style:'none']: Hides scrollbar on IE/Edge
          - [scrollbar-width:'none']: Hides scrollbar on Firefox
      */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-400 flex flex-col items-center">
            <CheckCircle2 size={40} className="mb-2 opacity-20" />
            <p className="text-xs">No {activeTab} tasks.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`
                group relative bg-white rounded-xl border transition-all duration-300 hover:shadow-md
                ${task.overdue && task.status === 'pending' ? 'border-rose-300 ring-1 ring-rose-100' : 'border-slate-200 hover:border-amber-300'}
              `}
            >
              <div className="p-3">
                {/* Top Row */}
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${getPriorityStyle(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] font-bold text-slate-700 truncate max-w-[120px]">
                        {task.machine}
                      </span>
                   </div>
                   <button className="text-slate-300 hover:text-indigo-600">
                      <MoreVertical size={14} />
                   </button>
                </div>

                {/* Content */}
                <div className="flex gap-3">
                   <button 
                      onClick={() => toggleStatus(task.id)}
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${task.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent hover:border-emerald-400'}`}
                   >
                      <CheckCircle2 size={12} />
                   </button>

                   <div className="flex-1 min-w-0">
                      <h4 className={`text-xs font-bold mb-0.5 truncate ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {task.task}
                      </h4>
                      <p className="text-[10px] text-slate-500 mb-2 truncate">{task.desc}</p>
                      
                      {/* Meta Tags */}
                      <div className="flex flex-wrap gap-2 text-[9px] text-slate-500 font-medium bg-slate-50 p-1.5 rounded border border-slate-100">
                         <div className="flex items-center gap-1">
                            <Clock size={10} className="text-indigo-400"/>
                            <span>{task.date}, {task.dueTime}</span>
                         </div>
                         <div className="flex items-center gap-1">
                            <User size={10} className="text-indigo-400"/>
                            <span>{task.assignee}</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
};

export default Maintenance;
