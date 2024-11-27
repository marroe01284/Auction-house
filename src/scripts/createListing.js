import { createListing } from "../api/auctions.js";

const form = document.getElementById("create-listing-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Collect form data
  const title = form.title.value.trim();
  const description = form.description.value.trim();
  const tags = form.tags.value.split(",").map((tag) => tag.trim()).filter((tag) => tag);
  const media = form.media.value.split(",").map((url) => ({ url: url.trim(), alt: "Image" })).filter((media) => media.url);
  const endsAt = new Date(form.endsAt.value).toISOString();

  // Construct the request payload
  const listingData = {
    title,
    description,
    tags,
    media,
    endsAt,
  };

  try {
    // Call the API to create the listing
    const response = await createListing(listingData);

    // Show success message and reset the form
    message.style.display = "block";
    message.style.color = "green";
    message.innerText = "Listing created successfully!";
    form.reset();
  } catch (error) {
    // Show error message
    message.style.display = "block";
    message.style.color = "red";
    message.innerText = "Failed to create listing. Please try again.";
  }
});
