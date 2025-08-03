import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/__test__/setupTests.ts',
    include: ['src/__test__/**/*.{test,spec}.{ts,tsx}'],
  },
});
