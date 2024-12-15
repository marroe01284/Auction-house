import { API_BASE } from "../api/constants.js";
import { placeBid } from "../api/auctions.js";
import { loadAuctions } from "../scripts/auction.js";

function closeModal() {
  const modal = document.getElementById("auction-modal");
  const bidHistoryContainer = document.getElementById("bid-history");
  const arrowIcon = document.querySelector("#toggle-bid-history .arrow-icon");

  bidHistoryContainer.classList.remove("max-h-[500px]");
  bidHistoryContainer.classList.add("max-h-0");

  if (arrowIcon) {
    arrowIcon.classList.remove("rotate-180");
  }

  modal.classList.remove("active");
  modal.classList.add("hidden");
}

function isUserLoggedIn() {
  return Boolean(localStorage.getItem("userName")); // Adjust key based on your localStorage setup
}

export async function loadAuctionDetails(auctionId) {
  try {
    const modal = document.getElementById("auction-modal");
    const auctionImage = document.getElementById("auction-image");
    const auctionTitle = document.getElementById("auction-title");
    const auctionDescription = document.getElementById("auction-description");
    const auctionSeller = document.getElementById("auction-seller");
    const auctionHighestBid = document.getElementById("highest-bid");
    const bidInput = document.getElementById("bid-amount");
    const bidHistoryContainer = document.getElementById("bid-history");
    const modalAction = document.getElementById("auction-modal-action");

    // Reset modal content
    auctionTitle.textContent = "";
    auctionDescription.textContent = "";
    auctionImage.src = "";
    auctionSeller.textContent = "";
    auctionHighestBid.textContent = "";
    bidHistoryContainer.innerHTML = "<p class='text-sm text-gray-600'>Loading bid history...</p>";

    modal.classList.add("active");

    // Fetch auction details
    const url = `${API_BASE}/auction/listings/${auctionId}?_bids=true&_seller=true`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const auctionDetails = (await response.json()).data;

    // Populate dynamic content
    auctionImage.src = auctionDetails.media?.[0]?.url || "/assets/images/companyLogo.png";
    auctionImage.alt = auctionDetails.title || "Auction Item";

    auctionTitle.textContent = auctionDetails.title || "No Title Available";
    auctionDescription.textContent = auctionDetails.description || "No description provided.";
    auctionSeller.textContent = `Seller: ${auctionDetails.seller?.name || "Unknown"}`;

    const highestBid = auctionDetails.bids?.length
      ? `$${Math.max(...auctionDetails.bids.map((bid) => bid.amount)).toFixed(2)}`
      : "No bids yet";
    auctionHighestBid.textContent = `Highest Bid: ${highestBid}`;

    // Update bidding history
    const latestBids = auctionDetails.bids.slice(-3).reverse();
    bidHistoryContainer.innerHTML =
      latestBids.length > 0
        ? latestBids
            .map(
              (bid) => `
          <div class="mb-3 last:mb-0">
            <p class="text-sm font-medium">${bid.bidder?.name || "Unknown"}</p>
            <p class="text-sm text-gray-600">Bid: $${bid.amount}</p>
          </div>
        `
            )
            .join("")
        : "<p class='text-sm text-gray-600'>No bids yet.</p>";

    // Clear previous bid input
    bidInput.value = "";

    // Add place bid functionality
    modalAction.onclick = async () => {
      if (!isUserLoggedIn()) {
        alert("You need to be logged in to place a bid.");
        return; // Stop further execution if user is not logged in
      }
      const bidAmount = parseFloat(bidInput.value);
      if (isNaN(bidAmount) || bidAmount <= 0) {
        alert("Please enter a valid bid amount.");
        return;
      }

      try {
        await placeBid(auctionId, bidAmount);
        alert("Bid placed successfully!");
        closeModal();
        loadAuctions(); // Reload auctions
      } catch (error) {
        console.error("Failed to place bid:", error);
        alert("Failed to place bid. Please try again.");
      }
    };

    // Attach event listener to toggle bid history
    const toggleBidHistoryButton = document.getElementById("toggle-bid-history");
    const arrowIcon = toggleBidHistoryButton.querySelector(".arrow-icon");

    toggleBidHistoryButton.onclick = () => {
      const isExpanded = bidHistoryContainer.classList.contains("max-h-[500px]");

      if (isExpanded) {
        // Collapse bid history
        bidHistoryContainer.classList.remove("max-h-[500px]");
        bidHistoryContainer.classList.add("max-h-0");
      } else {
        // Expand bid history
        bidHistoryContainer.classList.remove("max-h-0");
        bidHistoryContainer.classList.add("max-h-[500px]");
      }

      // Rotate the arrow icon
      arrowIcon.classList.toggle("rotate-180");
    };

    // Show the modal
    modal.classList.remove("hidden");
  } catch (error) {
    console.error("Failed to load auction details:", error);
    alert("Could not load auction details. Please try again.");
  }
}


document.getElementById("auction-modal-close").addEventListener("click", closeModal);

document.getElementById("auction-modal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});

loadAuctions();
