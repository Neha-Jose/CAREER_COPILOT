import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import ScoreGauge from "../components/charts/ScoreGauge";
import SkillRadarChart from "../components/charts/SkillRadarChart";
import MetricCard from "../components/dashboard/MetricCard";
import MissingSkills from "../components/dashboard/MissingSkills";
import RoadmapTree from "../components/dashboard/RoadmapTree";
import ProgressTracker from "../components/dashboard/ProgressTracker";
import CompetitorTable from "../components/dashboard/CompetitorTable";
import { mockDashboardData } from "../data/mockData";
import { dashboardAPI } from "../lib/api";

export default function DashboardPage() {
  const [data, setData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      // const response = await dashboardAPI.getSummary()
      // setData(response)
      // Using mock data for now
      setData(mockDashboardData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard");
      // Fallback to mock data
      setData(mockDashboardData);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Career Dashboard"
        subtitle="Your personalized career insights and learning roadmap"
      />

      {error && (
        <div className="bg-yellow-900/20 border border-yellow-500 rounded p-4 mb-6">
          <p className="text-sm text-yellow-400">{error} - Showing demo data</p>
        </div>
      )}

      {/* Top Metrics Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="panel p-6 flex justify-center">
          <ScoreGauge
            score={data.metrics.employabilityScore}
            label="Employability"
          />
        </div>

        <MetricCard
          title="ATS Score"
          value={data.metrics.atsScore}
          maxValue={100}
          icon="📄"
          color="accent-green"
        />

        <MetricCard
          title="Skill Match"
          value={data.metrics.skillMatch}
          maxValue={100}
          icon="🎯"
          color="accent-purple"
        />
      </div>

      {/* Missing Skills */}
      <div className="mb-6">
        <MissingSkills skills={data.missingSkills} />
      </div>

      {/* Radar Chart and Roadmap Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="panel p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Skill Comparison
          </h3>
          <SkillRadarChart data={data.radarData} />
        </div>

        <RoadmapTree roadmap={data.roadmapTree} />
      </div>

      {/* Progress Tracker */}
      <div className="mb-6">
        <ProgressTracker data={data.weeklyProgress} />
      </div>

      {/* Competitor Comparison */}
      <div>
        <CompetitorTable competitors={data.competitorProfiles} />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button onClick={loadDashboard} className="button-secondary">
          🔄 Refresh Dashboard
        </button>
        <button className="button-primary">📥 Download Report</button>
      </div>
    </div>
  );
}
