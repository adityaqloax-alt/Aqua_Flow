import React, { useState } from 'react';
import { 
  Package, 
  Beaker, 
  Droplets, 
  AlertTriangle, 
  ShoppingCart, 
  MoreHorizontal, 
  Search, 
  Filter, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Clock,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Truck
} from 'lucide-react';

const RawMaterials = () => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Enterprise Data Structure
  const materials = [
    { 
      id: 'RM-001',
      name: '20L Polycarbonate Preforms',
      sku: 'PKG-PRE-20L',
      category: 'Packaging',
      qty: 1200, 
      minThreshold: 1500, 
      maxCapacity: 5000,
      unit: 'pcs', 
      dailyUsage: 100, 
      trend: 'up', // consumption increasing
      supplier: 'JarCo Industries',
      leadTime: 3, // days
      supplierRating: 4.8,
      location: 'Whs A - Row 1',
      lastRestock: 'Dec 15',
      pendingPO: null
    },
    { 
      id: 'RM-002',
      name: '28mm Screw Caps (Blue)',
      sku: 'PKG-CAP-28',
      category: 'Packaging',
      qty: 45000, 
      minThreshold: 10000,
      maxCapacity: 100000,
      unit: 'pcs', 
      dailyUsage: 2000,
      trend: 'stable',
      supplier: 'CapCorp Global',
      leadTime: 5,
      supplierRating: 4.2,
      location: 'Whs A - Row 2',
      lastRestock: 'Dec 20',
      pendingPO: 'PO-881'
    },
    { 
      id: 'RM-003',
      name: 'Chlorine Tablets (Cleaning)',
      sku: 'CHM-CL-TAB',
      category: 'Chemicals',
      qty: 45, 
      minThreshold: 50, 
      maxCapacity: 200,
      unit: 'kg', 
      dailyUsage: 5,
      trend: 'stable',
      supplier: 'ChemWorks Inc.',
      leadTime: 7,
      supplierRating: 3.9,
      location: 'HazMat Storage',
      lastRestock: 'Nov 30',
      pendingPO: null
    },
    { 
      id: 'RM-004',
      name: 'Adhesive Labels (Gloss)',
      sku: 'PKG-LBL-01',
      category: 'Packaging',
      qty: 8000, 
      minThreshold: 2000,
      maxCapacity: 15000,
      unit: 'rolls', 
      dailyUsage: 150,
      trend: 'down',
      supplier: 'LabelPro',
      leadTime: 2,
      supplierRating: 4.5,
      location: 'Whs B - Rack 4',
      lastRestock: 'Dec 22',
      pendingPO: 'PO-885'
    },
    { 
      id: 'RM-005',
      name: 'Mineral Additive (Mg)',
      sku: 'ING-MIN-MG',
      category: 'Ingredients',
      qty: 300, 
      minThreshold: 100,
      maxCapacity: 500,
      unit: 'kg', 
      dailyUsage: 10,
      trend: 'stable',
      supplier: 'PureMinerals',
      leadTime: 14,
      supplierRating: 4.0,
      location: 'Dry Storage',
      lastRestock: 'Dec 01',
      pendingPO: null
    },
  ];

  // Logic Helpers
  const getStockHealth = (item) => {
    const ratio = item.qty / item.minThreshold;
    if (ratio <= 1) return { status: 'Critical', color: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-600', badge: 'Critical Low' };
    if (ratio <= 1.25) return { status: 'Low', color: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-600', badge: 'Reorder Soon' };
    return { status: 'Good', color: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'Healthy' };
  };

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'Chemicals': return <Beaker size={16} />;
      case 'Ingredients': return <Droplets size={16} />;
      default: return <Package size={16} />;
    }
  };

  const calculateRunway = (qty, usage) => {
    if(!usage) return 999;
    return Math.floor(qty / usage);
  };

  // Filter Logic
  const filteredMaterials = materials.filter(m => {
    const matchesCategory = categoryFilter === 'All' || m.category === categoryFilter;
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  // KPI Calculations
  const criticalItems = materials.filter(m => m.qty <= m.minThreshold).length;
  const lowStockItems = materials.filter(m => m.qty > m.minThreshold && m.qty <= m.minThreshold * 1.25).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden w-full">
      
      {/* 1. Command Center Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-600 rounded-xl text-white shadow-md shadow-cyan-200">
              <Package size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Raw Materials</h3>
              <p className="text-sm text-slate-500 font-medium">Supply Planning & Reordering</p>
            </div>
          </div>
          
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
               <BarChart3 size={16} /> Forecast
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-sm font-bold rounded-lg shadow-md shadow-rose-200 hover:bg-rose-700 transition-all">
               <ShoppingCart size={16} /> Bulk Reorder
             </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
           <div className="bg-white p-3 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total SKUs</p>
              <p className="text-lg font-bold text-slate-800">{materials.length}</p>
           </div>
           <div className="bg-white p-3 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Critical Low</p>
              <p className="text-lg font-bold text-rose-600">{criticalItems}</p>
           </div>
           <div className="bg-white p-3 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reorder Soon</p>
              <p className="text-lg font-bold text-amber-500">{lowStockItems}</p>
           </div>
           <div className="bg-white p-3 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending POs</p>
              <p className="text-lg font-bold text-blue-600">2</p>
           </div>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
           <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
              {['All', 'Packaging', 'Chemicals', 'Ingredients'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                    categoryFilter === cat 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
           
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Material or SKU..." 
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500/20" 
              />
           </div>
        </div>
      </div>

      {/* 2. Main Inventory Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 w-8"></th>
              <th className="px-6 py-3">Material Details</th>
              <th className="px-6 py-3 w-1/3">Stock Level & Threshold</th>
              <th className="px-6 py-3 text-center">Runway</th>
              <th className="px-6 py-3">Supplier Info</th>
              <th className="px-6 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredMaterials.map((item) => {
              const health = getStockHealth(item);
              const daysLeft = calculateRunway(item.qty, item.dailyUsage);
              const fillPercent = Math.min(100, (item.qty / item.maxCapacity) * 100);
              const markerPercent = (item.minThreshold / item.maxCapacity) * 100;
              const isExpanded = expandedId === item.id;
              
              // Stockout Risk Logic: If days left < lead time + buffer(2 days)
              const isStockoutRisk = daysLeft < (item.leadTime + 2);

              return (
                <React.Fragment key={item.id}>
                  <tr 
                    onClick={() => toggleExpand(item.id)}
                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-cyan-50/20' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4 text-slate-400">
                       {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-400 mt-1">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className="text-xs text-slate-500 font-mono">{item.sku}</span>
                             <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 rounded border border-slate-200">{item.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-between items-end mb-1">
                        <span className="font-bold text-slate-700 text-base">
                          {item.qty.toLocaleString()} <span className="text-xs text-slate-400 font-normal">{item.unit}</span>
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${health.bg} ${health.text}`}>
                          {health.badge}
                        </span>
                      </div>
                      
                      {/* Progress Bar with Threshold Marker */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
                        {/* Marker Line */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10" 
                          style={{ left: `${markerPercent}%` }}
                          title={`Reorder Point: ${item.minThreshold}`}
                        ></div>
                        {/* Fill */}
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${health.color}`} 
                          style={{ width: `${fillPercent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                        <span className="text-rose-400 font-bold">Min: {item.minThreshold.toLocaleString()}</span>
                        <span>Max: {item.maxCapacity.toLocaleString()}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className={`text-xl font-bold ${daysLeft < 7 ? 'text-rose-600' : 'text-slate-700'}`}>
                          {daysLeft}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Days Left</span>
                      </div>
                      {isStockoutRisk && (
                         <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                           <AlertTriangle size={10}/> Risk
                         </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700">{item.supplier}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                           <Clock size={12} className="text-slate-400" />
                           <span>{item.leadTime} Days</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                       <button className="text-slate-400 hover:text-cyan-600">
                         <MoreHorizontal size={18} />
                       </button>
                    </td>
                  </tr>

                  {/* Expanded View */}
                  {isExpanded && (
                    <tr className="bg-cyan-50/10 border-b border-cyan-50">
                       <td colSpan="6" className="px-6 py-0">
                          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-1">
                             
                             {/* Usage Stats */}
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Consumption Analysis</h4>
                                <div className="flex justify-between items-center mb-1">
                                   <span className="text-xs text-slate-500">Daily Usage</span>
                                   <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                                      {item.dailyUsage} {item.unit}
                                      {item.trend === 'up' && <TrendingUp size={12} className="text-rose-500"/>}
                                      {item.trend === 'down' && <TrendingDown size={12} className="text-emerald-500"/>}
                                   </span>
                                </div>
                                <div className="text-xs text-slate-500">
                                   Last Restock: <span className="font-bold text-slate-700">{item.lastRestock}</span>
                                </div>
                             </div>

                             {/* Action Center */}
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col justify-center gap-2">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Supply Actions</h4>
                                {item.pendingPO ? (
                                   <div className="flex items-center justify-between bg-blue-50 p-2 rounded border border-blue-100 text-blue-700 text-xs font-bold">
                                      <span>On Order: {item.pendingPO}</span>
                                      <Truck size={14}/>
                                   </div>
                                ) : (
                                   <button className="w-full py-2 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 flex items-center justify-center gap-2 shadow-sm">
                                      <ShoppingCart size={14}/> Create Reorder PO
                                   </button>
                                )}
                                <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50">
                                   View History
                                </button>
                             </div>

                             {/* Supplier Insight */}
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center flex flex-col justify-center">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Supplier Reliability</h4>
                                <div className="text-2xl font-bold text-slate-800">{item.supplierRating} <span className="text-sm text-slate-400 font-normal">/ 5.0</span></div>
                                <p className="text-[10px] text-slate-500 mt-1">Based on last 10 deliveries</p>
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

export default RawMaterials;
