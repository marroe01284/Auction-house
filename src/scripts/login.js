import { apiLogin } from "../api/auth.js";

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const response = await apiLogin({ email, password });
    console.log("Login successful:", response);

    // Save the access token in localStorage
    localStorage.setItem("accessToken", response.data.accessToken);

    // Redirect to the profile page
    window.location.href = "/profile.html";
  } catch (error) {
    console.error("Login failed:", error);
    errorMessage.style.display = "block"; // Show error message
    errorMessage.innerText = "Login failed. Please try again.";
  }
});
