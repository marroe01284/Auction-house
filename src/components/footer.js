export function createFooter() {
    return `
      <footer class="bg-card-0 text-black py-6 mt-6">
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <!-- Company Name -->
          <div class="mb-4 md:mb-0">
          <img src="../assets/images/companyLogo.png" alt="company logo">
          </div>
          
          <!-- Navigation Links -->
          <nav class="flex space-x-6">
          <a href="#" class="text-sm text-black font-semibold hover:text-white">About</a>
          <a href="#" class="text-sm text-black font-semibold hover:text-white">Privacy</a>
          <a href="#" class="text-sm text-black font-semibold hover:text-white">Contact</a>
          </nav>
          
          <!-- Social Media Links -->
          <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white">
          <img src="../assets/icons/icons8-instagram-48.png" alt="instagram logo">
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
          <img src="../assets/icons/icons8-snapchat-48.png" alt="snapchat logo">
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
          <img src="../assets/icons/icons8-youtube-48.png" alt="youtube logo">
          </a>
          </div>
          </div>
      
          <p class="flex justify-center text-sm text-dark">© 2023 Auction-House. All Rights Reserved.</p>
      </footer>
    `;
  }
  