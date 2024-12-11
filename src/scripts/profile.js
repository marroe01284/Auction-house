import { fetchUserProfile, updateUserAvatar } from "../api/profiles.js";
import { createNavBar, initializeNavBar } from "../components/header.js";
import { createFooter } from "../components/footer.js";
import { checkIfLoggedIn } from "../modules/auth.js";
document.body.insertAdjacentHTML("afterbegin", createNavBar("user-avatar-url.png"));
document.body.insertAdjacentHTML("afterend", createFooter());
initializeNavBar();
checkIfLoggedIn();

async function loadUserProfile() {
  try {
    const profile = await fetchUserProfile();
    console.log("User Profile Loaded:", profile);

    const avatarElement = document.getElementById("profile-avatar");
    avatarElement.src = profile.data.avatar?.url || "default-avatar.png";
    avatarElement.alt = profile.data.avatar?.alt || "User Avatar";

    document.getElementById("profile-name").innerText = profile.data.name;
    document.getElementById("profile-username").innerText = profile.data.name; // Assuming username is the same as `name`
    document.getElementById("avatar-url").value = profile.data.avatar?.url || "";

    const stats = {
      bids: profile.data._count?.listings || 0,
      wins: profile.data._count?.wins || 0,
      credits: profile.data.credits || 0,
    };
    document.getElementById("user-wins").innerText = stats.wins;
    document.getElementById("user-bids").innerText = stats.bids;
    document.getElementById("user-credits").innerText = stats.credits;

    generateStatsChart(stats);
  } catch (error) {
    console.error("Failed to load profile:", error);
    alert("You dont have a registered profile, please log in or register!");
    window.location.href = "/src/pages/login.html";
  }
}

/**
 * Generate a donut chart with user statistics.
 * @param {Object} stats - Object containing `bids`, `wins`, and `credits`.
 */
function generateStatsChart(stats) {
  const ctx = document.getElementById("stats-chart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Listings", "Wins", "Credits"],
      datasets: [
        {
          label: "Statistics",
          data: [stats.bids, stats.wins, stats.credits],
          backgroundColor: ["#3b82f6", "#10b981", "#fbbf24"],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
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
        padding: 20,
      },
    },
  });
}


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
    loadUserProfile();
  } catch (error) {
    console.error("Failed to update avatar:", error);
    alert("Failed to update avatar. Please try again.");
  }
});

loadUserProfile();
