import { API_AUTH_LOGIN, API_AUTH_REGISTER } from './constants.js';
import { apiPost } from '../modules/utils.js';

/**
 * Sends a login request to the API.
 *
 * @async
 * @function apiLogin
 * @param {Object} credentials - The user's login credentials.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The API response containing the user data and token.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function apiLogin({ email, password }) {
  return await apiPost(API_AUTH_LOGIN, { email, password });
}

/**
* Sends a registration request to the API.
*
* @async
* @function apiRegister
* @param {Object} userData - The user's registration data.
* @param {string} userData.name - The user's name.
* @param {string} userData.email - The user's email address.
* @param {string} userData.password - The user's password.
* @param {string} [userData.avatar] - URL for the user's avatar image.
* @returns {Promise<Object>} - The API response confirming registration.
* @throws {Error} - Throws an error if the request fails.
*/
export async function apiRegister(userData) {
  return await apiPost(API_AUTH_REGISTER, userData);
}
/**
 * Retrieves the user's access token from localStorage.
 *
 * @function getKey
 * @returns {string|null} - The access token if it exists; otherwise, `null`.
 */
export async function getKey() {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error("Access token not found in localStorage.");
    return null;
  }
  return accessToken;
}
/**
 * Handles user registration with detailed user data.
 *
 * @async
 * @function register
 * @param {Object} userDetails - The details for the new user.
 * @param {string} userDetails.name - The user's full name.
 * @param {string} userDetails.email - The user's email address.
 * @param {string} userDetails.password - The user's password.
 * @param {string} [userDetails.bio] - Optional bio for the user profile.
 * @param {string} [userDetails.banner] - Optional URL for the user's banner image.
 * @param {string} [userDetails.avatar] - Optional URL for the user's avatar image.
 * @returns {Promise<void>} - Does not return a value (empty promise).
 */
export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) { }