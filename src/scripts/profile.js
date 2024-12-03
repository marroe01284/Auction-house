import { fetchUserProfile, updateUserAvatar } from "../api/profiles.js";
import { createNavBar, initializeNavBar } from "../components/header.js";
import { createFooter } from "../components/footer.js";

// Insert Navbar and Footer
document.body.insertAdjacentHTML("afterbegin", createNavBar("user-avatar-url.png"));
document.body.insertAdjacentHTML("beforeend", createFooter());
initializeNavBar();

/**
 * Load the user's profile data and populate the UI.
 */
async function loadUserProfile() {
  try {
    const profile = await fetchUserProfile();
    console.log("User Profile Loaded:", profile);
    // Populate avatar image
    const avatarElement = document.getElementById("profile-avatar");
    avatarElement.src = profile.data.avatar?.url || "default-avatar.png";
    avatarElement.alt = profile.data.avatar?.alt || "User Avatar";

    // Populate profile information
    document.getElementById("profile-name").innerText = profile.data.name;
    document.getElementById("profile-username").innerText = profile.data.name; // Assuming username is the same as `name`
    document.getElementById("avatar-url").value = profile.data.avatar?.url || "";

    // Populate statistics
    document.getElementById("user-wins").innerText = profile.data._count?.wins || 0;
    document.getElementById("user-bids").innerText = profile.data._count?.listings || 0;
    document.getElementById("user-credits").innerText = profile.data.credits || 0;

    // Generate stats chart
    generateStatsChart({
      bids: profile.data._count?.listings || 0,
      wins: profile.data._count?.wins || 0,
      credits: profile.data.credits || 0,
    });
  } catch (error) {
    console.error("Failed to load profile:", error);
    alert("Session expired. Please log in again.");
    window.location.href = "/src/pages/login.html"; // Redirect to login page
  }
}

/**
 * Handle the avatar update form submission.
 */
document.getElementById("profile-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const newAvatarUrl = document.getElementById("avatar-url").value.trim();

  if (!newAvatarUrl) {
    alert("Please enter a valid URL.");
    return;
  }

  try {
    await updateUserAvatar(newAvatarUrl);
    alert("Avatar updated successfully!");
    loadUserProfile(); // Refresh profile after update
  } catch (error) {
    console.error("Failed to update avatar:", error);
    alert("Failed to update avatar. Please try again.");
  }
});

/**
 * Generate the statistics chart.
 * @param {Object} stats - The statistics data.
 */
function generateStatsChart(stats) {
  const ctx = document.getElementById("stats-chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Bids", "Wins", "Credits"],
      datasets: [
        {
          label: "Statistics",
          data: [stats.bids, stats.wins, stats.credits],
          backgroundColor: ["#3b82f6", "#10b981", "#fbbf24"], // Tailwind colors
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  });
}

// Initial Profile Load
loadUserProfile();
