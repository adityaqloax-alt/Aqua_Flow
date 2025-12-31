import React, { useState } from 'react';
import { 
  Plus, 
  RefreshCcw, 
  Send, 
  Zap, 
  ChevronRight, 
  FileText, 
  Box, 
  UserCog, 
  Truck, 
  AlertTriangle,
  History,
  Command
} from 'lucide-react';

const QuickActions = () => {
  const [activeRole, setActiveRole] = useState('Manager'); // Manager, Operator, Admin
  const [recentActions, setRecentActions] = useState([
    { label: 'Exported Q4 Report', time: '2h ago' },
    { label: 'Created PO #8821', time: '4h ago' },
  ]);

  // Actions Config based on Role
  const roleActions = {
    Manager: [
      { id: 1, label: 'New Order', desc: 'Create shipment', icon: Plus, color: 'indigo', hotkey: 'N' },
      { id: 2, label: 'Export Report', desc: 'Download PDF', icon: Send, color: 'violet', hotkey: 'E' },
      { id: 3, label: 'Approve POs', desc: '3 Pending', icon: FileText, color: 'emerald', hotkey: 'A' },
    ],
    Operator: [
      { id: 4, label: 'Log Incident', desc: 'Report issue', icon: AlertTriangle, color: 'rose', hotkey: 'I' },
      { id: 5, label: 'Scan Batch', desc: 'Update inventory', icon: Box, color: 'blue', hotkey: 'S' },
      { id: 6, label: 'Maintenance', desc: 'Log check', icon: RefreshCcw, color: 'amber', hotkey: 'M' },
    ],
    Admin: [
      { id: 7, label: 'User Access', desc: 'Manage roles', icon: UserCog, color: 'slate', hotkey: 'U' },
      { id: 8, label: 'System Sync', desc: 'Force update', icon: RefreshCcw, color: 'cyan', hotkey: 'R' },
      { id: 9, label: 'Audit Logs', desc: 'View history', icon: History, color: 'orange', hotkey: 'L' },
    ]
  };

  const currentActions = roleActions[activeRole];

  return (
    <div className="h-full bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 rounded-xl rotate-3 shadow-sm shadow-amber-100">
            <Zap className="w-5 h-5 text-amber-600 fill-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Quick Actions</h3>
            <p className="text-xs text-slate-400 font-medium">Shortcuts</p>
          </div>
        </div>
        
        {/* Role Toggle (Simulation) */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
           {['Manager', 'Operator', 'Admin'].map(role => (
             <button
               key={role}
               onClick={() => setActiveRole(role)}
               className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${activeRole === role ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {role.charAt(0)}
             </button>
           ))}
        </div>
      </div>

      {/* Actions Grid */}
      <div className="flex flex-col gap-3 relative z-10 flex-1">
        {currentActions.map((action) => {
          const Icon = action.icon;
          
          return (
            <button
              key={action.id}
              className={`
                group relative w-full flex items-center justify-between p-3 rounded-xl
                border border-slate-100 bg-white
                hover:border-${action.color}-200 hover:bg-${action.color}-50/30
                transition-all duration-200 ease-out
                hover:shadow-md hover:shadow-slate-100 hover:-translate-y-0.5
              `}
            >
              <div className="flex items-center gap-3">
                {/* Icon Box */}
                <div className={`
                  p-2.5 rounded-lg bg-${action.color}-50 text-${action.color}-600
                  transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                `}>
                  <Icon size={18} strokeWidth={2.5} className={action.id === 8 ? 'group-hover:animate-spin' : ''} />
                </div>

                {/* Text Content */}
                <div className="text-left">
                  <span className="block text-sm font-bold text-slate-700 group-hover:text-slate-900">
                    {action.label}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium group-hover:text-slate-500">
                    {action.desc}
                  </span>
                </div>
              </div>

              {/* Hotkey Hint */}
              <div className="hidden xl:flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-400 group-hover:border-${action.color}-200 group-hover:text-${action.color}-500">
                 <Command size={10}/> {action.hotkey}
              </div>

              {/* Mobile Arrow */}
              <ChevronRight className="xl:hidden w-4 h-4 text-slate-300 group-hover:text-slate-500" />
            </button>
          );
        })}
      </div>

      {/* Footer: Recent History */}
      <div className="mt-6 pt-4 border-t border-slate-50">
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Activity</p>
         <div className="space-y-2">
            {recentActions.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs text-slate-500">
                 <span className="truncate">{item.label}</span>
                 <span className="text-[10px] text-slate-300">{item.time}</span>
              </div>
            ))}
         </div>
      </div>
      
    </div>
  );
};

export default QuickActions;
