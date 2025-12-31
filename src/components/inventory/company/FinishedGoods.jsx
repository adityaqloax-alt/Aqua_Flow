import React, { useState } from 'react';
import { 
  Box, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Lock, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowRight,
  TrendingUp,
  PackageCheck,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  Truck,
  LayoutGrid,
  List
} from 'lucide-react';

const FinishedGoods = () => {
  const [viewMode, setViewMode] = useState('list'); // list or map
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Enterprise Data Model
  const inventory = [
    { 
      id: 'FG-001',
      product: '500ml Premium Mineral',
      sku: 'AQ-MIN-500',
      batch: 'B-101-A',
      qty: 850, 
      reserved: 200, // Allocated to orders
      unitValue: 0.45,
      location: 'Zone A - Rack 04',
      status: 'Ready', 
      productionDate: '2025-12-25',
      expiryDate: '2026-12-25',
      daysToExpiry: 365,
      turnoverRate: 'High'
    },
    { 
      id: 'FG-002',
      product: '20L Dispenser Jar',
      sku: 'AQ-JAR-20L',
      batch: 'B-102-C',
      qty: 240, 
      reserved: 0,
      unitValue: 3.50,
      location: 'Zone B - Floor',
      status: 'Quarantine', 
      productionDate: '2025-12-28',
      expiryDate: '2026-06-28',
      daysToExpiry: 180,
      turnoverRate: 'Medium',
      qcNote: 'Seal integrity test pending'
    },
    { 
      id: 'FG-003',
      product: '1L Sports Cap',
      sku: 'AQ-SPT-1L',
      batch: 'B-099-X',
      qty: 1200, 
      reserved: 1200, // Fully allocated
      unitValue: 0.80,
      location: 'Zone A - Rack 02',
      status: 'Reserved', 
      productionDate: '2025-12-20',
      expiryDate: '2026-01-20', // Expiring Soon
      daysToExpiry: 25,
      turnoverRate: 'High'
    },
    { 
      id: 'FG-004',
      product: '500ml Sparkling',
      sku: 'AQ-SPK-500',
      batch: 'B-103-S',
      qty: 400, 
      reserved: 50,
      unitValue: 0.60,
      location: 'Zone C - Cool Storage',
      status: 'Ready', 
      productionDate: '2025-12-23',
      expiryDate: '2026-12-23',
      daysToExpiry: 360,
      turnoverRate: 'Low'
    },
  ];

  // Logic for Status Badges
  const getStatusConfig = (status, daysToExpiry) => {
    if (daysToExpiry < 30) return { icon: <AlertOctagon size={14}/>, class: 'bg-rose-50 text-rose-700 border-rose-100', label: 'Expiring Soon' };
    
    switch (status) {
      case 'Ready': return { icon: <CheckCircle size={14} />, class: 'bg-emerald-50 text-emerald-700 border-emerald-100', label: 'Released' };
      case 'Quarantine': return { icon: <Clock size={14} />, class: 'bg-amber-50 text-amber-700 border-amber-100', label: 'QC Hold' };
      case 'Reserved': return { icon: <Lock size={14} />, class: 'bg-indigo-50 text-indigo-700 border-indigo-100', label: 'Allocated' };
      default: return { icon: null, class: '', label: status };
    }
  };

  // Filter Logic
  const filteredInventory = inventory.filter(i => {
    const matchesStatus = filterStatus === 'All' || i.status === filterStatus;
    const matchesSearch = i.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.batch.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  // KPI Calculations
  const totalStockValue = inventory.reduce((acc, item) => acc + (item.qty * item.unitValue), 0);
  const totalUnits = inventory.reduce((acc, item) => acc + item.qty, 0);
  const reservedUnits = inventory.reduce((acc, item) => acc + item.reserved, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden w-full">
      
      {/* 1. Dashboard Header (KPIs) */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-200">
              <PackageCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Finished Goods</h3>
              <p className="text-sm text-slate-500 font-medium">Ready-to-Ship Inventory</p>
            </div>
          </div>
          
          <div className="flex gap-2">
             <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-100 text-indigo-600' : 'text-slate-400'}`}
                >
                  <List size={18}/>
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded ${viewMode === 'map' ? 'bg-slate-100 text-indigo-600' : 'text-slate-400'}`}
                >
                  <LayoutGrid size={18}/>
                </button>
             </div>
             <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
               <TrendingUp size={14} /> Forecast
             </button>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Value</p>
            <p className="text-lg font-bold text-slate-800">${totalStockValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Units</p>
            <p className="text-lg font-bold text-slate-800">{totalUnits.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Committed Stock</p>
             <p className="text-lg font-bold text-indigo-600">{((reservedUnits / totalUnits) * 100).toFixed(1)}%</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weeks of Supply</p>
             <p className="text-lg font-bold text-emerald-600">3.2 Wks</p>
          </div>
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center bg-white">
        {/* Filter Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
          {['All', 'Ready', 'Quarantine', 'Reserved'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${filterStatus === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 w-full">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
           <input 
             type="text" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search Batch or SKU..." 
             className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500/20" 
           />
        </div>
      </div>

      {/* 3. The Grid/Table */}
      {viewMode === 'list' ? (
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 w-8"></th>
                <th className="px-6 py-3">Product / SKU</th>
                <th className="px-6 py-3">Status & Qty</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3 text-right">Expiry Risk</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredInventory.map((item) => {
                const statusStyle = getStatusConfig(item.status, item.daysToExpiry);
                const isExpanded = expandedId === item.id;
                const percentReserved = (item.reserved / item.qty) * 100;

                return (
                  <React.Fragment key={item.id}>
                    <tr 
                      onClick={() => toggleExpand(item.id)}
                      className={`cursor-pointer transition-colors ${isExpanded ? 'bg-indigo-50/20' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-6 py-4 text-slate-400">
                        {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                             FG
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{item.product}</p>
                            <div className="flex items-center gap-2">
                               <span className="text-xs text-slate-500 font-mono">{item.sku}</span>
                               <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 rounded border border-slate-200">{item.batch}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 w-64">
                         <div className="flex justify-between text-xs mb-1">
                            <span className="font-bold text-slate-700">{item.qty} Total</span>
                            <span className="text-slate-500">{item.reserved} Reserved</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                            <div className="h-full bg-indigo-500" style={{ width: `${percentReserved}%` }}></div>
                            <div className="h-full bg-emerald-400" style={{ width: `${100 - percentReserved}%` }}></div>
                         </div>
                         <div className="mt-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusStyle.class}`}>
                              {statusStyle.icon} {statusStyle.label}
                            </span>
                         </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin size={16} className="text-indigo-400" />
                          <span className="font-medium text-xs">{item.location}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                         <p className="text-xs font-mono text-slate-600">{item.expiryDate}</p>
                         <p className={`text-[10px] font-bold mt-0.5 ${item.daysToExpiry < 30 ? 'text-rose-600' : 'text-emerald-600'}`}>
                           {item.daysToExpiry} days left
                         </p>
                      </td>

                      <td className="px-6 py-4 text-right">
                         <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                           <MoreVertical size={18} />
                         </button>
                      </td>
                    </tr>

                    {/* Expanded View */}
                    {isExpanded && (
                      <tr className="bg-indigo-50/10 border-b border-indigo-50">
                        <td colSpan="6" className="px-6 py-0">
                           <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-1">
                              
                              {/* Valuation */}
                              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                 <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Valuation</h4>
                                 <div className="flex justify-between">
                                    <span className="text-xs text-slate-500">Unit Cost</span>
                                    <span className="text-sm font-bold text-slate-700">${item.unitValue.toFixed(2)}</span>
                                 </div>
                                 <div className="flex justify-between mt-1">
                                    <span className="text-xs text-slate-500">Total Value</span>
                                    <span className="text-sm font-bold text-indigo-600">${(item.qty * item.unitValue).toFixed(2)}</span>
                                 </div>
                              </div>

                              {/* Operations */}
                              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                 <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Details</h4>
                                 <p className="text-xs text-slate-600">Turnover Rate: <span className="font-bold">{item.turnoverRate}</span></p>
                                 {item.qcNote && <p className="text-xs text-rose-600 mt-1 font-bold bg-rose-50 p-1 rounded">Note: {item.qcNote}</p>}
                              </div>

                              {/* Actions */}
                              <div className="flex flex-col justify-center gap-2">
                                 <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 flex items-center justify-center gap-2">
                                   <Truck size={14}/> Create Shipment
                                 </button>
                                 <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50">
                                   Move Stock
                                 </button>
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
      ) : (
        /* Visual Map Mode (Simplified Placeholder) */
        <div className="flex-1 p-6 bg-slate-50 overflow-y-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Zone A', 'Zone B', 'Zone C'].map((zone, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm min-h-[300px]">
                   <h4 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
                     {zone} 
                     <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded">85% Full</span>
                   </h4>
                   <div className="grid grid-cols-2 gap-2">
                      {[1,2,3,4,5,6].map(rack => (
                        <div key={rack} className={`h-16 rounded border border-slate-100 flex items-center justify-center text-xs font-bold ${rack % 2 === 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-300'}`}>
                           Rack {rack}
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default FinishedGoods;
