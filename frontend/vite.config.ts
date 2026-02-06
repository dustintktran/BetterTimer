import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Allows you to use 'describe' and 'it' without importing them
    environment: 'jsdom', // Simulates a browser
    setupFiles: './src/setupTests.ts', // To be created next
  },
  server: {
    host: true, // Needed for the Docker container port mapping to work
    strictPort: true,
    hmr: {
      clientPort: 5173, // Ensures the browser connects to the correct port
    },
  },
});
