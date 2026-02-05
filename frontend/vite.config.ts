import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      host: true, // Needed for the Docker container port mapping to work
      strictPort: true,
      hmr: {
        clientPort: 5173, // Ensures the browser connects to the correct port
      },
    },
})
