import React, { useState, useEffect, useRef } from "react";
import { 
  Package, TrendingUp, TrendingDown, Eye, Download, AlertTriangle,
  BarChart3, PieChart, LineChart 
} from "lucide-react";

const TopProducts = () => {
  const canvasRefs = useRef([]);
  
  const [products, setProducts] = useState([
    { 
      name: "20L Water Jar", qty: 420, growth: 15, stock: 180, 
      trendData: [80, 95, 120, 115, 130, 140], color: "#10B981"
    },
    { 
      name: "1L Bottle Pack", qty: 310, growth: 8, stock: 450, 
      trendData: [65, 72, 80, 78, 82, 85], color: "#3B82F6"
    },
    { 
      name: "500ml Bottle Pack", qty: 280, growth: 5, stock: 320, 
      trendData: [60, 68, 72, 70, 75, 78], color: "#F59E0B"
    }
  ]);

  const [sortBy, setSortBy] = useState('qty');

  // Draw sparklines
  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const data = products[index].trendData;
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw trend line
        ctx.strokeStyle = products[index].color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = products[index].color + '40';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        
        data.forEach((value, i) => {
          const x = (i / (data.length - 1)) * canvas.width;
          const y = canvas.height - ((value - min) / range) * (canvas.height * 0.8) - 4;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        
        ctx.stroke();
        
        // Fill area
        ctx.fillStyle = products[index].color + '20';
        ctx.fill();
      }
    });
  }, [products]);

  const sortedProducts = [...products].sort((a, b) => {
    switch(sortBy) {
      case 'growth': return b.growth - a.growth;
      case 'stock': return b.stock - a.stock;
      default: return b.qty - a.qty;
    }
  });

  const totalUnits = sortedProducts.reduce((sum, p) => sum + p.qty, 0);
  const pieData = sortedProducts.map(p => p.qty);

  const handleExport = () => {
    const data = sortedProducts.map(p => ({
      Product: p.name,
      Quantity: p.qty,
      Growth: `${p.growth}%`,
      Stock: p.stock,
      'Trend Data': p.trendData.join(',')
    }));
    console.log('Export:', data);
    alert('Chart data exported to console (CSV ready)');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 lg:p-8">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-slate-200">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Package size={24} className="text-sky-600" />
            Top Products Analytics
          </h3>
          <div className="px-3 py-1.5 bg-sky-100 text-sky-800 text-sm font-bold rounded-full">
            {totalUnits} units
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
          >
            <option value="qty">Quantity</option>
            <option value="growth">Growth %</option>
            <option value="stock">Stock</option>
          </select>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-1.5 bg-sky-600 text-white text-sm font-bold rounded-lg hover:bg-sky-700 transition-all shadow-md hover:shadow-lg"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* 📊 CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* 🥇 RANKED BAR CHART */}
        <div className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-xl border border-slate-100 shadow-inner">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 size={18} />
            Quantity Ranking
          </h4>
          <div className="space-y-3">
            {sortedProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between gap-4 group hover:bg-white/50 p-3 rounded-lg transition-all">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-lg ${
                    index === 0 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' :
                    index === 1 ? 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800' :
                    index === 2 ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 truncate">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.trendData.slice(-1)} recent</p>
                  </div>
                </div>
                
                {/* Horizontal Bar */}
                <div className="w-32 h-6 bg-slate-200 rounded-full overflow-hidden shadow-inner group-hover:shadow-md transition-all relative">
                  <div 
                    className="h-full rounded-full shadow-lg transition-all duration-700"
                    style={{ 
                      width: `${Math.min(95, (product.qty / Math.max(...products.map(p => p.qty))) * 100)}%`,
                      backgroundColor: product.color
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-bold text-white drop-shadow-lg">
                    {product.qty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📈 TREND SPARKLINES */}
        <div className="bg-gradient-to-b from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
          <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
            <LineChart size={18} />
            Sales Trends
          </h4>
          <div className="space-y-4">
            {sortedProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between gap-4 p-3 bg-white/60 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-slate-800 min-w-0 truncate">{product.name}</span>
                </div>
                
                {/* Sparkline Canvas */}
                <div className="flex items-center gap-3">
                  <canvas
                    ref={el => canvasRefs.current[index] = el}
                    width={100}
                    height={30}
                    className="w-24 h-8 rounded shadow-sm border border-slate-200 bg-white"
                  />
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">{product.qty}</div>
                    <div className={`text-xs font-bold ${
                      product.growth >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {product.growth}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🥧 PIE CHART */}
      <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
        <h4 className="font-bold text-purple-800 mb-6 flex items-center gap-2">
          <PieChart size={20} />
          Market Share
        </h4>
        <div className="relative">
          {/* SVG Pie Chart */}
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto block shadow-xl rounded-full">
            {pieData.map((slice, index) => {
              const total = pieData.reduce((a, b) => a + b, 0);
              const percent = (slice / total) * 100;
              const startAngle = pieData.slice(0, index).reduce((a, b) => a + b, 0) / total * 360;
              const endAngle = startAngle + (slice / total) * 360;
              
              return (
                <path
                  key={index}
                  d={`M 100,100 L ${100 + 80 * Math.cos(startAngle * Math.PI / 180)},${100 + 80 * Math.sin(startAngle * Math.PI / 180)} A 80,80 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${100 + 80 * Math.cos(endAngle * Math.PI / 180)},${100 + 80 * Math.sin(endAngle * Math.PI / 180)} Z`}
                  fill={products[index].color}
                  stroke="white"
                  strokeWidth="2"
                  className="drop-shadow-lg hover:scale-105 transition-all cursor-pointer"
                />
              );
            })}
            {/* Center */}
            <circle cx="100" cy="100" r="40" fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth="3" />
            <text x="100" y="105" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">
              {totalUnits}
            </text>
            <text x="100" y="125" textAnchor="middle" fill="#94a3b8" fontSize="11" className="font-mono">
              units
            </text>
          </svg>
          
          {/* Legend */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            {sortedProducts.slice(0,3).map((product, index) => (
              <div key={product.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: product.color }}
                />
                <span className="font-medium text-slate-800 truncate">{product.name}</span>
                <span className="font-bold text-slate-900 ml-auto">{product.qty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📊 SUMMARY METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-slate-200">
        <div className="p-4 text-center">
          <div className="text-2xl font-black text-slate-900">{totalUnits}</div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-bold mt-1">Total Units</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-black text-emerald-600">{Math.max(...sortedProducts.map(p => p.growth))}%</div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-bold mt-1">Top Growth</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-black text-sky-600">{sortedProducts[0].qty}</div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-bold mt-1">#1 Product</div>
        </div>
        <div className="p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-sm font-bold text-amber-600">
            <AlertTriangle size={14} />
            {sortedProducts.filter(p => p.stock < 100).length}
          </div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-bold mt-1">Low Stock</div>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
