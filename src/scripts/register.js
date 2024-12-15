import { apiRegister } from "../api/auth.js";

const registerForm = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = registerForm.name.value.trim();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();
  const avatarUrl = registerForm["avatar-url"].value.trim();

  if (!validateEmail(email)) {
    displayError("Email must end with @stud.noroff.no");
    return;
  }
  if (avatarUrl && !validateUrl(avatarUrl)) {
    displayError("Avatar URL is not valid.");
    return;
  }

  try {

    const response = await apiRegister({ name, email, password, avatar: { url: avatarUrl } });
    console.log("Registration successful:", response);

    localStorage.setItem("accessToken", response.data.accessToken);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Registration failed:", error);

    if (error.message.includes("400")) {
      displayError("Profile already exists. Please choose a different email or name.");
    } else {
      displayError(error.message || "Registration failed. Please try again.");
    }
  }
});

function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return pattern.test(email);
}

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function displayError(message) {
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
}
