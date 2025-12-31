import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Settings, 
  PlayCircle, 
  StopCircle, 
  Wrench, 
  Zap, 
  Clock, 
  MoreVertical,
  AlertTriangle,
  User,
  Package,
  RefreshCw,
  BarChart3
} from 'lucide-react';

const LiveLineStatus = () => {
  const [loading, setLoading] = useState(true);
  
  // Real-time Simulation State
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [lines, setLines] = useState([
    { 
      id: 1, 
      name: 'Line A', 
      type: 'Bottling Unit', 
      status: 'Running', 
      uptime: 98, 
      speed: 1250, 
      targetSpeed: 1200,
      currentBatch: 'B-2025-001',
      operator: 'T. Cook',
      alerts: []
    },
    { 
      id: 2, 
      name: 'Line B', 
      type: 'Washing Unit', 
      status: 'Stopped', 
      uptime: 45, 
      speed: 0, 
      targetSpeed: 800,
      currentBatch: 'N/A',
      operator: 'Unassigned',
      alerts: [{ type: 'Critical', msg: 'Water Pressure Low' }]
    },
    { 
      id: 3, 
      name: 'Line C', 
      type: 'Filling Unit', 
      status: 'Maintenance', 
      uptime: 72, 
      speed: 0, 
      targetSpeed: 1000,
      currentBatch: 'B-2025-003',
      operator: 'Maint. Team',
      alerts: []
    },
  ]);

  // Simulate WebSocket / IoT Data Stream
  useEffect(() => {
    // Initial Load Simulation
    setTimeout(() => setLoading(false), 1000);

    // Live Data Pulse (Every 3 seconds)
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setLines(prevLines => prevLines.map(line => {
        if (line.status === 'Running') {
          // Fluctuate speed slightly to look real
          const variance = Math.floor(Math.random() * 50) - 25;
          return { ...line, speed: line.targetSpeed + variance };
        }
        return line;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setLines(lines.map(line => 
      line.id === id 
        ? { ...line, status: newStatus, speed: newStatus === 'Running' ? line.targetSpeed : 0 } 
        : line
    ));
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Running':
        return {
          color: 'emerald',
          icon: <Settings className="w-5 h-5 text-emerald-600 animate-spin-slow" />,
          badge: 'bg-emerald-500 text-white',
          border: 'border-emerald-200',
          bg: 'bg-emerald-50'
        };
      case 'Stopped':
        return {
          color: 'rose',
          icon: <StopCircle className="w-5 h-5 text-rose-600" />,
          badge: 'bg-rose-500 text-white',
          border: 'border-rose-200',
          bg: 'bg-rose-50'
        };
      case 'Maintenance':
        return {
          color: 'amber',
          icon: <Wrench className="w-5 h-5 text-amber-600" />,
          badge: 'bg-amber-500 text-white',
          border: 'border-amber-200',
          bg: 'bg-amber-50'
        };
      default:
        return { color: 'slate', icon: null, badge: '', border: '', bg: '' };
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse h-full">
        <div className="h-6 w-32 bg-slate-200 rounded mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
             <Activity className="text-indigo-600" /> Production Lines
           </h3>
           <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
             Live Data Stream • Updated: {lastUpdate.toLocaleTimeString()}
           </p>
        </div>
        <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors">
           <RefreshCw size={18} />
        </button>
      </div>

      {/* Lines Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {lines.map((line) => {
          const config = getStatusConfig(line.status);
          const isRunning = line.status === 'Running';
          const hasAlert = line.alerts.length > 0;

          return (
            <div 
              key={line.id} 
              className={`
                group relative bg-white rounded-xl border transition-all duration-300 overflow-hidden
                ${isRunning ? 'border-slate-200 shadow-sm' : 'border-slate-200 opacity-90'}
                ${hasAlert ? 'ring-2 ring-rose-400 border-rose-200' : ''}
              `}
            >
              {/* Status Stripe */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-${config.color}-500`}></div>

              <div className="p-5 flex flex-col md:flex-row gap-6 items-start md:items-center">
                
                {/* 1. Identity */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className={`p-3 rounded-xl ${config.bg} border ${config.border} shadow-sm`}>
                    {config.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">{line.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{line.type}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config.badge}`}>
                      {line.status}
                    </span>
                  </div>
                </div>

                {/* 2. Key Metrics (Speed & Uptime) */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                   
                   {/* Speed */}
                   <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex justify-center items-center gap-1">
                        <Zap size={10} /> Speed (UPH)
                      </div>
                      <div className={`text-lg font-bold ${isRunning ? 'text-slate-800' : 'text-slate-400'}`}>
                        {line.speed.toLocaleString()}
                      </div>
                      <div className="text-[9px] text-slate-400">Target: {line.targetSpeed}</div>
                   </div>

                   {/* Efficiency */}
                   <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex justify-center items-center gap-1">
                        <BarChart3 size={10} /> OEE
                      </div>
                      <div className={`text-lg font-bold ${line.uptime > 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {line.uptime}%
                      </div>
                      <div className="text-[9px] text-slate-400">Efficiency</div>
                   </div>

                   {/* Batch Context */}
                   <div className="col-span-2 sm:col-span-2 flex flex-col justify-center gap-1 pl-4 border-l border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                         <Package size={14} className="text-indigo-400"/>
                         <span className="font-bold">Batch:</span> {line.currentBatch}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                         <User size={14} className="text-indigo-400"/>
                         <span className="font-bold">Operator:</span> {line.operator}
                      </div>
                   </div>
                </div>

                {/* 3. Actions */}
                <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                  {line.status !== 'Running' && (
                    <button 
                      onClick={() => handleStatusChange(line.id, 'Running')}
                      className="flex-1 md:flex-none px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 border border-emerald-100"
                    >
                      <PlayCircle size={16} /> Start
                    </button>
                  )}
                  {line.status === 'Running' && (
                    <button 
                      onClick={() => handleStatusChange(line.id, 'Stopped')}
                      className="flex-1 md:flex-none px-4 py-2 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 border border-rose-100"
                    >
                      <StopCircle size={16} /> Stop
                    </button>
                  )}
                  <button className="px-3 py-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-lg border border-slate-100 transition-colors">
                     <Settings size={16} />
                  </button>
                </div>
              </div>

              {/* Alert Banner */}
              {hasAlert && (
                <div className="bg-rose-50 px-5 py-2 flex items-center gap-2 text-xs font-bold text-rose-700 border-t border-rose-100 animate-pulse">
                  <AlertTriangle size={14} />
                  {line.alerts[0].msg}
                  <button className="ml-auto underline hover:text-rose-900">View Details</button>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveLineStatus;
