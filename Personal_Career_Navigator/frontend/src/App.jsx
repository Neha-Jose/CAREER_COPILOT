import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import UploadResumePage from "./pages/UploadResumePage";
import DreamRolePage from "./pages/DreamRolePage";
import CareerQuizPage from "./pages/CareerQuizPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-dark-panel border-b border-dark-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-accent-blue">
            Career Copilot
          </h1>
          <p className="text-sm text-gray-400">AI-Powered Career Co-Pilot</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-dark-panel border-b border-dark-border px-6 py-3">
        <div className="max-w-7xl mx-auto flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition-colors ${isActive ? "bg-accent-blue text-white" : "text-dark-text hover:bg-dark-bg"}`
            }
          >
            Upload Resume
          </NavLink>
          <NavLink
            to="/dream-role"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition-colors ${isActive ? "bg-accent-blue text-white" : "text-dark-text hover:bg-dark-bg"}`
            }
          >
            Dream Role
          </NavLink>
          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition-colors ${isActive ? "bg-accent-blue text-white" : "text-dark-text hover:bg-dark-bg"}`
            }
          >
            Career Quiz
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition-colors ${isActive ? "bg-accent-blue text-white" : "text-dark-text hover:bg-dark-bg"}`
            }
          >
            Dashboard
          </NavLink>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<UploadResumePage />} />
            <Route path="/dream-role" element={<DreamRolePage />} />
            <Route path="/quiz" element={<CareerQuizPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark-panel border-t border-dark-border px-6 py-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          Powered by Agentic AI • Frontend Orchestration Layer
        </div>
      </footer>
    </div>
  );
}

export default App;
