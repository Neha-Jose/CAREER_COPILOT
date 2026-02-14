from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

# ==============================
# PROFILE ENGINE IMPORTS
# ==============================

from profile_engine.core.resume_engine import parse_resume_to_intelligence
from profile_engine.core.linkedin_engine import process_linkedin_intel
from profile_engine.core.github_engine import extract_github_intelligence
from profile_engine.core.quiz_engine import compute_trait_vector

# ==============================
# MARKET SCORING IMPORTS
# ==============================

from agents.market_scoring.extraction import extract_market_skills
from agents.market_scoring.gap_analysis import compute_skill_gap
from agents.market_scoring.ats import compute_ats_score
from agents.market_scoring.employability import (
    compute_employability,
    compute_market_demand_alignment,
    compute_experience_relevance
)
from agents.market_scoring.priority import rank_priority_skills

# ==============================
# ADAPTIVE AGENT IMPORTS
# ==============================

from graph.langgraph_builder import build_adaptive_graph
from agents.adaptive_career.state_manager import load_state, save_state


# ==========================================================
# APP INIT  ← must come before add_middleware
# ==========================================================

app = FastAPI(title="Career CoPilot AI System", version="0.1.0")

# ==========================================================
# CORS MIDDLEWARE  ← must come after app = FastAPI()
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# 1️⃣  BUILD PROFILE (INPUT INTELLIGENCE ENGINE)
# ==========================================================

@app.post("/build-profile")
async def build_profile(
    resume: Optional[UploadFile] = File(None),
    linkedin_json: Optional[str] = Form(None),
    github_username: Optional[str] = Form(None),
    quiz_answers: Optional[str] = Form(None)
):
    # -----------------------------
    # Resume Processing
    # -----------------------------
    resume_data = {"technical_skills": [], "soft_skills": []}
    if resume:
        resume_bytes = await resume.read()
        resume_data = parse_resume_to_intelligence(resume_bytes)

    # -----------------------------
    # LinkedIn Processing
    # -----------------------------
    linkedin_data = {"linkedin_skills": [], "linkedin_roles": []}
    if linkedin_json:
        linkedin_data = process_linkedin_intel(linkedin_json)

    # -----------------------------
    # GitHub Processing
    # -----------------------------
    github_data = {"tech_stack": [], "languages": [], "project_depth_score": 0}
    if github_username:
        github_data = extract_github_intelligence(github_username)

    # -----------------------------
    # Quiz Processing
    # -----------------------------
    quiz_data = {"trait_vector": {}, "recommended_roles": []}
    if quiz_answers:
        try:
            quiz_list = [int(x.strip()) for x in quiz_answers.split(",")]
            quiz_data = compute_trait_vector(quiz_list)
        except Exception:
            quiz_data = {"trait_vector": {}, "recommended_roles": []}

    # -----------------------------
    # Merge All Skills
    # -----------------------------
    skill_graph = list(set(
        resume_data.get("technical_skills", []) +
        linkedin_data.get("linkedin_skills", []) +
        github_data.get("tech_stack", [])
    ))

    return {
        "skill_graph": skill_graph,
        "soft_skills": resume_data.get("soft_skills", []),
        "project_depth_score": github_data.get("project_depth_score", 0),
        "recommended_roles": quiz_data.get("recommended_roles", []),
        "trait_vector": quiz_data.get("trait_vector", {})
    }


# ==========================================================
# 2️⃣  MARKET SCORING ENGINE
# ==========================================================

@app.post("/market-score")
def market_score(data: dict):

    ranked = extract_market_skills(data["job_description"])

    skill_match, missing = compute_skill_gap(
        ranked,
        data["user_skill_graph"]
    )

    ats = compute_ats_score(
        ranked,
        data["job_description"],
        data["user_skill_graph"]
    )

    market_alignment = compute_market_demand_alignment(ranked)

    experience_relevance = compute_experience_relevance(
        data["user_skill_graph"],
        ranked
    )

    soft_skill_score = data.get("soft_skill_score", 50)

    employability = compute_employability(
        skill_match,
        data["project_depth_score"],
        market_alignment,
        soft_skill_score,
        experience_relevance
    )

    priority = rank_priority_skills(missing)

    return {
        "ranked_market_skills": ranked,
        "skill_match_score": skill_match,
        "ats_score": ats,
        "market_demand_alignment": market_alignment,
        "experience_relevance": experience_relevance,
        "employability_score": employability,
        "priority_missing_skills": priority
    }


# ==========================================================
# 3️⃣  ADAPTIVE ROADMAP AGENT
# ==========================================================

@app.post("/adaptive-roadmap")
def adaptive_roadmap(data: dict):

    graph = build_adaptive_graph()
    result = graph.invoke(data)

    return result


# ==========================================================
# 4️⃣  UPDATE PROGRESS ENGINE
# ==========================================================

@app.post("/update-progress")
def update_progress(data: dict):

    state = load_state()
    state["progress_score"] = data["progress_score"]
    state["completed_days"].extend(data.get("completed_days", []))

    save_state(state)

    return {
        "message": "Progress updated",
        "new_state": state
    }


# ==========================================================
# ROOT
# ==========================================================

@app.get("/")
def root():
    return {
        "system": "Career CoPilot – Adaptive Market Alignment Engine",
        "status": "Running",
        "modules": [
            "UserProfileAgent",
            "MarketScoringAgent",
            "AdaptiveCareerAgent",
            "Stateful Progress Engine"
        ],
        "endpoints": [
            "/build-profile",
            "/market-score",
            "/adaptive-roadmap",
            "/update-progress"
        ]
    }