// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically open browser on dev start
    port: 5173, // You can change this port if needed
  },
  build: {
    outDir: 'dist', // Output directory for build files
    sourcemap: true, // Handy for debugging production builds
  },
  resolve: {
    alias: {
      // Optional: Add '@' path alias for your project src
      '@': '/src',
    },
  },
});
