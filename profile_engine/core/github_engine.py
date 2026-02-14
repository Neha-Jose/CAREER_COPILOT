import requests
import json

def extract_github_intelligence(username: str):
    """Diagnostic version to reveal the actual symptoms."""
    print(f"\n--- GITHUB DIAGNOSTIC FOR: {username} ---")
    
    url = f"https://api.github.com/users/{username}/repos"
    try:
        # 1. Capture the raw response
        response = requests.get(url, timeout=10)
        
        # 2. Print every piece of evidence to YOUR terminal
        print(f"HTTP STATUS: {response.status_code}")
        print(f"API MESSAGE: {response.text}") # This is the raw 'body' from GitHub
        
        # 3. Check for specific symptoms
        if response.status_code == 403:
            print("SYMPTOM: Rate Limited. You've hit GitHub too many times without a token.")
        elif response.status_code == 404:
            print("SYMPTOM: User not found. The ID in Swagger is typed wrong.")
        elif response.text == "[]":
            print("SYMPTOM: Zero public repos. The account exists but is private or empty.")

        # Return empty for now so we don't crash the main app
        return {"tech_stack": [], "languages": [], "project_depth_score": 0.0}

    except Exception as e:
        print(f"SYSTEM ERROR: {str(e)}")
        return {"tech_stack": [], "languages": [], "project_depth_score": 0.0}
    finally:
        print("--- END DIAGNOSTIC ---\n")