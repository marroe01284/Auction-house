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
export function createAuctionCard({ id, title, media, bids }) {
  const imageUrl = media?.[0]?.url || "default-image.png";
  
  // Calculate the highest bid amount from the `bids` array
  const highestBidAmount = bids?.length
    ? `$${Math.max(...bids.map((bid) => bid.amount)).toFixed(2)}`
    : "No bids yet";

  return `
    <div class="auction-card" data-id="${id}">
      <img src="${imageUrl}" alt="${title}" />
      <div class="card-info">
        <div class="card-title">${title}</div>
        <div class="card-bid"><strong>Highest Bid:</strong> ${highestBidAmount}</div>
      </div>
    </div>
  `;
}
