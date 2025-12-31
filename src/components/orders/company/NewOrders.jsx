import React, { useState } from 'react';
import { 
  Check, X, AlertTriangle, CreditCard, User, PackageCheck, 
  ShieldAlert, Info, Download, CheckCircle2, Filter, 
  ArrowUpRight, Truck, MoreVertical 
} from 'lucide-react';

const NewOrders = () => {
  const [filter, setFilter] = useState('All');
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Mock Incoming Orders with Advanced Data
  const [orders, setOrders] = useState([
    { 
      id: "ORD-2025-001", customer: "Sunshine Resorts", amount: 12500, creditLimit: 50000, currentDebt: 10000, 
      items: "50x 20L Jars", stockStatus: 'Available', date: "10:30 AM", priority: 'High', paymentMode: 'Credit',
      warehouse: 'WH-North', allocation: 100 
    },
    { 
      id: "ORD-2025-002", customer: "City Hospital", amount: 45000, creditLimit: 100000, currentDebt: 95000, 
      items: "200x 20L Jars", stockStatus: 'Low Stock', date: "10:45 AM", priority: 'Critical', paymentMode: 'Credit',
      warehouse: 'WH-Central', allocation: 45 
    }, 
    { 
      id: "ORD-2025-003", customer: "Tech Park Cafe", amount: 2000, creditLimit: 10000, currentDebt: 0, 
      items: "10x 20L Jars", stockStatus: 'Available', date: "11:00 AM", priority: 'Normal', paymentMode: 'Cash',
      warehouse: 'WH-South', allocation: 100 
    },
    { 
      id: "ORD-2025-004", customer: "Metro Builders", amount: 8500, creditLimit: 20000, currentDebt: 18000, 
      items: "30x 20L Jars", stockStatus: 'Available', date: "11:15 AM", priority: 'High', paymentMode: 'Credit',
      warehouse: 'WH-North', allocation: 100 
    }
  ]);

  const [overrideId, setOverrideId] = useState(null);

  const handleAction = (id, action) => {
    if (action === 'Override') alert(`Manager Override Authorized for ${id}`);
    setOrders(orders.filter(o => o.id !== id));
    setOverrideId(null);
  };

  const toggleSelection = (id) => {
    setSelectedOrders(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getFilteredOrders = () => {
    if (filter === 'Critical') return orders.filter(o => o.priority === 'Critical');
    if (filter === 'Risk') return orders.filter(o => ((o.currentDebt + o.amount) / o.creditLimit) > 0.9);
    return orders;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Incoming Orders <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">{orders.length}</span>
          </h2>
          <p className="text-sm text-slate-500">Review and approve customer purchase orders</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['All', 'Critical', 'Risk'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* 2. Bulk Action Bar (Conditional) */}
      {selectedOrders.length > 0 && (
        <div className="bg-indigo-900 text-white p-3 rounded-xl flex items-center justify-between shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3 px-2">
            <div className="font-bold text-sm">{selectedOrders.length} orders selected</div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold">Reject All</button>
            <button className="px-4 py-1.5 bg-white text-indigo-900 hover:bg-indigo-50 rounded-lg text-xs font-bold">Approve All</button>
          </div>
        </div>
      )}

      {/* 3. Orders Grid View */}
      <div className="grid gap-4">
        {getFilteredOrders().map((order) => {
          const totalAfterOrder = order.currentDebt + order.amount;
          const utilization = (totalAfterOrder / order.creditLimit) * 100;
          const isCreditRisk = utilization > 90;
          const isStockIssue = order.stockStatus === 'Low Stock';

          return (
            <div key={order.id} className={`bg-white rounded-xl border transition-all hover:shadow-md group relative overflow-hidden ${isCreditRisk ? 'border-amber-200' : 'border-slate-200'}`}>
              
              {/* Status Indicator Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${order.priority === 'Critical' ? 'bg-rose-500' : isCreditRisk ? 'bg-amber-500' : 'bg-emerald-500'}`} />

              <div className="p-5 pl-7 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                
                {/* Checkbox & ID */}
                <div className="flex items-start gap-4 min-w-[280px]">
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelection(order.id)}
                    className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-slate-800">{order.customer}</h3>
                      {order.priority === 'Critical' && <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Urgent</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{order.id}</span>
                      <span className="flex items-center gap-1"><Truck size={12} /> {order.warehouse}</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>

                {/* Stock & Items */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <PackageCheck size={16} className="text-slate-400" />
                    <span className="font-bold text-slate-700 text-sm">{order.items}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2 py-0.5 rounded font-bold ${isStockIssue ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {order.stockStatus}
                    </span>
                    {order.allocation < 100 && (
                      <span className="text-rose-600 font-bold">Only {order.allocation}% fulfillable</span>
                    )}
                  </div>
                </div>

                {/* Credit Risk Engine */}
                <div className="w-full lg:w-64 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-semibold">Credit Utilization</span>
                    <span className={`font-bold ${isCreditRisk ? 'text-rose-600' : 'text-slate-700'}`}>{Math.round(utilization)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
                    <div className={`h-full rounded-full ${isCreditRisk ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(utilization, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Limit: ₹{order.creditLimit/1000}k</span>
                    <span>New Total: ₹{totalAfterOrder.toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-4 lg:pt-0 mt-2 lg:mt-0 border-slate-100">
                  {isCreditRisk && !overrideId ? (
                    <button 
                      onClick={() => setOverrideId(order.id)}
                      className="px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                    >
                      <ShieldAlert size={16} /> Override Risk
                    </button>
                  ) : (
                    <>
                       {overrideId === order.id ? (
                          <button 
                            onClick={() => handleAction(order.id, 'Override')}
                            className="px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-sm font-bold shadow-lg shadow-amber-200 animate-pulse"
                          >
                            Confirm Override
                          </button>
                       ) : (
                          <button 
                            onClick={() => handleAction(order.id, 'Approved')}
                            className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all hover:-translate-y-0.5"
                          >
                            <CheckCircle2 size={16} /> Approve
                          </button>
                       )}
                    </>
                  )}
                  
                  {!overrideId && (
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                      <X size={20} />
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}

        {getFilteredOrders().length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <PackageCheck size={32} className="text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-bold mb-1">No pending orders</h3>
            <p className="text-slate-500 text-sm">Great job! All orders have been processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrders;
