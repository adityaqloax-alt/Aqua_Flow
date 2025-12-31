import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Truck, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Plus,
  MoreHorizontal,
  Star,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Mail,
  Zap,
  BarChart3
} from 'lucide-react';

const Procurement = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Enterprise Data Model
  const purchaseOrders = [
    { 
      id: 'PO-2025-881',
      material: '500ml PET Preforms',
      sku: 'RM-PET-500',
      vendor: 'Plastico Industries',
      vendorRating: 4.8,
      riskLevel: 'Low',
      orderQty: 50000, 
      receivedQty: 0,
      unitCost: 0.12,
      totalValue: 6000.00,
      orderDate: '2025-12-28',
      deliveryDate: '2026-01-05', 
      status: 'Pending', 
      priority: 'High',
      impact: 'Line Stop Risk', // Critical alert
      contact: 'sales@plastico.com'
    },
    { 
      id: 'PO-2025-879',
      material: '28mm Screw Caps (Blue)',
      sku: 'RM-CAP-BLU',
      vendor: 'CapCorp Global',
      vendorRating: 3.5,
      riskLevel: 'Medium',
      orderQty: 100000, 
      receivedQty: 100000,
      unitCost: 0.03,
      totalValue: 3000.00,
      orderDate: '2025-12-15',
      deliveryDate: '2025-12-30', 
      status: 'Received', 
      priority: 'Normal',
      impact: 'None',
      contact: 'orders@capcorp.com'
    },
    { 
      id: 'PO-2025-880',
      material: 'Adhesive Labels (Rolls)',
      sku: 'RM-LBL-GLOSS',
      vendor: 'PrintMasters Ltd',
      vendorRating: 4.2,
      riskLevel: 'Low',
      orderQty: 500, 
      receivedQty: 250, 
      unitCost: 15.00,
      totalValue: 7500.00,
      orderDate: '2025-12-20',
      deliveryDate: '2026-01-03', 
      status: 'Partial', 
      priority: 'Critical',
      impact: 'Delaying Batch B-992',
      contact: 'support@printmasters.com'
    },
    { 
      id: 'PO-2025-875',
      material: 'Magnesium Mineral Pack',
      sku: 'ADD-MIN-MG',
      vendor: 'ChemPure Inc.',
      vendorRating: 2.9,
      riskLevel: 'High',
      orderQty: 200, 
      receivedQty: 0,
      unitCost: 45.00,
      totalValue: 9000.00,
      orderDate: '2025-12-10',
      deliveryDate: '2025-12-25', 
      status: 'Late', 
      priority: 'High',
      impact: 'Production Halted',
      contact: 'urgent@chempure.com'
    },
  ];

  // Filtering Logic
  const filteredPOs = purchaseOrders.filter(po => {
    const matchesStatus = filterStatus === 'All' || po.status === filterStatus;
    const matchesSearch = po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          po.material.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  // Helper for Status Visuals
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Received': return { icon: <CheckCircle size={14} />, color: 'bg-emerald-100 text-emerald-700', label: 'Completed' };
      case 'Pending': return { icon: <Clock size={14} />, color: 'bg-blue-100 text-blue-700', label: 'On Order' };
      case 'Partial': return { icon: <Truck size={14} />, color: 'bg-amber-100 text-amber-700', label: 'In Transit' };
      case 'Late': return { icon: <AlertCircle size={14} />, color: 'bg-rose-100 text-rose-700', label: 'Delayed' };
      default: return { icon: null, color: 'bg-slate-100 text-slate-700', label: status };
    }
  };

  // Helper for Priority Labels
  const getPriorityBadge = (priority) => {
    if (priority === 'Critical') return <span className="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded animate-pulse">CRITICAL</span>;
    if (priority === 'High') return <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">HIGH</span>;
    return null;
  };

  // KPI Calculations
  const totalSpend = purchaseOrders.reduce((acc, po) => acc + po.totalValue, 0);
  const lateOrders = purchaseOrders.filter(po => po.status === 'Late').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden w-full">
      
      {/* 1. Dashboard Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-200">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Procurement & POs</h3>
              <p className="text-sm text-slate-500 font-medium">Manage Suppliers & Inbound Logistics</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Download size={16} /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
              <Plus size={16} /> Create PO
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Committed Spend</p>
            <div className="flex items-center gap-2 mt-1">
              <DollarSign size={20} className="text-emerald-500" />
              <span className="text-2xl font-bold text-slate-800">{totalSpend.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Orders</p>
            <div className="flex items-center gap-2 mt-1">
              <Truck size={20} className="text-blue-500" />
              <span className="text-2xl font-bold text-slate-800">{purchaseOrders.length}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Alerts</p>
             <div className="flex items-center gap-2 mt-1">
              <AlertCircle size={20} className="text-rose-500" />
              <span className="text-2xl font-bold text-slate-800">{lateOrders} Late</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center bg-white">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
          {['All', 'Pending', 'Partial', 'Received', 'Late'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${filterStatus === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative flex-1 w-full">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
           <input 
             type="text" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search Vendor, PO#, or Material..." 
             className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
           />
        </div>
      </div>

      {/* 3. Detailed Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 w-8"></th>
              <th className="px-6 py-3">PO Reference / Material</th>
              <th className="px-6 py-3">Vendor Info</th>
              <th className="px-6 py-3 text-right">Value</th>
              <th className="px-6 py-3 w-48">Timeline</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredPOs.map((po) => {
              const statusStyle = getStatusStyle(po.status);
              const percent = (po.receivedQty / po.orderQty) * 100;
              const isExpanded = expandedId === po.id;

              return (
                <React.Fragment key={po.id}>
                  <tr 
                    onClick={() => toggleExpand(po.id)}
                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50/20' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4 text-slate-400">
                       {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-400 mt-1">
                          <FileText size={16} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                             <span className="font-bold text-slate-800">{po.id}</span>
                             {getPriorityBadge(po.priority)}
                          </div>
                          <p className="text-sm font-medium text-slate-600 mt-0.5">{po.material}</p>
                          <p className="text-xs text-slate-400 font-mono">{po.sku}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700">{po.vendor}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <div className="flex items-center gap-0.5">
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold text-slate-500">{po.vendorRating}</span>
                         </div>
                         <span className={`text-[9px] px-1.5 rounded border ${po.riskLevel === 'High' ? 'border-rose-200 text-rose-600 bg-rose-50' : 'border-slate-200 text-slate-400'}`}>
                           {po.riskLevel} Risk
                         </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-slate-800">${po.totalValue.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">{po.orderQty.toLocaleString()} units</p>
                    </td>

                    <td className="px-6 py-4">
                       <div className="flex justify-between text-[10px] mb-1 text-slate-400 uppercase font-bold">
                          <span>Received</span>
                          <span>{percent.toFixed(0)}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                         <div 
                           className={`h-full rounded-full ${po.status === 'Late' ? 'bg-rose-500' : 'bg-blue-500'}`} 
                           style={{ width: `${Math.max(5, percent)}%` }}
                         ></div>
                       </div>
                       <span className={`text-xs font-bold ${po.status === 'Late' ? 'text-rose-500' : 'text-slate-600'}`}>
                          Due: {po.deliveryDate}
                       </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusStyle.color}`}>
                        {statusStyle.icon} {statusStyle.label}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded View */}
                  {isExpanded && (
                    <tr className="bg-blue-50/10 border-b border-blue-50">
                       <td colSpan="7" className="px-6 py-0">
                          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-1">
                             
                             {/* Operations Info */}
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Operations Impact</h4>
                                {po.impact !== 'None' ? (
                                   <div className="flex items-center gap-2 text-rose-600 bg-rose-50 p-2 rounded border border-rose-100 mb-2">
                                      <AlertCircle size={16}/> 
                                      <span className="text-xs font-bold">{po.impact}</span>
                                   </div>
                                ) : (
                                   <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-2 rounded border border-emerald-100 mb-2">
                                      <CheckCircle size={16}/> 
                                      <span className="text-xs font-bold">On Schedule</span>
                                   </div>
                                )}
                                <div className="text-xs text-slate-500">Ordered: {po.orderDate}</div>
                             </div>

                             {/* Actions */}
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-2">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Quick Actions</h4>
                                <div className="grid grid-cols-2 gap-2">
                                   <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:text-blue-600">
                                      <Mail size={14}/> Email Vendor
                                   </button>
                                   <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:text-rose-600">
                                      <Zap size={14}/> Expedite
                                   </button>
                                </div>
                                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700">
                                   <Truck size={14}/> Track Shipment
                                </button>
                             </div>

                             {/* Analytics */}
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-center">
                                <div className="text-center">
                                   <BarChart3 size={24} className="mx-auto text-slate-300 mb-2"/>
                                   <p className="text-xs text-slate-500">Spend Analytics &<br/>Vendor History</p>
                                   <button className="mt-2 text-xs font-bold text-blue-600 underline">View Report</button>
                                </div>
                             </div>

                          </div>
                       </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Procurement;
