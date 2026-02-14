import re
import datetime
from collections import Counter
from utils.skill_weights import INDUSTRY_WEIGHT


def extract_market_skills(job_description: str):

    possible_skills = list(INDUSTRY_WEIGHT.keys())
    found = []

    # Step 1: Extract skills by frequency
    for skill in possible_skills:
        matches = re.findall(skill, job_description, re.IGNORECASE)
        if matches:
            found.extend([skill] * len(matches))

    counts = Counter(found)

    # Step 2: Compute recency factor (if year mentioned in JD)
    CURRENT_YEAR = datetime.datetime.now().year
    year_match = re.search(r"(20[2-3][0-9])", job_description)

    recency_factor = 1.0

    if year_match:
        year = int(year_match.group(1))
        diff = CURRENT_YEAR - year
        recency_factor = max(0.7, 1 - (diff * 0.1))

    # Step 3: Rank skills
    ranked = []

    for skill, freq in counts.items():
        weight = INDUSTRY_WEIGHT.get(skill, 1)

        importance = freq * weight * recency_factor

        ranked.append({
            "skill": skill,
            "frequency": freq,
            "industry_weight": weight,
            "recency_factor": round(recency_factor, 2),
            "importance_score": round(importance, 2)
        })

    ranked.sort(key=lambda x: x["importance_score"], reverse=True)

    return ranked
