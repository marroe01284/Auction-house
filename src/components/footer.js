/**
 * Creates the HTML structure for the footer.
 * - Includes company logo, navigation links, and social icons.
 * 
 * @returns {string} A string containing the HTML markup for the footer.
 */
export function createFooter() {
    return `
      <footer class="bg-card-0 text-black py-6 mt-6">
        <div class="container mx-auto flex flex-col justify-between gap-6 items-center px-6">
          <div class="mb-4 md:mb-0">
          <img 
          src="/assets/images/companyLogo.png"
          alt="company logo"
          width="32" 
          height="32"
              /> 
          </div>

          <nav class="flex space-x-6">
          <a href="#" class="text-sm text-black font-semibold hover:text-white">About</a>
          <a href="#" class="text-sm text-black font-semibold hover:text-white">Privacy</a>
          <a href="#" class="text-sm text-black font-semibold hover:text-white">Contact</a>
          </nav>

          <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white">
            <img 
              src="/assets/icons/icons8-instagram-48.png" 
              alt="instagram logo" 
              width="32" 
              height="32" 
            />
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <img 
              src="/assets/icons/icons8-snapchat-48.png" 
              alt="snapchat logo" 
              width="32" 
              height="32" 
            />
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <img 
              src="/assets/icons/icons8-youtube-48.png" 
              alt="youtube logo" 
              width="32" 
              height="32" 
            />
          </a>
        </div>
      
          <p class="flex justify-center text-sm text-dark">© 2023 Auction-House. All Rights Reserved.</p>
      </footer>
    `;
  }
  