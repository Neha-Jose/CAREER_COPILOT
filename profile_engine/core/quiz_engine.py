from typing import List, Dict
 
def compute_trait_vector(answers: List[int]):
    """
    Expects 25 answers (values 1-5). 
    We map these indices to the 6 categories [cite: 41-47].
    """
    vector = {
        "analytical": sum(answers[0:4]) / 20,
        "creativity": sum(answers[4:8]) / 20,
        "risk_tolerance": sum(answers[8:12]) / 20,
        "leadership": sum(answers[12:16]) / 20,
        "technical_interest": sum(answers[16:20]) / 20,
        "communication": sum(answers[20:25]) / 25
    }
    
    # Map vector to Career Clusters [cite: 49-55]
    recommended = []
    if vector["technical_interest"] > 0.7:
        recommended.append("AI Engineer")
    if vector["creativity"] > 0.7:
        recommended.append("UI/UX Designer")
        
    return {"trait_vector": vector, "recommended_roles": recommended}