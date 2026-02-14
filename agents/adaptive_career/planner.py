def generate_30_day_plan(dag, daily_time):

    plan = []
    day = 1

    for week in range(1, 5):
        for _ in range(7):

            focus = "Foundations"
            if week == 2:
                focus = "Intermediate"
            elif week >= 3:
                focus = "Advanced"

            plan.append({
                "day": day,
                "skill_focus": focus,
                "learning_objective": f"Strengthen {focus}",
                "micro_task": f"Practice {focus} tasks",
                "resource_type": "video/project/tutorial",
                "checkpoint": "Complete exercises",
                "expected_output": "Code / Notes"
            })

            day += 1

    return plan
    