import React from "react";

export default function MissingSkills({ skills }) {
  return (
    <div className="panel p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Missing Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="chip-accent">
            {skill}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        These skills are required for your dream role
      </p>
    </div>
  );
}
