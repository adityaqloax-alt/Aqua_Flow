import React, { useState } from "react";

import W_DeliveryTracking from "../../distribution/wholesaler/DeliveryTracking";
import W_RouteStatus from "../../distribution/wholesaler/RouteStatus";
import W_DeliveryHistory from "../../distribution/wholesaler/DeliveryHistory";
import W_PODViewer from "../../distribution/wholesaler/PODViewer";

const W_DistributionDashboard = () => {
  const [activeTab, setActiveTab] = useState("routes");

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <h1 className="text-xl font-bold text-slate-800 mb-4">
        Distribution Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab("routes")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === "routes"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-slate-500"
          }`}
        >
          Route Status
        </button>

        <button
          onClick={() => setActiveTab("tracking")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === "tracking"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-slate-500"
          }`}
        >
          Live Tracking
        </button>

        <button
          onClick={() => setActiveTab("pods")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === "pods"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-slate-500"
          }`}
        >
          POD Viewer
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === "history"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-slate-500"
          }`}
        >
          Delivery History
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "routes" && <W_RouteStatus />}
        {activeTab === "tracking" && <W_DeliveryTracking />}
        {activeTab === "pods" && <W_PODViewer />}
        {activeTab === "history" && <W_DeliveryHistory />}
      </div>
    </div>
  );
};

export default W_DistributionDashboard;
