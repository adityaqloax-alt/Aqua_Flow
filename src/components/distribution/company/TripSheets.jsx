import React, { useRef } from 'react';
import { 
  Printer, 
  MapPin, 
  Truck, 
  Calendar, 
  User, 
  Droplets, 
  FileText,
  CheckSquare,
  QrCode,
  Clock,
  AlertTriangle
} from 'lucide-react';

const TripSheets = () => {
  const printRef = useRef();

  // Mock Manifest Data
  const tripData = {
    id: "TRIP-2026-1051",
    date: "Jan 05, 2026",
    route: "Route B - Tech Park Loop",
    driver: "Sunil Singh",
    vehicle: "WB-02-9988 (Mahindra Pickup)",
    vehicleCapacity: "100 Jars",
    startTime: "08:30 AM",
    stops: [
      { 
        seq: 1, 
        customer: "TechSpace IT Park", 
        address: "Building 4, Sector 5, Salt Lake", 
        contact: "Admin Office: +91 98765 43210", 
        jars: 50, 
        notes: "🔒 Gate Pass Required. Use Service Lift. Contact security 10 mins before arrival.",
        collectEmpties: true,
        timeWindow: "09:00 AM - 11:00 AM"
      },
      { 
        seq: 2, 
        customer: "Green Valley Apartments", 
        address: "12 Main Road, New Town", 
        contact: "Security Gate: +91 98765 43211", 
        jars: 20, 
        notes: "📞 Call before arrival. Park near Gate B.",
        collectEmpties: true,
        timeWindow: "11:30 AM - 01:00 PM"
      },
      { 
        seq: 3, 
        customer: "City Gym & Spa", 
        address: "Mall Road, Unit 5", 
        contact: "Manager: +91 98765 43212", 
        jars: 15, 
        notes: "🚪 Deliver to back entrance. Avoid front during peak hours (6-9 AM).",
        collectEmpties: true,
        timeWindow: "01:30 PM - 03:00 PM"
      },
      { 
        seq: 4, 
        customer: "Sunrise Cafe", 
        address: "Plot 44, IT Sector", 
        contact: "Chef Raj: +91 98765 43213", 
        jars: 10, 
        notes: "💰 Cash on Delivery (COD): ₹1,500. Collect payment before unloading.",
        collectEmpties: false,
        timeWindow: "03:30 PM - 05:00 PM"
      },
    ]
  };

  const totalJars = tripData.stops.reduce((sum, stop) => sum + stop.jars, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6 overflow-y-auto">
      
      {/* 1. Screen-Only Controls (Hidden on Print) */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Trip Sheet Generator</h2>
          <p className="text-sm text-slate-500">
            Generate and print daily delivery manifests for drivers • Compliance-ready format
          </p>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
        >
          <Printer size={20} /> Print Manifest
        </button>
      </div>

      {/* 2. The Paper Sheet (What gets printed) */}
      <div 
        ref={printRef}
        className="max-w-5xl mx-auto bg-white p-10 shadow-2xl print:shadow-none print:w-full print:max-w-none print:p-6"
      >
        
        {/* Header Section */}
        <div className="border-b-4 border-slate-900 pb-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center rounded-lg font-bold text-3xl shadow-lg print:bg-black print:text-white">
                AQ
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-wide">
                  Daily Trip Sheet
                </h1>
                <p className="text-sm text-slate-500 font-mono mt-1">{tripData.id}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Water Delivery Manifest • AquaFlow ERP
                </p>
              </div>
            </div>
            <div className="text-right">
              <QrCode size={80} className="ml-auto text-slate-800 print:text-black" />
              <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold">
                Scan to Start Trip
              </p>
            </div>
          </div>

          {/* Trip Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Date</p>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <Calendar size={14} /> {tripData.date}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Route</p>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <MapPin size={14} /> {tripData.route}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Driver</p>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <User size={14} /> {tripData.driver}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Vehicle</p>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <Truck size={14} /> {tripData.vehicle}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Load</p>
              <p className="font-bold text-indigo-600 flex items-center gap-2">
                <Droplets size={14} /> {totalJars} Jars
              </p>
            </div>
          </div>
        </div>

        {/* Pre-Trip Water Safety Checklist (Section 3 Step 2 & Section 5) */}
        <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-lg mb-8 print:bg-white print:border-slate-400">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-600 print:text-black" />
            <p className="text-sm font-bold text-amber-900 uppercase print:text-black">
              Critical: Water Safety & Vehicle Inspection (Mandatory)
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm font-medium text-slate-700">
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-400 rounded print:border-black"></div> 
              Tanker Cleanliness Verified
            </span>
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-400 rounded print:border-black"></div> 
              Valves & Seals (No Leaks)
            </span>
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-400 rounded print:border-black"></div> 
              Delivery Hoses Sanitized
            </span>
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-400 rounded print:border-black"></div> 
              Tank Lids Secured (Closed)
            </span>
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-400 rounded print:border-black"></div> 
              Tire Pressure & Fuel Level
            </span>
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-400 rounded print:border-black"></div> 
              Driver License & Documents
            </span>
          </div>
        </div>

        {/* The Delivery Table */}
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="border-b-2 border-slate-900">
              <th className="py-3 w-12 text-center text-xs font-bold uppercase text-slate-600 print:text-black">
                Seq
              </th>
              <th className="py-3 w-1/4 text-xs font-bold uppercase text-slate-600 print:text-black">
                Customer Details
              </th>
              <th className="py-3 text-xs font-bold uppercase text-slate-600 print:text-black">
                Delivery Jars
              </th>
              <th className="py-3 w-20 text-xs font-bold uppercase text-slate-600 print:text-black">
                In Time
              </th>
              <th className="py-3 w-20 text-xs font-bold uppercase text-slate-600 print:text-black">
                Out Time
              </th>
              <th className="py-3 w-20 text-xs font-bold uppercase text-slate-600 print:text-black">
                Empties
              </th>
              <th className="py-3 w-32 text-xs font-bold uppercase text-slate-600 print:text-black">
                Signature
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {tripData.stops.map((stop) => (
              <tr key={stop.seq} className="border-b border-slate-200">
                <td className="py-4 text-center font-bold text-slate-500 align-top print:text-black">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center mx-auto font-bold text-indigo-700 print:border-2 print:border-black print:bg-white print:text-black">
                    {stop.seq}
                  </div>
                </td>
                
                <td className="py-4 align-top pr-4">
                  <p className="font-bold text-slate-900 text-base mb-1">
                    {stop.customer}
                  </p>
                  <p className="text-slate-600 text-xs mb-1 flex items-start gap-1">
                    <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                    {stop.address}
                  </p>
                  <p className="text-slate-500 text-xs mb-1">📞 {stop.contact}</p>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <Clock size={12} /> {stop.timeWindow}
                  </p>
                  {stop.notes && (
                    <div className="mt-2 text-xs bg-amber-50 text-amber-900 p-2 rounded border border-amber-200 print:bg-white print:border-slate-300 print:text-black">
                      <span className="font-bold">Note: </span>{stop.notes}
                    </div>
                  )}
                </td>

                <td className="py-4 align-top">
                  <div className="flex items-center gap-2">
                    <Droplets size={16} className="text-indigo-600 print:text-black" />
                    <span className="font-bold text-indigo-700 text-lg print:text-black">
                      {stop.jars} Jars
                    </span>
                  </div>
                </td>

                <td className="py-4 align-top">
                  <div className="w-full h-8 border border-slate-300 bg-slate-50 rounded print:bg-white print:border-black"></div>
                </td>

                <td className="py-4 align-top">
                  <div className="w-full h-8 border border-slate-300 bg-slate-50 rounded print:bg-white print:border-black"></div>
                </td>

                <td className="py-4 align-top">
                  {stop.collectEmpties ? (
                    <div className="w-16 h-8 border border-slate-300 bg-slate-50 rounded print:bg-white print:border-black"></div>
                  ) : (
                    <span className="text-xs text-slate-400 print:text-black">N/A</span>
                  )}
                </td>

                <td className="py-4 align-top">
                  <div className="h-12 border-b-2 border-slate-400 border-dashed print:border-black"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer / End of Trip Summary */}
        <div className="border-t-4 border-slate-900 pt-6 flex justify-between items-end">
          <div className="text-sm">
            <p className="font-bold text-slate-800 mb-4 print:text-black">
              End of Trip Summary (Complete at Warehouse):
            </p>
            <div className="grid grid-cols-3 gap-8 w-[600px]">
              <div>
                <p className="text-xs text-slate-500 mb-2 print:text-black">Starting Odometer</p>
                <div className="border-b-2 border-slate-400 w-full h-8 print:border-black"></div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-2 print:text-black">Ending Odometer</p>
                <div className="border-b-2 border-slate-400 w-full h-8 print:border-black"></div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-2 print:text-black">Total Cash Collected</p>
                <div className="border-b-2 border-slate-400 w-full h-8 print:border-black"></div>
              </div>
            </div>
            
            <div className="mt-6 bg-red-50 border border-red-200 p-3 rounded print:bg-white print:border-black">
              <p className="text-xs font-bold text-red-900 print:text-black">
                ⚠️ Report any water quality issues or spillage immediately to dispatcher
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="mb-10">
              <p className="text-xs text-slate-500 uppercase mb-10 print:text-black">
                Driver Signature
              </p>
              <div className="w-48 border-b-2 border-slate-900 print:border-black"></div>
              <p className="text-xs text-slate-400 mt-1 print:text-black">
                {tripData.driver}
              </p>
            </div>
            <p className="text-[10px] text-slate-400 print:text-black">
              Generated by AquaFlow ERP • {tripData.date}
            </p>
          </div>
        </div>

      </div>

      {/* Print Instructions (Screen Only) */}
      <div className="max-w-5xl mx-auto mt-6 bg-blue-50 border border-blue-200 p-4 rounded-xl print:hidden">
        <p className="text-sm font-bold text-blue-900 mb-2">📋 Print Instructions:</p>
        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
          <li>Set paper size to <strong>A4</strong> or <strong>Letter</strong></li>
          <li>Enable <strong>"Background Graphics"</strong> for best quality</li>
          <li>Use <strong>Portrait</strong> orientation</li>
          <li>Margins: <strong>Default</strong> or <strong>Minimum</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default TripSheets;
