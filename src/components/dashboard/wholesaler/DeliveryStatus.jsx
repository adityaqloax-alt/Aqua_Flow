import React from "react";
import { Truck, CheckCircle, MapPin, PackageCheck } from "lucide-react";

const DeliveryStatus = () => {
  const lastOrder = {
    id: "ORD-7845",
    status: "Delivered",
    date: "12 Oct 2025",
    location: "Main Warehouse Gate 2"
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 relative overflow-hidden group animate-[fadeInUp_0.7s_ease-out]">
      
      {/* Background Decorator */}
      <div className="absolute -right-4 -bottom-4 text-emerald-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
        <Truck size={100} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Truck size={20} />
          </div>
          <h3 className="font-bold text-slate-800">Last Shipment</h3>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full border border-emerald-200">
          <CheckCircle size={10} /> {lastOrder.status}
        </span>
      </div>

      {/* Details */}
      <div className="relative z-10 space-y-3">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide">Order Reference</p>
          <p className="text-lg font-mono font-bold text-slate-800">{lastOrder.id}</p>
        </div>

        <div className="flex items-start gap-3 pt-2">
           <div className="flex-1">
             <p className="text-xs text-slate-400 flex items-center gap-1 mb-0.5">
               <PackageCheck size={12} /> Received On
             </p>
             <p className="text-sm font-semibold text-slate-700">{lastOrder.date}</p>
           </div>
           
           <div className="flex-1 text-right">
             <p className="text-xs text-slate-400 flex items-center justify-end gap-1 mb-0.5">
               <MapPin size={12} /> Location
             </p>
             <p className="text-sm font-semibold text-slate-700">{lastOrder.location}</p>
           </div>
        </div>
      </div>

      {/* Progress Bar (Full) */}
      <div className="relative z-10 mt-5">
        <div className="w-full h-1.5 bg-emerald-100 rounded-full">
          <div className="w-full h-full bg-emerald-500 rounded-full" />
        </div>
        <p className="text-[10px] text-emerald-600 font-medium mt-1 text-right">
          Completed
        </p>
      </div>
    </div>
  );
};

export default DeliveryStatus;
