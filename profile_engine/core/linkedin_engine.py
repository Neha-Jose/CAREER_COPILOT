import json
from profile_engine.utils.normalization import normalize_skills

def process_linkedin_intel(linkedin_json_str: str):
    """
    Parses the JSON string from the Chrome Extension and extracts skills and roles [cite: 31-34].
    """
    try:
        data = json.loads(linkedin_json_str)
        
        # Extract skills and roles from the JSON payload [cite: 33]
        li_skills = data.get("skills", [])
        li_roles = [job.get("title", "") for job in data.get("experience", [])]
        
        # Combine and return [cite: 34]
        return {
            "linkedin_skills": li_skills,
            "linkedin_roles": li_roles
        }
    except Exception:
        return {"linkedin_skills": [], "linkedin_roles": []}