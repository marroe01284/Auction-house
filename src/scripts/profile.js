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
    const stats = {
      bids: profile.data._count?.listings || 0,
      wins: profile.data._count?.wins || 0,
      credits: profile.data.credits || 0,
    };
    document.getElementById("user-wins").innerText = stats.wins;
    document.getElementById("user-bids").innerText = stats.bids;
    document.getElementById("user-credits").innerText = stats.credits;

    // Generate stats chart
    generateStatsChart(stats);
  } catch (error) {
    console.error("Failed to load profile:", error);
    alert("Session expired. Please log in again.");
    window.location.href = "/src/pages/login.html"; // Redirect to login page
  }
}

/**
 * Generate a donut chart with user statistics.
 * @param {Object} stats - Object containing `bids`, `wins`, and `credits`.
 */
function generateStatsChart(stats) {
  const ctx = document.getElementById("stats-chart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut", // Donut chart
    data: {
      labels: ["Listings", "Wins", "Credits"], // Labels for the data points
      datasets: [
        {
          label: "Statistics",
          data: [stats.bids, stats.wins, stats.credits], // Data points
          backgroundColor: ["#3b82f6", "#10b981", "#fbbf24"], // Tailwind colors for visual clarity
          borderWidth: 2, // Border for each section
        },
      ],
    },
    options: {
      responsive: true, // Makes the chart responsive
      maintainAspectRatio: false, // Allows the chart to fit the container dynamically
      plugins: {
        legend: {
          position: "bottom", // Moves the legend to the bottom
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              return `${label}: ${value}`;
            },
          },
        },
      },
      layout: {
        padding: 20, // Adds padding inside the chart area
      },
    },
  });
}

/**
 * Handle avatar URL updates.
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

// Initial Profile Load
loadUserProfile();
