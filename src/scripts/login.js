import { apiLogin } from "../api/auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submitted.");

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    console.log("Login attempt with:", { email, password });

    try {
      const response = await apiLogin({ email, password });
      console.log("Login successful:", response);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userAvatar", response.data.avatar?.url || "default-avatar.png");
      console.log("Access Token Stored:", localStorage.getItem("accessToken"));
      console.log("User Name Stored:", localStorage.getItem("userName"));

      window.location.href = "/src/pages/profile.html";
    } catch (error) {
      console.error("Login failed:", error);

      if (errorMessage) {
        errorMessage.style.display = "block";
        errorMessage.innerText = "Wrong E-mail or password, try again.";
      }
    }
  });
});
