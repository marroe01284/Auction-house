export function createFooter() {
    return `
      <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <!-- Company Name -->
          <div class="mb-4 md:mb-0">
            <h2 class="text-lg font-bold">Auction-House</h2>
            <p class="text-sm text-gray-400">© 2023 Auction-House. All Rights Reserved.</p>
          </div>
  
          <!-- Navigation Links -->
          <nav class="flex space-x-6">
            <a href="#" class="text-sm text-gray-400 hover:text-white">About</a>
            <a href="#" class="text-sm text-gray-400 hover:text-white">Privacy</a>
            <a href="#" class="text-sm text-gray-400 hover:text-white">Contact</a>
          </nav>
  
          <!-- Social Media Links -->
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.65 9.12 8.41 9.88v-6.98H7.9v-2.9h2.51v-2.3c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.98h2.73l-.44 2.9h-2.29v6.98C18.35 21.12 22 16.99 22 12z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.63 8.07 8.32 8.75v-6.19H8.38V11.7h2.98v-1.63c0-2.93 1.79-4.54 4.42-4.54 1.25 0 2.53.23 2.53.23v2.78h-1.43c-1.41 0-1.85.88-1.85 1.79v1.37h3.15l-.5 2.91h-2.65v6.19c4.69-.68 8.32-4.34 8.32-8.75 0-5.5-4.46-9.96-9.96-9.96z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.63 8.07 8.32 8.75v-6.19H8.38V11.7h2.98v-1.63c0-2.93 1.79-4.54 4.42-4.54 1.25 0 2.53.23 2.53.23v2.78h-1.43c-1.41 0-1.85.88-1.85 1.79v1.37h3.15l-.5 2.91h-2.65v6.19c4.69-.68 8.32-4.34 8.32-8.75 0-5.5-4.46-9.96-9.96-9.96z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    `;
  }
  