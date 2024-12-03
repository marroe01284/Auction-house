import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    appType: "mpa",
    base: "",
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          intro: resolve(__dirname, 'src/pages/intro.html'),
          auction: resolve(__dirname, 'src/pages/auction.html'),
          login: resolve(__dirname, 'src/pages/login.html'),
          profile: resolve(__dirname, 'src/pages/profile.html'),
          register: resolve(__dirname, 'src/pages/register.html'),
        },
      },
    },
  });
  
