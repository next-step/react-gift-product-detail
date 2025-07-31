// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config'; // vitest에서 가져옴
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@schemas': path.resolve(__dirname, 'src/schemas'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@queries': path.resolve(__dirname, 'src/queries'),
      '@test': path.resolve(__dirname, 'src/test'),
      '@mock': path.resolve(__dirname, 'src/mock'),
    },
  },
});
