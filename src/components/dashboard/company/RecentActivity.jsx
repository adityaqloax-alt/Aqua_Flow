import React, { useState } from 'react';
import { 
  Package, 
  Bell, 
  UserPlus, 
  RefreshCw, 
  Activity, 
  ChevronRight, 
  Clock,
  Filter,
  Eye,
  Check,
  ShieldAlert
} from 'lucide-react';

const RecentActivity = () => {
  const [filterType, setFilterType] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  // Enterprise Data Model
  const activities = [
    { 
      id: 1,
      group: 'Today',
      title: 'New Order #4592', 
      desc: 'Order value: $1,250.00 - Retail Partner A',
      time: '10:42 AM', 
      type: 'Orders', 
      user: 'System',
      isUnread: true,
      theme: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', icon: Package }
    },
    { 
      id: 2,
      group: 'Today',
      title: 'Stock Alert: 20L Jars', 
      desc: 'Inventory dipped below 15% threshold at Warehouse B.',
      time: '09:15 AM', 
      type: 'Alerts', 
      user: 'Inv. Bot',
      isUnread: false,
      theme: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', icon: ShieldAlert }
    },
    { 
      id: 3,
      group: 'Yesterday',
      title: 'New User Onboarded', 
      desc: 'Sarah Smith added as Shift Supervisor.',
      time: '04:30 PM', 
      type: 'System', 
      user: 'Admin',
      isUnread: false,
      theme: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: UserPlus }
    },
    { 
      id: 4,
      group: 'Yesterday',
      title: 'Database Backup', 
      desc: 'Daily snapshot completed successfully (4.2GB).',
      time: '02:00 AM', 
      type: 'System', 
      user: 'Auto',
      isUnread: false,
      theme: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', icon: RefreshCw }
    },
  ];

  // Grouping Logic
  const filteredActivities = activities.filter(a => filterType === 'All' || a.type === filterType);
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const group = activity.group;
    if (!groups[group]) groups[group] = [];
    groups[group].push(activity);
    return groups;
  }, {});

  return (
    <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      
      {/* 1. Header & Filters */}
      <div className="p-5 border-b border-slate-100 bg-white relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Activity className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Audit Log</h3>
                <p className="text-xs text-slate-400 font-medium">Recent system events</p>
              </div>
           </div>
           <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live
           </span>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
           {['All', 'Orders', 'Alerts', 'System'].map(f => (
             <button
               key={f}
               onClick={() => setFilterType(f)}
               className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${filterType === f ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      {/* 2. Timeline List */}
      <div className="flex-1 p-5 relative overflow-y-auto">
        {/* The Vertical Timeline Line */}
        <div className="absolute left-9 top-6 bottom-6 w-px bg-slate-200"></div>

        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([group, items]) => (
             <div key={group}>
                {/* Group Label */}
                <div className="relative pl-12 mb-4">
                   <span className="absolute left-0 top-1/2 -translate-y-1/2 -ml-[3px] w-2 h-2 rounded-full bg-slate-300 ring-4 ring-white"></span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded">{group}</span>
                </div>

                {/* Items */}
                <div className="space-y-4">
                   {items.map((item) => {
                     const Icon = item.theme.icon;
                     const isHovered = hoveredId === item.id;

                     return (
                       <div 
                         key={item.id} 
                         onMouseEnter={() => setHoveredId(item.id)}
                         onMouseLeave={() => setHoveredId(null)}
                         className="group relative flex gap-4 cursor-pointer"
                       >
                         {/* Timeline Node (Icon) */}
                         <div className={`
                           relative z-10 flex-shrink-0 w-8 h-8 rounded-xl 
                           flex items-center justify-center border-2 border-white shadow-sm
                           transition-all duration-300 group-hover:scale-110
                           ${item.theme.bg} ${item.theme.text} ${item.theme.border}
                         `}>
                           <Icon size={14} strokeWidth={2.5} />
                           {item.isUnread && (
                             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 border-2 border-white rounded-full"></span>
                           )}
                         </div>

                         {/* Content Card */}
                         <div className={`
                           flex-1 flex justify-between items-start p-3 -mt-1 rounded-xl border border-transparent
                           transition-all duration-200
                           ${isHovered ? 'bg-slate-50 border-slate-100' : ''}
                         `}>
                           <div className="min-w-0 pr-4">
                             <div className="flex items-center gap-2">
                                <h4 className={`text-xs font-bold truncate ${item.isUnread ? 'text-slate-800' : 'text-slate-600'}`}>
                                  {item.title}
                                </h4>
                                <span className="text-[9px] text-slate-400 bg-slate-100 px-1.5 rounded">{item.user}</span>
                             </div>
                             <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                               {item.desc}
                             </p>
                             <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                               <Clock size={10} />
                               {item.time}
                             </div>
                           </div>

                           {/* Hover Actions */}
                           <div className={`
                              flex flex-col gap-1 transition-opacity duration-200
                              ${isHovered ? 'opacity-100' : 'opacity-0'}
                           `}>
                              <button className="p-1.5 bg-white border border-slate-200 rounded text-slate-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm" title="View Details">
                                 <Eye size={12}/>
                              </button>
                              <button className="p-1.5 bg-white border border-slate-200 rounded text-slate-400 hover:text-emerald-600 hover:border-emerald-200 shadow-sm" title="Mark Read">
                                 <Check size={12}/>
                              </button>
                           </div>
                         </div>
                       </div>
                     );
                   })}
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* 3. Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider flex items-center justify-center gap-1">
          View Full Log <ChevronRight size={12}/>
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
