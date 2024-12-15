export const API_BASE = import.meta.env.VITE_API_BASE;
export const API_KEY = import.meta.env.VITE_API_KEY;

// Authentication Endpoints
export const API_AUTH = `${API_BASE}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

// Auction Endpoints
export const API_AUCTIONS = `${API_BASE}/auction/listings`;
export const API_AUCTION_SEARCH = `${API_AUCTIONS}/search?q=`;

// Profiles Endpoints
export const API_PROFILES = `${API_BASE}/auction/profiles`;

