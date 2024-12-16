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

    setTimeout(() => {
      localStorage.setItem("accessToken", response.data.accessToken);
      window.location.href = "login.html";
    }, 450); 
  } catch (error) {
    console.error("Registration failed:", error);

    if (error.message.includes("400")) {
      displayError("Profile already exists. Please choose a different email or name.");
    } else {
      displayError(error.message || "Registration failed. Please try again.");
    }
  }
});
/**
 * Validates the provided email address.
 * Ensures it matches the required pattern for @stud.noroff.no domain.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, otherwise false.
 */
function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return pattern.test(email);
}
/**
 * Validates a URL to make sure it is properly formatted.
 * 
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, otherwise false.
 */
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
