import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  Bell, 
  ChevronRight, 
  Clock,
  CheckCircle2,
  X,
  Eye,
  MoreHorizontal,
  Server,
  ShoppingCart,
  Box,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const AlertsTable = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      message: 'Server latency spike detected (US-East)', 
      details: 'Latency exceeded 500ms threshold for 3 consecutive checks.',
      type: 'Critical', 
      source: 'IT Ops',
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 mins ago
      status: 'Open',
      assignee: 'Unassigned'
    },
    { 
      id: 2, 
      message: 'Stockout risk: SKU-8821 (Preforms)', 
      details: 'Current stock (1,200) is below safety threshold (1,500).',
      type: 'Warning', 
      source: 'Inventory',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
      status: 'Acknowledged',
      assignee: 'Sarah C.'
    },
    { 
      id: 3, 
      message: 'PO #881 approved by Finance', 
      details: 'Procurement order for Plastico Industries has been authorized.',
      type: 'Info', 
      source: 'Procurement',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      status: 'Resolved',
      assignee: 'System'
    },
    { 
      id: 4, 
      message: 'Quality check failed: Batch B-102', 
      details: 'Micro-cracks detected in random sampling.',
      type: 'Critical', 
      source: 'Quality',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
      status: 'Open',
      assignee: 'Mike R.'
    },
  ]);

  // Real-time Alert Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        message: 'New order received #SO-' + Math.floor(Math.random() * 1000),
        details: 'Automated order from Retail Partner A.',
        type: 'Info',
        source: 'Sales',
        timestamp: new Date().toISOString(),
        status: 'Open',
        assignee: 'System'
      };
      // Add to top, keep max 10
      setAlerts(prev => [newAlert, ...prev].slice(0, 10));
    }, 15000); // Add new alert every 15s
    return () => clearInterval(interval);
  }, []);

  // Filter Logic
  const filteredAlerts = alerts.filter(a => activeFilter === 'All' || a.type === activeFilter);

  // Helper: Time formatting
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); // minutes
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff/60)}h ago`;
    return date.toLocaleDateString();
  };

  // Helper: Style Config
  const getStyles = (type) => {
    switch (type) {
      case 'Critical': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', icon: <AlertCircle size={18} className="text-rose-600" />, indicator: 'bg-rose-500' };
      case 'Warning': return { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', icon: <AlertTriangle size={18} className="text-amber-600" />, indicator: 'bg-amber-500' };
      default: return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', icon: <Info size={18} className="text-blue-600" />, indicator: 'bg-blue-500' };
    }
  };

  const getSourceIcon = (source) => {
    switch(source) {
      case 'IT Ops': return <Server size={12}/>;
      case 'Inventory': return <Box size={12}/>;
      case 'Procurement': return <ShoppingCart size={12}/>;
      default: return <Bell size={12}/>;
    }
  };

  const handleAction = (id, action) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: action } : a));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden w-full">
      
      {/* 1. Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="text-slate-600" size={20} />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          </div>
          <h3 className="font-bold text-slate-700">Notifications</h3>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg">
           {['All', 'Critical', 'Warning', 'Info'].map(t => (
             <button
               key={t}
               onClick={() => setActiveFilter(t)}
               className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${activeFilter === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      {/* 2. Alert List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredAlerts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
             <CheckCircle2 size={32} className="mb-2 opacity-50"/>
             <p className="text-xs">All systems nominal</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const styles = getStyles(alert.type);
            const isExpanded = expandedId === alert.id;

            return (
              <div 
                key={alert.id} 
                className={`relative rounded-xl border transition-all duration-200 ${isExpanded ? 'bg-white shadow-md border-indigo-100' : 'bg-white border-slate-100 hover:border-slate-200'}`}
              >
                {/* Main Row */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : alert.id)}
                  className="p-3 flex items-start gap-3 cursor-pointer"
                >
                  <div className={`p-2 rounded-lg mt-0.5 ${styles.bg}`}>
                    {styles.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <h4 className={`text-sm font-semibold truncate ${alert.status === 'Resolved' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                         {alert.message}
                       </h4>
                       <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                         {formatTime(alert.timestamp)}
                       </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                       <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                          {getSourceIcon(alert.source)} {alert.source}
                       </span>
                       {alert.status !== 'Open' && (
                         <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                           <CheckCircle2 size={10}/> {alert.status}
                         </span>
                       )}
                    </div>
                  </div>

                  <div className="self-center">
                     {isExpanded ? <ChevronUp size={16} className="text-slate-300"/> : <ChevronDown size={16} className="text-slate-300"/>}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                   <div className="px-3 pb-3 pt-0 animate-in slide-in-from-top-1">
                      <div className="pl-11">
                         <p className="text-xs text-slate-600 mb-3 bg-slate-50 p-2 rounded border border-slate-100">
                           {alert.details}
                         </p>
                         
                         <div className="flex justify-between items-center">
                            <div className="text-[10px] text-slate-400">
                               Assignee: <span className="font-bold text-slate-600">{alert.assignee}</span>
                            </div>
                            <div className="flex gap-2">
                               {alert.status === 'Open' && (
                                 <>
                                  <button 
                                    onClick={() => handleAction(alert.id, 'Acknowledged')}
                                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-bold transition-colors"
                                  >
                                    Acknowledge
                                  </button>
                                  <button 
                                    onClick={() => handleAction(alert.id, 'Resolved')}
                                    className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded text-[10px] font-bold transition-colors flex items-center gap-1"
                                  >
                                    <CheckCircle2 size={10}/> Resolve
                                  </button>
                                 </>
                               )}
                               <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                                  <MoreHorizontal size={14}/>
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 3. Footer Stats */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-[10px] text-slate-400">
         <span>Last 24h: <span className="font-bold text-slate-600">42 Alerts</span></span>
         <button className="text-indigo-600 font-bold hover:underline">View History</button>
      </div>

    </div>
  );
};

export default AlertsTable;
