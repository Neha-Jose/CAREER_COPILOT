// Background service worker for Chrome extension

const API_BASE_URL = "http://localhost:8000/api";

// Sync profile to backend
async function syncProfileToBackend(profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/linkedin/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to sync profile:", error);
    throw error;
  }
}

// Trigger adaptive roadmap update
async function triggerAdaptiveRoadmap(deltaSkills) {
  try {
    const response = await fetch(`${API_BASE_URL}/roadmap/adaptive-update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deltaSkills }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update roadmap:", error);
    throw error;
  }
}

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "syncProfile") {
    syncProfileToBackend(request.data)
      .then((result) => sendResponse({ success: true, data: result }))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async
  }

  if (request.action === "alignRoadmap") {
    triggerAdaptiveRoadmap(request.deltaSkills)
      .then((result) => sendResponse({ success: true, data: result }))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

// Installation handler
chrome.runtime.onInstalled.addListener(() => {
  console.log("Career Navigator extension installed");
  chrome.storage.local.set({
    apiBaseUrl: API_BASE_URL,
    lastSyncTime: null,
  });
});
