import { headers } from "../api/headers.js";
import { API_AUTH_LOGIN,API_AUTH_REGISTER } from "../api/constants.js";
/**
 * General API request function.
 * @param {string} url - The full endpoint URL.
 * @param {string} method - HTTP method (GET, POST, etc.).
 * @param {Object} [body] - Request payload (optional for GET/DELETE).
 * @returns {Promise<Object>} - The JSON response or error object.
 */
export async function apiRequest(url, method = "GET", body = null) {
  const options = {
    method,
    headers: headers(),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({}));
      throw new Error(`Error ${response.status}: ${errorDetails.message || response.statusText}`);
    }

    if (method === "DELETE" || response.status === 204) {
      return;
    }

    return await response.json();
  } catch (error) {
    console.error(`API request to ${url} failed:`, error);
    throw error;
  }
}


/**
 * GET request
 * @param {string} url - The full endpoint URL.
 * @returns {Promise<Object>} - The JSON response.
 */
export const apiGet = (url) => apiRequest(url, "GET");

/**
 * POST request
 * Includes token validation and lets `apiRequest` handle the rest.
 * 
 * @param {string} url - The full endpoint URL.
 * @param {Object} body - The request payload.
 * @returns {Promise<Object>} - The JSON response.
 */
export async function apiPost(url, body) {
  const requiresAuth = ![API_AUTH_LOGIN, API_AUTH_REGISTER].includes(url);

  if (requiresAuth) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found. Redirecting to login...");
      window.location.href = "/src/pages/login.html";
      return;
    }
  }

  return apiRequest(url, "POST", body);
}

/**
 * PUT request
 * @param {string} url - The full endpoint URL.
 * @param {Object} body - The request payload.
 * @returns {Promise<Object>} - The JSON response.
 */
export const apiPut = (url, body) => apiRequest(url, "PUT", body);

/**
 * DELETE request
 * @param {string} url - The full endpoint URL.
 * @returns {Promise<void>} - Resolves if the request succeeds.
 */
export const apiDelete = (url) => apiRequest(url, "DELETE");
