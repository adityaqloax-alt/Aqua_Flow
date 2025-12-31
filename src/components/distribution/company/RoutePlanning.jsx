import React, { useState, useEffect } from "react";
import { 
  MapPin, Truck, Plus, Zap, Route, CheckCircle2, 
  Navigation, ArrowRight, Wallet, AlertTriangle
} from 'lucide-react';

// --- HELPER: MATH LOGIC FOR LOCATION ---
// In a real app, this uses Lat/Lng (Haversine formula). 
// Here, we simulate it using linear progression (0 = Start, 100 = End).
const calculateDetour = (customerProgress, routeTotalDist) => {
  // Simulating: Ideally customer is at 'customerProgress' km along the route.
  // We generate a random "off-road" distance (0-20km) to simulate reality.
  return Math.floor(Math.random() * 15) + 1; 
};

const RoutePlanning = () => {
  
  // 1. DATA: Active Routes
  const [routes, setRoutes] = useState([
    { 
      id: "RT-101", name: "Durgapur Express", vehicle: "Tata 407", 
      totalDistance: 120, // km
      loadKg: 1500, maxKg: 2500, 
      startLoc: "Warehouse", endLoc: "Asansol Hub",
      stopsData: [
        { id: 'start', type: 'start', name: 'Warehouse', dist: 0 },
        { id: 'end', type: 'drop', name: 'Asansol Hub', dist: 100 } // 100% progress
      ]
    },
    { 
      id: "RT-102", name: "City Loop", vehicle: "Mahindra Pickup", 
      totalDistance: 45, 
      loadKg: 800, maxKg: 1200, 
      startLoc: "Warehouse", endLoc: "Salt Lake Sector 5",
      stopsData: []
    }
  ]);

  // 2. DATA: The "Universe" of Customers with Locations
  // 'progress' represents where they are along the 100km highway (0 to 100)
  const allCustomers = [
    { id: 1, name: "Highway Motel", progress: 35, weight: 200, profit: 2200 },
    { id: 2, name: "Ind. Park B", progress: 65, weight: 500, profit: 5800 },
    { id: 3, name: "Riverside Cafe", progress: 85, weight: 1200, profit: 8000 }, // High weight
    { id: 4, name: "Off-Route Village", progress: 120, weight: 100, profit: 500 }, // Too far (beyond destination)
    { id: 5, name: "City Center Mall", progress: 10, weight: 300, profit: 1500 }, // Too close to start
  ];

  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const [opportunities, setOpportunities] = useState([]);
  const [showAutoDiscovery, setShowAutoDiscovery] = useState(true);

  // 3. EFFECT: Smart Corridor Discovery Algorithm
  useEffect(() => {
    if (!selectedRoute || !showAutoDiscovery) {
      setOpportunities([]);
      return;
    }

    // ALGORITHM: Find customers between Start (0) and End (100)
    // In real maps, this checks if Point C is within buffer of Line A->B
    const detected = allCustomers
      .map(c => {
        const detour = calculateDetour(c.progress, selectedRoute.totalDistance);
        // Score: Higher profit - (Detour penalty)
        const score = Math.max(0, 100 - (detour * 2) + (c.profit / 1000)); 
        
        return { ...c, detour, score: Math.round(score) };
      })
      .filter(c => {
        // FILTER LOGIC:
        // 1. Must be "on the way" (progress > 10% and < 95%)
        // 2. Detour must be reasonable (< 15km)
        // 3. Must fit in remaining truck capacity
        const remainingCap = selectedRoute.maxKg - selectedRoute.loadKg;
        return c.progress > 10 && c.progress < 95 && c.detour < 15 && c.weight <= remainingCap;
      })
      .sort((a, b) => a.progress - b.progress); // Sort by order of appearance on road

    setOpportunities(detected);
  }, [selectedRoute, showAutoDiscovery]); // Re-run when route changes

  // 4. ACTION: Add Stop
  const handleAddStop = (opt) => {
    // Visual update
    const newStop = { 
      id: Date.now(), type: 'added', name: opt.name, dist: opt.progress, 
      weight: opt.weight, profit: opt.profit 
    };

    // Insert into stops based on location (progress)
    const currentStops = [...selectedRoute.stopsData];
    // Find index to insert to keep route sorted by distance
    let insertIndex = currentStops.findIndex(s => s.dist > opt.progress);
    if (insertIndex === -1) insertIndex = currentStops.length;
    
    currentStops.splice(insertIndex, 0, newStop);

    setSelectedRoute({
      ...selectedRoute,
      loadKg: selectedRoute.loadKg + opt.weight,
      stopsData: currentStops
    });

    // Remove from opportunities list
    setOpportunities(opportunities.filter(o => o.id !== opt.id));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 p-4 font-sans text-slate-900 overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Route className="text-indigo-600" /> Location-Aware Router
          </h2>
          <p className="text-sm text-slate-500">Auto-detects customers along the corridor (0km - 100km)</p>
        </div>
        <div className="flex items-center gap-4">
           {/* Capacity Meter */}
           <div className="text-right">
             <p className="text-xs font-bold text-slate-500 uppercase">Truck Load</p>
             <p className={`font-bold ${selectedRoute.loadKg > selectedRoute.maxKg * 0.9 ? 'text-amber-600' : 'text-emerald-600'}`}>
               {selectedRoute.loadKg} / {selectedRoute.maxKg} kg
             </p>
           </div>
           <button 
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
            onClick={() => alert("Trip Dispatched to Driver App!")}
           >
             Dispatch Trip <ArrowRight size={16} />
           </button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 overflow-hidden">
        
        {/* --- LEFT: ACTIVE ROUTES --- */}
        <div className="w-80 bg-white rounded-xl border border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100 font-bold text-slate-700 bg-slate-50 rounded-t-xl">
             Select Route
          </div>
          <div className="p-2 space-y-2 overflow-y-auto">
            {routes.map(route => (
              <div 
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedRoute.id === route.id ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm text-slate-800">{route.name}</h4>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">{route.id}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <Truck size={12} /> {route.vehicle}
                  <span>•</span>
                  <span>{route.totalDistance} km</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-indigo-500" 
                     style={{ width: `${(route.loadKg / route.maxKg)*100}%` }}
                   />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: VISUAL CORRIDOR PLANNER --- */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col relative overflow-hidden">
          
          {/* 1. MAP SIMULATION (Visualizing Location) */}
          <div className="flex-1 bg-slate-100 relative group overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:20px_20px]" />
            
            {/* The "Route Line" */}
            <div className="absolute top-1/2 left-10 right-10 h-2 bg-slate-300 rounded-full transform -translate-y-1/2">
              {/* Progress Line */}
              <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full w-full opacity-20"></div>
              
              {/* Start Point */}
              <div className="absolute -top-3 left-0 flex flex-col items-center">
                 <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center border-4 border-slate-100 shadow-lg z-10">
                   <Navigation size={14} />
                 </div>
                 <span className="text-xs font-bold mt-2 text-slate-700 bg-white/80 px-2 py-0.5 rounded">{selectedRoute.startLoc}</span>
              </div>

              {/* End Point */}
              <div className="absolute -top-3 right-0 flex flex-col items-center">
                 <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center border-4 border-slate-100 shadow-lg z-10">
                   <CheckCircle2 size={14} />
                 </div>
                 <span className="text-xs font-bold mt-2 text-slate-700 bg-white/80 px-2 py-0.5 rounded">{selectedRoute.endLoc}</span>
              </div>

              {/* DYNAMIC OPPORTUNITY PINS ON MAP */}
              {showAutoDiscovery && opportunities.map(opt => (
                <div 
                  key={opt.id}
                  className="absolute -top-10 flex flex-col items-center group cursor-pointer transition-all duration-500"
                  style={{ left: `${opt.progress}%` }} // Position based on location %
                  onClick={() => handleAddStop(opt)}
                >
                  {/* Pin */}
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center border-4 border-white shadow-lg animate-bounce z-20 hover:scale-110 transition-transform">
                    <Zap size={18} fill="white" />
                  </div>
                  {/* Tooltip */}
                  <div className="mt-2 bg-white px-3 py-2 rounded-lg shadow-xl border border-slate-100 text-center min-w-[120px]">
                    <p className="text-xs font-bold text-slate-800">{opt.name}</p>
                    <p className="text-[10px] text-slate-500">+{opt.detour}km Detour</p>
                    <button className="mt-1 w-full bg-indigo-600 text-white text-[10px] font-bold py-1 rounded">Add</button>
                  </div>
                  {/* Connection Line to Road */}
                  <div className="absolute top-8 w-0.5 h-6 bg-amber-500 border-l border-dashed border-amber-300"></div>
                </div>
              ))}

              {/* ADDED STOPS ON MAP */}
              {selectedRoute.stopsData.filter(s => s.type === 'added').map(stop => (
                 <div 
                   key={stop.id}
                   className="absolute -top-2 flex flex-col items-center"
                   style={{ left: `${stop.dist}%` }}
                 >
                   <div className="w-6 h-6 rounded-full bg-indigo-600 border-2 border-white shadow-md z-10" />
                   <span className="text-[10px] font-bold mt-1 text-indigo-700 bg-indigo-50 px-2 rounded-full">{stop.name}</span>
                 </div>
              ))}

            </div>
            
            <div className="absolute bottom-4 left-4">
               <div className="flex items-center gap-2 bg-white/90 px-3 py-2 rounded-lg shadow-sm text-xs font-bold text-slate-600 border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showAutoDiscovery}
                      onChange={(e) => setShowAutoDiscovery(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    Auto-Discover Corridor
                  </label>
               </div>
            </div>
          </div>

          {/* 2. TABULAR MANIFEST (Bottom Half) */}
          <div className="h-64 bg-white border-t border-slate-200 flex flex-col">
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex justify-between">
              <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Trip Manifest (Ordered by Location)</h3>
              <span className="text-xs font-bold text-slate-500">{selectedRoute.stopsData.length} Stops</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-0">
               <table className="w-full text-left text-sm">
                 <thead className="bg-white sticky top-0">
                   <tr className="text-xs text-slate-400 border-b border-slate-100">
                     <th className="px-6 py-3 font-bold">Sequence</th>
                     <th className="px-6 py-3 font-bold">Customer / Stop</th>
                     <th className="px-6 py-3 font-bold">Action</th>
                     <th className="px-6 py-3 font-bold text-right">Profit Impact</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {selectedRoute.stopsData.map((stop, idx) => (
                     <tr key={stop.id} className={stop.type === 'added' ? 'bg-indigo-50/50 animate-in fade-in' : ''}>
                       <td className="px-6 py-3">
                         <div className="flex items-center gap-3">
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                             stop.type === 'start' ? 'bg-slate-200 text-slate-600' :
                             stop.type === 'drop' ? 'bg-emerald-100 text-emerald-700' :
                             'bg-indigo-100 text-indigo-700'
                           }`}>
                             {idx + 1}
                           </div>
                           {idx < selectedRoute.stopsData.length - 1 && (
                             <div className="h-8 w-0.5 bg-slate-200 absolute ml-3 mt-8 -z-10" />
                           )}
                         </div>
                       </td>
                       <td className="px-6 py-3">
                         <p className="font-bold text-slate-800">{stop.name}</p>
                         <p className="text-xs text-slate-500">{stop.type === 'added' ? 'Auto-Added Opportunity' : 'Scheduled Stop'}</p>
                       </td>
                       <td className="px-6 py-3">
                         {stop.weight ? (
                           <span className={`text-xs font-bold px-2 py-1 rounded-full ${stop.type === 'added' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                             {stop.weight > 0 ? `Load: +${stop.weight}kg` : `Unload: ${Math.abs(stop.weight)}kg`}
                           </span>
                         ) : (
                           <span className="text-xs text-slate-400">--</span>
                         )}
                       </td>
                       <td className="px-6 py-3 text-right">
                         {stop.profit ? (
                           <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center justify-end gap-1 ml-auto w-fit">
                             <Wallet size={12} /> +₹{stop.profit}
                           </span>
                         ) : <span className="text-slate-300">-</span>}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoutePlanning;
