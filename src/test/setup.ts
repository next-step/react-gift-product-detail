import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { server } from './mocks/server';

// MSW 서버 시작
beforeAll(() => server.listen());

// 각 테스트 후 핸들러 리셋
afterEach(() => server.resetHandlers());

// 모든 테스트 후 서버 종료
afterAll(() => server.close());

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
