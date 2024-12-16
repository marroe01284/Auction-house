import { fetchAuctions } from "../api/auctions.js";
import { API_AUCTION_SEARCH } from "../api/constants.js";
import { createNavBar, initializeNavBar } from "../components/header.js";
import { createFooter } from "../components/footer.js";
import { createAuctionCard, calculateTimeLeft } from "../components/auctionCard.js";
import { loadAuctionDetails } from "../modules/auction.js";

document.body.insertAdjacentHTML("afterbegin", createNavBar("user-avatar-url.png"));
document.body.insertAdjacentHTML("afterend", createFooter());
initializeNavBar();


const searchInput = document.querySelector("input[type='text']");
const searchResultsHeading = document.getElementById("search-results-heading");
const searchResultsSection = document.getElementById("search-results");
const searchResultsContainer = searchResultsSection.querySelector(".listing-container");

const sections = {
  "new-listings": document.getElementById("new-listings"),
  "ending-soon": document.getElementById("ending-soon"),
  "popular": document.getElementById("popular"),
  "recently-published": document.getElementById("recently-published"),
};

const paginationState = {
  "new-listings": { currentPage: 1, totalPages: 0, itemsPerPage: 10 },
  "ending-soon": { currentPage: 1, totalPages: 0, itemsPerPage: 10 },
  "popular": { currentPage: 1, totalPages: 0, itemsPerPage: 10 },
  "recently-published": { currentPage: 1, totalPages: 0, itemsPerPage: 10 },
};

 export async function loadAuctions() {
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

    const now = new Date();
    listings = listings.filter((listing) => new Date(listing.endsAt) > now);

    if (listings.length === 0) {
      Object.values(sections).forEach((section) => {
        section.innerHTML = `<p>No active auctions available at the moment.</p>`;
      });
      return;
    }

    renderListingsByCategoryWithPagination(listings, "new-listings", sortByCreated);
    renderListingsByCategoryWithPagination(listings, "ending-soon", sortByEndingSoon);
    renderListingsByCategoryWithPagination(listings, "popular", sortByPopularity);
    renderListingsByCategoryWithPagination(listings, "recently-published", sortByRecentlyPublished);

    bindAuctionCards();

    startCountdownTimers();
  } catch (error) {
    console.error("Failed to load auctions:", error);
    Object.values(sections).forEach((section) => {
      section.innerHTML = `<p>Failed to load auctions. Please try again later.</p>`;
    });
  }finally {

    loader.classList.add("hidden");
  }
}

/**
 * Render listings into sections with pagination controls.
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

  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  const paginatedListings = sortedListings.slice(start, end);

  section.innerHTML = `
    <div class="relative flex items-center px-6">
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

  
  bindAuctionCards();

  attachPaginationArrows(sectionId, listings, sortFn, totalPages);
}

/**
 * Attach events to the pagination arrows.
 * @param {string} sectionId - Section ID.
 * @param {Array} listings - Listings for the section.
 * @param {Function} sortFn - Sorting function.
 * @param {number} totalPages - Total pages.
 */
function attachPaginationArrows(sectionId, listings) {
  const section = sections[sectionId];
  const prevArrow = section.querySelector(".prev-arrow");
  const nextArrow = section.querySelector(".next-arrow");
  const listingContainer = section.querySelector(".listing-container");
  const cardWidth = listingContainer.querySelector(".auction-card")?.offsetWidth || 200;

  prevArrow?.addEventListener("click", () => {
    listingContainer.scrollBy({
      left: -cardWidth * 2,
      behavior: "smooth",
    });
  });

  nextArrow?.addEventListener("click", () => {
    const maxScrollLeft = listingContainer.scrollWidth - listingContainer.clientWidth;

    if (listingContainer.scrollLeft >= maxScrollLeft - cardWidth) {
      console.log(`Loading more listings for section: ${sectionId}`);
      loadMoreListings(sectionId, listings); // Load more dynamically
    }

    listingContainer.scrollBy({
      left: cardWidth * 2,
      behavior: "smooth",
    });
  });
}


/**
 * Slide to the next or previous page with animation.
 * @param {number} oldPage - Previous page number.
 * @param {number} newPage - New page number.
 * @param {HTMLElement} container - The listings container element.
 * @param {Function} onAnimationEnd - Callback function to execute after animation.
 */
function loadMoreListings(sectionId, currentListings) {
  const section = sections[sectionId];
  const listingContainer = section.querySelector(".listing-container");

  const newListings = currentListings.splice(0, 5);

  if (newListings.length === 0) {
    console.log(`No more listings to load for section: ${sectionId}`);
    return;
  }

  const newCardsHtml = newListings.map((listing) => createAuctionCard(listing)).join("");
  listingContainer.insertAdjacentHTML("beforeend", newCardsHtml);

  bindAuctionCards();
}



const sortByCreated = (a, b) => new Date(a.created) - new Date(b.created); // Newest first
const sortByEndingSoon = (a, b) => new Date(a.endsAt) - new Date(b.endsAt); // Closest ending first
const sortByPopularity = (a, b) => (b._count?.bids || 0) - (a._count?.bids || 0); // Most bids first
const sortByRecentlyPublished = (a, b) => new Date(a.created) - new Date(b.created); // Newest first

/**
 * Binds click events to auction cards for opening the details.
 */
function bindAuctionCards() {
  const auctionCards = document.querySelectorAll(".auction-card");

  auctionCards.forEach((card) => {
    const auctionId = card.getAttribute("data-id");
    card.addEventListener("click", () => loadAuctionDetails(auctionId));
  });
}

searchInput.addEventListener("input", async (event) => {
  const query = event.target.value.trim();

  if (!query) {
    searchResultsHeading.classList.add("hidden");
    searchResultsSection.classList.add("hidden");
    return;
  }

  try {
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


    searchResultsHeading.classList.remove("hidden");
    searchResultsHeading.innerText = `Search Results for "${query}"`;
    searchResultsSection.classList.remove("hidden");
    searchResultsContainer.innerHTML = listings.map((listing) => createAuctionCard(listing)).join("");


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
 * Removes listings with expired timers.
 */
function removeExpiredListings() {
  const listings = document.querySelectorAll(".auction-card");
  listings.forEach((listing) => {
    const timer = listing.querySelector(".countdown-timer");
    if (timer && timer.textContent === "Expired") {
      listing.remove();
    }
  });
}
/**
 * Starts countdown timer for listings and removes expired listings.
 */
function startCountdownTimers() {
  setInterval(() => {
    const timers = document.querySelectorAll(".countdown-timer");
    timers.forEach((timer) => {
      const endsAt = timer.getAttribute("data-ends-at");
      timer.textContent = calculateTimeLeft(endsAt);
    });

    removeExpiredListings();
  }, 60000);
}

loadAuctions();