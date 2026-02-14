import React from "react";

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
}
