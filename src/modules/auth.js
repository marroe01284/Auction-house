import { apiLogin } from '../api/auth.js';

export async function loginUser(email, password) {
  const response = await apiLogin({ email, password });
  if (response.accessToken) {
    localStorage.setItem("accessToken", response.accessToken);
    return true;
  }
  return false;
}


 export function checkIfLoggedIn() {
  const userToken = localStorage.getItem("accessToken");

  if (!userToken) {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
          <h2 class="text-lg font-bold mb-4">Access Restricted</h2>
          <p class="mb-4">You need to log in or register to access this page.</p>
          <div class="flex justify-end space-x-2">
            <button id="login-btn" class="bg-card-1 text-white px-4 py-2 rounded hover:bg-gray-400">Log in</button>
            <button id="register-btn" class="bg-card-1 text-white px-4 py-2 rounded hover:bg-gray-400">Register</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("login-btn").addEventListener("click", () => {
      window.location.href = "/src/pages/login.html";
    });

    document.getElementById("register-btn").addEventListener("click", () => {
      window.location.href = "/src/pages/register.html";
    });

    throw new Error("User not logged in");
  }
}