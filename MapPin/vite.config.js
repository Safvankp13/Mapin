import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ShadCN import alias
    },
  },
  optimizeDeps: {
    include: ['three', 'postprocessing'], // prevent 504 errors
  },
  server: {
    fs: {
      strict: false, // optional: fix local file resolution issues
    },
  },
});
