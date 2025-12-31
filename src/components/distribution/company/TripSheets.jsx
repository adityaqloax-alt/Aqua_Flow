import React, { useRef } from 'react';
import { 
  Printer, 
  MapPin, 
  Truck, 
  Calendar, 
  User, 
  Box, 
  FileText,
  CheckSquare,
  QrCode
} from 'lucide-react';

const TripSheets = () => {
  const printRef = useRef();

  // Mock Manifest Data
  const tripData = {
    id: "TRIP-2025-8821",
    date: "Oct 24, 2025",
    route: "Route B - Tech Park Loop",
    driver: "Sunil Singh",
    vehicle: "WB-02-9988 (Mahindra Pickup)",
    startTime: "08:30 AM",
    stops: [
      { 
        seq: 1, 
        customer: "TechSpace IT Park", 
        address: "Building 4, Sector 5, Salt Lake", 
        contact: "Admin Office", 
        order: "50x 20L Jars", 
        notes: "Gate Pass Required. Use Service Lift.",
        collect: true 
      },
      { 
        seq: 2, 
        customer: "Green Valley Apts", 
        address: "12 Main Road, New Town", 
        contact: "Security Gate", 
        order: "20x 20L Jars, 5x Cases", 
        notes: "Call before arrival.",
        collect: true 
      },
      { 
        seq: 3, 
        customer: "City Gym & Spa", 
        address: "Mall Road, Unit 5", 
        contact: "Manager", 
        order: "15x 20L Jars", 
        notes: "Deliver to back entrance.",
        collect: true 
      },
      { 
        seq: 4, 
        customer: "Sunrise Cafe", 
        address: "Plot 44, IT Sector", 
        contact: "Chef Raj", 
        order: "10x 20L Jars", 
        notes: "Cash on Delivery (COD): ₹1500",
        collect: false 
      },
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 h-full p-6 overflow-y-auto">
      
      {/* 1. Screen-Only Controls (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Trip Sheet Generator</h2>
          <p className="text-sm text-slate-500">Generate and print daily delivery manifests for drivers.</p>
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
        className="max-w-4xl mx-auto bg-white p-8 shadow-xl print:shadow-none print:w-full print:max-w-none print:p-0"
      >
        
        {/* Header Section */}
        <div className="border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center rounded font-bold text-2xl print:bg-black print:text-white">
                TS
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Daily Trip Sheet</h1>
                <p className="text-sm text-slate-500 font-mono">{tripData.id}</p>
              </div>
            </div>
            <div className="text-right">
              <QrCode size={64} className="ml-auto text-slate-800" />
              <p className="text-[10px] text-slate-400 mt-1 uppercase">Scan to Start Trip</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Date</p>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <Calendar size={14} /> {tripData.date}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Route</p>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <MapPin size={14} /> {tripData.route}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Driver</p>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <User size={14} /> {tripData.driver}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Vehicle</p>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <Truck size={14} /> {tripData.vehicle}
              </p>
            </div>
          </div>
        </div>

        {/* Pre-Trip Checklist (Compliance) */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg mb-8 print:bg-white print:border-slate-300">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Driver Pre-Trip Inspection (Tick to confirm)</p>
          <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-700">
            <span className="flex items-center gap-2"><div className="w-4 h-4 border border-slate-400 rounded"></div> Fuel Level OK</span>
            <span className="flex items-center gap-2"><div className="w-4 h-4 border border-slate-400 rounded"></div> Tires Pressure</span>
            <span className="flex items-center gap-2"><div className="w-4 h-4 border border-slate-400 rounded"></div> Documents/License</span>
            <span className="flex items-center gap-2"><div className="w-4 h-4 border border-slate-400 rounded"></div> Load Secured</span>
          </div>
        </div>

        {/* The Delivery Table */}
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="border-b-2 border-slate-800">
              <th className="py-2 w-12 text-center text-xs font-bold uppercase text-slate-600">Seq</th>
              <th className="py-2 w-1/3 text-xs font-bold uppercase text-slate-600">Customer Details</th>
              <th className="py-2 text-xs font-bold uppercase text-slate-600">Delivery Items</th>
              <th className="py-2 w-24 text-xs font-bold uppercase text-slate-600">Returns (Empty)</th>
              <th className="py-2 w-32 text-xs font-bold uppercase text-slate-600">Customer Sign</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {tripData.stops.map((stop) => (
              <tr key={stop.seq} className="border-b border-slate-200">
                <td className="py-4 text-center font-bold text-slate-500 align-top">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mx-auto print:border print:border-slate-300">
                    {stop.seq}
                  </div>
                </td>
                
                <td className="py-4 align-top pr-4">
                  <p className="font-bold text-slate-900 text-base">{stop.customer}</p>
                  <p className="text-slate-600 mt-1">{stop.address}</p>
                  <p className="text-slate-500 text-xs mt-1">Contact: {stop.contact}</p>
                  {stop.notes && (
                    <div className="mt-2 text-xs bg-amber-50 text-amber-800 p-1.5 rounded border border-amber-100 flex items-start gap-1 print:bg-white print:border-slate-300 print:text-slate-600 print:italic">
                      <span className="font-bold">Note:</span> {stop.notes}
                    </div>
                  )}
                </td>

                <td className="py-4 align-top">
                  <div className="flex items-start gap-2">
                    <Box size={16} className="text-indigo-600 mt-0.5 print:text-black" />
                    <span className="font-medium text-slate-800">{stop.order}</span>
                  </div>
                </td>

                <td className="py-4 align-top">
                   {stop.collect ? (
                     <div className="w-16 h-8 border border-slate-300 bg-slate-50 rounded print:bg-white"></div>
                   ) : (
                     <span className="text-xs text-slate-400">-</span>
                   )}
                </td>

                <td className="py-4 align-top">
                   <div className="h-12 border-b border-slate-300 border-dashed"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer / Summary */}
        <div className="border-t-2 border-slate-800 pt-6 flex justify-between items-end">
          <div className="text-sm">
            <p className="font-bold text-slate-800">End of Trip Summary:</p>
            <div className="mt-4 grid grid-cols-2 gap-8 w-64">
              <div>
                <p className="text-xs text-slate-500 mb-1">Ending Odometer</p>
                <div className="border-b border-slate-400 w-full h-6"></div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Total Cash Collected</p>
                <div className="border-b border-slate-400 w-full h-6"></div>
              </div>
            </div>
          </div>

          <div className="text-right">
             <div className="mb-8">
               <p className="text-xs text-slate-500 uppercase mb-8">Driver Signature</p>
               <div className="w-48 border-b border-slate-800"></div>
             </div>
             <p className="text-[10px] text-slate-400">Generated by AquaFlow ERP • {new Date().toLocaleDateString()}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripSheets;
