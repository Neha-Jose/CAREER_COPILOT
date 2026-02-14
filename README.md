# CAREER_COPILOT
# AdaptiveCareerAgent

AdaptiveCareerAgent is an agentic AI system that autonomously manages a student’s professional growth.  
Instead of offering static career advice, it continuously analyzes user profiles, job market demand, learning progress, and competitor skills to generate a personalized roadmap that evolves over time.

This project was built for Vibeathon as a **career co-pilot**, not a chatbot.

---

## Core Features

---

### Career Fit Quiz

- Short aptitude + interest quiz
- Maps users to best-fit career roles (ML Engineer, Data Scientist, Backend Engineer, etc.)
- Automatically assigns role-specific skill templates
- Generates required skill list for feature mapping

This removes guesswork and provides structured career direction.

--

### ATS Resume Scoring

- Semantic similarity between resume and job description
- Returns ATS compatibility percentage
- Detects missing keywords and skills

Helps users understand how well their resume matches real job postings.

---

###  Employability Score

Real-time market readiness percentage calculated using:

- ATS Score (40%)
- Skill Coverage (40%)
- Learning Progress (20%)

Provides a quantitative measure of how job-ready a user currently is.

---

###  Skill Gap Identification

- Compares current skills with role-required skills
- Identifies concrete missing competencies
- Produces prioritized learning targets (technical + non-technical)

---

### Adaptive 30-Day Learning Roadmap

Automatically generates a structured learning plan:

Week 1 – Foundations  
Week 2 – Core Skill Development  
Week 3 – Guided Project  
Week 4 – Portfolio + Interview Preparation  

Each day contains:

- Skill focus  
- Learning objective  
- Micro task  
- Resource type  
- Checkpoint  
- Expected output  

Roadmaps are personalized and continuously updated.

---

### Closed-Loop Adaptive Intelligence

The system follows:

State → Plan → Execute → Evaluate → Replan

Every week:

- If progress < 60% → reinforcement tasks are injected
- If progress ≥ 60% → advanced material is unlocked
- Competitor skill delta automatically reprioritizes roadmap

The roadmap evolves based on performance and market signals.

---

### Persistent Agent Memory

Agent state is stored across sessions:

- Current week
- Completed days
- Progress score
- Employability percentage

This enables long-term personalization and continuous learning without resetting.

---

###  Chrome Extension – Competitor Intelligence

A Chrome extension allows users to analyze other LinkedIn profiles.

Features:

- Extract competitor skills
- Compute skill delta vs user
- Identify high-value missing skills
- Dynamically update learning roadmap based on competitor profiles

Users don’t just compete with job descriptions — they compete with real people.

---

### JD + Resume ATS Comparison

Users can upload:

- Resume
- Job Description

System returns:

- ATS score
- Missing keywords
- Alignment feedback

This improves interview shortlisting probability.

---

##  Architecture Overview

AdaptiveCareerAgent is built as a multi-agent system using LangGraph on top of LangChain.

Core agents:

- QuizCareerFitAgent
- MarketSkillExtractionAgent
- SkillGapAnalysisAgent
- ATSScoringAgent
- EmployabilityScoreAgent
- PrioritySkillRankingAgent
- RoadmapPlannerAgent
- ProgressEvaluationAgent
- MemoryStateManager
- CompetitorComparisonAgent

Each agent handles a specialized task, enabling modular reasoning and adaptive planning.

---

Why This Is Agentic AI

✔ Multi-agent reasoning
✔ Persistent state
✔ Dynamic replanning
✔ Market alignment
✔ Competitor awareness
✔ Quantified employability
✔ Continuous learning loop

