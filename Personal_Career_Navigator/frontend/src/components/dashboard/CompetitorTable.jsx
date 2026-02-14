import React from "react";

export default function CompetitorTable({ competitors }) {
  return (
    <div className="panel p-6">
      <h3 className="text-lg font-semibold text-white mb-6">
        Competitor Comparison
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Role
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">
                Employability
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">
                ATS Score
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">
                Skill Match
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Top Skills
              </th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor, index) => (
              <tr
                key={index}
                className="border-b border-dark-border hover:bg-dark-bg transition-colors"
              >
                <td className="py-3 px-4 text-white font-medium">
                  {competitor.name}
                </td>
                <td className="py-3 px-4 text-gray-400 text-sm">
                  {competitor.role}
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`font-bold ${competitor.employability >= 90 ? "text-accent-green" : "text-accent-blue"}`}
                  >
                    {competitor.employability}%
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="font-bold text-white">
                    {competitor.atsScore}%
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="font-bold text-accent-purple">
                    {competitor.skillMatch}%
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {competitor.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="chip text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
