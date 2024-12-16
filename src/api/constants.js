/**
 * Base URL for the API.
 * @constant {string}
 */
export const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * API key for authorization.
 * @constant {string}
 */
export const API_KEY = import.meta.env.VITE_API_KEY;

// Authentication

/**
 * Base URL for authentication.
 * @constant {string}
 */
export const API_AUTH = `${API_BASE}/auth`;

/**
 * URL for the login.
 * @constant {string}
 */
export const API_AUTH_LOGIN = `${API_AUTH}/login`;

/**
 * URL for the registration.
 * @constant {string}
 */
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

// Auction Endpoints

/**
 * Base URL for auction listings.
 * @constant {string}
 */
export const API_AUCTIONS = `${API_BASE}/auction/listings`;

/**
 * URL for searching auctions.
 * @constant {string}
 */
export const API_AUCTION_SEARCH = `${API_AUCTIONS}/search?q=`;

// Profiles Endpoints

/**
 * Base URL for profiles endpoints.
 * @constant {string}
 */
export const API_PROFILES = `${API_BASE}/auction/profiles`;