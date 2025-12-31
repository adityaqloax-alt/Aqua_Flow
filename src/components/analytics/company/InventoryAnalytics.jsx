import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Package, AlertTriangle, CheckCircle, Truck } from "lucide-react";

const data = [
  { name: "Raw Materials", value: 40, color: "#6366f1" },   // Indigo
  { name: "Finished Goods", value: 35, color: "#14b8a6" },  // Teal
  { name: "Damaged", value: 5, color: "#f87171" },         // Red
  { name: "In Transit", value: 20, color: "#fbbf24" },      // Amber
];

const InventoryAnalytics = () => {
  // 1. Calculate KPIs
  const totalStock = data.reduce((acc, item) => acc + item.value, 0);
  const finishedGoods = data.find(d => d.name === "Finished Goods");
  const damaged = data.find(d => d.name === "Damaged");

  const finishedPercent = ((finishedGoods.value / totalStock) * 100).toFixed(1);
  const damagedPercent = ((damaged.value / totalStock) * 100).toFixed(1);

  // Custom Tooltip for detailed insights
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, color } = payload[0].payload;
      const percent = ((value / totalStock) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-semibold text-slate-700">{name}</span>
          </div>
          <div className="text-slate-600">
            <span className="font-bold text-slate-900">{value} units</span> ({percent}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-6">Inventory Distribution</h2>

      {/* 2. KPI Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Total Stock */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inventory</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{totalStock}</p>
            <p className="text-xs text-slate-400 mt-1">Units on hand</p>
          </div>
          <div className="p-3 bg-indigo-100 rounded-full">
            <Package className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        {/* Finished Goods Health */}
        <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">Ready to Ship</p>
            <p className="text-2xl font-bold text-teal-900 mt-1">{finishedPercent}%</p>
            <p className="text-xs text-teal-700 mt-1">{finishedGoods.value} units available</p>
          </div>
          <div className="p-3 bg-teal-200 rounded-full">
            <CheckCircle className="w-6 h-6 text-teal-700" />
          </div>
        </div>

        {/* Risk / Damaged */}
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Damaged / Loss</p>
            <p className="text-2xl font-bold text-red-900 mt-1">{damagedPercent}%</p>
            <p className="text-xs text-red-700 mt-1">{damaged.value} units unusable</p>
          </div>
          <div className="p-3 bg-red-200 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-700" />
          </div>
        </div>
      </div>

      {/* 3. Visualization Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full h-[250px] max-w-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60} // Donut style for modern look
                outerRadius={80}
                paddingAngle={5}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend / Category Breakdown */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">{item.name}</p>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-xs text-slate-500">{((item.value / totalStock) * 100).toFixed(0)}% share</span>
                  <span className="text-sm font-bold text-slate-900">{item.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryAnalytics;
