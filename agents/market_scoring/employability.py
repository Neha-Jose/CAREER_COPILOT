# ==============================
# MARKET DEMAND ALIGNMENT
# ==============================

def compute_market_demand_alignment(ranked_skills):

    if not ranked_skills:
        return 0

    total_importance = sum(
        [skill["importance_score"] for skill in ranked_skills]
    )

    avg_importance = total_importance / len(ranked_skills)

    return min(100, round(avg_importance * 10, 2))


# ==============================
# EXPERIENCE RELEVANCE
# ==============================

def compute_experience_relevance(user_skills, ranked_skills):

    required = {skill["skill"] for skill in ranked_skills}
    user = set(user_skills.keys())

    if not required:
        return 0

    overlap = len(required & user)

    return round((overlap / len(required)) * 100, 2)


# ==============================
# EMPLOYABILITY SCORE
# ==============================

def compute_employability(skill_match,
                          project_depth,
                          market_alignment,
                          soft_skill_score,
                          experience_relevance):

    score = (
        0.4 * skill_match +
        0.25 * project_depth +
        0.15 * market_alignment +
        0.10 * soft_skill_score +
        0.10 * experience_relevance
    )

    return round(score, 2)
