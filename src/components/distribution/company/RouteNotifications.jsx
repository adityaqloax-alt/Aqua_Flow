import React, { useState, useEffect } from "react";
import { 
  Send, MessageSquare, Mail, Smartphone, Zap, CheckCircle, 
  AlertCircle, Clock, Tag, Wand2, Users, Calendar, BarChart3, 
  CheckCircle2, XCircle, MapPin, Truck, History, ShieldAlert,
  ArrowRight, RefreshCw, Radio, Gift, Target, Percent, Package,
  Droplets, DollarSign, Phone
} from 'lucide-react';

const RouteNotifications = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'offers' | 'logs'
  const [channel, setChannel] = useState("whatsapp");
  const [template, setTemplate] = useState("departure");
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [autoTriggerEnabled, setAutoTriggerEnabled] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'in_transit' | 'nearby'
  
  // Real-time Dashboard Metrics
  const [kpi, setKpi] = useState({ 
    openRate: 78, 
    replyRate: 22, 
    deliverySuccess: 94,
    avgResponseTime: '3.5 min'
  });
  
  const [stats, setStats] = useState({ 
    sent: 0, 
    delivered: 0, 
    read: 0, 
    failed: 0, 
    pending: 0 
  });

  // Mock Live Route Context (Connected to RoutePlanning)
  const routeContext = {
    id: "RT-101",
    name: "Tech Park Loop",
    status: "In Transit",
    truckLoc: { lat: 22.5726, lng: 88.3639, name: "Near Salt Lake Sector 5" },
    remainingCapacity: 35, // Jars
    totalDistance: 120,
    currentProgress: 45, // % of route completed
    driver: "Rajesh Kumar",
    driverPhone: "+91 98765 00001",
    vehicle: "WB-02-9988",
    departureTime: "08:30 AM",
    currentTime: "11:45 AM",
    estimatedCompletion: "05:00 PM"
  };

  // INTEGRATED WITH ORDER SYSTEM (From NewOrders, InProcessOrders, etc.)
  const [orders, setOrders] = useState([
    { 
      id: "ORD-2026-1051",
      customer: "TechSpace IT Park",
      contact: "+91 98765 43210",
      email: "admin@techspace.com",
      address: "Building 4, Sector 5, Salt Lake",
      jars: 50,
      amount: 15000,
      status: "In Transit", // From InProcessOrders
      route: "RT-101",
      sequence: 1,
      distance: 5.2, // km from current truck location
      eta: "12:15 PM",
      timeWindow: "12:00 PM - 01:00 PM",
      orderType: "Regular",
      priority: "High",
      notes: "Gate Pass Required. Call 10 mins before arrival.",
      lastOrderDate: "3 days ago",
      avgOrder: 50
    },
    { 
      id: "ORD-2026-1052",
      customer: "Green Valley Apartments",
      contact: "+91 98765 43211",
      email: "security@greenvalley.in",
      address: "12 Main Road, New Town",
      jars: 20,
      amount: 6000,
      status: "Pending", // From NewOrders - needs confirmation
      route: "RT-101",
      sequence: 2,
      distance: 12.8,
      eta: "01:30 PM",
      timeWindow: "01:00 PM - 02:30 PM",
      orderType: "Regular",
      priority: "Medium",
      notes: "Call before arrival. Park near Gate B.",
      lastOrderDate: "5 days ago",
      avgOrder: 25
    },
    { 
      id: "ORD-2026-1053",
      customer: "City Gym & Wellness",
      contact: "+91 98765 43212",
      email: "manager@citygym.com",
      address: "EM Bypass, Kasba",
      jars: 15,
      amount: 4500,
      status: "Approaching", // Driver is <10km away
      route: "RT-101",
      sequence: 3,
      distance: 18.5,
      eta: "02:45 PM",
      timeWindow: "02:30 PM - 04:00 PM",
      orderType: "VIP",
      priority: "High",
      notes: "Use back entrance during peak hours.",
      lastOrderDate: "2 days ago",
      avgOrder: 20
    },
    { 
      id: "ORD-2026-1054",
      customer: "Highway Motel",
      contact: "+91 98765 43213",
      email: "info@highwaymotel.com",
      address: "NH-12, Durgapur Road",
      jars: 10,
      amount: 3000,
      status: "Scheduled", // Delivery scheduled for later
      route: "RT-102",
      sequence: 1,
      distance: 35.2,
      eta: "03:30 PM",
      timeWindow: "03:00 PM - 05:00 PM",
      orderType: "Regular",
      priority: "Low",
      notes: "COD Payment - ₹3000",
      lastOrderDate: "2 weeks ago",
      avgOrder: 15
    },
    { 
      id: "ORD-2026-1055",
      customer: "Sunrise Restaurant",
      contact: "+91 98765 43214",
      email: "chef@sunrise.com",
      address: "Kalyani Township",
      jars: 12,
      amount: 3600,
      status: "Unassigned", // In NewOrders, not yet assigned to route
      route: null,
      sequence: null,
      distance: 52.0,
      eta: "TBD",
      timeWindow: "Flexible",
      orderType: "New Customer",
      priority: "Medium",
      notes: "First order - offer welcome discount",
      lastOrderDate: "Never",
      avgOrder: 0
    }
  ]);

  // Enhanced Templates with Order-Specific Variables
  const templates = {
    departure: { 
      label: "🚛 Departure Alert", 
      subject: "Your delivery is on the way!", 
      body: "Hi {{CustomerName}}! 👋\n\nGreat news! Your order {{OrderId}} is on the way.\n\n📦 Quantity: {{Jars}} jars\n🚛 Vehicle: {{VehicleNo}}\n👤 Driver: {{DriverName}} ({{DriverPhone}})\n⏰ ETA: {{ETA}}\n\nWe'll notify you when we're 15 mins away!\n\nThank you for choosing us! 💧" 
    },
    approaching: { 
      label: "📍 Approaching Alert", 
      subject: "We're nearby - arriving in 15 mins!", 
      body: "Hello {{CustomerName}}! 📍\n\nOur truck is just {{Distance}}km away!\n\n⏰ Arriving in: ~15 minutes\n📦 Your Order: {{Jars}} jars\n🚛 Vehicle: {{VehicleNo}}\n\nPlease be ready to receive the delivery.\n\n{{Notes}}" 
    },
    delay: { 
      label: "⚠️ Delay Update", 
      subject: "Slight delay - updated ETA", 
      body: "Hi {{CustomerName}},\n\nWe're experiencing heavy traffic on {{Location}}. ⚠️\n\n⏰ New ETA: {{NewETA}}\n(Delayed by ~20 mins)\n\n📦 Order: {{OrderId}} - {{Jars}} jars\n\nSorry for the inconvenience! Your water is safe and secured. 💧\n\nDriver {{DriverName}}: {{DriverPhone}}" 
    },
    confirmation: { 
      label: "✅ Confirm Order", 
      subject: "Please confirm your order", 
      body: "Dear {{CustomerName}},\n\nYour order is ready for delivery:\n\n📋 Order ID: {{OrderId}}\n📦 Quantity: {{Jars}} jars\n💰 Amount: ₹{{Amount}}\n⏰ Delivery: {{TimeWindow}}\n\nReply YES to confirm or CHANGE to reschedule.\n\nThank you! 🙏" 
    },
    offer: { 
      label: "🎁 Special Offer", 
      subject: "Exclusive deal for you!", 
      body: "Hi {{CustomerName}}! 🎉\n\nWe noticed you last ordered {{LastOrder}}.\n\nSpecial offer TODAY:\n🎁 {{Discount}}% OFF on orders above {{MinJars}} jars\n🚛 FREE delivery\n⚡ Use code: LOYAL20\n\nOur truck is nearby! Order now: [Link]\n\nValid for next 2 hours only! ⏰" 
    },
    delivered: { 
      label: "✅ Delivery Confirmation", 
      subject: "Delivered successfully!", 
      body: "Hi {{CustomerName}}! ✅\n\nYour order {{OrderId}} has been delivered successfully.\n\n📦 Delivered: {{Jars}} jars\n👤 Received by: {{ReceivedBy}}\n⏰ Time: {{DeliveryTime}}\n\nEmpty jars collected: {{Empties}}\n\nThank you for your business! 💧\nRate your experience: [Link]" 
    }
  };

  // --- SMART FILTERING LOGIC ---
  const getFilteredOrders = () => {
    let filtered = orders;
    
    if (filterStatus === 'pending') {
      filtered = orders.filter(o => o.status === 'Pending' || o.status === 'Unassigned');
    } else if (filterStatus === 'in_transit') {
      filtered = orders.filter(o => o.status === 'In Transit' || o.status === 'Approaching');
    } else if (filterStatus === 'nearby') {
      filtered = orders.filter(o => o.distance <= 20);
    } else if (filterStatus === 'current_route') {
      filtered = orders.filter(o => o.route === routeContext.id);
    }
    
    return filtered.sort((a, b) => {
      // Sort by: 1. Sequence (if on route), 2. Distance
      if (a.sequence && b.sequence) return a.sequence - b.sequence;
      return a.distance - b.distance;
    });
  };

  const targetOrders = getFilteredOrders();

  // --- AI TEMPLATE SELECTOR (Context-Aware) ---
  useEffect(() => {
    if (selectedOrders.length > 0) {
      const firstOrder = orders.find(o => o.id === selectedOrders[0]);
      
      if (firstOrder) {
        if (firstOrder.status === 'Pending' || firstOrder.status === 'Unassigned') {
          setTemplate('confirmation');
        } else if (firstOrder.status === 'Approaching' || firstOrder.distance < 15) {
          setTemplate('approaching');
        } else if (firstOrder.status === 'In Transit') {
          setTemplate('departure');
        }
      }
    }
  }, [selectedOrders]);

  // --- DYNAMIC MESSAGE GENERATION ---
  useEffect(() => {
    if (selectedOrders.length > 0) {
      const order = orders.find(o => o.id === selectedOrders[0]);
      if (order) {
        let msg = templates[template].body;
        
        // Replace variables with real order data
        msg = msg
          .replace(/\{\{CustomerName\}\}/g, order.customer)
          .replace(/\{\{OrderId\}\}/g, order.id)
          .replace(/\{\{Jars\}\}/g, order.jars)
          .replace(/\{\{Amount\}\}/g, order.amount)
          .replace(/\{\{VehicleNo\}\}/g, routeContext.vehicle)
          .replace(/\{\{DriverName\}\}/g, routeContext.driver)
          .replace(/\{\{DriverPhone\}\}/g, routeContext.driverPhone)
          .replace(/\{\{Distance\}\}/g, order.distance)
          .replace(/\{\{ETA\}\}/g, order.eta)
          .replace(/\{\{NewETA\}\}/g, calculateDelayedETA(order.eta, 20))
          .replace(/\{\{TimeWindow\}\}/g, order.timeWindow)
          .replace(/\{\{Location\}\}/g, routeContext.truckLoc.name)
          .replace(/\{\{Notes\}\}/g, order.notes || '')
          .replace(/\{\{LastOrder\}\}/g, order.lastOrderDate)
          .replace(/\{\{Discount\}\}/g, '20')
          .replace(/\{\{MinJars\}\}/g, '30');
        
        setCustomMessage(msg);
      }
    } else {
      setCustomMessage(templates[template].body);
    }
  }, [template, selectedOrders, orders]);

  // Helper function to calculate delayed ETA
  const calculateDelayedETA = (originalETA, delayMins) => {
    // Simple string manipulation for demo
    return originalETA.replace(/(\d+):(\d+)/, (match, h, m) => {
      let newM = parseInt(m) + delayMins;
      let newH = parseInt(h);
      if (newM >= 60) {
        newH += Math.floor(newM / 60);
        newM = newM % 60;
      }
      return `${newH}:${newM.toString().padStart(2, '0')}`;
    });
  };

  // --- SMART BROADCAST WITH FAILOVER ---
  const handleSmartSend = async () => {
    if (selectedOrders.length === 0) {
      alert("⚠️ Please select at least one order!");
      return;
    }

    setIsSending(true);
    setProgress(0);
    
    const total = selectedOrders.length;
    let currentSent = 0;
    let delivered = 0;
    let failed = 0;

    const interval = setInterval(() => {
      currentSent++;
      const percent = Math.min(100, Math.floor((currentSent / total) * 100));
      setProgress(percent);

      // Simulate Channel Failover Strategy
      const rand = Math.random();
      const channelUsed = rand > 0.15 ? 'whatsapp' : rand > 0.05 ? 'sms' : 'failed';
      
      if (channelUsed !== 'failed') delivered++;
      else failed++;

      setStats(prev => ({
        sent: currentSent,
        delivered: delivered,
        failed: failed,
        read: Math.floor(delivered * 0.78), // 78% open rate
        pending: total - currentSent
      }));

      if (currentSent === total) {
        clearInterval(interval);
        setIsSending(false);
        
        // Update order statuses
        const updatedOrders = orders.map(order => {
          if (selectedOrders.includes(order.id)) {
            if (template === 'departure' && order.status === 'Pending') {
              return { ...order, status: 'In Transit' };
            }
            if (template === 'approaching' && order.status === 'In Transit') {
              return { ...order, status: 'Approaching' };
            }
          }
          return order;
        });
        setOrders(updatedOrders);
        
        alert(`✅ Notifications Sent!\n\n${delivered} delivered\n${failed} failed (retrying via SMS)\n\nOrder statuses updated in system.`);
        setSelectedOrders([]);
      }
    }, 300);
  };

  // --- ORDER SELECTION TOGGLE ---
  const toggleOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const selectAll = () => {
    setSelectedOrders(targetOrders.map(o => o.id));
  };

  const deselectAll = () => {
    setSelectedOrders([]);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-6 font-sans">
      
      {/* --- HEADER WITH LIVE ROUTE STATUS --- */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            {/* Left: Title & Route Status */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl">
                  <MessageSquare size={24} />
                </div>
                Order Communication Center
              </h1>
              <p className="text-sm text-slate-500 mb-3">
                Send automated notifications to customers based on order status
              </p>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200">
                  <Truck className="text-indigo-600" size={16} />
                  <span className="font-bold text-indigo-700">{routeContext.id}</span>
                  <span className="text-indigo-500">•</span>
                  <span className="text-indigo-600">{routeContext.vehicle}</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <MapPin className="text-emerald-600" size={16} />
                  <span className="text-emerald-700 font-medium">{routeContext.truckLoc.name}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  <Clock className="text-blue-600" size={16} />
                  <span className="text-blue-700 font-medium">{routeContext.currentTime}</span>
                </div>
              </div>
            </div>

            {/* Right: KPI Dashboard */}
            <div className="flex gap-6 bg-slate-50 px-6 py-4 rounded-xl border border-slate-200">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Open Rate</span>
                <p className="text-2xl font-bold text-slate-800">{kpi.openRate}%</p>
              </div>
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Reply Rate</span>
                <p className="text-2xl font-bold text-indigo-600">{kpi.replyRate}%</p>
              </div>
              <div className="text-center border-l border-slate-300 pl-6">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Delivery Success</span>
                <p className="text-2xl font-bold text-emerald-600">{kpi.deliverySuccess}%</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === LEFT: ORDERS LIST === */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col max-h-[800px]">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
              <Package size={20} /> Orders ({targetOrders.length})
            </h3>
            <p className="text-xs text-indigo-100">
              Select orders to send notifications
            </p>
          </div>

          {/* Status Filter */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Filter By Status</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'All Orders', count: orders.length },
                { id: 'current_route', label: 'Current Route', count: orders.filter(o => o.route === routeContext.id).length },
                { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'Pending').length },
                { id: 'in_transit', label: 'In Transit', count: orders.filter(o => o.status === 'In Transit').length }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setFilterStatus(filter.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === filter.id 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {filter.label}
                  <span className="ml-1 opacity-75">({filter.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selection Controls */}
          <div className="p-3 bg-white border-b border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600">
              {selectedOrders.length} selected
            </span>
            <div className="flex gap-2">
              <button 
                onClick={selectAll}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Select All
              </button>
              <button 
                onClick={deselectAll}
                className="text-xs font-bold text-slate-400 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {targetOrders.map(order => (
              <div
                key={order.id}
                onClick={() => toggleOrder(order.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedOrders.includes(order.id)
                    ? 'bg-indigo-50 border-indigo-500 shadow-md'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-800 text-sm">{order.customer}</h4>
                      {order.orderType === 'VIP' && (
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                          ⭐ VIP
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mb-1">{order.id}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-1">
                      <MapPin size={10} /> {order.distance} km away
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Approaching' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {order.status}
                    </span>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedOrders.includes(order.id)
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'border-slate-300'
                    }`}>
                      {selectedOrders.includes(order.id) && (
                        <CheckCircle2 size={14} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div className="bg-slate-50 p-2 rounded text-center">
                    <Droplets size={12} className="mx-auto mb-1 text-indigo-600" />
                    <span className="font-bold text-slate-700">{order.jars}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded text-center">
                    <Clock size={12} className="mx-auto mb-1 text-blue-600" />
                    <span className="font-bold text-slate-700">{order.eta}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded text-center">
                    <DollarSign size={12} className="mx-auto mb-1 text-emerald-600" />
                    <span className="font-bold text-slate-700">₹{(order.amount/1000).toFixed(1)}k</span>
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-start gap-1">
                    <AlertCircle size={10} className="mt-0.5 flex-shrink-0" />
                    <span>{order.notes}</span>
                  </div>
                )}
              </div>
            ))}
            
            {targetOrders.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Package size={48} className="mx-auto mb-3 opacity-30" />
                <p className="font-bold">No orders found</p>
                <p className="text-xs mt-1">Try changing the filter</p>
              </div>
            )}
          </div>
        </div>

        {/* === CENTER & RIGHT: MESSAGE COMPOSER & PREVIEW === */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Message Composer Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
            
            {/* Template Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-700">Notification Template</label>
                <button 
                  className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline"
                  onClick={() => {
                    if (selectedOrders.length > 0) {
                      const order = orders.find(o => o.id === selectedOrders[0]);
                      if (order?.status === 'Approaching') setTemplate('approaching');
                      else if (order?.status === 'In Transit') setTemplate('departure');
                      else setTemplate('confirmation');
                    }
                  }}
                >
                  <Wand2 size={12} /> AI Auto-Select
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(templates).map(key => (
                  <button
                    key={key}
                    onClick={() => setTemplate(key)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border-2 transition-all ${
                      template === key 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {templates[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Editor */}
            <div className="mb-6">
              <label className="text-sm font-bold text-slate-700 mb-2 block">Message Content</label>
              <textarea 
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full h-48 p-4 border-2 border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none bg-slate-50 font-medium"
                placeholder="Select an order and template to preview message..."
              />
              
              {/* Variable Tags */}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-[10px] text-slate-400 font-bold">VARIABLES:</span>
                {['{{CustomerName}}', '{{OrderId}}', '{{Jars}}', '{{ETA}}', '{{Amount}}'].map(v => (
                  <span
                    key={v}
                    className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-200 font-mono cursor-help"
                    title="Auto-filled from order data"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Channel Strategy Display */}
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-600 uppercase mb-2 flex items-center gap-2">
                <ShieldAlert size={14} /> Multi-Channel Delivery Strategy
              </h4>
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-emerald-200 font-bold text-emerald-600">
                  <MessageSquare size={14}/> WhatsApp (Primary)
                </span>
                <ArrowRight size={14} className="text-slate-400"/>
                <span className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-blue-200 font-bold text-blue-600">
                  <Smartphone size={14}/> SMS (Backup)
                </span>
                <ArrowRight size={14} className="text-slate-400"/>
                <span className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-slate-200 font-bold text-slate-600">
                  <Mail size={14}/> Email (Final)
                </span>
              </div>
            </div>

            {/* Execution Panel */}
            {isSending ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-indigo-600 flex items-center gap-2">
                    <RefreshCw size={16} className="animate-spin" /> Sending Notifications...
                  </span>
                  <span className="text-slate-700">{Math.round(progress)}%</span>
                </div>
                
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300" 
                    style={{width: `${progress}%`}} 
                  />
                </div>
                
                <div className="grid grid-cols-5 gap-3 text-center">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-2xl font-bold text-slate-800">{stats.sent}</p>
                    <span className="text-[10px] text-slate-500 uppercase">Sent</span>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    <p className="text-2xl font-bold text-emerald-600">{stats.delivered}</p>
                    <span className="text-[10px] text-emerald-600 uppercase">Delivered</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-2xl font-bold text-blue-600">{stats.read}</p>
                    <span className="text-[10px] text-blue-600 uppercase">Read</span>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                    <span className="text-[10px] text-red-600 uppercase">Failed</span>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                    <span className="text-[10px] text-amber-600 uppercase">Pending</span>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleSmartSend}
                disabled={selectedOrders.length === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
                  selectedOrders.length > 0
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:scale-[1.02]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send size={20} /> 
                Send to {selectedOrders.length} Customer{selectedOrders.length !== 1 ? 's' : ''}
              </button>
            )}
          </div>

          {/* Live Preview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Smartphone size={16} className="text-indigo-600" /> Live Preview
            </h3>
            
            {/* Channel Tabs */}
            <div className="flex justify-center mb-4">
              <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                {['whatsapp', 'sms', 'email'].map(c => (
                  <button
                    key={c}
                    onClick={() => setChannel(c)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      channel === c 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {c === 'whatsapp' && <MessageSquare size={14} className="inline mr-1" />}
                    {c === 'sms' && <Smartphone size={14} className="inline mr-1" />}
                    {c === 'email' && <Mail size={14} className="inline mr-1" />}
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center">
              <div className={`w-full max-w-[340px] bg-white border-4 border-slate-300 rounded-3xl overflow-hidden shadow-2xl ${
                channel === 'email' ? 'h-[280px] rounded-xl border-2' : 'h-[500px]'
              }`}>
                <div className="bg-slate-100 h-10 border-b border-slate-200 flex items-center justify-between px-4">
                  <div className="text-[10px] font-bold text-slate-500">{channel.toUpperCase()}</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"/>
                    <div className="w-2 h-2 bg-slate-400 rounded-full"/>
                  </div>
                </div>

                <div className={`flex-1 p-4 ${channel === 'whatsapp' ? 'bg-[#e5ddd5]' : 'bg-white'}`}>
                  {channel === 'whatsapp' && (
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-md relative mt-6">
                      <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                        {customMessage || "Select an order to preview message"}
                      </p>
                      <div className="text-[9px] text-slate-400 text-right mt-2 flex justify-end items-center gap-1">
                        {routeContext.currentTime} <CheckCircle2 size={10} className="text-blue-500"/>
                      </div>
                    </div>
                  )}

                  {channel === 'sms' && (
                    <div className="space-y-3 mt-6">
                      <div className="bg-slate-100 p-3 rounded-2xl rounded-bl-none text-sm text-slate-800 shadow-sm">
                        {customMessage || "Select an order to preview message"}
                      </div>
                      <p className="text-[10px] text-slate-400">Delivered via AQUAFLOW SMS</p>
                    </div>
                  )}

                  {channel === 'email' && (
                    <div className="text-sm p-2">
                      <div className="font-bold border-b border-slate-200 pb-2 mb-3 text-slate-800">
                        Subject: {templates[template].subject}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-xs">
                        {customMessage || "Select an order to preview message"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RouteNotifications;
