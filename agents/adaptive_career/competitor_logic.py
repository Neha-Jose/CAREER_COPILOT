def apply_competitor_boost(priority_skills, competitor_delta):

    if not competitor_delta:
        return priority_skills

    boosted_skills = []

    for skill in priority_skills:
        skill_name = skill["skill"]
        priority_score = skill["priority_score"]

        if skill_name in competitor_delta:
            priority_score = priority_score * 1.5

        boosted_skills.append({
            "skill": skill_name,
            "priority_score": round(priority_score, 2)
        })

    return boosted_skills
