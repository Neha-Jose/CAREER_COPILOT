// DOM elements
const analyzeBtn = document.getElementById("analyzeBtn");
const alignRoadmapBtn = document.getElementById("alignRoadmapBtn");
const openDashboardBtn = document.getElementById("openDashboardBtn");
const status = document.getElementById("status");
const statusText = document.getElementById("statusText");
const profileInfo = document.getElementById("profileInfo");
const skillGapSection = document.getElementById("skillGapSection");
const actionButtons = document.getElementById("actionButtons");
const loader = document.getElementById("loader");

let currentProfileData = null;
let skillGapData = null;

// Show status message
function showStatus(message, type = "info") {
  status.className = `status ${type}`;
  statusText.textContent = message;
  status.classList.remove("hidden");
  setTimeout(() => status.classList.add("hidden"), 5000);
}

// Show loader
function showLoader(show) {
  loader.classList.toggle("hidden", !show);
}

// Draw radar chart
function drawRadarChart(data) {
  const canvas = document.getElementById("radarChart");
  const ctx = canvas.getContext("2d");
  const centerX = 140;
  const centerY = 140;
  const radius = 100;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const skills = data.map((d) => d.skill);
  const current = data.map((d) => d.current);
  const target = data.map((d) => d.target);
  const angleStep = (Math.PI * 2) / skills.length;

  // Draw grid circles
  ctx.strokeStyle = "#3e3e42";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw axis lines and labels
  ctx.strokeStyle = "#3e3e42";
  ctx.fillStyle = "#cccccc";
  ctx.font = "11px sans-serif";
  ctx.textAlign = "center";

  skills.forEach((skill, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // Draw axis line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Draw label
    const labelX = centerX + Math.cos(angle) * (radius + 20);
    const labelY = centerY + Math.sin(angle) * (radius + 20);
    ctx.fillText(skill, labelX, labelY);
  });

  // Draw current skills polygon
  ctx.beginPath();
  current.forEach((value, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const distance = (value / 100) * radius;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(0, 122, 204, 0.3)";
  ctx.fill();
  ctx.strokeStyle = "#007acc";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw target skills polygon
  ctx.beginPath();
  target.forEach((value, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const distance = (value / 100) * radius;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(78, 201, 176, 0.2)";
  ctx.fill();
  ctx.strokeStyle = "#4ec9b0";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Display skill gaps
function displaySkillGaps(gaps) {
  const skillGapList = document.getElementById("skillGapList");
  skillGapList.innerHTML = "";

  if (gaps && gaps.length > 0) {
    gaps.forEach((skill) => {
      const chip = document.createElement("span");
      chip.className = "skill-chip";
      chip.textContent = skill;
      skillGapList.appendChild(chip);
    });
  } else {
    skillGapList.innerHTML =
      '<p style="color: #858585; text-align: center;">No significant gaps found</p>';
  }
}

// Analyze profile
async function analyzeProfile() {
  showLoader(true);
  analyzeBtn.disabled = true;

  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.url.includes("linkedin.com/in/")) {
      showStatus("Please navigate to a LinkedIn profile page", "error");
      return;
    }

    // Extract profile data from content script
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "extractProfile",
    });

    if (!response.success) {
      throw new Error(response.error || "Failed to extract profile");
    }

    currentProfileData = response.data;

    // Display profile info
    document.getElementById("profileName").textContent =
      currentProfileData.name || "Unknown";
    document.getElementById("skillsCount").textContent =
      currentProfileData.skillsFoundCount || 0;
    document.getElementById("experienceCount").textContent =
      currentProfileData.experienceFoundCount || 0;

    profileInfo.classList.remove("hidden");

    // Sync to backend
    const syncResponse = await chrome.runtime.sendMessage({
      action: "syncProfile",
      data: currentProfileData,
    });

    if (syncResponse.success) {
      // Mock skill gap data (in production, this comes from backend)
      skillGapData = {
        radarData: [
          { skill: "Frontend", current: 70, target: 85 },
          { skill: "Backend", current: 60, target: 80 },
          { skill: "Cloud", current: 40, target: 75 },
          { skill: "DevOps", current: 45, target: 70 },
          { skill: "Testing", current: 55, target: 75 },
        ],
        missingSkills: ["Docker", "Kubernetes", "AWS", "TypeScript"],
      };

      // Draw radar chart
      drawRadarChart(skillGapData.radarData);
      displaySkillGaps(skillGapData.missingSkills);

      skillGapSection.classList.remove("hidden");
      actionButtons.classList.remove("hidden");

      showStatus("Profile analyzed successfully!", "success");
    } else {
      throw new Error(syncResponse.error || "Sync failed");
    }
  } catch (error) {
    console.error("Analysis error:", error);
    showStatus(`Error: ${error.message}`, "error");
  } finally {
    showLoader(false);
    analyzeBtn.disabled = false;
  }
}

// Align roadmap
async function alignRoadmap() {
  if (!skillGapData) {
    showStatus("Please analyze profile first", "error");
    return;
  }

  showLoader(true);
  alignRoadmapBtn.disabled = true;

  try {
    const response = await chrome.runtime.sendMessage({
      action: "alignRoadmap",
      deltaSkills: skillGapData.missingSkills,
    });

    if (response.success) {
      showStatus("Roadmap updated successfully!", "success");
    } else {
      throw new Error(response.error || "Update failed");
    }
  } catch (error) {
    console.error("Roadmap update error:", error);
    showStatus(`Error: ${error.message}`, "error");
  } finally {
    showLoader(false);
    alignRoadmapBtn.disabled = false;
  }
}

// Open dashboard
function openDashboard() {
  chrome.tabs.create({ url: "http://localhost:5173/dashboard" });
}

// Event listeners
analyzeBtn.addEventListener("click", analyzeProfile);
alignRoadmapBtn.addEventListener("click", alignRoadmap);
openDashboardBtn.addEventListener("click", openDashboard);

// Load stored data on popup open
chrome.storage.local.get(["lastExtractedProfile"], (result) => {
  if (result.lastExtractedProfile) {
    currentProfileData = result.lastExtractedProfile;
    document.getElementById("profileName").textContent =
      currentProfileData.name || "Unknown";
    document.getElementById("skillsCount").textContent =
      currentProfileData.skillsFoundCount || 0;
    document.getElementById("experienceCount").textContent =
      currentProfileData.experienceFoundCount || 0;
    profileInfo.classList.remove("hidden");
  }
});
