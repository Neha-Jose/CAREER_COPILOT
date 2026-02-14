import pdfplumber
import spacy
import io

# Load the transformer-based model for high accuracy [cite: 29]
try:
    nlp = spacy.load("en_core_web_trf")
except:
    # Fallback if transformer is too heavy for your machine right now
    nlp = spacy.load("en_core_web_sm")

def parse_resume_to_intelligence(resume_bytes):
    """
    Extracts text from PDF and identifies Technical vs Soft Skills [cite: 18-25].
    """
    # 1. Extract Text from PDF [cite: 19]
    text = ""
    with pdfplumber.open(io.BytesIO(resume_bytes)) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + " "

    # 2. Process with NLP [cite: 29]
    doc = nlp(text)
    
    # Placeholder lists for the skill graph [cite: 64-65]
    tech_skills = []
    soft_skills = []
    
    # 3. Basic Entity Extraction Logic
    # In a full 'Vibeathon', you'd use a custom NER model or a keyword matcher
    # For now, we use a simple set of common labels
    for ent in doc.ents:
        if ent.label_ in ["PRODUCT", "ORG"]: # Often where libraries/tools sit
            tech_skills.append(ent.text)
        elif ent.label_ == "PERSON": # Filter out noise
            continue
            
    # Quick fix: Hardcoded extraction for key skills if NER misses them
    common_soft_skills = ["leadership", "communication", "teamwork", "analytical"]
    found_soft = [s for s in common_soft_skills if s in text.lower()]
    
    return {
        "technical_skills": list(set(tech_skills)),
        "soft_skills": found_soft,
        "raw_text_length": len(text)
    }