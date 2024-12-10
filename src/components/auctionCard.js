/**
 * Generates an HTML string for an auction card.
 * @param {Object} auction - The auction details.
 * @param {string} auction.id - The unique ID of the auction.
 * @param {string} auction.title - The title of the auction.
 * @param {string} auction.description - The auction description.
 * @param {Array} auction.media - Array of media objects (images).
 * @param {Object} auction._count - Object containing counts (e.g., bids).
 * @param {string} auction.endsAt - The end time of the auction.
 * @param {string} auction.created - The creation time of the auction.
 * @param {number} auction.highestBid - The highest bid amount.
 * @returns {string} - The HTML string for the auction card.
 */
export function createAuctionCard({ id, title, media, bids, endsAt }) {
  const imageUrl = media?.[0]?.url || "default-image.png";

  const highestBidAmount = bids?.length
    ? `$${Math.max(...bids.map((bid) => bid.amount)).toFixed(2)}`
    : "No bids yet";

  const timeLeft = new Date(endsAt) > new Date() ? calculateTimeLeft(new Date(endsAt)) : "Expired";

  return `
    <div class="auction-card relative cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden" data-id="${id}">
      <img src="${imageUrl}" alt="${title}" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="text-lg font-bold mb-2">${title}</h2>
        <p class="text-sm text-gray-600"><strong>Highest Bid:</strong> ${highestBidAmount}</p>
      </div>
      <!-- Countdown Timer -->
      <div 
        class="countdown-timer absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-bold"
        data-ends-at="${endsAt}">
        ${timeLeft}
      </div>
    </div>
  `;
}

/**
 * Calculates the time left until an auction ends.
 * @param {Date} endDate - The end date of the auction.
 * @returns {string} - A formatted string representing the time left.
 */
export function calculateTimeLeft(endTime) {
  if (!endTime) {
    return "Invalid Time"; // Handle cases where endTime is not provided
  }

  const now = new Date();
  const endsAt = new Date(endTime);

  if (isNaN(endsAt.getTime())) {
    return "Invalid Time"; // Handle invalid date strings
  }

  const difference = endsAt - now;

  if (difference <= 0) {
    return "Expired";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  const dayStr = days > 0 ? `${days}d` : "";
  const hourStr = hours > 0 ? `${hours}h` : "";
  const minuteStr = minutes > 0 ? `${minutes}m` : "";

  return `${dayStr} ${hourStr} ${minuteStr}`.trim();
}
