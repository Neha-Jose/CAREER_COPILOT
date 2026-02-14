import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { mockQuizQuestions } from "../data/mockData";
import { quizAPI } from "../lib/api";

export default function CareerQuizPage() {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < mockQuizQuestions.length) {
      setError("Please answer all questions");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await quizAPI.submitQuiz(answers);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const progress =
    (Object.keys(answers).length / mockQuizQuestions.length) * 100;

  return (
    <div>
      <PageHeader
        title="Career Assessment Quiz"
        subtitle="Help us understand your learning preferences and goals"
      />

      <div className="max-w-3xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-medium text-white">
              {Object.keys(answers).length}/{mockQuizQuestions.length}
            </span>
          </div>
          <div className="w-full bg-dark-bg rounded-full h-2">
            <div
              className="h-full bg-accent-blue rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {mockQuizQuestions.map((question) => (
            <div key={question.id} className="panel p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                {question.id}. {question.question}
              </h3>
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 border rounded cursor-pointer transition-all ${
                      answers[question.id] === option
                        ? "border-accent-blue bg-accent-blue/10"
                        : "border-dark-border hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        className="w-4 h-4 text-accent-blue"
                      />
                      <span className="text-white">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded p-4 mt-6">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={
            Object.keys(answers).length < mockQuizQuestions.length || loading
          }
          className="button-primary w-full mt-8"
        >
          {loading ? "Submitting..." : "Complete Assessment"}
        </button>
      </div>
    </div>
  );
}
