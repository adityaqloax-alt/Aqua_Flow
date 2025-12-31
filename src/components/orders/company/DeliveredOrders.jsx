import React, { useState } from 'react';
import { 
  CheckCircle, DollarSign, FileText, Search, Filter, Download, 
  Image, MoreVertical, CreditCard, X, Banknote, Calendar, 
  MapPin, CheckCircle2, AlertCircle
} from 'lucide-react';

const DeliveredOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All'); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Enhanced Data Model
  const [delivered, setDelivered] = useState([
    { 
      id: "ORD-2024-998", customer: "Gold's Gym Center", amount: 4500, paid: true, 
      paymentMethod: "Bank Transfer", date: "Oct 24, 2025", time: "14:30", 
      driver: "Rajesh Kumar", items: "40x 20L Jars", podVerified: true, location: "Sector 29"
    },
    { 
      id: "ORD-2024-999", customer: "Retail Hub - Sector 5", amount: 12000, paid: false, 
      paymentMethod: null, date: "Oct 24, 2025", time: "16:15", 
      driver: "Sunil Singh", items: "200x 1L Bottles", podVerified: true, location: "MG Road"
    },
    { 
      id: "ORD-2024-1001", customer: "TechPark Cafeteria", amount: 2850, paid: false, 
      paymentMethod: null, date: "Oct 25, 2025", time: "09:45", 
      driver: "Rajesh Kumar", items: "15x 20L Jars", podVerified: false, location: "Cyber City"
    },
    { 
      id: "ORD-2024-1002", customer: "City Hospital", amount: 45000, paid: true, 
      paymentMethod: "Cash", date: "Oct 25, 2025", time: "11:30", 
      driver: "Amit Sharma", items: "200x 20L Jars", podVerified: true, location: "Civil Lines"
    },
  ]);

  // Financial Calculations
  const totalPending = delivered.filter(o => !o.paid).reduce((acc, curr) => acc + curr.amount, 0);
  const totalCollected = delivered.filter(o => o.paid).reduce((acc, curr) => acc + curr.amount, 0);
  const collectionRate = Math.round((totalCollected / (totalCollected + totalPending)) * 100) || 0;

  const handleMarkPaidClick = (order) => {
    setSelectedOrder(order);
    setIsPaymentModalOpen(true);
  };

  const confirmPayment = (method) => {
    const updated = delivered.map(o => 
      o.id === selectedOrder.id 
      ? { ...o, paid: true, paymentMethod: method } 
      : o
    );
    setDelivered(updated);
    setIsPaymentModalOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = delivered.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.includes(searchTerm);
    const matchesFilter = filter === 'All' ? true : filter === 'Paid' ? order.paid : !order.paid;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Enhanced KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Collections Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
              <CheckCircle2 size={22} />
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">+12% vs yest</span>
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Collected Today</p>
            <h3 className="text-3xl font-black text-emerald-900 mt-1">₹{totalCollected.toLocaleString()}</h3>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl">
              <AlertCircle size={22} />
            </div>
            <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded-full">Action Req</span>
          </div>
          <div>
            <p className="text-xs font-bold text-rose-600 uppercase tracking-wide">Pending Payment</p>
            <h3 className="text-3xl font-black text-rose-900 mt-1">₹{totalPending.toLocaleString()}</h3>
          </div>
        </div>

        {/* Collection Rate */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Banknote size={22} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Collection Rate</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-black text-slate-900">{collectionRate}%</h3>
              <span className="text-xs text-slate-400">of total value</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${collectionRate}%` }} />
            </div>
          </div>
        </div>

        {/* Total Deliveries */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
             <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <FileText size={22} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Delivered Orders</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{delivered.length}</h3>
          </div>
        </div>
      </div>

      {/* 2. Advanced Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
           {['All', 'Unpaid', 'Paid'].map(f => (
             <button 
               key={f}
               onClick={() => setFilter(f)}
               className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
                 filter === f 
                 ? 'bg-slate-900 text-white shadow-md' 
                 : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
               }`}
             >
               {f}
             </button>
           ))}
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors" size={16} />
             <input 
               type="text" 
               placeholder="Search Customer, ID or Driver..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all focus:bg-white" 
             />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
             <Download size={18} />
          </button>
        </div>
      </div>

      {/* 3. Orders List View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredOrders.map(order => (
          <div key={order.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
            
            {/* Status Indicator */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${order.paid ? 'bg-emerald-500' : 'bg-rose-500'}`} />

            <div className="p-5 pl-7">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{order.customer}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                     <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{order.id}</span>
                     <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <MapPin size={12} /> {order.location}
                     </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-slate-900">₹{order.amount.toLocaleString()}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${order.paid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {order.paid ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Items Delivered</span>
                   <span className="font-bold text-slate-700">{order.items}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Driver</span>
                   <span className="font-bold text-slate-700">{order.driver}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Delivery Time</span>
                   <div className="flex items-center gap-1.5 font-bold text-slate-700">
                      <Calendar size={14} className="text-slate-400" />
                      {order.date}, {order.time}
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                 <div className="flex gap-3">
                   {order.podVerified ? (
                     <button className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
                        <Image size={14} /> View POD
                     </button>
                   ) : (
                     <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                        <AlertCircle size={14} /> POD Missing
                     </span>
                   )}
                 </div>

                 <div className="flex gap-3">
                    {!order.paid ? (
                      <button 
                        onClick={() => handleMarkPaidClick(order)}
                        className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center gap-2 hover:-translate-y-0.5 transition-all"
                      >
                        <DollarSign size={16} /> Collect Payment
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-100">
                        <CheckCircle size={16} /> Paid via {order.paymentMethod}
                      </div>
                    )}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Payment Modal */}
      {isPaymentModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden scale-100 animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-800">Record Collection</h3>
              <button onClick={() => setIsPaymentModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-rose-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-8">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Total Amount Due</p>
                 <h2 className="text-4xl font-black text-slate-900">₹{selectedOrder.amount.toLocaleString()}</h2>
                 <p className="text-sm font-medium text-slate-500 mt-2 bg-slate-100 inline-block px-3 py-1 rounded-full">{selectedOrder.customer}</p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => confirmPayment('Cash')}
                  className="w-full flex items-center justify-between p-4 border-2 border-slate-100 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                      <Banknote size={24} />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-slate-700 group-hover:text-emerald-800">Cash Received</span>
                      <span className="text-xs text-slate-400 group-hover:text-emerald-600">Handed to driver</span>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => confirmPayment('UPI / Bank Transfer')}
                  className="w-full flex items-center justify-between p-4 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                      <CreditCard size={24} />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-slate-700 group-hover:text-indigo-800">Online Transfer</span>
                      <span className="text-xs text-slate-400 group-hover:text-indigo-600">UPI, NEFT, IMPS</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[11px] font-medium text-slate-400">
                Transaction ID will be generated automatically.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DeliveredOrders;
