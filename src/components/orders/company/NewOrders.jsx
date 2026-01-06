import React, { useState, useEffect } from 'react';
import { 
  Check, X, AlertTriangle, CreditCard, User, PackageCheck, 
  ShieldAlert, Info, Download, CheckCircle2, Filter, 
  ArrowUpRight, Truck, MoreVertical, MapPin, Navigation,
  Zap, TrendingUp, Clock, Route, Gift, Send, Plus, DollarSign
} from 'lucide-react';

const NewOrders = () => {
  const [filter, setFilter] = useState('All');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showRouteOpportunities, setShowRouteOpportunities] = useState(true);
  const [overrideId, setOverrideId] = useState(null);

  // === REGULAR INCOMING ORDERS ===
  const [orders, setOrders] = useState([
    { 
      id: "ORD-2026-1051", 
      customer: "Kolhapur Beverages Ltd", 
      amount: 15000, 
      creditLimit: 50000, 
      currentDebt: 10000, 
      items: "50x 20L Jars",
      jars: 50,
      stockStatus: 'Available', 
      date: "10:30 AM", 
      priority: 'High', 
      paymentMode: 'Credit',
      warehouse: 'WH-Pune', 
      allocation: 100,
      type: 'regular',
      city: "Kolhapur",
      address: "Rajarampuri, Kolhapur, Maharashtra"
    },
    { 
      id: "ORD-2026-1052", 
      customer: "City Hospital", 
      amount: 45000, 
      creditLimit: 100000, 
      currentDebt: 95000, 
      items: "200x 20L Jars",
      jars: 200,
      stockStatus: 'Low Stock', 
      date: "10:45 AM", 
      priority: 'Critical', 
      paymentMode: 'Credit',
      warehouse: 'WH-Central', 
      allocation: 45,
      type: 'regular',
      city: "Mumbai",
      address: "Andheri, Mumbai, Maharashtra"
    }, 
    { 
      id: "ORD-2026-1053", 
      customer: "Tech Park Cafe", 
      amount: 2000, 
      creditLimit: 10000, 
      currentDebt: 0, 
      items: "10x 20L Jars",
      jars: 10,
      stockStatus: 'Available', 
      date: "11:00 AM", 
      priority: 'Normal', 
      paymentMode: 'Cash',
      warehouse: 'WH-South', 
      allocation: 100,
      type: 'regular',
      city: "Pune",
      address: "Hinjewadi, Pune, Maharashtra"
    }
  ]);

  // === ROUTE CONFIGURATION ===
  const [activeRoute, setActiveRoute] = useState(null);

  // === ROUTE CUSTOMERS DATABASE ===
  const [routeCustomers] = useState([
    { 
      id: "CUST-001", 
      name: "Hotel Shirwal Grand", 
      city: "Shirwal",
      address: "NH 48, Shirwal, Maharashtra",
      contact: "+91 98765 11111",
      avgOrder: 15,
      frequency: "Weekly",
      lastOrder: "10 days ago",
      creditLimit: 30000,
      currentDebt: 5000,
      tier: "Gold",
      distanceFromRoute: 2.3,
      estimatedETA: "09:30 AM"
    },
    { 
      id: "CUST-002", 
      name: "Satara City Hospital", 
      city: "Satara",
      address: "Powai Naka, Satara, Maharashtra",
      contact: "+91 98765 22222",
      avgOrder: 25,
      frequency: "Bi-weekly",
      lastOrder: "5 days ago",
      creditLimit: 80000,
      currentDebt: 20000,
      tier: "Platinum",
      distanceFromRoute: 1.8,
      estimatedETA: "11:00 AM"
    },
    { 
      id: "CUST-003", 
      name: "Karad Sports Complex", 
      city: "Karad",
      address: "Krishna River Road, Karad, Maharashtra",
      contact: "+91 98765 33333",
      avgOrder: 20,
      frequency: "Weekly",
      lastOrder: "3 days ago",
      creditLimit: 50000,
      currentDebt: 15000,
      tier: "Gold",
      distanceFromRoute: 4.2,
      estimatedETA: "12:30 PM"
    }
  ]);

  // Detect if there's a major order that triggers route optimization
  useEffect(() => {
    const mainOrder = orders.find(o => 
      o.city === "Kolhapur" && o.jars >= 50 && o.type === 'regular'
    );

    if (mainOrder) {
      setActiveRoute({
        mainOrderId: mainOrder.id,
        origin: "Pune",
        destination: mainOrder.city,
        truckCapacity: 100,
        allocatedJars: mainOrder.jars,
        remainingJars: 100 - mainOrder.jars,
        corridorWidth: 7,
        departureTime: "Tomorrow 08:00 AM",
        cutoffTime: "Today 06:00 PM"
      });
    }
  }, [orders]);

  // === FILTER CUSTOMERS WITHIN ROUTE CORRIDOR ===
  const getRouteOpportunities = () => {
    if (!activeRoute) return [];

    return routeCustomers.filter(customer => {
      // Business Rule: Max 7km deviation
      if (customer.distanceFromRoute > activeRoute.corridorWidth) return false;

      // Check credit availability
      const creditAvailable = customer.creditLimit - customer.currentDebt;
      const estimatedOrderValue = customer.avgOrder * 300;
      if (creditAvailable < estimatedOrderValue) return false;

      // Check if it fits remaining truck capacity
      if (customer.avgOrder > activeRoute.remainingJars) return false;

      return true;
    });
  };

  const routeOpportunities = getRouteOpportunities();

  // === CALCULATE ROUTE KPIs ===
  const calculateRouteKPIs = () => {
    const selectedRouteOrders = routeOpportunities.filter(c => 
      selectedOrders.includes(`ROUTE-${c.id}`)
    );

    const additionalJars = selectedRouteOrders.reduce((sum, c) => sum + c.avgOrder, 0);
    const totalJars = activeRoute ? activeRoute.allocatedJars + additionalJars : 0;
    const utilization = activeRoute ? (totalJars / activeRoute.truckCapacity) * 100 : 0;
    const additionalRevenue = additionalJars * 300;

    return {
      additionalJars,
      totalJars,
      utilization,
      additionalRevenue,
      costPerJarReduction: utilization > 70 ? 25 : 0
    };
  };

  const kpis = calculateRouteKPIs();

  // === ACTIONS ===
  const handleAction = (id, action) => {
    if (action === 'Override') {
      alert(`Manager Override Authorized for ${id}`);
    }
    if (action === 'Approved') {
      alert(`✅ Order ${id} approved and moved to In-Process`);
    }
    setOrders(orders.filter(o => o.id !== id));
    setOverrideId(null);
  };

  const toggleSelection = (id) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSendOffer = (customer) => {
    const message = `🚛 Special Same-Day Delivery!\n\nHi ${customer.name},\n\nOur truck is heading to Kolhapur TODAY and will pass through ${customer.city}.\n\n✨ We have space for ${activeRoute?.remainingJars || 0} jars\n⏰ Estimated arrival: ${customer.estimatedETA}\n🎁 ZERO extra delivery charge!\n💰 20% discount on same-day orders\n\nOrder within next 2 hours: ${activeRoute?.cutoffTime || 'Soon'}\n\nReply YES to confirm ${customer.avgOrder} jars.`;

    alert(`📨 Sending offer via WhatsApp to:\n\n${customer.name}\n${customer.contact}\n\n${message}`);
  };

  const handleAddToTrip = (customer) => {
    const newOrder = {
      id: `ORD-ROUTE-${customer.id}`,
      customer: customer.name,
      amount: customer.avgOrder * 300,
      creditLimit: customer.creditLimit,
      currentDebt: customer.currentDebt,
      items: `${customer.avgOrder}x 20L Jars`,
      jars: customer.avgOrder,
      stockStatus: 'Available',
      date: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      priority: 'Route Opportunity',
      paymentMode: 'Credit',
      warehouse: 'WH-Pune',
      allocation: 100,
      type: 'route_opportunity',
      city: customer.city,
      address: customer.address
    };

    setOrders([...orders, newOrder]);
    alert(`✅ ${customer.name} added to trip!\n\nOrder ${newOrder.id} created and auto-approved.`);
  };

  const getFilteredOrders = () => {
    if (filter === 'Critical') return orders.filter(o => o.priority === 'Critical');
    if (filter === 'Risk') return orders.filter(o => ((o.currentDebt + o.amount) / o.creditLimit) > 0.9);
    if (filter === 'Route') return orders.filter(o => o.type === 'route_opportunity');
    return orders;
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      
      {/* === HEADER & CONTROLS === */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Incoming Orders 
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
              {orders.length}
            </span>
          </h2>
          <p className="text-sm text-slate-500">Review and approve customer purchase orders</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['All', 'Critical', 'Risk', 'Route'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  filter === f 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* === ROUTE OPPORTUNITY BANNER === */}
      {activeRoute && showRouteOpportunities && routeOpportunities.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Route size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">🚚 Route Opportunity Detected!</h3>
                  <p className="text-indigo-100 text-sm mt-1">
                    {routeOpportunities.length} customers found along {activeRoute.origin} → {activeRoute.destination} route
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                  <p className="text-indigo-100 text-xs mb-1">Remaining Capacity</p>
                  <p className="font-bold text-lg">{activeRoute.remainingJars} Jars</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                  <p className="text-indigo-100 text-xs mb-1">Cut-off Time</p>
                  <p className="font-bold text-lg">{activeRoute.cutoffTime}</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                  <p className="text-indigo-100 text-xs mb-1">Potential Revenue</p>
                  <p className="font-bold text-lg">
                    +₹{(routeOpportunities.reduce((sum, c) => sum + c.avgOrder, 0) * 300).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur p-4 rounded-lg border border-white/30">
              <div className="text-center mb-2">
                <p className="text-xs text-indigo-100 mb-1">Current Utilization</p>
                <p className="text-3xl font-bold">{Math.round(kpis.utilization)}%</p>
              </div>
              <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${kpis.utilization}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === KPI IMPACT CARDS === */}
      {selectedOrders.some(id => id.startsWith('ROUTE-')) && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase">Utilization ↑</span>
            </div>
            <p className="text-2xl font-bold text-emerald-900">{Math.round(kpis.utilization)}%</p>
            <p className="text-xs text-emerald-700 mt-1">+{kpis.additionalJars} jars added</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Truck size={16} className="text-blue-600" />
              <span className="text-xs font-bold text-blue-700 uppercase">Orders Out ↑</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              +{selectedOrders.filter(id => id.startsWith('ROUTE-')).length}
            </p>
            <p className="text-xs text-blue-700 mt-1">Same-day deliveries</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-purple-600" />
              <span className="text-xs font-bold text-purple-700 uppercase">Revenue ↑</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">
              +₹{kpis.additionalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-purple-700 mt-1">Extra income</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-amber-600" />
              <span className="text-xs font-bold text-amber-700 uppercase">Cost/Jar ↓</span>
            </div>
            <p className="text-2xl font-bold text-amber-900">-{kpis.costPerJarReduction}%</p>
            <p className="text-xs text-amber-700 mt-1">Efficiency gain</p>
          </div>
        </div>
      )}

      {/* === ROUTE OPPORTUNITY CUSTOMERS === */}
      {activeRoute && showRouteOpportunities && routeOpportunities.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Zap size={20} /> Route Opportunity Orders
              </h3>
              <p className="text-xs text-purple-100 mt-1">
                Customers within {activeRoute.corridorWidth}km of {activeRoute.origin} → {activeRoute.destination}
              </p>
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
              {routeOpportunities.length} Available
            </span>
          </div>

          <div className="p-4 space-y-3">
            {routeOpportunities.map((customer, idx) => {
              const creditAvailable = customer.creditLimit - customer.currentDebt;
              const estimatedOrderValue = customer.avgOrder * 300;

              return (
                <div 
                  key={customer.id}
                  className="p-4 rounded-xl border-2 bg-slate-50 border-slate-200 hover:border-purple-300 transition-all"
                >
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                    
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-800">{customer.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            customer.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                            customer.tier === 'Gold' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            {customer.tier}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin size={10} /> {customer.city}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                          <span>{customer.distanceFromRoute}km off route</span>
                          <span>ETA: {customer.estimatedETA}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white p-2 rounded-lg text-center border">
                        <p className="text-sm font-bold">{customer.avgOrder}</p>
                        <p className="text-[9px] text-slate-500">Jars</p>
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center border">
                        <p className="text-sm font-bold">₹{(estimatedOrderValue/1000).toFixed(1)}k</p>
                        <p className="text-[9px] text-slate-500">Value</p>
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center border">
                        <p className="text-sm font-bold">₹{(creditAvailable/1000).toFixed(0)}k</p>
                        <p className="text-[9px] text-slate-500">Credit</p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full lg:w-auto">
                      <button
                        onClick={() => handleSendOffer(customer)}
                        className="flex-1 lg:flex-initial px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                      >
                        <Send size={14} /> Send Offer
                      </button>
                      <button
                        onClick={() => handleAddToTrip(customer)}
                        className="flex-1 lg:flex-initial px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 flex items-center justify-center gap-2"
                      >
                        <Plus size={14} /> Add to Trip
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* === REGULAR ORDERS GRID === */}
      <div className="grid gap-4">
        {getFilteredOrders().map((order) => {
          const totalAfterOrder = order.currentDebt + order.amount;
          const utilization = (totalAfterOrder / order.creditLimit) * 100;
          const isCreditRisk = utilization > 90;
          const isStockIssue = order.stockStatus === 'Low Stock';
          const isRouteOrder = order.type === 'route_opportunity';

          return (
            <div 
              key={order.id} 
              className={`bg-white rounded-xl border transition-all hover:shadow-md relative overflow-hidden ${
                isRouteOrder ? 'border-purple-300 bg-purple-50/30' :
                isCreditRisk ? 'border-amber-200' : 
                'border-slate-200'
              }`}
            >
              
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                isRouteOrder ? 'bg-purple-500' :
                order.priority === 'Critical' ? 'bg-rose-500' : 
                isCreditRisk ? 'bg-amber-500' : 
                'bg-emerald-500'
              }`} />

              <div className="p-5 pl-7 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                
                <div className="flex items-start gap-4 min-w-[280px]">
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelection(order.id)}
                    className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 cursor-pointer" 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-slate-800">{order.customer}</h3>
                      {order.priority === 'Critical' && (
                        <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          URGENT
                        </span>
                      )}
                      {isRouteOrder && (
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <Zap size={10} /> Route
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded">{order.id}</span>
                      <span className="flex items-center gap-1"><Truck size={12} /> {order.warehouse}</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <PackageCheck size={16} className="text-slate-400" />
                    <span className="font-bold text-slate-700 text-sm">{order.items}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                    isStockIssue ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {order.stockStatus}
                  </span>
                </div>

                <div className="w-full lg:w-64 bg-slate-50 p-3 rounded-lg border">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-semibold">Credit</span>
                    <span className={`font-bold ${isCreditRisk ? 'text-rose-600' : 'text-slate-700'}`}>
                      {Math.round(utilization)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isCreditRisk ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${Math.min(utilization, 100)}%` }} 
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {isCreditRisk && !overrideId && !isRouteOrder ? (
                    <button 
                      onClick={() => setOverrideId(order.id)}
                      className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-bold"
                    >
                      Override
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleAction(order.id, 'Approved')}
                      className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} /> Approve
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewOrders;
