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
 * @returns {string} - The HTML string for the auction card.
 */
export function createAuctionCard({ id, title, description, media, _count, endsAt, created }) {
    const imageUrl = media?.[0]?.url || "default-image.png";
    const auctionDescription = description || "No description available.";
  
    return `
      <div class="auction-card cursor-pointer border border-gray-300 rounded-lg shadow-md overflow-hidden" data-id="${id}">
        <img src="${imageUrl}" alt="${title}" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-lg font-bold mb-2">${title}</h2>
          <p class="text-sm text-gray-600 mb-4">${auctionDescription}</p>
          <p class="text-sm"><strong>Bids:</strong> ${_count.bids || 0}</p>
          <p class="text-sm"><strong>Ends At:</strong> ${new Date(endsAt).toLocaleString()}</p>
          <p class="text-sm"><strong>Published:</strong> ${new Date(created).toLocaleString()}</p>
        </div>
      </div>
    `;
  }
  