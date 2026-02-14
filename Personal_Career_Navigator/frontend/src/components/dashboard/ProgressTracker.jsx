import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ProgressTracker({ data }) {
  return (
    <div className="panel p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Weekly Progress</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3e3e42" />
          <XAxis dataKey="week" stroke="#cccccc" tick={{ fill: "#cccccc" }} />
          <YAxis stroke="#cccccc" tick={{ fill: "#cccccc" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#252526",
              border: "1px solid #3e3e42",
              borderRadius: "8px",
              color: "#cccccc",
            }}
          />
          <Bar dataKey="completed" fill="#4ec9b0" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.completed === entry.total ? "#4ec9b0" : "#007acc"}
              />
            ))}
          </Bar>
          <Bar dataKey="total" fill="#3e3e42" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-around text-sm">
        {data.map((week, index) => (
          <div key={index} className="text-center">
            <div className="font-bold text-white">
              {week.completed}/{week.total}
            </div>
            <div className="text-gray-500">{week.week}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
