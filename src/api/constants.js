export const API_BASE = "https://v2.api.noroff.dev";
export const API_KEY = "de4d1864-8f06-4071-a343-118865e1ca86";

// Authentication Endpoints
export const API_AUTH = `${API_BASE}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

// Auction Endpoints
export const API_AUCTIONS = `${API_BASE}/auction/listings`;
export const API_AUCTION_SEARCH = `${API_AUCTIONS}/search?q=`;

// Profiles Endpoints
export const API_PROFILES = `${API_BASE}/auction/profiles`;

