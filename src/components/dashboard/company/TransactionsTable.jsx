import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Check,
  CreditCard,
  Calendar,
  ArrowUpRight,
  Trash2,
  RefreshCcw,
  FileText
} from 'lucide-react';

const TransactionsTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  // Enterprise Data Model
  const transactions = [
    { 
      id: 'TRX-9821', 
      customer: { name: 'Alex Morgan', email: 'alex.m@studio.co', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      product: 'Enterprise License (Yearly)', 
      amount: '2,450.00', 
      status: 'Completed', 
      date: 'Oct 24, 2024',
      method: 'Visa •• 4242'
    },
    { 
      id: 'TRX-9822', 
      customer: { name: 'Sarah Connor', email: 'sarah@skynet.net', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      product: 'Consulting Hours (x10)', 
      amount: '1,200.00', 
      status: 'Pending', 
      date: 'Oct 23, 2024',
      method: 'Mastercard •• 8821'
    },
    { 
      id: 'TRX-9823', 
      customer: { name: 'Michael Chen', email: 'mike.c@dev.io', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      product: 'Basic Plan Upgrade', 
      amount: '89.00', 
      status: 'Completed', 
      date: 'Oct 22, 2024',
      method: 'PayPal'
    },
    { 
      id: 'TRX-9824', 
      customer: { name: 'Emily Blunt', email: 'emily@design.uk', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      product: 'UI Kit Bundle', 
      amount: '149.50', 
      status: 'Failed', 
      date: 'Oct 21, 2024',
      method: 'Visa •• 1234'
    },
    { 
      id: 'TRX-9825', 
      customer: { name: 'David Smith', email: 'dave@corp.inc', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      product: 'Server Maintenance', 
      amount: '500.00', 
      status: 'Completed', 
      date: 'Oct 20, 2024',
      method: 'Wire Transfer'
    },
  ];

  const filteredTransactions = transactions.filter(t => filterStatus === 'All' || t.status === filterStatus);

  const toggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAll = () => {
     if (selectedRows.length === filteredTransactions.length) {
        setSelectedRows([]);
     } else {
        setSelectedRows(filteredTransactions.map(t => t.id));
     }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20';
      case 'Pending': return 'bg-amber-50 text-amber-600 ring-1 ring-amber-500/20';
      case 'Failed': return 'bg-rose-50 text-rose-600 ring-1 ring-rose-500/20';
      default: return 'bg-slate-50 text-slate-600 ring-1 ring-slate-500/20';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* 1. Toolbar Section */}
      <div className="p-5 border-b border-slate-100 flex flex-col gap-4">
        
        {/* Top Row: Title & Context Actions */}
        <div className="flex justify-between items-center h-10">
           {selectedRows.length > 0 ? (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 w-full">
                 <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                    {selectedRows.length} Selected
                 </span>
                 <div className="h-6 w-px bg-slate-200 mx-2"></div>
                 <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg">
                    <Download size={14}/> Export
                 </button>
                 <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg">
                    <FileText size={14}/> Invoice
                 </button>
                 <div className="flex-1"></div>
                 <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg">
                    <Trash2 size={14}/> Delete
                 </button>
              </div>
           ) : (
              <div className="flex justify-between items-center w-full">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">Transactions</h3>
                    <p className="text-xs text-slate-500 font-medium">Payment History</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                       <Filter size={16}/>
                    </button>
                    <button className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow-sm">
                       <Download size={16}/>
                    </button>
                 </div>
              </div>
           )}
        </div>

        {/* Bottom Row: Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
           <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
              {['All', 'Completed', 'Pending', 'Failed'].map(status => (
                 <button 
                   key={status}
                   onClick={() => setFilterStatus(status)}
                   className={`flex-1 sm:flex-none px-3 py-1 text-[10px] font-bold rounded transition-all ${filterStatus === status ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    {status}
                 </button>
              ))}
           </div>
           
           <div className="relative group w-full sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={14} />
             <input 
               type="text" 
               placeholder="Search transactions..." 
               className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500/20"
             />
           </div>
        </div>
      </div>

      {/* 2. Table Section */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="w-12 px-6 py-3">
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0}
                  onChange={toggleAll}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                />
              </th>
              {['ID', 'Customer', 'Product', 'Method', 'Status', 'Date', ''].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredTransactions.map((trx) => (
              <tr 
                key={trx.id} 
                onClick={() => toggleRow(trx.id)}
                className={`
                  group transition-all duration-200 hover:bg-slate-50 cursor-pointer
                  ${selectedRows.includes(trx.id) ? 'bg-indigo-50/20' : ''}
                `}
              >
                {/* Checkbox */}
                <td className="px-6 py-4">
                  <div className={`
                    w-4 h-4 rounded border flex items-center justify-center transition-colors
                    ${selectedRows.includes(trx.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white'}
                  `}>
                    {selectedRows.includes(trx.id) && <Check size={10} className="text-white" />}
                  </div>
                </td>

                {/* ID */}
                <td className="px-6 py-4">
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                    {trx.id}
                  </span>
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={trx.customer.img} alt="" className="w-8 h-8 rounded-full border border-slate-100" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700 truncate">{trx.customer.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{trx.customer.email}</p>
                    </div>
                  </div>
                </td>

                {/* Product */}
                <td className="px-6 py-4">
                  <p className="text-xs font-medium text-slate-600 truncate max-w-[150px]">{trx.product}</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">${trx.amount}</p>
                </td>

                {/* Payment */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold">
                    <div className="p-1 bg-white border border-slate-200 rounded text-slate-600">
                      <CreditCard size={10} />
                    </div>
                    {trx.method}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${getStatusStyle(trx.status)}`}>
                    <span className={`w-1 h-1 rounded-full ${trx.status === 'Completed' ? 'bg-emerald-500' : trx.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
                    {trx.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <Calendar size={10} />
                    {trx.date}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                   <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={16} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Footer */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 text-xs">
         <span className="text-slate-500 font-medium">Page 1 of 5</span>
         <div className="flex gap-1">
            <button className="p-1 border border-slate-200 bg-white rounded hover:bg-slate-50 text-slate-500"><ChevronLeft size={14}/></button>
            <button className="p-1 border border-slate-200 bg-white rounded hover:bg-slate-50 text-slate-500"><ChevronRight size={14}/></button>
         </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
