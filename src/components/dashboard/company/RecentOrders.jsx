import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Download, 
  Truck,
  CreditCard,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Package,
  Printer
} from 'lucide-react';

const RecentOrders = () => {
  const [filterType, setFilterType] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Enterprise Data Model
  const orders = [
    { 
      id: 'ORD-4592', 
      customer: 'Metro Distributors', 
      email: 'logistics@metro.com',
      type: 'Wholesale', // B2B
      amount: 4250.00, 
      paymentStatus: 'Paid',
      fulfillStatus: 'Shipped',
      items: [
        { sku: 'FG-JAR-20L', name: '20L Water Jar', qty: 200 },
        { sku: 'FG-MIN-500', name: '500ml Mineral Case', qty: 50 }
      ],
      date: 'Today, 2:40 PM',
      address: 'Zone 4, Loading Bay 2',
      initials: 'MD',
      color: 'indigo'
    },
    { 
      id: 'ORD-4591', 
      customer: 'Jane Smith', 
      email: 'jane.smith@gmail.com',
      type: 'Direct', // B2C
      amount: 85.50, 
      paymentStatus: 'Paid',
      fulfillStatus: 'Processing',
      items: [
        { sku: 'FG-ALK-1L', name: 'Alkaline 1L Pack', qty: 2 }
      ],
      date: 'Today, 11:30 AM',
      address: '124 Maple St, Springfield',
      initials: 'JS',
      color: 'rose'
    },
    { 
      id: 'ORD-4590', 
      customer: 'City Gym Chain', 
      email: 'purchasing@citygym.com',
      type: 'Wholesale',
      amount: 1200.00, 
      paymentStatus: 'Pending',
      fulfillStatus: 'Ready',
      items: [
        { sku: 'FG-SPT-500', name: 'Sports Cap 500ml', qty: 1000 }
      ],
      date: 'Yesterday',
      address: 'Central Warehouse, Dock 1',
      initials: 'CG',
      color: 'emerald'
    },
    { 
      id: 'ORD-4589', 
      customer: 'Robert Wilson', 
      email: 'rob.wilson@corp.net',
      type: 'Direct',
      amount: 210.25, 
      paymentStatus: 'Failed',
      fulfillStatus: 'On Hold',
      items: [
        { sku: 'FG-SPK-330', name: 'Sparkling Water Case', qty: 5 }
      ],
      date: 'Yesterday',
      address: '88 Tech Park, Suite 400',
      initials: 'RW',
      color: 'amber'
    },
  ];

  // Logic Helpers
  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filterType === 'All' || order.type === filterType;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Paid': case 'Shipped': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': case 'Processing': case 'Ready': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Failed': case 'On Hold': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* 1. Header & Controls */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-sm shadow-indigo-200">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Orders</h3>
              <p className="text-xs text-slate-500 font-medium">Sales Pipeline</p>
            </div>
          </div>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-white border border-indigo-100 px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition-all">
            View All <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-3">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Customer or ID..." 
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500/20" 
              />
           </div>
           <div className="flex bg-slate-200/50 p-1 rounded-lg">
              {['All', 'Wholesale', 'Direct'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${filterType === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* 2. Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <div className="col-span-1"></div>
        <div className="col-span-4">Customer</div>
        <div className="col-span-3 text-center">Status</div>
        <div className="col-span-2 text-right">Total</div>
        <div className="col-span-2 text-center">Action</div>
      </div>

      {/* 3. Order List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
        {filteredOrders.map((order) => {
          const isExpanded = expandedId === order.id;

          return (
            <div key={order.id} className="group transition-all duration-200 bg-white hover:bg-slate-50">
              
              {/* Main Row */}
              <div 
                onClick={() => toggleExpand(order.id)}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer"
              >
                {/* Expand Icon */}
                <div className="col-span-1 text-slate-300">
                   {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </div>

                {/* Customer */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-sm
                    bg-gradient-to-br from-${order.color}-400 to-${order.color}-600
                  `}>
                    {order.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-700 truncate">{order.customer}</h4>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-slate-400">{order.id}</span>
                       <span className={`text-[9px] px-1.5 py-0.5 rounded border ${order.type === 'Wholesale' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                          {order.type}
                       </span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="col-span-3 flex flex-col gap-1 items-center">
                   <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyles(order.paymentStatus)}`}>
                      <CreditCard size={10}/> {order.paymentStatus}
                   </span>
                   <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyles(order.fulfillStatus)}`}>
                      <Truck size={10}/> {order.fulfillStatus}
                   </span>
                </div>

                {/* Amount */}
                <div className="col-span-2 text-right">
                  <p className="text-sm font-bold text-slate-800">${order.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">{order.items.length} Items</p>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-center">
                   <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <MoreVertical size={16} />
                   </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                 <div className="px-6 pb-4 pt-0 animate-in slide-in-from-top-1 bg-slate-50/50 border-t border-slate-100 inset-shadow-sm">
                    <div className="pl-14 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                       
                       {/* Order Items */}
                       <div>
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Order Items</h5>
                          <div className="space-y-2">
                             {order.items.map((item, i) => (
                               <div key={i} className="flex justify-between items-center text-xs bg-white p-2 rounded border border-slate-200">
                                  <span className="flex items-center gap-2 text-slate-700">
                                     <Package size={12} className="text-indigo-400"/> {item.name}
                                  </span>
                                  <span className="font-mono font-bold text-slate-500">x{item.qty}</span>
                               </div>
                             ))}
                          </div>
                       </div>

                       {/* Shipping & Actions */}
                       <div className="flex flex-col justify-between">
                          <div>
                             <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Shipping Details</h5>
                             <p className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                                {order.address}
                             </p>
                          </div>
                          <div className="flex gap-2 mt-3">
                             <button className="flex-1 py-1.5 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200">
                                <Printer size={12}/> Invoice
                             </button>
                             <button className="flex-1 py-1.5 flex items-center justify-center gap-2 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700">
                                <Truck size={12}/> Track
                             </button>
                          </div>
                       </div>

                    </div>
                 </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RecentOrders;
