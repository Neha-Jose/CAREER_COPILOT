from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

CRITICAL_SKILLS = [
    "Develop",
    "Testing",
    "Problem-Solving"
]


def compute_ats_score(required_skills, jd_text, user_skills):

    required = set([s["skill"] for s in required_skills])
    user = set(user_skills.keys())

    # Keyword Match %
    keyword_score = (len(required & user) / len(required)) * 100 if required else 0

    # TF-IDF Semantic Similarity (NO TORCH)
    vectorizer = TfidfVectorizer()

    documents = [jd_text, " ".join(user)]
    tfidf_matrix = vectorizer.fit_transform(documents)

    semantic_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0] * 100

    # Critical penalty
    penalty = sum([10 for skill in CRITICAL_SKILLS if skill not in user])

    final_score = (0.5 * keyword_score + 0.5 * semantic_score) - penalty

    return max(0, round(final_score, 2))
