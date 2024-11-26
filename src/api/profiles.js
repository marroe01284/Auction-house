import { apiGet, apiPut } from "../modules/utils.js";
import { API_PROFILES } from "./constants.js";

/**
 * Fetch the current user's profile.
 * @returns {Promise<Object>} - The user's profile data.
 */
/**
 * Fetch the user's profile using their name stored in localStorage.
 * @returns {Promise<Object>} - The user's profile data.
 */
export async function fetchUserProfile() {
    const userName = localStorage.getItem("userName");
  
    if (!userName) {
      throw new Error("User name not found in localStorage");
    }
  
    const url = `${API_PROFILES}/${userName}`;
    console.log("Fetching User Profile from:", url);
  
    return await apiGet(url);
  }

/**
 * Update the current user's profile.
 * @param {Object} profileData - The new profile data.
 * @returns {Promise<Object>} - The updated profile data.
 */
export async function updateUserAvatar(avatarUrl) {
    const userName = localStorage.getItem("userName");
  
    if (!userName) {
      throw new Error("User name not found in localStorage");
    }
  
    const url = `${API_PROFILES}/${userName}`;
    const payload = {
      avatar: {
        url: avatarUrl,
      },
    };
  
    console.log("Updating avatar with data:", payload);
  
    return await apiPut(url, payload);
  }

/**
 * Fetch all listings created by a specific profile.
 * @param {string} profileName - The profile's name.
 * @returns {Promise<Object>} - The listings created by the profile.
 */
export async function fetchProfileListings(profileName) {
  return await apiGet(`${API_PROFILES}/${profileName}/listings`);
}

/**
 * Fetch all bids made by a specific profile.
 * @param {string} profileName - The profile's name.
 * @returns {Promise<Object>} - The bids made by the profile.
 */
export async function fetchProfileBids(profileName) {
  return await apiGet(`${API_PROFILES}/${profileName}/bids`);
}

/**
 * Fetch all wins by a specific profile.
 * @param {string} profileName - The profile's name.
 * @returns {Promise<Object>} - The listings won by the profile.
 */
export async function fetchProfileWins(profileName) {
  return await apiGet(`${API_PROFILES}/${profileName}/wins`);
}
