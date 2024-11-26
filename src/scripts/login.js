import { apiLogin } from "../api/auth.js";

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    // Call the login API
    const response = await apiLogin({ email, password });
    console.log("Login successful:", response);

    // Save the access token and user's name in localStorage
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("userName", response.data.name); // Store the user's name
    console.log("Access Token Stored:", localStorage.getItem("accessToken"));
    console.log("User Name Stored:", localStorage.getItem("userName"));

    // Redirect to the profile page
    window.location.href = "profile.html";
  } catch (error) {
    console.error("Login failed:", error);
    errorMessage.style.display = "block"; // Show error message
    errorMessage.innerText = "Login failed. Please try again.";
  }
});
