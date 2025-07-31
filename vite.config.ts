/** @type {import('vite').UserConfig} */
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ['@emotion/babel-plugin'] },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  test: {
    globals: true, // describe, test, expect 등을 import 없이 사용
    environment: 'jsdom', // DOM 테스트 환경
    setupFiles: './src/setupTests.ts', // 테스트 실행 전 실행할 설정 파일
  },
})
