import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Package, 
  RefreshCcw, 
  Camera, 
  PenTool, 
  ChevronDown, 
  ChevronUp,
  Save,
  Truck
} from 'lucide-react';

const DeliveryConfirmation = () => {
  // Enhanced Data Model
  const [orders, setOrders] = useState([
    { 
      id: "ORD-8821", 
      customer: "TechSpace IT Park", 
      items: "20L Water Jar", 
      orderedQty: 50, 
      status: "Pending", // Pending, Delivered, Partial, Failed
      deliveredQty: 50,
      returnedEmpties: 0,
      notes: "",
      failureReason: ""
    },
    { 
      id: "ORD-8822", 
      customer: "Green Valley Apts", 
      items: "20L Water Jar", 
      orderedQty: 20, 
      status: "Pending",
      deliveredQty: 20,
      returnedEmpties: 0,
      notes: "",
      failureReason: ""
    },
    { 
      id: "ORD-8823", 
      customer: "Sunrise Cafe", 
      items: "750ml Premium Case", 
      orderedQty: 5, 
      status: "Delivered", // Already done
      deliveredQty: 5,
      returnedEmpties: 0,
      timestamp: "10:30 AM"
    }
  ]);

  const [expandedId, setExpandedId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const toggleExpand = (order) => {
    if (expandedId === order.id) {
      setExpandedId(null);
    } else {
      setExpandedId(order.id);
      // Initialize form with defaults
      setEditForm({
        ...order,
        status: 'Delivered', // Default attempt
        tempDeliveredQty: order.orderedQty,
        tempReturnedEmpties: 0
      });
    }
  };

  const handleUpdate = (id) => {
    setOrders(orders.map(o => 
      o.id === id ? {
        ...o,
        status: editForm.status,
        deliveredQty: editForm.tempDeliveredQty,
        returnedEmpties: editForm.tempReturnedEmpties,
        failureReason: editForm.failureReason,
        notes: editForm.notes,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      } : o
    ));
    setExpandedId(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Partial': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Failed': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Truck size={20} className="text-indigo-600"/> Delivery Execution
          </h2>
          <p className="text-xs text-slate-500">Update status, track assets, and sync inventory.</p>
        </div>
        <div className="text-right">
           <div className="text-2xl font-bold text-indigo-600">{orders.filter(o => o.status === 'Pending').length}</div>
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Stops</div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {orders.map((order) => {
          const isExpanded = expandedId === order.id;
          const isCompleted = order.status !== 'Pending';

          return (
            <div 
              key={order.id} 
              className={`border rounded-xl transition-all duration-300 overflow-hidden ${isExpanded ? 'border-indigo-400 shadow-md ring-1 ring-indigo-100' : 'border-slate-200 bg-white'}`}
            >
              
              {/* Row Summary */}
              <div 
                onClick={() => !isCompleted && toggleExpand(order)}
                className={`p-4 flex items-center justify-between cursor-pointer ${isCompleted ? 'bg-slate-50 opacity-80' : 'bg-white hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isCompleted ? 'bg-white' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                    {isCompleted ? (
                      order.status === 'Failed' ? <XCircle size={20} className="text-rose-500"/> : 
                      order.status === 'Partial' ? <AlertTriangle size={20} className="text-amber-500"/> : 
                      <CheckCircle size={20} className="text-emerald-500"/>
                    ) : (
                      <span className="font-bold text-sm">{order.orderedQty}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{order.customer}</h4>
                    <p className="text-xs text-slate-500">{order.items}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(order.status)}`}>
                     {order.status}
                   </span>
                   {!isCompleted && (
                     isExpanded ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>
                   )}
                </div>
              </div>

              {/* Expanded Edit Form */}
              {isExpanded && !isCompleted && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2">
                  
                  {/* Action Selector */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {['Delivered', 'Partial', 'Failed'].map((action) => (
                      <button
                        key={action}
                        onClick={() => setEditForm({...editForm, status: action})}
                        className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                          editForm.status === action
                            ? action === 'Delivered' ? 'bg-emerald-600 text-white border-emerald-600'
                            : action === 'Partial' ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-rose-500 text-white border-rose-500'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>

                  {/* Quantity & Inventory Inputs */}
                  {editForm.status !== 'Failed' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Delivered Qty</label>
                        <div className="relative">
                          <Package className="absolute left-3 top-2.5 text-slate-400" size={14}/>
                          <input 
                            type="number" 
                            value={editForm.tempDeliveredQty}
                            onChange={(e) => setEditForm({...editForm, tempDeliveredQty: parseInt(e.target.value)})}
                            className="w-full pl-9 p-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                      
                      {/* CRITICAL: Empty Jar Return Field */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Empties Returned</label>
                        <div className="relative">
                          <RefreshCcw className="absolute left-3 top-2.5 text-slate-400" size={14}/>
                          <input 
                            type="number" 
                            value={editForm.tempReturnedEmpties}
                            onChange={(e) => setEditForm({...editForm, tempReturnedEmpties: parseInt(e.target.value)})}
                            className="w-full pl-9 p-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Failure/Partial Reason */}
                  {(editForm.status === 'Failed' || editForm.status === 'Partial') && (
                    <div className="mb-4">
                       <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Reason Code</label>
                       <select 
                         className="w-full p-2 rounded-lg border border-slate-300 text-sm bg-white"
                         onChange={(e) => setEditForm({...editForm, failureReason: e.target.value})}
                       >
                         <option>Select Reason...</option>
                         <option>Shop Closed</option>
                         <option>Cash Issue</option>
                         <option>Stock Damaged</option>
                         <option>Customer Refused</option>
                       </select>
                    </div>
                  )}

                  {/* Proof of Delivery */}
                  <div className="flex gap-2 mb-6">
                    <button className="flex-1 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100">
                      <Camera size={14}/> Add Photo
                    </button>
                    <button className="flex-1 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100">
                      <PenTool size={14}/> Signature
                    </button>
                  </div>

                  {/* Save Button */}
                  <button 
                    onClick={() => handleUpdate(order.id)}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 flex items-center justify-center gap-2"
                  >
                    <Save size={16} /> Confirm Update
                  </button>

                </div>
              )}

              {/* Completed Summary View */}
              {isCompleted && (
                 <div className="px-4 pb-3 pl-[4.5rem] text-xs text-slate-500 flex justify-between">
                    <div>
                      {order.status !== 'Failed' && (
                        <span>Delivered: <b>{order.deliveredQty}</b> • Returns: <b>{order.returnedEmpties}</b></span>
                      )}
                      {order.status === 'Failed' && <span className="text-rose-600 font-bold">Reason: {order.failureReason || 'Not specified'}</span>}
                    </div>
                    <div>{order.timestamp}</div>
                 </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryConfirmation;
