import { API_KEY } from "./constants.js";
/**
 * Function to generate dynamic headers for API requests.
 * This ensures all requests include the required headers, like Content-Type and the API key.
 *
 * **Parameters:**  
 * This function does not take any parameters.  
 * Instead, it uses the `API_KEY` value from the `constants.js` file.  
 * 
 * **Returns:**  
 * A `Headers` object containing:  
 * - `Content-Type`: Specifies that the request payload is in JSON format.  
 * - `X-Noroff-API-Key`: The unique API key required to authenticate with the Noroff API.  
 */
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
