import spacy

# Load the model you just downloaded
nlp = spacy.load("en_core_web_md")

# "Junk" list to filter out common non-skill noise found in your output
JUNK_PHRASES = {
    "professional summary", "maharaja institute", "technologies private", 
    "cgpa", "experience", "education", "summary", "limited", "pvt", "ltd"
}

def normalize_skills(raw_skills: list):
    """Cleans and deduplicates the skill graph[cite: 30]."""
    clean_skills = set()
    
    for skill in raw_skills:
        # 1. Basic cleaning [cite: 30]
        s = skill.strip().lower()
        # Remove weird characters like your ''
        s = s.replace('', '').strip()
        
        # 2. Filter out junk and short noise
        if len(s) < 2 or any(junk in s for junk in JUNK_PHRASES):
            continue
            
        # 3. Canonicalize (e.g., "fastapi" and "fast-api" -> "fastapi") [cite: 34]
        doc = nlp(s)
        clean_skills.add(s.title()) # Store as Title Case

    return sorted(list(clean_skills))