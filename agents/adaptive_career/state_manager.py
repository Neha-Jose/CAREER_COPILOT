import json
from datetime import datetime

STATE_FILE = "career_state.json"

DEFAULT_STATE = {
    "current_week": 1,
    "completed_days": [],
    "progress_score": 0,
    "last_update": None
}

def load_state():
    try:
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    except:
        return DEFAULT_STATE.copy()

def save_state(state):
    state["last_update"] = str(datetime.now())
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=4)
