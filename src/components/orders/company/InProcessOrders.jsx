import React, { useState } from 'react';
import { 
  Truck, Package, MapPin, ChevronRight, Box, CheckCircle, 
  Clock, AlertCircle, X, ArrowRight, ClipboardList, CheckSquare,
  MoreHorizontal, PlayCircle, Layers
} from 'lucide-react';

const InProcessOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Enhanced Mock Data
  const [activeOrders, setActiveOrders] = useState([
    { 
      id: "ORD-2025-001", customer: "Grand Hotel", route: "RT-North-01", status: "Packing", 
      progress: 50, items: "50x 20L Jars", startTime: "08:30 AM", picker: "Amit V.",
      manifest: [
        { sku: "20L-JAR", name: "20L Mineral Water", qty: 50, picked: true },
        { sku: "1L-CASE", name: "1L Bottle Case", qty: 10, picked: false }
      ]
    },
    { 
      id: "ORD-2025-004", customer: "ABC Traders", route: "RT-South-05", status: "Loading", 
      progress: 75, items: "120 Jars", startTime: "09:15 AM", picker: "Sunil K.",
      manifest: [
        { sku: "20L-JAR", name: "20L Mineral Water", qty: 120, picked: true }
      ]
    },
    { 
      id: "ORD-2025-005", customer: "School District", route: "RT-East-02", status: "Picking", 
      progress: 25, items: "300 Bottles", startTime: "10:00 AM", picker: "Rajesh P.",
      manifest: [
        { sku: "500ML-CASE", name: "500ml Kids Pack", qty: 300, picked: false }
      ]
    },
    { 
      id: "ORD-2025-006", customer: "Tech Park", route: "RT-West-03", status: "Picking", 
      progress: 10, items: "15x 20L Jars", startTime: "10:30 AM", picker: "Pending",
      manifest: [
        { sku: "20L-JAR", name: "20L Mineral Water", qty: 15, picked: false }
      ]
    },
  ]);

  // Visual Config
  const getStatusConfig = (status) => {
    switch(status) {
      case 'Picking': return { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', width: '25%', icon: ClipboardList };
      case 'Packing': return { color: 'bg-amber-100 text-amber-700 border-amber-200', width: '50%', icon: Box };
      case 'Loading': return { color: 'bg-blue-100 text-blue-700 border-blue-200', width: '75%', icon: Truck };
      case 'Dispatched': return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', width: '100%', icon: CheckCircle };
      default: return { color: 'bg-slate-50', width: '0%', icon: Clock };
    }
  };

  const advanceStage = (id) => {
    const nextStage = { 'Picking': 'Packing', 'Packing': 'Loading', 'Loading': 'Dispatched' };
    setActiveOrders(prev => prev.map(o => {
      if (o.id === id && nextStage[o.status]) {
        return { ...o, status: nextStage[o.status] };
      }
      return o;
    }));
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)] animate-in fade-in duration-500 overflow-hidden">
      
      {/* LEFT: Main List */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedOrder ? 'w-2/3 hidden lg:flex' : 'w-full'}`}>
        
        {/* KPI Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-indigo-500 uppercase tracking-wide">Picking Queue</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{activeOrders.filter(o => o.status === 'Picking').length}</h3>
            </div>
            <div className="p-3 bg-white rounded-xl text-indigo-500 shadow-sm">
              <ClipboardList size={24} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">Packing / Loading</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{activeOrders.filter(o => ['Packing', 'Loading'].includes(o.status)).length}</h3>
            </div>
            <div className="p-3 bg-white rounded-xl text-amber-500 shadow-sm">
              <Box size={24} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Avg Process Time</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">42m</h3>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 shadow-sm">
              <Clock size={24} />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-slate-200">
                <tr>
                  <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wide">Order Details</th>
                  <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wide">Pipeline Progress</th>
                  <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wide">Route Info</th>
                  <th className="p-5 text-right text-xs font-black text-slate-500 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeOrders.map((order) => {
                  const config = getStatusConfig(order.status);
                  const isSelected = selectedOrder?.id === order.id;
                  const StatusIcon = config.icon;

                  return (
                    <tr 
                      key={order.id} 
                      onClick={() => setSelectedOrder(order)}
                      className={`cursor-pointer transition-all group ${isSelected ? 'bg-indigo-50/60' : 'hover:bg-slate-50'}`}
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
                            <Package size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{order.customer}</p>
                            <p className="text-[11px] font-mono text-slate-500 mt-0.5 bg-slate-100 inline-block px-1.5 rounded">{order.id}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-5 w-1/3 align-middle">
                        <div className="flex justify-between items-center mb-2">
                           <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold border ${config.color}`}>
                              <StatusIcon size={12} /> {order.status}
                           </div>
                           <span className="text-[11px] font-medium text-slate-400">{order.startTime}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-indigo-500 rounded-full transition-all duration-700 ease-out shadow-sm" 
                            style={{ width: config.width }} 
                          />
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                             <Truck size={14} />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-slate-700">{order.route}</p>
                             <p className="text-[10px] text-slate-400">Picker: {order.picker}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-5 text-right">
                        <button className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-indigo-200 text-indigo-700' : 'text-slate-300 hover:text-indigo-600 hover:bg-indigo-50'}`}>
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT: Slide-Over Details Panel */}
      {selectedOrder && (
        <div className="w-full lg:w-[400px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-20 h-full">
          
          {/* Panel Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
            <div>
              <h3 className="font-black text-slate-800 text-lg">Order Manifest</h3>
              <p className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-1">
                 <Box size={12} /> {selectedOrder.id}
              </p>
            </div>
            <button onClick={() => setSelectedOrder(null)} className="p-1.5 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Visual Pipeline Tracker */}
          <div className="p-8 border-b border-slate-100 bg-white">
             <div className="relative flex justify-between items-center mb-8">
                {/* Connector Line */}
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -z-10" />
                
                {['Picking', 'Packing', 'Loading', 'Sent'].map((step, i) => {
                  const currentIdx = ['Picking', 'Packing', 'Loading', 'Dispatched'].indexOf(selectedOrder.status);
                  const isCompleted = i <= currentIdx;
                  const isCurrent = i === currentIdx;

                  return (
                    <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' 
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        {isCompleted ? <CheckCircle size={14} /> : i + 1}
                      </div>
                      <span className={`text-[10px] font-bold ${isCurrent ? 'text-indigo-600' : 'text-slate-400'}`}>{step}</span>
                    </div>
                  )
                })}
             </div>
             
             {selectedOrder.status !== 'Dispatched' && (
               <button 
                onClick={(e) => { e.stopPropagation(); advanceStage(selectedOrder.id); }}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-95"
               >
                 <PlayCircle size={16} /> Move to Next Stage
               </button>
             )}
          </div>

          {/* Manifest Items List */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-2">
              <ClipboardList size={14} /> Pick List Items
            </h4>
            <div className="space-y-3">
              {selectedOrder.manifest.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`p-3 rounded-xl ${item.picked ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
                    {item.picked ? <CheckSquare size={20} /> : <Box size={20} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5 bg-slate-100 inline-block px-1 rounded">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">x{item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-5 bg-white border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-xs">
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-slate-400 mb-1">Assigned Route</span>
                  <span className="font-bold text-slate-700 block truncate">{selectedOrder.route}</span>
               </div>
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-slate-400 mb-1">Picker ID</span>
                  <span className="font-bold text-slate-700 block">{selectedOrder.picker}</span>
               </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default InProcessOrders;
