import { createNavBar, initializeNavBar } from "../components/header.js";
import { updateAuction, deleteAuction } from "../api/auctions.js";
import { fetchProfileListings } from "../api/profiles.js";
import { API_BASE } from "../api/constants.js"; 
document.body.insertAdjacentHTML("afterbegin", createNavBar("user-avatar-url.png"));

initializeNavBar();
/**
 * Load all auctions created by the current user.
 */
async function loadMyAuctions() {
    const myAuctionsContainer = document.getElementById("my-auctions");
  
    try {
      // Fetch current user's name from localStorage
      const profileName = localStorage.getItem("userName");
      if (!profileName) {
        throw new Error("User name not found in localStorage.");
      }
  
      // Fetch user's listings
      const response = await fetchProfileListings(profileName);
      const listings = response.data;
  
      if (!listings.length) {
        myAuctionsContainer.innerHTML = `<p>No auctions found. Create a new listing to get started.</p>`;
        return;
      }
  
      // Render listings
      myAuctionsContainer.innerHTML = listings
        .map(
          (listing) => `
          <div class="auction-card" data-id="${listing.id}">
            <img src="${listing.media?.[0]?.url || 'default-image.png'}" alt="${listing.title}" class="w-full h-48 object-cover rounded-lg">
            <div class="p-4">
              <h2 class="text-lg font-bold">${listing.title}</h2>
              <p class="text-sm text-gray-600">${listing.description || "No description available"}</p>
              <p class="text-sm text-gray-800"><strong>Bids:</strong> ${listing._count.bids || 0}</p>
              <div class="flex justify-between mt-4">
                <button class="learn-more green update-btn" data-id="${listing.id}">
                  <span class="circle"><span class="icon arrow"></span></span>
                  <span class="button-text">Update</span>
                </button>
                <button class="learn-more red delete-btn" data-id="${listing.id}">
                  <span class="circle"><span class="icon arrow"></span></span>
                  <span class="button-text">Delete</span>
                </button>
              </div>
            </div>
          </div>
        `
        )
        .join("");
  
      // Bind actions
      bindAuctionActions();
    } catch (error) {
      console.error("Failed to load auctions:", error);
      myAuctionsContainer.innerHTML = `<p>Failed to load your auctions. Please try again later.</p>`;
    }
  }
  
/**
 * Open the edit modal with listing details.
 * @param {string} auctionId - The ID of the auction to edit.
 */
async function openEditModal(auctionId) {
    const modal = document.getElementById("edit-modal");
    const titleInput = document.getElementById("edit-title");
    const descriptionInput = document.getElementById("edit-description");
    const urlInput = document.getElementById("edit-url");
  
    try {
      // Fetch auction details
      const response = await fetch(`${API_BASE}/auction/listings/${auctionId}?_bids=true&_seller=true`);
      if (!response.ok) {
        throw new Error(`Failed to fetch auction details: ${response.statusText}`);
      }
      const listing = await response.json();
      const data = listing.data; // Ensure we access the correct object
  
      // Populate modal form fields with current listing details
      titleInput.value = data.title || "";
      descriptionInput.value = data.description || "";
      urlInput.value = data.media?.[0]?.url || "";
  
      // Show the modal
      modal.classList.remove("hidden");
  
      // Bind the form submission handler
      document.getElementById("edit-form").onsubmit = async (event) => {
        event.preventDefault();
        await handleEditAuction(auctionId);
      };
    } catch (error) {
      console.error("Failed to load listing details:", error);
      alert("Failed to load listing details. Please try again later.");
    }
  }
  /**
   * Handle updating the auction listing.
   * @param {string} auctionId - The ID of the auction to update.
   */
  async function handleEditAuction(auctionId) {
    const title = document.getElementById("edit-title").value.trim();
    const description = document.getElementById("edit-description").value.trim();
    const media = [{ url: document.getElementById("edit-url").value.trim() }];
  
    try {
      await updateAuction(auctionId, { title, description, media });
      alert("Listing updated successfully!");
      loadMyAuctions(); // Reload the listings
      document.getElementById("edit-modal").classList.add("hidden");
    } catch (error) {
      console.error("Failed to update listing:", error);
      alert("Failed to update listing. Please try again.");
    }
  }
  /**
   * Handle deleting an auction.
   * @param {string} auctionId - The ID of the auction to delete.
   */
  async function handleDeleteAuction(auctionId) {
    if (!confirm("Are you sure you want to delete this listing?")) return;
  
    try {
      await deleteAuction(auctionId);
      alert("Listing deleted successfully!");
      loadMyAuctions(); // Refresh listings
    } catch (error) {
      console.error("Failed to delete listing:", error);
      alert("Failed to delete listing. Please try again.");
    }
  }
  
  /**
   * Close the modal.
   */
  function closeModal() {
    document.getElementById("edit-modal").classList.add("hidden");
  }
  
  /**
   * Bind actions for update and delete buttons.
   */
  function bindAuctionActions() {
    const updateButtons = document.querySelectorAll(".update-btn");
    updateButtons.forEach((button) => {
      button.addEventListener("click", () => openEditModal(button.dataset.id));
    });
  
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => handleDeleteAuction(button.dataset.id));
    });
  
    // Bind modal close buttons
    document.getElementById("edit-modal-close").addEventListener("click", closeModal);
    document.getElementById("edit-cancel").addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
      if (e.target.id === "edit-modal") {
        closeModal();
      }
    });
  }
  
  // Initial Load
  loadMyAuctions();