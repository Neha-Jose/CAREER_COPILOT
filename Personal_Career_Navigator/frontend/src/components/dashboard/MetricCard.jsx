import React from "react";

export default function MetricCard({
  title,
  value,
  maxValue,
  icon,
  color = "accent-blue",
}) {
  const percentage = maxValue ? (value / maxValue) * 100 : value;

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>

      <div className="text-4xl font-bold text-white mb-3">
        {value}
        {maxValue && `/${maxValue}`}
      </div>

      {maxValue && (
        <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden">
          <div
            className={`h-full bg-${color} transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        {percentage.toFixed(0)}% of target
      </div>
    </div>
  );
}
