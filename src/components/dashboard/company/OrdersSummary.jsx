import React from 'react';
import { 
  ShoppingCart, Clock, CheckCircle2, AlertCircle, 
  ArrowRight, TrendingUp, DollarSign 
} from 'lucide-react';

// --- MOCK DATA ---
const orderStats = [
  { label: 'New Orders', value: '18', subtext: '3 Urgent', icon: ShoppingCart, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { label: 'Pending Dispatch', value: '42', subtext: 'Avg: 4h wait', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { label: 'Delivered Today', value: '156', subtext: '98% On-time', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
];

const recentOrders = [
  { id: '#ORD-8821', client: 'Grand Hotel', items: '200x 20L Cans', status: 'New', time: '10 mins ago', amount: '₹12,400' },
  { id: '#ORD-8820', client: 'Tech Park Zone A', items: '500x 1L Bottles', status: 'Processing', time: '45 mins ago', amount: '₹8,500' },
  { id: '#ORD-8819', client: 'City Hospital', items: 'Bulk Tanker (12KL)', status: 'Dispatching', time: '1 hr ago', amount: '₹4,200' },
];

const OrdersSummary = () => {
  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShoppingCart className="text-indigo-600" size={24} />
            Sales & Orders
          </h2>
          <p className="text-sm text-slate-500 mt-1">Order pipeline snapshot</p>
        </div>
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          View All Orders <ArrowRight size={16} />
        </button>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {orderStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`bg-white p-4 rounded-xl border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={stat.color} size={20} />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-slate-500 font-medium uppercase">{stat.label}</p>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                    {stat.subtext}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Recent Incoming Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
             <h3 className="font-bold text-slate-800 text-sm">Recent Activity</h3>
             <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Live Feed</span>
          </div>
          <div className="p-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="group flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border-b last:border-0 border-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    order.status === 'New' ? 'bg-indigo-500 animate-pulse' : 
                    order.status === 'Processing' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}></div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">{order.client}</p>
                    <p className="text-xs text-slate-400">{order.items} • <span className="text-slate-500">{order.time}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800 text-sm">{order.amount}</p>
                  <p className={`text-[10px] font-bold uppercase ${
                     order.status === 'New' ? 'text-indigo-600' : 
                     order.status === 'Processing' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Revenue & Alerts */}
        <div className="space-y-4">
           {/* Revenue Mini-Card */}
           <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-5 text-white shadow-lg shadow-emerald-200">
             <div className="flex items-center gap-2 mb-1 opacity-80">
               <DollarSign size={16}/>
               <span className="text-xs font-bold uppercase tracking-wider">Today's Revenue</span>
             </div>
             <div className="text-3xl font-bold">₹2.4 Lakh</div>
             <div className="flex items-center gap-1 mt-2 text-emerald-100 text-xs font-medium">
               <TrendingUp size={12}/> +15% vs yesterday
             </div>
           </div>

           {/* Bottleneck Alert */}
           <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-3">
             <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5"/>
             <div>
               <h4 className="text-xs font-bold text-rose-800 uppercase">Dispatch Bottleneck</h4>
               <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                 4 trucks waiting at Bay 2. Processing time exceeded by 20 mins.
               </p>
               <button className="mt-2 text-[10px] font-bold bg-white text-rose-700 border border-rose-200 px-2 py-1 rounded hover:bg-rose-100">
                 Assign Extra Loader
               </button>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default OrdersSummary;
