const API_BASE_URL = 'http://localhost:8000';

// Role to skills mapping (matches backend dependency_graph.py)
const ROLE_SKILLS = {
  frontend: [
    { skill: "Front", priority_score: 9 },
    { skill: "Ui", priority_score: 8 },
    { skill: "Testing", priority_score: 7 },
    { skill: "Build Management", priority_score: 6 },
    { skill: "Ci", priority_score: 5 },
  ],
  fullstack: [
    { skill: "Front", priority_score: 9 },
    { skill: "Develop", priority_score: 9 },
    { skill: "Build Management", priority_score: 8 },
    { skill: "Ci", priority_score: 7 },
    { skill: "Testing", priority_score: 6 },
  ],
  devops: [
    { skill: "Ci", priority_score: 9 },
    { skill: "Build Management", priority_score: 9 },
    { skill: "Jira", priority_score: 7 },
    { skill: "Testing", priority_score: 6 },
    { skill: "Problem-Solving", priority_score: 8 },
  ],
  datascientist: [
    { skill: "Problem-Solving", priority_score: 9 },
    { skill: "Testing", priority_score: 7 },
    { skill: "Develop", priority_score: 6 },
    { skill: "Jmeter", priority_score: 5 },
    { skill: "Vscode", priority_score: 4 },
  ],
};

// Convert time budget string to daily hours number
const timeBudgetToHours = (timeBudget) => {
  const map = {
    "5-10": 1,
    "10-15": 2,
    "15-20": 3,
    "20+": 4,
  };
  return map[timeBudget] || 2;
};

// ==============================
// PROFILE API
// ==============================
export const profileAPI = {
  uploadResume: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/build-profile`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

// ==============================
// DASHBOARD API
// ==============================
export const dashboardAPI = {
  getSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/market-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

// ==============================
// QUIZ API
// ==============================
export const quizAPI = {
  submitQuiz: async (answers) => {
    const answerValues = Object.values(answers).join(',');
    const formData = new FormData();
    formData.append('quiz_answers', answerValues);

    const response = await fetch(`${API_BASE_URL}/build-profile`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

// ==============================
// SKILLS API
// ==============================
export const skillsAPI = {
  getGapMap: async ({ role, timeBudget }) => {
    // Map role id to priority_skills array the backend expects
    const priority_skills = ROLE_SKILLS[role] || ROLE_SKILLS['fullstack'];
    const daily_study_time = timeBudgetToHours(timeBudget);

    const payload = {
      priority_skills,
      daily_study_time,
      competitor_delta: [],
    };

    const response = await fetch(`${API_BASE_URL}/adaptive-roadmap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(await response.text());
    const result = await response.json();

    // Save roadmap to localStorage so Dashboard can read it
    localStorage.setItem('roadmap', JSON.stringify(result));
    localStorage.setItem('selectedRole', role);

    return result;
  },
};

// ==============================
// PROGRESS API
// ==============================
export const progressAPI = {
  updateProgress: async (data) => {
    const response = await fetch(`${API_BASE_URL}/update-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

// ==============================
// GENERIC API (fallback)
// ==============================
export const api = {
  buildProfile: profileAPI.uploadResume,
  marketScore: dashboardAPI.getSummary,
  adaptiveRoadmap: skillsAPI.getGapMap,
  updateProgress: progressAPI.updateProgress,
};