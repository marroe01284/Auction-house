import { fetchAuctions, placeBid } from "../api/auctions.js";
import { API_BASE } from "../api/constants.js";
import { createNavBar, initializeNavBar } from "../components/header.js";
import { createFooter } from "../components/footer.js";
import { createModal } from "../components/modal.js";
import { createAuctionCard } from "../components/auctionCard.js";

document.body.insertAdjacentHTML("afterbegin", createNavBar("user-avatar-url.png"));
document.body.insertAdjacentHTML("beforeend", createFooter());
initializeNavBar();
document.body.insertAdjacentHTML("beforeend", createModal("auction-modal", "Auction Details", "<p>Loading...</p>"));

const auctionListings = document.getElementById("auction-listings");
const modal = document.getElementById("auction-modal");
const modalContent = modal.querySelector(".p-4");
const modalClose = document.getElementById("auction-modal-close");
const modalAction = document.getElementById("auction-modal-action");

// Close modal event listener
document.getElementById("auction-modal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    document.getElementById("auction-modal").classList.remove("active");
  }
});

// Close modal when clicking the 'X' button
document.getElementById("auction-modal-close").addEventListener("click", () => {
  document.getElementById("auction-modal").classList.remove("active");
});

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
  .map((listing) => createAuctionCard(listing))
  .join("");

  bindAuctionCards();
}

// Bind auction cards to open the modal
function bindAuctionCards() {
  const auctionCards = document.querySelectorAll(".auction-card");

  auctionCards.forEach((card) => {
    const auctionId = card.getAttribute("data-id");
    card.addEventListener("click", () => loadAuctionDetails(auctionId));
    console.log("Auction ID:", auctionId);
  });
}

// Load auction details into the modal
async function loadAuctionDetails(auctionId) {
  try {
    console.log("Auction ID:", auctionId);
    const url = `${API_BASE}/auction/listings/${auctionId}`;
    console.log("Fetching Auction Details from:", url);

    modalContent.innerHTML = "<p>Loading...</p>";
    modal.classList.add("active");

    // Fetch auction details
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    const auctionDetails = result.data; // Access the `data` key

    // Populate modal content with auction details
    modalContent.innerHTML = `
      <h3 class="text-xl font-semibold mb-2">${auctionDetails.title}</h3>
      <img src="${auctionDetails.media[0]?.url || 'default-image.png'}" alt="${auctionDetails.title}" class="w-full h-48 object-cover mb-4" />
      <p>${auctionDetails.description || "No description available."}</p>
      <p><strong>Current Bids:</strong> ${auctionDetails._count.bids || 0}</p>
      <input
        type="number"
        id="bid-amount"
        placeholder="Enter your bid"
        class="w-full border rounded-lg p-2 mt-4"
      />
    `;

    // Bind the bid functionality to the modal action button
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
    modalContent.innerHTML = "<p>Failed to load auction details. Please try again later.</p>";
  }
}

// Initial load
loadAuctions();
