import { fetchAuctions, placeBid } from "../api/auctions.js";
import { API_BASE, API_AUCTION_SEARCH } from "../api/constants.js";
import { createNavBar, initializeNavBar } from "../components/header.js";
import { createFooter } from "../components/footer.js";
import { createAuctionCard, calculateTimeLeft } from "../components/auctionCard.js";

// Insert Navbar and Footer
document.body.insertAdjacentHTML("afterbegin", createNavBar("user-avatar-url.png"));
document.body.insertAdjacentHTML("beforeend", createFooter());
initializeNavBar();

// Search Results Section
const searchInput = document.querySelector("input[type='text']");
const searchResultsHeading = document.getElementById("search-results-heading");
const searchResultsSection = document.getElementById("search-results");
const searchResultsContainer = searchResultsSection.querySelector(".listing-container");
// Section Containers
const sections = {
  "new-listings": document.getElementById("new-listings"),
  "ending-soon": document.getElementById("ending-soon"),
  "popular": document.getElementById("popular"),
  "recently-published": document.getElementById("recently-published"),
};
 // Pagination State
const paginationState = {
  "new-listings": { currentPage: 1, totalPages: 0, itemsPerPage: 10 },
  "ending-soon": { currentPage: 1, totalPages: 0, itemsPerPage: 10 },
  "popular": { currentPage: 1, totalPages: 0, itemsPerPage: 10 },
  "recently-published": { currentPage: 1, totalPages: 0, itemsPerPage: 10 },
};


/**
 * Fetch and render auctions.
 */
async function loadAuctions() {
  try {
    loader.classList.remove("hidden");

    const data = await fetchAuctions({ _bids: true, _seller: true });
    let listings = data.data;

    if (listings.length === 0) {
      Object.values(sections).forEach((section) => {
        section.innerHTML = `<p>No auctions available at the moment.</p>`;
      });
      return;
    }

    // Filter out expired listings
    const now = new Date();
    listings = listings.filter((listing) => new Date(listing.endsAt) > now);

    if (listings.length === 0) {
      Object.values(sections).forEach((section) => {
        section.innerHTML = `<p>No active auctions available at the moment.</p>`;
      });
      return;
    }

    // Render listings by category with pagination
    renderListingsByCategoryWithPagination(listings, "new-listings", sortByCreated);
    renderListingsByCategoryWithPagination(listings, "ending-soon", sortByEndingSoon);
    renderListingsByCategoryWithPagination(listings, "popular", sortByPopularity);
    renderListingsByCategoryWithPagination(listings, "recently-published", sortByRecentlyPublished);

    // Bind auction cards after rendering
    bindAuctionCards();

    // Start countdown timers
    startCountdownTimers();
  } catch (error) {
    console.error("Failed to load auctions:", error);
    Object.values(sections).forEach((section) => {
      section.innerHTML = `<p>Failed to load auctions. Please try again later.</p>`;
    });
  }finally {
    // Hide loader
    loader.classList.add("hidden");
  }
}

/**
 * Render listings into a specific section with pagination controls.
 * @param {Array} listings - Array of auction listings.
 * @param {string} sectionId - The section to render into.
 * @param {Function} sortFn - Sorting function for the category.
 */
function renderListingsByCategoryWithPagination(listings, sectionId, sortFn) {
  const section = sections[sectionId];
  const state = paginationState[sectionId];
  const sortedListings = [...listings].sort(sortFn);
  const totalItems = sortedListings.length;
  const totalPages = Math.ceil(totalItems / state.itemsPerPage);

  // Calculate current page's listings
  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  const paginatedListings = sortedListings.slice(start, end);

  // Render listings and pagination controls
  section.innerHTML = `
    <div class="relative flex items-center">
      <!-- Left Arrow -->
      <button 
        class="pagination-arrow prev-arrow absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-4 shadow-lg text-2xl"
        data-section="${sectionId}">
        &#8592;
      </button>
      
      <!-- Listings -->
      <div class="listing-container flex flex-row gap-4 overflow-x-hidden flex-grow px-8 transition-transform duration-500 ease-in-out">
        ${paginatedListings.map((listing) => createAuctionCard(listing)).join("")}
      </div>
      
      <!-- Right Arrow -->
      <button 
        class="pagination-arrow next-arrow absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-4 shadow-lg text-2xl"
        data-section="${sectionId}">
        &#8594;
      </button>
    </div>
  `;

  // Bind auction cards to open modal
  bindAuctionCards();

  // Attach arrow click events
  attachPaginationArrows(sectionId, listings, sortFn, totalPages);
}

/**
 * Attach events to the pagination arrow buttons.
 * @param {string} sectionId - Section ID.
 * @param {Array} listings - Listings for the section.
 * @param {Function} sortFn - Sorting function.
 * @param {number} totalPages - Total pages.
 */
function attachPaginationArrows(sectionId, listings, sortFn, totalPages) {
  const section = sections[sectionId];
  const prevArrow = section.querySelector(".prev-arrow");
  const nextArrow = section.querySelector(".next-arrow");
  const state = paginationState[sectionId];
  const listingContainer = section.querySelector(".listing-container");

  prevArrow?.addEventListener("click", () => {
    const oldPage = state.currentPage;
    if (state.currentPage > 1) {
      state.currentPage--;
    } else {
      state.currentPage = totalPages; // Loop to the last page
    }
    slideToPage(oldPage, state.currentPage, listingContainer, () =>
      renderListingsByCategoryWithPagination(listings, sectionId, sortFn)
    );
  });

  nextArrow?.addEventListener("click", () => {
    const oldPage = state.currentPage;
    if (state.currentPage < totalPages) {
      state.currentPage++;
    } else {
      state.currentPage = 1; // Loop back to the first page
    }
    slideToPage(oldPage, state.currentPage, listingContainer, () =>
      renderListingsByCategoryWithPagination(listings, sectionId, sortFn)
    );
  });
}

/**
 * Slide to the next or previous page with animation.
 * @param {number} oldPage - Previous page number.
 * @param {number} newPage - New page number.
 * @param {HTMLElement} container - The listings container element.
 * @param {Function} onAnimationEnd - Callback function to execute after animation.
 */
function slideToPage(oldPage, newPage, container, onAnimationEnd) {
  const direction = newPage > oldPage ? -1 : 1;
  container.style.transform = `translateX(${direction * 100}%)`;
  setTimeout(() => {
    container.style.transition = "none"; // Remove animation
    container.style.transform = `translateX(${direction * -100}%)`; // Reset to opposite
    onAnimationEnd();
    setTimeout(() => {
      container.style.transition = ""; // Restore animation
      container.style.transform = "translateX(0)"; // Reset to neutral
    });
  }, 500); // Match the animation duration  
}

/**
 * Sorting functions for different categories.
 */
const sortByCreated = (a, b) => new Date(a.created) - new Date(b.created); // Newest first
const sortByEndingSoon = (a, b) => new Date(a.endsAt) - new Date(b.endsAt); // Closest ending first
const sortByPopularity = (a, b) => (b._count?.bids || 0) - (a._count?.bids || 0); // Most bids first
const sortByRecentlyPublished = (a, b) => new Date(a.created) - new Date(b.created); // Newest first

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
 * Search bar functionality.
*/
searchInput.addEventListener("input", async (event) => {
  const query = event.target.value.trim();

  if (!query) {
    searchResultsHeading.classList.add("hidden");
    searchResultsSection.classList.add("hidden");
    return;
  }

  try {
    // Fetch search results
    const url = `${API_AUCTION_SEARCH}${encodeURIComponent(query)}&_bids=true&_seller=true`;
    const response = await fetch(url);
    const data = await response.json();

    const listings = Array.isArray(data.data) ? data.data : [];
    if (listings.length === 0) {
      searchResultsHeading.classList.remove("hidden");
      searchResultsHeading.innerText = `No results found for "${query}"`;
      searchResultsSection.classList.add("hidden");
      return;
    }

    // Populate search results
    searchResultsHeading.classList.remove("hidden");
    searchResultsHeading.innerText = `Search Results for "${query}"`;
    searchResultsSection.classList.remove("hidden");
    searchResultsContainer.innerHTML = listings.map((listing) => createAuctionCard(listing)).join("");

    // Bind the cards to open the modal
    bindSearchResultCards();
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    searchResultsHeading.classList.remove("hidden");
    searchResultsHeading.innerText = "Failed to fetch search results.";
    searchResultsSection.classList.add("hidden");
  }
});

function bindSearchResultCards() {
  const searchCards = document.querySelectorAll(".auction-card");

  searchCards.forEach((card) => {
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
  <div class="flex flex-col md:flex-row gap-6">
    <!-- Left Section: Image -->
    <div class="w-full md:w-1/2">
      <img src="${auctionDetails.media[0]?.url || 'default-image.png'}" 
        alt="${auctionDetails.title}" 
        class="w-full h-full object-cover rounded-lg" />
    </div>
    <!-- Right Section: Content -->
    <div class="w-full md:w-1/2 flex flex-col justify-between">
      <div>
        <h3 class="text-2xl font-bold mb-4">${auctionDetails.title}</h3>
        <p class="text-gray-700 mb-4"><strong>Seller:</strong> ${auctionDetails.seller?.name || "Unknown"}</p>
        <p class="text-gray-700 mb-4"><strong>Description:</strong> ${auctionDetails.description || "No description provided."}</p>
        <p class="text-gray-700 mb-4"><strong>Highest Bid:</strong> $${highestBid}</p>
      </div>
      <!-- Bid Section -->
      <div>
        <input
          type="number"
          id="bid-amount"
          placeholder="Enter your bid"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
        />
      </div>
    </div>
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


function removeExpiredListings() {
  const listings = document.querySelectorAll(".auction-card");
  listings.forEach((listing) => {
    const timer = listing.querySelector(".countdown-timer");
    if (timer && timer.textContent === "Expired") {
      listing.remove(); // Remove expired listing from the DOM
    }
  });
}

function startCountdownTimers() {
  setInterval(() => {
    const timers = document.querySelectorAll(".countdown-timer");
    timers.forEach((timer) => {
      const endsAt = timer.getAttribute("data-ends-at");
      timer.textContent = calculateTimeLeft(endsAt);
    });

    // Remove expired listings
    removeExpiredListings();
  }, 60000); // Update every 60 seconds
}

loadAuctions();