import { API_KEY } from "./constants.js";
/**
 * Generates HTTP headers for API requests.
 * - Includes `Content-Type`, `X-Noroff-API-Key`, and `Authorization` if the access token is present.
 * 
 * @returns {Headers} An instance of the Headers object containing the required headers.
 */
export function headers() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("X-Noroff-API-Key", API_KEY);

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  } else {
    console.warn("Access token is missing in headers");
  }

  return headers;
}

