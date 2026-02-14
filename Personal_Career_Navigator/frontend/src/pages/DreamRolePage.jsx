import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { skillsAPI } from "../lib/api";

const DREAM_ROLES = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Build user interfaces with React, Vue, or Angular",
    skills: ["React", "TypeScript", "CSS", "Testing"],
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    description: "Work on both frontend and backend systems",
    skills: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Manage infrastructure and deployment pipelines",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    id: "datascientist",
    title: "Data Scientist",
    description: "Analyze data and build ML models",
    skills: ["Python", "ML", "Statistics", "SQL"],
  },
];

export default function DreamRolePage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [timeBudget, setTimeBudget] = useState("10-15");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await skillsAPI.getGapMap({ role: selectedRole, timeBudget });
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to process. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Dream Role Selection"
        subtitle="Choose your target role and we'll create a personalized learning path"
      />

      <div className="max-w-4xl">
        {/* Role cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {DREAM_ROLES.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`panel p-6 cursor-pointer transition-all ${
                selectedRole === role.id
                  ? "border-accent-blue ring-2 ring-accent-blue"
                  : "hover:border-gray-500"
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {role.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{role.description}</p>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill, index) => (
                  <span key={index} className="chip text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Time budget */}
        <div className="panel p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Time Commitment
          </h3>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            How many hours per week can you dedicate to learning?
          </label>
          <select
            value={timeBudget}
            onChange={(e) => setTimeBudget(e.target.value)}
            className="field"
          >
            <option value="5-10">5-10 hours/week</option>
            <option value="10-15">10-15 hours/week</option>
            <option value="15-20">15-20 hours/week</option>
            <option value="20+">20+ hours/week</option>
          </select>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded p-4 mb-6">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="bg-green-900/20 border border-green-500 rounded p-4 mb-6">
            <p className="text-sm text-green-400">
              ✅ Roadmap generated! Redirecting to Dashboard...
            </p>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedRole || loading}
          className="button-primary w-full"
        >
          {loading ? "Generating..." : "Generate Learning Path"}
        </button>
      </div>
    </div>
  );
}