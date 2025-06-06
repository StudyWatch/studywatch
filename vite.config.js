import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['axios'] // מונע מ־Rollup לנסות "לפתור" את axios בקומפילציה
    }
  }
});
