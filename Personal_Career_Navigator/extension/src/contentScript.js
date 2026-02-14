// Extract LinkedIn profile data
function extractLinkedInProfile() {
  const profileData = {
    name: "",
    skills: [],
    experienceTitles: [],
    url: window.location.href,
    extractedAt: new Date().toISOString(),
  };

  // Extract name (multiple selector strategies for resilience)
  const nameSelectors = [
    "h1.text-heading-xlarge",
    ".pv-text-details__left-panel h1",
    ".mt2.relative h1",
  ];

  for (const selector of nameSelectors) {
    const nameElement = document.querySelector(selector);
    if (nameElement) {
      profileData.name = nameElement.textContent.trim();
      break;
    }
  }

  // Extract skills
  const skillElements = document.querySelectorAll(
    '.pvs-list__item--one-column .mr1.hoverable-link-text span[aria-hidden="true"]',
  );

  const skillsSet = new Set();
  skillElements.forEach((el) => {
    const skill = el.textContent.trim();
    if (skill && skill.length > 1 && skill.length < 50) {
      skillsSet.add(skill);
    }
  });
  profileData.skills = Array.from(skillsSet).slice(0, 20);

  // Extract experience titles
  const experienceSelectors = [
    '.pvs-list__item--line-separated .mr1.t-bold span[aria-hidden="true"]',
    ".experience-item__title",
    ".pv-entity__summary-info h3",
  ];

  const titlesSet = new Set();
  for (const selector of experienceSelectors) {
    const titleElements = document.querySelectorAll(selector);
    titleElements.forEach((el) => {
      const title = el.textContent.trim();
      if (title && title.length > 2 && title.length < 100) {
        titlesSet.add(title);
      }
    });
    if (titlesSet.size > 0) break;
  }
  profileData.experienceTitles = Array.from(titlesSet).slice(0, 10);

  // Add metadata
  profileData.confidence = {
    name: profileData.name ? 1.0 : 0.0,
    skills: profileData.skills.length > 0 ? 1.0 : 0.5,
    experience: profileData.experienceTitles.length > 0 ? 1.0 : 0.5,
  };

  profileData.skillsFoundCount = profileData.skills.length;
  profileData.experienceFoundCount = profileData.experienceTitles.length;

  return profileData;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractProfile") {
    try {
      const profileData = extractLinkedInProfile();
      sendResponse({ success: true, data: profileData });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep message channel open for async response
});

// Auto-extract and store on page load (optional)
window.addEventListener("load", () => {
  setTimeout(() => {
    const profileData = extractLinkedInProfile();
    chrome.storage.local.set({ lastExtractedProfile: profileData });
    console.log("Career Navigator: Profile data extracted", profileData);
  }, 2000);
});
