import { apiLogin } from "../api/auth.js";

// Wait for the DOM to be fully loaded before attaching the event listener
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // Get references to the form and error message elements
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  // Check if the login form exists
  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  // Attach the submit event listener to the login form
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Form submitted."); // Log for debugging

    // Get the input values
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    console.log("Login attempt with:", { email, password });

    try {
      // Call the login API
      const response = await apiLogin({ email, password });
      console.log("Login successful:", response);

      // Save the access token and user's name in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userAvatar", response.data.avatar?.url || "default-avatar.png");
      console.log("Access Token Stored:", localStorage.getItem("accessToken"));
      console.log("User Name Stored:", localStorage.getItem("userName"));

      // Redirect to the profile page
      window.location.href = "/src/pages/profile.html";
    } catch (error) {
      console.error("Login failed:", error);

      // Display an error message to the user
      if (errorMessage) {
        errorMessage.style.display = "block";
        errorMessage.innerText = "Login failed! Please try again.";
      }
    }
  });
});
