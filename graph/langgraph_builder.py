from langgraph.graph import StateGraph
from agents.adaptive_career.dependency_graph import build_skill_dag
from agents.adaptive_career.planner import generate_30_day_plan
from agents.adaptive_career.adaptive_logic import evaluate_progress, mutate_plan
from agents.adaptive_career.state_manager import load_state, save_state
from agents.adaptive_career.competitor_logic import apply_competitor_boost


def build_adaptive_graph():

    workflow = StateGraph(dict)

    # 1️⃣ Load State
    workflow.add_node("load_state", lambda state: {
        **state,
        "user_state": load_state()
    })

    # 2️⃣ Competitor Boost
    workflow.add_node("competitor_boost", lambda state: {
        **state,
        "priority_skills": apply_competitor_boost(
            state["priority_skills"],
            state.get("competitor_delta", [])
        )
    })

    # 3️⃣ Build DAG
    workflow.add_node("build_dag", lambda state: {
        **state,
        "dag": build_skill_dag(state["priority_skills"])
    })

    # 4️⃣ Generate Plan
    workflow.add_node("plan", lambda state: {
        **state,
        "plan": generate_30_day_plan(
            state["dag"],
            state["daily_study_time"]
        )
    })

    # 5️⃣ Evaluate Progress
    workflow.add_node("evaluate", lambda state: {
        **state,
        "action": evaluate_progress(
            state["user_state"]["progress_score"]
        )
    })

    # 6️⃣ Mutate Plan
    workflow.add_node("mutate", lambda state: {
        **state,
        "plan": mutate_plan(state["plan"], state["action"])
    })

    # 7️⃣ Save State
    def update_state(state):
        new_state = state["user_state"]
        new_state["current_week"] += 1
        save_state(new_state)
        return state

    workflow.add_node("save_state", update_state)

    # Flow Order
    workflow.set_entry_point("load_state")
    workflow.add_edge("load_state", "competitor_boost")
    workflow.add_edge("competitor_boost", "build_dag")
    workflow.add_edge("build_dag", "plan")
    workflow.add_edge("plan", "evaluate")
    workflow.add_edge("evaluate", "mutate")
    workflow.add_edge("mutate", "save_state")

    return workflow.compile()
