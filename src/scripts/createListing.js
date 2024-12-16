import { createListing } from "../api/auctions.js";
import { createNavBar, initializeNavBar } from "../components/header.js";
import { createFooter } from "../components/footer.js";
import { checkIfLoggedIn } from "../modules/auth.js";
const form = document.getElementById("create-listing-form");
const message = document.getElementById("message");
/**
 * injects nav and footer.
 */
document.body.insertAdjacentHTML("afterbegin", createNavBar("user-avatar-url.png"));
document.body.insertAdjacentHTML("afterend", createFooter());
initializeNavBar();
checkIfLoggedIn();
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = form.title.value.trim();
  const description = form.description.value.trim();
  const tags = form.tags.value.split(",").map((tag) => tag.trim()).filter((tag) => tag);
  const media = form.media.value.split(",").map((url) => ({ url: url.trim(), alt: "Image" })).filter((media) => media.url);
  const endsAt = new Date(form.endsAt.value).toISOString();

  const listingData = {
    title,
    description,
    tags,
    media,
    endsAt,
  };

  try {
    const response = await createListing(listingData);

    message.style.display = "block";
    message.style.color = "green";
    message.innerText = "Listing created successfully!";
    form.reset();
  } catch (error) {
    message.style.display = "block";
    message.style.color = "red";
    message.innerText = "Failed to create listing. Please try again.";
  }
});


