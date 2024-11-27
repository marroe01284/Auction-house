import { apiGet, apiPost } from "../modules/utils.js";
import { API_AUCTIONS } from "./constants.js";

/**
 * Fetch all auction listings.
 * @param {Object} [queryParams={}] - Optional query parameters (e.g., `_bids`, `_seller`, `_tag`, `_active`).
 * @returns {Promise<Object>} - The API response containing auction listings.
 */
export async function fetchAuctions(queryParams = {}) {
  try {
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const endpoint = `${API_AUCTIONS}${queryString ? `?${queryString}` : ""}`;
    const response = await apiGet(endpoint);

    console.log("Fetched Auctions:", response);
    return response;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error;
  }
}

/**
 * Place a bid on an auction listing.
 * 
 * @param {string} auctionId - The ID of the auction listing.
 * @param {number} amount - The bid amount.
 * @returns {Promise<Object>} - The API response containing the updated auction details.
 */
export async function placeBid(auctionId, amount) {
  if (!auctionId || !amount) {
    throw new Error("Auction ID and bid amount are required.");
  }

  const fullUrl = `${API_AUCTIONS}/${auctionId}/bids`;

  try {
    const response = await apiPost(fullUrl, { amount });
    console.log("Bid placed successfully:", response);
    return response;
  } catch (error) {
    console.error("Failed to place bid:", error);
    throw error;
  }
}


/**
 * Create a new auction listing.
 * 
 * @param {Object} listingData - The data for the new listing.
 * @returns {Promise<Object>} - The API response for the created listing.
 */
export async function createListing(listingData) {
    try {
      const response = await apiPost(`${API_AUCTIONS}`, listingData);
      console.log("Listing created successfully:", response);
      return response;
    } catch (error) {
      console.error("Failed to create listing:", error);
      throw error;
    }
  }