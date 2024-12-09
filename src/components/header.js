export function createNavBar() {
    // Get avatar URL from localStorage
    const userAvatarUrl = localStorage.getItem("userAvatar") || "default-avatar.png";
  
    return `
    <header class="bg-white shadow-sm">
      <!-- First Line: Logo & Avatar -->
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <h1 class="text-xl font-bold">Bid now</h1>
          <span class="text-gray-500 text-xl">Auction</span>
        </div>

        <!-- Avatar -->
        <div>
          <a href="/src/pages/profile.html">
            <img 
              src="${userAvatarUrl}" 
              alt="User Avatar" 
              class="w-10 h-10 rounded-full border border-gray-300"
            />
          </a>
        </div>
      </div>

      <!-- Second Line: Search Bar -->
      <div class="container mx-auto py-2 px-6">
        <div class="relative w-full">
          <input 
            id="search-bar"
            type="text" 
            placeholder="Search by title or username"
            class="w-full rounded-md border border-gray-300 bg-gray-100 pl-10 pr-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <span class="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-3.5-3.5M12 8.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Third Line: Navigation Links -->
      <nav class="container mx-auto py-4 px-6 flex justify-center relative">
        <div class="flex space-x-6 relative gap-10">
          <!-- Underline -->
          <div class="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out" id="underline"></div>

          <!-- Links -->
          <a href="/src/pages/auction.html" class="nav-link text-gray-500 hover:text-black" data-index="0">Discover</a>
          <a href="/src/pages/create-listing.html" class="nav-link text-gray-500 hover:text-black" data-index="1">Create Listing</a>
          <a href="#" class="nav-link text-gray-500 hover:text-black" data-index="2">My Bids</a>
          <a href="/src/pages/my-auction.html" class="nav-link text-gray-500 hover:text-black" data-index="3">My Auction</a>
          <a href="#" class="nav-link text-gray-500 hover:text-black" data-index="4">History</a>
          <a href="/src/pages/login.html" class="nav-link text-gray-500 hover:text-black" data-index="5">Log out</a>
        </div>
      </nav>
    </header>
  `;
}
  
  export function initializeNavBar() {
    const navLinks = document.querySelectorAll(".nav-link");
    const underline = document.getElementById("underline");
  
    navLinks.forEach((link) => {
      link.addEventListener("mouseover", () => {
        // Get the link's dimensions
        const { offsetLeft, offsetWidth } = link;
  
        // Move and resize the underline
        underline.style.left = `${offsetLeft}px`;
        underline.style.width = `${offsetWidth}px`;
      });
    });
  
    // Optional: Reset underline on mouse out
    document.querySelector("nav").addEventListener("mouseleave", () => {
      underline.style.left = "0px";
      underline.style.width = "0px";
    });
  }
  