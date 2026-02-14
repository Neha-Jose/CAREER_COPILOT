# agents/adaptive_career/dependency_graph.py

FOUNDATION_SKILLS = [
    "Build Management",
    "Ci",
    "Testing",
    "Problem-Solving"
]

INTERMEDIATE_SKILLS = [
    "Develop",
    "Front",
    "Ui",
    "Defect Management"
]

ADVANCED_SKILLS = [
    "Jmeter",
    "Jira",
    "Calendly",
    "Vscode"
]


def build_skill_dag(priority_skills):

    dag = {
        "Foundations": [],
        "Intermediate": [],
        "Advanced": []
    }

    for skill in priority_skills:
        name = skill["skill"]

        if name in FOUNDATION_SKILLS:
            dag["Foundations"].append(name)

        elif name in INTERMEDIATE_SKILLS:
            dag["Intermediate"].append(name)

        elif name in ADVANCED_SKILLS:
            dag["Advanced"].append(name)

    return dag
