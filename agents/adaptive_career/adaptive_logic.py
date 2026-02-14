def evaluate_progress(progress_score, threshold=60):

    if progress_score < threshold:
        return "reinforce"
    else:
        return "advance"


def mutate_plan(plan, action):

    updated_plan = []

    for item in plan:
        if action == "reinforce":
            item["learning_objective"] = "Reinforce fundamentals"
            item["micro_task"] = "Redo exercises + practice problems"

        elif action == "advance":
            item["learning_objective"] = "Advanced skill application"
            item["micro_task"] = "Build mini-project using skill"

        updated_plan.append(item)

    return updated_plan
