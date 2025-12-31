import React from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import { Droplets, PackageX, ShieldAlert, FileWarning, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Sample data with history for sparklines
const metrics = [
  {
    id: "water-loss",
    label: "Water Loss",
    value: 1.8,
    unit: "%",
    thresholds: { warning: 1.5, critical: 2.0 },
    history: [
      { val: 1.2 }, { val: 1.3 }, { val: 1.5 }, { val: 1.6 }, { val: 1.7 }, { val: 1.8 }
    ],
    icon: Droplets,
    description: "Production waste vs input"
  },
  {
    id: "damaged-goods",
    label: "Damaged Goods",
    value: 23,
    unit: " Units",
    thresholds: { warning: 15, critical: 30 },
    history: [
      { val: 10 }, { val: 12 }, { val: 15 }, { val: 28 }, { val: 25 }, { val: 23 }
    ],
    icon: PackageX,
    description: "Transport & storage defects"
  },
  {
    id: "quality-incidents",
    label: "Quality Incidents",
    value: 3,
    unit: "",
    thresholds: { warning: 1, critical: 4 },
    history: [
      { val: 0 }, { val: 1 }, { val: 0 }, { val: 0 }, { val: 2 }, { val: 3 }
    ],
    icon: ShieldAlert,
    description: "Lab failures or recalls"
  },
  {
    id: "audit-findings",
    label: "Audit Non-Compliance",
    value: 1,
    unit: "",
    thresholds: { warning: 0, critical: 2 },
    history: [
      { val: 0 }, { val: 0 }, { val: 0 }, { val: 1 }, { val: 1 }, { val: 1 }
    ],
    icon: FileWarning,
    description: "Regulatory flags"
  }
];

// Helper to determine risk level
const getRiskLevel = (value, thresholds) => {
  if (value >= thresholds.critical) return "critical";
  if (value >= thresholds.warning) return "warning";
  return "safe";
};

// Helper for styling based on risk level
const getStyles = (level) => {
  switch (level) {
    case "critical":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        iconBg: "bg-red-100",
        stroke: "#ef4444",
        fill: "#fee2e2"
      };
    case "warning":
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        iconBg: "bg-amber-100",
        stroke: "#f59e0b",
        fill: "#fef3c7"
      };
    default:
      return {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        iconBg: "bg-emerald-100",
        stroke: "#10b981",
        fill: "#d1fae5"
      };
  }
};

const LossRisk = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Loss & Risk Monitor</h2>
          <p className="text-sm text-slate-500">Operational inefficiencies and compliance alerts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const riskLevel = getRiskLevel(metric.value, metric.thresholds);
          const styles = getStyles(riskLevel);
          const Icon = metric.icon;
          
          // Calculate trend (Last vs 2nd to last)
          const last = metric.history[metric.history.length - 1].val;
          const prev = metric.history[metric.history.length - 2].val;
          const trendDir = last > prev ? "up" : last < prev ? "down" : "flat";

          return (
            <div 
              key={metric.id} 
              className={`${styles.bg} ${styles.border} border rounded-xl p-4 transition-all hover:shadow-md relative overflow-hidden`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${styles.iconBg}`}>
                  <Icon className={`w-5 h-5 ${styles.text}`} />
                </div>
                {/* Risk Badge */}
                {riskLevel !== "safe" && (
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/60 ${styles.text}`}>
                    {riskLevel}
                  </span>
                )}
              </div>

              {/* Metric Value */}
              <div className="mb-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-800">
                    {metric.value}{metric.unit}
                  </span>
                </div>
              </div>

              {/* Trend Description */}
              <div className="flex items-center gap-1 mb-4 text-xs font-medium text-slate-500">
                {trendDir === "up" && <TrendingUp className="w-3 h-3 text-red-500" />}
                {trendDir === "down" && <TrendingDown className="w-3 h-3 text-emerald-500" />}
                {trendDir === "flat" && <Minus className="w-3 h-3 text-slate-400" />}
                <span>
                   {trendDir === "up" ? "Rising" : trendDir === "down" ? "Falling" : "Stable"} vs last week
                </span>
              </div>

              {/* Sparkline Chart */}
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metric.history}>
                    <defs>
                      <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={styles.stroke} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={styles.stroke} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="val" 
                      stroke={styles.stroke} 
                      strokeWidth={2}
                      fill={`url(#gradient-${metric.id})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LossRisk;
