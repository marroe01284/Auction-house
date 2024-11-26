import { fetchUserProfile, updateUserAvatar } from "../api/profiles";

async function loadUserProfile() {
  try {
    const profile = await fetchUserProfile();
    console.log("User Profile Loaded:", profile);

    // Populate user information
    document.getElementById("profile-avatar").src = profile.data.avatar?.url || "default-avatar.png";
    document.getElementById("profile-avatar").alt = profile.data.avatar?.alt || "User Avatar";
    document.getElementById("profile-name").innerText = profile.data.name;
      // Populate user statistics
      document.getElementById("user-credits").innerText = profile.data.credits;
      document.getElementById("user-wins").innerText = profile.data._count.wins || 0;
      document.getElementById("user-bids").innerText = profile.data._count.bids || 0;

    // Pre-fill the edit form with the current avatar URL
    document.getElementById("edit-avatar").value = profile.data.avatar?.url || "";
  } catch (error) {
    console.error("Failed to load profile:", error);
    alert("Session expired. Please log in again.");
    window.location.href = "/src/pages/login.html"; // Redirect to login
  }
}

async function handleEditProfile(event) {
  event.preventDefault();

  const newAvatarUrl = document.getElementById("edit-avatar").value.trim();

  try {
    const updatedProfile = await updateUserAvatar(newAvatarUrl);
    console.log("Profile Updated:", updatedProfile);

    // Show success message
    const editMessage = document.getElementById("edit-message");
    editMessage.style.display = "block";
    editMessage.innerText = "Profile updated successfully!";

    // Reload the profile data to reflect changes
    loadUserProfile();

    // Hide the edit form
    document.getElementById("edit-profile-section").style.display = "none";
  } catch (error) {
    console.error("Failed to update profile:", error);
    alert("Failed to update profile. Please try again.");
  }
}

function toggleEditForm() {
  const editSection = document.getElementById("edit-profile-section");
  const isVisible = editSection.style.display === "block";
  editSection.style.display = isVisible ? "none" : "block";
}

// Event listeners
document.getElementById("edit-button").addEventListener("click", toggleEditForm);
document.getElementById("edit-profile-form").addEventListener("submit", handleEditProfile);

// Initial profile load
loadUserProfile();
