import React, { useState, useEffect } from "react";
import { 
  Send, MessageSquare, Mail, Smartphone, Zap, CheckCircle, 
  AlertCircle, Clock, Tag, Wand2, Users, Calendar, BarChart3, 
  CheckCircle2, XCircle, MapPin, Truck, History, ShieldAlert,
  ArrowRight, RefreshCw, Radio
} from 'lucide-react';

const RouteNotifications = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' | 'auto' | 'logs'
  const [channel, setChannel] = useState("whatsapp");
  const [template, setTemplate] = useState("departure");
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [customerFilter, setCustomerFilter] = useState('relevant'); // 'all', 'relevant' (100km), 'pending'
  const [autoTriggerEnabled, setAutoTriggerEnabled] = useState(true);
  
  // Real-time Dashboard Metrics (Feature #12)
  const [kpi, setKpi] = useState({ openRate: 68, replyRate: 12, conversion: 4.5, revenue: 12500 });
  const [stats, setStats] = useState({ sent: 0, delivered: 0, read: 0, failed: 0, pending: 42 });

  // Mock Live Route Context (Feature #1 & #14)
  const routeContext = {
    id: "RT-101",
    status: "In Transit",
    truckLoc: { lat: 22.5, lng: 88.3 }, // Current location
    delayMins: 35, // Trigger for AI template selection
    remainingCapacity: 600, // Trigger for Promo
    nextStopDistance: 8, // km (Trigger for Geo-Contact)
    driver: "Rajesh Kumar",
    vehicle: "WB-02-9988"
  };

  // Mock Customer Database with Segmentation Data (Feature #2 & #7)
  const [customers, setCustomers] = useState([
    { id: 1, name: "Green Valley Apts", dist: 5, status: 'Pending', history: 12, type: 'VIP' },
    { id: 2, name: "Tech Park", dist: 45, status: 'Delivered', history: 5, type: 'Regular' },
    { id: 3, name: "City Gym", dist: 120, status: 'Pending', history: 20, type: 'VIP' }, // Too far
    { id: 4, name: "Highway Motel", dist: 12, status: 'Pending', history: 2, type: 'New' },
  ]);

  // Enhanced Templates with Dynamic Variables (Feature #4)
  const templates = {
    departure: { label: "Departure Alert", subject: "🚛 On the way!", body: "Hi {{Name}}, Truck {{VehicleNo}} has departed. Driver {{DriverName}} will reach by {{ETA}}. Order ID: {{OrderId}}." },
    delay: { label: "Delay Alert", subject: "⚠️ Delay Update", body: "Hi {{Name}}, traffic is heavy. We are running {{Delay}} mins late. New ETA: {{ETA}}. Thanks for patience." },
    promo: { label: "Capacity Promo", subject: "🎉 Flash Deal", body: "Hey {{Name}}, we have {{Capacity}}kg extra space nearby! Order now for 10% OFF. Code: {{PromoCode}}." },
    arrival: { label: "Approaching", subject: "📍 Arriving Soon", body: "Hello {{Name}}, our truck is just {{Distance}}km away. Please be ready to receive." }
  };

  // --- LOGIC ENGINES ---

  // 1. AI Template Selector (Feature #3)
  useEffect(() => {
    if (activeTab === 'auto') {
      if (routeContext.delayMins > 30) setTemplate("delay");
      else if (routeContext.remainingCapacity > 500) setTemplate("promo");
      else if (routeContext.nextStopDistance < 10) setTemplate("arrival");
      else setTemplate("departure");
    }
  }, [routeContext, activeTab]);

  // 2. Initialize Message with Variables (Feature #4)
  useEffect(() => {
    let msg = templates[template].body;
    // Mock variable replacement
    msg = msg.replace('{{DriverName}}', routeContext.driver)
             .replace('{{VehicleNo}}', routeContext.vehicle)
             .replace('{{Delay}}', routeContext.delayMins)
             .replace('{{Capacity}}', routeContext.remainingCapacity)
             .replace('{{Distance}}', routeContext.nextStopDistance)
             .replace('{{PromoCode}}', 'TRUCK10')
             .replace('{{ETA}}', '10:45 AM');
    setCustomMessage(msg);
  }, [template, routeContext]);

  // 3. Smart Broadcast Handler (Feature #6, #8, #11)
  const handleSmartSend = async () => {
    setIsSending(true);
    setProgress(0);
    
    // Filter Target Audience (Feature #2 & #10)
    const targetCustomers = customers.filter(c => {
      if (customerFilter === 'relevant') return c.dist <= 100; // Only within 100km
      if (customerFilter === 'pending') return c.status === 'Pending';
      return true;
    });

    const total = targetCustomers.length;
    let currentSent = 0;

    // Simulation Loop
    const interval = setInterval(() => {
      currentSent++;
      const percent = Math.min(100, Math.floor((currentSent / total) * 100));
      setProgress(percent);

      // Simulate Failover Strategy (Feature #6)
      // 90% success on primary channel, 10% failover to SMS
      const isFailover = Math.random() > 0.9;
      
      setStats(prev => ({
        sent: prev.sent + 1,
        delivered: prev.delivered + (isFailover ? 0 : 1),
        failed: prev.failed + (isFailover ? 1 : 0), // In real app, this triggers SMS retry
        read: prev.read + (Math.random() > 0.4 ? 1 : 0),
        pending: total - currentSent
      }));

      // Feature #11: Sync with Driver
      if (currentSent === total) {
        clearInterval(interval);
        setIsSending(false);
        console.log("DRIVER NOTIFIED: Broadcast Complete"); 
      }
    }, 200); // Feature #8: Rate limiting simulation (200ms delay)
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col font-sans">
      
      {/* --- HEADER --- */}
      <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Zap className="text-indigo-600" /> Auto-Pilot Broadcaster
          </h2>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${autoTriggerEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
            {autoTriggerEnabled ? "Smart Triggers Active" : "Manual Mode"}
          </p>
        </div>
        
        {/* KPI Dashboard (Feature #12) */}
        <div className="hidden md:flex gap-4">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Open Rate</span>
            <p className="text-lg font-bold text-slate-800">{kpi.openRate}%</p>
          </div>
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Replies</span>
            <p className="text-lg font-bold text-indigo-600">{kpi.replyRate}%</p>
          </div>
          <div className="text-center pl-4 border-l border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400">Revenue</span>
            <p className="text-lg font-bold text-emerald-600">+₹{kpi.revenue}</p>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANEL: Controls & Automation */}
        <div className="w-full lg:w-1/2 p-6 overflow-y-auto border-r border-slate-100 bg-white">
          
          {/* Automation Switch */}
          <div className="mb-6 bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Radio size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-900">Geo-Triggered Broadcast (Feature #1 & #14)</h4>
                <p className="text-xs text-indigo-700 opacity-80">Auto-send when truck enters 10km radius.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={autoTriggerEnabled} onChange={() => setAutoTriggerEnabled(!autoTriggerEnabled)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Filters (Feature #2 & #10) */}
          <div className="mb-6">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Target Audience</label>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All', icon: Users },
                { id: 'relevant', label: 'Within 100km', icon: MapPin },
                { id: 'pending', label: 'Pending Only', icon: Clock }
              ].map(f => (
                <button 
                  key={f.id}
                  onClick={() => setCustomerFilter(f.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                    customerFilter === f.id ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <f.icon size={14} /> {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Channel Fallback Strategy (Feature #6) */}
          <div className="mb-6">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Channel Strategy</label>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-bold text-emerald-600"><MessageSquare size={14}/> WhatsApp</span>
              <ArrowRight size={12} className="text-slate-400"/>
              <span className="flex items-center gap-1 font-bold text-blue-600"><Smartphone size={14}/> SMS (Failover)</span>
              <ArrowRight size={12} className="text-slate-400"/>
              <span className="flex items-center gap-1 font-bold text-indigo-600"><Mail size={14}/> Email</span>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Message Content</label>
              <button onClick={() => setActiveTab('auto')} className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline">
                <Wand2 size={12} /> AI Auto-Select
              </button>
            </div>
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {Object.keys(templates).map(key => (
                <button
                  key={key}
                  onClick={() => { setTemplate(key); setActiveTab('manual'); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap ${
                    template === key ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  {templates[key].label}
                </button>
              ))}
            </div>
            <textarea 
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full h-32 p-3 border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-slate-50 font-medium"
            />
            {/* Variable Hints (Feature #4) */}
            <div className="mt-2 flex flex-wrap gap-2">
              {['{{Name}}', '{{ETA}}', '{{VehicleNo}}', '{{PromoCode}}'].map(v => (
                <span key={v} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-mono cursor-help" title="Dynamic Variable">
                  {v}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Live Preview & Execution */}
        <div className="w-full lg:w-1/2 bg-slate-50 p-6 flex flex-col h-full overflow-y-auto">
          
          {/* Channel Preview Tabs (Feature #13) */}
          <div className="flex justify-center mb-6">
             <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex">
                {['whatsapp', 'sms', 'email'].map(c => (
                  <button
                    key={c}
                    onClick={() => setChannel(c)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      channel === c ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {c}
                  </button>
                ))}
             </div>
          </div>

          {/* Live Preview Container */}
          <div className="flex-1 flex justify-center mb-6">
             <div className={`w-full max-w-[320px] bg-white border-4 border-slate-200 rounded-3xl overflow-hidden shadow-xl flex flex-col ${
               channel === 'email' ? 'h-[250px] rounded-lg border-2' : 'h-[450px]' // Email looks different
             }`}>
                {/* Simulated Screen Header */}
                <div className="bg-slate-100 h-8 border-b border-slate-200 flex items-center justify-between px-4">
                   <div className="text-[10px] font-bold text-slate-400">{channel.toUpperCase()}</div>
                   <div className="flex gap-1"><div className="w-2 h-2 bg-slate-300 rounded-full"/></div>
                </div>

                {/* Simulated Content */}
                <div className={`flex-1 p-4 ${channel === 'whatsapp' ? 'bg-[#efe6dd]' : 'bg-white'}`}>
                   {channel === 'whatsapp' && (
                     <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-slate-800 relative top-4">
                       <p>{customMessage.replace('{{Name}}', 'John')}</p>
                       <div className="text-[9px] text-slate-400 text-right mt-1 flex justify-end gap-1">
                         10:05 AM <CheckCircle2 size={10} className="text-blue-500"/>
                       </div>
                       
                       {/* Two-Way Reply Simulation (Feature #5) */}
                       <div className="mt-3 border-t border-slate-100 pt-2 flex gap-2">
                          <button className="flex-1 bg-slate-50 text-slate-600 text-[10px] font-bold py-1.5 rounded border border-slate-200">YES (Confirm)</button>
                          <button className="flex-1 bg-slate-50 text-slate-600 text-[10px] font-bold py-1.5 rounded border border-slate-200">DELAY</button>
                       </div>
                     </div>
                   )}

                   {channel === 'sms' && (
                     <div className="space-y-2 mt-4">
                        <div className="bg-slate-100 p-3 rounded-xl rounded-bl-none text-sm text-slate-800">
                           {customMessage.replace('{{Name}}', 'John')}
                        </div>
                        <p className="text-[10px] text-slate-400">Sent from VM-LOGIST</p>
                     </div>
                   )}

                   {channel === 'email' && (
                     <div className="text-sm">
                        <p className="font-bold border-b border-slate-100 pb-2 mb-2">Subject: {templates[template].subject}</p>
                        <p className="text-slate-600 leading-relaxed">{customMessage.replace('{{Name}}', 'John')}</p>
                     </div>
                   )}
                </div>
             </div>
          </div>

          {/* Execution & Stats Panel */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             {isSending ? (
               <div className="space-y-3">
                 <div className="flex justify-between text-xs font-bold">
                   <span className="text-indigo-600 animate-pulse">Broadcasting...</span>
                   <span>{Math.round(progress)}%</span>
                 </div>
                 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-600 transition-all duration-200" style={{width: `${progress}%`}} />
                 </div>
                 <div className="grid grid-cols-4 gap-2 mt-2 text-center">
                    <div><p className="text-lg font-bold text-slate-800">{stats.sent}</p><span className="text-[9px] text-slate-400">SENT</span></div>
                    <div><p className="text-lg font-bold text-emerald-600">{stats.delivered}</p><span className="text-[9px] text-slate-400">DELIVERED</span></div>
                    <div><p className="text-lg font-bold text-rose-500">{stats.failed}</p><span className="text-[9px] text-slate-400">FAILED</span></div>
                    <div><p className="text-lg font-bold text-slate-400">{stats.pending}</p><span className="text-[9px] text-slate-400">PENDING</span></div>
                 </div>
               </div>
             ) : (
               <div className="flex gap-2">
                 <div className="flex-1 bg-amber-50 rounded-lg p-2 border border-amber-100 flex items-center gap-2 justify-center">
                    <ShieldAlert size={14} className="text-amber-600"/>
                    <span className="text-[10px] font-bold text-amber-700">Audit Log Enabled</span>
                 </div>
                 <button 
                   onClick={handleSmartSend}
                   className="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md flex items-center justify-center gap-2"
                 >
                   <Send size={16} /> Execute Broadcast
                 </button>
               </div>
             )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default RouteNotifications;
