import React, { useState } from 'react';
import { 
  User, Phone, MessageSquare, MoreHorizontal, MapPin, Package, 
  AlertTriangle, Search, Filter, PlusCircle, History, CreditCard, 
  ArrowUp, ArrowDown, Recycle, CheckCircle2, XCircle, Clock, Truck
} from 'lucide-react';

const RouteCustomers = () => {
  const [filter, setFilter] = useState('All');

  // Enhanced Data Model (Mutable State)
  const [customers, setCustomers] = useState([
    { 
      id: "CUST-101", name: "Green Valley Apartments", type: "Residential", 
      contact: "Ravi Sharma", phone: "+91 98765 43210", 
      pendingOrders: 2, jarBalance: -15, creditLimit: 20000, currentCredit: 5000,
      creditStatus: "Good", lastVisit: "2 days ago", location: "Sector 4, Near Park",
      status: "Pending" // Pending, Delivered, Skipped
    },
    { 
      id: "CUST-102", name: "TechSpace IT Park", type: "Corporate", 
      contact: "Admin Office", phone: "+91 99887 77665", 
      pendingOrders: 12, jarBalance: -50, creditLimit: 100000, currentCredit: 85000,
      creditStatus: "Warning", lastVisit: "Yesterday", location: "Sector 5, Main Road",
      status: "Pending"
    },
    { 
      id: "CUST-103", name: "City Gym & Spa", type: "Commercial", 
      contact: "Manager", phone: "+91 88776 65544", 
      pendingOrders: 5, jarBalance: -5, creditLimit: 15000, currentCredit: 16000,
      creditStatus: "Blocked", lastVisit: "1 week ago", location: "Sector 2, Market",
      status: "Skipped"
    },
    { 
      id: "CUST-104", name: "Sunshine Cafe", type: "Commercial", 
      contact: "Mr. Joy", phone: "+91 77665 54433", 
      pendingOrders: 1, jarBalance: 0, creditLimit: 10000, currentCredit: 2000,
      creditStatus: "Good", lastVisit: "Today", location: "Sector 1, Food Court",
      status: "Delivered"
    },
  ]);

  // --- LOGIC HANDLERS ---

  const handleMove = (index, direction) => {
    if (filter !== 'All') return; // Only allow reordering in main view
    const newCustomers = [...customers];
    if (direction === 'up' && index > 0) {
      [newCustomers[index], newCustomers[index - 1]] = [newCustomers[index - 1], newCustomers[index]];
    } else if (direction === 'down' && index < newCustomers.length - 1) {
      [newCustomers[index], newCustomers[index + 1]] = [newCustomers[index + 1], newCustomers[index]];
    }
    setCustomers(newCustomers);
  };

  const handleStatusChange = (id, newStatus) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const getFilteredCustomers = () => {
    if (filter === 'Warning') return customers.filter(c => c.creditStatus === 'Warning' || c.creditStatus === 'Blocked');
    if (filter === 'Pending') return customers.filter(c => c.status === 'Pending');
    if (filter === 'Delivered') return customers.filter(c => c.status === 'Delivered');
    return customers;
  };

  const getCreditColor = (current, limit) => {
    const usage = (current / limit) * 100;
    if (usage > 100) return "bg-rose-500";
    if (usage > 80) return "bg-amber-500";
    return "bg-emerald-500";
  };

  // --- CALCULATE PROGRESS ---
  const completed = customers.filter(c => c.status === 'Delivered').length;
  const progress = (completed / customers.length) * 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col animate-in fade-in duration-500">
      
      {/* 1. Header & Progress */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Truck className="text-indigo-600" /> Daily Route
              <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-full">{customers.length} Stops</span>
            </h3>
            <div className="flex items-center gap-2 mt-2 w-48">
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{width: `${progress}%`}} />
              </div>
              <span className="text-xs font-bold text-emerald-600">{Math.round(progress)}% Done</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
            <PlusCircle size={16} /> Add Stop
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" 
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['All', 'Pending', 'Delivered', 'Warning'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Customer List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/30">
        {getFilteredCustomers().map((customer, index) => {
          const creditUsage = (customer.currentCredit / customer.creditLimit) * 100;
          const isPending = customer.status === 'Pending';
          
          return (
            <div key={customer.id} className={`group bg-white border rounded-2xl p-5 transition-all relative overflow-hidden ${
              customer.status === 'Delivered' ? 'border-emerald-200 opacity-80' : 
              customer.status === 'Skipped' ? 'border-slate-200 bg-slate-50 opacity-60' :
              'border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300'
            }`}>
              
              {/* Route Connector Line */}
              {index !== customers.length - 1 && (
                <div className="absolute left-[27px] bottom-0 top-[60px] w-0.5 bg-slate-100 -z-10 group-hover:bg-indigo-100 transition-colors" />
              )}

              {/* Status Stripe */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                customer.status === 'Delivered' ? 'bg-emerald-500' :
                customer.status === 'Skipped' ? 'bg-slate-300' :
                customer.creditStatus === 'Blocked' ? 'bg-rose-500' : 
                customer.creditStatus === 'Warning' ? 'bg-amber-500' : 'bg-indigo-500'
              }`} />

              <div className="flex flex-col lg:flex-row justify-between gap-4 pl-2">
                
                {/* A. Sequence & Identity */}
                <div className="flex items-start gap-4 flex-1">
                  
                  {/* Sequence Control */}
                  <div className="flex flex-col items-center gap-1">
                     <button 
                       onClick={() => handleMove(index, 'up')}
                       disabled={filter !== 'All' || index === 0}
                       className="text-slate-300 hover:text-indigo-600 disabled:opacity-0 transition-colors"
                     >
                       <ArrowUp size={14} />
                     </button>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                       customer.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                     }`}>
                       {index + 1}
                     </div>
                     <button 
                       onClick={() => handleMove(index, 'down')}
                       disabled={filter !== 'All' || index === customers.length - 1}
                       className="text-slate-300 hover:text-indigo-600 disabled:opacity-0 transition-colors"
                     >
                       <ArrowDown size={14} />
                     </button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-bold text-base ${customer.status === 'Delivered' ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                          {customer.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-bold uppercase">{customer.type}</span>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <MapPin size={10} /> {customer.location}
                          </span>
                        </div>
                      </div>
                      
                      {/* Delivery Status Badge */}
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1 ${
                        customer.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        customer.status === 'Skipped' ? 'bg-slate-200 text-slate-600' :
                        'bg-indigo-50 text-indigo-700'
                      }`}>
                        {customer.status === 'Delivered' && <CheckCircle2 size={10} />}
                        {customer.status === 'Skipped' && <XCircle size={10} />}
                        {customer.status === 'Pending' && <Clock size={10} />}
                        {customer.status}
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      
                      {/* Jar Balance */}
                      <div className={`p-2 rounded-lg border flex items-center gap-2 ${customer.jarBalance < -10 ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'}`}>
                        <Recycle size={14} className={customer.jarBalance < -10 ? 'text-rose-500' : 'text-slate-400'} />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Jars Due</p>
                          <p className={`text-xs font-black ${customer.jarBalance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{Math.abs(customer.jarBalance)}</p>
                        </div>
                      </div>

                      {/* Orders */}
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                        <Package size={14} className="text-slate-400" />
                         <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Orders</p>
                          <p className="text-xs font-black text-slate-800">{customer.pendingOrders} Pcs</p>
                        </div>
                      </div>

                       {/* Credit Bar */}
                       <div className="hidden md:block p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                            <span>Credit</span>
                            <span className={customer.creditStatus === 'Blocked' ? 'text-rose-500' : ''}>{customer.creditStatus}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full ${getCreditColor(customer.currentCredit, customer.creditLimit)}`} style={{ width: `${Math.min(creditUsage, 100)}%` }} />
                          </div>
                       </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* C. Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center gap-2">
                 
                 <div className="flex gap-2">
                    <button className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-indigo-600 border border-slate-200 transition-colors" title="Call">
                      <Phone size={14} />
                    </button>
                    <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 border border-emerald-100 transition-colors" title="WhatsApp">
                      <MessageSquare size={14} />
                    </button>
                 </div>

                 {isPending ? (
                   <div className="flex gap-2">
                      <button 
                        onClick={() => handleStatusChange(customer.id, 'Skipped')}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        Skip
                      </button>
                      <button 
                        onClick={() => handleStatusChange(customer.id, 'Delivered')}
                        className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 flex items-center gap-1.5 transition-all"
                      >
                        <CheckCircle2 size={14} /> Mark Delivered
                      </button>
                   </div>
                 ) : (
                   <button 
                      onClick={() => handleStatusChange(customer.id, 'Pending')}
                      className="text-xs text-slate-400 hover:text-slate-600 underline"
                   >
                     Undo Status
                   </button>
                 )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RouteCustomers;
