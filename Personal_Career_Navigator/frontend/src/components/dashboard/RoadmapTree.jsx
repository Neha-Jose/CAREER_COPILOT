import React from "react";

const statusColors = {
  completed: "border-accent-green bg-accent-green/10",
  "in-progress": "border-accent-blue bg-accent-blue/10",
  upcoming: "border-dark-border bg-dark-bg",
};

const statusIcons = {
  completed: "✓",
  "in-progress": "→",
  upcoming: "○",
};

export default function RoadmapTree({ roadmap }) {
  return (
    <div className="panel p-6">
      <h3 className="text-lg font-semibold text-white mb-6">30-Day Roadmap</h3>

      <div className="space-y-6">
        {roadmap.map((week, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${statusColors[week.status]}`}
              >
                {statusIcons[week.status]}
              </div>
              {index < roadmap.length - 1 && (
                <div className="w-0.5 h-full bg-dark-border mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-gray-500">
                  {week.week}
                </span>
                <h4 className="text-lg font-semibold text-white">
                  {week.title}
                </h4>
              </div>

              <ul className="space-y-2 ml-4">
                {week.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-400 flex items-center gap-2"
                  >
                    <span className="text-accent-purple">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
