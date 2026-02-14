export const mockDashboardData = {
  metrics: {
    employabilityScore: 78,
    atsScore: 85,
    skillMatch: 72,
  },

  missingSkills: [
    "Docker",
    "Kubernetes",
    "AWS Lambda",
    "GraphQL",
    "TypeScript",
    "CI/CD Pipelines",
  ],

  radarData: [
    { skill: "Frontend", current: 85, target: 90, market: 80 },
    { skill: "Backend", current: 70, target: 85, market: 75 },
    { skill: "DevOps", current: 45, target: 75, market: 70 },
    { skill: "Cloud", current: 50, target: 80, market: 85 },
    { skill: "Testing", current: 65, target: 85, market: 70 },
    { skill: "Security", current: 40, target: 70, market: 75 },
  ],

  roadmapTree: [
    {
      week: "Week 1",
      title: "Docker Fundamentals",
      items: [
        "Complete Docker tutorial",
        "Build 3 containerized apps",
        "Docker Compose project",
      ],
      status: "completed",
    },
    {
      week: "Week 2",
      title: "Kubernetes Basics",
      items: [
        "K8s architecture study",
        "Deploy sample app",
        "Learn kubectl commands",
      ],
      status: "in-progress",
    },
    {
      week: "Week 3",
      title: "AWS Services",
      items: ["AWS Lambda functions", "API Gateway setup", "S3 & CloudFront"],
      status: "upcoming",
    },
    {
      week: "Week 4",
      title: "Full Stack Project",
      items: ["Build production app", "Deploy to AWS", "CI/CD pipeline"],
      status: "upcoming",
    },
  ],

  weeklyProgress: [
    { week: "W1", completed: 12, total: 12 },
    { week: "W2", completed: 7, total: 10 },
    { week: "W3", completed: 0, total: 8 },
    { week: "W4", completed: 0, total: 15 },
  ],

  competitorProfiles: [
    {
      name: "John Doe",
      role: "Senior Frontend Developer",
      employability: 92,
      atsScore: 88,
      skillMatch: 95,
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
    },
    {
      name: "Jane Smith",
      role: "Full Stack Engineer",
      employability: 87,
      atsScore: 85,
      skillMatch: 90,
      skills: ["Vue", "Python", "PostgreSQL", "GCP", "Kubernetes"],
    },
    {
      name: "Mike Johnson",
      role: "DevOps Engineer",
      employability: 85,
      atsScore: 90,
      skillMatch: 88,
      skills: ["Terraform", "Jenkins", "Docker", "AWS", "Python"],
    },
  ],
};

export const mockQuizQuestions = [
  {
    id: 1,
    question: "How many hours per week can you dedicate to learning?",
    options: ["5-10 hours", "10-15 hours", "15-20 hours", "20+ hours"],
  },
  {
    id: 2,
    question: "What is your preferred learning style?",
    options: [
      "Video tutorials",
      "Documentation",
      "Hands-on projects",
      "Interactive courses",
    ],
  },
  {
    id: 3,
    question: "What is your current experience level?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
  },
  {
    id: 4,
    question: "What type of projects interest you most?",
    options: [
      "Web apps",
      "Mobile apps",
      "Data science",
      "DevOps/Infrastructure",
    ],
  },
];

export const mockDreamRoles = [
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    description: "Build user interfaces with React, Vue, or Angular",
    skills: ["React", "TypeScript", "CSS", "Testing"],
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Developer",
    description: "Work on both frontend and backend systems",
    skills: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description: "Manage infrastructure and deployment pipelines",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze data and build ML models",
    skills: ["Python", "ML", "Statistics", "SQL"],
  },
];
