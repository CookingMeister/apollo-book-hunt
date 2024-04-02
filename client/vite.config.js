/**
 * Vite configuration for the client app
 *
 * Defines plugins and server configuration for Vite.
 *
 * @module vite.config
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3003',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
