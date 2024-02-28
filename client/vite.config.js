import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Specify the output directory for the build
    outDir: 'dist',
  },
  server: {
    proxy: {  // Intercepts the axios request and reroutes it to the server , else youll receive the default resposnse ie the index.html file
      '/api': {
        target: 'http://localhost:5050/', // Replace with actual server URL and port
        changeOrigin: true,
      },
    },
  },
})
