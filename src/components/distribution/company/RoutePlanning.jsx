import React, { useState, useEffect } from "react";
import { 
  MapPin, Truck, Plus, Zap, Route, CheckCircle2, 
  Navigation, ArrowRight, Droplets, AlertTriangle, Package, 
  Gift, Tag, X, Save, LayoutGrid, Fuel, Calendar, Info, Edit, Clock,
  AlertCircle, ChevronRight
} from 'lucide-react';

// --- 1. SHARED DATA & HELPERS ---

const MAHARASHTRA_HUBS = [
  { id: 'H-MUM', name: 'Mumbai Central Hub', city: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { id: 'H-PUN', name: 'Pune Regional Depot', city: 'Pune', lat: 18.5204, lng: 73.8567 },
  { id: 'H-NAG', name: 'Nagpur Logistics Center', city: 'Nagpur', lat: 21.1458, lng: 79.0882 },
  { id: 'H-NAS', name: 'Nashik Distribution Point', city: 'Nashik', lat: 19.9975, lng: 73.7898 },
];

const VEHICLE_TYPES = [
  { id: 'V-TATA-407', name: 'Tata 407 (Light)', capacity: 60, avgSpeed: 40, costPerKm: 15 },
  { id: 'V-EICHER-1110', name: 'Eicher Pro 1110 (Medium)', capacity: 120, avgSpeed: 50, costPerKm: 25 },
  { id: 'V-ASHOK-1618', name: 'Ashok Leyland 1618 (Heavy)', capacity: 250, avgSpeed: 45, costPerKm: 40 },
  { id: 'V-BOLERO', name: 'Mahindra Bolero Pickup', capacity: 40, avgSpeed: 55, costPerKm: 12 },
];

const ALL_CUSTOMERS_DB = [
  { id: 1, name: "Highway Motel", address: "NH-48, Near Panvel Exit", progress: 35, jars: 15, profit: 2200 },
  { id: 2, name: "Industrial Park B", address: "Plot 45, MIDC Zone", progress: 65, jars: 25, profit: 5800 },
  { id: 9, name: "Roadside Grocery", address: "Sector 5, Main Market", progress: 40, jars: 0, profit: 0 }, 
  { id: 10, name: "Clinic Near Bypass", address: "Opp. City Hospital Gate 2", progress: 72, jars: 0, profit: 0 }, 
  { id: 11, name: "Student Canteen", address: "University Campus, Block C", progress: 20, jars: 0, profit: 0 },
  { id: 3, name: "Riverside Cafe", address: "Riverfront Walkway, Shop 12", progress: 85, jars: 40, profit: 8000 },
  { id: 4, name: "Off-Route Village", address: "Village Khed, Dist Pune", progress: 120, jars: 10, profit: 500 },
  { id: 5, name: "City Center Mall", address: "LBS Marg, Ghatkopar", progress: 10, jars: 20, profit: 1500 },
  { id: 6, name: "Tech Park Campus", address: "Phase 3, Hinjewadi IT Park", progress: 45, jars: 30, profit: 6500 },
  // Adding a big order to test capacity overflow
  { id: 7, name: "Mega Wedding Hall", address: "Solapur Highway", progress: 55, jars: 50, profit: 9000 },
];

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(c);
};

const calculateDetour = (customerProgress, routeTotalDist) => Math.floor(Math.random() * 15) + 1; 

// --- 2. SUB-COMPONENT: RouteManager ---
const RouteManager = ({ routes, selectedRouteId, onSelectRoute, onCreateRoute }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', vehicleId: VEHICLE_TYPES[0].id, startHubId: MAHARASHTRA_HUBS[0].id, endHubId: MAHARASHTRA_HUBS[1].id });

  const selectedVehicle = VEHICLE_TYPES.find(v => v.id === formData.vehicleId);
  const startHub = MAHARASHTRA_HUBS.find(h => h.id === formData.startHubId);
  const endHub = MAHARASHTRA_HUBS.find(h => h.id === formData.endHubId);
  const estimatedDist = getDistanceFromLatLonInKm(startHub.lat, startHub.lng, endHub.lat, endHub.lng);
  const roadDist = Math.round(estimatedDist * 1.2); 
  const estCost = roadDist * selectedVehicle.costPerKm;
  const estTime = Math.round(roadDist / selectedVehicle.avgSpeed);

  const handleCreate = (e) => {
    e.preventDefault();
    const newRoute = {
      id: `RT-${Date.now().toString().slice(-4)}`,
      name: formData.name || `${startHub.city} to ${endHub.city} Run`,
      vehicle: selectedVehicle.name,
      totalDistance: roadDist,
      loadJars: 0,
      maxJars: selectedVehicle.capacity,
      startLoc: startHub.city,
      endLoc: endHub.city,
      stopsData: [
        { id: 'start', type: 'start', name: startHub.name, address: startHub.name, dist: 0, jars: 0, profit: 0 },
        { id: 'end', type: 'drop', name: endHub.name, address: endHub.name, dist: 100, jars: 0, profit: 0 }
      ],
      unassignedOrders: [] // NEW FIELD
    };
    onCreateRoute(newRoute);
    setShowCreateModal(false);
    setFormData({ ...formData, name: '' }); 
  };

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm z-10 shrink-0">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <span className="font-bold text-slate-700 text-sm flex items-center gap-2"><LayoutGrid size={16} className="text-indigo-600"/> Route List</span>
        <button onClick={() => setShowCreateModal(true)} className="p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm transition-all"><Plus size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {routes.map(route => {
          const util = (route.loadJars / route.maxJars) * 100;
          const isSelected = selectedRouteId === route.id;
          const hasIssues = route.unassignedOrders && route.unassignedOrders.length > 0;
          return (
            <div key={route.id} onClick={() => onSelectRoute(route.id)} className={`p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'}`}>
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold text-sm ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>{route.name}</h4>
                {hasIssues && <AlertCircle size={14} className="text-amber-500" />}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2"><Truck size={12} /> <span className="truncate w-40">{route.vehicle}</span></div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ${util < 70 ? 'bg-amber-400' : util > 100 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(util, 100)}%` }} /></div>
              <div className="mt-1 flex justify-between text-[10px] font-bold text-slate-400"><span>{route.loadJars}/{route.maxJars} Jars</span><span>{Math.round(util)}%</span></div>
            </div>
          );
        })}
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-0 shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50"><h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><MapPin className="text-indigo-600" size={20}/> Plan New Route</h3><button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-slate-200 rounded-full"><X size={20} className="text-slate-400"/></button></div>
            <div className="p-6 overflow-y-auto">
              <form id="create-route-form" onSubmit={handleCreate} className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Route Name</label><input type="text" placeholder="e.g. Morning Supply Run" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/></div>
                <div className="grid grid-cols-2 gap-4">
                   <div><label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Origin Hub</label><select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.startHubId} onChange={e => setFormData({...formData, startHubId: e.target.value})}>{MAHARASHTRA_HUBS.map(hub => <option key={hub.id} value={hub.id}>{hub.city}</option>)}</select></div>
                   <div><label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Destination</label><select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.endHubId} onChange={e => setFormData({...formData, endHubId: e.target.value})}>{MAHARASHTRA_HUBS.filter(h => h.id !== formData.startHubId).map(hub => <option key={hub.id} value={hub.id}>{hub.city}</option>)}</select></div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Assign Vehicle</label>
                  <div className="grid grid-cols-1 gap-2">
                    {VEHICLE_TYPES.map(v => (
                      <label key={v.id} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.vehicleId === v.id ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                        <input type="radio" name="vehicle" value={v.id} checked={formData.vehicleId === v.id} onChange={() => setFormData({...formData, vehicleId: v.id})} className="hidden" />
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 text-slate-500"><Truck size={16}/></div>
                        <div className="flex-1"><div className="font-bold text-sm text-slate-700">{v.name}</div><div className="text-xs text-slate-500">Cap: {v.capacity} Jars • ₹{v.costPerKm}/km</div></div>
                        {formData.vehicleId === v.id && <div className="w-2 h-2 rounded-full bg-indigo-600"/>}
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3"><button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100">Cancel</button><button form="create-route-form" type="submit" className="flex-[2] py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg flex items-center justify-center gap-2"><Save size={18} /> Confirm Route</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 3. SUB-COMPONENT: RouteAnalyzer ---
const RouteAnalyzer = ({ route, onUpdateRoute }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [showAutoDiscovery, setShowAutoDiscovery] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', vehicleId: '' });

  useEffect(() => {
    if (showDetailsModal) {
      const currentV = VEHICLE_TYPES.find(v => v.name === route.vehicle);
      setEditForm({ name: route.name, vehicleId: currentV ? currentV.id : VEHICLE_TYPES[0].id });
      setIsEditing(false);
    }
  }, [showDetailsModal, route]);

  const currentVehicle = VEHICLE_TYPES.find(v => v.name === route.vehicle) || VEHICLE_TYPES[0];
  const utilizationPct = (route.loadJars / route.maxJars) * 100;
  
  // LOGIC: Suggest BIGGER vehicle if over-capacity, SMALLER if under-utilized
  let recommendedVehicle = null;
  if (utilizationPct > 100) {
      // Find a bigger truck
      recommendedVehicle = VEHICLE_TYPES.find(v => v.capacity >= route.loadJars);
  } else if (utilizationPct < 50 && utilizationPct > 0) {
      // Find a smaller truck
      recommendedVehicle = VEHICLE_TYPES.find(v => v.capacity >= route.loadJars && v.capacity < currentVehicle.capacity);
  }

  const handleSwitchVehicle = () => {
    if (!recommendedVehicle) return;
    onUpdateRoute({ ...route, vehicle: recommendedVehicle.name, maxJars: recommendedVehicle.capacity });
    alert(`✅ Switched to ${recommendedVehicle.name}! Capacity issue resolved.`);
  };

  const handleSaveChanges = () => {
    const newVehicle = VEHICLE_TYPES.find(v => v.id === editForm.vehicleId);
    onUpdateRoute({ ...route, name: editForm.name, vehicle: newVehicle.name, maxJars: newVehicle.capacity });
    setIsEditing(false);
  };

  const handleSendOfferToUnassigned = (customer) => {
    alert(`🎟️ Sent 'Next Day Delivery' offer to ${customer.name}!`);
    // Ideally remove from unassigned list here
  };

  useEffect(() => {
    if (!showAutoDiscovery) { setOpportunities([]); return; }
    const existingCustomerIds = route.stopsData.filter(s => s.type === 'added').map(s => s.customerId);

    const detected = ALL_CUSTOMERS_DB
      .filter(c => !existingCustomerIds.includes(c.id))
      .map(c => {
        const detour = calculateDetour(c.progress, route.totalDistance);
        const hasOrder = c.jars > 0;
        let promoOffer = null;
        if (!hasOrder) {
          if (detour < 2) promoOffer = "⚡ Free Delivery";
          else if (detour < 5) promoOffer = "🎟️ Flat ₹50 Off";
          else promoOffer = "🎁 Buy 20 Get 2 Free";
        }
        return { ...c, detour, type: hasOrder ? "order" : "prospect", promoOffer };
      })
      // NOTE: We do NOT filter by remaining capacity here anymore. We show ALL relevant pins.
      // Logic moved to "Add Stop"
      .filter(c => c.progress > 10 && c.progress < 95 && c.detour < 15) 
      .sort((a, b) => a.progress - b.progress);
      
    setOpportunities(detected);
  }, [route, showAutoDiscovery]);

  const handleAddStop = (opt) => {
    const isProspect = opt.type === "prospect";
    const jarsToAdd = isProspect ? 10 : opt.jars;
    const profitToAdd = isProspect ? 450 : opt.profit;
    const remainingCap = route.maxJars - route.loadJars;
    
    // --- CAPACITY CHECK LOGIC ---
    if (jarsToAdd > remainingCap) {
        // If it doesn't fit, add to "Unassigned Orders" list instead of active route
        const unassigned = [...(route.unassignedOrders || [])];
        // Check if already in unassigned
        if (!unassigned.find(u => u.id === opt.id)) {
            unassigned.push({ ...opt, jars: jarsToAdd, profit: profitToAdd });
            onUpdateRoute({ ...route, unassignedOrders: unassigned });
            setOpportunities(opportunities.filter(o => o.id !== opt.id)); // Remove pin
            alert(`⚠️ Capacity Full! ${opt.name} added to Unassigned List.`);
        }
        return;
    }

    // Normal Add Logic (Fits in truck)
    const newStop = { 
      id: Date.now(), customerId: opt.id, type: 'added', name: opt.name, address: opt.address, dist: opt.progress, jars: jarsToAdd, profit: profitToAdd,
      description: isProspect ? `Promo Applied: ${opt.promoOffer}` : "Active Order Added"
    };
    const currentStops = [...route.stopsData];
    let insertIndex = currentStops.findIndex(s => s.dist > opt.progress);
    if (insertIndex === -1) insertIndex = currentStops.length;
    currentStops.splice(insertIndex, 0, newStop);
    onUpdateRoute({ ...route, loadJars: route.loadJars + jarsToAdd, stopsData: currentStops });
    setOpportunities(opportunities.filter(o => o.id !== opt.id));
  };

  const canDispatch = utilizationPct >= 70 && utilizationPct <= 100;
  const totalRevenue = route.stopsData.reduce((sum, s) => sum + (s.profit || 0), 0);
  const estCost = route.totalDistance * currentVehicle.costPerKm;
  const customerStops = route.stopsData.filter(s => s.type === 'added' && s.jars > 0);
  const unassignedList = route.unassignedOrders || [];

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col relative overflow-hidden shadow-sm m-4 ml-0">
      <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <button onClick={() => setShowDetailsModal(true)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors relative">
               <Info size={20} />
               {unassignedList.length > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold animate-pulse">{unassignedList.length}</span>}
           </button>
           <div><h2 className="text-xl font-bold flex items-center gap-2 text-slate-800"><Route className="text-indigo-600"/> {route.name}</h2><p className="text-sm text-slate-500">{route.startLoc} → {route.endLoc} • {route.totalDistance} km</p></div>
        </div>
        <div className="flex items-center gap-4">
           {recommendedVehicle && (<div className={`flex items-center gap-3 border px-3 py-1.5 rounded-lg animate-in fade-in slide-in-from-top-2 ${utilizationPct > 100 ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}><div><p className={`text-[10px] font-bold uppercase ${utilizationPct > 100 ? 'text-red-600' : 'text-amber-600'}`}>{utilizationPct > 100 ? 'Over Capacity!' : 'Underutilized'}</p><p className="text-xs text-slate-700">Switch to <b>{recommendedVehicle.name}</b>?</p></div><button onClick={handleSwitchVehicle} className={`text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm transition-colors ${utilizationPct > 100 ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}>Switch Vehicle</button></div>)}
           <div className="text-right border-l border-slate-100 pl-4"><p className="text-xs font-bold text-slate-500 uppercase">Capacity</p><p className={`text-lg font-bold ${utilizationPct > 100 ? 'text-red-600' : utilizationPct < 50 ? 'text-amber-500' : 'text-emerald-600'}`}>{route.loadJars} / {route.maxJars} Jars</p></div>
           <button disabled={!canDispatch} onClick={() => alert(`✅ Trip Dispatched! Revenue: ₹${totalRevenue}`)} className={`px-5 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2 ${canDispatch ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>{canDispatch ? <>Dispatch <ArrowRight size={16} /></> : <>Fill Truck <AlertTriangle size={16} /></>}</button>
        </div>
      </div>

      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">{isEditing ? <Edit size={18} className="text-indigo-600"/> : <Info size={18} className="text-indigo-600"/>} {isEditing ? 'Edit Route' : 'Route Details'}</h3>
              <div className="flex items-center gap-2">{!isEditing && (<button onClick={() => setIsEditing(true)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg text-xs font-bold transition-colors">Edit</button>)}<button onClick={() => setShowDetailsModal(false)} className="p-1 hover:bg-slate-200 rounded-full"><X size={20} className="text-slate-400"/></button></div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {isEditing ? (
                <div className="space-y-4">
                   <div><label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Route Name</label><input type="text" className="w-full p-2 border border-slate-200 rounded-lg text-sm" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})}/></div>
                   <div><label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Assigned Vehicle</label><select className="w-full p-2 border border-slate-200 rounded-lg text-sm" value={editForm.vehicleId} onChange={e => setEditForm({...editForm, vehicleId: e.target.value})}>{VEHICLE_TYPES.map(v => <option key={v.id} value={v.id}>{v.name} (Cap: {v.capacity})</option>)}</select></div>
                   <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100"><button onClick={() => setIsEditing(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-slate-600 font-bold text-sm">Cancel</button><button onClick={handleSaveChanges} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm shadow-md">Save Changes</button></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100"><div className="text-xs text-slate-400 font-bold uppercase mb-1">Route ID</div><div className="font-mono text-sm font-bold text-slate-700">{route.id}</div></div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100"><div className="text-xs text-slate-400 font-bold uppercase mb-1">Status</div><div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">Active</div></div>
                  </div>
                  <div><div className="text-xs text-slate-400 font-bold uppercase mb-2">Vehicle Configuration</div><div className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg"><div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600"><Truck size={20}/></div><div><div className="font-bold text-sm text-slate-800">{currentVehicle.name}</div><div className="text-xs text-slate-500">Max Capacity: {currentVehicle.capacity} Jars • Speed: {currentVehicle.avgSpeed} km/h</div></div></div></div>
                  
                  {/* --- NEW: UNASSIGNED ORDERS ALERT --- */}
                  {unassignedList.length > 0 && (
                      <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3 text-red-700 font-bold text-sm"><AlertCircle size={16}/> Capacity Exceeded ({unassignedList.length} Orders Pending)</div>
                          <div className="space-y-2">
                              {unassignedList.map(item => (
                                  <div key={item.id} className="bg-white p-3 rounded-lg border border-red-100 shadow-sm flex items-center justify-between">
                                      <div>
                                          <div className="font-bold text-sm text-slate-800">{item.name}</div>
                                          <div className="text-xs text-slate-500">{item.jars} Jars (Requires larger truck)</div>
                                      </div>
                                      <button onClick={() => handleSendOfferToUnassigned(item)} className="px-3 py-1.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-md hover:bg-red-200 transition-colors">Send Offer</button>
                                  </div>
                              ))}
                          </div>
                          <div className="mt-3 text-xs text-center text-red-500 font-medium">Tip: Switch to a larger vehicle to fit these orders.</div>
                      </div>
                  )}

                  <div>
                     <div className="flex items-center justify-between mb-2"><div className="text-xs text-slate-400 font-bold uppercase">Planned Customer Stops</div><div className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold">{customerStops.length} Customers</div></div>
                     {customerStops.length > 0 ? (
                       <div className="border border-slate-100 rounded-lg overflow-hidden">
                         <table className="w-full text-sm">
                           <thead className="bg-slate-50 border-b border-slate-100"><tr className="text-xs text-slate-400"><th className="px-3 py-2 text-left font-bold w-10">#</th><th className="px-3 py-2 text-left font-bold">Customer & Location</th><th className="px-3 py-2 text-center font-bold">Order</th><th className="px-3 py-2 text-right font-bold">Status</th></tr></thead>
                           <tbody className="divide-y divide-slate-50">
                             {customerStops.map((stop, idx) => (
                               <tr key={stop.id} className="hover:bg-slate-50 transition-colors">
                                 <td className="px-3 py-2 text-slate-400 font-mono text-xs align-top pt-3">{idx + 1}</td>
                                 <td className="px-3 py-2">
                                   <div className="font-bold text-slate-800">{stop.name}</div>
                                   <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5"><MapPin size={10} className="text-indigo-400 shrink-0"/> {stop.address || "Address Pending"}</div>
                                   {stop.description && stop.description.includes('Promo') && (<span className="inline-block mt-1 bg-purple-100 text-purple-700 text-[10px] px-1.5 rounded font-bold">{stop.description}</span>)}
                                 </td>
                                 <td className="px-3 py-2 text-center align-top pt-3"><span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap"><Droplets size={12}/> {stop.jars}</span></td>
                                 <td className="px-3 py-2 text-right align-top pt-3"><span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100 uppercase"><Clock size={10}/> Scheduled</span></td>
                               </tr>
                             ))}
                           </tbody>
                           <tfoot className="bg-slate-50 border-t border-slate-100"><tr className="font-bold"><td colSpan="2" className="px-3 py-2 text-slate-700 text-xs uppercase text-right">Total Load</td><td className="px-3 py-2 text-center text-indigo-700">{route.loadJars} Jars</td><td className="px-3 py-2 text-right text-emerald-600">₹{totalRevenue.toLocaleString()}</td></tr></tfoot>
                         </table>
                       </div>
                     ) : (
                       <div className="border border-dashed border-slate-200 rounded-lg p-6 text-center"><Package size={32} className="mx-auto text-slate-300 mb-2"/><p className="text-sm text-slate-500 font-medium">No customer orders added yet</p><p className="text-xs text-slate-400 mt-1">Add customers from the map to see them here</p></div>
                     )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 bg-gradient-to-br from-slate-100 to-slate-50 relative group overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-1/2 left-10 right-10 h-2 bg-slate-300 rounded-full transform -translate-y-1/2 shadow-inner">
           <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-full opacity-20"></div>
           <div className="absolute -top-3 left-0 flex flex-col items-center z-20"><div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center border-4 border-white shadow-lg"><Navigation size={14} /></div></div>
           <div className="absolute -top-3 right-0 flex flex-col items-center z-20"><div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center border-4 border-white shadow-lg"><CheckCircle2 size={14} /></div></div>
           {showAutoDiscovery && opportunities.map(opt => (
             <div key={opt.id} className="absolute -top-10 flex flex-col items-center group/pin cursor-pointer transition-all duration-500 z-30" style={{ left: `${opt.progress}%` }} onClick={() => handleAddStop(opt)}>
               <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform animate-bounce ${opt.type === "order" ? "bg-amber-500" : "bg-purple-600"}`}>{opt.type === "order" ? <Zap size={18} fill="white" /> : <Gift size={18} />}</div>
               <div className="mt-2 bg-white px-3 py-2 rounded-lg shadow-xl border border-slate-200 text-center min-w-[160px] opacity-0 group-hover/pin:opacity-100 transition-opacity absolute top-10 z-50 pointer-events-none group-hover/pin:pointer-events-auto">
                 <p className="text-xs font-bold text-slate-800">{opt.name}</p>
                 {opt.type === "order" ? (<><div className="flex items-center justify-between gap-2 mt-1 pt-1 border-t border-slate-100"><span className="text-[10px] text-indigo-600 font-bold">{opt.jars} Jars</span><span className="text-[10px] text-emerald-600 font-bold">₹{opt.profit}</span></div><button className="mt-2 w-full bg-indigo-600 text-white text-[10px] font-bold py-1 rounded">Add Order</button></>) : (<><div className="mt-1 bg-purple-50 border border-purple-100 rounded px-2 py-1"><p className="text-[10px] font-bold text-purple-700 flex items-center justify-center gap-1"><Tag size={10} /> {opt.promoOffer}</p></div><button className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold py-1 rounded">Apply Offer</button></>)}
               </div>
               <div className={`absolute top-8 w-0.5 h-6 border-l-2 border-dashed ${opt.type === "order" ? "border-amber-400" : "border-purple-400"}`}></div>
             </div>
           ))}
           {route.stopsData.filter(s => s.type === 'added').map(stop => (
             <div key={stop.id} className="absolute -top-2 flex flex-col items-center z-10" style={{ left: `${stop.dist}%` }}><div className="w-6 h-6 rounded-full bg-indigo-600 border-2 border-white shadow-md flex items-center justify-center"><CheckCircle2 size={12} className="text-white" /></div></div>
           ))}
        </div>
      </div>

      <div className="h-64 bg-white border-t border-slate-200 flex flex-col">
         <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center"><h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Trip Manifest</h3><span className="text-xs font-bold text-slate-500">{route.stopsData.length} Stops</span></div>
        <div className="flex-1 overflow-y-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-white sticky top-0 border-b border-slate-100"><tr className="text-xs text-slate-400"><th className="px-6 py-3 font-bold">Seq</th><th className="px-6 py-3 font-bold">Customer / Status</th><th className="px-6 py-3 font-bold">Load</th><th className="px-6 py-3 font-bold text-right">Revenue</th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {route.stopsData.map((stop, idx) => (
                <tr key={stop.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-400 font-mono text-xs">{idx + 1}</td>
                  <td className="px-6 py-3"><p className="font-bold text-slate-800">{stop.name}</p><p className={`text-xs ${stop.description?.includes('Promo') ? 'text-purple-600 font-bold' : 'text-slate-500'}`}>{stop.description || (stop.type === 'start' ? 'Start' : 'Drop')}</p></td>
                  <td className="px-6 py-3">{stop.jars > 0 ? <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full flex w-fit items-center gap-1"><Droplets size={10}/> {stop.jars}</span> : '--'}</td>
                  <td className="px-6 py-3 text-right font-bold text-emerald-600">{stop.profit ? `+₹${stop.profit}` : '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN ORCHESTRATOR COMPONENT ---
const RoutePlanning = () => {
  const [routes, setRoutes] = useState([
    { 
      id: "RT-101", 
      name: "Durgapur Express", 
      vehicle: "Tata 407 (Light)", 
      totalDistance: 120, 
      loadJars: 45, 
      maxJars: 60, 
      startLoc: "Mumbai", 
      endLoc: "Pune", 
      stopsData: [
        { id: 'start', type: 'start', name: 'Mumbai', address: 'Mumbai Central Hub', dist: 0 },
        { id: 1, customerId: 1, type: 'added', name: "Highway Motel", address: "NH-48, Near Panvel Exit", dist: 35, jars: 15, profit: 2200, description: "Active Order Added" },
        { id: 6, customerId: 6, type: 'added', name: "Tech Park Campus", address: "Phase 3, Hinjewadi IT Park", dist: 45, jars: 30, profit: 6500, description: "Active Order Added" },
        { id: 'end', type: 'drop', name: 'Pune', address: 'Pune Regional Depot', dist: 100 }
      ],
      unassignedOrders: [] 
    }
  ]);
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0].id);

  const selectedRoute = routes.find(r => r.id === selectedRouteId);
  const handleUpdateRoute = (updated) => setRoutes(prev => prev.map(r => r.id === updated.id ? updated : r));
  const handleCreateRoute = (newRoute) => { setRoutes([...routes, newRoute]); setSelectedRouteId(newRoute.id); };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <RouteManager routes={routes} selectedRouteId={selectedRouteId} onSelectRoute={setSelectedRouteId} onCreateRoute={handleCreateRoute} />
      {selectedRoute && <RouteAnalyzer route={selectedRoute} onUpdateRoute={handleUpdateRoute} />}
    </div>
  );
};

export default RoutePlanning;
