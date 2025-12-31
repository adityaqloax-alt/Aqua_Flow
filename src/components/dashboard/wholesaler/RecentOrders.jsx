import React from "react";
import { Clock, CheckCircle, Package } from "lucide-react";

const RecentOrders = () => {
  const orders = [
    { id: "ORD-7845", date: "12 Oct", status: "Delivered", items: "120 Units" },
    { id: "ORD-7831", date: "10 Oct", status: "Pending", items: "50 Cases" },
    { id: "ORD-7819", date: "08 Oct", status: "Delivered", items: "200 Jars" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden animate-[fadeInUp_0.8s_ease-out]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Clock className="text-slate-400" size={18} />
          Recent Activity
        </h3>
        <button className="text-xs font-bold text-indigo-600 hover:underline">
          View All
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {orders.map((order, idx) => {
          const isDelivered = order.status === "Delivered";
          
          return (
            <div
              key={order.id}
              className="group flex items-center justify-between p-3 rounded-lg border border-transparent hover:bg-slate-50 hover:border-slate-100 transition-all duration-200"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Icon & ID */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isDelivered ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {isDelivered ? <CheckCircle size={14} /> : <Package size={14} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">
                    {order.id}
                  </p>
                  <p className="text-xs text-slate-400">{order.items}</p>
                </div>
              </div>

              {/* Date & Status */}
              <div className="text-right">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    isDelivered
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.status}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">{order.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentOrders;
