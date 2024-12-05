import { fetchAuctions, placeBid } from "../api/auctions.js";
import { API_BASE } from "../api/constants.js";
import { createNavBar, initializeNavBar } from "../components/header.js";
import { createFooter } from "../components/footer.js";
import { createAuctionCard } from "../components/auctionCard.js";

// Insert Navbar and Footer
document.body.insertAdjacentHTML("afterbegin", createNavBar("user-avatar-url.png"));
document.body.insertAdjacentHTML("beforeend", createFooter());
initializeNavBar();

// Section Containers
const sections = {
  "new-listings": document.getElementById("new-listings"),
  "ending-soon": document.getElementById("ending-soon"),
  "popular": document.getElementById("popular"),
  "recently-published": document.getElementById("recently-published"),
};

/**
 * Fetch and render auctions.
 */
async function loadAuctions() {
  try {
    const data = await fetchAuctions({ _bids: true, _seller: true });
    const listings = data.data;

    if (listings.length === 0) {
      Object.values(sections).forEach((section) => {
        section.innerHTML = `<p>No auctions available at the moment.</p>`;
      });
      return;
    }

    // Render listings by category
    renderListingsByCategory(listings, "new-listings", sortByCreated);
    renderListingsByCategory(listings, "ending-soon", sortByEndingSoon);
    renderListingsByCategory(listings, "popular", sortByPopularity);
    renderListingsByCategory(listings, "recently-published", sortByRecentlyPublished);

    // Bind auction cards after rendering
    bindAuctionCards();
  } catch (error) {
    console.error("Failed to load auctions:", error);
    Object.values(sections).forEach((section) => {
      section.innerHTML = `<p>Failed to load auctions. Please try again later.</p>`;
    });
  }
}

/**
 * Render listings into a specific section.
 * @param {Array} listings - Array of auction listings.
 * @param {string} sectionId - The section to render into.
 * @param {Function} sortFn - Sorting function for the category.
 */
function renderListingsByCategory(listings, sectionId, sortFn) {
  const section = sections[sectionId];
  const sortedListings = [...listings].sort(sortFn).slice(0, 10);

  section.innerHTML = `
    <div class="listing-container">
      ${sortedListings.map((listing) => createAuctionCard(listing)).join("")}
    </div>
  `;
}

/**
 * Sorting functions for different categories.
 */
const sortByCreated = (a, b) => new Date(b.created) - new Date(a.created); // Newest first
const sortByEndingSoon = (a, b) => new Date(a.endsAt) - new Date(b.endsAt); // Closest ending first
const sortByPopularity = (a, b) => (b._count?.bids || 0) - (a._count?.bids || 0); // Most bids first
const sortByRecentlyPublished = (a, b) => new Date(b.created) - new Date(a.created); // Newest first

/**
 * Bind auction cards to open the modal when clicked.
 */
function bindAuctionCards() {
  const auctionCards = document.querySelectorAll(".auction-card");

  auctionCards.forEach((card) => {
    const auctionId = card.getAttribute("data-id");
    card.addEventListener("click", () => loadAuctionDetails(auctionId));
  });
}

/**
 * Load auction details and display them in a modal.
 * @param {string} auctionId - The ID of the auction to load.
 */
async function loadAuctionDetails(auctionId) {
  try {
    const modal = document.getElementById("auction-modal");
    const modalContent = modal.querySelector(".p-4");
    const modalAction = document.getElementById("auction-modal-action");

    modalContent.innerHTML = "<p>Loading...</p>";
    modal.classList.add("active");

    const url = `${API_BASE}/auction/listings/${auctionId}?_bids=true`; // Ensure `_bids=true` is included
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    const auctionDetails = result.data;

    // Calculate the highest bid
    const highestBid = auctionDetails.bids.length > 0 
      ? Math.max(...auctionDetails.bids.map((bid) => bid.amount)) 
      : 0;

    // Dynamically inject modal content
    modalContent.innerHTML = `
      <h3 class="text-xl font-semibold mb-4 font-roboto">${auctionDetails.title}</h3>
      <img src="${auctionDetails.media[0]?.url || 'default-image.png'}" alt="${auctionDetails.title}" class="w-full h-64 object-cover mb-4 rounded-lg" />
      <p class="mb-2 font-roboto"><strong>Seller:</strong> ${auctionDetails.seller?.name || "Unknown"}</p>
      <p class="mb-2 font-roboto"><strong>Description:</strong> ${auctionDetails.description || "No description provided."}</p>
      <p class="mb-2 font-roboto"><strong>Highest Bid:</strong> $${highestBid}</p>
      <p class="mb-2 font-roboto"><strong>Ends At:</strong> ${new Date(auctionDetails.endsAt).toLocaleString()}</p>

      <div class="bid-section mt-4">
        <input
          type="number"
          id="bid-amount"
          placeholder="Enter your bid"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    `;

    // Bind the bid functionality to the action button
    modalAction.innerHTML = `
      <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
      </span>
      <span class="button-text">Place Bid</span>
    `;
    modalAction.className = "learn-more green";
    modalAction.onclick = async () => {
      const bidAmount = Number(document.getElementById("bid-amount").value.trim());
      if (bidAmount <= 0 || isNaN(bidAmount)) {
        alert("Please enter a valid bid amount.");
        return;
      }

      try {
        await placeBid(auctionId, bidAmount);
        alert("Your bid was successfully placed!");
        modal.classList.remove("active");
        loadAuctions(); // Reload auctions to reflect updated bids
      } catch (error) {
        console.error("Failed to place bid:", error);
        alert("Failed to place bid. Please try again.");
      }
    };
  } catch (error) {
    console.error("Failed to load auction details:", error);
    document.getElementById("auction-modal").querySelector(".p-4").innerHTML =
      "<p>Failed to load auction details. Please try again later.</p>";
  }
}


document.getElementById("auction-modal-close").addEventListener("click", () => {
  const modal = document.getElementById("auction-modal");
  modal.classList.remove("active");
});
// Close the modal when clicking outside the modal content
document.getElementById("auction-modal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    const modal = document.getElementById("auction-modal");
    modal.classList.remove("active");
  }
});
// Initial Load
loadAuctions();
