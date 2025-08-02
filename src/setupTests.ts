import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { vi, afterAll, afterEach, beforeAll } from 'vitest';

export const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());
