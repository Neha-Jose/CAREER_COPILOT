import React from "react";

export default function ScoreGauge({ score, maxScore = 100, label }) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (percent) => {
    if (percent >= 80) return "#4ec9b0";
    if (percent >= 60) return "#007acc";
    if (percent >= 40) return "#ce9178";
    return "#f48771";
  };

  return (
    <div className="flex flex-col items-center">
      <svg className="transform -rotate-90" width="180" height="180">
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="#3e3e42"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke={getColor(percentage)}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute mt-16">
        <div className="text-5xl font-bold text-white">{score}</div>
        <div className="text-sm text-gray-400 text-center">{label}</div>
      </div>
    </div>
  );
}
