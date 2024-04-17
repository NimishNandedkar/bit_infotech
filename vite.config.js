import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1/user': 'http://localhost:3000',
      Credentials: 'include',

    },
  },
  plugins: [react(), nodePolyfills()], // bhai ye nodePolyfills kya hai? 
  // nodePolyfills() is a Vite plugin that provides Node.js polyfills for the browser.
})
