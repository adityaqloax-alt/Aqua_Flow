import React, { useState, useRef } from 'react';
import { 
  Camera, CheckCircle, Upload, Clock, MapPin, User, 
  Droplets, AlertCircle, Phone, MessageSquare 
} from 'lucide-react';

const DeliveryConfirmation = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: "DEL-8821",
      customer: "TechSpace IT Park",
      address: "Building 4, Sector 5, Salt Lake",
      jars: 50,
      timeWindow: "09:00 AM - 11:00 AM",
      status: "in_transit", // assigned | in_transit | delivered | delayed
      contact: "+91 98765 43210"
    },
    {
      id: "DEL-8822",
      customer: "Green Valley Apartments",
      address: "12 Main Road, New Town",
      jars: 20,
      timeWindow: "11:30 AM - 01:00 PM",
      status: "assigned",
      contact: "+91 98765 43211"
    }
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [proofType, setProofType] = useState("photo"); // photo | signature | whatsapp
  const [capturedProof, setCapturedProof] = useState(null);
  const [empties, setEmpties] = useState(0);
  const fileInputRef = useRef();

  const handleCaptureProof = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedProof(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmDelivery = () => {
    if (!capturedProof) {
      alert("Please provide delivery proof!");
      return;
    }

    setDeliveries(deliveries.map(d => 
      d.id === selectedDelivery.id 
        ? { ...d, status: "delivered", proof: capturedProof, empties } 
        : d
    ));

    alert(`✅ Delivery ${selectedDelivery.id} confirmed successfully!`);
    setSelectedDelivery(null);
    setCapturedProof(null);
    setEmpties(0);
  };

  const handleMarkDelayed = () => {
    const reason = prompt("Enter delay reason:");
    if (reason) {
      setDeliveries(deliveries.map(d => 
        d.id === selectedDelivery.id 
          ? { ...d, status: "delayed", delayReason: reason } 
          : d
      ));
      setSelectedDelivery(null);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      
      {/* Left: Delivery List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Droplets size={20} /> Today's Deliveries
          </h2>
          <p className="text-xs text-indigo-100 mt-1">Tap to confirm completion</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {deliveries.map(delivery => (
            <div 
              key={delivery.id}
              onClick={() => setSelectedDelivery(delivery)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedDelivery?.id === delivery.id 
                  ? 'bg-indigo-50 border-indigo-500 shadow-lg' 
                  : delivery.status === 'delivered' 
                    ? 'bg-emerald-50 border-emerald-300 opacity-60'
                    : delivery.status === 'delayed'
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {delivery.id}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  delivery.status === 'delivered' ? 'bg-emerald-500 text-white' :
                  delivery.status === 'delayed' ? 'bg-amber-500 text-white' :
                  delivery.status === 'in_transit' ? 'bg-blue-500 text-white' :
                  'bg-slate-300 text-slate-700'
                }`}>
                  {delivery.status === 'delivered' ? '✓ Delivered' :
                   delivery.status === 'delayed' ? '⚠ Delayed' :
                   delivery.status === 'in_transit' ? '→ In Transit' : 'Assigned'}
                </span>
              </div>

              <h3 className="font-bold text-slate-800 mb-1">{delivery.customer}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                <MapPin size={12} /> {delivery.address}
              </p>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                <span className="text-sm font-bold text-indigo-600">
                  {delivery.jars} Jars
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock size={12} /> {delivery.timeWindow}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Confirmation Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        {!selectedDelivery ? (
          <div className="text-center text-slate-400">
            <Droplets size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-bold">Select a delivery to confirm</p>
          </div>
        ) : selectedDelivery.status === 'delivered' ? (
          <div className="text-center">
            <CheckCircle size={80} className="text-emerald-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Already Delivered</h3>
            <p className="text-slate-500">Proof captured on {new Date().toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                  Confirm Delivery
                </h2>
                <p className="text-sm text-slate-500 font-mono">{selectedDelivery.id}</p>
              </div>
              <button 
                onClick={handleMarkDelayed}
                className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-bold text-sm hover:bg-amber-200"
              >
                <AlertCircle size={16} /> Report Delay
              </button>
            </div>

            {/* Customer Info */}
            <div className="bg-slate-50 p-4 rounded-xl mb-6">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <User size={18} /> Customer Details
              </h3>
              <p className="text-slate-700 font-bold mb-1">{selectedDelivery.customer}</p>
              <p className="text-sm text-slate-500 mb-2">{selectedDelivery.address}</p>
              <a 
                href={`tel:${selectedDelivery.contact}`}
                className="text-sm text-indigo-600 font-bold flex items-center gap-2 hover:underline"
              >
                <Phone size={14} /> {selectedDelivery.contact}
              </a>
            </div>

            {/* Delivery Quantity */}
            <div className="mb-6">
              <label className="text-sm font-bold text-slate-600 mb-2 block">
                Delivered Quantity
              </label>
              <div className="flex items-center gap-3 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <Droplets size={24} className="text-indigo-600" />
                <span className="text-3xl font-bold text-indigo-600">
                  {selectedDelivery.jars} Jars
                </span>
              </div>
            </div>

            {/* Empty Jars Collected */}
            <div className="mb-6">
              <label className="text-sm font-bold text-slate-600 mb-2 block">
                Empty Jars Collected
              </label>
              <input 
                type="number"
                value={empties}
                onChange={(e) => setEmpties(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter number of empties"
              />
            </div>

            {/* Proof Type Selection */}
            <div className="mb-6">
              <label className="text-sm font-bold text-slate-600 mb-3 block">
                Delivery Proof Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setProofType("photo")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    proofType === 'photo' 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Camera className="mx-auto mb-2" size={24} />
                  <p className="text-xs font-bold">Photo</p>
                </button>
                <button
                  onClick={() => setProofType("signature")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    proofType === 'signature' 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Upload className="mx-auto mb-2" size={24} />
                  <p className="text-xs font-bold">Signature</p>
                </button>
                <button
                  onClick={() => setProofType("whatsapp")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    proofType === 'whatsapp' 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <MessageSquare className="mx-auto mb-2" size={24} />
                  <p className="text-xs font-bold">WhatsApp</p>
                </button>
              </div>
            </div>

            {/* Proof Capture */}
            <div className="mb-6">
              <input 
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                onChange={handleCaptureProof}
                className="hidden"
              />
              
              {!capturedProof ? (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="w-full p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                >
                  <Camera size={48} className="mx-auto mb-3 text-slate-400" />
                  <p className="font-bold text-slate-600">Capture Proof</p>
                  <p className="text-xs text-slate-400 mt-1">Take photo or upload signature</p>
                </button>
              ) : (
                <div className="relative">
                  <img 
                    src={capturedProof} 
                    alt="Proof" 
                    className="w-full h-64 object-cover rounded-xl border border-slate-200"
                  />
                  <button
                    onClick={() => setCapturedProof(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold"
                  >
                    Retake
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedDelivery(null)}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelivery}
                disabled={!capturedProof}
                className={`flex-1 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                  capturedProof 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle size={20} /> Confirm Delivery
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryConfirmation;
