import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  appType: "mpa",
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        auction: resolve(__dirname, 'src/pages/auction.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        profile: resolve(__dirname, 'src/pages/profile.html'),
        register: resolve(__dirname, 'src/pages/register.html'),
        createListing: resolve(__dirname, 'src/pages/create-listing.html'),
        myAuction: resolve(__dirname, 'src/pages/user-listing.html'), 
      },
    },
  },
});