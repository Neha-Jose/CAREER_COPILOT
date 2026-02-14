import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SkillRadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid stroke="#3e3e42" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: "#cccccc", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "#cccccc" }}
        />
        <Radar
          name="Your Skills"
          dataKey="current"
          stroke="#007acc"
          fill="#007acc"
          fillOpacity={0.6}
        />
        <Radar
          name="Target"
          dataKey="target"
          stroke="#4ec9b0"
          fill="#4ec9b0"
          fillOpacity={0.3}
        />
        <Radar
          name="Market Average"
          dataKey="market"
          stroke="#c586c0"
          fill="#c586c0"
          fillOpacity={0.2}
        />
        <Legend wrapperStyle={{ color: "#cccccc" }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
