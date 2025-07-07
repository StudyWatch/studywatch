import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ✅ חובה כדי לעבוד עם resolve

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ alias ל־src
    },
  },
  build: {
    rollupOptions: {
      external: ['axios'], // מונע מ־Rollup לכלול את axios בבנדל
    },
  },
});
