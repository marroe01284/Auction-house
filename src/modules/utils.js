import { headers } from "../api/headers.js";

/**
 * General API request function.
 * @param {string} url - The endpoint URL.
 * @param {string} method - HTTP method (GET, POST, etc.).
 * @param {Object} [body] - Request payload (optional for GET/DELETE).
 * @returns {Promise<Object>} - The JSON response or error object.
 */
export async function apiRequest(url, method = "GET", body = null) {
  const options = {
    method,
    headers: headers(), // Dynamic headers
  };

  if (body) {
    options.body = JSON.stringify(body); // Add body for POST/PUT
  }

  console.log("Request Details:");
  console.log("URL:", url);
  console.log("Method:", method);
  console.log("Headers:", Array.from(options.headers.entries()));
  console.log("Body:", body);

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorDetails = await response.json(); // Get error details
      throw new Error(`Error ${response.status}: ${errorDetails.message || ""}`);
    }

    return await response.json(); // Parse JSON response
  } catch (error) {
    console.error(`API request to ${url} failed:`, error);
    throw error;
  }
}

// Helper functions for specific HTTP methods

/**
 * GET request
 * @param {string} url - The endpoint URL.
 * @returns {Promise<Object>} - The JSON response.
 */
export const apiGet = (url) => apiRequest(url, "GET");

/**
 * POST request
 * @param {string} url - The endpoint URL.
 * @param {Object} body - The request payload.
 * @returns {Promise<Object>} - The JSON response.
 */
export const apiPost = (url, body) => apiRequest(url, "POST", body);

/**
 * PUT request
 * @param {string} url - The endpoint URL.
 * @param {Object} body - The request payload.
 * @returns {Promise<Object>} - The JSON response.
 */
export const apiPut = (url, body) => apiRequest(url, "PUT", body);

/**
 * DELETE request
 * @param {string} url - The endpoint URL.
 * @returns {Promise<void>} - Resolves if the request succeeds.
 */
export const apiDelete = (url) => apiRequest(url, "DELETE");
