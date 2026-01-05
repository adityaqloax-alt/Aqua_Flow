import React, { useState } from "react";
import { 
  FileText, Eye, Download, Shield, Search, Filter, 
  CheckCircle, XCircle, Clock, User, Truck, MapPin, 
  IndianRupee, Phone, MessageCircle, Calendar
} from "lucide-react";

const PODViewer = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPod, setSelectedPod] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);

  const pods = [
    {
      id: "DEL-0981",
      route: "Route A - City Center",
      driver: "Ramesh K. (#402)",
      customer: "Hotel Taj Palace",
      status: "Verified",
      amount: 4500,
      date: "Dec 30, 2024 14:32",
      file: "POD_DEL-0981_Signed.pdf",
      signature: "Customer Signed ✓",
      location: "Lat: 28.6139° N, Long: 77.2090° E",
      payment: "UPI - Instant",
      notes: "3 x 20L jars delivered"
    },
    {
      id: "DEL-0974",
      route: "Route B - North Zone",
      driver: "Suresh M. (#405)",
      customer: "Apollo Hospital",
      status: "Pending Verification",
      amount: 2400,
      date: "Dec 30, 2024 11:45",
      file: "POD_DEL-0974_Signed.pdf",
      signature: "Pending",
      location: "Lat: 28.7041° N, Long: 77.1025° E",
      payment: "Cash Collected",
      notes: "2 x 1L cases + 10 x 500ml"
    },
    {
      id: "DEL-0968",
      route: "Route A - City Center",
      driver: "Ramesh K. (#402)",
      customer: "City Mall Food Court",
      status: "Disputed",
      amount: 1800,
      date: "Dec 29, 2024 16:20",
      file: "POD_DEL-0968_Signed.pdf",
      signature: "Partial Signature",
      location: "Lat: 28.6139° N, Long: 77.2090° E",
      payment: "Credit - ₹800 Pending",
      notes: "Customer reported 2 missing jars"
    },
    {
      id: "DEL-0955",
      route: "Route C - West Hub",
      driver: "Pending Assignment",
      customer: "West End School",
      status: "Scheduled",
      amount: 3200,
      date: "Dec 31, 2024 09:30",
      file: "POD_DEL-0955_Scheduled.pdf",
      signature: "N/A",
      location: "TBD",
      payment: "Subscription Auto-debit",
      notes: "Daily school delivery"
    }
  ];

  // Filter & Search Logic
  const filteredPods = pods.filter(pod => {
    const matchesSearch = pod.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pod.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pod.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "verified") return matchesSearch && pod.status === "Verified";
    if (filter === "pending") return matchesSearch && pod.status === "Pending Verification";
    if (filter === "disputed") return matchesSearch && pod.status === "Disputed";
    if (filter === "scheduled") return matchesSearch && pod.status === "Scheduled";
    return matchesSearch;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case "Verified": return { color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle };
      case "Pending Verification": return { color: "text-amber-600 bg-amber-50 border-amber-100", icon: Clock };
      case "Disputed": return { color: "text-rose-600 bg-rose-50 border-rose-100", icon: XCircle };
      case "Scheduled": return { color: "text-slate-500 bg-slate-50 border-slate-200", icon: Calendar };
      default: return { color: "text-slate-500 bg-slate-50 border-slate-200", icon: FileText };
    }
  };

  const openPreview = (pod) => {
    setSelectedPod(pod);
    setPreviewModal(true);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in zoom-in duration-500">
      
      {/* HEADER & FILTERS */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Shield className="text-emerald-600" size={24} />
              Proof of Delivery
            </h3>
            <p className="text-sm text-slate-500">Digital signed documents & delivery verification</p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
            {pods.length} Documents
          </span>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, customer, or route..." 
              className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {["all", "verified", "pending", "disputed", "scheduled"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all whitespace-nowrap ${
                  filter === f 
                    ? "bg-white shadow-sm text-slate-800" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {f === "all" ? "All" : f === "verified" ? "Verified" : f === "pending" ? "Pending" : f === "disputed" ? "Disputed" : "Scheduled"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* POD LIST */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {filteredPods.map((pod, idx) => {
          const StatusIcon = getStatusConfig(pod.status).icon;
          const statusConfig = getStatusConfig(pod.status);

          return (
            <div 
              key={pod.id}
              className={`
                group bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer
                ${statusConfig.color} hover:border-indigo-200
                ${pod.status === "Disputed" ? "ring-2 ring-rose-200/50" : ""}
              `}
              onClick={() => openPreview(pod)}
            >
              {/* HEADER */}
              <div className="p-6 pb-4 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-sm">
                        <FileText size={24} className="text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-800 truncate">{pod.id}</h4>
                        <p className="text-sm text-slate-600 font-medium truncate">{pod.customer}</p>
                      </div>
                    </div>

                    {/* ROUTE & DRIVER */}
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Truck size={14} />
                        <span>{pod.route}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{pod.driver}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee size={14} />
                        <span className="font-mono font-bold text-slate-800">₹{pod.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="flex flex-col items-end gap-2">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border shadow-lg ${statusConfig.color}`}>
                      <StatusIcon size={16} />
                      {pod.status}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock size={12} />
                      {pod.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER ACTIONS (Always visible on hover) */}
              <div className="p-4 bg-slate-50/50 backdrop-blur-sm flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {pod.location}
                  </span>
                  <span>{pod.payment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg shadow-sm transition-all group-hover:scale-105"
                    title="Preview Document"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPreview(pod);
                    }}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-200 transition-all group-hover:scale-105 active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download logic here
                      console.log("Download:", pod.file);
                    }}
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredPods.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12">
            <FileText size={64} className="opacity-30 mb-6" />
            <h3 className="text-xl font-bold mb-2">No PODs Found</h3>
            <p className="text-sm mb-8">Try adjusting your search or filter settings</p>
            <div className="flex gap-2">
              <button 
                className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PREVIEW MODAL */}
      {previewModal && selectedPod && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] w-full max-w-md mx-4 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <FileText size={24} className="text-emerald-600" />
                POD Preview: {selectedPod.id}
              </h4>
              <button 
                onClick={() => setPreviewModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Mock PDF Preview */}
              <div className="bg-gradient-to-b from-slate-50 to-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
                <FileText size={64} className="mx-auto mb-4 text-slate-400" />
                <h5 className="text-lg font-bold text-slate-700 mb-2">{selectedPod.file}</h5>
                <p className="text-sm text-slate-500 mb-6">{selectedPod.customer} - {selectedPod.date}</p>
                <div className="space-y-2 text-xs text-slate-600">
                  <div>Driver: {selectedPod.driver}</div>
                  <div>Route: {selectedPod.route}</div>
                  <div>Amount: ₹{selectedPod.amount.toLocaleString()}</div>
                  <div>Status: {selectedPod.status}</div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex gap-3 justify-end">
              <button 
                className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                onClick={() => setPreviewModal(false)}
              >
                Close
              </button>
              <button className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PODViewer;
