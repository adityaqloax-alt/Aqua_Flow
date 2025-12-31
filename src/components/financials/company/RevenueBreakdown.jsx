import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

const data = [
  { name: "Retail Sales", value: 40, amount: "₹7.4L" },
  { name: "Bulk Supply", value: 30, amount: "₹5.5L" },
  { name: "Contracts", value: 20, amount: "₹3.7L" },
  { name: "Delivery Charges", value: 10, amount: "₹1.8L" },
];

const COLORS = ["#4f46e5", "#14b8a6", "#f59e0b", "#f97316"];

// Custom renderer for the active (hovered) segment
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={-5} textAnchor="middle" fill="#1e293b" className="text-xl font-bold">
        {payload.value}%
      </text>
      <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#64748b" className="text-xs font-medium">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius}
        fill={fill}
        fillOpacity={0.2}
      />
    </g>
  );
};

const RevenueBreakdown = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Revenue Sources
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Distribution by channel
          </p>
        </div>
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
           <PieIcon size={20} />
        </div>
      </div>

      {/* Content Container: Chart + Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between flex-1 gap-4">
        
        {/* Chart Side */}
        <div className="h-[250px] w-full sm:w-1/2 flex-shrink-0 relative">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                paddingAngle={4}
                cornerRadius={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Side */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center gap-3 pr-2">
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 cursor-pointer ${activeIndex === index ? 'bg-slate-50 scale-105 shadow-sm' : 'hover:bg-slate-50'}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm" 
                  style={{ backgroundColor: COLORS[index] }} 
                />
                <span className={`text-sm font-medium ${activeIndex === index ? 'text-slate-900' : 'text-slate-600'}`}>
                  {item.name}
                </span>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${activeIndex === index ? 'text-slate-900' : 'text-slate-700'}`}>
                   {item.amount}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RevenueBreakdown;
