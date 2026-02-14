def rank_priority_skills(missing_skills):

    ranked = []

    for skill in missing_skills:
        importance = skill["gap_severity"]
        dependency_factor = 1.2

        priority = importance * 2.5

        ranked.append({
            "skill": skill["skill"],
            "priority_score": round(priority, 2)
        })

    ranked.sort(key=lambda x: x["priority_score"], reverse=True)

    return ranked
