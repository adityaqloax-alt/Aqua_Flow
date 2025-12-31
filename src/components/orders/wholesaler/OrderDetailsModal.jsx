import React, { useEffect } from "react";
import { 
  X, Package, Calendar, Truck, CheckCircle, Clock, Eye, 
  Download, Star, MapPin, AlertCircle 
} from "lucide-react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  // Escape key support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Status to Progress Mapping
  const getProgressFromStatus = (status) => {
    const progressMap = {
      "Confirmed": 20,
      "Production": 40,
      "Dispatched": 60,
      "Out for Delivery": 80,
      "Delivered": 100
    };
    return progressMap[status] || 0;
  };

  const statusConfig = {
    "Production": { color: "amber", icon: Clock, label: "In Production" },
    "Dispatched": { color: "blue", icon: Truck, label: "Dispatched" },
    "Out for Delivery": { color: "indigo", icon: Truck, label: "Out for Delivery" },
    "Delivered": { color: "emerald", icon: CheckCircle, label: "Delivered" }
  };

  const currentStatus = statusConfig[order.status] || statusConfig["Production"];

  // Reorder handler (copies to NewOrders)
  const handleReorder = () => {
    const reorderData = {
      quantities: order.items.reduce((acc, item) => ({
        ...acc,
        [item.name]: item.qty
      }), {}),
      source: `Delivered Order #${order.id}`
    };
    localStorage.setItem('reorderFromDetails', JSON.stringify(reorderData));
    alert(`Redirecting to New Orders with ${order.items.length} items pre-filled!`);
    onClose();
  };

  // Mock POD documents
  const podDocuments = [
    { name: "Signed Delivery Note", type: "pdf" },
    { name: "Driver Signature", type: "pdf" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-[fadeInUp_0.4s_ease-out] md:animate-[slideInScale_0.3s_ease-out]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${currentStatus.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
              <currentStatus.icon.icon size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Order Details</h3>
              <p className="text-sm text-slate-500 font-medium">Final quantities • #{order.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all group"
            aria-label="Close modal"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          
          {/* Status Timeline */}
          <div className="relative">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              Order Progress
            </h4>
            <div className="flex items-center space-x-4 pb-6">
              {["Confirmed", "Production", "Dispatched", "Out for Delivery", "Delivered"].map((status, idx) => {
                const isActive = order.status === status;
                const isCompleted = ["Production", "Dispatched", "Out for Delivery", "Delivered"].indexOf(order.status) > idx;
                return (
                  <React.Fragment key={status}>
                    <div className={`
                      flex flex-col items-center p-3 rounded-xl transition-all group
                      ${isActive ? 'bg-indigo-50 border-2 border-indigo-200 shadow-md' : 
                        isCompleted ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 
                        'bg-slate-50 border border-slate-200 text-slate-500'}
                    `}>
                      <div className={`w-3 h-3 rounded-full mb-2 flex items-center justify-center ${
                        isActive ? 'bg-indigo-500 shadow-lg' : 
                        isCompleted ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}>
                        {isCompleted && <CheckCircle size={10} className="text-white" />}
                      </div>
                      <span className="text-xs font-medium whitespace-nowrap">{statusConfig[status]?.label || status}</span>
                    </div>
                    {idx < 4 && (
                      <div className={`flex-1 h-px bg-gradient-to-r ${
                        isCompleted ? 'from-emerald-300 to-emerald-500' : 
                        isActive ? 'from-indigo-300 to-indigo-500 bg-indigo-300' : 'bg-slate-200'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Items List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                Items Delivered
              </h4>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">
                {order.items.length} items
              </span>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div key={idx} className="group flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/50 to-white hover:from-indigo-50/50 border border-slate-100 rounded-xl hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-indigo-100 group-hover:to-indigo-200 transition-all">
                        <Package size={16} className="text-slate-500 group-hover:text-indigo-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 truncate">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.pack}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-lg font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                        x{item.qty}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-sm text-slate-400 italic bg-slate-50 rounded-xl">
                  No items details available.
                </div>
              )}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-gradient-to-br from-indigo-50/80 to-blue-50/50 backdrop-blur-sm rounded-2xl border border-indigo-100/50">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={14} />
                Delivery Date
              </p>
              <p className="text-lg font-bold text-slate-900">{order.date}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin size={14} />
                Delivery Location
              </p>
              <p className="font-semibold text-indigo-700">{order.location || "Main Store"}</p>
            </div>
          </div>

          {/* Wholesaler Rule Reminder */}
          <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500">
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Important:</p>
                <p>Quantities shown are <strong>final once shipped</strong>. For discrepancies, contact support within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white/50 backdrop-blur-sm border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Download size={14} />
            <span>POD Documents Available</span>
          </div>
          
          <div className="flex flex-1 sm:flex-none gap-2">
            {/* Reorder Button */}
            <button
              onClick={handleReorder}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all shadow-lg flex-1 sm:flex-none"
            >
              <Star size={16} />
              Reorder Same Items
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm font-semibold bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:shadow-md transition-all shadow-sm"
            >
              Close Viewer
            </button>
          </div>
        </div>

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes slideInScale {
            from { opacity: 0; transform: scale(0.8) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-[fadeInUp_0.4s_ease-out] {
            animation: fadeInUp 0.4s ease-out;
          }
          .animate-[slideInScale_0.3s_ease-out] {
            animation: slideInScale 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
