import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { profileAPI } from "../lib/api";

export default function UploadResumePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await profileAPI.uploadResume(formData);
      setSuccess(true);
      setFile(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Upload Resume"
        subtitle="Upload your resume to get personalized career insights"
      />

      <div className="max-w-2xl">
        <div className="panel p-8">
          <div className="space-y-6">
            {/* File input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Resume (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="field cursor-pointer"
                disabled={loading}
              />
            </div>

            {/* File preview */}
            {file && (
              <div className="bg-dark-bg border border-dark-border rounded p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-400 hover:text-red-300"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500 rounded p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="bg-green-900/20 border border-green-500 rounded p-4">
                <p className="text-sm text-green-400">
                  Resume uploaded successfully! Go to Dashboard to view
                  insights.
                </p>
              </div>
            )}

            {/* Upload button */}
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="button-primary w-full"
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-dark-bg border border-dark-border rounded">
          <h3 className="text-sm font-semibold text-white mb-2">
            What happens next?
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-accent-blue">1.</span>
              <span>
                Our AI analyzes your resume and extracts skills, experience, and
                education
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-blue">2.</span>
              <span>
                We compare your profile against market demand and job
                requirements
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-blue">3.</span>
              <span>
                You'll get a personalized dashboard with skill gaps and learning
                roadmap
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
