/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setUpTests.ts',
    css: false,
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('http://localhost:3000'),
  },
});
