import { API_KEY } from "./constants.js";

export function headers() {
  const headers = new Headers();

  // Add Content-Type header to indicate JSON payloads
  headers.append("Content-Type", "application/json");

  // Add the API key required for authentication
  headers.append("X-Noroff-API-Key", API_KEY);

  // Add Authorization header if the access token exists
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
    console.log("Authorization Header Set:", `Bearer ${accessToken}`);
  }else{
    console.warn("access token is missing in headers");
  }

  return headers;
}
