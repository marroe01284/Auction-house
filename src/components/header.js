export function createNavBar() {
  const userAvatarUrl = localStorage.getItem("userAvatar") || "/assets/images/companyLogo.png";

  return `
    <header class="bg-white shadow-sm">
      <!-- First Line: Logo & Avatar -->
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <h1 class="text-xl font-bold">Auction<span class="font-semibold text-card-1">House</span></h1>
        </div>

        <!-- Hamburger Menu -->
        <button id="hamburger-menu" class="block md:hidden text-gray-500 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Avatar -->
        <div class="hidden md:block">
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
      <div id="searchBarContainer" class="container mx-auto py-2 px-6 hidden">
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
      <nav id="nav-links" class="container mx-auto py-4 px-6 flex gap-6 flex-col md:flex-row justify-center items-center md:items-start md:space-x-6 relative hidden md:flex">
        <!-- Underline -->
        <div class="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out hidden md:block" id="underline"></div>

        <!-- Links -->
        <a href="/src/pages/auction.html" class="nav-link text-gray-500 hover:text-black" data-index="0">Discover</a>
        <a href="/src/pages/create-listing.html" class="nav-link text-gray-500 hover:text-black" data-index="1">Create Listing</a>
        <a href="/src/pages/user-listing.html" class="nav-link text-gray-500 hover:text-black" data-index="3">My Auction</a>
        <a href="/src/pages/profile.html" class="nav-link text-gray-500 hover:text-black" data-index="3">Profile</a>
        <a href="/index.html" class="nav-link text-gray-500 hover:text-black" data-action="logout">Log out</a>
      </nav>
      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden bg-white shadow-lg md:hidden">
        <a href="/src/pages/auction.html" class="block px-6 py-4 text-gray-500 hover:bg-gray-100">Discover</a>
        <a href="/src/pages/create-listing.html" class="block px-6 py-4 text-gray-500 hover:bg-gray-100">Create Auction</a>
        <a href="/src/pages/user-listing.html" class="block px-6 py-4 text-gray-500 hover:bg-gray-100">My Auction</a>
        <a href="/src/pages/profile.html" class="block px-6 py-4 text-gray-500 hover:bg-gray-100">Profile</a>
        <a href="/index.html" class="block px-6 py-4 text-gray-500 hover:bg-gray-100">Log out</a>
      </div>
    </header>
  `;
}

  
  export function initializeNavBar() {
    const navLinks = document.querySelectorAll(".nav-link");
    const underline = document.getElementById("underline");
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const logoutButton = document.querySelector('[data-action="logout"]');
    const currentPage = window.location.pathname;
    const searchBarContainer = document.getElementById("searchBarContainer");

    if (currentPage.includes("auction.html") && searchBarContainer) {
      searchBarContainer.classList.remove("hidden");
    } else if (searchBarContainer) {
      searchBarContainer.classList.add("hidden");
    }
    

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
      // Toggle mobile menu
  hamburgerMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("open");
    }
  });
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      // Clear local storage
      localStorage.clear();

      // Redirect to login page
      window.location.href = "/src/pages/login.html";
    });
  }
  }
  