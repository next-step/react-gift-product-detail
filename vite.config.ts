import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import path from 'path';
import svgrPlugin from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), svgrPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ → src/
      '@src': path.resolve(__dirname, 'src'), // @src → src/
    },
  },
});
