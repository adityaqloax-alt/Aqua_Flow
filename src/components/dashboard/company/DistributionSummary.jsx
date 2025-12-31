import React from 'react';
import { 
  Truck, MapPin, Clock, AlertTriangle, 
  ArrowRight, Navigation, Fuel 
} from 'lucide-react';

// --- MOCK DATA ---
const distributionStats = [
  { label: 'Active Fleet', value: '12/15', subtext: '3 Maintenance', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { label: 'Deliveries Done', value: '45', subtext: '8 Pending', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { label: 'Avg. Delay', value: '12m', subtext: 'Traffic: High', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
];

const activeTrips = [
  { id: 'TR-401', driver: 'Ramesh K.', route: 'North Zone (Route A)', status: 'In Transit', eta: '15 mins', vehicle: 'MH-12-GT-8821' },
  { id: 'TR-402', driver: 'Suresh P.', route: 'City Center', status: 'Unloading', eta: 'Now', vehicle: 'MH-14-XC-9920' },
  { id: 'TR-405', driver: 'Vikram S.', route: 'Industrial Area', status: 'Delayed', eta: '+45 mins', vehicle: 'MH-04-AB-1234' },
];

const DistributionSummary = () => {
  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Truck className="text-indigo-600" size={24} />
            Distribution & Fleet
          </h2>
          <p className="text-sm text-slate-500 mt-1">Live tracking of logistics operations</p>
        </div>
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          Track Map <ArrowRight size={16} />
        </button>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {distributionStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`bg-white p-4 rounded-xl border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={stat.color} size={20} />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-slate-500 font-medium uppercase">{stat.label}</p>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                    {stat.subtext}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Live Trip Status & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Active Trips List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
             <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
               <Navigation size={16} className="text-slate-400"/> Live Trips
             </h3>
             <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">GPS Active</span>
          </div>
          <div className="p-2 space-y-1">
            {activeTrips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border-b last:border-0 border-slate-50">
                <div className="flex items-center gap-3">
                  {/* Status Indicator Dot */}
                  <div className={`w-2 h-2 rounded-full ${
                    trip.status === 'In Transit' ? 'bg-indigo-500 animate-pulse' : 
                    trip.status === 'Delayed' ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}></div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-700 text-sm">{trip.route}</p>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1 rounded">{trip.vehicle}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Driver: <span className="text-slate-600 font-medium">{trip.driver}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-sm font-bold ${
                    trip.status === 'Delayed' ? 'text-rose-600' : 'text-slate-700'
                  }`}>
                    {trip.eta}
                  </p>
                  <p className="text-[10px] font-bold uppercase text-slate-400">{trip.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Fuel & Alerts */}
        <div className="space-y-4">
           {/* Fuel Cost Mini-Card */}
           <div className="bg-slate-800 rounded-xl p-5 text-white shadow-lg shadow-slate-300">
             <div className="flex items-center gap-2 mb-2 opacity-80">
               <Fuel size={16}/>
               <span className="text-xs font-bold uppercase tracking-wider">Fuel Cost (Today)</span>
             </div>
             <div className="text-2xl font-bold">₹12,450</div>
             <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
               <div className="bg-amber-400 h-full w-[75%] rounded-full"></div>
             </div>
             <p className="text-[10px] text-slate-400 mt-1 text-right">75% of daily budget used</p>
           </div>

           {/* Route Alert */}
           <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
             <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5"/>
             <div>
               <h4 className="text-xs font-bold text-amber-800 uppercase">Route Deviation</h4>
               <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                 Vehicle MH-04-AB-1234 deviated from optimal route. Potential delay: 20 mins.
               </p>
               <button className="mt-2 text-[10px] font-bold bg-white text-amber-700 border border-amber-200 px-2 py-1 rounded hover:bg-amber-100">
                 Call Driver
               </button>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DistributionSummary;
