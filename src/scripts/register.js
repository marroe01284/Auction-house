import { apiRegister } from "../api/auth.js";

const registerForm = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form reload

  // Collect form values
  const name = registerForm.name.value.trim();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();
  const bio = registerForm.bio.value.trim() || null;
  const avatar = {
    url: registerForm["avatar-url"].value.trim() || null,
    alt: registerForm["avatar-alt"].value.trim() || "",
  };
  const banner = {
    url: registerForm["banner-url"].value.trim() || null,
    alt: registerForm["banner-alt"].value.trim() || "",
  };
  const venueManager = registerForm.venueManager.checked;

  try {
    // Call the API with collected data
    const response = await apiRegister({ name, email, password, bio, avatar, banner, venueManager });
    console.log("Registration successful:", response);

    // Save the access token and redirect
    localStorage.setItem("accessToken", response.data.accessToken);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Registration failed:", error);
    errorMessage.style.display = "block";
    errorMessage.innerText = error.message || "Registration failed. Please try again.";
  }
});
