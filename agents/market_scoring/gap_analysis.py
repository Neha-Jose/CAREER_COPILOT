def compute_skill_gap(required_skills, user_skill_graph):

    total_weight = 0
    matched_weight = 0
    missing = []

    for skill_obj in required_skills:
        skill = skill_obj["skill"]
        importance = skill_obj["importance_score"]

        total_weight += importance

        if skill in user_skill_graph:
            proficiency = user_skill_graph[skill]["proficiency"]
            matched_weight += importance * proficiency
        else:
            missing.append({
                "skill": skill,
                "gap_severity": importance
            })

    score = (matched_weight / total_weight) * 100 if total_weight else 0

    return round(score, 2), missing
