import { fetchAuctions, placeBid } from "../api/auctions.js";

const auctionListings = document.getElementById("auction-listings");

// Fetch and display all auctions
async function loadAuctions() {
  try {
    const data = await fetchAuctions({ _bids: true, _seller: true });

    if (data.data.length === 0) {
      auctionListings.innerHTML = `<p>No auctions available at the moment.</p>`;
      return;
    }

    renderListings(data.data);
  } catch (error) {
    console.error("Failed to load auctions:", error);
    auctionListings.innerHTML = `<p>Failed to load auctions. Please try again later.</p>`;
  }
}

// Render listings as cards
function renderListings(listings) {
    // Sort listings by `created` in descending order (newest first)
    const sortedListings = listings.sort((a, b) => new Date(b.created) - new Date(a.created));
  
    auctionListings.innerHTML = sortedListings
      .map((listing) => {
        const imageUrl = listing.media?.[0]?.url || "default-image.png";
        const description = listing.description || "No description available.";
  
        return `
          <div class="auction-card" data-id="${listing.id}">
            <img src="${imageUrl}" alt="${listing.title}" />
            <h2 class="auction-title">${listing.title}</h2>
            <p class="auction-description">${description}</p>
            <p><strong>Bids:</strong> <span class="bid-count">${listing._count.bids || 0}</span></p>
            <p><strong>Ends At:</strong> ${new Date(listing.endsAt).toLocaleString()}</p>
            <p><strong>Published:</strong> ${new Date(listing.created).toLocaleString()}</p>
  
            <!-- Bid Section -->
            <div class="bid-section hidden">
              <input type="number" class="bid-input" placeholder="Enter your bid" min="1" />
              <button class="place-bid-btn">Place Bid</button>
            </div>
  
            <!-- Bid Now Button -->
            <button class="bid-now-btn">Bid Now</button>
          </div>
        `;
      })
      .join("");
  
    addBidEventListeners();
  }

// Add bid functionality to each card
function addBidEventListeners() {
  const cards = document.querySelectorAll(".auction-card");

  cards.forEach((card) => {
    const bidNowBtn = card.querySelector(".bid-now-btn");
    const bidSection = card.querySelector(".bid-section");
    const placeBidBtn = card.querySelector(".place-bid-btn");
    const bidInput = card.querySelector(".bid-input");
    const bidCount = card.querySelector(".bid-count");

    const auctionId = card.getAttribute("data-id");

    // Toggle bid section visibility
    bidNowBtn.addEventListener("click", () => {
      bidSection.classList.toggle("hidden");
    });

    // Place a bid
    placeBidBtn.addEventListener("click", async () => {
      const bidAmount = Number(bidInput.value.trim());

      if (bidAmount <= 0 || isNaN(bidAmount)) {
        alert("Please enter a valid bid amount.");
        return;
      }

      try {
        const response = await placeBid(auctionId, bidAmount);
        console.log("Bid placed successfully:", response);

        // Update bid count in UI
        bidCount.innerText = parseInt(bidCount.innerText) + 1;

        // Clear and hide bid section
        bidInput.value = "";
        bidSection.classList.add("hidden");

        alert("Your bid has been placed successfully!");
      } catch (error) {
        console.error("Failed to place bid:", error);
        alert("Failed to place bid. Please try again.");
      }
    });
  });
}

// Initial load
loadAuctions();
